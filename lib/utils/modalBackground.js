import useKLiveRegion from '../composables/useKLiveRegion';
import { OVERLAY_EL_ID } from '../composables/_useOverlay';

const SKIPPED_TAGS = ['SCRIPT', 'STYLE', 'LINK', 'NOSCRIPT'];
export const KOLIBRI_SNACKBAR_ID = 'coresnackbar';

// On `window` because KDS can be loaded more than once per page
function getState() {
  if (!window.kModalBackground) {
    window.kModalBackground = { stack: [], restore: null };
  }
  return window.kModalBackground;
}

function hideNode(node, snackbar, hidden) {
  if (node.id === OVERLAY_EL_ID || (snackbar && snackbar !== node && node.contains(snackbar))) {
    Array.from(node.children).forEach(child => hideNode(child, snackbar, hidden));
    return;
  }
  if (node === snackbar || SKIPPED_TAGS.indexOf(node.tagName) !== -1) {
    return;
  }
  hidden.set(node, node.getAttribute('aria-hidden'));
  node.setAttribute('aria-hidden', 'true');
}

function apply(el) {
  const snackbar = document.getElementById(KOLIBRI_SNACKBAR_ID);
  const hidden = new Map();
  let current = el;
  while (current.parentNode && current !== document.body) {
    // A copy: indexing a live collection while setting attributes is quadratic in jsdom
    Array.from(current.parentNode.children).forEach(sibling => {
      if (sibling !== current) {
        hideNode(sibling, snackbar, hidden);
      }
    });
    current = current.parentNode;
  }
  function recordValue(target) {
    const value = target.getAttribute('aria-hidden');
    hidden.set(target, value);
    return value;
  }
  const observer = new MutationObserver(records => {
    new Set(records.map(record => record.target)).forEach(target => {
      if (recordValue(target) !== 'true') {
        target.setAttribute('aria-hidden', 'true');
      }
    });
    observer.takeRecords();
  });
  hidden.forEach((value, node) => {
    observer.observe(node, { attributes: true, attributeFilter: ['aria-hidden'] });
  });
  return () => {
    observer.takeRecords().forEach(record => recordValue(record.target));
    observer.disconnect();
    hidden.forEach((value, node) => {
      if (value === null) {
        node.removeAttribute('aria-hidden');
      } else {
        node.setAttribute('aria-hidden', value);
      }
    });
  };
}

function update(state) {
  if (state.restore) {
    state.restore();
  }
  const top = state.stack[state.stack.length - 1];
  // WebKit hides everything outside an `aria-modal` dialog, so announcements
  // made while it is open must come from inside it
  useKLiveRegion()._moveLiveRegion(top ? top.dialog : document.body);
  state.restore = top ? apply(top.el) : null;
}

function isDescendant(vm, ancestor) {
  for (let current = vm.$parent; current; current = current.$parent) {
    if (current === ancestor) {
      return true;
    }
  }
  return false;
}

export function isTopModal(vm) {
  const { stack } = getState();
  return stack[stack.length - 1]?.vm === vm;
}

/**
 * Outside an open `aria-modal` dialog, WebKit hides a popover from assistive technology.
 * @param {HTMLElement} el The popover's trigger
 * @returns {HTMLElement} The dialog of the open `KModal` that contains `el`, else `fallback`
 */
export function getPopoverContainer(el, fallback) {
  const { stack } = getState();
  for (let index = stack.length - 1; index >= 0; index--) {
    if (stack[index].dialog.contains(el)) {
      return stack[index].dialog;
    }
  }
  return fallback;
}

/**
 * @param {HTMLElement} el The modal's focus trap root
 * @param {HTMLElement} dialog The modal's `aria-modal` element
 */
export function hideBackground(el, dialog, vm) {
  const state = getState();
  if (state.stack.some(entry => entry.vm === vm)) {
    return;
  }
  let index = state.stack.length;
  while (index > 0 && isDescendant(state.stack[index - 1].vm, vm)) {
    index--;
  }
  state.stack.splice(index, 0, { el, dialog, vm });
  if (index === state.stack.length - 1) {
    update(state);
  }
}

export function restoreBackground(vm) {
  const state = getState();
  const index = state.stack.findIndex(entry => entry.vm === vm);
  if (index === -1) {
    return;
  }
  state.stack.splice(index, 1);
  if (index === state.stack.length) {
    update(state);
  }
}
