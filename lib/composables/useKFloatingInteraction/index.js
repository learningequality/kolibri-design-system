/**
 * Observes user interactions with activator elements to determine
 * when the floating element should be considered active. It does not
 * set visibility, leaving each implementation to manage it depending
 * on context.
 *
 *
 * Public interface
 * -----------------------
 * See the useKFloatingInteraction documentation page for parameters,
 * options, what it returns, and the constraints it places on the
 * activator and floating elements.
 *
 *
 * Implementation
 * -----------------------
 *
 * (1) General
 * 
 * Activator elements are required to have the 'data-floating-id'
 * attribute with a value matching the ID of the associated floating
 * element.
 * 
 * The 'data-floating-id'-based implementation was chosen out of
 * several explored, each with its own trade-offs, for allowing
 * a simple, native-like connection between activators and floating
 * elements with no constraints on their placement in DOM; and to
 * optimize the delegated mode.
 * 
 * A page-wide registry keyed by the floating ID holds
 * each floating element's configuration and state.
 *
 * (2) Accessibility
 * 
 * Guided by "Content on Hover or Focus" Success Criterion: Dismissible,
 * Hoverable, Persistent. See https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html
 * 
 * (3) Performance
 *
 * Delegation is a performance optimization mode to share one
 * listener per event type across all activator elemens, instead of
 * attaching a separate listener to each. Delegation affects only
 * activation listeners, not deactivation listeners.
 * 
 * A single page-wide MutationObserver serves both delegated and
 * non-delegated modes, attached for a different length of time in each.
 * Its purpose is to prevent internal leaks and user-facing bugs caused
 * by state that no longer matches the DOM (e.g. a stuck tooltip
 * after its 'v-if' button disappears, unresponsive activators, ..).
 *
 * Delegated activation listeners:
 * - Activation listeners for configured interactions attached once
 *   per event type to the document, not to each activator element.
 *   Cheap 'data-floating-id' check on event targets to exit before
 *   expensive operations.
 * - The observer attached only shortly when a floating element is active,
 *   (to deactivate it when its activator element leaves DOM).

 * Non-delegated activation listeners:
 * - Each activator element has activation listeners corresponding
 *   to the configured interactions.
 * - The observer stays attached the whole time, re-binding activation
 *   listeners to the correct activator elements so that consumers don't  
 *   need to do it (in reactive frameworks, activators can be
 *   added, removed, or replaced on the fly).
 * 
 * Deactivation listeners:
 * - Only attached during the period of time floating element is 
 *   activate (= small numbers at a time)
 * - Shared document listeners for outside clicks/taps, Escape, and scroll
 * - For everything else, attached to activator elements and for some
 *   interactions to their floating elements too - in both delegated and
 *   non-delegated modes.
 *
 * 
 * Updating
 * --------
 * When updating, pay attention to performance in both
 * delegated and non-delegated modes. Depending on context,
 * some logic can run very frequently. Several important places
 * are commented on, but there is many more optimizations in place.
 *
 * Before/after benchmark can be automated easily with Claude
 * to reveal any regressions:
 * - 10, 300, 2000 tooltips on a page
 * - page load, interact with each tooltip
 * - each interaction
 * - delegated and non-delegated mode
 * - measure number of listeners, computational time, JS heap
 *
 * Final manual measurement in critical places important,
 * e.g. on Studio pages with hundreds of floating elements.
 */

import { computed, onMounted, onBeforeUnmount, onUnmounted, nextTick } from 'vue';
import { isNuxtServerSideRendering } from '../../utils';
import {
  SELECTOR_ACTIVATOR,
  EVENTS,
  INTERACTIONS,
  CAPTURE_PASSIVE,
  DELAY_OPTIONS,
} from './constants';
import { normalizeInteractions, normalizeDeactivateOn, warnIfManyNonDelegated } from './validation';
import {
  sameArrayItems,
  getActivateEvents,
  deactivatesOnLeavingActiveArea,
  getDeactivateEvent,
  listenerOptions,
  getDelegateEl,
  getActivatorElFromEvent,
  queryActivatorEl,
  getFloatingId,
  isInsideActiveArea,
  isPointerInsideActiveArea,
  isFocusInsideActiveArea,
  isKeyboardModality,
} from './utils';
import {
  scheduleChange,
  cancelPendingChange,
  cancelAnyPendingChange,
  isActivationPending,
} from './delays';
import {
  _registry,
  _active,
  _nonDelegated,
  isRegistered,
  isEnabled,
  isCallerDelegated,
  isCallerEnabled,
  callerHasInteractions,
  isRegistryEmpty,
  getFloatingEl,
  activatesOn,
  isInteractionActive,
  isInteractionActiveAnywhere,
  isEntryActive,
  createRegistryEntry,
  deleteRegistryEntry,
  getActivatorEl,
  getActivatorEls,
  getInteractionOptions,
  deactivatesOnOutside,
  deactivatesOnEsc,
  deactivatesOnScroll,
  forgetActivatorEls,
  getDelegateUsage,
  incrementDelegateUsage,
  decrementDelegateUsage,
} from './registry';

