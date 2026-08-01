import globalThemeState from '../../styles/globalThemeState';
import {
  ATTR_FLOATING_ID,
  SELECTOR_ACTIVATOR,
  INTERACTIONS,
  EVENTS,
  INTERACTION_TO_ACTIVATE_EVENT,
  INTERACTION_TO_DEACTIVATE_EVENT,
  CAPTURE_PASSIVE,
} from './constants';

// ==================================================================
// General

// Whether a value is an object ('typeof' alone isn't enough - it
// calls null and arrays objects too)
export function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

// Whether two arrays hold the same items in the same order. Items
// themselves are compared with '===' - identity for a DOM element,
// value for an event type string. Use when comparison by reference
// is not sufficient (e.g. a cache handing back a new array holding
// the very same elements - a mere reference check would evaluate
// as false)
export function sameArrayItems(a, b) {
  // The '===' to exit early when both sides point to the same array
  return a === b || (a.length === b.length && a.every((item, i) => item === b[i]));
}

// ==================================================================
// Input modality

// Whether the current input modality is keyboard
export function isKeyboardModality() {
  return new Promise(resolve => {
    // requestAnimationFrame needed to wait for focus listener
    // in 'trackInputModality' to finish its updates
    requestAnimationFrame(() => {
      resolve(globalThemeState.inputModality === 'keyboard');
    });
  });
}

// ==================================================================
// Active area
//
// A floating element's active area is the area of the floating
// element and its activator elements. Interactions staying within
// the area don't deactivate the floating element.
// Related to "Content on Hover or Focus" WCAG Success Criterion.

// Whether the interaction deactivates on leaving the active area
// (= its deactivation listener sits there). Click and touch don't -
// they deactivate on an interaction anywhere outside (= their
// listeners are on document)
export function deactivatesOnLeavingActiveArea(interaction) {
  return interaction !== INTERACTIONS.CLICK && interaction !== INTERACTIONS.TOUCH;
}

// Whether a DOM node is inside the active area
export function isInsideActiveArea(node, activatorEl, floatingEl) {
  return Boolean(
    (activatorEl && activatorEl.contains(node)) || (floatingEl && floatingEl.contains(node)),
  );
}

// Whether the pointer is inside the active area
export function isPointerInsideActiveArea(activatorEl, floatingEl) {
  return Boolean(
    (activatorEl && activatorEl.matches(':hover')) || (floatingEl && floatingEl.matches(':hover')),
  );
}

// Whether keyboard focus is inside the active area
export function isFocusInsideActiveArea(activatorEl, floatingEl) {
  return isInsideActiveArea(document.activeElement, activatorEl, floatingEl);
}

// ==================================================================
// Interactions and their DOM events

// 'addEventListener' options for a given event type. Touch is
// passive on top of capture, everything else just uses capture.
export function listenerOptions(eventType) {
  return eventType === EVENTS.TOUCHSTART ? CAPTURE_PASSIVE : true;
}

// The DOM event the given interaction activates on
export function getActivateEvent(interaction) {
  return INTERACTION_TO_ACTIVATE_EVENT[interaction];
}

// The DOM events the given interactions activate on
export function getActivateEvents(interactions) {
  return [...new Set(interactions.map(getActivateEvent))];
}

// The DOM event the given interaction deactivates on
export function getDeactivateEvent(interaction) {
  return INTERACTION_TO_DEACTIVATE_EVENT[interaction];
}

// ==================================================================
// DOM elements

// Reads the floating ID from 'data-floating-id' attribute
// of an activator element
export function getFloatingId(activatorEl) {
  if (!activatorEl.dataset || !activatorEl.dataset.floatingId) {
    throw new Error(
      `[useKFloatingInteraction] Activator element is missing the required attribute "${ATTR_FLOATING_ID}"`,
    );
  }
  return activatorEl.dataset.floatingId;
}

// The element a delegated listener of the given event type sits
// on - window for focus, otherwise document
export function getDelegateEl(eventType) {
  return eventType === EVENTS.FOCUS ? window : document;
}

// Gets the activator element from an event
export function getActivatorElFromEvent(event) {
  // Not every event target is an element
  if (!(event.target instanceof Element)) {
    return null;
  }
  let activatorEl = event.target;
  if (!activatorEl.hasAttribute(ATTR_FLOATING_ID)) {
    // 'closest' needed to not miss when children of the activator
    // element are interacted with
    activatorEl = activatorEl.closest(SELECTOR_ACTIVATOR);
  }
  return activatorEl;
}

// Finds the first activator elements associated with a floating
// element by querying the document. Prefer it over
// 'queryActivatorEls' when only one is needed.
// To be used sparingly, only when the element can't be obtained in
// a better performant way (e.g. from registry, event, or cache)
// or when a fresh result is needed.
export function queryActivatorEl(floatingId) {
  return document.querySelector(`[${ATTR_FLOATING_ID}="${floatingId}"]`);
}

// Finds all activator elements associated with a floating element
// by querying the document. To be used sparingly, only when the
// elements can't be obtained in a better performant way (e.g. from
// registry, event, or cache) or when a fresh result is needed.
export function queryActivatorEls(floatingId) {
  return [...document.querySelectorAll(`[${ATTR_FLOATING_ID}="${floatingId}"]`)];
}
