/*
 * Reports a `var()` referencing a theme custom property that does not exist,
 * for example the misspelled `var(--tokens-focusOutine)`.
 */

const stylelint = require('stylelint');
const valueParser = require('postcss-value-parser');

const {
  atRuleParamsIndex,
  declarationValueIndex,
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

/**
 * Whether `name` matches one of the `ignoreProperties` entries, each either an
 * exact string or a regular expression.
 */
function isIgnored(name, ignoreProperties) {
  if (!ignoreProperties) {
    return false;
  }
  return [ignoreProperties].flat().some(entry => {
    if (entry instanceof RegExp) {
      return entry.test(name);
    }
    return entry === name;
  });
}

const meta = {
  url: 'https://github.com/learningequality/kolibri-design-system/blob/develop/lint/README.md',
  fixable: true,
};

const rule = (primary, secondary, context) => {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(
      result,
      ruleName,
      {
        actual: primary,
        possible: [true],
      },
      {
        actual: secondary,
        optional: true,
        possible: {
          ignoreProperties: [value => typeof value === 'string' || value instanceof RegExp],
        },
      },
    );
    if (!validOptions) {
      return;
    }

    const ignoreProperties = secondary && secondary.ignoreProperties;

    const validNames = getThemeCssVariableNames();

    const handleUnknownNames = (node, property, valueIndex) => {
      const parsed = valueParser(node[property]);
      // postcss keeps a comment written inside a value in `raws`, which rewriting
      // the value would drop, so this declaration is only reported, to be fixed by hand
      const canFix = context.fix && !node.raws[property];
      let rewritten = false;
      parsed.walk(valueNode => {
        if (valueNode.type !== 'function' || valueNode.value.toLowerCase() !== 'var') {
          return;
        }
        const [nameNode] = valueNode.nodes;
        if (!nameNode) {
          return;
        }
        const name = nameNode.value;
        if (!isThemedCustomProperty(name) || validNames.has(name)) {
          return;
        }
        // names an app added at runtime with `setTokenMapping()`/`setBrandColors()`
        if (isIgnored(name, ignoreProperties)) {
          return;
        }
        const suggestion = suggestThemeCssVariableName(name);
        // only the source `v_N` version key form has a certain replacement
        if (canFix && suggestion) {
          nameNode.value = suggestion;
          rewritten = true;
          return;
        }
        stylelint.utils.report({
          result,
          ruleName,
          message: messages.rejected,
          messageArgs: [name, suggestion],
          node,
          index: valueIndex + nameNode.sourceIndex,
          endIndex: valueIndex + nameNode.sourceEndIndex,
        });
      });
      if (rewritten) {
        node[property] = parsed.toString();
      }
    };

    root.walkDecls(decl => handleUnknownNames(decl, 'value', declarationValueIndex(decl)));
    // a `var()` passed to an at-rule, e.g. `@include shadow(var(--tokens-surface))`
    root.walkAtRules(atRule => handleUnknownNames(atRule, 'params', atRuleParamsIndex(atRule)));
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

module.exports = stylelint.createPlugin(ruleName, rule);
