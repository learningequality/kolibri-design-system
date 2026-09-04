import v8 from 'node:v8';

import { RuleTester } from 'eslint';
import * as vueParser from 'vue-eslint-parser';

import rule from '../rules/no-theme-tokens-in-v-bind';

// `RuleTester` normalizes rule options with `structuredClone`, which the jsdom
// test environment does not provide
if (typeof global.structuredClone !== 'function') {
  global.structuredClone = value => v8.deserialize(v8.serialize(value));
}

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
      // A property sharing a name with a theme-reading member is not that member
      filename: 'Valid.vue',
      code: `
        <template><div class="a" /></template>
        <script>
          import { themeTokens } from '../styles/theme';
          export default {
            computed: {
              color() {
                return themeTokens().primary;
              },
              styles() {
                return { color: 'red' };
              },
            },
          };
        </script>
        <style lang="scss" scoped>
          .a { color: v-bind('styles.color'); }
        </style>
      `,
    },
    {
      // A component with no style block at all
      filename: 'Valid.vue',
      code: '<template><div class="a" /></template>',
    },
    {
      // A `v-bind()` of a computed that does not read the theme
      filename: 'Valid.vue',
      code: `
        <template><div class="a" /></template>
        <script>
          export default {
            props: { width: { type: String, default: '10px' } },
            computed: {
              boxWidth() {
                return this.width;
              },
            },
          };
        </script>
        <style lang="scss" scoped>
          .a { width: v-bind(boxWidth); }
        </style>
      `,
    },
  ],
  invalid: [
    {
      // `v-bind()` of `themeTokens()` in a style block
      filename: 'Invalid.vue',
      code: `
        <template><div class="a" /></template>
        <style lang="scss" scoped>
          .a { color: v-bind("themeTokens().primary"); }
        </style>
      `,
      errors: [{ messageId: 'unexpectedTheme' }],
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
      errors: [{ messageId: 'unexpectedTheme' }],
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
      errors: [{ messageId: 'unexpectedTheme' }],
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
      errors: [{ messageId: 'unexpectedTheme' }],
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
      errors: [{ messageId: 'unexpectedTheme' }, { messageId: 'unexpectedTheme' }],
    },
    {
      // The instance property `KThemePlugin` installs
      filename: 'Invalid.vue',
      code: `
        <template><div class="a" /></template>
        <style lang="scss" scoped>
          .a { background: v-bind('$themeTokens.surface'); }
        </style>
      `,
      errors: [{ messageId: 'unexpectedTheme' }],
    },
    {
      // `$themeBrand` and `$themePalette` are the same mistake
      filename: 'Invalid.vue',
      code: `
        <template><div class="a" /></template>
        <style lang="scss" scoped>
          .a { color: v-bind('$themePalette.grey.v_400'); }
        </style>
      `,
      errors: [{ messageId: 'unexpectedTheme' }],
    },
    {
      // A computed that reads the theme
      filename: 'Invalid.vue',
      code: `
        <template><div class="a" /></template>
        <script>
          export default {
            computed: {
              surfaceColor() {
                return this.$themeTokens.surface;
              },
            },
          };
        </script>
        <style lang="scss" scoped>
          .a { background: v-bind(surfaceColor); }
        </style>
      `,
      errors: [{ messageId: 'unexpectedThemeMember' }],
    },
    {
      // ...and through a method
      filename: 'Invalid.vue',
      code: `
        <template><div class="a" /></template>
        <script>
          import { themeTokens } from '../styles/theme';
          export default {
            methods: {
              surfaceColor() {
                return themeTokens().surface;
              },
            },
          };
        </script>
        <style lang="scss" scoped>
          .a { background: v-bind(surfaceColor); }
        </style>
      `,
      errors: [{ messageId: 'unexpectedThemeMember' }],
    },
    {
      // A member named more than once in one `v-bind()` is reported once
      filename: 'Invalid.vue',
      code: `
        <template><div class="a" /></template>
        <script>
          export default {
            computed: {
              surfaceColor() {
                return this.$themeTokens.surface;
              },
            },
          };
        </script>
        <style lang="scss" scoped>
          .a { background: v-bind('surfaceColor ? surfaceColor : surfaceColor'); }
        </style>
      `,
      errors: [{ messageId: 'unexpectedThemeMember' }],
    },
  ],
});
