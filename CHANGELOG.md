- *Releases are specified as tags in the Github releases page*
- *List of the most important changes for each release.*


# 1.0.0

## General
___

- #[140] - Material-design-icons is no longer a direct dependency (only a dev dependency) which should reduce timeout errors for products depending on KDS
- #[227] - Remove focus ring when not using keyboard to navigate (e.g. when hovering)
- #[255] - Add `CHANGELOG.md`

## Icons
___
__Added__

- #[204] - `pointsLeaf` icon
- #[217] - Add `copyToClipboard`, `infoPrimary`, `home`, `unpublishedChange`, `publishedResource` icons
- #[236] - Add new learning activity icons
- #[231] - Add icons for `incorrectReport`, `registeredKDP`, `superadmin`

## Components
---

### KExternalLink
__Changed__
- #[137] - Add `openInNewTab` prop
- #[142] - Add icon for `openInNewTab`
- #[143] - Update icons and margins for RTL support

### KTextbox
__Changed__
- #[139], #[240] - Change background color and error text color

__Fixed__
- #[191] - Fix keyboard-input focus outlines so they are the standard blue focus

### KRouterLink
__Changed__
- #[150] - Add `icon` and `iconAfter` props
- #[152] - Add `replace` prop

__Fixed__
- #[195] - Fix text-wrapping in Safari so child takes full width of parent

### KButton
__Changed__
- #[153] - Update `basic-link` spacing and color between icons


### KCheckbox
__Added__
- #[199] - Adds a `description` prop

__Fixed__
- #[199] - Updates label display if both slot and label are given

### KContentRenderer
__Added__
- #[224] - Add new `timeSpent`, `duration`, `forceTimeBasedProgress`, `durationBased` props

__Removed__
- #[243] - Remove `download_url` from mixin

### KDropdownMenu
__Fixed__
- #[180] - Remove need to hit tab twice when using keyboard to open dropdown

### KIconButton
__Fixed__
- #[145] - Fix distortion occurring with resized windows by adding `minWidth`

### KSwitch
__Fixed__
- #[191] - Fix keyboard-input focus outlines so they are the standard blue focus

### KLabeledIcon
__Fixed__
- #[195] - Fix text-wrapping in Safari so child takes full width of parent

## Documentation Updates
___

__Added__
- #[202] - Support for updating icons in user documentation
- #[108] - Add app bar documentation
- #[116] - Add changelog and version history
- #[133] - Add documentation about using icons in reStructuredText
- #[134], [174] - Add glossary and anchor links
- #[165] - Add documentation for library components:
  - `KButton`
  - `KRouterLink`
  - `KExternalLink`
  - `KButtonGroup`
  - `KIconButton`
- #[184] - Add imperative verb guidance to modals and page headers
- #[188] - Add menu offset guidelines
- #[194] - Add Filters pattern page for:
  - Dropdown menus
  - Text input dropdowns
  - Text filters
  - Checkbox lists
- #[223] -
  - Remove or enable all disabled Table of Contents items
  - Add many component pages
  - Improve component `jsdocs`
- #[250] - Add documentation for release process

__Fixed__
- #[200] - Keyboard focus rings in KDS examples
- #[209] - Fix sidebar vertical scroll
- #[226] - Fix typo in KButtons documentation
- #[229] - Add `warningIncomplete` and rename `publishedResource` to `unpublishedResource`


__Changed__
- #[192] - Update design principles wording
- #[144] - Update page headers
- #[186] - Update `KCheckbox` and `KSwitch` examples

