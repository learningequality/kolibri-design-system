import { isRegistered, isInteractionActive, getInteractionOptions } from './registry';

//==================================================================
// Activation and deactivation delays
//
// Hover and focus wait before they take effect. 'activateDelay'
// keeps tooltips from flashing one after another as the pointer
// travels. 'deactivateDelay' keeps the floating element from
// deactivating while the pointer moves from the activator to the
// floating element (they are typically a few pixels apart).
// Related to "Content on Hover or Focus" WCAG Success Criterion.
//
// When activator element unhovered, delay timer starts. At the end
// of the delay, check whether the activator element or the floating
// element is ':hover'ed and then decide if it should deactivate.
// Same principle for focus, only checking whether active focus is
// within the activator element or the floating element.

// Holds one scheduled change to a floating element's active state
// (can be either activation change or deactivation change)
// { floatingId, interaction, shouldRun, run, timeout }
let pendingChange = null;

// Whether the change waiting is this interaction's change to this
// floating element
function isChangePending(floatingId, interaction) {
  return Boolean(
    pendingChange &&
    pendingChange.floatingId === floatingId &&
    pendingChange.interaction === interaction,
  );
}

// Whether the change waiting is this interaction's activation
// change to this floating element
export function isActivationPending(floatingId, interaction) {
  return isChangePending(floatingId, interaction) && !isInteractionActive(floatingId, interaction);
}

// Runs an activation or deactivation after the interaction's delay,
// or right away when the interaction has none. Once the delay has
// run out, 'shouldRun' decides whether it still makes sense.
export function scheduleChange(floatingId, interaction, delayOption, shouldRun, run) {
  const delay = getInteractionOptions(floatingId, interaction)[delayOption];
  if (!delay) {
    run();
    return;
  }

  if (isChangePending(floatingId, interaction)) {
    // This interaction is scheduling a change to this floating
    // element again - e.g. the pointer left the activator element,
    // Cancel and start the wait again.
    cancelPendingChange(floatingId, interaction);
  } else {
    // Another floating element, or another interaction, has a
    // change waiting. Let the current one happen now instead
    // of dropping it, otherwise its interaction would go on
    // holding its floating element active with nothing left to
    // release it.
    flushPendingChange();
  }

  pendingChange = {
    floatingId,
    interaction,
    shouldRun,
    run,
    timeout: setTimeout(() => {
      pendingChange = null;
      // The floating element may have been unmounted while waiting
      if (isRegistered(floatingId) && shouldRun()) {
        run();
      }
    }, delay),
  };
}

// Lets the waiting change happen ahead of the scheduled time
function flushPendingChange() {
  const change = pendingChange;
  if (!change) {
    return;
  }
  clearTimeout(change.timeout);
  pendingChange = null;
  if (isRegistered(change.floatingId) && change.shouldRun()) {
    change.run();
  }
}

function clearPendingChange() {
  if (pendingChange) {
    clearTimeout(pendingChange.timeout);
    pendingChange = null;
  }
}

// Cancels the waiting change if it is this interaction's
// change to this floating element
export function cancelPendingChange(floatingId, interaction) {
  if (isChangePending(floatingId, interaction)) {
    clearPendingChange();
  }
}

// Cancels the waiting change if it is any interaction's change
// to this floating element
export function cancelAnyPendingChange(floatingId) {
  if (pendingChange && pendingChange.floatingId === floatingId) {
    clearPendingChange();
  }
}
