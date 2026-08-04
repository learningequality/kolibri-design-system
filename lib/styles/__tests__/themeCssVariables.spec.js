const fs = require('node:fs');
const path = require('node:path');

const COMMON_SCSS_PATH = path.resolve(__dirname, '../common.scss');

// Splits var() args on the top-level comma so a comma inside a function-valued
// fallback is not mistaken for the separator. fallback is null when absent
function splitVarArgs(args) {
  let depth = 0;
  for (let i = 0; i < args.length; i++) {
    const character = args[i];
    if (character === '(') {
      depth++;
    } else if (character === ')') {
      depth--;
    } else if (character === ',' && depth === 0) {
      return { name: args.slice(0, i).trim(), fallback: args.slice(i + 1).trim() };
    }
  }
  return { name: args.trim(), fallback: null };
}

// Parses every var() usage, matching parenthesis by depth so a function-valued fallback
// such as rgba(0, 0, 0, 0.5) is captured whole rather than truncated at the first ')'
function parseVarUsages(scss) {
  const usages = [];
  let start = scss.indexOf('var(');
  while (start !== -1) {
    const argsStart = start + 'var('.length;
    let depth = 1;
    let end = argsStart;
    while (end < scss.length && depth > 0) {
      if (scss[end] === '(') {
        depth++;
      } else if (scss[end] === ')') {
        depth--;
      }
      end++;
    }
    // unclosed usage -> reported as missing a fallback rather than dropped
    usages.push(splitVarArgs(depth === 0 ? scss.slice(argsStart, end - 1) : ''));
    // resume inside the args so a nested var() is parsed in its own right too
    start = scss.indexOf('var(', argsStart);
  }
  return usages;
}

let cachedScan;

