import { ref, readonly, nextTick } from 'vue';

function _getSnackbarOptions(options = {}) {
  return {
    text: options.text || '',
    actionText: options.actionText || '',
    actionCallback: options.actionCallback || null,
    duration: options.duration !== undefined ? options.duration : 5000,
    autoDismiss: options.autoDismiss !== undefined ? options.autoDismiss : true,
    bottomOffset: options.bottomOffset || 0,
    backdrop: options.backdrop || false,
    hideCallback: options.hideCallback || null,
    autofocus: options.autofocus || false,
    onBlur: options.onBlur || null,
  };
}

const snackbarIsVisible = ref(false);
const snackbarOptions = ref(_getSnackbarOptions());

function clearSnackbar() {
  if (!snackbarIsVisible.value) return;

  if (typeof snackbarOptions.value.hideCallback === 'function') {
    snackbarOptions.value.hideCallback();
  }

  snackbarIsVisible.value = false;
  snackbarOptions.value = _getSnackbarOptions();
}

function createSnackbar(options = {}) {
  if (typeof options === 'string') {
    options = { text: options, autoDismiss: true };
  } else if (!options || typeof options !== 'object') {
    options = {};
  }

  if (snackbarIsVisible.value && typeof snackbarOptions.value.hideCallback === 'function') {
    snackbarOptions.value.hideCallback();
  }

  const config = {
    ..._getSnackbarOptions(options),
    forceReuse: options.forceReuse || false,
  };

  if (snackbarIsVisible.value && config.forceReuse) {
    snackbarOptions.value = config;
    return;
  }

  if (snackbarIsVisible.value) {
    snackbarIsVisible.value = false;
    snackbarOptions.value = _getSnackbarOptions();

    nextTick(() => {
      snackbarIsVisible.value = true;
      snackbarOptions.value = config;
    });
  } else {
    snackbarIsVisible.value = true;
    snackbarOptions.value = config;
  }
}

function setSnackbarText(text) {
  snackbarOptions.value = { ...snackbarOptions.value, text };
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