// ==================================================================
// Keeps track of globally attached listeners and observer

let documentHasClickListener = false;
let documentHasTouchListener = false;
let documentHasEscListener = false;
let documentHasScrollListener = false;
let documentHasActivatorsObserver = false;
let activatorsObserver = null;

// ==================================================================
// Escape dismissal
//
// Related to "Content on Hover or Focus" WCAG Success Criterion.
//
// Dismisses the most recently activated floating element rather
// than all of them at once, so nested floating elements close one
// layer at a time - e.g. a first Escape on an input within a popup
// leaves the input without closing the popup, and a second Escape
// closes the popup

// Whether any active floating element is configured to deactivate on Escape
function isAnyDeactivateOnEscActive() {
  for (const floatingId of _active) {
    if (deactivatesOnEsc(floatingId)) {
      return true;
    }
  }
  return false;
}

// The floating ID of the most recently activated floating element
// that dismisses on Escape
function getTopmostEscDismissibleId() {
  let topmost = null;
  for (const floatingId of _active) {
    if (deactivatesOnEsc(floatingId)) {
      topmost = floatingId;
    }
  }
  return topmost;
}

// Closes the innermost floating element that dismisses on Escape
function onEscKeydown(event) {
  if (event.key !== 'Escape') {
    return;
  }
  const floatingId = getTopmostEscDismissibleId();
  if (!floatingId) {
    return;
  }
  closeAll(floatingId);
}

// Keeps the shared Escape listener in sync with whether any
// active floating element needs it
function syncEscListener() {
  const isNeeded = isAnyDeactivateOnEscActive();
  if (isNeeded && !documentHasEscListener) {
    document.addEventListener('keydown', onEscKeydown, true);
    documentHasEscListener = true;
  } else if (!isNeeded && documentHasEscListener) {
    document.removeEventListener('keydown', onEscKeydown, true);
    documentHasEscListener = false;
  }
}

// ==================================================================
// Scroll dismissal

// Whether any active floating element is configured to deactivate
// on scroll
function isAnyDeactivateOnScrollActive() {
  for (const floatingId of _active) {
    if (deactivatesOnScroll(floatingId)) {
      return true;
    }
  }
  return false;
}

// Can be called frequently under some conditions - when updating,
// preserve early exit and optimized performance.
function onDocumentScroll(event) {
  [..._active].forEach(floatingId => {
    if (!deactivatesOnScroll(floatingId)) {
      return;
    }
    // Don't close when the scroll happened inside the floating
    // element itself (scrolling a popover's own content must not
    // dismiss it)
    const floatingEl = getFloatingEl(floatingId);
    if (floatingEl && floatingEl.contains(event.target)) {
      return;
    }
    closeAll(floatingId);
  });
}

function syncScrollListener() {
  const isNeeded = isAnyDeactivateOnScrollActive();
  if (isNeeded && !documentHasScrollListener) {
    document.addEventListener('scroll', onDocumentScroll, CAPTURE_PASSIVE);
    documentHasScrollListener = true;
  } else if (!isNeeded && documentHasScrollListener) {
    document.removeEventListener('scroll', onDocumentScroll, CAPTURE_PASSIVE);
    documentHasScrollListener = false;
  }
}

// ==================================================================
// Callers handling
//
// Caller = one composable invocation
//
// Note that depending on lifecycle timing, for a brief moment there
// might be more than one caller associated with the same floating
// ID (re-creation via ':key', v-if, ...). With global registry
// indexed by floating ID, there's a need to prevent race conditions
// (e.g. an outgoing caller's unmount clearing an entry an incoming
// one just set up). The entry's 'callers' list is what prevents
// them:
//
//   (1) caller2 is created --> 'addCaller' updates 'callers' to
//       [caller1, caller2], and 'setCurrentCaller' puts caller2's
//       configuration in force
//
//   (2) caller1 unmounts --> 'removeCaller' updates 'callers' to
//       [caller2], sees that the list is not empty, and returns
//       early so cleanup and deactivation don't run for this
//       floating element

function addCaller(floatingId, caller) {
  if (!_registry[floatingId]) {
    _registry[floatingId] = createRegistryEntry(caller);
  }
  const entry = _registry[floatingId];
  entry.callers.push(caller);
  setCurrentCaller(floatingId, caller);
  return entry;
}

