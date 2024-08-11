const TELEPORT_ROOT_EL_ID = 'k-teleport';

/**
 * A private composable that takes care of everything
 * related to the teleport root element that is inserted
 * to an application's document body during the KDS
 * initialization (see KThemePlugin.js)
 */
export default function _useTeleportRootEl() {
  const teleportRootElSelector = `#${TELEPORT_ROOT_EL_ID}`;

  /**
   * Inserts the teleport root element to an application's
   * document body and saves the element to window for later use.
   * Should be called only once, typically during app
   * initialization.
   */
  function mountTeleportRootEl() {
    const teleportRootEl = document.getElementById(TELEPORT_ROOT_EL_ID);

    // Already mounted, so don't mount again,
    // just make sure elements are available in window
    if (teleportRootEl) {
      window.teleportRootEl = teleportRootEl;
      return;
    }

    const newTeleportRootEl = document.createElement('div');
    newTeleportRootEl.id = TELEPORT_ROOT_EL_ID;

    document.body.insertBefore(newTeleportRootEl, document.body.firstChild);

    // Save for later use so that we don't need to query
    // every time we call the 'getTeleportRootEl'
    // (frequent operation due to the usage from
    // KTooltip and other components).
    window.teleportRootEl = newTeleportRootEl;
  }

  /**
   * @returns {HTMLElement} The teleport root element
   */
  function getTeleportRootEl() {
    // do not query DOM for performance reasons
    const teleportRootEl = window.teleportRootEl;
    // unlikely to happen, but just in case
    if (!teleportRootEl) {
      console.error('[KDS] The teleport root element is missing. KDS initialization failed?');
      return;
    }
    return teleportRootEl;
  }

  return {
    mountTeleportRootEl,
    getTeleportRootEl,
    teleportRootElSelector,
  };
}
