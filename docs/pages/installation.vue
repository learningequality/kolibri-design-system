<template>

  <DocsPageTemplate>
    <DocsPageSection
      title="1. Install the plugin"
      anchor="#install-plugin"
    >
      <p>
        Kolibri Design System (KDS) is a Vue plugin. Register it in your application alongside
        scripts that are needed for its full functioning:
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        import KThemePlugin from 'kolibri-design-system/lib/KThemePlugin';
        import trackInputModality from 'kolibri-design-system/lib/styles/trackInputModality';
        import trackMediaType from 'kolibri-design-system/lib/styles/trackMediaType';

        Vue.use(KThemePlugin);

        trackInputModality();
        trackMediaType();
      </DocsShowCode>
      <!-- eslint-enable -->

      This ensures the following:

      <ul>
        <li>
          Makes theme values available in two forms: as reactive objects on every Vue instance
          (<code>$themeBrand</code>,
          <code>$themeTokens</code>, <code>$themePalette</code>, <code>$computedClass</code>) for
          use in JavaScript, and as CSS variables (<code>--tokens-*</code>, <code>--brand-*</code>,
          <code>--palette-*</code>) emitted to a <code>&lt;style&gt;</code> tag with
          <code>#k-theme-css-variables</code> in the document head for use in style blocks. Both
          stay in sync when the theme changes via <code>setBrandColors()</code> or
          <code>setTokenMapping()</code>. See
          <DocsInternalLink
            href="/colors/#usage"
            text="Colors"
          />.
        </li>
        <li>
          Provides <code>$coreOutline</code>, <code>$inputModality</code>, <code>$mediaType</code>,
          and <code>$isPrint</code> computed properties as well as <code>$print</code> method to all
          Vue instances.
        </li>
        <li>Globally registers all KDS Vue components.</li>
        <li>
          Inserts assertive and polite ARIA live regions <code>#k-live-region</code> to an
          application's document body (see
          <DocsInternalLink
            href="/usekliveregion"
            text="useKLiveRegion"
          />).
        </li>
        <li>
          Inserts the overlay container element <code>#k-overlay</code> to an application's document
          body (see <DocsLibraryLink component="KOverlay" /> or search for
          <code>appendToOverlay</code> prop on components).
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection
      title="2. Register global styles"
      anchor="#register-global-styles"
    >
      <p>Import KDS styles in the main application stylesheet:</p>

      <DocsShowCode language="scss">
        @import '~kolibri-design-system/lib/styles/common';
      </DocsShowCode>

      <code>common.scss</code> registers both the global styles, such as those needed for components to
      display correctly, as well as the page background, text color, focus outline, text selection,
      and print styles, and the
      <DocsInternalLink
        href="/styling#helper-styles"
        text="helper styles"
      />. The helper styles are also a public entry point of their own. An application that
      doesn't need the global layer can import
      <code>~kolibri-design-system/lib/styles/helper-styles</code> instead.
    </DocsPageSection>

    <DocsPageSection
      title="3. Initialize theme"
      anchor="#initialize-theme"
    >
      <p>
        Until this section is better documented, refer to
        <DocsExternalLink
          href="https://github.com/learningequality/kolibri/blob/develop/kolibri/core/assets/src/styles/initializeTheme.js"
          text="Kolibri's initializeTheme.js"
        />.
      </p>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
