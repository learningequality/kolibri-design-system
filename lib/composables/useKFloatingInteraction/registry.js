import { shallowRef } from 'vue';
import { queryActivatorEls } from './utils';
import { cachedQuery, clearCacheKey, clearCache } from './cache';

// ==================================================================
// Registry that keeps data related to registered floating elements
// and their activator elements
//
// {
//   <floating element id>: {
//     activeInteractions: shallowRef([ <interaction>, ... ]),
//     manuallyActive: shallowRef(<boolean>),
//     activeActivatorEl: shallowRef(<element>),
//     attachedActivationListeners: {
//       activatorEls: [ <element>, ... ],
//       activateEvents: [ <event type>, ... ]
//     },
//     callers: [ <caller>, ... ],
//     currentCaller: <caller>,
//   },
//   ...
// }
//
// where
//
//   <caller>: {
//     floatingRef,
//     interactions: { <interaction>: { <options> }, ... },
//     delegate: <boolean>,
//     enabled: <boolean>,
//     deactivateOn: { esc, scroll },
//     activateEvents: [ <event type>, ... ],
//     delegateAdded: <boolean>,
//   }
//
// - 'activeInteractions' - Interactions currently holding the
//                          floating element active
// - 'manuallyActive' - Whether 'setActive(true)' is holding the
//                      floating element active
// - 'activeActivatorEl' - The activator element the floating
//                         element was activated by (note that there
//                         can be more activator elements associated
//                         with a single floating element)
// - 'attachedActivationListeners' - Which activation event types are
//                         attached and to which activator elements
// - 'callers' - Caller = one composable invocation.
//               Depending on lifecycle timing, for a brief moment
//               there might be more than one associated with the
//               same floating ID (re-creation via ':key',
//               v-if, ...). Used to prevent race conditions
//               (e.g. an outgoing caller's unmount clearing
//               an entry an incoming one just set up).
// - 'currentCaller' - The caller whose configuration is in force
export const _registry = {};

// Performance optimization - the activators observer logic asks for
// these on every batch of DOM mutations - too often to scan the
//  whole registry each time
//
// '_active' - IDs of active floating elements
// '_nonDelegated' - IDs of non-delegated floating elements
export const _active = new Set();
export const _nonDelegated = new Set();

// For each event type delegated to the document/window, the number
// of delegating callers depending on it. Used to know when to add
// and remove listeners.
// { <event type> : <delegating callers count> }
export const _delegateUsage = {};

// ==================================================================
// Helper methods

export function isRegistryEmpty() {
  return Object.keys(_registry).length === 0;
}

export function isRegistered(floatingId) {
  return Boolean(_registry[floatingId]);
}

export function getFloatingEl(floatingId) {
  if (!isRegistered(floatingId)) {
    return null;
  }
  return _registry[floatingId].currentCaller.floatingRef.value;
}

// The options an interaction is configured with
export function getInteractionOptions(floatingId, interaction) {
  return _registry[floatingId].currentCaller.interactions[interaction];
}

// Whether the caller is configured to delegate activation listeners
export function isCallerDelegated(caller) {
  return caller.delegate;
}

// Whether the caller is listening for interactions
export function isCallerEnabled(caller) {
  return caller.enabled;
}

// Whether the caller has any configured interaction
// (allowed, activation can also be done manually with 'setActive')
export function callerHasInteractions(caller) {
  return Object.keys(caller.interactions).length > 0;
}

// Whether the caller in force has any configured interaction
// (allowed, activation can also be done manually with 'setActive')
export function isEnabled(floatingId) {
  return isCallerEnabled(_registry[floatingId].currentCaller);
}

// Whether an interaction is configured to activate
// the floating element
export function activatesOn(floatingId, interaction) {
  return interaction in _registry[floatingId].currentCaller.interactions;
}

// Whether an outside click or tap should dismiss a floating
// element, per the 'deactivateOnOutside' option of the interaction
// that opened it (click or touch)
export function deactivatesOnOutside(floatingId, interaction) {
  return getInteractionOptions(floatingId, interaction).deactivateOnOutside;
}

// Whether the floating element is configured to deactivate
// on 'Escape'
export function deactivatesOnEsc(floatingId) {
  return _registry[floatingId].currentCaller.deactivateOn.esc;
}

// Whether the floating element is configured to deactivate
// on scroll
export function deactivatesOnScroll(floatingId) {
  return _registry[floatingId].currentCaller.deactivateOn.scroll;
}

// Whether an interaction is currently holding the given
// floating element active
export function isInteractionActive(floatingId, interaction) {
  const entry = _registry[floatingId];
  return Boolean(entry && entry.activeInteractions.value.includes(interaction));
}

// Whether an interaction is currently holding any floating
// element active
export function isInteractionActiveAnywhere(interaction) {
  for (const floatingId of _active) {
    if (isInteractionActive(floatingId, interaction)) {
      return true;
    }
  }
  return false;
}

// Whether a floating element is held active by an
// interaction or 'setActive(true)'
export function isEntryActive(entry) {
  return entry.activeInteractions.value.length > 0 || entry.manuallyActive.value;
}

export function createRegistryEntry(currentCaller) {
  return {
    activeInteractions: shallowRef([]),
    manuallyActive: shallowRef(false),
    activeActivatorEl: shallowRef(null),
    attachedActivationListeners: null,
    callers: [],
    currentCaller,
  };
}

export function deleteRegistryEntry(floatingId) {
  delete _registry[floatingId];
  _active.delete(floatingId);
  _nonDelegated.delete(floatingId);
  forgetActivatorEls(floatingId);
  if (isRegistryEmpty()) {
    clearCache();
  }
}

// The activator element the floating element is currently
// activated by
export function getActivatorEl(floatingId) {
  const entry = _registry[floatingId];
  return entry ? entry.activeActivatorEl.value : null;
}

// All activator elements of a floating element
export function getActivatorEls(floatingId, query = queryActivatorEls) {
  return cachedQuery(floatingId, () => query(floatingId));
}

// Invalidates activators cache for a floating element
export function forgetActivatorEls(floatingId) {
  clearCacheKey(floatingId);
}

export function getDelegateUsage(eventType) {
  return _delegateUsage[eventType] || 0;
}

export function incrementDelegateUsage(eventType) {
  _delegateUsage[eventType] = (_delegateUsage[eventType] || 0) + 1;
  return _delegateUsage[eventType];
}

export function decrementDelegateUsage(eventType) {
  if (!_delegateUsage[eventType]) {
    return 0;
  }
  _delegateUsage[eventType] -= 1;
  if (_delegateUsage[eventType] < 1) {
    delete _delegateUsage[eventType];
    return 0;
  }
  return _delegateUsage[eventType];
}
