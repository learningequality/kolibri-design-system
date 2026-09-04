const stylelintConfig = require('kolibri-format/.stylelintrc');

const noUnknownThemeCustomProperties = require('./lint/stylelint/no-unknown-theme-custom-properties');

stylelintConfig['plugins'] = [
  ...(stylelintConfig['plugins'] || []),
  noUnknownThemeCustomProperties,
];

stylelintConfig['rules']['selector-pseudo-element-no-unknown'] = [true, { ignorePseudoElements: ['v-deep'] }];

stylelintConfig['rules']['custom-property-pattern'] = ['^([a-z][a-zA-Z0-9]*)(-[a-zA-Z0-9]+)*$'];

// Catches misspelled theme CSS variables, which otherwise resolve to nothing silently
stylelintConfig['rules']['kds/no-unknown-theme-custom-properties'] = true;

module.exports = stylelintConfig;
