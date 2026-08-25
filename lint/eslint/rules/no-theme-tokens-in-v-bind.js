/*
 * Reports `themeTokens()` calls inside a `v-bind()` argument in a `<style>` block.
 *
 * Colors in style blocks should use the theme CSS variables instead, e.g.
 * `var(--tokens-primary)`, which avoids the extra component state a style
 * `v-bind()` needs, and the Vue 2.7 `v-bind()` bug it can run into.
 */

const THEME_TOKENS_FUNCTION = 'themeTokens';

/**
 * Walks every node of an expression AST, skipping the `parent` back-references
 * that `vue-eslint-parser` sets, which would otherwise cycle.
 */
function walkExpression(node, visit) {
  if (Array.isArray(node)) {
    for (const item of node) {
      walkExpression(item, visit);
    }
    return;
  }
  if (!node || typeof node !== 'object' || typeof node.type !== 'string') {
    return;
  }
  visit(node);
  for (const key of Object.keys(node)) {
    if (key !== 'parent') {
      walkExpression(node[key], visit);
    }
  }
}

function isThemeTokensCall(node) {
  if (node.type !== 'CallExpression') {
    return false;
  }
  const callee = node.callee;
  if (callee.type === 'Identifier') {
    return callee.name === THEME_TOKENS_FUNCTION;
  }
  if (callee.type === 'MemberExpression' && !callee.computed) {
    return callee.property.type === 'Identifier' && callee.property.name === THEME_TOKENS_FUNCTION;
  }
  return false;
}

/**
 * Returns the `v-bind()` expression containers of every `<style>` block, or an
 * empty array when the file is not a single file component.
 */
function getStyleVBinds(sourceCode) {
  const parserServices = sourceCode.parserServices || {};
  const documentFragment =
    parserServices.getDocumentFragment && parserServices.getDocumentFragment();
  if (!documentFragment) {
    return [];
  }
  const vBinds = [];
  for (const child of documentFragment.children) {
    if (child.type !== 'VElement' || child.name !== 'style') {
      continue;
    }
    for (const node of child.children) {
      if (node.type === 'VExpressionContainer' && node.expression) {
        vBinds.push(node);
      }
    }
  }
  return vBinds;
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow `themeTokens()` inside `v-bind()` in a `<style>` block',
    },
    schema: [],
    messages: {
      unexpectedThemeTokens:
        'Unexpected `themeTokens()` inside `v-bind()`. Use a theme CSS variable instead, ' +
        'e.g. `var(--tokens-primary)`.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode || context.getSourceCode();
    return {
      Program() {
        for (const vBind of getStyleVBinds(sourceCode)) {
          walkExpression(vBind.expression, node => {
            if (isThemeTokensCall(node)) {
              context.report({ node, messageId: 'unexpectedThemeTokens' });
            }
          });
        }
      },
    };
  },
};
