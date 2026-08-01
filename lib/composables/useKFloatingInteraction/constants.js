// ==================================================================
// Data attribute applied on an activator element
// Its value is ID of the associated floating element

export const ATTR_FLOATING_ID = 'data-floating-id';
export const SELECTOR_ACTIVATOR = `[${ATTR_FLOATING_ID}]`;

// ==================================================================
// Interactions and DOM events

export const INTERACTIONS = {
  HOVER: 'hover',
  CLICK: 'click',
  TOUCH: 'touch',
  FOCUS: 'focus',
};

export const EVENTS = {
  CLICK: 'click',
  FOCUS: 'focus',
  BLUR: 'blur',
  MOUSEENTER: 'mouseenter',
  MOUSELEAVE: 'mouseleave',
  TOUCHSTART: 'touchstart',
};

export const INTERACTION_TO_ACTIVATE_EVENT = {
  [INTERACTIONS.HOVER]: EVENTS.MOUSEENTER,
  [INTERACTIONS.TOUCH]: EVENTS.TOUCHSTART,
  [INTERACTIONS.FOCUS]: EVENTS.FOCUS,
  [INTERACTIONS.CLICK]: EVENTS.CLICK,
};

export const INTERACTION_TO_DEACTIVATE_EVENT = {
  [INTERACTIONS.HOVER]: EVENTS.MOUSELEAVE,
  [INTERACTIONS.TOUCH]: EVENTS.TOUCHSTART,
  [INTERACTIONS.FOCUS]: EVENTS.BLUR,
  [INTERACTIONS.CLICK]: EVENTS.CLICK,
};

export const CAPTURE_PASSIVE = { capture: true, passive: true };

// ==================================================================
// Composable options

export const DEACTIVATE_ON_DEFAULTS = {
  esc: true,
  scroll: false,
};

export const DELAY_OPTIONS = {
  ACTIVATE: 'activateDelay',
  DEACTIVATE: 'deactivateDelay',
};

// Don't decrease
// /usekfloatinginteraction#delay-and-animation
export const DELAY_ACTIVATE = 300;
export const DELAY_DEACTIVATE = 250;

export const INTERACTION_OPTION_DEFAULTS = {
  [INTERACTIONS.HOVER]: {
    [DELAY_OPTIONS.ACTIVATE]: DELAY_ACTIVATE,
    [DELAY_OPTIONS.DEACTIVATE]: DELAY_DEACTIVATE,
  },
  [INTERACTIONS.CLICK]: { deactivateOnOutside: true, toggle: true },
  [INTERACTIONS.TOUCH]: { deactivateOnOutside: true, toggle: true },
  [INTERACTIONS.FOCUS]: {
    keyboardOnly: false,
    [DELAY_OPTIONS.ACTIVATE]: DELAY_ACTIVATE,
    [DELAY_OPTIONS.DEACTIVATE]: DELAY_DEACTIVATE,
  },
};

// ==================================================================
// Other

// How many floating elements can be on a page without delegating
// before the composable warns developers. Not a limit or
// a recommendation - only a reminder shown on pages where
// delegation may not have been considered yet.
export const NON_DELEGATED_WARN_LIMIT = 100;
