# Theming lint rules

Lint rules in support of the migration to theme CSS variables (`--tokens-*`, `--brand-*`,
and `--palette-*`).

> **These rules are temporary.** They live here because KDS components will be updated
> before Kolibri's are, and before `kolibri-format` is updated in KDS. Once they are
> ported to `kolibri-format` and that package is updated here, this directory and the
> configuration referencing it can be removed.

## Rules

### `kds/no-theme-tokens-in-v-bind` (ESLint)

Reports theme values reached from inside a `v-bind()` argument in a `<style>` block.
Colors in style blocks should use the theme CSS variables instead:

```scss
/* bad */
.foo {
  color: v-bind('themeTokens().primary');
  background: v-bind('$themeTokens.surface');
  border-color: v-bind(surfaceColor); /* a computed that reads the theme */
}

/* good */
.foo {
  color: var(--tokens-primary);
}
```

It matches `themeTokens()`, `themeBrand()`, and `themePalette()`, the instance
properties `$themeTokens`, `$themeBrand`, and `$themePalette`, and a `v-bind()` naming
a `computed` or `methods` member that reads any of those. Member lookup goes one level
deep, so a member that reaches the theme through another member is not reported. Only
the member itself is matched, not a property that happens to share its name: with a
theme-reading `color()` computed, `v-bind('styles.color')` is left alone.

Implemented in [`eslint/rules/no-theme-tokens-in-v-bind.js`](./eslint/rules/no-theme-tokens-in-v-bind.js)
and registered as the `kds` plugin in `eslint.config.mjs`.

### `vue/no-root-v-if` (ESLint)

Enabled in `eslint.config.mjs`. Vue 2.7 stops updating a style block's `v-bind()` when
the bound element is the template root and is removed and re-added (e.g. by a
`v-if`). Wrapping the conditional element in a plain, non-conditional element avoids it.

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
from the same source files the runtime theme is built from, `defaultTokenMapping` and
`defaultBrandColors` in `lib/styles/colorsDefault.js`, and `lib/styles/colorsMaterial.js`,
so the rules stay in sync when tokens, brand colors, or palette colors are added.

Those files are ES modules of plain data, so they are read statically with
`@babel/parser` rather than imported: only the shape of the exported object literals
matters, never the color values. A test asserts that the derived set matches the
variables `lib/styles/themeCssVariables.js` actually emits at runtime.

## Tests

```bash
yarn test lint/
```
