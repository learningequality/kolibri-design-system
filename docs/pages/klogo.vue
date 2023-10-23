<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>Shows Kolibri logo.</p>

      <DocsShow>
        <KLogo
          altText="Kolibri Logo"
          :height="150"
          width="100%"
          :maxWidth="150"
        />
      </DocsShow>
      <DocsShowCode language="html">
        <KLogo
          altText="Kolibri logo"
          :height="150"
          width="100%"
          :maxWidth="150"
        />
      </DocsShowCode>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <h3>Alternative text</h3>

      <p>Alternative text (<code>altText</code>) is required for the logo image. When creating it, consider the following:</p>
      <ul>
        <li>If the logo is used as a flat image, you can use the string "Kolibri logo"</li>
        <li>If the the logo is used as a link, then the alternative text needs to give the context where the link is leading (for example "Go to home page", or similar)</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <code>KLogo</code> is derived from <DocsLibraryLink component="KImg" /> and provides a subset of <code>KImg</code>'s API.
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>
