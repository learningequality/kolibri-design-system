# Icons

Here, you can find all about icons - where to get them, how to add them, etc.

## Introduction

Source icon files are stored as svg files in [`custom-icons`](../custom-icons/).

### Icons as Vue components

Source svg files are converted to Vue components by our precompilation script. The resulting Vue components are made public via [the icons definitions file `lib/KIcon/iconDefinitions.js`](../lib/KIcon/iconDefinitions.js). The documentation website contains automatically generated [list of available icons](https://design-system.learningequality.org/icons/#icons) that can be used via Vue components, such as `KIcon`.

### Icons for reStructuredText

In order to use icons on some Learning Equality's documentation pages written in reStructuredText, we also have a script to generate a set of reStructuredText replacement strings to [`docs/rstIconReplacements.txt`](../docs/rstIconReplacements.txt) which can be used in docs based on Sphinx. The file is available for download from https://design-system.learningequality.org/icons/#rst.

## How to add a new icon

1. **Paste a svg file** to [`custom-icons`](../custom-icons/)
2. **Run `yarn run precompile-custom-svgs` to generate a corresponding Vue component.** The generated component will be saved to [`lib/KIcon/precompiled-icons/le`](../lib/KIcon/precompiled-icons/le)
3. **Add a new entry for the generated component to [the icons definitions file](../lib/KIcon/iconDefinitions.js).** As a key name, choose a unique alias that describes the purpose of the icon in our products well. Set the following attributes:
  - `icon`: A Vue component which renders the icon (generated in the previous step)
  - (optional) `rtlFlip`: When `true`, the icon will be flipped for right-to-left lanauges
  - (optional) `defaultColor`: A color for the icon. If not defined, icons are `themeTokens.text` colored
  - (optional) `fixedColor`: When `true`, the icon has a fixed color and `KIcon`'s `color` prop will be ignored
4. **Run `yarn run pregenerate` to update icons for reStructuredText documents.** Note that it's important to run this step **after** updating the icons definitions file, otherwise it won't be detected.

To **check that the new icon is successfully added**:
- Run the development server
- See that the new icon is present in the icons list: http://localhost:4000/icons#icons
- See that there is a new entry for the icon in the reStructuredText replacement strings file: http://localhost:4000/icons#rst

## How to update an existing icon

The update process is similar to creating a new icon. After every update, run `yarn run precompile-custom-svgs` and `yarn run pregenerate`.
