<template>

  <DocsPageTemplate :completed="false">
    <DocsPageSection>

      <h2>Code Example</h2>


      <h2>Guidelines</h2>
      <p>use em!</p>

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

  // import kGridApi from '!vue-doc!~~/lib/grids/KGrid';
  // import kGridItemApi from '!vue-doc!~~/lib/grids/KGridItem';

  export default {
    name: 'Grids',
    components: {
      DocsPageTemplate,
      DocsPageSection,
      Example,
    },
    data: () => ({
      kGridApi: {}, // TODO
      kGridItemApi: {}, // TODO
      exampleCode: {}, // TODO
    }),
  };

</script>


<style lang="scss" scoped></style>
