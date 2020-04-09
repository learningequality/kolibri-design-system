<template>

  <DocsPageTemplate :completed="false">

    <DocsPageSection title="Usage" anchor="#usage" fullwidth />

  </DocsPageTemplate>

</template>


<script>

  import Example from './Example.vue';
  import DocsPageTemplate from '~/common/DocsPageTemplate';
  import DocsPageSection from '~/common/DocsPageSection';

  /* eslint-disable import/no-duplicates */
  // import exampleCode from '!!raw-loader!./Example.vue';
  /* eslint-enable import/no-duplicates */

  // import kDropdownMenuApi from '!vue-doc!~~/lib/KDropdownMenu';

  export default {
    name: 'KDropdownMenu',
    components: {
      DocsPageTemplate,
      DocsPageSection,
      Example,
    },
    data: () => ({
      kDropdownMenuApi: {}, // TODO
      exampleCode: {}, // TODO
    }),
  };

</script>


<style lang="scss" scoped></style>