function removeCaller(floatingId, caller) {
  const entry = _registry[floatingId];
  if (!entry) {
    return;
  }
  const index = entry.callers.indexOf(caller);
  if (index !== -1) {
    entry.callers.splice(index, 1);
  }

  if (entry.callers.length) {
    // Another caller still using the entry, which is now theirs
    // Callers are kept in the order they attached, so the last one
    // should be the most recent
    if (entry.currentCaller === caller) {
      setCurrentCaller(floatingId, entry.callers[entry.callers.length - 1]);
    }
    return;
  }

  closeAll(floatingId);
  detachActivationListeners(floatingId);
  deleteRegistryEntry(floatingId);
  syncActivatorsObserver();
  releaseActivatorsObserver();
}

function setCurrentCaller(floatingId, caller) {
  const entry = _registry[floatingId];
  entry.currentCaller = caller;

  if (!isCallerDelegated(caller) && isCallerEnabled(caller) && callerHasInteractions(caller)) {
    _nonDelegated.add(floatingId);
    warnIfManyNonDelegated(_nonDelegated.size);
  } else {
    _nonDelegated.delete(floatingId);
    forgetActivatorEls(floatingId);
  }

  const staleInteractions = entry.activeInteractions.value.filter(i => !(i in caller.interactions));
  deactivateInteractions(floatingId, staleInteractions);

  entry.activeInteractions.value.filter(deactivatesOnLeavingActiveArea).forEach(interaction => {
    const { deactivateEvent, deactivateHandler } = getDeactivateListener(interaction);
    // The new caller brings its own floating element, so the
    // interaction needs a deactivation listener on it, otherwise
    // the floating element would stay stuck open (the old caller
    // removes the listener from its own element in
    // 'onBeforeUnmount')
    addDeactivationListener(floatingId, interaction, deactivateEvent, deactivateHandler);
  });

  syncActivationListeners(floatingId);
  syncActivatorsObserver();
  syncEscListener();
  syncScrollListener();
}

// ==================================================================
// Activating and deactivating

// Updates interactions keeping a floating element active + sync
function setActiveInteractions(floatingId, interactions) {
  _registry[floatingId].activeInteractions.value = interactions;
  syncActive(floatingId);
}

// Checks whether a floating element is active + sync
function syncActive(floatingId) {
  const entry = _registry[floatingId];
  const active = isEntryActive(entry);
  if (active) {
    _active.add(floatingId);
  } else {
    _active.delete(floatingId);
    entry.activeActivatorEl.value = null;
  }

  syncActivatorsObserver();
  syncEscListener();
  syncScrollListener();
}

// Closes a floating element completely (drops the manual
// 'setActive(true)' hold and every interaction holding it
// active + sync
function closeAll(floatingId) {
  const entry = _registry[floatingId];
  if (!entry) {
    return;
  }
  cancelAnyPendingChange(floatingId);
  entry.manuallyActive.value = false;
  if (entry.activeInteractions.value.length) {
    deactivateInteractions(floatingId, entry.activeInteractions.value);
  } else {
    syncActive(floatingId);
  }
}

// Adds an interaction to those keeping a floating element active
// + sync
function activateInteraction(floatingId, activatorEl, interaction) {
  const entry = _registry[floatingId];

  // In case a different activator element than the one currently
  // activating this floating element takes over
  switchActivator(floatingId, activatorEl);

  if (entry.activeInteractions.value.includes(interaction)) {
    return;
  }

  const newInteractions = [...entry.activeInteractions.value, interaction];

  entry.activeActivatorEl.value = activatorEl;
  setActiveInteractions(floatingId, newInteractions);
}

// Several activator elements can share a floating element
// This makes the floating element activated by another of its
// activator elements
function switchActivator(floatingId, newActivatorEl) {
  const entry = _registry[floatingId];
  const oldActivatorEl = entry.activeActivatorEl.value;
  if (!oldActivatorEl || oldActivatorEl === newActivatorEl) {
    return;
  }

  entry.activeInteractions.value.filter(deactivatesOnLeavingActiveArea).forEach(interaction => {
    const { deactivateEvent, deactivateHandler } = getDeactivateListener(interaction);
    oldActivatorEl.removeEventListener(deactivateEvent, deactivateHandler, true);
    newActivatorEl.addEventListener(deactivateEvent, deactivateHandler, true);
  });

  entry.activeActivatorEl.value = newActivatorEl;
}

