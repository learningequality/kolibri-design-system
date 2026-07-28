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

describe('themeCssVariables', () => {
  let Vue;
  let themeCssVariables;
  let theme;
  let palette;
  let brand;

  beforeEach(() => {
    // fresh modules so that the `initialized` flag and
    // `globalThemeState` are reset between tests
    jest.resetModules();
    document.head.innerHTML = '';
    Vue = require('vue');
    themeCssVariables = require('../themeCssVariables');
    theme = require('../theme');
    palette = require('../colorsMaterial').default;
    brand = require('../colorsDefault').defaultBrandColors;
  });

  afterEach(() => {
    delete process.server;
  });

  function getStyleTag() {
    return document.getElementById(themeCssVariables.THEME_CSS_VARIABLES_STYLE_ID);
  }

  it('smoke test: initializes without throwing', () => {
    expect(() => themeCssVariables.default()).not.toThrow();
  });

  describe('generateThemeCssVariables', () => {
    it('emits palette colors with version keys formatted as vN', () => {
      const variables = themeCssVariables.generateThemeCssVariables();
      expect(variables['--palette-grey-v400']).toBe(palette.grey.v_400);
      expect(variables['--palette-black']).toBe(palette.black);
      expect(variables['--palette-white']).toBe(palette.white);
      // the `v_N` form should not be emitted
      expect(variables['--palette-grey-v_400']).toBeUndefined();
    });

    it('emits brand colors with version keys formatted as vN', () => {
      const variables = themeCssVariables.generateThemeCssVariables();
      expect(variables['--brand-primary-v600']).toBe(brand.primary.v_600);
      expect(variables['--brand-secondary-v100']).toBe(brand.secondary.v_100);
      // the `v_N` form should not be emitted
      expect(variables['--brand-primary-v_600']).toBeUndefined();
    });

    it('emits theme tokens as-is, resolved to color values', () => {
      const variables = themeCssVariables.generateThemeCssVariables();
      // default token mapping: primary -> brand.primary.v_500,
      // focusOutline -> palette.lightblue.v_400, text -> palette.black
      expect(variables['--tokens-primary']).toBe(brand.primary.v_500);
      expect(variables['--tokens-focusOutline']).toBe(palette.lightblue.v_400);
      expect(variables['--tokens-text']).toBe(palette.black);
    });

    it('skips and warns on a token name that would corrupt the CSS rule', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      theme.setTokenMapping({ 'evil: red; } body { color': 'palette.red.v_500' });
      const variables = themeCssVariables.generateThemeCssVariables();
      expect(Object.keys(variables).some(name => name.includes('evil'))).toBe(false);
      expect(warn).toHaveBeenCalled();
      warn.mockRestore();
    });
  });

  describe('themeCssVariablesText', () => {
    it('returns a :root rule containing the variables', () => {
      const cssText = themeCssVariables.themeCssVariablesText();
      expect(cssText).toMatch(/^:root\s*\{/);
      expect(cssText).toContain(`--palette-grey-v400: ${palette.grey.v_400};`);
      expect(cssText).toContain(`--brand-primary-v600: ${brand.primary.v_600};`);
      expect(cssText).toContain(`--tokens-primary: ${brand.primary.v_500};`);
    });
  });

  describe('initThemeCssVariables', () => {
    it('writes the variables to a style tag in the document head', () => {
      themeCssVariables.default();
      const styleTag = getStyleTag();
      expect(styleTag).toBeInTheDocument();
      expect(document.head).toContainElement(styleTag);
      // exact-equality on textContent is intentional, to verify the exact serialized
      // output (`toHaveTextContent` would normalize whitespace)
      const cssText = styleTag.textContent;
      expect(cssText).toEqual(themeCssVariables.themeCssVariablesText());
    });

    it('is initialized only once', async () => {
      themeCssVariables.default();
      themeCssVariables.default();
      expect(
        document.head.querySelectorAll(`#${themeCssVariables.THEME_CSS_VARIABLES_STYLE_ID}`),
      ).toHaveLength(1);
      // updates keep working after a redundant initialization
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
      // `primary` token maps to `brand.primary.v_500`
      expect(styleTag).toHaveTextContent(`--tokens-primary: ${TEST_BRAND_COLORS.primary.v_500};`);
      // unrelated variables are still emitted, unchanged
      expect(styleTag).toHaveTextContent(`--palette-grey-v400: ${palette.grey.v_400};`);
    });

    it('updates the variables when the token mapping changes', async () => {
      themeCssVariables.default();
      theme.setTokenMapping({ primary: 'palette.green.v_500' });
      await Vue.nextTick();
      expect(getStyleTag()).toHaveTextContent(`--tokens-primary: ${palette.green.v_500};`);
    });

    it('emits newly added tokens', async () => {
      themeCssVariables.default();
      theme.setTokenMapping({ customToken: 'palette.red.v_500' });
      await Vue.nextTick();
      expect(getStyleTag()).toHaveTextContent(`--tokens-customToken: ${palette.red.v_500};`);
    });
  });

  describe('with server-side rendering', () => {
    it('does not touch the document on the server', () => {
      // set the flag before the module is required, so that the test stays
      // correct even if the SSR check were moved to import time
      jest.resetModules();
      process.server = true;
      const ssrThemeCssVariables = require('../themeCssVariables');
      ssrThemeCssVariables.default();
      expect(document.head.querySelector('style')).toBeNull();
      // the text used for server-side head injection is still generated
      expect(ssrThemeCssVariables.themeCssVariablesText()).toContain('--tokens-primary:');
    });

    it('takes over the server-rendered tag from vue-meta', () => {
      // simulate a tag rendered into the head by the server via vue-meta
      const ssrStyleTag = document.createElement('style');
      ssrStyleTag.id = themeCssVariables.THEME_CSS_VARIABLES_STYLE_ID;
      ssrStyleTag.setAttribute('data-n-head', 'ssr');
      ssrStyleTag.setAttribute('data-hid', themeCssVariables.THEME_CSS_VARIABLES_STYLE_ID);
      document.head.appendChild(ssrStyleTag);

      themeCssVariables.default();
      // vue-meta's marker attributes are removed so that vue-meta can neither
      // remove the tag on head updates nor rewrite it with stale CSS
      expect(ssrStyleTag).not.toHaveAttribute('data-n-head');
      expect(ssrStyleTag).not.toHaveAttribute('data-hid');
    });

    it('reuses and updates the style tag written during server-side rendering', async () => {
      // simulate a tag rendered into the head by the server
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
