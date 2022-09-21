<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Once added to a component it provides the following reactive component's size information:
      </p>

      <dl>
        <dt><code>elementHeight</code></dt>
        <dd>The component's element <code>$el</code> height in pixels (integer)</dd>

        <dt><code>elementWidth</code></dt>
        <dd>The component's element <code>$el</code> width in pixels  (integer)</dd>
      </dl>

    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <p>When compared to <DocsLibraryLink component="KResponsiveWindow" />, <code>KResponsiveElement</code> can be suitable when it's the available space determined by the layout which should influence reponsive behavior of a child component rather than relying on the overall window size.</p>

      <h3>As mixin</h3>
      <p>It can be imported as <code>KResponsiveElementMixin</code>. As with any other mixin, you need to register it in the script part of a component file:</p>

      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="javascript">
        import KResponsiveElementMixin from 'kolibri-design-system/lib/KResponsiveElementMixin';

        export default {
          mixins: [KResponsiveElementMixin]
        };
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>
        Provided reactive properties can then be accessed on the component instance via <code>this</code>.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Guidelines" anchor="#guidelines">
      <ul>
        <li>
          Due to performance issues (<DocsExternalLink
            text="Kolibri #8124"
            href="https://github.com/learningequality/kolibri/issues/8124"
          />), using <code>KResponsiveElement</code> in larger numbers on one page is currently discouraged
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          See <DocsLibraryLink component="KResponsiveWindow" /> if you need the window's size reactive information rather than that of a component
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
