<template>

  <DocsPageTemplate :completed="false">

    <DocsPageSection>

      <h2>Code Example</h2>
      <DocsVueExample :code="exampleCode">
        <Example />
      </DocsVueExample>

      <h2>Guidelines</h2>
      <h3>Usage</h3>
      <ul>
        <li>Should be used when all options must be visible. If not, use a select.</li>
        <li>Selected state of radio buttons should denote positives (yes/selected)</li>
        <li>Should not be used to filter tables or lists</li>
        <li>Should not be nested</li>
      </ul>

      <h3>Style</h3>
      <ul>
        <li>Always left-aligned</li>
        <li>Vertically stacked</li>
      </ul>

      <h3>Language</h3>
      <ul>
        <li>Labels should be short and concise. Should not be sentences.</li>
      </ul>

    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  import Example from './Example.vue';
  import DocsVueExample from '~/common/DocsVueExample';
  import DocsPageTemplate from '~/common/DocsPageTemplate';
  import DocsPageSection from '~/common/DocsPageSection';

  /* eslint-disable import/no-duplicates */
  // import exampleCode from '!!raw-loader!./Example.vue';
  /* eslint-enable import/no-duplicates */

  // import kRadioButtonApi from '!vue-doc!~~/lib/KRadioButton';

  export default {
    name: 'KRadioButton',
    components: {
      DocsPageTemplate,
      DocsPageSection,
      DocsVueExample,
      Example,
    },
    data: () => ({
      kRadioButtonApi: {}, // TODO
      exampleCode: {}, // TODO
    }),
  };

</script>


<style lang="scss" scoped></style>
