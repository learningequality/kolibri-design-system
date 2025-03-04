import { darken1, darken2, darken3 } from '../darkenColors';

/**
 * Verify integration with 'color' library.
 */
describe('darken', () => {
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
});