// Removes interactions from those keeping a floating element
// active + sync
function deactivateInteractions(floatingId, interactions) {
  if (!interactions.length) {
    return;
  }

  interactions.forEach(interaction => cancelPendingChange(floatingId, interaction));

  const entry = _registry[floatingId];
  const activatorEl = entry.activeActivatorEl.value;
  const floatingEl = getFloatingEl(floatingId);

  interactions.filter(deactivatesOnLeavingActiveArea).forEach(interaction => {
    const { deactivateEvent, deactivateHandler } = getDeactivateListener(interaction);

    if (activatorEl) {
      activatorEl.removeEventListener(deactivateEvent, deactivateHandler, true);
    }
    if (floatingEl) {
      floatingEl.removeEventListener(deactivateEvent, deactivateHandler, true);
    }
  });

  const remainingInteractions = entry.activeInteractions.value.filter(
    i => !interactions.includes(i),
  );
  setActiveInteractions(floatingId, remainingInteractions);

  removeUnusedDocumentListeners();
}

// ==================================================================
// Keeping activation listeners in sync with what a floating element
// currently needs

// Puts the current caller's activation events on the activator
// elements that are in the DOM right now, and takes off whatever
// no longer belongs.
//
// Can be called frequently under some conditions - when updating,
// preserve early exit and optimized performance.
function syncActivationListeners(floatingId, query) {
  const entry = _registry[floatingId];
  if (!entry) {
    return;
  }

  if (!entry.currentCaller.enabled) {
    detachActivationListeners(floatingId);
    return;
  }

  const activatorEls = entry.currentCaller.delegate ? [] : getActivatorEls(floatingId, query);
  const activateEvents = entry.currentCaller.activateEvents;

  const attachedListeners = entry.attachedActivationListeners;

  if (!attachedListeners && !activatorEls.length) {
    return;
  }

  if (
    attachedListeners &&
    sameArrayItems(attachedListeners.activatorEls, activatorEls) &&
    sameArrayItems(attachedListeners.activateEvents, activateEvents)
  ) {
    return;
  }

  detachActivationListeners(floatingId);
  if (!activatorEls.length) {
    return;
  }

  activatorEls.forEach(el =>
    activateEvents.forEach(event =>
      el.addEventListener(event, ACTIVATION_EVENT_HANDLERS[event], listenerOptions(event)),
    ),
  );
  entry.attachedActivationListeners = { activatorEls, activateEvents };
}

// Removes every activation listener a floating element has on its
// activator elements
function detachActivationListeners(floatingId) {
  const entry = _registry[floatingId];

  if (!entry || !entry.attachedActivationListeners) {
    return;
  }

  const { activatorEls, activateEvents } = entry.attachedActivationListeners;

  activatorEls.forEach(el =>
    activateEvents.forEach(event =>
      el.removeEventListener(event, ACTIVATION_EVENT_HANDLERS[event], listenerOptions(event)),
    ),
  );
  entry.attachedActivationListeners = null;
}

// Listens for a delegating caller's activation events on the shared
// delegate element - attached once, then shared
function addDelegateListeners(caller) {
  if (!caller.delegate) {
    return;
  }

  caller.activateEvents.forEach(eventType => {
    // Don't add listener to the delegate element in case it
    // already listens for this event type (strictly speaking,
    // browsers prevent from duplicate event listeners with the
    // same signature, but _delegateUsage logic needs to be in
    // place anyway to know when to clean up, so it's utilized here
    // too for explicit check)
    if (getDelegateUsage(eventType) === 0) {
      getDelegateEl(eventType).addEventListener(
        eventType,
        ACTIVATION_EVENT_HANDLERS[eventType],
        listenerOptions(eventType),
      );
    }
    incrementDelegateUsage(eventType);
  });
}

// Drops a delegating caller's claim on the shared delegate element
// and removes the listeners if no other delegating caller depends
// on them
function removeDelegateListeners(caller) {
  if (!caller.delegate) {
    return;
  }

  caller.activateEvents.forEach(eventType => {
    // Don't remove listener from the delegate element
    // in case there are still elements that depend on it
    if (decrementDelegateUsage(eventType) === 0) {
      getDelegateEl(eventType).removeEventListener(
        eventType,
        ACTIVATION_EVENT_HANDLERS[eventType],
        listenerOptions(eventType),
      );
    }
  });
}

// ==================================================================
// Activator elements observation

function syncActivatorsObserver() {
  const isNeeded = Boolean(_active.size || _nonDelegated.size);
  if (isNeeded && !documentHasActivatorsObserver) {
    observeActivators();
  }
  if (!isNeeded && documentHasActivatorsObserver) {
    stopObservingActivators();
  }
}

function releaseActivatorsObserver() {
  if (!documentHasActivatorsObserver && activatorsObserver && isRegistryEmpty()) {
    activatorsObserver = null;
  }
}

