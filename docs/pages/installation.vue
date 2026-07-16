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
          Installs <code>$themeBrand</code>, <code>$themeTokens</code> <code>$themePalette</code>,
          and <code>$computedClass</code> helpers on all Vue instances (see
          <DocsInternalLink
            href="/colors/#usage"
            text="Colors"
          />).
        </li>
        <li>
          Provides <code>$coreOutline</code>, <code>$inputModality</code>, <code>$mediaType</code>,
          and <code>$isPrint</code> computed properties as well as <code>$print</code> method to all
          Vue instances.
        </li>
        <li>Globally registers all KDS Vue components.</li>
        <li>
          Emits theme values as CSS variables (<code>--theme-*</code>, <code>--brand-*</code>, and
          <code>--palette-*</code>) to a <code>&lt;style&gt;</code> tag
          <code>#k-theme-css-variables</code> in an application's document head so that styles can
          reference them directly, for example <code>var(--theme-primary)</code>. The variables are
          updated whenever the theme changes via <code>setBrandColors()</code> or
          <code>setTokenMapping()</code>.
        </li>
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

      This globally registers styles needed for components to display correctly and also exposes
      <DocsInternalLink
        href="/styling#helper-styles"
        text="helper styles"
      />.
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
