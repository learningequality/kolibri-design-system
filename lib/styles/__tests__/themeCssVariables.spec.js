const fs = require('node:fs');
const path = require('node:path');

const GLOBALS_SCSS_PATH = path.resolve(__dirname, '../globals.scss');
const globalsScss = fs.readFileSync(GLOBALS_SCSS_PATH, 'utf8');

// Every var() usage in globals.scss
const GLOBALS_SCSS_VAR_FALLBACKS = [
  ['--tokens-text', '#000000'],
  ['--palette-grey-v100', '#f5f5f5'],
  ['--tokens-focusOutline', '#33acf5'],
  ['--brand-secondary-v100', '#fff5cc'],
];

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

  describe('globals.scss', () => {
    it('uses only the var() fallbacks listed above', () => {
      // deliberately flat matching: a nested or function-valued fallback fails this
      // test rather than being parsed, prompting an update to the table
      const usages = globalsScss.match(/var\([^)]*\)/g) || [];
      const listed = GLOBALS_SCSS_VAR_FALLBACKS.map(
        ([name, fallback]) => `var(${name}, ${fallback})`,
      );
      expect(usages).not.toHaveLength(0);
      expect(usages.filter(usage => !listed.includes(usage))).toEqual([]);
      // verify that the file is still importing globals.scss, where the variables are defined
      expect(fs.readFileSync(path.resolve(__dirname, '../common.scss'), 'utf8')).toContain("@import 'globals';");
    });

    it('falls back to the value the theme emits for each variable', () => {
      const variables = themeCssVariables.generateThemeCssVariables();
      const fallbacks = GLOBALS_SCSS_VAR_FALLBACKS.map(
        ([name, fallback]) => `${name}: ${fallback}`,
      );
      // undefined for a never-emitted variable, which is also a mismatch
      const defaults = GLOBALS_SCSS_VAR_FALLBACKS.map(
        ([name]) => `${name}: ${variables[name] && variables[name].toLowerCase()}`,
      );
      expect(fallbacks).toEqual(defaults);
    });

    it('keeps the *:focus ring in sync with themeOutlineStyle()', () => {
      const outline = theme.themeOutlineStyle();
      expect(globalsScss).toContain(`outline-width: ${outline.outlineWidth};`);
      expect(globalsScss).toContain(`outline-style: ${outline.outlineStyle};`);
      expect(globalsScss).toContain(`outline-offset: ${outline.outlineOffset};`);
      expect(outline.outlineColor).toBe(
        themeCssVariables.generateThemeCssVariables()['--tokens-focusOutline'],
      );
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
