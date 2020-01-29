<template>

  <PageTemplate :completed="false">
    <PageSection>

      <h2>Code Example</h2>
      <VueExample :code="exampleCode">
        <Example />
      </VueExample>

      <h2>Guidelines</h2>
      <p>use em!</p>

    </PageSection>
  </PageTemplate>

</template>


<script>

  import VueExample from '~content/common/VueExample';
  import PageTemplate from '~content/common/PageTemplate';
  import PageSection from '~content/common/PageSection';

  /* eslint-disable import/no-duplicates */
  import Example from './Example.vue';
  // import exampleCode from '!!raw-loader!./Example.vue';
  /* eslint-enable import/no-duplicates */

  // import kGridApi from '!vue-doc!~lib/grids/KGrid';
  // import kGridItemApi from '!vue-doc!~lib/grids/KGridItem';

  export default {
    name: 'Grids',
    components: {
      PageTemplate,
      PageSection,
      VueExample,
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
