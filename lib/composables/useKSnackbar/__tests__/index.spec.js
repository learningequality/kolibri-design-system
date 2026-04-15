import { nextTick } from 'vue';
import useKSnackbar, { useKLocalSnackbar } from '../index';

describe('useKSnackbar composable', () => {
  let snackbarIsVisible;
  let snackbarOptions;
  let createSnackbar;
  let clearSnackbar;
  let setSnackbarText;

  beforeEach(() => {
    jest.useFakeTimers();

    const instance = useKSnackbar();
    snackbarIsVisible = instance.snackbarIsVisible;
    snackbarOptions = instance.snackbarOptions;
    createSnackbar = instance.createSnackbar;
    clearSnackbar = instance.clearSnackbar;
    setSnackbarText = instance.setSnackbarText;

    if (snackbarIsVisible.value) {
      clearSnackbar();
    }

    jest.runAllTimers();
  });

  afterEach(() => {
    if (snackbarIsVisible.value) {
      clearSnackbar();
    }
    jest.runAllTimers();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('createSnackbar', () => {
    it('creates and shows snackbar with text', () => {
      createSnackbar({ text: 'Test message', announce: true });

      expect(snackbarIsVisible.value).toBe(true);
      expect(snackbarOptions.value.text).toBe('Test message');
    });

    it('supports string shorthand', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      createSnackbar('Quick message');

      expect(snackbarIsVisible.value).toBe(true);
      expect(snackbarOptions.value.text).toBe('Quick message');
      expect(snackbarOptions.value.autoDismiss).toBe(true);
      warnSpy.mockRestore();
    });

    it('stores duration and autoDismiss options', () => {
      createSnackbar({ text: 'Test', duration: 3000, autoDismiss: true, announce: true });

      expect(snackbarIsVisible.value).toBe(true);
      expect(snackbarOptions.value.duration).toBe(3000);
      expect(snackbarOptions.value.autoDismiss).toBe(true);
    });

    it('respects autoDismiss: false', () => {
      createSnackbar({ text: 'Test', autoDismiss: false, duration: 3000, announce: true });

      expect(snackbarIsVisible.value).toBe(true);
      expect(snackbarOptions.value.autoDismiss).toBe(false);
      expect(snackbarOptions.value.duration).toBe(3000);
    });

    it('preserves bottomOffset: 0 as a valid distinct value', () => {
      createSnackbar({ text: 'Test', bottomOffset: 0, announce: true });

      expect(snackbarOptions.value.bottomOffset).toBe(0);
    });

    it('calls hideCallback before showing the new snackbar', async () => {
      const hideCallback = jest.fn();

      createSnackbar({ text: 'First', hideCallback, announce: true });
      expect(hideCallback).not.toHaveBeenCalled();

      createSnackbar({ text: 'Second', announce: true });
      expect(hideCallback).toHaveBeenCalledTimes(1);

      await nextTick();
      expect(snackbarOptions.value.text).toBe('Second');
    });

    it('updates in place with forceReuse without replaying transition', () => {
      createSnackbar({ text: 'Connection lost', duration: 0, announce: true });
      expect(snackbarOptions.value.text).toBe('Connection lost');
      expect(snackbarIsVisible.value).toBe(true);
      createSnackbar({ text: 'Reconnecting...', duration: 0, forceReuse: true, announce: true });
      expect(snackbarOptions.value.text).toBe('Reconnecting...');
      expect(snackbarIsVisible.value).toBe(true);
    });

    it('does NOT call hideCallback when forceReuse is true', () => {
      const hideCallback = jest.fn();
      createSnackbar({ text: 'Connecting...', hideCallback, announce: true });
      createSnackbar({ text: 'Connected!', forceReuse: true, announce: true });
      expect(hideCallback).not.toHaveBeenCalled();
    });

    it('sets all options correctly', () => {
      const actionCallback = jest.fn();
      const hideCallback = jest.fn();
      const onBlur = jest.fn();

      createSnackbar({
        text: 'Test',
        actionText: 'Undo',
        actionCallback,
        duration: 5000,
        autoDismiss: false,
        bottomOffset: 64,
        backdrop: true,
        hideCallback,
        autofocus: true,
        onBlur,
        announce: true,
      });

      expect(snackbarOptions.value.text).toBe('Test');
      expect(snackbarOptions.value.actionText).toBe('Undo');
      expect(snackbarOptions.value.actionCallback).toBe(actionCallback);
      expect(snackbarOptions.value.duration).toBe(5000);
      expect(snackbarOptions.value.autoDismiss).toBe(false);
      expect(snackbarOptions.value.bottomOffset).toBe(64);
      expect(snackbarOptions.value.backdrop).toBe(true);
      expect(snackbarOptions.value.hideCallback).toBe(hideCallback);
      expect(snackbarOptions.value.autofocus).toBe(true);
      expect(snackbarOptions.value.onBlur).toBe(onBlur);
    });

    it('warns when announce option is not provided', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      createSnackbar({ text: 'No announce message' });
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('`announce` option is required'),
      );
      warnSpy.mockRestore();
    });

    it('warns when assertive is true but announce is false', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      createSnackbar({ text: 'Test', announce: false, assertive: true });
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('has no effect when `announce: false`'),
      );
      warnSpy.mockRestore();
    });
  });

  describe('clearSnackbar', () => {
    it('hides the snackbar when called', () => {
      createSnackbar({ text: 'Test', duration: 0, announce: true });
      clearSnackbar();

      expect(snackbarIsVisible.value).toBe(false);
    });

    it('calls hideCallback when hiding', () => {
      const hideCallback = jest.fn();

      createSnackbar({ text: 'Test', duration: 0, hideCallback, announce: true });
      clearSnackbar();

      expect(hideCallback).toHaveBeenCalledTimes(1);
    });

    it('hides snackbar immediately when called', () => {
      createSnackbar({ text: 'Test', duration: 5000, announce: true });
      expect(snackbarIsVisible.value).toBe(true);

      clearSnackbar();
      expect(snackbarIsVisible.value).toBe(false);
    });
  });

  describe('setSnackbarText', () => {
    it('updates snackbar text when the snackbar is visible', () => {
      createSnackbar({ text: 'Original', duration: 0, announce: true });
      expect(snackbarOptions.value.text).toBe('Original');

      setSnackbarText('Updated');
      expect(snackbarOptions.value.text).toBe('Updated');
      expect(snackbarIsVisible.value).toBe(true);
    });

    it('does nothing when the snackbar is not visible', () => {
      expect(snackbarIsVisible.value).toBe(false);

      setSnackbarText('Should not update');

      expect(snackbarOptions.value.text).toBe('');
      expect(snackbarIsVisible.value).toBe(false);
    });
  });
});

describe('useKLocalSnackbar composable', () => {
  it('returns an independent instance with its own isolated state', () => {
    const globalInstance = useKSnackbar();
    const localInstance = useKLocalSnackbar();

    globalInstance.createSnackbar({ text: 'Global message', announce: true });

    expect(globalInstance.snackbarIsVisible.value).toBe(true);
    expect(localInstance.snackbarIsVisible.value).toBe(false);

    globalInstance.clearSnackbar();
  });

  it('each call to useKLocalSnackbar creates a separate independent instance', () => {
    const localA = useKLocalSnackbar();
    const localB = useKLocalSnackbar();

    localA.createSnackbar({ text: 'Instance A', announce: true });

    expect(localA.snackbarIsVisible.value).toBe(true);
    expect(localB.snackbarIsVisible.value).toBe(false);

    localA.clearSnackbar();
  });

  it('exposes the same API as useKSnackbar', () => {
    const local = useKLocalSnackbar();

    expect(typeof local.createSnackbar).toBe('function');
    expect(typeof local.clearSnackbar).toBe('function');
    expect(typeof local.setSnackbarText).toBe('function');
    expect(local.snackbarIsVisible).toBeDefined();
    expect(local.snackbarOptions).toBeDefined();
  });
});
