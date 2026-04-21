import {
  computePosition,
  autoUpdate,
  offset,
  shift,
  limitShift,
  flip,
  arrow,
  size,
  autoPlacement,
  hide,
  inline,
  detectOverflow,
} from '@floating-ui/dom';

// Map of floating element IDs to their cleanup functions and elements.
// { <floating id>: { cleanup: fn, floatingEl: Element } }
export const _instances = {};

/**
 * Manages the positioning of floating elements relative
 * to their anchor elements.
 *
 * @returns {Object} { initPosition, destroyPosition, computePosition,
 * autoUpdate, offset, shift, limitShift, flip, arrow, size, autoPlacement,
 * hide, inline, detectOverflow }
 */
export default function useKFloatingPosition() {
  /**
   * Positions a floating element relative to the anchor element
   * and sets up auto-updating so the position stays correct on
   * scroll, resize, etc. To be called when the floating element
   * is shown or added to the DOM.
   *
   * Make sure to call `destroyPosition` when the floating element
   * is hidden or removed from the DOM to prevent severe performance
   * problems.
   *
   * @param {String} floatingId - Unique ID of the floating element
   * @param {Element} floatingEl - Floating DOM element (e.g. tooltip)
   * @param {Element} anchorEl - Anchor DOM element
   * @param {Object} options - Floating UI options
   *   (https://floating-ui.com/docs/computePosition#options)
   */
  function initPosition(floatingId, floatingEl, anchorEl, options = {}) {
    destroyPosition(floatingId);

    function updatePosition() {
      computePosition(anchorEl, floatingEl, options).then(({ x, y, strategy }) => {
        Object.assign(floatingEl.style, {
          position: strategy,
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }

    _instances[floatingId] = {
      cleanup: autoUpdate(anchorEl, floatingEl, updatePosition),
      floatingEl,
    };
  }

  /**
   * Stops auto-updating the position of the floating element
   * positioned with `initPosition`. Call when the floating
   * element is hidden or removed from the DOM to prevent severe
   * performance problems.
   *
   * @param {String} floatingId - Unique ID of the floating element
   */
  function destroyPosition(floatingId) {
    const instance = _instances[floatingId];
    if (instance) {
      instance.cleanup();
      delete _instances[floatingId];
    }
  }

  return {
    initPosition,
    destroyPosition,
    // Floating UI core
    computePosition,
    autoUpdate,
    // Floating UI middleware
    offset,
    shift,
    limitShift,
    flip,
    arrow,
    size,
    autoPlacement,
    hide,
    inline,
    // Floating UI utilities
    detectOverflow,
  };
}
