# Changelog

Releases are recorded as git tags in the [Github releases](https://github.com/learningequality/kolibri-design-system/releases) page.

## Version 1.3.1

- [#309] - Add jest testing environment to KDS
- [#311] - Add tests for `KRouterLink`
- [#313] - Add tests for `KButton`
- [#315] - Add tests for `KCheckbox`
- [#320] - Add tests for `KModal`

<!-- Referenced PRs -->
[#309]: https://github.com/learningequality/kolibri-design-system/pull/309
[#311]: https://github.com/learningequality/kolibri-design-system/pull/311
[#313]: https://github.com/learningequality/kolibri-design-system/pull/313
[#315]: https://github.com/learningequality/kolibri-design-system/pull/315
[#320]: https://github.com/learningequality/kolibri-design-system/pull/320

## Version 1.3.0

- [#291] - When tracking input modality with `trackInputModality`, modality is set to keyboard only when the TAB key is pressed
- [#292] - Add `KBreadcrumbs` page to the components documentation
- [#292] - Optimize `KBreadcrumbs` to use all space available
- [#292] - Fix `KBreadcrumbs` items vertical alignment
- [#292] - Fix `KBreadcrumbs` items not collapsing when there are more instances on a page

<!-- Referenced PRs -->

[#291]: https://github.com/learningequality/kolibri-design-system/pull/291
[#292]: https://github.com/learningequality/kolibri-design-system/pull/292

## Version 1.2.1

- [#279] - Fix vertical shifting of `KTextbox`

<!-- Referenced PRs -->

[#279]: https://github.com/learningequality/kolibri-design-system/pull/279

## Version 1.2.0

- [#281] - Allow `KModal` to take a `size` in pixels
- [#278] - Adds `timer` icon
- [#275] - Renames some icons: `socialScienceResource` -> `socialSciencesResource`, `mathResource` -> `mathematicsResource`, `scienceResource` -> `sciencesResource`, `readingWritingResource` -> `readingAndWritingResource`

<!-- Referenced PRs -->

[#281]: https://github.com/learningequality/kolibri-design-system/pull/281
[#278]: https://github.com/learningequality/kolibri-design-system/pull/278
[#275]: https://github.com/learningequality/kolibri-design-system/pull/275


## Version 1.1.0

### Added

- [#270] - New icons for Kolibri 0.15
- [#272] - Enable 'Loaders' documentation page which was previously hidden

<!-- Referenced PRs -->

[#270]: https://github.com/learningequality/kolibri-design-system/pull/270
[#272]: https://github.com/learningequality/kolibri-design-system/pull/272


## Version 1.0.0

### Added

- [#116], [#255] - Changelog
- [#204] - `pointsLeaf` icon
- [#217] - `copyToClipboard`, `infoPrimary`, `home`, `unpublishedChange`, `publishedResource` icons
- [#236] - Learning activity icons
- [#231] - `incorrectReport`, `registeredKDP`, and `superadmin` icons
- [#229] - `warningIncomplete` icon
- [#150], [#152] - `KRouterLink` - `icon`, `iconAfter` and `replace` props
- [#199] - `KCheckbox` - `description` prop
- [#137], [#142] - `KExternalLink` - `openInNewTab` prop
- [#224] - `KContentRenderer` - `timeSpent`, `duration`, `forceTimeBasedProgress`, and `durationBased` props
- [#108] - App bar documentation
- [#133] - Documentation about using icons in reStructuredText
- [#134], [#174] - Glossary and anchor links
- [#165] - Documentation for library components:
  - `KButton`
  - `KRouterLink`
  - `KExternalLink`
  - `KButtonGroup`
  - `KIconButton`
- [#184] - Imperative verb guidance for modals and page headers
- [#188] - Menu offset guidelines
- [#194] - Filters pattern page for:
  - Dropdown menus
  - Text input dropdowns
  - Text filters
  - Checkbox lists
- [#250] - Documentation for design system release process

### Changed

- [#140] - [Material design icons](https://google.github.io/material-design-icons/) is no longer a direct dependency (only a dev dependency) which should reduce timeout errors for products depending on KDS
- [#143] - `KExternalLink` - Updated icons and margins for RTL support
- [#139], [#240] - `KTextbox` - Changed background color and error text color
- [#153] - `KButton` - Updated `basic-link` spacing and color between icons
- [#223] - Improved component API documentation
- [#229] - Renamed `publishedResource` icon to `unpublishedResource`
- [#192] - Updated design principles wording
- [#144] - Updated page headers
- [#186] - Updated `KCheckbox` and `KSwitch` examples

### Removed

- [#243] - `KContentRenderer` - Removed `download_url` from mixin

### Fixed

- [#227] - Global styles - Focus outline no longer shows when hovering over elements
- [#191] - `KTextbox` - Keyboard-input focus outlines are the standard blue focus
- [#195] - `KRouterLink` - Fixed text-wrapping in Safari so child takes full width of parent
- [#199] - `KCheckbox` - Updated label display if both slot and label are given
- [#180] - `KDropdownMenu` - Removed need to hit tab twice when using keyboard to open dropdown
- [#145] - `KIconButton` - Fixed distortion occurring with resized windows by adding `minWidth`
- [#191] - `KSwitch` - Fixed keyboard-input focus outlines so they are the standard blue focus
- [#195] - `KLabeledIcon` - Fixed text-wrapping in Safari so child takes full width of parent
- [#200] - Design system - Fixed keyboard focus rings in examples
- [#209] - Design system - Fixed sidebar vertical scrolling
- [#256] - `KTextBox` - Fixed autofocus error

<!-- Referenced PRs -->

[#153]: https://github.com/learningequality/kolibri-design-system/pull/153
[#150]: https://github.com/learningequality/kolibri-design-system/pull/150
[#152]: https://github.com/learningequality/kolibri-design-system/pull/152
[#195]: https://github.com/learningequality/kolibri-design-system/pull/195
[#139]: https://github.com/learningequality/kolibri-design-system/pull/139
[#240]: https://github.com/learningequality/kolibri-design-system/pull/240
[#191]: https://github.com/learningequality/kolibri-design-system/pull/191
[#137]: https://github.com/learningequality/kolibri-design-system/pull/137
[#142]: https://github.com/learningequality/kolibri-design-system/pull/142
[#143]: https://github.com/learningequality/kolibri-design-system/pull/143
[#140]: https://github.com/learningequality/kolibri-design-system/pull/140
[#227]: https://github.com/learningequality/kolibri-design-system/pull/227
[#204]: https://github.com/learningequality/kolibri-design-system/pull/204
[#217]: https://github.com/learningequality/kolibri-design-system/pull/217
[#236]: https://github.com/learningequality/kolibri-design-system/pull/236
[#231]: https://github.com/learningequality/kolibri-design-system/pull/231
[#180]: https://github.com/learningequality/kolibri-design-system/pull/180
[#145]: https://github.com/learningequality/kolibri-design-system/pull/145
[#224]: https://github.com/learningequality/kolibri-design-system/pull/224
[#243]: https://github.com/learningequality/kolibri-design-system/pull/243
[#199]: https://github.com/learningequality/kolibri-design-system/pull/199
[#192]: https://github.com/learningequality/kolibri-design-system/pull/192
[#144]: https://github.com/learningequality/kolibri-design-system/pull/144
[#186]: https://github.com/learningequality/kolibri-design-system/pull/186
[#200]: https://github.com/learningequality/kolibri-design-system/pull/200
[#209]: https://github.com/learningequality/kolibri-design-system/pull/209
[#226]: https://github.com/learningequality/kolibri-design-system/pull/226
[#229]: https://github.com/learningequality/kolibri-design-system/pull/229
[#202]: https://github.com/learningequality/kolibri-design-system/pull/202
[#108]: https://github.com/learningequality/kolibri-design-system/pull/108
[#116]: https://github.com/learningequality/kolibri-design-system/pull/116
[#133]: https://github.com/learningequality/kolibri-design-system/pull/133
[#134]: https://github.com/learningequality/kolibri-design-system/pull/134
[#174]: https://github.com/learningequality/kolibri-design-system/pull/174
[#165]: https://github.com/learningequality/kolibri-design-system/pull/165
[#184]: https://github.com/learningequality/kolibri-design-system/pull/184
[#188]: https://github.com/learningequality/kolibri-design-system/pull/188
[#194]: https://github.com/learningequality/kolibri-design-system/pull/194
[#223]: https://github.com/learningequality/kolibri-design-system/pull/223
[#250]: https://github.com/learningequality/kolibri-design-system/pull/250
[#255]: https://github.com/learningequality/kolibri-design-system/pull/255
[#256]: https://github.com/learningequality/kolibri-design-system/pull/256

## Version 0.2.1

### Added

- [#95] - Design principles documentation
- [#97] - Errors documentation
- [#105] - Switches documentation
- [#106] - Menu documentation
- [#110] - `email`, `sidebar`, and `add` icons
- [#252] - `a11y`, `alternativeRoute`, `disconnected`, `forwardRounded`, and `restart` icons
- [#104] - Support for exporting icons to reStructuredText user documentation

### Changed

- [#121] - Updated `clipboard` icon
- [#93] - Fixed regression related to external links opening in new tabs

### Removed

- [#251] - `duplicate` and `copyToClipboard` icon aliases removed in favor of `copy`
- [#251] - `domain` icon alias removed because it was the same icon as `facility`

### Fixed

- [#95], [#122] - Fixed z-order bug in icon button
- [#112], [#114], [#115] - Documentation bugs and improvements

<!-- Referenced PRs -->

[#110]: https://github.com/learningequality/kolibri-design-system/pull/110
[#121]: https://github.com/learningequality/kolibri-design-system/pull/121
[#95]: https://github.com/learningequality/kolibri-design-system/pull/95
[#97]: https://github.com/learningequality/kolibri-design-system/pull/97
[#105]: https://github.com/learningequality/kolibri-design-system/pull/105
[#106]: https://github.com/learningequality/kolibri-design-system/pull/106
[#122]: https://github.com/learningequality/kolibri-design-system/pull/122
[#251]: https://github.com/learningequality/kolibri-design-system/pull/251
[#252]: https://github.com/learningequality/kolibri-design-system/pull/252
[#93]: https://github.com/learningequality/kolibri-design-system/pull/93
[#104]: https://github.com/learningequality/kolibri-design-system/pull/104
[#112]: https://github.com/learningequality/kolibri-design-system/pull/112
[#114]: https://github.com/learningequality/kolibri-design-system/pull/114
[#115]: https://github.com/learningequality/kolibri-design-system/pull/115

## Version 0.2.0

This was the first release of the Design System, with documentation written in a Nuxt-based statically-generated site. The focus was on migrating components out of the Kolibri and making them reusable in a shared component library.

## Version 0.1.0

The design system was originally based on a set of internal Kolibri components and their use as documented in the Kolibri Style Guide, which was first introduced into the Kolibri code base [in version 0.6](https://github.com/learningequality/kolibri/tree/release-v0.6.x/kolibri/plugins/style_guide). This remained until [version 0.13](https://github.com/learningequality/kolibri/tree/release-v0.13.x/kolibri/plugins/style_guide) after which the content was migrated to the [current site](https://design-system.learningequality.org/ 'Kolibri Design System Documentation').
