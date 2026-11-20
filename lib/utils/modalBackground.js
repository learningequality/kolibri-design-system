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

function apply(el) {
  let snackbar = document.getElementById(KOLIBRI_SNACKBAR_ID);
  const hidden = new Map();
  const snackbarAncestors = new Set();

  function recordValue(target) {
    const value = target.getAttribute('aria-hidden');
    hidden.set(target, value);
    return value;
  }
  function keepHidden(records) {
    new Set(records.map(record => record.target)).forEach(target => {
      if (hidden.has(target) && recordValue(target) !== 'true') {
        target.setAttribute('aria-hidden', 'true');
      }
    });
  }
  const observer = new MutationObserver(records => {
    keepHidden(records);
    observer.takeRecords();
  });

  function expose(node) {
    const value = hidden.get(node);
    hidden.delete(node);
    if (value === null) {
      node.removeAttribute('aria-hidden');
    } else {
      node.setAttribute('aria-hidden', value);
    }
  }
  function hideNode(node) {
    if (SKIPPED_TAGS.includes(node.tagName)) {
      return;
    }
    if (node.id === OVERLAY_EL_ID || node.contains(snackbar)) {
      if (hidden.has(node)) {
        expose(node);
      }
      if (node === snackbar) {
        return;
      }
      if (node.id !== OVERLAY_EL_ID) {
        snackbarAncestors.add(node);
      }
      Array.from(node.children).forEach(hideNode);
      return;
    }
    if (!hidden.has(node)) {
      hidden.set(node, node.getAttribute('aria-hidden'));
    }
    node.setAttribute('aria-hidden', 'true');
    observer.observe(node, { attributes: true, attributeFilter: ['aria-hidden'] });
  }

  function moveSnackbar(newSnackbar) {
    keepHidden(observer.takeRecords());
    snackbar = newSnackbar;
    snackbarAncestors.forEach(node => {
      if (!node.contains(snackbar)) {
        snackbarAncestors.delete(node);
        hideNode(node);
      }
    });
    let topHidden = null;
    for (let node = snackbar; node; node = node.parentElement) {
      if (hidden.has(node)) {
        topHidden = node;
      }
    }
    if (topHidden) {
      hideNode(topHidden);
    }
    observer.takeRecords();
  }

  let current = el;
  while (current.parentNode && current !== document.body) {
    Array.from(current.parentNode.children).forEach(sibling => {
      if (sibling !== current) {
        hideNode(sibling);
      }
    });
    current = current.parentNode;
  }
  const snackbarObserver = new MutationObserver(() => {
    const newSnackbar = document.getElementById(KOLIBRI_SNACKBAR_ID);
    if (newSnackbar !== snackbar) {
      moveSnackbar(newSnackbar);
    }
  });
  snackbarObserver.observe(current, { childList: true, subtree: true });
  return () => {
    snackbarObserver.disconnect();
    keepHidden(observer.takeRecords());
    observer.disconnect();
    Array.from(hidden.keys()).forEach(expose);
  };
}

function update(state) {
  if (state.restore) {
    state.restore();
  }
  const top = state.stack[state.stack.length - 1];
  document.documentElement.style.overflow = top ? 'hidden' : '';
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

export function hideBackground(focusTrapEl, ariaModalEl, vm) {
  const state = getState();
  if (state.stack.some(entry => entry.vm === vm)) {
    return;
  }
  let index = state.stack.length;
  while (index > 0 && isDescendant(state.stack[index - 1].vm, vm)) {
    index--;
  }
  state.stack.splice(index, 0, { el: focusTrapEl, dialog: ariaModalEl, vm });
  if (index === state.stack.length - 1) {
    update(state);
  }
}

export function restoreBackground(vm) {
  const state = getState();
  const index = state.stack.findIndex(entry => entry.vm === vm);
  if (index !== -1) {
    state.stack.splice(index, 1);
    if (index === state.stack.length) {
      update(state);
    }
  }
}
