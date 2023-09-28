# Icons

This page is all about Kolibri Design System icons. It includes information on our icon sources and provides guidelines on related workflows.

## Sources and regenerating Vue components

There are three sources of icons:

- [Google Material Design Icons](https://github.com/material-icons/material-icons) (version pinned in [yarn.lock](yarn.lock))
- [Material Design Icons](https://github.com/Templarian/MaterialDesign-SVG) (version pinned in [yarn.lock](yarn.lock))
- [Custom Learning Equality icons]([custom-icons](../custom-icons/))

Icons from these sources are then converted to Vue components by our custom precompilation script. After updating any of these sources, we need to regenerate the Vue components by running:

```bash
yarn run precompile-svgs
```

You can also regenerate just the custom icons which is faster:

```bash
yarn run precompile-custom-svgs
```

One of these commands should be run after any icon changes.

We don't expose all icons in our KDS public API. Only icons defined in [the icons definitions file](lib/KIcon/iconDefinitions.js) are exposed, and we use our custom aliases for them.

In order to use icons in documentation we also output a set of reStructuredText replacement strings. These are added the file `docs/rstIconReplacements.txt` which can be used in docs based on Sphinx. The file is available for download from https://design-system.learningequality.org/icons/#rst

This command should be run after any icon ID changes.

```bash
yarn run pregenerate
```

### Example: Upgrading Google Material Design Icons

It is advised to commit changes at each step to make reviewing files other than those in *precompiled-icons/* easier, especially in case of large updates.

1. Run `yarn upgrade @material-icons/svg`
2. Run `yarn run precompile-svgs`
3. Review updates of all public icons defined in [the icons definitions file](lib/KIcon/iconDefinitions.js)

Large upgrades can result in a colossal git diff which makes reviewing changes of selected public icons in detail difficult. To make such upgrades smoother, in addition to visually reviewing [icons in KDS documentation](https://design-system.learningequality.org/icons/#icons), you can use a report that is printed in a terminal as soon as the precompilation process ends. It contains all exposed icons aliases together with information about whether an icon has been updated or no. If it's been updated, git diff will be printed.

4. Run `yarn run pregenerate`
5. Write down notes to the changelog about any public updates like visual changes of icons, updates of their aliases, and updates of reStructuredText replacement strings
