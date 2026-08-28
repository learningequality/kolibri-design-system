/*
 * Reports theme values reached from inside a `v-bind()` argument in a `<style>`
 * block, whether directly (`themeTokens()`, `$themeTokens`) or through a
 * component member that reads the theme.
 *
 * Colors in style blocks should use the theme CSS variables instead, e.g.
 * `var(--tokens-primary)`, which avoids the extra component state a style
 * `v-bind()` needs, and the Vue 2.7 `v-bind()` bug it can run into.
 */

// `themeTokens()` and friends, imported from `lib/styles/theme`
const THEME_FUNCTIONS = ['themeTokens', 'themeBrand', 'themePalette'];
// the same values as the instance properties `KThemePlugin` installs
const THEME_PROPERTIES = ['$themeTokens', '$themeBrand', '$themePalette'];

/**
 * Walks every node of an AST, skipping the `parent` back-references that
 * `vue-eslint-parser` sets, which would otherwise cycle.
 */
function walk(node, visit) {
  if (Array.isArray(node)) {
    for (const item of node) {
      walk(item, visit);
    }
    return;
  }
  if (!node || typeof node !== 'object' || typeof node.type !== 'string') {
    return;
  }
  visit(node);
  for (const key of Object.keys(node)) {
    if (key !== 'parent') {
      walk(node[key], visit);
    }
  }
}

/**
 * The name of the theme value `node` reads, or `null`. Matches a call to one of
 * the theme functions, and a reference to one of the theme instance properties.
 */
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
  walk(node, current => {
    if (!found) {
      found = themeReferenceName(current);
    }
  });
  return found;
}

/**
 * Returns a `name -> node` map of the component's `computed` and `methods`
 * members, so a `v-bind()` naming one can be followed a single step to see
 * whether it reads the theme.
 */
function getComponentMembers(program) {
  const members = new Map();
  for (const statement of program.body) {
    if (
      statement.type !== 'ExportDefaultDeclaration' ||
      statement.declaration.type !== 'ObjectExpression'
    ) {
      continue;
    }
    for (const option of statement.declaration.properties) {
      if (
        option.type !== 'Property' ||
        option.key.type !== 'Identifier' ||
        !['computed', 'methods'].includes(option.key.name) ||
        option.value.type !== 'ObjectExpression'
      ) {
        continue;
      }
      for (const member of option.value.properties) {
        if (member.type === 'Property' && member.key.type === 'Identifier') {
          members.set(member.key.name, member.value);
        }
      }
    }
  }
  return members;
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
      description: 'disallow theme values inside `v-bind()` in a `<style>` block',
    },
    schema: [],
    messages: {
      unexpectedTheme:
        'Unexpected `{{reference}}` inside `v-bind()`. Use a theme CSS variable instead, ' +
        'e.g. `var(--tokens-primary)`.',
      unexpectedThemeMember:
        'Unexpected `{{member}}` inside `v-bind()`, which reads `{{reference}}`. Use a theme ' +
        'CSS variable instead, e.g. `var(--tokens-primary)`.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode || context.getSourceCode();
    return {
      Program(program) {
        const vBinds = getStyleVBinds(sourceCode);
        if (!vBinds.length) {
          return;
        }
        const members = getComponentMembers(program);
        for (const vBind of vBinds) {
          const reference = findThemeReference(vBind.expression);
          if (reference) {
            context.report({
              node: vBind.expression,
              messageId: 'unexpectedTheme',
              data: { reference },
            });
            continue;
          }
          // a `v-bind()` naming a component member that reads the theme itself
          walk(vBind.expression, node => {
            if (node.type !== 'Identifier' || !members.has(node.name)) {
              return;
            }
            const memberReference = findThemeReference(members.get(node.name));
            if (memberReference) {
              context.report({
                node: vBind.expression,
                messageId: 'unexpectedThemeMember',
                data: { member: node.name, reference: memberReference },
              });
            }
          });
        }
      },
    };
  },
};
