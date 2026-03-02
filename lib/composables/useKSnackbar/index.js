import { ref, readonly, nextTick } from 'vue';

// Two separate refs like Kolibri (allows transitions to work without nextTick)
const snackbarIsVisible = ref(false);
const snackbarOptions = ref({
  text: '',
  actionText: '',
  actionCallback: null,
  duration: 4000,
  autoDismiss: true,
  bottomOffset: 0,
  backdrop: false,
  transition: 'slide',
  hideCallback: null,
  autofocus: false,
  onBlur: null,
});

let hideTimeoutId = null;

function clearSnackbar() {
  if (!snackbarIsVisible.value) return;

  // Call hideCallback if provided (Studio pattern)
  if (typeof snackbarOptions.value.hideCallback === 'function') {
    snackbarOptions.value.hideCallback();
  }

  if (hideTimeoutId) {
    clearTimeout(hideTimeoutId);
    hideTimeoutId = null;
  }

  snackbarIsVisible.value = false;
}

function createSnackbar(options = {}) {
  // Support string shorthand (Kolibri/Studio pattern)
  if (typeof options === 'string') {
    options = { text: options, autoDismiss: true };
  }

  // Call hideCallback of current snackbar before showing new one (Studio pattern)
  if (snackbarIsVisible.value && typeof snackbarOptions.value.hideCallback === 'function') {
    snackbarOptions.value.hideCallback();
  }

  const config = {
    text: options.text || '',
    actionText: options.actionText || '',
    actionCallback: options.actionCallback || null,
    duration: options.duration !== undefined ? options.duration : 4000,
    autoDismiss: options.autoDismiss !== undefined ? options.autoDismiss : true,
    bottomOffset: options.bottomOffset || 0,
    backdrop: options.backdrop || false,
    transition: options.transition || 'slide',
    hideCallback: options.hideCallback || null,
    autofocus: options.autofocus || false,
    onBlur: options.onBlur || null,
    forceReuse: options.forceReuse || false,
  };

  // Clear any existing timer
  if (hideTimeoutId) {
    clearTimeout(hideTimeoutId);
    hideTimeoutId = null;
  }

  // forceReuse: update in place without closing (Kolibri disconnected snackbar)
  if (snackbarIsVisible.value && config.forceReuse) {
    // Update options without changing visibility (no transition)
    snackbarOptions.value = config;

    if (config.autoDismiss && config.duration > 0) {
      hideTimeoutId = setTimeout(() => {
        clearSnackbar();
      }, config.duration);
    }
    return;
  }

  // If replacing an existing snackbar, use nextTick to allow transition
  if (snackbarIsVisible.value) {
    // 1. Hide current
    snackbarIsVisible.value = false;

    // 2. Clear options
    snackbarOptions.value = {
      text: '',
      actionText: '',
      actionCallback: null,
      duration: 4000,
      autoDismiss: true,
      bottomOffset: 0,
      backdrop: false,
      transition: 'slide',
      hideCallback: null,
      autofocus: false,
      onBlur: null,
    };

    // 3. Wait for Vue to process the hide, allowing transition to play
    nextTick(() => {
      // 4. Show new
      snackbarIsVisible.value = true;

      // 5. Set new options
      snackbarOptions.value = config;

      // 6. Setup auto-hide timer (only if autoDismiss is true)
      if (config.autoDismiss && config.duration > 0) {
        hideTimeoutId = setTimeout(() => {
          clearSnackbar();
        }, config.duration);
      }
    });
  } else {
    // First time showing - no transition needed
    // 1. Show snackbar
    snackbarIsVisible.value = true;

    // 2. Set options
    snackbarOptions.value = config;

    // 3. Setup auto-hide timer (only if autoDismiss is true)
    if (config.autoDismiss && config.duration > 0) {
      hideTimeoutId = setTimeout(() => {
        clearSnackbar();
      }, config.duration);
    }
  }
}

function setSnackbarText(text) {
  snackbarOptions.value.text = text;
}

export default function useKSnackbar() {
  return {
    snackbarIsVisible: readonly(snackbarIsVisible),
    snackbarOptions: readonly(snackbarOptions),
    createSnackbar,
    clearSnackbar,
    setSnackbarText,
  };
}
