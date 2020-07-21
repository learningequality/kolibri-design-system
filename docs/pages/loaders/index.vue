<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Loading indicators are used to convey to the user that they will need to wait some time for a software- or hardware-related operation to complete. They can be used to convey a range of ongoing processes, including network, disk and CPU operations.
      </p>
      <p>
        Generally, loading indicators should be used if the wait period is longer than a second.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Using linear loaders" anchor="#linearloaders">
      <p>
        Use linear loaders for the following:
      </p>
      <ul>
        <li>Loading initial page content</li>
        <li>Representing the progress of a measurable task</li>
      </ul>
    </DocsPageSection>

    <DocsDoNot>
      <template v-slot:do>
        <img src="../loaders/topbar.png" style="max-width:400px;">
        <p>
          Append linear loaders to appbars to load page content
        </p>
      </template>
    </DocsDoNot>

    <DocsDoNot>
      <template v-slot:do>
        <img src="../loaders/tasks.png" style="max-width:400px;">
        <p>
          Place linear loaders near information related to the task being measured
        </p>
      </template>
    </DocsDoNot>

    <DocsDoNot>
      <template v-slot:do>
        <img src="../loaders/tables.png" style="max-width:400px;">
        <p>
          Append linear loaders to data tables
        </p>
      </template>
    </DocsDoNot>


    <DocsPageSection title="Using circular loaders" anchor="#circularloaders">
      <p>
        Use circular loaders for the following:
      </p>
      <ul>
        <li>Loading learning content renderers</li>
        <li>Indicating the presence of a working background task</li>
        <li>Loading a set of new information</li>
        <li>Pull-to-refresh behaviors on mobile</li>
      </ul>
    </DocsPageSection>

    <DocsDoNot>
      <template v-slot:do>
        <img src="../loaders/loading-more.png" style="max-width:400px;">
        <p>
          Place below existing content to indicate where new content appears
        </p>
      </template>
    </DocsDoNot>

    <DocsDoNot>
      <template v-slot:do>
        <img src="../loaders/centering.png" style="max-width:400px;">
        <p>
          Center circular loaders when loading new information
        </p>
      </template>
    </DocsDoNot>

  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
