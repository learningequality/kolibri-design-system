<template>

  <DocsPageTemplate>
    <DocsPageSection title="Usage guidelines" anchor="#usage">

      <p>
        Breadcrumbs should be used to aid navigation across channels, topic trees, and resources.
        Place it directly above the content to be navigated through.
      </p>

      <p>
        The last item should be the current item, which will not be linked.
        This text might be redundant with the same name in an adjacent header, which is ok.
      </p>

      <DocsShow>
        <KBreadcrumbs :items="breadcrumbs" />
      </DocsShow>
    </DocsPageSection>

    <DocsPageSection title="Code example" anchor="#example" fullwidth>
      <DocsVueExample :code="exampleCode">
        <Example />
      </DocsVueExample>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  import Example from './Example.vue';
  import DocsVueExample from '~/common/DocsVueExample';
  import DocsPageTemplate from '~/common/DocsPageTemplate';
  import DocsPageSection from '~/common/DocsPageSection';
  import DocsShow from '~/common/DocsShow';

  /* eslint-disable import/no-duplicates */
  // import exampleCode from '!!raw-loader!./Example.vue';
  /* eslint-enable import/no-duplicates */

  // import kBreadcrumbsApi from '!vue-doc!~~/lib/KBreadcrumbs';

  export default {
    name: 'KBreadcrumbs',
    components: {
      DocsPageTemplate,
      DocsPageSection,
      DocsVueExample,
      DocsShow,
      Example,
    },
    data: () => ({
      kBreadcrumbsApi: {}, // TODO
      exampleCode: {}, // TODO
    }),
    computed: {
      breadcrumbs() {
        return [
          {
            text: 'Channel',
            link: {},
          },
          {
            text: 'Topic',
            link: {},
          },
          {
            text: 'Item',
          },
        ];
      },
    },
  };

</script>


<style lang="scss" scoped></style>
