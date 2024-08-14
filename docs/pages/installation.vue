<template>

  <DocsPageTemplate>

    <DocsPageSection title="1. Install the plugin" anchor="#install-plugin">
      <p>Kolibri Design System (KDS) is a Vue plugin. Register it in your application alongside scripts that are needed for its full functioning:</p>

      <!-- eslint-disable -->
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
        <li>Installs <code>$themeBrand</code>, <code>$themeTokens</code> <code>$themePalette</code>, and <code>$computedClass</code> helpers on all Vue instances (see <DocsInternalLink href="/colors/#usage" text="Colors" />).</li>
        <li>Provides <code>$coreOutline</code>, <code>$inputModality</code>, <code>$mediaType</code>, and <code>$isPrint</code> computed properties as well as <code>$print</code> method to all Vue instances.</li>
        <li>Globally registers all KDS Vue components.</li>
        <li>Inserts assertive and polite ARIA live regions to your application's document body (see <DocsInternalLink href="/usekliveregion" text="useKLiveRegion" />).</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="2. Initialize theme" anchor="#initialize-theme">
      <p>
        Until this section is better documented, refer to <DocsExternalLink href="https://github.com/learningequality/kolibri/blob/develop/kolibri/core/assets/src/styles/initializeTheme.js" text="Kolibri's initializeTheme.js" />.
      </p>
    </DocsPageSection>

  </DocsPageTemplate>

</template>

