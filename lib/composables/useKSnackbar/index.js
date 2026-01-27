import { ref, readonly } from 'vue';

// Shared state must be outside the function to be global singleton
const snackbarState = ref({
  isOpen: false,
  text: '',
  actionText: '',
  actionCallback: null,
  duration: 4000,
  bottomOffset: 0,
  backdrop: false,
});

// Queue for managing multiple snackbar requests
const queue = ref([]);

// Internal timeout reference
let hideTimeoutId = null;

/**
 * Internal function to actually apply the config to the state
 */
function _showSnackbar(config) {
  snackbarState.value = {
    ...config,
    isOpen: true,
  };

  // Clear any existing timeout
  if (hideTimeoutId) {
    clearTimeout(hideTimeoutId);
    hideTimeoutId = null;
  }

  // Set auto-hide timeout if duration is specified
  if (config.duration > 0) {
    hideTimeoutId = setTimeout(() => {
      hideSnackbar();
    }, config.duration);
  }
}

/**
 * Hides the currently displayed snackbar.
 * If there are queued snackbars, shows the next one after a brief delay.
 */
function hideSnackbar() {
  if (hideTimeoutId) {
    clearTimeout(hideTimeoutId);
    hideTimeoutId = null;
  }

  snackbarState.value.isOpen = false;

  // Show next queued snackbar after animation completes
  setTimeout(() => {
    if (queue.value.length > 0) {
      const nextConfig = queue.value.shift();
      _showSnackbar(nextConfig);
    }
  }, 400); // 400ms to allow for exit transition
}

/**
 * Creates and displays a snackbar notification.
 *
 * @param {Object} options - Snackbar configuration
 * @param {String} options.text - Message to display
 * @param {String} [options.actionText=''] - Text for action button
 * @param {Function} [options.actionCallback=null] - Callback when action is clicked
 * @param {Number} [options.duration=4000] - Auto-hide duration in ms (0 = no auto-hide)
 * @param {Number} [options.bottomOffset=0] - Offset from bottom of screen in pixels
 * @param {Boolean} [options.backdrop=false] - Whether to show a dim backdrop (modality)
 * @param {Boolean} [options.forceReuse=false] - If true, updates existing snackbar text without 
 */
function createSnackbar(options = {}) {
  const config = {
    text: options.text || '',
    actionText: options.actionText || '',
    actionCallback: options.actionCallback || null,
    duration: options.duration !== undefined ? options.duration : 4000,
    bottomOffset: options.bottomOffset || 0,
    backdrop: options.backdrop || false,
    forceReuse: options.forceReuse || false,
  };

  // If snackbar is open and we want to reuse it (e.g. updating progress)
  // we overwrite the state immediately without touching the queue.
  if (snackbarState.value.isOpen && config.forceReuse) {
    _showSnackbar(config);
    return;
  }

  if (snackbarState.value.isOpen) {
    // Queue this snackbar if one is already showing
    queue.value.push(config);
  } else {
    _showSnackbar(config);
  }
}

/**
 * Clears all queued snackbars without affecting the currently displayed one
 */
function clearSnackbarQueue() {
  queue.value = [];
}

export default function useKSnackbar() {
  return {
    snackbarState: readonly(snackbarState),
    createSnackbar,
    hideSnackbar,
    clearSnackbarQueue,
  };
}