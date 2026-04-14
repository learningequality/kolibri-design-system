import { ref, readonly, nextTick } from 'vue';

function _getSnackbarOptions(options = {}) {
  return {
    text: options.text || '',
    actionText: options.actionText || '',
    actionCallback: options.actionCallback || null,
    duration: options.duration !== undefined ? options.duration : 5000,
    autoDismiss: options.autoDismiss !== undefined ? options.autoDismiss : true,
    bottomOffset: options.bottomOffset !== undefined ? options.bottomOffset : 0,
    backdrop: options.backdrop || false,
    hideCallback: options.hideCallback || null,
    autofocus: options.autofocus || false,
    onBlur: options.onBlur || null,
    // announce is intentionally left without a default — developers must be
    // explicit about whether the snackbar should trigger a live-region
    // announcement, since both announcing and not announcing can be wrong
    // depending on the context.
    announce: options.announce,
    assertive: options.assertive || false,
  };
}

/**
 * Private factory that creates an independent snackbar state and actions.
 * All functions are closures over the local refs so each call produces
 * a fully isolated instance.
 */
function _useLocalKSnackbar() {
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

    if (options.announce === undefined) {
      // eslint-disable-next-line no-console
      console.warn(
        '[useKSnackbar] The `announce` option is required. ' +
          'Pass `announce: true` to trigger a screen-reader announcement, ' +
          'or `announce: false` to skip it (e.g. when aria attributes already ' +
          'communicate the state change and a duplicate announcement would be confusing).',
      );
    }

    if (options.announce === false && options.assertive === true) {
      // eslint-disable-next-line no-console
      console.warn(
        '[useKSnackbar] Setting `assertive: true` has no effect when `announce: false`. ' +
          'The live region announcement will not be sent.',
      );
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
    if (!snackbarIsVisible.value) return;
    snackbarOptions.value = { ...snackbarOptions.value, text };
  }

  return {
    snackbarIsVisible: readonly(snackbarIsVisible),
    snackbarOptions: readonly(snackbarOptions),
    createSnackbar,
    clearSnackbar,
    setSnackbarText,
  };
}

/**
 * Creates an independent local snackbar instance with its own isolated state.
 * Use this for advanced cases where a component needs its own KSnackbar
 * separate from the global one — for example, to pass a custom slot
 * (e.g. a KIcon alongside the snackbar text).
 *
 * Must be paired with its own <KSnackbar> instance in the template.
 *
 * For the typical app-wide snackbar, use the default export `useKSnackbar` instead.
 */
export function useKLocalSnackbar() {
  return _useLocalKSnackbar();
}

// Global singleton — a single shared instance for app-wide use.
const globalSnackbar = _useLocalKSnackbar();

/**
 * A composable for managing the global snackbar.
 * Returns the shared singleton state and actions (createSnackbar, clearSnackbar, setSnackbarText).
 *
 * For advanced local use cases requiring an isolated KSnackbar instance,
 * use the named export `useKLocalSnackbar` instead.
 */
export default function useKSnackbar() {
  return globalSnackbar;
}
