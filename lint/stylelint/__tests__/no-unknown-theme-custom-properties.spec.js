import stylelint from 'stylelint';
import plugin from '../no-unknown-theme-custom-properties';

const { ruleName, messages } = plugin.rule;

function lintScss(code) {
  return stylelint.lint({
    code,
    codeFilename: 'test.scss',
    customSyntax: 'postcss-scss',
    config: {
      plugins: [plugin],
      rules: { [ruleName]: true },
    },
  });
}

function lintVue(code) {
  return stylelint.lint({
    code,
    codeFilename: 'Test.vue',
    customSyntax: 'postcss-html',
    config: {
      plugins: [plugin],
      rules: { [ruleName]: true },
    },
  });
}

async function warningsFor(result) {
  const { results } = await result;
  return results[0].warnings.filter(warning => warning.rule === ruleName);
}

describe('no-unknown-theme-custom-properties', () => {
  it('accepts valid theme custom properties', async () => {
    const warnings = await warningsFor(
      lintScss(`
        .a {
          color: var(--tokens-primary);
          border-color: var(--brand-primary-v600);
          background: var(--palette-grey-v400);
          outline-color: var(--palette-black);
        }
      `),
    );
    expect(warnings).toHaveLength(0);
  });

  it('reports a misspelled theme custom property, pointing at the name', async () => {
    const code = '.a { color: var(--tokens-focusOutine); }';
    const warnings = await warningsFor(lintScss(code));
    expect(warnings).toHaveLength(1);
    expect(warnings[0].text).toBe(messages.rejected('--tokens-focusOutine'));
    expect(code.slice(warnings[0].column - 1, warnings[0].endColumn - 1)).toBe(
      '--tokens-focusOutine',
    );
  });

  it('reports the old `v_N` form of a version key', async () => {
    const warnings = await warningsFor(lintScss('.a { color: var(--palette-grey-v_400); }'));
    expect(warnings).toHaveLength(1);
    expect(warnings[0].text).toBe(messages.rejected('--palette-grey-v_400', '--palette-grey-v400'));
  });

  it('ignores a `var()` without a themed prefix', async () => {
    const warnings = await warningsFor(
      lintScss(`
        .a {
          color: var(--someLocalProperty);
          background: var(--kTableStickyColumnBackground);
        }
      `),
    );
    expect(warnings).toHaveLength(0);
  });

  it('reports a misspelled name even when a fallback is given', async () => {
    const warnings = await warningsFor(
      lintScss('.a { color: var(--tokens-focusOutine, #ff0000); }'),
    );
    expect(warnings).toHaveLength(1);
  });

  it('reports a misspelled name nested in a fallback', async () => {
    const warnings = await warningsFor(
      lintScss('.a { color: var(--someLocalProperty, var(--tokens-focusOutine)); }'),
    );
    expect(warnings).toHaveLength(1);
    expect(warnings[0].text).toBe(messages.rejected('--tokens-focusOutine'));
  });

  it('reports a misspelled name inside a single file component style block', async () => {
    const warnings = await warningsFor(
      lintVue(`<template><div class="a" /></template>
<style lang="scss" scoped>
  .a {
    color: var(--tokens-primary);
    background: var(--tokens-surfase);
  }
</style>
`),
    );
    expect(warnings).toHaveLength(1);
    expect(warnings[0].text).toBe(messages.rejected('--tokens-surfase'));
  });
});
