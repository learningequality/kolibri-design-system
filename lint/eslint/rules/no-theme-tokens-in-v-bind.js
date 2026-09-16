/*
 * Reports a theme value read inside a `v-bind()` in a `<style>` block, and
 * fixes it to the equivalent theme CSS variable.
 */

const {
  THEME_ACCESSOR_PREFIXES,
  themeCssVariableName,
} = require('../../../lib/utils/themeCssVariableNaming');
const { getThemeCssVariableNames } = require('../../themeCssVariableNames');

const THEME_FUNCTIONS = Object.keys(THEME_ACCESSOR_PREFIXES);

const THEME_PROPERTIES = THEME_FUNCTIONS.map(name => `$${name}`);

/** Walks every node, skipping the `parent` back-references that would cycle. */
function walk(node, visit, parent = null) {
  if (Array.isArray(node)) {
    for (const item of node) {
      walk(item, visit, parent);
    }
    return;
  }
  if (!node || typeof node !== 'object' || typeof node.type !== 'string') {
    return;
  }
  visit(node, parent);
  for (const key of Object.keys(node)) {
    if (key !== 'parent') {
      walk(node[key], visit, node);
    }
  }
}

/**
 * Whether `node` is the property name in an access like `styles.$themeTokens`,
 * which is not the theme property. `this.$themeTokens` is the exception.
 */
function isPropertyName(node, parent) {
  return Boolean(
    parent &&
    parent.type === 'MemberExpression' &&
    !parent.computed &&
    parent.property === node &&
    parent.object.type !== 'ThisExpression',
  );
}

/** The name of the theme value `node` reads, or `null`. */
function themeReferenceName(node) {
  if (node.type === 'Identifier' && THEME_PROPERTIES.includes(node.name)) {
    return node.name;
  }
  if (node.type !== 'CallExpression') {
    return null;
  }
  const callee = node.callee;
  if (callee.type === 'Identifier' && THEME_FUNCTIONS.includes(callee.name)) {
    return `${callee.name}()`;
  }
  if (
    callee.type === 'MemberExpression' &&
    !callee.computed &&
    callee.property.type === 'Identifier' &&
    THEME_FUNCTIONS.includes(callee.property.name)
  ) {
    return `${callee.property.name}()`;
  }
  return null;
}

function findThemeReference(node) {
  let found = null;
  walk(node, (current, parent) => {
    if (!found && !isPropertyName(current, parent)) {
      found = themeReferenceName(current);
    }
  });
  return found;
}

/**
 * The CSS variable prefix `node` is the theme accessor for, or `null`. A
 * namespaced call is left out: `other.themeTokens()` may be any object's method.
 */
function accessorPrefix(node) {
  if (node.type === 'Identifier' && node.name.startsWith('$')) {
    return THEME_ACCESSOR_PREFIXES[node.name.slice(1)] || null;
  }
  if (
    node.type === 'MemberExpression' &&
    node.object.type === 'ThisExpression' &&
    node.property.type === 'Identifier' &&
    node.property.name.startsWith('$')
  ) {
    return THEME_ACCESSOR_PREFIXES[node.property.name.slice(1)] || null;
  }
  if (node.type === 'CallExpression') {
    const callee = node.callee;
    if (callee.type === 'Identifier') {
      return THEME_ACCESSOR_PREFIXES[callee.name] || null;
    }
  }
  return null;
}

/**
 * The theme CSS variable `node` reads, or `null` when it is not a plain path of
 * property accesses, or does not name a variable the theme emits.
 */
function themeCssVariable(node) {
  const segments = [];
  let current = node;
  // stops at the accessor itself, so `this.$themeTokens` is a root, not a segment
  while (
    current.type === 'MemberExpression' &&
    !current.computed &&
    current.property.type === 'Identifier' &&
    !accessorPrefix(current)
  ) {
    segments.unshift(current.property.name);
    current = current.object;
  }
  const prefix = accessorPrefix(current);
  if (!prefix || !segments.length) {
    return null;
  }
  const name = themeCssVariableName(prefix, segments);
  return getThemeCssVariableNames().has(name) ? `var(${name})` : null;
}

/** The `v-bind()` containers of every `<style>` block. */
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
      description: 'disallow theme values inside `v-bind()` in a `<style>` block',
    },
    fixable: 'code',
    schema: [],
    messages: {
      unexpectedTheme:
        'Unexpected `{{reference}}` inside `v-bind()`. Use a theme CSS variable instead, ' +
        'e.g. `var(--tokens-primary)`.',
      unexpectedThemeWithVariable:
        'Unexpected `{{reference}}` inside `v-bind()`. Use `{{variable}}` instead.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode || context.getSourceCode();
    return {
      Program() {
        for (const vBind of getStyleVBinds(sourceCode)) {
          const reference = findThemeReference(vBind.expression);
          if (!reference) {
            continue;
          }
          const variable = themeCssVariable(vBind.expression);
          if (variable) {
            context.report({
              node: vBind.expression,
              messageId: 'unexpectedThemeWithVariable',
              data: { reference, variable },
              // the whole `v-bind()` is replaced, so the container is the range
              fix: fixer => fixer.replaceTextRange(vBind.range, variable),
            });
            continue;
          }
          context.report({
            node: vBind.expression,
            messageId: 'unexpectedTheme',
            data: { reference },
          });
        }
      },
    };
  },
};
