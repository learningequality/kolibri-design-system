<template>

  <PageTemplate :completed="false">

    <PageSection>
      <h3>Code Example</h3>

      <VueExample :code="ExampleCode">
        <Example />
      </VueExample>


      <h3>Guidelines</h3>
      <p>TODO</p>
    </PageSection>

  </PageTemplate>

</template>


<script>

  import PageTemplate from '~content/common/PageTemplate';
  import PageSection from '~content/common/PageSection';
  import VueExample from '~content/common/VueExample';

  /* eslint-disable import/no-duplicates */
  import Example from './Example';
  import ExampleCode from '!!raw-loader!./Example';

  // import KLinearLoaderApi from '!vue-doc!~lib/loaders/KLinearLoader';
  /* eslint-enable import/no-duplicates */

  export default {
    name: 'KLinearLoader',
    components: {
      PageTemplate,
      PageSection,
      VueExample,
      Example,
    },
    data: () => ({
      ExampleCode,
      KLinearLoaderApi: {}, // TODO
    }),
  };

</script>


<style lang="scss" scoped></style>
