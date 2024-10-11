<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>Provides the following reactive element's size information:</p>

      <dl>
        <dt><code>elementHeight</code></dt>
        <dd>The component's element <code>$el</code> height in pixels (integer)</dd>

        <dt><code>elementWidth</code></dt>
        <dd>The component's element <code>$el</code> width in pixels  (integer)</dd>
      </dl>

      <p>Provided these reactive properties are typically used when the available space is determined by the layout which should influence reponsive behavior of a child component rather than relying on the overall window size.</p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="javascript">
        import useKResponsiveElement from 'kolibri-design-system/lib/composables/useKResponsiveElement';

        export default {
          setup() {
            const {
              elementHeight,
              elementWidth,
            } = useKResponsiveElement();
          }
        };
      </DocsShowCode>
      <!-- eslint-enable -->
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          See <DocsLibraryLink component="useKResponsiveWindow" /> if you need the window's size reactive information rather than that of a component
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
