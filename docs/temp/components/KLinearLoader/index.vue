<template>

  <DocsPageTemplate :completed="false">

    <DocsPageSection>
      <h3>Code Example</h3>




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

  import ExampleCode from '!!raw-loader!./Example';
  // import KLinearLoaderApi from '!vue-doc!~~/lib/loaders/KLinearLoader';
  /* eslint-enable import/no-duplicates */

  export default {
    name: 'KLinearLoader',
    components: {
      DocsPageTemplate,
      DocsPageSection,
      Example,
    },
    data: () => ({
      ExampleCode,
      KLinearLoaderApi: {}, // TODO
    }),
  };

</script>


<style lang="scss" scoped></style>
