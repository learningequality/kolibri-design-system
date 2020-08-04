<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>The goal of good layout is legibility - to aid the user in quickly identifying what they need on the page. This is achieved through effective use of white space, graphics, typography, and visual separators.</p>
    </DocsPageSection>

    <DocsPageSection title="Spacing" anchor="#spacing">
      <p>To aid with alignment, all UI elements should be spaced out in increments of 8px. On smaller screens or in more compact spaces, the increment can be reduced to 4px.</p>
      <p>All margin and padding measurements should be incremented by these units.</p>
    </DocsPageSection>

    <DocsPageSection title="Containers" anchor="#containers">
      <p>A container is a shape used to represent an enclosed area. Containers can hold various UI elements such as an image, icon, or surface. They can be flexible and accommodate the width or height of the content within, or they can be rigid and fixed in size.</p>
      <p>To reduce visual noise, avoid nesting containers in containers.</p>
      <img src="./containers.png">
      <h3>
        Specifications
      </h3>
      <ul>
        <li>
          Background color: <DocsInternalLink href="/colors#tokens-surface" code>
            tokens.surface
          </DocsInternalLink> (<code>#ffffff</code>)
        </li>
        <li>Default border radius: 4px</li>
        <li>Elevation: 1dp</li>
        <li>Spacing between containers: 24px</li>
        <li>Padding: 16px (small screens), 24px (medium and large screens)</li>
      </ul>
      <h3>
        Maximum width of a container
      </h3>
      <p>
        If a page container contains text, set its maximum width to 1000px in order to aid readability on larger screens.
      </p>
      <h3>
        Dividers
      </h3>
      <p>
        Use dividers to create visual distinction between sections within a container. A divider should span the entire width of a container.
      </p>
      <p>
        Use sparingly and reserve them for situations where white space does not properly separate elements or groups of elements, such as a table, compact list items, or list sections.
      </p>
      <img src="./dividers.png">
      <h3>
        Specs
      </h3>
      <ul>
        <li>Width: 1px</li>
        <li>
          Color: <DocsInternalLink href="/colors#tokens-fineLine" code>
            tokens.fineline
          </DocsInternalLink> (<code>#dedede</code>)
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Responsive grids" anchor="#grids">
      <p>Grids allow containers and their contained UI components to adapt to screen sizes and orientations and ensure consistent layouts across different parts of the application. Grids do not extend to the width of the window, just the container element.</p>
      <p>Each Learning Equality product should utilize a grid system, and generally apply the guidelines from <DocsExternalLink href="https://material.io/design/layout/responsive-layout-grid.html#" text="Material Design" />.</p>
      <h3>
        Nested grids
      </h3>
      <p>
        A page can contain nested grids. A container component can exist on a grid and also have its own grid that its contained components can lie on.
      </p>
      <img src="./nested.png">
      <h3>
        Fixed column width
      </h3>
      <p>
        By default, margins have a fixed width, and column width changes responsively. When the need arises, columns can be a fixed width, and margins can change responsively.
      </p>
      <video width="600" controls loop>
        <source src="./fixed-column.mp4" type="video/mp4">
        Your browser does not support the video HTML tag
      </video>
      <h3>
        Breakpoints
      </h3>
      <p>
        Each breakpoint range has default: number of columns, gutter width, margin, and padding. These defaults can be changed according to exceptional needs.
      </p>
      <table>
        <tr>
          <th>Range</th>
          <th><DocsExternalLink href="https://v15.vuetifyjs.com/en/framework/grid" text="Vuetify" /></th>
          <th>KGrid</th>
          <th>Columns</th>
          <th>Margins &amp; Gutters</th>
          <th>Padding</th>
        </tr>
        <tr>
          <td>0-479px</td>
          <td>xs</td>
          <td>Level 0</td>
          <td>4</td>
          <td>16px</td>
          <td>16px</td>
        </tr>
        <tr>
          <td>480-599px</td>
          <td>xs</td>
          <td>Level 1</td>
          <td>4</td>
          <td>16px</td>
          <td>16px</td>
        </tr>
        <tr>
          <td>600-839px</td>
          <td>sm</td>
          <td>Level 2</td>
          <td>8</td>
          <td>16px</td>
          <td>24px</td>
        </tr>
        <tr>
          <td>840-959px</td>
          <td>sm</td>
          <td>Level 3</td>
          <td>12</td>
          <td>16px</td>
          <td>24px</td>
        </tr>
        <tr>
          <td>960-1263px</td>
          <td>md</td>
          <td>Level 4</td>
          <td>12</td>
          <td>24px</td>
          <td>24px</td>
        </tr>
        <tr>
          <td>1264-1430px</td>
          <td>lg</td>
          <td>Level 5</td>
          <td>12</td>
          <td>24px</td>
          <td>24px</td>
        </tr>
      </table>
      <p>Define <DocsExternalLink href="https://material.io/design/layout/spacing-methods.html#spacing" text="keylines" /> in increments of 4px or 8 px when UI elements must be placed outside of the alignment to columns and rows within a grid.</p>
    </DocsPageSection>


  </DocsPageTemplate>

</template>


<style lang="scss" scoped>

  td,
  th {
    padding: 8px;
    text-align: left;
    vertical-align: top;
  }

</style>
