import { ref, readonly, watch, getCurrentInstance } from 'vue';

// Shared state
const snackbarState = ref({
  isOpen: false,
  text: '',
  actionText: '',
  actionCallback: null,
  duration: 4000,
  bottomOffset: 0,
  backdrop: false,
  onClose: null,
});

// Queue management
const queue = ref([]);

// State flags
let hideTimeoutId = null;
const isExiting = ref(false); // <--- NEW: Tracks if we are currently animating out
let isStoreSynced = false;

// ----------------------------------------------------------------------------
// INTERNAL HELPERS
// ----------------------------------------------------------------------------

function _showSnackbar(config) {
  snackbarState.value = {
    ...config,
    isOpen: true,
  };

  // Clear existing auto-hide timer
  if (hideTimeoutId) {
    clearTimeout(hideTimeoutId);
    hideTimeoutId = null;
  }

  // Set new auto-hide timer
  if (config.duration > 0) {
    hideTimeoutId = setTimeout(() => {
      hideSnackbar();
    }, config.duration);
  }
}

/**
 * Hides the snackbar and handles the "Exit Transition" logic
 */
function hideSnackbar() {
  // Prevent double-closing
  if (isExiting.value || !snackbarState.value.isOpen) return;

  // 1. Run cleanup callbacks
  if (typeof snackbarState.value.onClose === 'function') {
    snackbarState.value.onClose();
  }

  // 2. Clear auto-hide timer
  if (hideTimeoutId) {
    clearTimeout(hideTimeoutId);
    hideTimeoutId = null;
  }

  // 3. Start Exit Animation
  snackbarState.value.isOpen = false;
  isExiting.value = true; // Mark as busy

  // 4. Wait for CSS transition (400ms) before showing next
  setTimeout(() => {
    isExiting.value = false; // Animation done

    // Check if there is a "winner" in the queue waiting to be shown
    if (queue.value.length > 0) {
      const nextConfig = queue.value.shift();
      _showSnackbar(nextConfig);
    }
  }, 400); // Matches the 0.4s CSS transition in KSnackbar.vue
}

// ----------------------------------------------------------------------------
// PUBLIC API
// ----------------------------------------------------------------------------

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

  // 1. Force Reuse (Update text without closing)
  if (snackbarState.value.isOpen && config.forceReuse) {
    _showSnackbar(config);
    return;
  }

  // 2. QUEUE LOGIC
  // If the snackbar is OPEN or currently EXITING (fading out)...
  if (snackbarState.value.isOpen || isExiting.value) {
    
    // A. Clear Queue: Remove any intermediate clicks (User clicked A, B, C -> We only want C)
    queue.value = [];
    
    // B. Add the new request to the line
    queue.value.push(config);

    // C. If it's fully open, trigger the close immediately.
    // (If it's already exiting, we do nothing; the pending timeout will pick up this new item)
    if (snackbarState.value.isOpen) {
      hideSnackbar();
    }
    
  } else {
    // 3. Immediate Show (Idle state)
    _showSnackbar(config);
  }
}

function clearSnackbarQueue() {
  queue.value = [];
}

function initVuexBridge(store) {
  if (isStoreSynced || !store) return;
  if (store.getters['snackbarIsVisible'] === undefined) return;

  watch(
    () => store.getters.snackbarIsVisible,
    (isVisible) => {
      if (isVisible) {
        const options = store.getters.snackbarOptions;
        createSnackbar({
          text: options.text,
          actionText: options.actionText,
          duration: options.autoDismiss === false ? 0 : (options.duration || 4000),
          actionCallback: options.actionCallback,
          onClose: options.hideCallback,
          forceReuse: options.forceReuse,
          backdrop: false 
        });
        store.dispatch('clearSnackbar');
      }
    }
  );
  isStoreSynced = true;
}

export default function useKSnackbar() {
  const instance = getCurrentInstance();
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