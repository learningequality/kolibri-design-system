import kolibriConfig from 'kolibri-format/eslint.config.mjs';

// kolibri-format 3.x turns these on and KDS has not worked through the existing
// violations. Tracked in [#1350]: https://github.com/learningequality/kolibri-design-system/issues/1350
const DEFERRED_PREFIXES = ['jsdoc/', 'vuejs-accessibility/'];
const DEFERRED_RULES = ['import-x/no-commonjs', 'kolibri/tests-no-hardcoded-strings'];

const deferred = Object.fromEntries(
  [
    ...new Set(
      kolibriConfig
        .flatMap(config => Object.keys(config.rules || {}))
        .filter(rule => DEFERRED_PREFIXES.some(prefix => rule.startsWith(prefix))),
    ),
    ...DEFERRED_RULES,
  ].map(rule => [rule, 'off']),
);

export default [
  ...kolibriConfig,
  { rules: deferred },
  // Docs and examples use Nuxt aliases (~, ~~) that can't be resolved
  {
    files: ['docs/**/*.vue', 'docs/**/*.js', 'examples/**/*.vue'],
    rules: {
      'import-x/no-unresolved': 'off',
    },
  },
  // Docs pages don't need i18n
  {
    files: ['docs/**/*.vue'],
    rules: {
      // Vuetify's helper attributes use hyphens and they would
      // not be recognized if auto-formatted to camel case
      'vue/attribute-hyphenation': 'off',
      // This rule conflicts with Nuxt page naming
      'vue/no-reserved-component-names': 'off',
      // This rule conflicts with Nuxt page naming
      'kolibri/vue-filename-and-component-name-match': 'off',
      // max-len rules are unhelpful for documentation
      'max-len': 'off',
      'vue/max-len': 'off',
      // Docs pages are not translated
      'vue/no-bare-strings-in-template': 'off',
    },
  },
  {
    files: ['examples/**/*.vue'],
    rules: {
      // Allow console.log in examples
      'no-console': 'off',
      // Examples are not translated
      'vue/no-bare-strings-in-template': 'off',
    },
  },
  // jest.conf files: allow ~~ alias and puppeteer globals
  {
    files: ['jest.conf/**/*.js', 'jest.conf/**/*.vue'],
    languageOptions: {
      globals: {
        page: 'readonly',
        browser: 'readonly',
        context: 'readonly',
        puppeteerConfig: 'readonly',
        jestPuppeteer: 'readonly',
      },
    },
    rules: {
      'import-x/no-unresolved': 'off',
    },
  },
  // Test components don't need i18n
  {
    files: ['lib/**/__tests__/**/*.vue'],
    rules: {
      'vue/no-bare-strings-in-template': 'off',
    },
  },
  // Spec files use describe.visual which is a valid describe wrapper
  // but not recognized by the jest plugin
  {
    files: ['**/*.spec.js'],
    rules: {
      'jest/require-top-level-describe': 'off',
    },
  },
  // Visual spec files need the page global
  {
    files: ['**/visual.spec.js'],
    languageOptions: {
      globals: {
        page: 'readonly',
      },
    },
  },
];
