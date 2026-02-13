import { ref, readonly, watch, getCurrentInstance } from 'vue';

// Shared state must be outside the function to be global singleton
const snackbarState = ref({
  isOpen: false,
  text: '',
  actionText: '',
  actionCallback: null,
  duration: 4000,
  bottomOffset: 0,
  backdrop: false,
  onClose: null, // Added for Studio compatibility (Promise resolution)
});

// Queue for managing multiple snackbar requests
const queue = ref([]);

// Internal timeout reference
let hideTimeoutId = null;

// Flag to ensure we only set up the Vuex watcher once
let isStoreSynced = false;

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
  // Trigger the callback if it exists (Critical for Studio)
  if (typeof snackbarState.value.onClose === 'function') {
    snackbarState.value.onClose();
  }

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
  }, 100); // 00ms to allow for exit transition
}

/**
 * Creates and displays a snackbar notification.
 * @param {Object} options - Snackbar configuration
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
    onClose: options.onClose || null,
  };

  // 1. Force Reuse: Update content immediately without animation
  if (snackbarState.value.isOpen && config.forceReuse) {
    _showSnackbar(config);
    return;
  }

  // 2. Queue Logic
  // Check if open OR if the queue is busy
  if (snackbarState.value.isOpen || queue.value.length > 0) {
    // NEW BEHAVIOR: Clear existing queue so only the latest action persists
    // This removes any "intermediate" clicks the user made
    queue.value = [];
    
    // Add the new snackbar (the "winner")
    queue.value.push(config);

    // If a snackbar is currently visible, force it to close NOW.
    // This triggers the exit animation, after which the 
    // hideSnackbar logic will pick up this new item from the queue.
    if (snackbarState.value.isOpen) {
      hideSnackbar(); 
    }
  } else {
    // 3. Immediate Show: Nothing is open, show straight away
    _showSnackbar(config);
  }
}

/**
 * Clears all queued snackbars without affecting the currently displayed one
 */
function clearSnackbarQueue() {
  queue.value = [];
}

/**
 * NEW: Internal function to bridge Vuex -> Composable
 * This watches the old Vuex store and forwards requests to the new KSnackbar
 */
function initVuexBridge(store) {
  // Safety check: Don't sync twice, and ensure store exists
  if (isStoreSynced || !store) return;
  
  // Safety check: Ensure the snackbar module actually exists in the store
  if (store.getters['snackbarIsVisible'] === undefined) return;

  watch(
    () => store.getters.snackbarIsVisible,
    (isVisible) => {
      if (isVisible) {
        const options = store.getters.snackbarOptions;
        
        // Forward the message to the new system
        createSnackbar({
          text: options.text,
          actionText: options.actionText,
          // Map legacy 'autoDismiss' to duration (default to 4000 if not false)
          duration: options.autoDismiss === false ? 0 : (options.duration || 4000),
          actionCallback: options.actionCallback,
          onClose: options.hideCallback,
          forceReuse: options.forceReuse,
          backdrop: false // Legacy snackbars didn't use backdrops
        });

        // Clear the Vuex state immediately so it's ready for the next one
        store.dispatch('clearSnackbar');
      }
    }
  );

  isStoreSynced = true;
}

export default function useKSnackbar() {
  // 1. Try to get the current Vue instance to access $store
  const instance = getCurrentInstance();
  
  // 2. If we haven't synced yet, and we have access to the store, initialize the bridge
  // This automatically connects the old Studio code to the new KDS component
  if (!isStoreSynced && instance && instance.proxy && instance.proxy.$store) {
    initVuexBridge(instance.proxy.$store);
  }

  return {
    snackbarState: readonly(snackbarState),
    createSnackbar,
    hideSnackbar,
    clearSnackbarQueue,
  };
}