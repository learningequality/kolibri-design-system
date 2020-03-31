<template>

  <DocsPageTemplate :completed="false">

    <DocsPageSection>
      <h3>Code Example</h3>
      <DocsVueExample :code="ExampleCode">
        <Example />
      </DocsVueExample>

      <h3>Guidelines</h3>
      <p>TODO</p>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  /* eslint-disable import/no-duplicates */
  import Example from './Example';
  import DocsPageTemplate from '~/common/DocsPageTemplate';
  import DocsPageSection from '~/common/DocsPageSection';
  import DocsVueExample from '~/common/DocsVueExample';

  import ExampleCode from '!!raw-loader!./Example';
  // import KCircularLoaderApi from '!vue-doc!~~/lib/loaders/KCircularLoader';
  /* eslint-enable import/no-duplicates */

  export default {
    name: 'KCircularLoader',
    components: {
      DocsPageTemplate,
      DocsPageSection,
      DocsVueExample,
      Example,
    },
    data: () => ({
      ExampleCode,
      KCircularLoaderApi: {}, // TODO
    }),
  };

</script>


<style lang="scss" scoped></style>
