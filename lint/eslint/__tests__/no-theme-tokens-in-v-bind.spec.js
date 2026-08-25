import { RuleTester } from 'eslint';
import * as vueParser from 'vue-eslint-parser';

import rule from '../rules/no-theme-tokens-in-v-bind';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: vueParser,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
});

ruleTester.run('no-theme-tokens-in-v-bind', rule, {
  valid: [
    {
      // A CSS variable is the migration target, and is not a `v-bind()` at all
      filename: 'Valid.vue',
      code: `
        <template><div class="a" /></template>
        <style lang="scss" scoped>
          .a { color: var(--tokens-primary); }
        </style>
      `,
    },
    {
      // `v-bind()` of something other than `themeTokens()` is still allowed
      filename: 'Valid.vue',
      code: `
        <template><div class="a" /></template>
        <style lang="scss" scoped>
          .a { background: v-bind(surfaceColor); }
        </style>
      `,
    },
    {
      // `themeTokens()` outside of a style block is not this rule's concern
      filename: 'Valid.vue',
      code: `
        <script>
          import { themeTokens } from '../styles/theme';
          export default {
            computed: {
              color() {
                return themeTokens().primary;
              },
            },
          };
        </script>
      `,
    },
    {
      // A component with no style block at all
      filename: 'Valid.vue',
      code: '<template><div class="a" /></template>',
    },
  ],
  invalid: [
    {
      // `v-bind()` of `themeTokens()` is allowed in a style block
      filename: 'Invalid.vue',
      code: `
        <template><div class="a" /></template>
        <style lang="scss" scoped>
          .a { color: v-bind("themeTokens().primary"); }
        </style>
      `,
      errors: [{ messageId: 'unexpectedThemeTokens' }],
    },
    {
      // Plain CSS style blocks are checked too
      filename: 'Invalid.vue',
      code: `
        <template><div class="a" /></template>
        <style scoped>
          .a { color: v-bind("themeTokens().text"); }
        </style>
      `,
      errors: [{ messageId: 'unexpectedThemeTokens' }],
    },
    {
      // Called as a member of the theme module namespace
      filename: 'Invalid.vue',
      code: `
        <template><div class="a" /></template>
        <style lang="scss" scoped>
          .a { color: v-bind("theme.themeTokens().primary"); }
        </style>
      `,
      errors: [{ messageId: 'unexpectedThemeTokens' }],
    },
    {
      // Nested inside a larger expression
      filename: 'Invalid.vue',
      code: `
        <template><div class="a" /></template>
        <style lang="scss" scoped>
          .a { color: v-bind("isActive ? themeTokens().primary : 'red'"); }
        </style>
      `,
      errors: [{ messageId: 'unexpectedThemeTokens' }],
    },
    {
      // Every occurrence across every style block is reported
      filename: 'Invalid.vue',
      code: `
        <template><div class="a" /></template>
        <style lang="scss" scoped>
          .a { color: v-bind("themeTokens().primary"); }
        </style>
        <style lang="scss">
          .b { color: v-bind("themeTokens().text"); }
        </style>
      `,
      errors: [{ messageId: 'unexpectedThemeTokens' }, { messageId: 'unexpectedThemeTokens' }],
    },
  ],
});
