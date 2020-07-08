<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Loading indicators are used to convey to the user that they will need to wait some time for a software- or hardware-related operation to complete. They can be used to convey a range of ongoing processes, including network, disk and CPU operations.
      </p>
      <p>
        Generally, loading indicators should be used if the wait period is longer than a second.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Linear loaders" anchor="#linear loaders">
      <p>
        Linear loaders illustrate progress by moving an indicator along a horizontal track. There are two types of linear loaders:
      </p>

      <ul>
        <li>Determinate: these loaders show a visual indicator of detectable and measurable progress percentage</li>
        <DocsShow>
          <KLinearLoader
            :progress="75"
            type="determinate"
            class="loader"
            style="width: 400px; margin: 24px"
          />
        </DocsShow>
        <li>Indeterminate: these loaders show an ongoing process with an unspecified or undetectable percentage completion</li>
        <DocsShow>
          <KLinearLoader
            :progress="75"
            type="indeterminate"
            class="loader"
            style="width: 400px; margin: 24px"
          />
        </DocsShow>
      </ul>

      <p>
        <strong>Usages</strong>
      </p>
      <ul>
        <li>Append to appbars to load initial page content</li>
        <li>Append to data tables to load table content</li>
        <li>Use as progress bars to represent task percentage progress</li>
      </ul>

      <p>
        <strong>Basic anatomy</strong>
      </p>
      <ul>
        <li>Progress track uses palette.grey.v_200</li>
        <li>Progress indicator uses brand.secondary.v_100</li>
        <li>Progress track height is 4px</li>
        <li>Include a 2px corner radius</li>
        <li>Remove the corner radius when appended to other components, such as appbars or data tables</li>
      </ul>

      <p>
        <strong>Placement</strong>
      </p>
      <ul>
        <li>Can be attached to existing components such as appbars or table rows</li>
        <li>As a progress bar, should be near task-related metadata</li>
      </ul>

    </DocsPageSection>

    <DocsPageSection title="Circular loaders" anchor="#circular loaders">
      <DocsShow>
        <KCircularLoader style="margin: 24px" />
      </DocsShow>
      <p>
        Circular loaders illustrate progress by moving an indicator along a circular track.
      </p>

      <p>
        <strong>Usages</strong>
      </p>
      <ul>
        <li>Load resources in content renderers</li>
        <li>Indicate the presence of a working background task</li>
        <li>Load large blocks of resource related information (e.g. exercise attempts, metadata)</li>
      </ul>

      <p>
        <strong>Basic anatomy</strong>
      </p>
      <ul>
        <li>Dimensions do not exceed 48x48px</li>
        <li>Progress indicator uses brand.secondary.v_100</li>
        <li>Track width is 4px</li>
      </ul>

      <p>
        <strong>Placement</strong>
      </p>
      <ul>
        <li>When loading new content, center the loader</li>
        <li>The loader can routinely appear and disappear when indicating a background task</li>
        <li>Do not break the flow of information or content by placing between items (e.g. list items, content cards, table rows)</li>
      </ul>

    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
