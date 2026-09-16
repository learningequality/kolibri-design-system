/*
 * The rule specs build their own configs, so they pass whether or not the rules
 * are switched on for the repository. These lint through `.stylelintrc.js` and
 * `eslint.config.mjs` themselves, so dropping a registration fails the suite.
 */

import { execFileSync } from 'node:child_process';
import path from 'node:path';

import stylelint from 'stylelint';

import stylelintConfig from '../../.stylelintrc';

const ROOT_DIR = path.resolve(__dirname, '../..');

describe('.stylelintrc.js', () => {
  it('enables `kds/no-unknown-theme-custom-properties`', async () => {
    const { results } = await stylelint.lint({
      code: '.a { color: var(--tokens-surfase); }',
      codeFilename: path.join(ROOT_DIR, 'lib/smokeTest.scss'),
      customSyntax: 'postcss-scss',
      config: stylelintConfig,
      configBasedir: ROOT_DIR,
    });
    const rules = results[0].warnings.map(warning => warning.rule);
    expect(rules).toContain('kds/no-unknown-theme-custom-properties');
  });

  it('fixes the source `v_N` version key form through it', async () => {
    const { output } = await stylelint.lint({
      code: '.a { color: var(--palette-grey-v_400); }',
      codeFilename: path.join(ROOT_DIR, 'lib/smokeTest.scss'),
      customSyntax: 'postcss-scss',
      config: stylelintConfig,
      configBasedir: ROOT_DIR,
      fix: true,
    });
    expect(output).toBe('.a { color: var(--palette-grey-v400); }');
  });
});

describe('eslint.config.mjs', () => {
  const ERROR = 2;

  /*
   * ESLint loads a flat config with a dynamic import, which Jest cannot do
   * without `--experimental-vm-modules`, so run it in a child process, the
   * same code path CI takes.
   */
  function ruleSeveritiesFor(code) {
    const script = `
      import { ESLint } from 'eslint';
      const linter = new ESLint({
        overrideConfigFile: ${JSON.stringify(path.join(ROOT_DIR, 'eslint.config.mjs'))},
      });
      const results = await linter.lintText(${JSON.stringify(code)}, {
        filePath: ${JSON.stringify(path.join(ROOT_DIR, 'lib/SmokeTest.vue'))},
      });
      console.log(
        JSON.stringify(results[0].messages.map(message => [message.ruleId, message.severity])),
      );
    `;
    const output = execFileSync(process.execPath, ['--input-type=module', '-e', script], {
      cwd: ROOT_DIR,
      encoding: 'utf-8',
    });
    return JSON.parse(output.trim().split('\n').pop());
  }

  // spawning node and loading the flat config can outrun Jest's 5s default
  const TIMEOUT = 30000;

  it(
    'enables `kds/no-theme-tokens-in-v-bind` and `vue/no-root-v-if` as errors',
    () => {
      const severities = ruleSeveritiesFor(`<template>
  <div
    v-if="show"
    class="a"
  >
    {{ show }}
  </div>
</template>

<style lang="scss" scoped>
  .a {
    color: v-bind('themeTokens().primary');
  }
</style>
`);
      // the severity matters: `kolibri-format` gates on the error count, so a
      // warning would leave `yarn lint` green with neither rule enforced
      expect(severities).toContainEqual(['kds/no-theme-tokens-in-v-bind', ERROR]);
      expect(severities).toContainEqual(['vue/no-root-v-if', ERROR]);
    },
    TIMEOUT,
  );
});
