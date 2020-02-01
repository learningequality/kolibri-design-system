const esLintConfig = require('kolibri-tools/.eslintrc');

// Vuetify's helper attributes use hyphens and they would
// not be recognized if auto-formatted to camel case
esLintConfig.rules['vue/attribute-hyphenation'] = 0;

module.exports = esLintConfig;
