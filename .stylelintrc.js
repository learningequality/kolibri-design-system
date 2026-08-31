const stylelintConfig = require('kolibri-format/.stylelintrc');

stylelintConfig['rules']['selector-pseudo-element-no-unknown'] = [true, { ignorePseudoElements: ['v-deep'] }];

stylelintConfig['rules']['custom-property-pattern'] = ['^([a-z][a-zA-Z0-9]*)(-[a-zA-Z0-9]+)*$'];

module.exports = stylelintConfig;
