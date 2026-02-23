import { ref, readonly } from 'vue';

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

const queue = ref([]);

let hideTimeoutId = null;
const isExiting = ref(false);

function _showSnackbar(config) {
  snackbarState.value = {
    ...config,
    isOpen: true,
  };
  if (hideTimeoutId) {
    clearTimeout(hideTimeoutId);
    hideTimeoutId = null;
  }
  if (config.duration > 0) {
    hideTimeoutId = setTimeout(() => {
      hideSnackbar();
    }, config.duration);
  }
}
function hideSnackbar() {
  if (isExiting.value || !snackbarState.value.isOpen) return;
  if (typeof snackbarState.value.onClose === 'function') {
    snackbarState.value.onClose();
  }

  if (hideTimeoutId) {
    clearTimeout(hideTimeoutId);
    hideTimeoutId = null;
  }

  snackbarState.value.isOpen = false;
  isExiting.value = true;
  setTimeout(() => {
    isExiting.value = false;

    if (queue.value.length > 0) {
      const nextConfig = queue.value.shift();
      _showSnackbar(nextConfig);
    }
  }, 400);
}

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

  if (snackbarState.value.isOpen && config.forceReuse) {
    _showSnackbar(config);
    return;
  }
  if (snackbarState.value.isOpen || isExiting.value) {
    queue.value = [];

    queue.value.push(config);

    if (snackbarState.value.isOpen) {
      hideSnackbar();
    }
  } else {
    _showSnackbar(config);
  }
}

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
