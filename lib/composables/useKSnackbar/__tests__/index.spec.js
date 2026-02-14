import useKSnackbar from '../index';

describe('useKSnackbar composable', () => {
  let snackbarState;
  let createSnackbar;
  let hideSnackbar;
  let clearSnackbarQueue;

  beforeEach(() => {
    jest.useFakeTimers();

    const instance = useKSnackbar();
    snackbarState = instance.snackbarState;
    createSnackbar = instance.createSnackbar;
    hideSnackbar = instance.hideSnackbar;
    clearSnackbarQueue = instance.clearSnackbarQueue;

    if (snackbarState.value.isOpen) {
      hideSnackbar();
    }
    clearSnackbarQueue();

    jest.runAllTimers();
  });

  afterEach(() => {
    if (snackbarState.value.isOpen) {
      hideSnackbar();
    }
    clearSnackbarQueue();
    jest.runAllTimers();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('createSnackbar', () => {
    it('creates and shows snackbar with text', () => {
      createSnackbar({ text: 'Test message' });

      expect(snackbarState.value.isOpen).toBe(true);
      expect(snackbarState.value.text).toBe('Test message');
    });

    it('auto-hides snackbar after duration', () => {
      createSnackbar({ text: 'Test', duration: 3000 });
      expect(snackbarState.value.isOpen).toBe(true);

      jest.advanceTimersByTime(3000);
      expect(snackbarState.value.isOpen).toBe(false);
    });

    it('queues snackbars and shows next after current hides', () => {
      createSnackbar({ text: 'First', duration: 1000 });
      createSnackbar({ text: 'Second', duration: 1000 });

      expect(snackbarState.value.text).toBe('First');

      jest.advanceTimersByTime(1000);
      jest.advanceTimersByTime(400);

      expect(snackbarState.value.text).toBe('Second');
    });

    it('replaces queue with latest when multiple are added', () => {
      createSnackbar({ text: 'First', duration: 2000 });
      createSnackbar({ text: 'Second', duration: 2000 });
      createSnackbar({ text: 'Third', duration: 2000 });

      jest.advanceTimersByTime(2000);
      jest.advanceTimersByTime(400);

      expect(snackbarState.value.text).toBe('Third');
    });

    it('immediately updates with forceReuse', () => {
      createSnackbar({ text: 'First', duration: 5000 });
      createSnackbar({ text: 'Second', forceReuse: true });

      expect(snackbarState.value.text).toBe('Second');
      expect(snackbarState.value.isOpen).toBe(true);
    });
  });

  describe('hideSnackbar', () => {
    it('hides the snackbar when called', () => {
      createSnackbar({ text: 'Test', duration: 0 });
      hideSnackbar();

      expect(snackbarState.value.isOpen).toBe(false);
    });

    it('calls onClose callback when hiding', () => {
      const onClose = jest.fn();

      createSnackbar({ text: 'Test', duration: 0, onClose });
      hideSnackbar();

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('clearSnackbarQueue', () => {
    it('clears queued snackbars', () => {
      createSnackbar({ text: 'First', duration: 1000 });
      createSnackbar({ text: 'Second', duration: 1000 });

      clearSnackbarQueue();

      jest.advanceTimersByTime(1000);
      jest.advanceTimersByTime(400);

      expect(snackbarState.value.isOpen).toBe(false);
    });
  });
});
