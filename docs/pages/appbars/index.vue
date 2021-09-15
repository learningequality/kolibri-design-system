<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        App bars show information and actions related to the current page. They can be used for branding, navigation, and providing actions to the user
      </p>

      <p>
        We have one type of bottom app bar and three types of top app bars: <em>primary bars</em>, <em>back arrow bars</em>, and <em>full-screen modal bars</em>
      </p>

      <h3>Primary bars</h3>
      <p>Primary bars are placed on top level pages. They may contain tabs that lead to top-level sections in this part of the application</p>
      <DocsShow>
        <img class="modal-img" src="./primary-1.png">
      </DocsShow>
      <DocsShow>
        <img class="modal-img" src="./primary-2.png">
      </DocsShow>

      <h3>Back arrow bars</h3>
      <p>Back arrow buttons allow users to navigate back to the parent page in the hierarchy</p>
      <DocsShow>
        <img class="modal-img" src="./back-1.png">
      </DocsShow>

      <h3>Full-screen modal bars</h3>
      <p>Full-screen modal bars allows users to dismiss a full-screen form from view</p>
      <DocsShow>
        <img class="modal-img" src="./form-1.png">
      </DocsShow>

      <h3>Bottom bars</h3>
      <p>Bottom bars contain contextual metadata and actions related to a page. Use bottom bars to accompany pages with full-screen forms or content selection. Bottom bars are usually sticky to the bottom of a page</p>
      <DocsShow>
        <img class="modal-img" src="./bottom-1.png">
      </DocsShow>
    </DocsPageSection>

    <DocsPageSection title="Layout" anchor="#layout">
      <h3>Top bars</h3>
      <ul>
        <li>Place navigation icons on the far left</li>
        <li>Place titles to the right of the navigation icon</li>
        <li>Place contextual icons to the far right</li>
      </ul>
      <h3>Bottom bars</h3>
      <ul>
        <li>Place buttons on the far right</li>
        <li>Place any contextual metadata related to the task on the far left</li>
        <li>Place any contextual errors on the bottom of the metadata</li>
        <li>Place bottom bars at the bottom of the browser window</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Titles" anchor="#titles">
      <p>Top bars must have titles that describe the current page</p>
      <ul>
        <li>Titles can describe a feature a user is engaged in (e.g. Create Quiz)</li>
        <li>Titles can describe a high-level section of an app (e.g. Learn, Coach)</li>
        <li>Titles can describe an application being used (e.g. Kolibri Studio)</li>
        <li>Titles should never include names of user generated text (e.g. resource title or username)</li>
      </ul>
    </DocsPageSection>

    <DocsDoNot>
      <template #do>
        <img src="./do-1.png">
        <p class="do-dont">
          Use general titles in top bars
        </p>
      </template>
      <template #not>
        <img src="./dont-1.png">
        <p class="do-dont">
          Use user-generated text in top bars
        </p>
      </template>
    </DocsDoNot>

    <DocsPageSection title="Exceptions" anchor="#exceptions">
      <p>Purposeful exceptions can be made to incorporate special elements into top bars</p>
    </DocsPageSection>

    <DocsDoNot style="display: inline-block;">
      <template #do>
        <img src="./exception-1.png">
        <p class="do-dont">
          Change top app bar color to white if visual contrast is needed between the background and action buttons
        </p>
      </template>
    </DocsDoNot>

    <DocsDoNot style="display: inline-block;">
      <template #do>
        <img src="./exception-2.png">
        <p class="do-dont">
          Place learning aids in top bars
        </p>
      </template>
    </DocsDoNot>

    <DocsDoNot style="display: inline-block;">
      <template #do>
        <img src="./exception-3.png">
        <p class="do-dont">
          Place custom search fields in top bars
        </p>
      </template>
    </DocsDoNot>

    <DocsPageSection title="Icons" anchor="#icons">
      <ul>
        <li>Menu icon: opens up a navigation drawer</li>
        <li>Back arrow: takes the user back to the previous page</li>
        <li>Close icon: dismisses the edit form from view</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Behaviors" anchor="#behaviors">
      <p>Small screens and browser windows have an effect on different top bar components</p>
      <h3>Scrolling</h3>
      <ul>
        <li>Scrolling upwards hides the top bar</li>
        <li>Scrolling downwards reveals the top bar</li>
      </ul>

      <h3>Responsiveness</h3>
      <ul>
        <li>Top bar actions can be collapsed into an overflow menu</li>
        <li>Top bar tabs can become horizontally scrollable</li>
        <li>Search bars can shift to a new line and span the full screen width</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Accessibility" anchor="#accessibility">
      <ul>
        <li>Icon and title placement become mirrored for right-to-left languages</li>
        <li>Top bar titles and iconography colors must meet <a href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" target="_blank">1.4.3 Contrast (Level AA) criteria</a></li>
      </ul>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped>

  img,
  .do-dont {
    width: 400px;
  }

</style>
