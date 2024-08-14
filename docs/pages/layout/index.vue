<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>The goal of good layout is legibility - to aid the user in quickly identifying what they need on the page. This is achieved through effective use of white space, graphics, typography, and visual separators.</p>
    </DocsPageSection>

    <DocsPageSection title="Spacing" anchor="#spacing">
      <p>
        To aid with alignment, all UI elements should be spaced out in increments of <code>8px</code>. On smaller screens or in more compact spaces, the increment can be reduced to <code>4px</code>. All margin and padding measurements should be incremented by these units.
      </p>
      <p>
        Similarly, define <DocsExternalLink href="https://material.io/design/layout/spacing-methods.html#spacing" text="keylines" /> in increments of <code>4px</code> or <code>8px</code> when UI elements must be placed outside of the alignment to columns and rows within a grid.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Page containers" anchor="#page-containers">
      <p>
        A page container is a shape used to represent an enclosed area. Page containers can hold various UI elements such as an image, icon, or surface. They can be flexible and accommodate the width or height of the content within, or they can be rigid and fixed in size.
      </p>
      <p>
        Page containers can be implemented using <DocsInternalLink text="KPageContainer" href="/kpagecontainer" code /> which includes responsive internal padding that automatically gets smaller on smaller windows. Containers and their contents can be arranged using <DocsInternalLink text="KGrid" href="/kgrid" code /> or <DocsInternalLink text="KFixedGrid" href="/kfixedgrid" code />, described below.
      </p>
      <p>To reduce visual noise, avoid nesting containers in containers.</p>
      <img src="./containers.png">
      <h3>
        Maximum width
      </h3>
      <p>
        If a page container contains text, set its maximum width to <code>1000px</code> in order to aid readability on larger screens. Extra space should be allocated equally on both sides such that the page container is centered.
      </p>

      <h3>
        Dividers
      </h3>
      <p>
        Use dividers to create visual distinction between sections within a page container. A divider should span the entire width of a container and be <code>1px</code> high with color <DocsInternalLink code text="tokens.fineline" href="/colors#tokens-fineLine" />.
      </p>
      <p>
        Use sparingly and reserve them for situations where white space does not properly separate elements or groups of elements, such as a table, compact list items, or list sections.
      </p>
      <img src="./dividers.png">
      <p>
        Dividers may also have internal page container tabs associated with them, such as in Kolibri Coach reports and planning pages. These may be added to the design system in the future.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Responsiveness" anchor="#responsiveness">
      <p>
        There are three primary breakpoints in the design system that should suffice to design and build responsive layouts in the majority of cases. These are:
      </p>
      <ul>
        <li>Small: <code>width &lt; 600px</code></li>
        <li>Medium: <code>600px &lt; width &lt; 840px</code></li>
        <li>Large: <code>840px &lt; width</code></li>
      </ul>
      <p>
        If more granularity is necessary there are additional breakpoints defined:
      </p>
      <ul>
        <li>Level 0: <code>&lt; 480px</code></li>
        <li>Level 1: <code>&lt; 600px</code></li>
        <li>Level 2: <code>&lt; 840px</code></li>
        <li>Level 3: <code>&lt; 960px</code></li>
        <li>Level 4: <code>&lt; 1280px</code></li>
        <li>Level 5: <code>&lt; 1440px</code></li>
        <li>Level 6: <code>&lt; 1600px</code></li>
        <li>Level 7: <code>&gt;= 1600px</code></li>
      </ul>
      <p>
        Responsive layouts in the design system are built using reactive JavaScript state in Vue components rather than CSS media queries. This is done using <DocsLibraryLink component="useKResponsiveWindow" /> when reactive window's size information is needed or <DocsLibraryLink component="KResponsiveElement" /> when reactive component's size information is needed.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Grid system" anchor="#grid-system">
      <p>
        Grids allow UI components to adapt to screen sizes and orientations and ensure consistent, visually-appealing layouts both within a particular page and across different pages. Our grid system gives designers and engineers a shared vocabulary for communicating about page page layouts and how they adapt to variations in content and screen sizes.
      </p>
      <p>
        The design conventions and Vue components provided by the design system work well together, but both can also be used on their own: Designs specified using the grid system do not need to be implemented using grid components, and grid components can be used even when not explicitly specified in the designs.
      </p>
      <p>
        That said, when designers use grid system conventions and engineers use grid system components we can more easily:
      </p>
      <ul>
        <li>Align elements on the page to aid readability and improve aesthetics</li>
        <li>Design and build responsive behaviors which are robust to changes in content and screen size</li>
      </ul>
      <p>
        Like many aspects of our design system, the grid system draws heavily from Material's <DocsExternalLink href="https://material.io/design/layout/responsive-layout-grid.html#" text="Responsive layout grid" />. Some of the illustrations below are also copied from the Material site.
      </p>
      <h3>Key concepts</h3>
      <p>
        Four key concepts form the basis of our grid system. Explicitly using these concepts in designs will help translate layouts to implementation:
      </p>
      <ol>
        <li><strong>Columns</strong> define boundaries for horizontal alignment</li>
        <li><strong>Gutters</strong> provide padding between columns</li>
        <li><strong>Margins</strong> provide padding outside of columns</li>
        <li><strong>Grid items</strong> hold content in blocks that span some number of columns</li>
      </ol>
      <p>
        <strong>Columns</strong>, <strong>gutters</strong>, and <strong>margins</strong> are defined the same as in Material Design:
      </p>
      <img src="./concepts.png" width="800px">
      <p>
        The example below shows a small window with four columns. The page container on the left is one column wide and the page containers on the right are three columns wide:
      </p>
      <img src="./nested.png">
      <p>
        <strong>Grid items</strong> are a concept specific to Kolibri's grid system, based loosely on the <DocsExternalLink text="same concept from CSS grids" href="https://www.w3schools.com/css/css_grid_item.asp" />. Grid items represent a group of content that should expand and contract together as sizes and contents change. Below, there is a single-column grid item on the far left. Inside each page container on the right, there is a single-column grid item on the left and a two-column grid item on the right:
      </p>
      <img src="./items.png">
      <p>
        For browser compatibility reasons our grid system is based on <code>inline-block</code> and not CSS grids, so the behavior is slightly different and vertical alignment can be somewhat trickier, sometimes requiring nesting grids.
      </p>

      <h3>
        Breakpoints
      </h3>
      <p>
        The total number of columns on the page constrains the maximum width of the grid items. To ensure reasonable behaviors at all screen sizes, our grid system defines different layouts for different screen sizes corresponding to the responsiveness <DocsInternalLink text="breakpoints defined above" href="#responsiveness" />. Each breakpoint range has default number of columns, gutter width, margin, and padding. These defaults can be changed if necessary.
      </p>
      <ul>
        <li>Small windows have four columns with <code>16px</code> gutters</li>
        <li>Medium windows have eight columns with <code>16px</code> gutters</li>
        <li>Large windows have twelve columns with <code>24px</code> gutters</li>
      </ul>
      <p>
        Note that we also use <DocsExternalLink href="https://v15.vuetifyjs.com/en/framework/grid" text="Vuetify" /> in Studio, and those breakpoints are slightly different.
      </p>

      <h3>
        Responsive grids
      </h3>
      <p>
        The <DocsInternalLink text="KGrid" href="/kgrid" code /> and <DocsInternalLink text="KGridItem" href="/kgriditem" code /> components implement grid containers and items with responsiveness built in. <code>KGrid</code> automatically changes the total number of columns based on window size, and <code>KGridItem</code> allows specifying column spans and text alignment for each of the three window size ranges.
      </p>
      <p>
        For example, a common pattern in Kolibri is to have a button right-aligned at the top of a page alongside the header on large windows, but on medium and small windows to move the button underneath the header and left-align it. To do this with the responsive grid:
      </p>
      <DocsShowCode language="html">
        <KGrid>
          <KGridItem :layout12="{ span: 9 }">
            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
          </KGridItem>
          <KGridItem :layout12="{ span: 3, alignment: 'right' }">
            <KButton text="Button" primary />
          </KGridItem>
        </KGrid>
      </DocsShowCode>

      <p>
        Each grid item is described by layout objects which can contain a column <code>span</code> and default text <code>alignment</code>. When no additional layout information is provided, the <code>span</code> defaults to the total number of columns (i.e. full-width), and <code>alignment</code> defaults to <code>'right'</code>.
      </p>
      <p>
        In the code above, we leave the defaults for <code>layout4</code> and <code>layout8</code> breakpoints. For large-screen, twelve-column layouts however we specify that the header grid item should span 9 columns and the button grid item should span 3 and be right-aligned.
      </p>
      <p>
        Try resizing the browser to see the behavior:
      </p>
      <DocsShow>
        <KGrid>
          <KGridItem :layout12="{ span: 9 }">
            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
          </KGridItem>
          <KGridItem :layout12="{ span: 3, alignment: 'right' }">
            <KButton
              :style="{ position: 'relative', top: windowIsLarge ? '16px' : null }"
              text="Button"
              primary
            />
          </KGridItem>
        </KGrid>
      </DocsShow>
      <p>
        Note that an additional complexity not shown in the example above is that conditional styling sometimes needs to be applied using <code>useKResponsiveWindow</code> properties. See the source code of this page for details.
      </p>
      <p>
        Also note that grid containers have a <code>debug</code> property that will show helpful visual information about columns and grid items when set to <code>true</code>.
      </p>
      <h3>
        Fixed grids
      </h3>
      <p>
        There are some situations where it is not desirable to have the number of columns vary dynamically with screen size. In these situations you can use the The <DocsInternalLink text="KFixedGrid" href="/kfixedgrid" code /> and <DocsInternalLink text="KFixedGridItem" href="/kfixedgriditem" code /> components. <code>KFixedGrid</code> has a <code>numCols</code> property to set the number of columns, and <code>KFixedGridItem</code> takes simple <code>span</code> and <code>alignment</code> properties rather than the layout objects.
      </p>
      <h3>
        Nested grids
      </h3>
      <p>
        A page can contain nested grids. A container component can exist on a grid and also have its own grid that its contained components can lie on. This can be valuable for handling complex layouts.
      </p>
      <p>
        The example shown above would probably need to be implemented using nested grids:
      </p>
      <img src="./nested2.png">
      <p>
        Here it might make sense to make the outer grid responsive, and implement the inner page containers or cards with fixed grids.
      </p>

    </DocsPageSection>


  </DocsPageTemplate>

</template>


<script>

  import useKResponsiveWindow from '~~/lib/composables/useKResponsiveWindow';

  export default {
    setup() {
      const { windowIsLarge } = useKResponsiveWindow();
      return { windowIsLarge };
    },
  };

</script>