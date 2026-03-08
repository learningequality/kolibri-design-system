import { nextTick } from 'vue';
import useKSnackbar from '../index';

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
      createSnackbar({ text: 'Test message' });

      expect(snackbarIsVisible.value).toBe(true);
      expect(snackbarOptions.value.text).toBe('Test message');
    });

    it('supports string shorthand', () => {
      createSnackbar('Quick message');

      expect(snackbarIsVisible.value).toBe(true);
      expect(snackbarOptions.value.text).toBe('Quick message');
      expect(snackbarOptions.value.autoDismiss).toBe(true);
    });

    it('stores duration and autoDismiss options', () => {
      createSnackbar({ text: 'Test', duration: 3000, autoDismiss: true });

      expect(snackbarIsVisible.value).toBe(true);
      expect(snackbarOptions.value.duration).toBe(3000);
      expect(snackbarOptions.value.autoDismiss).toBe(true);
    });

    it('respects autoDismiss: false', () => {
      createSnackbar({ text: 'Test', autoDismiss: false, duration: 3000 });

      expect(snackbarIsVisible.value).toBe(true);
      expect(snackbarOptions.value.autoDismiss).toBe(false);
      expect(snackbarOptions.value.duration).toBe(3000);
    });

    it('calls hideCallback before showing new snackbar', async () => {
      const hideCallback = jest.fn();

      createSnackbar({ text: 'First', hideCallback });
      expect(hideCallback).not.toHaveBeenCalled();

      createSnackbar({ text: 'Second' });
      expect(hideCallback).toHaveBeenCalledTimes(1);

      await nextTick();
      expect(snackbarOptions.value.text).toBe('Second');
    });

    it('updates in place with forceReuse without replaying transition', () => {
      createSnackbar({ text: 'Connection lost', duration: 0 });
      expect(snackbarOptions.value.text).toBe('Connection lost');
      expect(snackbarIsVisible.value).toBe(true);
      createSnackbar({ text: 'Reconnecting...', duration: 0, forceReuse: true });
      expect(snackbarOptions.value.text).toBe('Reconnecting...');
      expect(snackbarIsVisible.value).toBe(true);
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
  });

  describe('clearSnackbar', () => {
    it('hides the snackbar when called', () => {
      createSnackbar({ text: 'Test', duration: 0 });
      clearSnackbar();

      expect(snackbarIsVisible.value).toBe(false);
    });

    it('calls hideCallback when hiding', () => {
      const hideCallback = jest.fn();

      createSnackbar({ text: 'Test', duration: 0, hideCallback });
      clearSnackbar();

      expect(hideCallback).toHaveBeenCalledTimes(1);
    });

    it('hides snackbar immediately when called', () => {
      createSnackbar({ text: 'Test', duration: 5000 });
      expect(snackbarIsVisible.value).toBe(true);

      clearSnackbar();
      expect(snackbarIsVisible.value).toBe(false);
    });
  });

  describe('setSnackbarText', () => {
    it('updates snackbar text', () => {
      createSnackbar({ text: 'Original', duration: 0 });
      expect(snackbarOptions.value.text).toBe('Original');

      setSnackbarText('Updated');
      expect(snackbarOptions.value.text).toBe('Updated');
      expect(snackbarIsVisible.value).toBe(true);
    });
  });
});
