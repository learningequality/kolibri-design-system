<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">

      <p>
        For use within <DocsLibraryLink component="KGrid" />.
      </p>
      <p>
        Layout input objects can define values for <code>span</code>, <code>alignment</code>, or both. They can define different layouts for different screen sizes which is very convenient for quickly building responsive layouts.
      </p>
      <p>
        If no span is defined for a particular grid item, it span the full width of the grid.
      </p>
      <p>
        If no alignment is defined for a particular layout, the item's contents will be left-aligned.
      </p>

    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
