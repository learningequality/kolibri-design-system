<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>This is a linear loader:</p>
      <DocsShow>
        <KLinearLoader
          :progress="75"
          type="determinate"
          class="loader"
          style="width: 400px; margin: 24px"
        />
      </DocsShow>

      See the <DocsInternalLink href="/loaders" text="loaders page" /> for more information.

    </DocsPageSection>

  </DocsPageTemplate>

</template>
