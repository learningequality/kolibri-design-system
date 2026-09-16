# Theming lint rules

Lint rules in support of the migration to theme CSS variables (`--tokens-*`, `--brand-*`,
and `--palette-*`).

> **These rules are temporary.** They live here because KDS components will be updated
> before Kolibri's are, and before `kolibri-format` is updated in KDS. Once they are
> ported to `kolibri-format` and that package is updated here, this directory and the
> configuration referencing it can be removed.

## Rules

### `kds/no-theme-tokens-in-v-bind` (ESLint)

Reports a theme value read inside a `v-bind()` in a `<style>` block, and fixes it to
the equivalent theme CSS variable, so `yarn lint-fix` makes the change:

```scss
/* before */
.foo {
  color: v-bind('$themeTokens.primary');
  background: v-bind('$themePalette.grey.v_400');
}

/* after */
.foo {
  color: var(--tokens-primary);
  background: var(--palette-grey-v400);
}
```

It matches the theme functions `themeTokens()`, `themeBrand()`, and `themePalette()`,
including through a namespace such as `theme.themeTokens()`. It also matches the
instance properties `$themeTokens`, `$themeBrand`, and `$themePalette`, written either
bare or on `this`, so `v-bind('$themeTokens.primary')` and
`v-bind('this.$themeTokens.primary')` are autofixed to `var(--tokens-primary)`. Only a read
off some other object is skipped, so neither `v-bind('styles.$themeTokens')` nor
`v-bind('styles.$themeTokens.primary')` is matched.

It is fixed only where the rewrite is certain: the path has to resolve to a variable
the theme actually emits, and a namespaced call such as `other.themeTokens()` is left
alone, since that may be any object's method. Anything else it matches, including a
compound expression such as a ternary, is reported but not fixed.

A `v-bind()` naming a component member that reads the theme, like
`v-bind(surfaceColor)`, is not matched at all. Theme CSS variables should be used in
these cases too.

Implemented in [`eslint/rules/no-theme-tokens-in-v-bind.js`](./eslint/rules/no-theme-tokens-in-v-bind.js)
and registered as the `kds` plugin in `eslint.config.mjs`.

### `vue/no-root-v-if` (ESLint)

Enabled in `eslint.config.mjs`. Vue 2.7 stops updating a style block's `v-bind()` when
the bound element is the template root and is removed and re-added (e.g. by a
`v-if`). Wrapping the conditional element in a plain, non-conditional element avoids it.

For components that have a root `v-if`, but no `v-bind()` in their `<style>` block, the rule is a false positive. Disable it with an `eslint-disable-next-line` comment at the top of the file, before the `<template>` block. See `lib/KTooltip/index.vue` for an example.

See the [rule documentation](https://eslint.vuejs.org/rules/no-root-v-if).

### `kds/no-unknown-theme-custom-properties` (stylelint)

Reports a `var()` referencing a theme custom property that does not exist, for example
the misspelled `var(--tokens-focusOutine)`, which resolves to nothing at runtime with no
warning anywhere.

Only `--tokens-`, `--brand-`, and `--palette-` properties are checked. Components define
their own local custom properties, so any other `var()` is left alone.

Consuming apps can add theme values at runtime with `setTokenMapping()` and
`setBrandColors()`, and those names cannot be known from KDS source. List them with the
`ignoreProperties` secondary option, as exact strings or regular expressions:

```js
'kds/no-unknown-theme-custom-properties': [true, { ignoreProperties: [/^--tokens-app/] }],
```

If the name reported is the source `v_N` version key rather than the emitted `vN`,
the message contains a suggestion for the intended variable:

```
Unexpected unknown theme custom property "--palette-grey-v_400",
did you mean "--palette-grey-v400"?
```

This is a stylelint rule rather than an ESLint one so that it covers both single file
component `<style>` blocks and standalone `.scss` files.

Implemented in [`stylelint/no-unknown-theme-custom-properties.js`](./stylelint/no-unknown-theme-custom-properties.js)
and registered in `.stylelintrc.js`.

## Where the valid names come from

[`themeCssVariableNames.js`](./themeCssVariableNames.js) derives the set of valid names
from the same source files the runtime theme is built from: `defaultTokenMapping` and
`defaultBrandColors` in `lib/styles/colorsDefault.js`, and `lib/styles/colorsMaterial.js`.
So the rules stay in sync when tokens, brand colors, or palette colors are added. It
also holds the helpers only the rules need, such as the source offsets their reports
point at.

It names those variables with
[`lib/utils/themeCssVariableNaming.js`](../lib/utils/themeCssVariableNaming.js), which
the runtime emitting the variables uses too, so a variable is named one way everywhere.
`utils/extractThemeDefaults.js` resolves the value each name is emitted with and writes
[`lib/styles/themeDefaults.scss`](../lib/styles/themeDefaults.scss) from them on
`yarn pregenerate`. Neither moves with these rules; they import the naming from the
published `lib`.

The color sources and `themeCssVariableNaming.js` are Vue-free ES modules, loaded here
through Node's `require(esm)` support, so `kolibri-format` can read them from the
published `lib` once these rules move there.

`require(esm)` is unflagged from Node 20.19 and 22.12 onwards, so the rules will not
load on anything older.

## Tests

```bash
yarn test lint/
```
