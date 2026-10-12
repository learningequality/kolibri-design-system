const stylelintConfig = require('kolibri-format/.stylelintrc');

stylelintConfig['rules']['selector-pseudo-element-no-unknown'] = [true, { ignorePseudoElements: ['v-deep'] }];

module.exports = stylelintConfig;
