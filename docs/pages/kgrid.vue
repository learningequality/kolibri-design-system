<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Grid layout with a dynamic number of columns based on the current window width.
      </p>
      <p>
        The grid will have:
      </p>
      <ul>
        <li>4 columns for small windows (<code>width &lt; 840px</code>)</li>
        <li>8 columns for medium windows (<code>840px &lt;= width &lt; 960px</code>)</li>
        <li>12 columns for large windows (<code>960px &lt;= width</code>)</li>
      </ul>
      <p>
        Use with <DocsLibraryLink component="KGridItem" />, which accept "layout objects" as props. These layout objects can define values for <code>span</code>, <code>alignment</code>, or both.
      </p>
      <p>
        For a grid with a fixed number of columns, see <DocsLibraryLink component="KFixedGrid" /> and <DocsLibraryLink component="KFixedGridItem" />.
      </p>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
