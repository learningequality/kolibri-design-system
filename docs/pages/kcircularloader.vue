<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Circular loaders illustrate progress by moving an indicator along a circular track.
      </p>
      <DocsShow>
        <KCircularLoader style="margin: 24px" />
      </DocsShow>

      See the <DocsInternalLink href="/loaders" text="loaders page" /> for more information.

    </DocsPageSection>

    <DocsPageSection title="Specifications" anchor="#specifications">
      <ul>
        <li>Dimensions do not exceed 48x48px</li>
        <li>Progress indicator uses palette.grey.v_800</li>
        <li>Track width is 4px</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Placement" anchor="#placement">
      <ul>
        <li>When loading new content, center the loader</li>
        <li>The loader can routinely appear and disappear when indicating a background task</li>
        <li>Do not break the flow of information or content by placing between items (e.g. list items, content cards, table rows)</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <code>KCircularLoader</code>'s <code>minVisibleTime</code> isn't sufficient when switching between more components, for example as part of <code>v-if/v-else</code> blocks. In such situations, <DocsInternalLink text="useKShow" href="/usekshow" /> may come handy.
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
