<template>

  <KGrid>
    <KGridItem class="prism-wrapper" :layout12="{ span: alwaysStack ? 12 : 6 }">
      <DocsCodeBlock language="html" :code="code" />
    </KGridItem>
    <KGridItem :layout12="{ span: alwaysStack ? 12 : 6 }">
      <DocsShow class="show">
        <slot></slot>
      </DocsShow>
    </KGridItem>
  </KGrid>

</template>


<script>

  import DocsCodeBlock from './DocsCodeBlock';

  export default {
    name: 'DocsVueExample',
    components: {
      DocsCodeBlock,
    },
    props: {
      code: {
        type: String,
        required: true,
      },
      alwaysStack: {
        type: Boolean,
        default: false,
      },
    },
  };

</script>


<style lang="scss" scoped>

  .show {
    margin-top: 8px;
    margin-bottom: 8px;
  }

</style>
