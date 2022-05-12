/**
 * Attempt to track whether the user is currently navigating with the keyboard or not
 *
 * Adapted from https://github.com/alice/modality
 * Version: 1.0.2
 */

import globalThemeState from './globalThemeState';

function setUpEventHandlers(disableFocusRingByDefault) {
  let hadKeyboardEvent = false;
  const keyboardModalityWhitelist = [
    'input:not([type])',
    'input[type=text]',
    'input[type=checkbox]',
    'input[type=number]',
    'input[type=date]',
    'input[type=time]',
    'input[type=datetime]',
    'textarea',
    '[role=textbox]',
    'a',
    'button',
  ].join(',');

  // add this to any element to allow keyboard navigation, regardless of focus event
  const keyboardModalityOverride = [
    '[supports-modality=keyboard]',
  ];

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

  const focusTriggersKeyboardModality = function (el) {
    let triggers = false;

    if (matcher) {
      triggers =
        matcher.call(el, keyboardModalityWhitelist) && matcher.call(el, ':not([readonly])') 
    }
    return triggers;
  };

  const focusSetExplicitly = function (el) {
    let triggers = false;

    if (matcher) {
      triggers =
        matcher.call(el, keyboardModalityOverride) && matcher.call(el, ':not([readonly])')
    }
    return triggers;
  };

  if (disableFocusRingByDefault) {
    const css = 'body :focus:not([modality=keyboard]) { outline: none; }';
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

      if (isHandlingKeyboardThrottle) {
        clearTimeout(isHandlingKeyboardThrottle);
      }

      isHandlingKeyboardThrottle = setTimeout(() => {
        hadKeyboardEvent = false;
      }, 100);
    },
    true
  );

  document.body.addEventListener(
    'focus',
    e => {
      console.log(hadKeyboardEvent, e, e.target, focusTriggersKeyboardModality(e.target) )
      if ((hadKeyboardEvent && focusTriggersKeyboardModality(e.target)) || focusSetExplicitly(e.target)) {
        globalThemeState.inputModality = 'keyboard';
      }
    },
    true
  );

  document.body.addEventListener(
    'blur',
    () => {
      globalThemeState.inputModality = null;
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
    document.addEventListener('DOMContentLoaded', function () {
      setUpEventHandlers(disableFocusRingByDefault);
    });
  }
}