function observeActivators() {
  if (!activatorsObserver) {
    activatorsObserver = new MutationObserver(onDOMMutations);
  }
  activatorsObserver.observe(document, { childList: true, subtree: true });
  documentHasActivatorsObserver = true;
}

function stopObservingActivators() {
  activatorsObserver.disconnect();
  documentHasActivatorsObserver = false;
}

// Whether a batch of mutation records brought any element
// into the DOM
function hasAddedElement(records) {
  for (let i = 0; i < records.length; i++) {
    const { addedNodes } = records[i];
    for (let j = 0; j < addedNodes.length; j++) {
      const node = addedNodes[j];
      if (node.nodeType === Node.ELEMENT_NODE && node.isConnected) {
        return true;
      }
    }
  }
  return false;
}

// MutationObserver handler
//
// Can be called frequently under some conditions - when updating,
// preserve early exit and optimized performance. Avoid DOM mutations
// here to prevent loops.
function onDOMMutations(records) {
  // (1) for active floating elements, close those whose activator
  // element left the DOM (e.g. prevents a stuck open tooltip after
  // its 'v-if' button disappears)
  [..._active].forEach(floatingId => {
    const entry = _registry[floatingId];
    const activatorEl = entry.activeActivatorEl.value;

    // Nothing to close - the floating element either has no
    // activator element in the page (opened manually by
    // 'setActive'), or its activator element is still in the DOM
    if (!activatorEl || activatorEl.isConnected) {
      return;
    }

    closeAll(floatingId);
  });

  // (2) for non-delegated floating elements, (re)binds their
  // activation listeners to whichever activator elements now have
  // the floating ID (e.g. prevents an unresponsive activator after
  // a ':key' change replaces its element)
  if (!_nonDelegated.size) {
    return;
  }

  // When there are new elements in the DOM, need to invalidate the
  // cache so that the lookup below queries again instead of reading
  // what it holds. Prevents an activator element rendered later from
  // staying unresponsive due to a stale cache.
  // (No need to handle element removals - the cache checks for those
  // on its own)
  if (hasAddedElement(records)) {
    _nonDelegated.forEach(forgetActivatorEls);
  }

  // Queries every activator element on the page at once, no matter
  // which floating element it belongs to, then hands each caller
  // only the ones with its own floating ID - one scan for all of
  // them. Lazy - won't run when nothing was invalidated above.
  let activatorEls = null;
  const sharedQuery = floatingId => {
    if (!activatorEls) {
      activatorEls = new Map();
      const els = document.querySelectorAll(SELECTOR_ACTIVATOR);
      for (let i = 0; i < els.length; i++) {
        const id = els[i].dataset.floatingId;
        if (!id) {
          continue;
        }
        const list = activatorEls.get(id);
        if (list) {
          list.push(els[i]);
        } else {
          activatorEls.set(id, [els[i]]);
        }
      }
    }
    return activatorEls.get(floatingId) || [];
  };

  _nonDelegated.forEach(floatingId => syncActivationListeners(floatingId, sharedQuery));
}

// ==================================================================
// DOM event handlers that activate and deactivate floating
// elements when interactions happen
//
// Depending on event type and delegation mode, can be called
// frequently => exit early, proceed from simple to complex logic

const ACTIVATION_EVENT_HANDLERS = {
  [EVENTS.CLICK]: onClickActivate,
  [EVENTS.FOCUS]: onFocusActivate,
  [EVENTS.MOUSEENTER]: onHoverActivate,
  [EVENTS.TOUCHSTART]: onTouchActivate,
};

const DEACTIVATION_EVENT_HANDLERS = {
  [EVENTS.CLICK]: onClickDeactivate,
  [EVENTS.BLUR]: onFocusDeactivate,
  [EVENTS.MOUSELEAVE]: onHoverDeactivate,
  [EVENTS.TOUCHSTART]: onTouchDeactivate,
};

// The event an interaction deactivates on, together with its handler
function getDeactivateListener(interaction) {
  const deactivateEvent = getDeactivateEvent(interaction);
  return { deactivateEvent, deactivateHandler: DEACTIVATION_EVENT_HANDLERS[deactivateEvent] };
}

// Cleans up click and touch deactivation listeners when no floating
// element relies on them anymore
function removeUnusedDocumentListeners() {
  if (documentHasClickListener && !isInteractionActiveAnywhere(INTERACTIONS.CLICK)) {
    document.removeEventListener(EVENTS.CLICK, onClickDeactivate, true);
    documentHasClickListener = false;
  }
  if (documentHasTouchListener && !isInteractionActiveAnywhere(INTERACTIONS.TOUCH)) {
    document.removeEventListener(EVENTS.TOUCHSTART, onTouchDeactivate, CAPTURE_PASSIVE);
    documentHasTouchListener = false;
  }
}

