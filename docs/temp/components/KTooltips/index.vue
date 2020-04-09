<template>

  <DocsPageTemplate :completed="false">

    <DocsPageSection>
      <h1>Tooltips</h1>


      <h2>Usage guidelines</h2>



      <h2>Code Example</h2>

    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  import Example from './Example.vue';
  import DocsPageTemplate from '~/common/DocsPageTemplate';
  import DocsPageSection from '~/common/DocsPageSection';

  /* eslint-disable import/no-duplicates */
  // import exampleCode from '!!raw-loader!./Example.vue';
  /* eslint-enable import/no-duplicates */

  // import KTooltipApi from '!vue-doc!~~/lib/KTooltip';

  export default {
    name: 'KTooltips',
    components: {
      DocsPageTemplate,
      DocsPageSection,
      Example,
    },
    data: () => ({
      KTooltipApi: {}, // TODO
      exampleCode: {}, // TODO
    }),
  };

</script>


<style lang="scss" scoped></style>
