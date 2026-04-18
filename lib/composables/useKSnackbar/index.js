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
    announce: options.announce,
    assertive: options.assertive || false,
    forceReuse: options.forceReuse || false,
  };
}

/**
 * @typedef {Object} SnackbarOptions
 * @property {String} [text=''] - The message text to display.
 * @property {String} [actionText=''] - Optional text for an action button.
 * @property {Function} [actionCallback=null] - Callback triggered when action button is clicked.
 * @property {Number} [duration=5000] - Duration in ms before the snackbar auto-dismisses.
 * @property {Boolean} [autoDismiss=true] - Whether the snackbar should automatically dismiss.
 * @property {Number} [bottomOffset=0] - Additional bottom offset in pixels.
 * @property {Boolean} [backdrop=false] - Whether to show a darkened backdrop and trap focus.
 * @property {Function} [hideCallback=null] - Callback triggered when the snackbar is dismissed.
 * @property {Boolean} [autofocus=false] - Whether to autofocus the snackbar when opened.
 * @property {Function} [onBlur=null] - Callback triggered when the snackbar loses focus.
 * @property {Boolean} announce - Required. Whether to announce the text to screen readers.
 * @property {Boolean} [assertive=false] - Whether the announcement should be assertive
 *                                         (interruptive).
 * @property {Boolean} [forceReuse=false] - Whether to forcefully reuse the current snackbar
 *                                          instance without re-animating.
 */

/**
 * @typedef {Object} KSnackbarComposable
 * @property {import('vue').Ref<Boolean>} snackbarIsVisible - Reactive ref tracking
 *                                                            visibility state.
 * @property {import('vue').Ref<SnackbarOptions>} snackbarOptions - Reactive ref containing
 *                                                                  current options.
 * @property {function(SnackbarOptions|string): void} createSnackbar - Function to trigger
 *                                                                     a snackbar.
 * @property {function(): void} clearSnackbar - Function to dismiss the active snackbar.
 * @property {function(string): void} setSnackbarText - Function to dynamically update the
 *                                                      text of the active snackbar.
 */

/**
 * Private factory that creates an independent snackbar state and actions.
 * All functions are closures over the local refs so each call produces
 * a fully isolated instance.
 *
 * @returns {KSnackbarComposable}
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
    } else {
      options = { ...options };
    }

    if (options.actionText) {
      const originalCallback = options.actionCallback;
      options.actionCallback = () => {
        if (typeof originalCallback === 'function') {
          originalCallback();
        }
        clearSnackbar();
      };
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

    const config = _getSnackbarOptions(options);

    if (snackbarIsVisible.value && config.forceReuse) {
      snackbarOptions.value = config;
      return;
    }

    if (snackbarIsVisible.value && typeof snackbarOptions.value.hideCallback === 'function') {
      snackbarOptions.value.hideCallback();
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
 *
 * @returns {KSnackbarComposable}
 */
export function useKLocalSnackbar() {
  return _useLocalKSnackbar();
}

const globalSnackbar = _useLocalKSnackbar();

/**
 * A composable for managing the global snackbar.
 * Returns the shared singleton state and actions (createSnackbar, clearSnackbar, setSnackbarText).
 *
 * For advanced local use cases requiring an isolated KSnackbar instance,
 * use the named export `useKLocalSnackbar` instead.
 *
 * @returns {KSnackbarComposable}
 */
export default function useKSnackbar() {
  return globalSnackbar;
}
