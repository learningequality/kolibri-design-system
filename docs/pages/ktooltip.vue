<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      Displays a tooltip when a user hovers over a specific element.
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <h3>Use of <code>ref</code> and <code>reference</code></h3>

      <KTooltip
        reference="myButton"
        :refs="$refs"
      >
        Click me to learn more!
      </KTooltip>
      <button ref="myButton">Learn More</button>

      <DocsShowCode language="html">
        <KTooltip
          reference="myButton"
          :refs="$refs"
        >
          Click me to learn more!
        </KTooltip>
        <button ref="myButton">Learn More</button>
      </DocsShowCode>
      <p>
        The <code>ref</code> attribute creates a reference to the <code>myButton</code> element, and
        the <code>reference</code> prop associates the tooltip with this reference.
      </p>

      <h3>Disabled state</h3>

      <KTooltip
        reference="disableButton"
        :refs="$refs"
        disabled
      >
        This tooltip is disabled
      </KTooltip>
      <button ref="disableButton">Learn More</button>

      <DocsShowCode language="html">
        <KTooltip
          reference="disableButton"
          :refs="$refs"
          disabled
        >
          This tooltip is disabled
        </KTooltip>
        <button ref="disableButton">Learn More</button>
      </DocsShowCode>
      <p>The <code>disabled</code> prop can be used to disable the tooltip.</p>

      <h3>Supported placements</h3>
      <div style="display: flex; flex-wrap: wrap">
        <div style="margin: 10px">
          <KTooltip
            reference="topButton"
            :refs="$refs"
            placement="top"
          >
            Top placement
          </KTooltip>
          <button ref="topButton">Top</button>
        </div>
      </div>
      <DocsShowCode language="html">
        <KTooltip
          reference="topButton"
          :refs="$refs"
          placement="top"
        >
          Top placement
        </KTooltip>
        <button ref="topButton">Top</button>
      </DocsShowCode>
      <p>The <code>placement</code> prop can be used to specify the placement of the tooltip.</p>

      <h3>Maximum width</h3>
      <KTooltip
        reference="maxWidthButton"
        :refs="$refs"
        maxWidth="200px"
        :appearanceOverrides="{ zIndex: 100 }"
      >
        This tooltip has a max width of 200px
      </KTooltip>
      <button ref="maxWidthButton">Learn More</button>
      <DocsShowCode language="html">
        <KTooltip
          reference="maxWidthButton"
          :refs="$refs"
          maxWidth="200px"
        >
          This tooltip has a max width of 200px
        </KTooltip>
        <button ref="maxWidthButton">Learn More</button>
      </DocsShowCode>
      <p>The <code>maxWidth</code> prop can be used to limit the tooltip width.</p>

      <h3>Appearance overrides</h3>
      <KTooltip
        reference="appearanceButton"
        :refs="$refs"
        :appearanceOverrides="{ backgroundColor: 'red', zIndex: 100 }"
      >
        This tooltip's background (black by default) has been overridden (red)
      </KTooltip>
      <button ref="appearanceButton">Learn More</button>
      <DocsShowCode language="html">
        <KTooltip
          reference="appearanceButton"
          :refs="$refs"
          :appearanceOverrides="{ backgroundColor: 'red' }"
        >
          This tooltip's background (black by default) has been overridden (red)
        </KTooltip>
        <button ref="appearanceButton">Learn More</button>
      </DocsShowCode>
      <p>
        The <code>appearanceOverrides</code> prop can be used to override the appearance of the
        tooltip.
      </p>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>
