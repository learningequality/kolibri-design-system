const OVERLAY_EL_ID = 'k-overlay';

/**
 * A private composable that takes care of everything
 * related to the overlay container element #k-overlay that is
 * inserted to an application's document body during the KDS
 * initialization (see KThemePlugin.js)
 */
export default function _useOverlay() {
  const overlayElSelector = `#${OVERLAY_EL_ID}`;

  /**
   * Inserts the overlay container element #k-overlay
   * to an application's document body and saves the element
   * to window for later use. Should be called only once,
   * typically during app initialization.
   */
  function mountOverlay() {
    const overlayEl = document.getElementById(OVERLAY_EL_ID);

    // Already mounted, so don't mount again,
    // just make sure the element is available in window
    if (overlayEl) {
      window.overlayEl = overlayEl;
      return;
    }

    const newOverlayEl = document.createElement('div');
    newOverlayEl.id = OVERLAY_EL_ID;

    document.body.insertBefore(newOverlayEl, document.body.firstChild);

    // Save for later use so that we don't need to query
    // every time we call the 'getOverlayEl'
    // (frequent operation due to the usage from
    // KTooltip and other components).
    window.overlayEl = newOverlayEl;
  }

  /**
   * @returns {HTMLElement} The overlay container element #k-overlay
   */
  function getOverlayEl() {
    // do not query DOM for performance reasons
    const overlayEl = window.overlayEl;
    // unlikely to happen, but just in case
    if (!overlayEl) {
      // eslint-disable-next-line no-console
      console.error(
        '[KDS] The overlay container element #k-overlay is missing. KDS initialization failed?',
      );
      return;
    }
    return overlayEl;
  }

  return {
    mountOverlay,
    getOverlayEl,
    overlayElSelector,
  };
}
