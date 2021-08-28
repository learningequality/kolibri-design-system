- *Releases are specified as tags in the Github releases page*
- *List of the most important changes for each release.*


# 1.0.0

## General
___

- #140 - Material-design-icons is no longer a direct dependency (only a dev dependency) which should reduce timeout errors for products depending on KDS
- #227 - Remove focus ring when not using keyboard to navigate (e.g. when hovering)



## Icons
___
__Added__

- #204 - `pointsLeaf` icon
- #217 - Add `copyToClipboard`, `infoPrimary`, `home`, `unpublishedChange`, `publishedResource` icons
- #236 - Add new learning activity icons
- #231 - Add icons for `incorrectReport`, `registeredKDP`, `superadmin`
- (Misha had some that she has already documented here: https://design-system.learningequality.org/changelog/ (thanks!))


## Components
---

### KExternalLink
__Changed__
- #137 - Add `openInNewTab` prop
- #142 - Add icon for `openInNewTab`
- #143 - Update icons and margins for RTL support

### KTextbox
__Changed__
- #139, #240 - Change background color and error text color

__Fixed__
- #191 - Fix keyboard-input focus outlines so they are the standard blue focus

### KRouterLink
__Changed__
- #150 - Add `icon` and `iconAfter` props
- #152 - Add `replace` prop

__Fixed__
- #195 - Fix text-wrapping in Safari so child takes full width of parent

### KButton
__Changed__
- #153 - Update `basic-link` spacing and color between icons

### KCheckbox
__Added__
- #199 - Adds a `description` prop

__Fixed__
- #199 - Updates label display if both slot and label are given

### KContentRenderer
__Added__
- #224 - Add new `timeSpent`, `duration`, `forceTimeBasedProgress`, `durationBased` props

__Removed__
- #243 - Remove `download_url` from mixin

### KDropdownMenu
__Fixed__
- #180 - Remove need to hit tab twice when using keyboard to open dropdown

### KIconButton
__Fixed__
- #145 - Fix distortion occurring with resized windows by adding `minWidth`

### KSwitch
__Fixed__
- #191 - Fix keyboard-input focus outlines so they are the standard blue focus

### KLabeledIcon
__Fixed__
- #195 - Fix text-wrapping in Safari so child takes full width of parent

## Documentation Updates
___

__Added__
- #202 - Support for updating icons in user documentation
- #108 - Add app bar documentation
- #116 - Add changelog and version history
- #133 - Add documentation about using icons in reStructuredText
- #134, 174 - Add glossary and anchor links
- #165 - Add documentation for library components:
  - `KButton`
  - `KRouterLink`
  - `KExternalLink`
  - `KButtonGroup`
  - `KIconButton`
- #184 - Add imperative verb guidance to modals and page headers
- #188 - Add menu offset guidelines
- #194 - Add Filters pattern page for:
  - Dropdown menus
  - Text input dropdowns
  - Text filters
  - Checkbox lists
- #223 -
  - Remove or enable all disabled Table of Contents items
  - Add many component pages
  - Improve component `jsdocs`
- #250 - Add documentation for release process

__Fixed__
- #200 - Keyboard focus rings in KDS examples
- #209 - Fix sidebar vertical scroll
- #226 - Fix typo in KButtons documentation
- #229 - Add `warningIncomplete` and rename `publishedResource` to `unpublishedResource`

__Changed__
- #192 - Update design principles wording
- #144 - Update page headers
- #186 - Update `KCheckbox` and `KSwitch` examples




# 0.2.1

## Content updates
___
- Added design principles documentation - #95
- Added errors documentation - #97
- Added switches documentation - #105
- Added menu documentation - #106

## Library updates
___
- Added email, sidebar, and add icons - #110
- Updated clipboard icon - #121
- Fixed z-order bug in icon button - #95, #122
- The filled icon with copy and duplicate aliases and the outlined copyToClipboard merged into one outlined icon with copy alias - #251
- Removed domain alias from the icon that had previously had two domain and facility aliases - #251
- Added a11y, alternativeRoute, disconnected, forwardRounded, and restart icons - #252
- Fixed regression related to external links opening in new tabs - #93

## Docs site updates
---
- Added support for exporting icons to user documentation - #104
- Documentation bugs and improvements - #112, #114, #115

# 0.2.0
This was the first release of the Design System, with documentation written in a Nuxt-based statically-generated site. The focus was on migrating components out of the Kolibri and making them reusable in a shared component library.

# Version 0.1
The design system was originally based on a set of internal Kolibri components and their use as documented in the Kolibri Style Guide, which was first introduced into the Kolibri code base in version 0.6. This remained until version 0.13 after which the content was migrated to the [current site](https://design-system.learningequality.org/ "Kolibri Design System Documentation").
