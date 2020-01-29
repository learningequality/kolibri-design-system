<template>

  <PageTemplate :completed="false">

    <PageSection title="Usage" anchor="#usage" fullwidth>
      <VueExample :code="exampleCode">
        <Example />
      </VueExample>
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

  // import kDropdownMenuApi from '!vue-doc!~lib/KDropdownMenu';

  export default {
    name: 'KDropdownMenu',
    components: {
      PageTemplate,
      PageSection,
      VueExample,
      Example,
    },
    data: () => ({
      kDropdownMenuApi: {}, // TODO
      exampleCode: {}, // TODO
    }),
  };

</script>


<style lang="scss" scoped></style>
