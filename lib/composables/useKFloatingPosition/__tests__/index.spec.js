import useKFloatingPosition, { _instances } from '../index.js';

jest.mock('@floating-ui/dom', () => ({
  computePosition: jest.fn().mockResolvedValue({ x: 10, y: 20, strategy: 'absolute' }),
  // Real 'autoUpdate' calls the update function once,
  // synchronously, as it sets up - that first call is
  // what 'initPosition' returns as its promise
  autoUpdate: jest.fn((anchorEl, floatingEl, update) => {
    update();
    return jest.fn();
  }),
}));

const {
  initPosition,
  destroyPosition,
  autoUpdate: mockAutoUpdate,
  computePosition: mockComputePosition,
} = useKFloatingPosition();

describe('useKFloatingPosition', () => {
  let anchorEl, floatingEl;

  beforeEach(() => {
    jest.clearAllMocks();
    anchorEl = document.createElement('div');
    floatingEl = document.createElement('div');
    document.body.appendChild(anchorEl);
    document.body.appendChild(floatingEl);
  });

  afterEach(() => {
    destroyPosition('floating-1');
    document.body.innerHTML = '';
  });

  describe('initPosition', () => {
    it('stores the instance, sets up auto-updating, and updates the position', async () => {
      await initPosition('floating-1', floatingEl, anchorEl, { placement: 'bottom' });

      expect(mockAutoUpdate).toHaveBeenCalledWith(anchorEl, floatingEl, expect.any(Function));
      expect(_instances['floating-1']).toEqual({
        cleanup: mockAutoUpdate.mock.results[0].value,
        floatingEl,
      });

      expect(mockComputePosition).toHaveBeenCalledWith(anchorEl, floatingEl, {
        placement: 'bottom',
      });
      expect(floatingEl).toHaveStyle({ position: 'absolute' });
      expect(floatingEl).toHaveStyle({ left: '10px' });
      expect(floatingEl).toHaveStyle({ top: '20px' });
    });

    it('cleans up any existing instance before reinitializing', () => {
      initPosition('floating-1', floatingEl, anchorEl, {});
      const firstCleanup = _instances['floating-1'].cleanup;

      initPosition('floating-1', floatingEl, anchorEl, {});
      expect(firstCleanup).toHaveBeenCalledTimes(1);
      expect(_instances['floating-1']).toBeDefined();
    });
  });

  describe('destroyPosition', () => {
    it('stops auto-updating and removes the instance', () => {
      initPosition('floating-1', floatingEl, anchorEl, {});
      const mockCleanup = _instances['floating-1'].cleanup;

      destroyPosition('floating-1');
      expect(mockCleanup).toHaveBeenCalledTimes(1);
      expect(_instances['floating-1']).toBeUndefined();
    });
  });
});