// Listens for an interaction's deactivating event on the floating
// element itself, so that it stays active while the interaction is
// inside it and is deactivated once it leaves. Only for the
// interactions that deactivate on the active area.
function addDeactivationListener(floatingId, interaction, deactivateEvent, deactivateHandler) {
  // nextTick to wait for the floating element be rendered
  nextTick(() => {
    if (!isInteractionActive(floatingId, interaction)) {
      return;
    }
    const floatingEl = getFloatingEl(floatingId);
    if (floatingEl) {
      floatingEl.addEventListener(deactivateEvent, deactivateHandler, true);
    }
  });
}

// The shared first part of the activation handlers. Finds the
// activator element and floating element ID from an activation
// event, or returns null when the event shouldn't activate anything
function resolveActivation(event, interaction) {
  const activatorEl = getActivatorElFromEvent(event);
  if (!activatorEl) {
    return null;
  }

  const floatingId = getFloatingId(activatorEl);
  // Don't activate a floating element that isn't mounted
  if (!isRegistered(floatingId) || !isEnabled(floatingId)) {
    return null;
  }

  // Already active from this same activator element
  if (isInteractionActive(floatingId, interaction) && getActivatorEl(floatingId) === activatorEl) {
    // Supports the 'toggle' option - a second click or tap on the
    // same activator element closes it
    if (
      !deactivatesOnLeavingActiveArea(interaction) &&
      getInteractionOptions(floatingId, interaction).toggle
    ) {
      deactivateInteractions(floatingId, [interaction]);
    }
    return null;
  }

  return { activatorEl, floatingId };
}

// The shared first part of the deactivation handlers that watch
// the active area. Their listener sits either on the activator
// element or on the floating element itself.
function resolveDeactivation(event, interaction) {
  let activatorEl = getActivatorElFromEvent(event);
  let floatingId;
  if (activatorEl) {
    floatingId = getFloatingId(activatorEl);
  } else {
    floatingId = event.currentTarget && event.currentTarget.id;
    if (!floatingId) {
      throw new Error(
        `[useKFloatingInteraction] Floating element is missing the required "id" attribute`,
      );
    }
  }

  if (!isInteractionActive(floatingId, interaction)) {
    return null;
  }

  const floatingEl = getFloatingEl(floatingId);

  // When the event fired on the floating element, the activator
  // element above was null, so here we obtain the one it was
  // activated from
  if (!activatorEl) {
    activatorEl = getActivatorEl(floatingId);
  }

  return { floatingId, activatorEl, floatingEl };
}

// (1) Hover
function onHoverActivate(event) {
  const activation = resolveActivation(event, INTERACTIONS.HOVER);
  if (!activation) {
    return;
  }
  const { activatorEl, floatingId } = activation;
  if (!activatesOn(floatingId, INTERACTIONS.HOVER)) {
    return;
  }

  if (isActivationPending(floatingId, INTERACTIONS.HOVER)) {
    return;
  }

  scheduleChange(
    floatingId,
    INTERACTIONS.HOVER,
    DELAY_OPTIONS.ACTIVATE,
    () => activatorEl.matches(':hover'),
    () => {
      activatorEl.addEventListener(EVENTS.MOUSELEAVE, onHoverDeactivate, true);
      activateInteraction(floatingId, activatorEl, INTERACTIONS.HOVER);
      addDeactivationListener(floatingId, INTERACTIONS.HOVER, EVENTS.MOUSELEAVE, onHoverDeactivate);
    },
  );
}

function onHoverDeactivate(event) {
  const deactivation = resolveDeactivation(event, INTERACTIONS.HOVER);
  if (!deactivation) {
    return;
  }
  const { floatingId, activatorEl, floatingEl } = deactivation;

  if (isInsideActiveArea(event.relatedTarget, activatorEl, floatingEl)) {
    return;
  }

  scheduleChange(
    floatingId,
    INTERACTIONS.HOVER,
    DELAY_OPTIONS.DEACTIVATE,
    () => !isPointerInsideActiveArea(getActivatorEl(floatingId), getFloatingEl(floatingId)),
    () => deactivateInteractions(floatingId, [INTERACTIONS.HOVER]),
  );
}

// (2) Focus
function onFocusActivate(event) {
  const activation = resolveActivation(event, INTERACTIONS.FOCUS);
  if (!activation) {
    return;
  }
  const { activatorEl, floatingId } = activation;

  if (!activatesOn(floatingId, INTERACTIONS.FOCUS)) {
    return;
  }

  if (getInteractionOptions(floatingId, INTERACTIONS.FOCUS).keyboardOnly) {
    activateFocusIfKeyboardModality(floatingId, activatorEl);
    return;
  }

  activateFocus(floatingId, activatorEl);
}