<!-- Referenced PRs -->
[153]: https://github.com/learningequality/kolibri-design-system/pull/153
[150]: https://github.com/learningequality/kolibri-design-system/pull/150
[152]: https://github.com/learningequality/kolibri-design-system/pull/152
[195]: https://github.com/learningequality/kolibri-design-system/pull/195
[139]: https://github.com/learningequality/kolibri-design-system/pull/139
[240]: https://github.com/learningequality/kolibri-design-system/pull/240
[191]: https://github.com/learningequality/kolibri-design-system/pull/191
[137]: https://github.com/learningequality/kolibri-design-system/pull/137
[142]: https://github.com/learningequality/kolibri-design-system/pull/142
[143]: https://github.com/learningequality/kolibri-design-system/pull/143
[140]: https://github.com/learningequality/kolibri-design-system/pull/140
[227]: https://github.com/learningequality/kolibri-design-system/pull/227
[204]: https://github.com/learningequality/kolibri-design-system/pull/204
[217]: https://github.com/learningequality/kolibri-design-system/pull/217
[236]: https://github.com/learningequality/kolibri-design-system/pull/236
[231]: https://github.com/learningequality/kolibri-design-system/pull/231
[180]: https://github.com/learningequality/kolibri-design-system/pull/180
[145]: https://github.com/learningequality/kolibri-design-system/pull/145
[224]: https://github.com/learningequality/kolibri-design-system/pull/224
[243]: https://github.com/learningequality/kolibri-design-system/pull/243
[199]: https://github.com/learningequality/kolibri-design-system/pull/199
[192]: https://github.com/learningequality/kolibri-design-system/pull/192
[144]: https://github.com/learningequality/kolibri-design-system/pull/144
[186]: https://github.com/learningequality/kolibri-design-system/pull/186
[200]: https://github.com/learningequality/kolibri-design-system/pull/200
[209]: https://github.com/learningequality/kolibri-design-system/pull/209
[226]: https://github.com/learningequality/kolibri-design-system/pull/226
[229]: https://github.com/learningequality/kolibri-design-system/pull/229
[202]: https://github.com/learningequality/kolibri-design-system/pull/202
[108]: https://github.com/learningequality/kolibri-design-system/pull/108
[116]: https://github.com/learningequality/kolibri-design-system/pull/116
[133]: https://github.com/learningequality/kolibri-design-system/pull/133
[134]: https://github.com/learningequality/kolibri-design-system/pull/134
[174]: https://github.com/learningequality/kolibri-design-system/pull/174
[165]: https://github.com/learningequality/kolibri-design-system/pull/165
[184]: https://github.com/learningequality/kolibri-design-system/pull/184
[188]: https://github.com/learningequality/kolibri-design-system/pull/188
[194]: https://github.com/learningequality/kolibri-design-system/pull/194
[223]: https://github.com/learningequality/kolibri-design-system/pull/223
[250]: https://github.com/learningequality/kolibri-design-system/pull/250
[255]: https://github.com/learningequality/kolibri-design-system/pull/255


# 0.2.1

## Content updates
___
- Added design principles documentation - #[95]
- Added errors documentation - #[97]
- Added switches documentation - #[105]
- Added menu documentation - #[106]

## Library updates
___
- Added `email`, `sidebar`, and `add` icons - #[110]
- Updated `clipboard` icon - #[121]
- Fixed z-order bug in icon button - #[95], #[122]
- The filled icon with `copy` and `duplicate` aliases and the outlined `copyToClipboard` merged into one outlined icon with `copy` alias - #[251]
- Removed `domain` alias from the icon that had previously had two `domain` and `facility` aliases - #[251]
- Added `a11y`, `alternativeRoute`, `disconnected`, `forwardRounded`, and `restart` icons - #[252]
- Fixed regression related to external links opening in new tabs - #[93]

## Docs site updates
---
- Added support for exporting icons to user documentation - #[104]
- Documentation bugs and improvements - #[112], #[114], #[115]

<!-- Referenced PRs -->
[110]: https://github.com/learningequality/kolibri-design-system/pull/110
[121]: https://github.com/learningequality/kolibri-design-system/pull/121
[95]: https://github.com/learningequality/kolibri-design-system/pull/95
[97]: https://github.com/learningequality/kolibri-design-system/pull/97
[105]: https://github.com/learningequality/kolibri-design-system/pull/105
[106]: https://github.com/learningequality/kolibri-design-system/pull/106
[122]: https://github.com/learningequality/kolibri-design-system/pull/122
[251]: https://github.com/learningequality/kolibri-design-system/pull/251
[252]: https://github.com/learningequality/kolibri-design-system/pull/252
[93]: https://github.com/learningequality/kolibri-design-system/pull/93
[104]: https://github.com/learningequality/kolibri-design-system/pull/104
[112]: https://github.com/learningequality/kolibri-design-system/pull/112
[114]: https://github.com/learningequality/kolibri-design-system/pull/114
[115]: https://github.com/learningequality/kolibri-design-system/pull/115

# 0.2.0
This was the first release of the Design System, with documentation written in a Nuxt-based statically-generated site. The focus was on migrating components out of the Kolibri and making them reusable in a shared component library.

# Version 0.1
The design system was originally based on a set of internal Kolibri components and their use as documented in the Kolibri Style Guide, which was first introduced into the Kolibri code base [in version 0.6](https://github.com/learningequality/kolibri/tree/release-v0.6.x/kolibri/plugins/style_guide). This remained until [version 0.13](https://github.com/learningequality/kolibri/tree/release-v0.13.x/kolibri/plugins/style_guide) after which the content was migrated to the [current site](https://design-system.learningequality.org/ "Kolibri Design System Documentation").
