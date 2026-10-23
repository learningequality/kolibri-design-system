import { darken1, darken2, darken3 } from '../darkenColors';

/**
 * Verify integration with 'color' library.
 */
describe('darken', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('darken1', () => {
    it('should darken the color by 19%', () => {
      expect(darken1('#FFFFFF')).toEqual('#CFCFCF');
    });
  });

  describe('darken2', () => {
    it('should darken the color by 40%', () => {
      expect(darken2('#FFFFFF')).toEqual('#999999');
    });
  });

  describe('darken3', () => {
    it('should darken the color by 58%', () => {
      expect(darken3('#FFFFFF')).toEqual('#6B6B6B');
    });
  });

  // the 'color' library throws on what it cannot parse, and turns a missing value black
  describe('a value it cannot darken', () => {
    let warn;

    beforeEach(() => {
      warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    it('should return a missing color unchanged, leaving the caller to fall back', () => {
      expect(darken1(undefined)).toBeUndefined();
      expect(warn).toHaveBeenCalled();
    });

    it('should return an unparseable CSS value unchanged', () => {
      expect(darken2('var(--tokens-primary)')).toEqual('var(--tokens-primary)');
      expect(warn).toHaveBeenCalled();
    });
  });
});
