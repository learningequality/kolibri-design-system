<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>A part of a tabbed interface that displays content associated with the active tab. It is meant to be used together with <DocsLibraryLink component="KTabsList" />. See the <DocsInternalLink text="Tabs page" href="/tabs" /> for guidance on all tab-related components, how they compare, as well as on how to use them together with the router.</p>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsInternalLink text="Tabs page" href="/tabs" /> has an overview and usage guidance for all tab-related components
        </li>
        <li><DocsLibraryLink component="KTabsList" /> is a component to be used together with <code>KTabsPanel</code></li>
        <li>
          <DocsLibraryLink component="KTabs" /> is an alternative way to implement tabs
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
