<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
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


      See the <DocsInternalLink href="/loaders" text="loaders page" /> for more information.

    </DocsPageSection>

    <DocsPageSection title="Specifications" anchor="#specifications">

      <ul>
        <li>Progress track uses palette.grey.v_100</li>
        <li>Progress indicator uses palette.grey.v_800</li>
        <li>Progress track height is 4px</li>
        <li>Include a 2px corner radius</li>
        <li>Remove the corner radius when appended to other components, such as appbars or data tables</li>
      </ul>

    </DocsPageSection>

    <DocsPageSection title="Placement" anchor="#placement">

      <ul>
        <li>Can be attached to existing components such as appbars or table rows</li>
        <li>As a progress bar, should be near task-related metadata</li>
      </ul>

    </DocsPageSection>

  </DocsPageTemplate>

</template>
