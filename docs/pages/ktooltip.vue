<template>
  <DocsPageTemplate apiDocs >

    <DocsPageSection title="Overview" anchor="#overview">
      The KTooltip component is a Vue component used to display tooltips or hints when a user hovers over a specific element.
      It takes a reference prop to associate with the element that triggers the tooltip, and can display static or dynamic content,
      including translated text.
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
    <h4>Use Of Ref And Reference</h4>

      <KTooltip reference="myButton" :refs="$refs">
        Click me to learn more!
      </KTooltip>
      <button ref="myButton">Learn More</button>

      <DocsShowCode language="html">
        <KTooltip reference="myButton" :refs="$refs">
          Click me to learn more!
        </KTooltip>
        <button ref="myButton">Learn More</button>
      </DocsShowCode>
      <p>In this example, the `ref` attribute is used to create a reference to the `myButton` element, and the `reference` prop is used to associate the tooltip with this reference.</p>

    <h4>Disabled State</h4>

      <KTooltip reference="myButton" :refs="$refs" disabled>
        This tooltip is disabled
      </KTooltip>
      <button ref="myButton">Learn More</button>

      <DocsShowCode language="html">
        <KTooltip reference="myButton" :refs="$refs" disabled>
          This tooltip is disabled
        </KTooltip>
        <button ref="myButton">Learn More</button>
      </DocsShowCode>
     <p>This example demonstrates the disabled state of the KTooltip component. The `disabled` prop is set to `true` to disable the tooltip.</p>

    <h4>Supported Placements</h4>
      <div style="display: flex; flex-wrap: wrap;">
        <div style="margin: 10px;">
          <KTooltip reference="topButton" :refs="$refs" placement="top">
            Top placement
          </KTooltip>
          <button ref="topButton">Top</button>
        </div>
      </div>
      <DocsShowCode language="html">
          <KTooltip reference="topButton" :refs="$refs" placement="top">
            Top placement
          </KTooltip>
          <button ref="topButton">Top</button>
      </DocsShowCode>
      <p>This example demonstrates the supported placements of the KTooltip component. The `placement` prop is used to specify the placement of the tooltip.</p>

    <h4>Max Width</h4>
      <KTooltip reference="maxWidthButton" :refs="$refs" maxWidth="200px">
        This tooltip has a max width of 200px
      </KTooltip>
      <button ref="maxWidthButton">Learn More</button>
      <DocsShowCode language="html">
        <KTooltip reference="maxWidthButton" :refs="$refs" maxWidth="200px">
          This tooltip has a max width of 200px
        </KTooltip>
        <button ref="maxWidthButton">Learn More</button>
      </DocsShowCode>
      <p>This example demonstrates the `maxWidth` prop of the KTooltip component. The tooltip's width will be limited to 200px.</p>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
