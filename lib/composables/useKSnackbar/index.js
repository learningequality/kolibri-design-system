import { ref, readonly } from 'vue';

/**
 * A composable for managing snackbar state and display queue.
 * Provides methods to show, hide, and manage snackbar notifications.
 *
 * @returns {Object} { snackbarState, createSnackbar, hideSnackbar, clearSnackbarQueue }
 */
export default function useKSnackbar() {
  // Shared state for the snackbar
  const snackbarState = ref({
    isOpen: false,
    text: '',
    actionText: '',
    actionCallback: null,
    duration: 4000,
    bottomOffset: 0,
  });

  // Queue for managing multiple snackbar requests
  const queue = ref([]);

  // Timeout ID for auto-hide
  let hideTimeoutId = null;

  /**
   * Shows a snackbar with the provided configuration
   * @private
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
   * Creates and displays a snackbar notification.
   * If a snackbar is already showing, queues this one for later display.
   *
   * @param {Object} options - Snackbar configuration
   * @param {String} options.text - Message to display
   * @param {String} [options.actionText=''] - Text for action button
   * @param {Function} [options.actionCallback=null] - Callback when action is clicked
   * @param {Number} [options.duration=4000] - Auto-hide duration in ms (0 = no auto-hide)
   * @param {Number} [options.bottomOffset=0] - Offset from bottom of screen in pixels
   */
  function createSnackbar(options = {}) {
    const config = {
      text: options.text || '',
      actionText: options.actionText || '',
      actionCallback: options.actionCallback || null,
      duration: options.duration !== undefined ? options.duration : 4000,
      bottomOffset: options.bottomOffset || 0,
    };

    if (snackbarState.value.isOpen) {
      // Queue this snackbar if one is already showing
      queue.value.push(config);
    } else {
      _showSnackbar(config);
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
    }, 300); // Wait for close animation
  }

  /**
   * Clears all queued snackbars without affecting the currently displayed one
   */
  function clearSnackbarQueue() {
    queue.value = [];
  }

  return {
    snackbarState: readonly(snackbarState),
    createSnackbar,
    hideSnackbar,
    clearSnackbarQueue,
  };
}