async function activateFocusIfKeyboardModality(floatingId, activatorEl) {
  if (!(await isKeyboardModality())) {
    return;
  }
  // Exit if the floating element was unmounted or if focus
  // focus left the activator during the await
  if (!isRegistered(floatingId)) {
    return;
  }
  if (!activatorEl.contains(document.activeElement)) {
    return;
  }

  activateFocus(floatingId, activatorEl);
}

function activateFocus(floatingId, activatorEl) {
  if (isActivationPending(floatingId, INTERACTIONS.FOCUS)) {
    return;
  }

  scheduleChange(
    floatingId,
    INTERACTIONS.FOCUS,
    DELAY_OPTIONS.ACTIVATE,
    () => activatorEl.contains(document.activeElement),
    () => {
      activatorEl.addEventListener(EVENTS.BLUR, onFocusDeactivate, true);
      activateInteraction(floatingId, activatorEl, INTERACTIONS.FOCUS);
      addDeactivationListener(floatingId, INTERACTIONS.FOCUS, EVENTS.BLUR, onFocusDeactivate);
    },
  );
}

function onFocusDeactivate(event) {
  const deactivation = resolveDeactivation(event, INTERACTIONS.FOCUS);
  if (!deactivation) {
    return;
  }
  const { floatingId, activatorEl, floatingEl } = deactivation;

  // Don't deactivate when focus is still inside the activator
  // element (happens when moving focus between focusable children
  // of the activator), or when focus moves into the floating
  // element itself
  if (isInsideActiveArea(event.relatedTarget, activatorEl, floatingEl)) {
    return;
  }

  scheduleChange(
    floatingId,
    INTERACTIONS.FOCUS,
    DELAY_OPTIONS.DEACTIVATE,
    () => !isFocusInsideActiveArea(getActivatorEl(floatingId), getFloatingEl(floatingId)),
    () => deactivateInteractions(floatingId, [INTERACTIONS.FOCUS]),
  );
}

// (3) Click
function onClickActivate(event) {
  const activation = resolveActivation(event, INTERACTIONS.CLICK);
  if (!activation) {
    return;
  }
  const { activatorEl, floatingId } = activation;
  if (!activatesOn(floatingId, INTERACTIONS.CLICK)) {
    return;
  }

  // Click stays active until an outside click - attach the
  // deactivation handler to the document to detect clicks elsewhere
  if (!documentHasClickListener) {
    document.addEventListener(EVENTS.CLICK, onClickDeactivate, true);
    documentHasClickListener = true;
  }
  activateInteraction(floatingId, activatorEl, INTERACTIONS.CLICK);
}

function onClickDeactivate(event) {
  const activatorEl = getActivatorElFromEvent(event);

  // Every active floating element except the one whose activator
  // element was clicked - that one is left to 'onClickActivate',
  // which toggles it closed when configured to
  const clickedFloatingId = activatorEl ? getFloatingId(activatorEl) : null;
  const deactivationCandidates = [..._active].filter(id => id !== clickedFloatingId);

  // A floating element closes when the click landed outside its
  // active area, unless it is configured to stay open
  // via 'deactivateOnOutside: false'
  deactivationCandidates.forEach(id => {
    if (
      activatesOn(id, INTERACTIONS.CLICK) &&
      deactivatesOnOutside(id, INTERACTIONS.CLICK) &&
      !isInsideActiveArea(event.target, getActivatorEl(id), getFloatingEl(id))
    ) {
      deactivateInteractions(id, [INTERACTIONS.CLICK]);
    }
  });

  removeUnusedDocumentListeners();
}

// (4) Touch
function onTouchActivate(event) {
  const activation = resolveActivation(event, INTERACTIONS.TOUCH);
  if (!activation) {
    return;
  }
  const { activatorEl, floatingId } = activation;
  if (!activatesOn(floatingId, INTERACTIONS.TOUCH)) {
    return;
  }

  // Touch stays active until an outside tap - attach the
  // deactivation handler to the document to detect taps elsewhere.
  if (!documentHasTouchListener) {
    document.addEventListener(EVENTS.TOUCHSTART, onTouchDeactivate, CAPTURE_PASSIVE);
    documentHasTouchListener = true;
  }
  activateInteraction(floatingId, activatorEl, INTERACTIONS.TOUCH);
}

