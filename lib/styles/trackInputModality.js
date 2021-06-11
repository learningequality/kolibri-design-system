/**
 * Attempt to track whether the user is currently navigating with the keyboard or not
 *
 * Adapted from https://github.com/alice/modality
 * Version: 1.0.2
 */

import globalThemeState from './globalThemeState';

function setUpEventHandlers(disableFocusRingByDefault) {
  let hadKeyboardEvent = false;

  let isHandlingKeyboardThrottle;

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
    () => {
      if (hadKeyboardEvent) {
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
    document.addEventListener('DOMContentLoaded', function() {
      setUpEventHandlers(disableFocusRingByDefault);
    });
  }
}
