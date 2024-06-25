/**
 * @param {HTMLElement} parent A parent element
 * @returns {HTMLElement, null} The first focusable child of the parent
 *                              element or `null` when none is found
 */
export function getFirstFocusableChild(parent) {
  if (!parent) {
    // eslint-disable-next-line no-console
    console.error(`[getFirstFocusableChild] 'parent' parameter is required`);
    return null;
  }
  // https://gomakethings.com/how-to-get-the-first-and-last-focusable-elements-in-the-dom/
  const focusableElements = parent.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  return focusableElements.length > 0 ? focusableElements[0] : null;
}