function onTouchDeactivate(event) {
  const activatorEl = getActivatorElFromEvent(event);

  // Every active floating element except the one whose activator
  // element was clicked - that one is left to 'onTouchActivate',
  // which toggles it closed when configured to
  const tappedFloatingId = activatorEl ? getFloatingId(activatorEl) : null;
  const deactivationCandidates = [..._active].filter(id => id !== tappedFloatingId);

  // A floating element closes when the tap landed outside its
  // active area, unless it is configured to stay open
  // via 'deactivateOnOutside: false'
  deactivationCandidates.forEach(id => {
    if (
      activatesOn(id, INTERACTIONS.TOUCH) &&
      deactivatesOnOutside(id, INTERACTIONS.TOUCH) &&
      !isInsideActiveArea(event.target, getActivatorEl(id), getFloatingEl(id))
    ) {
      deactivateInteractions(id, [INTERACTIONS.TOUCH]);
    }
  });

  removeUnusedDocumentListeners();
}

// ==================================================================
// Main function

export default function useKFloatingInteraction(floatingId, floatingRef, options = {}) {
  if (isNuxtServerSideRendering()) {
    return;
  }

  const { interactions, delegate = false, deactivateOn, enabled = true } = options;

  if (!floatingId) {
    throw new Error(`[useKFloatingInteraction] 'floatingId' is required.`);
  }
  if (!floatingRef) {
    throw new Error(`[useKFloatingInteraction] 'floatingRef' is required.`);
  }

  const normalizedInteractions = normalizeInteractions(interactions);

  const caller = {
    floatingRef,
    interactions: normalizedInteractions,
    delegate: Boolean(delegate),
    enabled: Boolean(enabled),
    deactivateOn: normalizeDeactivateOn(deactivateOn),
    activateEvents: getActivateEvents(Object.keys(normalizedInteractions)),
    delegateAdded: false,
  };
  const entry = addCaller(floatingId, caller);

  // Attaches the activation listeners
  onMounted(() => {
    nextTick(() => {
      if (caller.delegate) {
        if (caller.enabled && !caller.delegateAdded) {
          addDelegateListeners(caller);
          caller.delegateAdded = true;
        }
      } else {
        syncActivationListeners(floatingId);
      }
    });
  });

  // Removes deactivation listeners from the floating element
  // ('onUnmounted' won't have the reference)
  onBeforeUnmount(() => {
    // This call's own element, not the entry's - another caller
    // may share the floating ID by now
    const floatingEl = floatingRef.value;
    if (!floatingEl) {
      return;
    }

    Object.keys(caller.interactions)
      .filter(deactivatesOnLeavingActiveArea)
      .forEach(interaction => {
        const { deactivateEvent, deactivateHandler } = getDeactivateListener(interaction);
        floatingEl.removeEventListener(deactivateEvent, deactivateHandler, true);
      });
  });

  // Removes the caller, and its delegated listeners once
  // no caller needs them
  onUnmounted(() => {
    removeCaller(floatingId, caller);

    nextTick(() => {
      if (caller.delegate && caller.delegateAdded) {
        removeDelegateListeners(caller);
        caller.delegateAdded = false;
      }
    });
  });

  const isActive = computed(() => isEntryActive(entry));
  const activatorEl = computed(() => {
    return entry.activeActivatorEl.value;
  });

  // Manual activation/deactivation
  function setActive(value) {
    if (!isRegistered(floatingId)) {
      return;
    }

    // Manual control overrides the delays
    cancelAnyPendingChange(floatingId);

    if (!value) {
      closeAll(floatingId);
      return;
    }

    if (!caller.enabled || entry.manuallyActive.value) {
      return;
    }

    if (!entry.activeActivatorEl.value) {
      entry.activeActivatorEl.value = queryActivatorEl(floatingId);
    }

    entry.manuallyActive.value = true;
    syncActive(floatingId);
  }

  // Turns interaction tracking on/off
  function setEnabled(value) {
    if (!isRegistered(floatingId)) {
      return;
    }

    const enable = Boolean(value);
    if (enable === caller.enabled) {
      return;
    }
    caller.enabled = enable;

    if (!enable) {
      closeAll(floatingId);
    }

    if (caller.delegate) {
      // Nothing to do when this caller's listeners are already
      // treated the right way
      if (enable === caller.delegateAdded) {
        return;
      }
      if (enable) {
        addDelegateListeners(caller);
      } else {
        removeDelegateListeners(caller);
      }
      caller.delegateAdded = enable;
      return;
    }

    if (enable && callerHasInteractions(caller)) {
      _nonDelegated.add(floatingId);
      warnIfManyNonDelegated(_nonDelegated.size);
      syncActivationListeners(floatingId);
    } else {
      detachActivationListeners(floatingId);
      _nonDelegated.delete(floatingId);
      // Unobserved from here --> cache not trustworthy, invalidate
      forgetActivatorEls(floatingId);
    }
    syncActivatorsObserver();
  }

  return {
    isActive,
    activatorEl,
    setActive,
    setEnabled,
  };
}
