const fs = require('node:fs');
const path = require('node:path');

const DEFAULTS_PATH = path.resolve(__dirname, '../../lib/styles/themeDefaults.scss');

describe('extractThemeDefaults', () => {
  let generateThemeCssVariables;
  let getThemeCssVariableValues;
  let themeDefaultsScss;

  beforeEach(() => {
    // fresh modules, so that a test overriding the theme cannot leave
    // `globalThemeState` changed for the next one
    jest.resetModules();
    ({ generateThemeCssVariables } = require('../../lib/styles/themeCssVariables'));
    ({ getThemeCssVariableValues, themeDefaultsScss } = require('../extractThemeDefaults'));
  });

  it('matches the committed themeDefaults.scss, so a stale checkout fails', () => {
    const committed = fs.readFileSync(DEFAULTS_PATH, 'utf8');
    // run `yarn pregenerate` when this fails
    expect(committed).toBe(themeDefaultsScss());
  });

  it('resolves the same values the theme emits, tokens resolved by path', () => {
    // the values are resolved here rather than by `theme.js`, so this fails if the
    // two ever disagree about what a `tokenMapping` path points at
    expect(Object.fromEntries(getThemeCssVariableValues())).toEqual(generateThemeCssVariables());
  });
});
