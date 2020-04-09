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
  // import KCircularLoaderApi from '!vue-doc!~~/lib/loaders/KCircularLoader';
  /* eslint-enable import/no-duplicates */

  export default {
    name: 'KCircularLoader',
    components: {
      DocsPageTemplate,
      DocsPageSection,
      Example,
    },
    data: () => ({
      ExampleCode,
      KCircularLoaderApi: {}, // TODO
    }),
  };

</script>


<style lang="scss" scoped></style>
