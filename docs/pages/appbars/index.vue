<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        App bars are used to provide users a means of navigation through pages in our applications. They allow access to top-level pages, navigate back to a specific page, or dismiss edit forms
      </p>

      <p>
        We have four types of app bars: <em>primary bars</em>, <em>back arrow bars</em>, <em>form bars</em>, and <em>bottom bars</em>
      </p>

      <h3>Primary bars</h3>
      <p>Primary bars are placed on top level pages in Kolibri. They may house subtabs that lead to different sections of the application</p>
      <DocsShow>
        <img class="modal-img" src="./primary-1.png">
      </DocsShow>
      <DocsShow>
        <img class="modal-img" src="./primary-2.png">
      </DocsShow>

      <h3>Back arrow bars</h3>
      <p>Back arrow topbars allow users to navigate back to the previous page</p>
      <DocsShow>
        <img class="modal-img" src="./back-1.png">
      </DocsShow>

      <h3>Form bars</h3>
      <p>Form bars allows users to dismiss a full-screen form and land on the previous page</p>
      <DocsShow>
        <img class="modal-img" src="./form-1.png">
      </DocsShow>

      <h3>Bottom bars</h3>
      <p>Bottom bars are placed on pages that house editing, content selection, or multi-step processes. They may contain buttons that allow the user to submit specific action(s) or continue with the process. Bottom bars can also contain contextual information and error messaging relevant to the task</p>
      <DocsShow>
        <img class="modal-img" src="./bottom-1.png">
      </DocsShow>
    </DocsPageSection>

    <DocsPageSection title="Layout" anchor="#layout">
      <ul>
        <li>Place navigation icons on the far left</li>
        <li>Place titles to the right of the navigation icon</li>
        <li>Place contextual icons to the far right</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Titles" anchor="#titles">
      <p>Appbars must have titles that describe the current page</p>
      <ul>
        <li>Titles can describe a feature a user is engaged in (e.g. Create Quiz)</li>
        <li>Titles can describe a high-level section of an app (e.g. Learn, Coach)</li>
        <li>Titles can describe an application being used (e.g. Kolibri Studio)</li>
        <li>Titles should never include names of user generated text (e.g. resource title or username)</li>
      </ul>
    </DocsPageSection>

    <DocsDoNot>
      <template v-slot:do>
        <img src="./do-1.png">
        <p class="do-dont">
          Use general titles in app bars
        </p>
      </template>
      <template v-slot:not>
        <img src="./dont-1.png">
        <p class="do-dont">
          Use user-generated text in app bars
        </p>
      </template>
    </DocsDoNot>

    <DocsPageSection title="Exceptions" anchor="#exceptions">
      <p>Purposeful exceptions can be made to incorporate special elements into top bars</p>
    </DocsPageSection>

    <DocsDoNot style="display: inline-block;">
      <template v-slot:do>
        <img src="./exception-1.png">
        <p class="do-dont">
          Appbar color may change to white for critical workspaces
        </p>
      </template>
    </DocsDoNot>

    <DocsDoNot style="display: inline-block;">
      <template v-slot:do>
        <img src="./exception-2.png">
        <p class="do-dont">
          Learning aids and indicators can be placed in app bars
        </p>
      </template>
    </DocsDoNot>

    <DocsDoNot style="display: inline-block;">
      <template v-slot:do>
        <img src="./exception-3.png">
        <p class="do-dont">
          Search text fields can be placed in app bars when global searching is a critical feature
        </p>
      </template>
    </DocsDoNot>

    <DocsDoNot style="display: inline-block;">
      <template v-slot:do>
        <img src="./exception-4.png">
        <p class="do-dont">
          For resource pages in the Learn app, use a back link at the top of the page instead of an app bar
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

    <DocsPageSection title="Behaviors" anchor="#browser-behaviors">
      <h3>Browser</h3>
      <ul>
        <li>Back and forward buttons can move a user through topbar tabs</li>
        <li>Back arrow topbars can be used on both pages that do and do not have a URL</li>
        <li>Appbar actions can be collapsed into an overflow menu as the browser window size decreases</li>
      </ul>

      <h3>Scrolling</h3>
      <ul>
        <li>Scrolling upwards hides topbars</li>
        <li>Scrolling downwards reveals topbars</li>
        <li>Bottom bars are sticky to the bottom of the browser window</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Accessibility" anchor="#accessibility">
      <ul>
        <li>Icon and title placement become mirrored for right-to-left languages</li>
        <li>Appbar titles and iconography colors must meet <a href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" target="_blank">1.4.3 Contrast (Level AA) criteria</a></li>
      </ul>
    </DocsPageSection>

    <!--<DocsShow>
        <img class="modal-img" src="./dropdown-menu.png">
      </DocsShow>-->

    <!--<DocsShow>
        <img class="modal-img" src="./filter-menu.png">
      </DocsShow>-->

    <!--<DocsDoNot>
      <template v-slot:do>
        <img src="./icon-do.png">
        <p class="do-dont">
          Use iconography as a visual aid for important actions
        </p>
      </template>
      <template v-slot:not>
        <img src="./icon-dont.png">
        <p class="do-dont">
          Use repetitive iconography in filter menus
        </p>
      </template>
    </DocsDoNot>-->

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
