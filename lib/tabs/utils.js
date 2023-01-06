/**
 * @param {String} tabInterfaceId A tab interface ID
 * @param {String} tabId A tab ID
 * @returns {String} A tab element ID. It's a compound of a tab ID
 *                   and ID of a tabbed interface it belongs to
 *                   (to prevent bugs when more tabbed interfaces
 *                    with some accidentally identical tab IDs are
 *                    used on the same page)
 */
export function getTabElementId(tabInterfaceId, tabId) {
  return tabInterfaceId + '-' + tabId;
}

/**
 * @param {String} tabInterfaceId A tab interface ID
 * @param {String} tabId A tab ID
 * @returns {String} A corresponding tab panel element ID
 */
export function getTabPanelElementId(tabInterfaceId, tabId) {
  return getTabElementId(tabInterfaceId, tabId) + '-panel';
}

/**
 * @param {HTMLElement} parent A parent element
 * @returns {HTMLElement, null} The first focusable child of the parent
 *                              element or `null` when none is found
 */
export function getFirstFocusableChild(parent) {
  if (!parent) {
    console.error(`[getFirstFocusableChild] 'parent' parameter is required`);
    return null;
  }
  // https://gomakethings.com/how-to-get-the-first-and-last-focusable-elements-in-the-dom/
  const focusableElements = parent.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  return focusableElements.length > 0 ? focusableElements[0] : null;
}
