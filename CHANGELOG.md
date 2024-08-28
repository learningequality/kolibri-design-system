# Changelog

Changelog is rather internal in nature. See release notes for the public overview and guidelines. Releases are recorded as git tags in the [Github releases](https://github.com/learningequality/kolibri-design-system/releases) page.

## Upcoming version 5.x.x (`develop` branch)
-[736]
- **Description:** this pull request replaces the `dropshadows` component of the files according to the latest guidelines
- **Products impact:** none
- **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/724 
- **Components:** -
- **Breaking:** no
- **Impacts a11y:** no
- **Guidance:** -


- [#723]
  - **Description:** Updates $core-time value from 0.25s to 0.15s
  - **Products impact:** User experience - faster transitions
  - **Addresses:** Updates KDS to the latest guidance from the design team
  - **Components:** `KButton`, `KExternalLink`, `KRouterLink`, `KModal`, `KCard`, `KIcon`, `KTabsList`, `KTabs`, and places in consumers that imports `$core-time`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#723]: https://github.com/learningequality/kolibri-design-system/pull/723


- [#723]
  - **Description:** Updates drop shadows documentation to the latest guidance from the design team
  - **Products impact:** -
  - **Addresses:** Updates KDS to the latest guidance from the design team
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#723]: https://github.com/learningequality/kolibri-design-system/pull/723
- [#728]
  - **Description:** Adds `$darken_` utility functions for darkening palette colors and ensures compatibility with Node.js v10 by pinning the `color` package version to `3.2.1`.
  - **Products impact:** Kolibri Design System
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/726
  - **Components:** Styling utilities (`$darken1(hexColorValue)`,`$darken2(hexColorValue)` and `$darken3(hexColorValue)` functions)
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** Ensure to install the exact `color` version specified in `package.json` to maintain compatibility with Node.js v10.

[#728]: https://github.com/learningequality/kolibri-design-system/pull/728

- [#738]
  - **Description:** Bump KDS version to 5.0.0-rc2.
  - **Products impact:** -.
  - **Addresses:** -.
  - **Components:** -.
  - **Breaking:** -.
  - **Impacts a11y:** -.
  - **Guidance:** -.

[#738]: https://github.com/learningequality/kolibri-design-system/pull/738

- [705]
  - **Description:**  Update`KCard`  updates: Adds 'preserveAboveTitle`, `preserveBelowTitle`, `preserveFooter` prop for flexible  slot management.
  - **Products impact:**  Card updates 
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/702
  - **Components:** `KCard` 
  - **Breaking:** N0
  - **Impacts a11y:** No
  - **Guidance:**

[705]: https://github.com/learningequality/kolibri-design-system/pull/705

- [719]
  - **Description:** Removes KResponsiveWindowMixin.
  - **Products impact:** removed API.
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/679.
  - **Components:** KResponsiveWindowMixin.
  - **Breaking:** yes.
  - **Impacts a11y:** no.
  - **Guidance:** Replace any use of KResponsiveWindowMixin with the new composable useKResponsiveWindow.

[719]: https://github.com/learningequality/kolibri-design-system/pull/719

- [#718]
  - **Description:** This pull request resolves failing `KDateCalendar` component tests that occurred on the last day of the month in open pull requests by setting dates manually in the tests. Additionally, the `KDateCalendar` is updated to show the month of the `lastAllowedDate` property.
  - **Products impact:** none
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/713
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** -
  - **Guidance:** -

[#718]: https://github.com/learningequality/kolibri-design-system/pull/718

- [#687]
  - **Description:** Adds logic that inserts ARIA live assertive and polite regions to an application's document body during KDS initialization and documents this on the new "Installation" page. Relatedly adds `useKLiveRegion` composable with public methods for updating the live regions with assertive and polite messages. 
  - **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/668
  - **Components:** `useKLiveRegion`
  - **Breaking:** No
  - **Impacts a11y:** Yes. It will fix several places utilizing live regions that don't work in our applications at all. Furthemore, it follows the recommended practices that will fix major a11y issues with live regions we're having.
  - **Guidance:** Find all polite and live regions (or roles) in an application. Remove them and instead use `useKLiveRegion.sendPoliteMessage` and `useKLiveRegion.sendAssertiveMessage` to update the live regions that KDS inserted to document body during installation.

[#687]: https://github.com/learningequality/kolibri-design-system/pull/687

- [#688]
  - **Description:**  Update`KCard` styling 
  - **Products impact:**  Card updates 
  - **Addresses:** 
  - **Components:** `KCard` 
  - **Breaking:** N0
  - **Impacts a11y:** No
  - **Guidance:**

[#688]: https://github.com/learningequality/kolibri-design-system/pull/688

- [#707]
  - **Description:** Card Validations
  - **Products impact:**  
  - **Addresses:** [#695](https://github.com/learningequality/kolibri-design-system/issues/695)
  - **Components:** `KCard`
  - **Breaking:** No
  - **Impacts a11y:**  No
  - **Guidance:**

[#707]: https://github.com/learningequality/kolibri-design-system/pull/707

- [#706]
  - **Description:** Add new alignment options to `KCard` 
  - **Products impact:**  new alignment 
  - **Addresses:** [#701](https://github.com/learningequality/kolibri-design-system/issues/701)
  - **Components:** `KCard` 
  - **Breaking:** N0
  - **Impacts a11y:** No
  - **Guidance:**

[#706]: https://github.com/learningequality/kolibri-design-system/pull/706


- [#709]
  - **Description:**  Update spaces to the latest design`KCard` 
  - **Products impact:**  Card updates 
  - **Addresses:** [#704](https://github.com/learningequality/kolibri-design-system/issues/704)
  - **Components:** `KCard` 
  - **Breaking:** N0
  - **Impacts a11y:** No
  - **Guidance:**

[#709]: https://github.com/learningequality/kolibri-design-system/pull/709

- [#625]
  - **Description:** Initial implementation of `KCard` component
  - **Products impact:** New Component
  - **Addresses:** [#530](https://github.com/learningequality/kolibri-design-system/issues/530)
  - **Components:** KCard
  - **Breaking:** No
  - **Impacts a11y:**  Yes
  - **Guidance:**

[#625]: https://github.com/learningequality/kolibri-design-system/pull/625

- [#678]
  - **Description:** Add `previewUnavailable` icon
  - **Products impact:** new icon
  - **Addresses:** Support of migrating Studio icons from Vuetify to KDS
  - **Components:** `KIcon`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#678]: https://github.com/learningequality/kolibri-design-system/pull/678

- [#666]
  - **Description:** Update `KImg`'s placeholder and letterbox area background color to a lighter shade of grey, `v_50`.
  - **Products impact:** UI appearance update
  - **Addresses:** -
  - **Components:** `KImg`, `KCard`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#666]: https://github.com/learningequality/kolibri-design-system/pull/666

- [#652]
  - **Description:** KTextTruncator drops support for Internet Explorer 11
  - **Products impact:** browser support update
  - **Addresses:**  https://github.com/learningequality/kolibri-design-system/issues/643
  - **Components:** KTextTruncator
  - **Breaking:** yes
  - **Impacts a11y:** -
  - **Guidance:** To be used in newer versions of products that don't need to support IE11 (Kolibri 0.17 and higher)

[#652]: https://github.com/learningequality/kolibri-design-system/pull/652/

- [#590]
  - **Description:** Modal now shrinks when the content has a smaller height.
  - **Products impact:** bugfix.
  - **Addresses:**  https://github.com/learningequality/kolibri-design-system/issues/570
  - **Components:** KModal.
  - **Breaking:** no
  - **Impacts a11y:** -
  - **Guidance:** Consumers need to ensure the modal height is still working correctly.

[#590]: https://github.com/learningequality/kolibri-design-system/pull/590/

- [#549]
  - **Description:** Internal refactor of `KSelect` as part of moving away from Keen UI where related files were renamed and some functionality that wasn't exposed for public use was removed.
  - **Products impact:** none
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** -
  - **Guidance:** Thorough QA of places that use `KSelect` is recommended due to the large scope of refactor.

[#549]: https://github.com/learningequality/kolibri-design-system/pull/549

- [#615]
  - **Description:** Removes KImg props related to dimensions: `height`, `width`, `maxHeight`, `minHeight`, `maxWidth`, `minWidth`
  - **Products impact:** updated API
  - **Addresses:** -
  - **Components:** KImg
  - **Breaking:** yes
  - **Impacts a11y:** no
  - **Guidance:** Use native style, for example replace `<KImg width="100%" maxWidth="500px" />` by `<KImg :style="{ width: '100%', maxWidth: '500px' }" />`.

[#615]: https://github.com/learningequality/kolibri-design-system/pull/615

- [#615]
  - **Description:** Renames KImg internal classes
  - **Products impact:** none
  - **Addresses:** -
  - **Components:** KImg
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#615]: https://github.com/learningequality/kolibri-design-system/pull/615

## Version 4.x.x (`release-v4` branch)


- [#737]
  - **Description:** Bump KDS version to 4.4.1.
  - **Products impact:** -.
  - **Addresses:** -.
  - **Components:** -.
  - **Breaking:** -.
  - **Impacts a11y:** -.
  - **Guidance:** -.

[#737]: https://github.com/learningequality/kolibri-design-system/pull/737

- [#717]
  - **Description:** Fix ResizeOserver errors when KListWithOverflow resize very quickly.
  - **Products impact:** bugfix.
  - **Addresses:** Sentry error.
  - **Components:** KListWithOverflow.
  - **Breaking:** no.
  - **Impacts a11y:** no.
  - **Guidance:** -.

[#717]: https://github.com/learningequality/kolibri-design-system/pull/717

- [#680]
  - **Description:** Adds boolean `appendToRoot` prop to teleport the modal to the body element if true.
  - **Products impact:** new API.
  - **Addresses:** https://github.com/learningequality/kolibri/issues/12447.
  - **Components:** KModal.
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** 

- [#680]
  - **Description:** Fixes the calculation of overflowed items when changes in the size of the list item slots occur.
  - **Products impact:** bugfix.
  - **Addresses:** https://github.com/learningequality/kolibri/issues/12447.
  - **Components:** KListWithOverflow.
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** 

[#680]: https://github.com/learningequality/kolibri-design-system/pull/680

- [#673]
  - **Description:** Remove white space below Ktabs
  - **Products impact:** bugfix.
  - **Addresses:** https://github.com/learningequality/kolibri/issues/12297.
  - **Components:** KTabsList, KTabs, KTabsPanel.
  - **Breaking:** no
  - **Impacts a11y:**no
  - **Guidance:** .

[#673]: https://github.com/learningequality/kolibri-design-system/pull/673

- [#629]
  - **Description:** Improves the contrast for highlighted text, noted in KTextbox
  - **Products impact:** None
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/629
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#629]: https://github.com/learningequality/kolibri-design-system/pull/629

- [#648]
  - **Description:** Updates KSelect to include guiding documentation for the events it emits
  - **Products impact:** None
  - **Addresses:** -
  - **Components:** KSelect
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#648]: https://github.com/learningequality/kolibri-design-system/pull/648

- [#653]
  - **Description:** Header "Changelog" text and link updated
  - **Products impact:** -
  - **Addresses:** Replace the "Changelog" link with the "Release notes" link on the KDS documentation website #644
  - **Components:** -
  - **Breaking:** No
  - **Impacts a11y:** No
  - **Guidance:** -

[#653]: https://github.com/learningequality/kolibri-design-system/pull/653

- [#630]
  - **Description:** Updates the svg for the pointsLeafActive, and removes the pointsLeafInactive (which is not used anywhere in Kolibri)
  - **Products impact:** Kolibri (branding)
  - **Addresses:** -
  - **Components:** `KIcon` and documentation
  - **Breaking:** No
  - **Impacts a11y:** No
  - **Guidance:** -

[#630]: https://github.com/learningequality/kolibri-design-system/pull/630

- [#627]
  - **Description:** Fix missing anchor tag and heading case in `KTextbox` documentation
  - **Products impact:** None
  - **Addresses:** -
  - **Components:** `KTextbox` documentation
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#627]: https://github.com/learningequality/kolibri-design-system/pull/627

- [#604]
  - **Description:** Add more examples to `KTextbox` documentation
  - **Products impact:** None
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/596
  - **Components:** `KTextbox` documentation
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#604]: https://github.com/learningequality/kolibri-design-system/pull/604

- [#572]
  - **Description:** Add `aria-checked` property to KCheckbox's `<input>` element
  - **Products impact:** -
  - **Addresses:** The `aria-checked` property being set properly improves a11y.
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** yes
  - **Guidance:** -

[#572]: https://github.com/learningequality/kolibri-design-system/pull/572

- [616]
  - **Description:** Fixes `KModal` not showing content after the initial load
  - **Products impact:** bugfix
  - **Addresses:** https://github.com/learningequality/kolibri/pull/11911#issuecomment-2040030433
  - **Components:** `KModal`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[616]: https://github.com/learningequality/kolibri-design-system/pull/616

- [616]
  - **Description:** Fixes `KSelect`'s missing padding
  - **Products impact:** bugfix
  - **Addresses:** https://github.com/learningequality/kolibri/pull/11911#issuecomment-2040030433
  - **Components:** `KSelect`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[616]: https://github.com/learningequality/kolibri-design-system/pull/616

- [#591]
  - **Description:** Added a clearable prop to KTextbox
  - **Products impact:** -
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/584
  - **Components:** `KTextbox`
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#591]: https://github.com/learningequality/kolibri-design-system/pull/591

- [#582]
  - **Description:** Upgrade popper.js from 1.14.6 to 1.16.1
  - **Products impact:** -
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#582]: https://github.com/learningequality/kolibri-design-system/pull/582

- [#599]
  - **Description:** Upgrade express from 4.18.2 to 4.19.2
  - **Products impact:** -
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#599]: https://github.com/learningequality/kolibri-design-system/pull/599

- [#587]
  - **Description:** Rebrands icons in buttons and links
  - **Products impact:** UI
  - **Addresses:** -
  - **Components:** `KButton`, `KRouterLink`, `KExternalLink`
  - **Breaking:** no
  - **Impacts a11y:** -
  - **Guidance:** -

[#587]: https://github.com/learningequality/kolibri-design-system/pull/587

- [#561]
  - **Description:** Update KLogo for new branding guidelines
  - **Products impact:** Enables general use of KLogo for all frontend logo usage. Changes props API for square logo presentation.
  - **Addresses:** Updates logo to new logo, adds all permissible alternates, adds animated form.
  - **Components:** KLogo
  - **Breaking:** Yes
  - **Impacts a11y:** No
  - **Guidance:** Rendering the Kolibri logo can now be done using the KLogo component, as well as the loading animation.

[#561]: https://github.com/learningequality/kolibri-design-system/pull/561

- [#580]
  - **Description:** Remove use of KResponsiveWindowMixin internally
  - **Products impact:** - none
  - **Addresses:** -
  - **Components:** KDateRange, KModal, KPageContainer, KGrid, KFixedGrid, KGridItem, KFixedGridItem
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** Updates all components to use the useKResponsiveWindow composable

[#580]: https://github.com/learningequality/kolibri-design-system/pull/580

- [#415]
  - **Description:** Upgrade purecss from 0.6.2 to 2.2.0
  - **Products impact:** Updates for base styling for all elements
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#415]: https://github.com/learningequality/kolibri-design-system/pull/415

- [#569]
  - **Description:** Upgrade actions/setup-node from 3 to 4
  - **Products impact:** Dependencies
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#569]: https://github.com/learningequality/kolibri-design-system/pull/569

- [#576]
  - **Description:** Upgrade follow-redirects from 1.15.4 to 1.15.6
  - **Products impact:** Dependencies
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#576]: https://github.com/learningequality/kolibri-design-system/pull/576

- [#553]
  - **Description:** Upgrade ip from 1.1.5 to 1.1.9
  - **Products impact:** Dependencies
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#553]: https://github.com/learningequality/kolibri-design-system/pull/553

- [#559]
  - **Description:** Upgrade lodash from 4.17.15 to 4.17.21
  - **Products impact:** Dependencies
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#559]: https://github.com/learningequality/kolibri-design-system/pull/559

- [#555]
  - **Description:** Add action to notify us on Slack about GH issues comments from contributors community
  - **Products impact:** none
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#555]: https://github.com/learningequality/kolibri-design-system/pull/555

- [#565]
  - **Description:** Revert adding engines
  - **Products impact:** Dependencies
  - **Addresses:** KDS not being installable by consumers that don't use Node 10
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#565]: https://github.com/learningequality/kolibri-design-system/pull/565

- [#560]
  - **Description:** Configure dependabot to run on Wednesday
  - **Products impact:** -
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#560]: https://github.com/learningequality/kolibri-design-system/pull/560

- [#558]
  - **Description:** Move `useKResponsiveWindow` from `/lib` to `/lib/composables`
  - **Products impact:** Location update
  - **Addresses:** -
  - **Components:** `useKResponsiveWindow`
  - **Breaking:** yes
  - **Impacts a11y:** -
  - **Guidance:** Update `import useKResponsiveWindow from 'kolibri-design-system/lib/useKResponsiveWindow';` from `import useKResponsiveWindow from 'kolibri-design-system/lib/composables/useKResponsiveWindow';`

[#558]: https://github.com/learningequality/kolibri-design-system/pull/558

- [#558]
  - **Description:** Remove deprecated `KResponsiveWindow's` mixin documentation page in favor of a new `useKResponsiveWindow` page
  - **Products impact:** none
  - **Addresses:** -
  - **Components:** `KResponsiveWindow`
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#558]: https://github.com/learningequality/kolibri-design-system/pull/558

- [#558]
  - **Description:** Adds engines and browserlist to package.json. Pins dependencies to exact version.
  - **Products impact:** Dependencies
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#558]: https://github.com/learningequality/kolibri-design-system/pull/558

- [#558]
  - **Description:** Internal maintenance tasks: extract common logic to utils, move private composables to `/lib/composables` and indicate that they are private by `_` prefix in their filename. dev docs updates.
  - **Products impact:** none
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#558]: https://github.com/learningequality/kolibri-design-system/pull/558

- [#551]
  - **Description:** Updates `brand` colors, `palette` colors, and `token`s.
    - Breaking changes:
      - Removed `palette` colors: `purple`, `deeppurple`, `indigo`, `brown`, `cyan`, `teal`, `lightgreen`, `lime`, `amber`, `deeporange`, `bluegrey`
      - Removed `palette.grey` scales: `v_300`, `v_500`, `v_700`, `v_900`
      - Removed `brand` and `palette` scales (except `palette.grey`): `v_50`,`v_100`, `v_300`, `v_500`, `v_700`, `v_900`
      - Removed content-related tokens: `exercise`, `video`, `audio`, `document`, `html5`, `slideshow`
      - Removed other tokens: `appBarFullscreen`, `appBarFullscreenDark`, `linkDark`
   - Other changes:
      - Some existing `palette` colors look differently
      - Adds new tokens and palette
      - Global styles: `<body>` background color changed from `grey.v_100` to lighter `grey.v_50`
  - **Products impact:** new API, updated API, deleted API
  - **Addresses:** - https://github.com/learningequality/kolibri-design-system/issues/545
  - **Components:** -
  - **Breaking:** - yes
  - **Impacts a11y:** - no
  - **Guidance:** - Address all breaking changes by searching for removed palette colors, scales, and tokens. Study the updated "Colors" KDS documentation page and replace them by relevant colors/scales/tokens. Also search for any hardcoded hex,rgb(a),hsl(a), or named colors (such as 'white') and theme them instead. Visually check places that use existing palette and adjust scale (you may need to increase it as many colors are lighter). You may also see if there are any minor useful updates to in regards to new tokens (e.g. replacing a `palette` color with a new `token` that describes function of the color better). If you use `generateGlobalStyles` that generates background color for `<body>` and use grey.`v_100` in some components to match the background color, you may need to update it to `grey.v_50`.

[#551]: https://github.com/learningequality/kolibri-design-system/pull/551

- [#531]
  - **Description:** Remove unused `keen-ui` dependency
  - **Products impact:** none
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#531]: https://github.com/learningequality/kolibri-design-system/pull/531

## Version 3.x.x (`release-v3` branch)

- [#583]
  - **Description:** KDropdownMenu menu support to show context menus with `isContextMenu` prop.
  - **Products impact:** new API.
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/571, https://github.com/learningequality/studio/issues/4403.
  - **Components:** KDropdownMenu.
  - **Breaking:** no.
  - **Impacts a11y:** no.
  - **Guidance:** -.

- [#583]
  - **Description:** New `useKContextMenu` private composable
  - **Products impact:** - .
  - **Addresses:** - .
  - **Components:** - .
  - **Breaking:** - .
  - **Impacts a11y:** - .
  - **Guidance:** -.

- [#583]
  - **Description:** Expose the event object as second argument on KDropdownMenu's select event.
  - **Products impact:** updated API.
  - **Addresses:** - .
  - **Components:** KDropdownMenu.
  - **Breaking:** no.
  - **Impacts a11y:** no.
  - **Guidance:** -.

- [#583]
  - **Description:** KDropdownMenu menu support to show a header slot.
  - **Products impact:** new API.
  - **Addresses:** - .
  - **Components:** KDropdownMenu.
  - **Breaking:** no.
  - **Impacts a11y:** no.
  - **Guidance:** -.

[#583]: https://github.com/learningequality/kolibri-design-system/pull/583

- [#611]
  - **Description:** Adds a new `maxWidth` prop
  -  **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/595
  - **Components:** KTooltip
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#611]: https://github.com/learningequality/kolibri-design-system/pull/611

- [#612]
  - **Description:** Prevent KListWithOverflow hidden elements from taking up space on the screen.
  - **Products impact:** bugfix.
  - **Addresses:** - .
  - **Components:** KListWithOverflow.
  - **Breaking:** no.
  - **Impacts a11y:** no.
  - **Guidance:** - .

- [#612]
  - **Description:** Scope the styles of the KListWithOverflow component.
  - **Products impact:** bugfix.
  - **Addresses:** - .
  - **Components:** KListWithOverflow.
  - **Breaking:** no.
  - **Impacts a11y:** no.
  - **Guidance:** - .

[#612]: https://github.com/learningequality/kolibri-design-system/pull/612

- [##603]
  - **Description:** Adds thumps down icon that is needed in Studio for search recomendation work.
  - **Products impact:** New Icon
  - **Addresses:** [#4450](https://github.com/learningequality/studio/issues/4450)
  - **Components:** N/A
  - **Breaking:** No
  - **Impacts a11y:**  No
  - **Guidance:**
[#603]: https://github.com/learningequality/kolibri-design-system/pull/603

- [#605]
  - **Description:** Adds the `dropup` icon
  - **Products impact:** New icon
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/594
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:**  -
  - **Guidance:** -

[#605]: https://github.com/learningequality/kolibri-design-system/pull/605

- [#586]
  - **Description:** Adds a new prop `constrainToScrollParent ` to `KDropdownMenu` to allow overriding of its popover flipping behavior.
  - **Products impact:** Bugfix
  - **Addresses:** [#432](https://github.com/learningequality/kolibri-design-system/issues/432)
  - **Components:** KDropdownMenu
  - **Breaking:** no
  - **Impacts a11y:**  no
  - **Guidance:** Use the `constrainToScrollParent` prop to override the default popover flipping behavior of the `KDropdownMenu` component prop where necessary.

[#586]: https://github.com/learningequality/kolibri-design-system/pull/586

- [#573]
  - **Description:** More precise calculation of list with in KListWithOverflow.
  - **Products impact:** bugfix.
  - **Addresses:** -.
  - **Components:** KListWithOverflow.
  - **Breaking:** no.
  - **Impacts a11y:** no.
  - **Guidance:** -.

[#573]: https://github.com/learningequality/kolibri-design-system/pull/573

- [#552]
  - **Description:** New `KListWithOverflow` component.
  - **Products impact:** new API.
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/556, https://github.com/learningequality/studio/issues/3423, https://github.com/learningequality/kolibri/issues/11923.
  - **Components:** KListWithOverflow.
  - **Breaking:** no.
  - **Impacts a11y:** no.
  - **Guidance:** -.

[#552]: https://github.com/learningequality/kolibri-design-system/pull/552

- [#552]
  - **Description:** New `useKResponsiveElement` private composable, `KResponsiveElementMixin` translated to this composable.
  - **Products impact:** -.
  - **Addresses:** -.
  - **Components:** -.
  - **Breaking:** no.
  - **Impacts a11y:** no.
  - **Guidance:** -.

[#552]: https://github.com/learningequality/kolibri-design-system/pull/552

- [#538]
  - **Description:** Complete KImg implementation
  - **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/368
  - **Components:** KImg
  - **Breaking:** no
  - **Impacts a11y:** yes
  - **Guidance:** One of the benefits of using KImg is that it throws a11y related warnings

[#538]: https://github.com/learningequality/kolibri-design-system/pull/538

- [#557]
  - **Description:** Updates development documentation in regards to linking products development servers to local KDS
  - **Products impact:** -
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#557]: https://github.com/learningequality/kolibri-design-system/pull/557

- [#542]
  - **Description:** Adds a new `sort` icon
  - **Products impact:** New icon
  - **Addresses:** https://github.com/learningequality/studio/issues/4426
  - **Components:** -
  - **Breaking:** no
  - **Impacts a11y:** -
  - **Guidance:** -

[#542]: https://github.com/learningequality/kolibri-design-system/pull/542

- [#542]
  - **Description:** Updates documentation for icons to the new process, adds clear guidelines
  - **Products impact:** None
  - **Addresses:** -
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#542]: (https://github.com/learningequality/kolibri-design-system/pull/542

- [#543]
  - **Description:** Added new Icons to support Studio Usability Enhancements
  - **Products impact:** new API
  - **Addresses:** https://github.com/learningequality/studio/issues/3425
  - **Components:** KIcon
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** Consumers can now access these icons: activities, attribution, audience, categories, levels, rename

[#543]: https://github.com/learningequality/kolibri-design-system/pull/543

- [#541]
  - **Description:** Add a GitHub Actions workflow to publish a new release on npm
  - **Products impact:** none
  - **Addresses:** https://github.com/learningequality/kolibri-design-system/issues/532
  - **Components:** -
  - **Breaking:** -
  - **Impacts a11y:** -
  - **Guidance:** -

[#541]: https://github.com/learningequality/kolibri-design-system/pull/541

- [#535]
  - **Description:** Added text prop in the KToolTip component as an alternative to the slot
  - **Products impact:** Choose from - bugfix
  - **Addresses:** #221
  - **Components:** KToolTip
  - **Breaking:** no
  - **Impacts a11y:** no
  - **Guidance:** -

[#535]: https://github.com/learningequality/kolibri-design-system/pull/535

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
