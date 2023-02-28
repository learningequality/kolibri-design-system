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
