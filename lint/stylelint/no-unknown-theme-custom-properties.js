/*
 * Reports a `var()` referencing a theme custom property that does not exist,
 * for example the misspelled `var(--tokens-focusOutine)`.
 */

const stylelint = require('stylelint');
const valueParser = require('postcss-value-parser');

const {
  getThemeCssVariableNames,
  isThemedCustomProperty,
  suggestThemeCssVariableName,
} = require('../themeCssVariableNames');

const ruleName = 'kds/no-unknown-theme-custom-properties';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (name, suggestion) =>
    `Unexpected unknown theme custom property "${name}"` +
    (suggestion ? `, did you mean "${suggestion}"?` : ''),
});

const meta = {
  url: 'https://github.com/learningequality/kolibri-design-system/blob/develop/lint/README.md',
};

/**
 * Index of a declaration's value within the declaration's own source, used to
 * point the report at the offending name rather than the whole declaration.
 */
function declarationValueIndex(decl) {
  const raws = decl.raws;
  const between = (raws.between !== undefined ? raws.between : ':').length;
  const prefix = (raws.prop && raws.prop.prefix ? raws.prop.prefix : '').length;
  return decl.prop.length + prefix + between;
}

const rule = primary => {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: primary,
      possible: [true],
    });
    if (!validOptions) {
      return;
    }

    const validNames = getThemeCssVariableNames();

    root.walkDecls(decl => {
      valueParser(decl.value).walk(node => {
        if (node.type !== 'function' || node.value !== 'var') {
          return;
        }
        const [nameNode] = node.nodes;
        if (!nameNode) {
          return;
        }
        const name = nameNode.value;
        if (!isThemedCustomProperty(name) || validNames.has(name)) {
          return;
        }
        const valueIndex = declarationValueIndex(decl);
        stylelint.utils.report({
          result,
          ruleName,
          message: messages.rejected,
          messageArgs: [name, suggestThemeCssVariableName(name)],
          node: decl,
          index: valueIndex + nameNode.sourceIndex,
          endIndex: valueIndex + nameNode.sourceEndIndex,
        });
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

module.exports = stylelint.createPlugin(ruleName, rule);
