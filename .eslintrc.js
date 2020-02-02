const esLintConfig = require('kolibri-tools/.eslintrc');

// Vuetify's helper attributes use hyphens and they would
// not be recognized if auto-formatted to camel case
esLintConfig.rules['vue/attribute-hyphenation'] = 0;

// Allow nuxt resources to be found
esLintConfig.settings['import/resolver'].nuxt = {
  extensions: ['.js', '.vue'],
  nuxtSrcDir: 'docs',
};

module.exports = esLintConfig;
