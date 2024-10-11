/**
 * Attempt to track whether the user is currently navigating with the keyboard or not
 *
 * Adapted from https://github.com/alice/modality
 * Version: 1.0.2
 */

import globalThemeState from './globalThemeState';

function setUpEventHandlers(disableFocusRingByDefault) {
  let hadKeyboardEvent = false;
  let hadClickEvent = false;
  const keyboardModalityDefaultElements = [
    'input:not([type])',
    'input[type=text]',
    'input[type=radio]',
    'input[type=checkbox]',
    'input[type=search]',
    'input[type=number]',
    'input[type=date]',
    'input[type=time]',
    'input[type=datetime]',
    'input[type=password]',
    'textarea',
    '[role=textbox]',
    'a',
    'button',
    // Custom KDS attribute. When attached to an element, it will receive a focus ring.
    '[data-focus=true]',
  ].join(',');

  // add this to any element to allow keyboard navigation, regardless of focus event
  const keyboardModalityOverride = ['[supports-modality=keyboard]'];

  let isHandlingKeyboardThrottle;

  const matcher = (() => {
    const el = document.body;

    if (el.matchesSelector) {
      return el.matchesSelector;
    }

    if (el.webkitMatchesSelector) {
      return el.webkitMatchesSelector;
    }

    if (el.mozMatchesSelector) {
      return el.mozMatchesSelector;
    }

    if (el.msMatchesSelector) {
      return el.msMatchesSelector;
    }
  })();

  const focusTriggersKeyboardModality = function(el) {
    let triggers = false;

    if (matcher) {
      triggers =
        matcher.call(el, keyboardModalityDefaultElements) && matcher.call(el, ':not([readonly])');
    }
    return triggers;
  };

  const focusSetExplicitly = function(el) {
    let triggers = false;

    if (matcher) {
      triggers = matcher.call(el, keyboardModalityOverride) && matcher.call(el, ':not([readonly])');
    }
    return triggers;
  };

  if (disableFocusRingByDefault) {
    const css = 'body:not([modality=keyboard]) :focus { outline: none; }';
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

    style.type = 'text/css';
    style.id = 'disable-focus-ring';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.insertBefore(style, head.firstChild);
  }

  document.body.addEventListener(
    'keydown',
    () => {
      hadKeyboardEvent = true;
      hadClickEvent = false;

      if (isHandlingKeyboardThrottle) {
        clearTimeout(isHandlingKeyboardThrottle);
      }

      isHandlingKeyboardThrottle = setTimeout(() => {
        hadKeyboardEvent = false;
      }, 300);
    },
    true
  );

  document.body.addEventListener('mousedown', () => {
    hadClickEvent = true;
    hadKeyboardEvent = false;
  });

  document.body.addEventListener(
    'focus',
    e => {
      if (
        (hadKeyboardEvent && focusTriggersKeyboardModality(e.target)) ||
        (focusSetExplicitly(e.target) && !hadClickEvent)
      ) {
        // both the JS state and the body attribute for keyboard modality
        globalThemeState.inputModality = 'keyboard';
        document.body.setAttribute('modality', 'keyboard');
      } else {
        globalThemeState.inputModality = null;
        document.body.setAttribute('modality', '');
      }
    },
    true
  );

  document.body.addEventListener(
    'blur',
    () => {
      globalThemeState.inputModality = null;
      document.body.setAttribute('modality', '');
    },
    true
  );
}

/**
 * Update `globalThemeState.inputModality` to true/false based on
 * whether the user is currently navigating with the keyboard or not.
 *
 * @param {Boolean} [disableFocusRingByDefault=true] Set focus outline to none
 *                                                 when not navigating with keyboard
 */
export default function trackInputModality({ disableFocusRingByDefault = true } = {}) {
  // skip for SSR
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
      setUpEventHandlers(disableFocusRingByDefault);
    });
  }
}
