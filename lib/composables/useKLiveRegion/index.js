const LIVE_REGION_WRAPPER_ID = 'k-live-region';
const POLITE_LIVE_REGION_SELECTOR = `#${LIVE_REGION_WRAPPER_ID} [aria-live="polite"]`;
const ASSERTIVE_LIVE_REGION_SELECTOR = `#${LIVE_REGION_WRAPPER_ID} [aria-live="assertive"]`;

/**
 * Exposes public 'sendPoliteMessage' and 'sendAssertiveMessage'
 * functions that can be used to update polite/assertive
 * aria-live regions.
 *
 * Also provides private '_mountLiveRegion'.
 */
export default function useKLiveRegion() {
  /**
   * Inserts assertive and polite live regions
   * to an application's document body.
   * For private use in KDS (see KThemePlugin.js)
   */
  function _mountLiveRegion() {
    const politeRegionEl = document.querySelector(POLITE_LIVE_REGION_SELECTOR);
    const assertiveRegionEl = document.querySelector(ASSERTIVE_LIVE_REGION_SELECTOR);

    // Already mounted, so don't mount again,
    // just make sure elements are available in window
    if (politeRegionEl && assertiveRegionEl) {
      window.politeRegionEl = politeRegionEl;
      window.assertiveRegionEl = assertiveRegionEl;
      return;
    }

    const newWrapperEl = document.createElement('div');
    newWrapperEl.id = LIVE_REGION_WRAPPER_ID;
    newWrapperEl.className = 'visuallyhidden';

    const newPoliteRegionEl = document.createElement('div');
    newPoliteRegionEl.setAttribute('aria-live', 'polite');

    const newAssertiveRegionEl = document.createElement('div');
    newAssertiveRegionEl.setAttribute('aria-live', 'assertive');

    newWrapperEl.appendChild(newPoliteRegionEl);
    newWrapperEl.appendChild(newAssertiveRegionEl);

    document.body.insertBefore(newWrapperEl, document.body.firstChild);

    // Save for later use so that we don't need to query
    // every time we call the 'sendPoliteMessage'/'sendAssertiveMessage'.
    // Storing these two elements in the variables in this file,
    // even in the highest scope above the 'useKLiveRegion' function,
    // is insufficient since this file can be on some occasions
    // loaded repeatedly while live regions are already in the DOM.
    window.politeRegionEl = newPoliteRegionEl;
    window.assertiveRegionEl = newAssertiveRegionEl;
  }

  function _moveLiveRegion(parent) {
    const wrapperEl = window.politeRegionEl && window.politeRegionEl.parentNode;
    const containerEl = document.body.contains(parent) ? parent : document.body;
    if (!wrapperEl || wrapperEl.parentNode === containerEl) {
      return;
    }
    containerEl.insertBefore(wrapperEl, containerEl.firstChild);
    // Screen readers don't announce text already in a newly inserted live region
    [window.politeRegionEl, window.assertiveRegionEl].forEach(el => {
      const message = el.textContent;
      if (message) {
        el.textContent = '';
        setTimeout(() => {
          if (!el.textContent) {
            _sendMessage(message, el);
          }
        }, 100);
      }
    });
  }

  function _sendMessage(message, el) {
    clearTimeout(el.kClearTimeout);
    try {
      el.textContent = message;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[useKLiveRegion] Could not send the message:', error);
    } finally {
      // empty the live region
      // recommended in https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-2/
      el.kClearTimeout = setTimeout(() => {
        el.textContent = '';
      }, 350);
    }
  }

  /**
   * Updates the polite aria live region with the provided message.
   */
  function sendPoliteMessage(message) {
    _sendMessage(message, window.politeRegionEl);
  }

  /**
   * Updates the assertive aria live region with the provided message.
   */
  function sendAssertiveMessage(message) {
    _sendMessage(message, window.assertiveRegionEl);
  }

  return {
    _mountLiveRegion,
    _moveLiveRegion,
    sendPoliteMessage,
    sendAssertiveMessage,
  };
}
