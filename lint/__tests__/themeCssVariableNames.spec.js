import { generateThemeCssVariables } from '../../lib/styles/themeCssVariables';
import {
  getThemeCssVariableNames,
  isThemedCustomProperty,
  suggestThemeCssVariableName,
} from '../themeCssVariableNames';

describe('getThemeCssVariableNames', () => {
  it('matches the CSS variables the theme actually emits at runtime', () => {
    // Both are derived from `colorsDefault.js` and `colorsMaterial.js`, so this
    // fails if the lint rules ever fall out of sync with the theme
    const emitted = Object.keys(generateThemeCssVariables()).sort();
    const derived = [...getThemeCssVariableNames()].sort();
    expect(derived).toEqual(emitted);
  });

  it('includes token, brand, and palette names, versioned as `vN` not `v_N`', () => {
    const names = getThemeCssVariableNames();
    expect(names.has('--tokens-focusOutline')).toBe(true);
    expect(names.has('--brand-primary-v600')).toBe(true);
    expect(names.has('--palette-grey-v400')).toBe(true);
    expect(names.has('--palette-black')).toBe(true);
    expect(names.has('--palette-grey-v_400')).toBe(false);
  });
});

describe('isThemedCustomProperty', () => {
  it('is true for theme-owned prefixes', () => {
    expect(isThemedCustomProperty('--tokens-primary')).toBe(true);
    expect(isThemedCustomProperty('--brand-primary-v500')).toBe(true);
    expect(isThemedCustomProperty('--palette-grey-v400')).toBe(true);
  });

  it("is false for a component's own custom properties", () => {
    expect(isThemedCustomProperty('--someLocalProperty')).toBe(false);
    expect(isThemedCustomProperty('--token-primary')).toBe(false);
  });
});

describe('suggestThemeCssVariableName', () => {
  it('normalizes the source `v_N` version key form to a valid name', () => {
    expect(suggestThemeCssVariableName('--palette-grey-v_400')).toBe('--palette-grey-v400');
    expect(suggestThemeCssVariableName('--brand-primary-v_600')).toBe('--brand-primary-v600');
  });

  it('is null when normalizing does not produce a valid name', () => {
    expect(suggestThemeCssVariableName('--tokens-focusOutine')).toBe(null);
    expect(suggestThemeCssVariableName('--palette-grey-v_999')).toBe(null);
  });
});
