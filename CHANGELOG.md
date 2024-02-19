# Changelog

Changelog is rather internal in nature. See release notes for the public overview and guidelines. Releases are recorded as git tags in the [Github releases](https://github.com/learningequality/kolibri-design-system/releases) page.

## Upcoming version

<!-- Put all new updates into this section, please -->

- [#531]
  - **Description:** Remove unused `keen-ui` dependency
  - **Products impact:** none
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#531]: https://github.com/learningequality/kolibri-design-system/pull/531

## Version 3.0.0

- [#522]
  - **Description:** Upgrades github-actions/cache dependency
  - **Products impact:** Dev dependency upgrade
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#522]: https://github.com/learningequality/kolibri-design-system/pull/522

- [#518]
  - **Description:** Add testing for KImg component
  - **Products impact:** none
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/512
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** no  - 
  - **Guidance:** -

[#518]: https://github.com/learningequality/kolibri-design-system/pull/518

- [#521]
  - **Description:** Move date-fns dependency to depencies rather than dev-dependencies.
  - **Products impact:** bugfix
  - **Addresses:** N/A
  - **Components:** KDateRange/KDateInput
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** ~

[#521]: https://github.com/learningequality/kolibri-design-system/pull/521

- [#509]
  - **Description:** Introduces `appearanceOverrides` prop for the `KImg` component
  - **Products impact:** new API 
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/371
  - **Components:** KImg
  - **Breaking:** No
  - **Impacts a11y:** No
  - **Guidance:** -

[#509]: https://github.com/learningequality/kolibri-design-system/pull/509

- [#516]
  - **Description:** Upgrades follow-redirects dependency
  - **Products impact:** Dependency upgrade
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#516]: https://github.com/learningequality/kolibri-design-system/pull/516

- [#508]
  - **Description:** Update Github maintained github actions to latest versions
  - **Products impact:** -
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** no  
  - **Guidance:** -

[#508]: https://github.com/learningequality/kolibri-design-system/pull/508

- [#502]
  - **Description:** Add dispatching of 'error' event when failed to load image for 'KImg'
  - **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/372
  - **Components:** KImg
  - **Breaking:** no
  - **Impacts a11y:** yes  
  - **Guidance:** Allows the consumer to hook into the lifecycle of 'KImg' and handle the cases when the image fails to load

[#502]: https://github.com/learningequality/kolibri-design-system/pull/502

- [#505]
  - **Description:**  Added custom implementation of GH action that checks that changelog is updated in each pull request
  - **Products impact:** none
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/481
  - **Components:** -
  - **Breaking:** 
  - **Impacts a11y:** 
  - **Guidance:** -

[#505]: https://github.com/learningequality/kolibri-design-system/pull/505

- [#493]
  - **Description:** Changed the value of z-index of KDropdownMenu to 99.
  - **Products impact:** Bugfix
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/486
  - **Components:** KDropdownMenu
  - **Breaking:** No
  - **Impacts a11y:** No
  - **Guidance:** -

[#493]: https://github.com/learningequality/kolibri-design-system/pull/493

- [#500]
  - **Description:** Upgrades vue-router dependency
  - **Products impact:** Dependency upgrade
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#500]: https://github.com/learningequality/kolibri-design-system/pull/500

- [#421]
  - **Description:** Upgrades kolibri-tools dependency and removes KDS' circular dependency on itself
  - **Products impact:** Dependency upgrade
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#421]: https://github.com/learningequality/kolibri-design-system/pull/421

- [#499]
  - **Description:** Upgrades @babel/traverse dependency to address security vulnerability
  - **Products impact:** Dependency upgrade
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#499]: https://github.com/learningequality/kolibri-design-system/pull/499

- [#467]
  - **Description:** Upgrades word-wrap dependency to address security vulnerability
  - **Products impact:** Dependency upgrade
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#467]: https://github.com/learningequality/kolibri-design-system/pull/467

- [#483]
  - **Description:** Upgrades browserify-sign dependency to address security vulnerability
  - **Products impact:** Dependency upgrade
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#483]: https://github.com/learningequality/kolibri-design-system/pull/483

- [#494]
  - **Description:** Update contributing guidelines
  - **Products impact:** none
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#494]: [https://github.com/learningequality/kolibri-design-system/pull/494]

- [#492]
  - **Description:** Add autofocus directive on KRadioButton to fix autofocus behavior on dynamic rendering.
  - **Products impact:** bugfix
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/489
  - **Components:** KRadioButton
  - **Breaking:** no
  - **Impacts a11y:** yes
  - **Guidance:** Add "autofocus" prop on KRadioButton. This change improves keyboard navigation on forms where a KRadioButton jumps into the DOM.

[#492]: https://github.com/learningequality/kolibri-design-system/pull/492

- [#497]
  - **Description:** KDropdownMenu now emits a @tab event when the user hits the [Tab] key and a @close event when the menu is closed programmatically. Additionally, a new icon for Expand All was added and can be used just like any other icon with the "expandAll" name.
  - **Products impact:** updated API
  - **Addresses:** -
  - **Components:** KDropdownMenu
  - **Breaking:** No
  - **Impacts a11y:** yes
  - **Guidance:**  The @tab event can be used for more precise focus management as the popover by default could end up sending focus to the root HTML element by default. Note that the browser event is passed to the handler function, so you may need/want to call `preventDefault()` on that event depending on your use case.

  [#497]: https://github.com/learningequality/kolibri-design-system/pull/497

- [#491]
  - **Description:** Replaced setTimeout with requestAnimationFrames in tests for useKWindowDimensions and useKResponsiveWindow
  - **Products impact:** -
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/480
  - **Components:** none
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

  [#491]: [https://github.com/learningequality/kolibri-design-system/pull/491]

- [#478]
  - **Description:** Changed _dev-only to dev-only
  - **Products impact:** -
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/474
  - **Components:** none
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

  [#478]: https://github.com/learningequality/kolibri-design-system/pull/478

- [#482]
  - **Description:** Changed develop branch to main branch in Readme
  - **Products impact:** -
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/479
  - **Components:** none
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

  [#482]: https://github.com/learningequality/kolibri-design-system/pull/482

- [#485]
  - **Description:** Updated KRadioButton 'value' prop to 'buttonValue'
  - **Products impact:** Updated API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/379
  - **Components:** KRadioButton
  - **Breaking:** Yes
  - **Impacts a11y:** 
  - **Guidance:** KRadioButton 'value' prop is deprecated. Please use the 'buttonValue' prop instead.
 
  [#485]: https://github.com/learningequality/kolibri-design-system/pull/485

## Version 2.0.0

- [#464]
  - **Description:** Add KTextTruncator
  - **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/450
  - **Components:** KTextTruncator
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#464]: https://github.com/learningequality/kolibri-design-system/pull/464

- [#460]
  - **Description:** Add KLogo
  - **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/373
  - **Components:** KLogo
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#460]: https://github.com/learningequality/kolibri-design-system/pull/460

- [#470]
  - **Description:** Fix bug and add test guard in MediaQuery implementation
  - **Products impact:** none
  - **Addresses:** -
  - **Components:** none
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#470]: https://github.com/learningequality/kolibri-design-system/pull/470

- [#469]
  - **Description:** Throttle the resize listener handler
  - **Products impact:** updated API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/461
  - **Components:** useKResponsiveWindow
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#469]: https://github.com/learningequality/kolibri-design-system/pull/469

- [#472]
  - **Description:** Fix useKShow bug and add tests
  - **Products impact:** bugfix
  - **Addresses:** -
  - **Components:** useKShow
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#472]: https://github.com/learningequality/kolibri-design-system/pull/472

- [#463]
  - **Description:** Add deprecation warning for KResponsiveWindowMixin
  - **Products impact:** updated API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/459
  - **Components:** KResponsiveWindowMixin
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** useKResponsiveWindow composable should be used instead

[#463]: https://github.com/learningequality/kolibri-design-system/pull/463

- [#462]
  - **Description:** Fix internal links in design system documentation
  - **Products impact:** none
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/pull/423
  - **Components:** none
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#462]: https://github.com/learningequality/kolibri-design-system/pull/462

- [#453]
  - **Description:** Fix sidepanel opening in Kolibri Library page after resizing window
  - **Products impact:** bugfix
  - **Addresses:** https://github.com/learningequality/kolibri/issues/11212
  - **Components:** `useKResponsiveWindow` (composable)
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#453]: https://github.com/learningequality/kolibri-design-system/pull/453

- [#449]
  - **Description:** Fix textbox being unexpectedly focused after the first page load
  - **Products impact:** bugfix
  - **Addresses:** https://github.com/learningequality/kolibri/issues/9077
  - **Components:** `KTextbox`
  - **Breaking:** no
  - **Impacts a11y:** yes
  - **Guidance:** -

[#449]: https://github.com/learningequality/kolibri-design-system/pull/449

- [#450]
  - **Description:** Add new changelog and GH action to check that the changelog is updated in each pull request
  - **Products impact:** -
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#450]: https://github.com/learningequality/kolibri-design-system/pull/450

- [#448]
  - **Description:** Adds `KTransition`
  - **Products impact:** new API
  - **Addresses:** -
  - **Components:** `KTransition`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** Exposes predefined set of transitions built on top of Vue's `<transition>`

[#448]: https://github.com/learningequality/kolibri-design-system/pull/448


- [#448]
  - **Description:** Add a new prop, `disableDefaultTransition`, to `KCircularLoader`
  - **Products impact:** new API
  - **Addresses:** -
  - **Components:** `KCircularLoader`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** You can use the new prop to prevent from glitches when using the loader in tandem with another component, both of them wrapped in a transition

[#448]: https://github.com/learningequality/kolibri-design-system/pull/448

- [#448]
  - **Description:** Rename `KCircularLoader`'s `show` prop to `shouldShow`
  - **Products impact:** updated API
  - **Addresses:** -
  - **Components:** `KCircularLoader`
  - **Breaking:** yes
  - **Impacts a11y:** no
  - **Guidance:** If you use `show` prop on `KCircularLoader`, rename it to `shouldShow`

[#448]: https://github.com/learningequality/kolibri-design-system/pull/448

- [#448]
  - **Description:** Add `useKShow` composable. Related refactoring of `KCircularLoader`.
  - **Products impact:** new API
  - **Addresses:** -
  - **Components:** `useKShow`, `KCircularLoader`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#448]: https://github.com/learningequality/kolibri-design-system/pull/448

- [#447]
  - **Description:** Improve contributing guidelines and add a playground page for developers
  - **Products impact:** none
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#447]: https://github.com/learningequality/kolibri-design-system/pull/447

- [#446]
  - **Description:** Fixes icon components' `color` property not being applied for some custom icons by removing hardcoded fill color from svg files. Affected icons: `computerScienceResource`, `currentEventsResource`, `diversityResource`, `entrepreneurshipResource`, `environmentResource`, `financialLiteracyResource`, `historyResource`, `learningSkillsResource`, `literacyResource`, `logicCriticalThinkingResource`, `mathematicsResource`, `mentalHealthResource`, `readingAndWritingResource`, `sciencesResource`, `skillsResource`
  - **Products impact:** bugfix
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/395
  - **Components:** `KIcon`, `KIconButton`, `KLabeledIcon`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#446]: https://github.com/learningequality/kolibri-design-system/pull/446

- [#446]
  - **Description:** `KIcon` throws a warning about `color` prop not being applied for icons that are supposed to have fixed colors
  - **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/395
  - **Components:** `KIcon`, `KIconButton`, `KLabeledIcon`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#446]: https://github.com/learningequality/kolibri-design-system/pull/446

- [#443]
  - **Description:** Update inputs within `KDateRange` to type `date` and add support for RTL languages
  - **Products impact:** bugfix
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/442
  - **Components:** `KDateRange`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#443]: https://github.com/learningequality/kolibri-design-system/pull/443

- [#436]
  - **Description:** Remove `KContentRenderer` component
  - **Products impact:** removed API
  - **Addresses:** -
  - **Components:** `KContentRenderer`
  - **Breaking:** yes
  - **Impacts a11y:** no
  - **Guidance:** Import `KContentRendered` from Kolibri repository

[#436]: https://github.com/learningequality/kolibri-design-system/pull/436

- [#437]
  - **Description:** Update README with our approach to vendored Keen UI files + add installation step to `yarn link` guidelines
  - **Products impact:** none
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#437]: https://github.com/learningequality/kolibri-design-system/pull/437

- [#433]
  - **Description:** Add new `props`, `minVisibleTime` and `show`, to `KCircularLoader` to allow it being displayed for a desired minimum amount of time
  - **Products impact:** new API
  - **Addresses:** -
  - **Components:** `KCircularLoader`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#433]: https://github.com/learningequality/kolibri-design-system/pull/433

- [#429]
  - **Description:** Allows `KSelect` to extend outside of `KModal`
  - **Products impact:** bugfix
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/324
  - **Components:** `KSelect`, `KModal`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** Some core calculations were tweaked so it would be wise to preview `KModal` and `KSelect` for regressions

[#429]: https://github.com/learningequality/kolibri-design-system/pull/429

- [#427]
  - **Description:** Display the months of the year within the `KDateCalendar` in the correct language
  - **Products impact:** bugfix
  - **Addresses:** -
  - **Components:** `KDateRange`
  - **Breaking:** no
  - **Impacts a11y:** yes
  - **Guidance:** -

[#427]: https://github.com/learningequality/kolibri-design-system/pull/427

- [#426]
  - **Description:** Add `'click'` event to `KTabsList`
  - **Products impact:** new API
  - **Addresses:** -
  - **Components:** `KTabsList`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#426]: https://github.com/learningequality/kolibri-design-system/pull/426

- [#426]
  - **Description:** Fix `KTabsList` focus state
  - **Products impact:** bugfix
  - **Addresses:** -
  - **Components:** `KTabsList`, `KTabs`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#426]: https://github.com/learningequality/kolibri-design-system/pull/426

- [#425]
  - **Description:** Adds `pinned` and `notPinned` icons
  - **Products impact:** new API
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#425]: https://github.com/learningequality/kolibri-design-system/pull/425

- [#425]
  - **Description:** Updates `cloud` icon to outline style
  - **Products impact:** updated API
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#425]: https://github.com/learningequality/kolibri-design-system/pull/425

- [#424]
  - **Description:** Adds `laptop`, `cloud `and `wifi` icons
  - **Products impact:** new API
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#424]: https://github.com/learningequality/kolibri-design-system/pull/424

- [#420]
  - **Description:** Fix randomly missing focus ring
  - **Products impact:** bugfix
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** yes
  - **Guidance:** -

[#420]: https://github.com/learningequality/kolibri-design-system/pull/420

- [#420]
  - **Description:** Add `KTabs`, `KTabsList`, and `KTabsPanel` components
  - **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/385
  - **Components:** `KTabs`, `KTabsList`, `KTabsPanel`
  - **Breaking:** no
  - **Impacts a11y:** yes
  - **Guidance:** -

[#420]: https://github.com/learningequality/kolibri-design-system/pull/420

- [#403]
  - **Description:** Add `KOptionalText`
  - **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/285
  - **Components:** `KOptionalText`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#403]: https://github.com/learningequality/kolibri-design-system/pull/403

- [#387]
  - **Description:** Fix `KDropdownMenu` causing the window to scroll to the top on the menu button click
  - **Products impact:** bugfix
  - **Addresses:** https://github.com/learningequality/kolibri/pull/9833#issuecomment-1322303903
  - **Components:** `KDropdownMenu`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#387]: https://github.com/learningequality/kolibri-design-system/pull/387

- [#406]
  - **Description:** Fixes months displayed at the turn of a year in `KDateRange`, removes font-family, and fixes console warnings
  - **Products impact:** bugfix
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/405
  - **Components:** `KDateRange`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#406]: https://github.com/learningequality/kolibri-design-system/pull/406

- [#404]
  - **Description:** Initial implementation of `KImg` component
  - **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/369
  - **Components:** `KImg`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#404]: https://github.com/learningequality/kolibri-design-system/pull/404

- [#402]
  - **Description:** Fixes partially hidden `KSelect`'s dropdown menu when there is not enough space below the button. The menu will now show above the button in such a scenario.
  - **Products impact:** bugfix
  - **Addresses:** https://github.com/learningequality/kolibri/issues/7752
  - **Components:** `KSelect`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#402]: https://github.com/learningequality/kolibri-design-system/pull/402

- [#378]
  - **Description:** Fix `KDropdownMenu` not showing after its refactor in [#346] by adding missing template tags to `KButton`
  - **Products impact:** bugfix
  - **Addresses:** https://github.com/learningequality/kolibri/issues/9754
  - **Components:** `KDropdownMenu`, `KButton`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#378]: https://github.com/learningequality/kolibri-design-system/pull/378

- [#384]
  - **Description:**  Add `KDateRange` component
  - **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/360
  - **Components:** `KDateRange`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#384]: https://github.com/learningequality/kolibri-design-system/pull/384

- [#393]
  - **Description:**  Update developers documentation to not include deleting KDS from package.json
  - **Products impact:** none
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#393]: https://github.com/learningequality/kolibri-design-system/pull/393

- [#400]
  - **Description:**  Fix `useKWindowDimension`'s resize event listener not being properly removed
  - **Products impact:** bugfix
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/398
  - **Components:** `useKWindowDimension`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#400]: https://github.com/learningequality/kolibri-design-system/pull/400

- [#401]
  - **Description:**  `KBreadcrumbs`'s links to intermediary items can be optionally disabled by omitting the `link` attribute, or making it falsey
  - **Products impact:** new API
  - **Addresses:** -
  - **Components:** `KBreadcrumbs`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#401]: https://github.com/learningequality/kolibri-design-system/pull/401

- [#380]
  - **Description:**  Wraps `KRadioButton`' label instead of truncating it. Adds a new `prop`,  `truncateLabel`, that turns on truncating rather than wrapping.
  - **Products impact:** updated API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/350
  - **Components:** `KRadioButton`
  - **Breaking:** yes
  - **Impacts a11y:** no
  - **Guidance:** Examine places where `KRadioButton` is used and see whether the new default behavior (wrapping) is problematic. If needed, you can set `truncateLabel` to `true` to retain the previous default behavior (truncating).

[#380]: https://github.com/learningequality/kolibri-design-system/pull/380

- [#380]
  - **Description:**  Add the `showLabel` prop to `KRadioButton` to determine whether a label should be displayed. Relatedly, make `label` prop optional.
  - **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/349
  - **Components:** `KRadioButton`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#380]: https://github.com/learningequality/kolibri-design-system/pull/380

- [#380]
  - **Description:** `KRadioButton` emits `'blur'` event on blur
  - **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/349
  - **Components:** `KRadioButton`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#380]: https://github.com/learningequality/kolibri-design-system/pull/380

- [#377]
  - **Description:** Add `useKResponsiveWindow` composable
  - **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/288
  - **Components:** `useKResponsiveWindow`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#377]: https://github.com/learningequality/kolibri-design-system/pull/377

- [#353]
  - **Description:** Update README.md guidance on `yarn link`
  - **Products impact:** none
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#353]: https://github.com/learningequality/kolibri-design-system/pull/353

- [#367]
  - **Description:** Better naming of the changelog section
  - **Products impact:** none
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#367]: https://github.com/learningequality/kolibri-design-system/pull/367

- [#358]
  - **Description:** Improves `DocsShowCode` component layout
  - **Products impact:** none
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#358]: https://github.com/learningequality/kolibri-design-system/pull/358

- [#357]
  - **Description:** Bind all attributes to navigation element within `KBreadcrumbs`
  - **Products impact:** updated API
  - **Addresses:** -
  - **Components:** `KBreadcrumbs`
  - **Breaking:** no
  - **Impacts a11y:** yes
  - **Guidance:** Even though this is a general update that allows all `KBreadcrumbs` attributes to be passed right to its `<nav>`, we intially did it to support adding `aria-label` easily. Whenever you use `KBreadcrumbs`, consider improving a11y through `ariaLabel` attribute on `KBreadcrumbs`.

[#357]: https://github.com/learningequality/kolibri-design-system/pull/357

- [#361]
  - **Description:** Fixes 'Property or method "disabled" is not defined on the instance but referenced during render.' raised by `KDropdownMenu`. Related to updates introduced in [#346].
  - **Products impact:** bugfix
  - **Addresses:** -
  - **Components:** `KDropdownMenu`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#361]: https://github.com/learningequality/kolibri-design-system/pull/361

- [#361]
  - **Description:** `KButton` exposes `hasDropdown` prop which will show the dropdown arrow icon in a button. Related to updates introduced in [#346].
  - **Products impact:** updated API
  - **Addresses:** -
  - **Components:** `KButton`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#361]: https://github.com/learningequality/kolibri-design-system/pull/361

- [#346]
  - **Description:** `KButton`: The default slot doesn't take precedence over the `text` prop anymore. The slot's content will be rendered above `text` when both are provided.
  - **Products impact:** updated API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/164, https://github.com/learningequality/kolibri-design-system/issues/136
  - **Components:** `KButton`
  - **Breaking:** yes
  - **Impacts a11y:** no
  - **Guidance:** If you use `KButton`'s default slot simultaneously with the `text` prop, the button most likely won't render as expected. You might need to add some kind of a custom condition to resolve that.

[#346]: https://github.com/learningequality/kolibri-design-system/pull/346

- [#346]
  - **Description:** `KDropdownMenu` has a new prop `hasIcons` which controls whether or not the options display an icon.
  - **Products impact:** new API
  - **Addresses:** -
  - **Components:** `KDropdownMenu`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#346]: https://github.com/learningequality/kolibri-design-system/pull/346

- [#346]
  - **Description:** `KDropdownMenu` no longer contains a button. All props related to buttons were removed from `KDropdownMenu`, namely `text`, `appearance`, and `disabled`. `KButton` and `KIconButton` has a new `#menu` slot in which `KDropdownMenu` can be placed.
  - **Products impact:** updated API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/164
  - **Components:** `KDropdownMenu`
  - **Breaking:** yes
  - **Impacts a11y:** no
  - **Guidance:** Place `KDropdownMenu` into `KButton`'s or `KIconButton`'s `menu` slot and move `text`, `appearance`, and `disabled` props from `KDropdownMenu` to `KButton`/`KIconButton`. See [an example in the documentation](https://develop--kolibri-design-system.netlify.app/buttons/#dropdowns). Visit "Props" and "Slots" sections of these components' documentation pages for more details.

[#346]: https://github.com/learningequality/kolibri-design-system/pull/346

- [#355]
  - **Description:** Moves `KSelect` from Kolibri to KDS
  - **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/339
  - **Components:** `KSelect`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#355]: https://github.com/learningequality/kolibri-design-system/pull/355

- [#351]
  - **Description:** Wrap `KCheckbox` default slot's content in `<label>`
  - **Products impact:** updated API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/347
  - **Components:** `KCheckbox`
  - **Breaking:** yes
  - **Impacts a11y:** yes
  - **Guidance:** Even though this will fix all places where we forgot to wrap the default's slot content in `<label>`, it will cause problems in places we didn't forget to do so as there will now be two `<label>`s wrapping the label content. Therefore, check all places where `KCheckbox` is used and if you see `<label>` in its default slot, remove it.

[#351]: https://github.com/learningequality/kolibri-design-system/pull/351

## Version 1.4.x

- [#185] - Handle arrow key navigation and improve focusOutline
- [#338] - Allow for new 'nav' slot inline in the toolbar
- [#362] - Add documentation pages for 'KResponsiveWindow' and 'KResponsiveElement'
- [#364] - Fixes 'Missing focus ring around password inputs' while navigating with keyboard.

<!-- Referenced PRs -->
[#185]: https://github.com/learningequality/kolibri-design-system/pull/185
[#338]: https://github.com/learningequality/kolibri-design-system/pull/338
[#362]: https://github.com/learningequality/kolibri-design-system/pull/362
[#364]: https://github.com/learningequality/kolibri-design-system/pull/364

## Version 1.3.1

- [#309] - Add jest testing environment to KDS
- [#311] - Add tests for `KRouterLink`
- [#313] - Add tests for `KButton`
- [#315] - Add tests for `KCheckbox`
- [#320] - Add tests for `KModal`
- [#322] - Add tests for `KTextbox`

<!-- Referenced PRs -->
[#309]: https://github.com/learningequality/kolibri-design-system/pull/309
[#311]: https://github.com/learningequality/kolibri-design-system/pull/311
[#313]: https://github.com/learningequality/kolibri-design-system/pull/313
[#315]: https://github.com/learningequality/kolibri-design-system/pull/315
[#320]: https://github.com/learningequality/kolibri-design-system/pull/320
[#322]: https://github.com/learningequality/kolibri-design-system/pull/322


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
