// Shared helpers for the theming lint rules

// these are ES modules, loaded through Node's `require(esm)` support
const materialColors = require('../lib/styles/colorsMaterial').default;
const { defaultBrandColors, defaultTokenMapping } = require('../lib/styles/colorsDefault');
const {
  THEME_VARIABLE_PREFIXES,
  flattenThemeTree,
  formatPathSegment,
} = require('../lib/utils/themeCssVariableNaming');

let cachedNames = null;

/** Every valid theme CSS variable name, as a `Set`. */
function getThemeCssVariableNames() {
  if (cachedNames) {
    return cachedNames;
  }
  const names = [
    ...flattenThemeTree('palette', materialColors),
    ...flattenThemeTree('brand', defaultBrandColors),
    ...flattenThemeTree('tokens', defaultTokenMapping),
  ].map(([name]) => name);
  if (!names.length) {
    throw new Error('No theme CSS variable names were found in the theme source files');
  }
  cachedNames = new Set(names);
  return cachedNames;
}

function isThemedCustomProperty(name) {
  return THEME_VARIABLE_PREFIXES.some(prefix => name.startsWith(prefix));
}

/**
 * Returns the valid name an invalid one was probably meant to be, or `null`.
 */
function suggestThemeCssVariableName(name) {
  const normalized = name.split('-').map(formatPathSegment).join('-');
  if (normalized !== name && getThemeCssVariableNames().has(normalized)) {
    return normalized;
  }
  return null;
}

/**
 * Index of a declaration's value within the declaration's own source, so a report
 * can point at the offending name rather than the whole declaration.
 */
function declarationValueIndex(decl) {
  const raws = decl.raws;
  const between = (raws.between !== undefined ? raws.between : ':').length;
  const prefix = (raws.prop && raws.prop.prefix ? raws.prop.prefix : '').length;
  return decl.prop.length + prefix + between;
}

/** The same, for an at-rule's params, which follow `@`, the name, and any space. */
function atRuleParamsIndex(atRule) {
  const afterName = atRule.raws.afterName !== undefined ? atRule.raws.afterName : ' ';
  return 1 + atRule.name.length + afterName.length;
}

module.exports = {
  atRuleParamsIndex,
  declarationValueIndex,
  getThemeCssVariableNames,
  isThemedCustomProperty,
  suggestThemeCssVariableName,
};