// Reads/parses common.scss once; Returns data only: occurrences is counted
// without the parser so the coverage test cross-checks parseVarUsages
function scanCommonScss() {
  if (!cachedScan) {
    const scss = fs.readFileSync(COMMON_SCSS_PATH, 'utf8');
    cachedScan = {
      occurrences: (scss.match(/var\(/g) || []).length,
      usages: parseVarUsages(scss),
    };
  }
  return cachedScan;
}

const TEST_BRAND_COLORS = {
  primary: {
    v_100: '#CCE7E7',
    v_200: '#99CFCF',
    v_300: '#66B7B7',
    v_400: '#339F9F',
    v_500: '#008787',
    v_600: '#006C6C',
  },
  secondary: {
    v_100: '#F3D5CC',
    v_200: '#E7AB99',
    v_300: '#DB8166',
    v_400: '#CF5733',
    v_500: '#C32D00',
    v_600: '#9C2400',
  },
};

// required once: tests only read their color strings and never mutate them
const palette = require('../colorsMaterial').default;
const brand = require('../colorsDefault').defaultBrandColors;

describe('themeCssVariables', () => {
  let Vue;
  let themeCssVariables;
  let theme;

  beforeEach(() => {
    // fresh modules so that the `initialized` flag and
    // `globalThemeState` are reset between tests
    jest.resetModules();
    document.head.innerHTML = '';
    Vue = require('vue');
    themeCssVariables = require('../themeCssVariables');
    theme = require('../theme');
  });

  afterEach(() => {
    // process.server is a real global that resetModules cannot undo; theme mutations
    // are discarded with the module in the next beforeEach
    delete process.server;
  });

  function getStyleTag() {
    return document.getElementById(themeCssVariables.THEME_CSS_VARIABLES_STYLE_ID);
  }

  describe('generateThemeCssVariables', () => {
    it('emits palette colors with version keys formatted as vN', () => {
      const variables = themeCssVariables.generateThemeCssVariables();
      expect(variables['--palette-grey-v400']).toBe(palette.grey.v_400);
      expect(variables['--palette-black']).toBe(palette.black);
      expect(variables['--palette-white']).toBe(palette.white);
      // the v_N form should not be emitted
      expect(variables['--palette-grey-v_400']).toBeUndefined();
    });

    it('emits brand colors with version keys formatted as vN', () => {
      const variables = themeCssVariables.generateThemeCssVariables();
      expect(variables['--brand-primary-v600']).toBe(brand.primary.v_600);
      expect(variables['--brand-secondary-v100']).toBe(brand.secondary.v_100);
    });

    it('emits theme tokens resolved to color values', () => {
      const variables = themeCssVariables.generateThemeCssVariables();
      // default mapping: primary -> brand.primary.v_500,
      // focusOutline -> palette.lightblue.v_400, text -> palette.black
      expect(variables['--tokens-primary']).toBe(brand.primary.v_500);
      expect(variables['--tokens-focusOutline']).toBe(palette.lightblue.v_400);
      expect(variables['--tokens-text']).toBe(palette.black);
    });

    it('skips and warns on a token name that would corrupt the CSS rule', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      theme.setTokenMapping({ 'evil: red; } body { color': 'palette.red.v_500' });
      const variables = themeCssVariables.generateThemeCssVariables();
      expect(Object.keys(variables)).not.toContainEqual(expect.stringContaining('evil'));
      expect(warn).toHaveBeenCalled();
      warn.mockRestore();
    });
  });

  describe('themeCssVariablesText', () => {
    it('wraps the variables in a :root rule', () => {
      const cssText = themeCssVariables.themeCssVariablesText();
      expect(cssText).toMatch(/^:root\s*\{/);
      expect(cssText).toContain(`--tokens-primary: ${brand.primary.v_500};`);
    });
  });

  describe('initThemeCssVariables', () => {
    it('writes the variables to a style tag in the document head', () => {
      themeCssVariables.default();
      const styleTag = getStyleTag();
      expect(styleTag).toBeInTheDocument();
      expect(document.head).toContainElement(styleTag);
      // verify the exact output (toHaveTextContent normalizes whitespace)
      // eslint-disable-next-line jest-dom/prefer-to-have-text-content
      expect(styleTag.textContent).toEqual(themeCssVariables.themeCssVariablesText());
    });

    it('is initialized only once', async () => {
      themeCssVariables.default();
      themeCssVariables.default();
      expect(
        document.head.querySelectorAll(`#${themeCssVariables.THEME_CSS_VARIABLES_STYLE_ID}`),
      ).toHaveLength(1);
      // updates keep working after a redundant init
      theme.setBrandColors(TEST_BRAND_COLORS);
      await Vue.nextTick();
      expect(getStyleTag()).toHaveTextContent(
        `--tokens-primary: ${TEST_BRAND_COLORS.primary.v_500};`,
      );
    });

    it('updates the variables when brand colors change', async () => {
      themeCssVariables.default();
      theme.setBrandColors(TEST_BRAND_COLORS);
      await Vue.nextTick();
      const styleTag = getStyleTag();
      expect(styleTag).toHaveTextContent(
        `--brand-primary-v500: ${TEST_BRAND_COLORS.primary.v_500};`,
      );
      expect(styleTag).toHaveTextContent(
        `--brand-secondary-v600: ${TEST_BRAND_COLORS.secondary.v_600};`,
      );
      expect(styleTag).toHaveTextContent(`--tokens-primary: ${TEST_BRAND_COLORS.primary.v_500};`);
      // unrelated variables stay emitted and unchanged
      expect(styleTag).toHaveTextContent(`--palette-grey-v400: ${palette.grey.v_400};`);
    });

    it('regenerates tokens when the mapping changes, including newly added tokens', async () => {
      themeCssVariables.default();
      theme.setTokenMapping({ primary: 'palette.green.v_500', customToken: 'palette.red.v_500' });
      await Vue.nextTick();
      const styleTag = getStyleTag();
      expect(styleTag).toHaveTextContent(`--tokens-primary: ${palette.green.v_500};`);
      expect(styleTag).toHaveTextContent(`--tokens-customToken: ${palette.red.v_500};`);
    });
  });

  describe('literal fallbacks in common.scss', () => {
    // Fallbacks must stay in sync with the defaults in colorsDefault.js / colorsMaterial.js
    let withFallback;
    let withoutFallback;

    beforeAll(() => {
      const { usages } = scanCommonScss();
      withFallback = usages.filter(usage => usage.fallback !== null);
      withoutFallback = usages.filter(usage => usage.fallback === null);
    });

    it('are parsed from every var() usage in the file', () => {
      const { occurrences, usages } = scanCommonScss();
      expect(occurrences).toBeGreaterThan(0);
      expect(usages).toHaveLength(occurrences);
    });

    it('are present on every themed variable used in common.scss', () => {
      expect(withoutFallback.map(usage => usage.name)).toEqual([]);
    });

    it('are literal values rather than another var()', () => {
      // a var() fallback would reintroduce the invalidation the fallbacks exist to prevent
      const nonLiteral = withFallback.filter(usage => usage.fallback.includes('var('));
      expect(nonLiteral.map(usage => usage.name)).toEqual([]);
    });

    it('match the default values of the variables they fall back to', () => {
      const variables = themeCssVariables.generateThemeCssVariables();
      // compared as lists so a failure names the offending variables and every fallback
      // of a repeated variable is checked
      const fallbacks = withFallback.map(
        ({ name, fallback }) => `${name}: ${fallback.toLowerCase()}`,
      );
      // undefined for a never-emitted variable, which is also a mismatch
      const defaults = withFallback.map(
        ({ name }) => `${name}: ${variables[name] && variables[name].toLowerCase()}`,
      );
      expect(fallbacks).toEqual(defaults);
    });
  });

  describe('with server-side rendering', () => {
    it('does not touch the document on the server', () => {
      // flag set before require so the test holds even if the SSR check moves to import
      // time; isolateModules scopes this registry, leaving beforeEach's in place
      process.server = true;
      jest.isolateModules(() => {
        const ssrThemeCssVariables = require('../themeCssVariables');
        ssrThemeCssVariables.default();
        expect(document.head.querySelector('style')).toBeNull();
        // text for server-side head injection is still generated
        expect(ssrThemeCssVariables.themeCssVariablesText()).toContain('--tokens-primary:');
      });
    });

    it('takes over the server-rendered tag from vue-meta', () => {
      const ssrStyleTag = document.createElement('style');
      ssrStyleTag.id = themeCssVariables.THEME_CSS_VARIABLES_STYLE_ID;
      ssrStyleTag.setAttribute('data-n-head', 'ssr');
      ssrStyleTag.setAttribute('data-hid', themeCssVariables.THEME_CSS_VARIABLES_STYLE_ID);
      document.head.appendChild(ssrStyleTag);

      themeCssVariables.default();
      // markers removed so vue-meta cannot drop the tag or rewrite it with stale CSS
      expect(ssrStyleTag).not.toHaveAttribute('data-n-head');
      expect(ssrStyleTag).not.toHaveAttribute('data-hid');
    });

    it('reuses and updates the style tag written during server-side rendering', async () => {
      const ssrStyleTag = document.createElement('style');
      ssrStyleTag.id = themeCssVariables.THEME_CSS_VARIABLES_STYLE_ID;
      ssrStyleTag.textContent = themeCssVariables.themeCssVariablesText();
      document.head.appendChild(ssrStyleTag);

      themeCssVariables.default();
      expect(
        document.head.querySelectorAll(`#${themeCssVariables.THEME_CSS_VARIABLES_STYLE_ID}`),
      ).toHaveLength(1);

      theme.setBrandColors(TEST_BRAND_COLORS);
      await Vue.nextTick();
      expect(ssrStyleTag).toHaveTextContent(
        `--tokens-primary: ${TEST_BRAND_COLORS.primary.v_500};`,
      );
    });
  });
});
