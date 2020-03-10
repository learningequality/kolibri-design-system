const esLintConfig = require('kolibri-tools/.eslintrc');

// Vuetify's helper attributes use hyphens and they would
// not be recognized if auto-formatted to camel case
esLintConfig.rules['vue/attribute-hyphenation'] = 0;

// This rule conflicts with Nuxt page naming
esLintConfig.rules['kolibri/vue-filename-and-component-name-match'] = 0;

// max-len rules are unhelpful for documentation
esLintConfig.rules['max-len'] = 0;
esLintConfig.rules['vue/max-len'] = 0;

// Allow nuxt resources to be found
esLintConfig.settings['import/resolver'].nuxt = {
  extensions: ['.js', '.vue'],
  nuxtSrcDir: 'docs',
};

module.exports = esLintConfig;
