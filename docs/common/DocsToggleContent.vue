<template>

  <div class="content">
    <slot></slot>
  </div>

</template>


<script>

  /**
   * `DocsToggleButton` toggles the visibility
   * of content provided via the default slot
   * of its corresponding `DocsToggleContent`
   *
   * These two components are linked with `id`
   * set on the `DocsToggleContent`. This `id`
   * is then provided to `DocsToggleButton`
   * via its `contentId` prop.
   */
  export default {
    name: 'DocsToggleContent',
  };

</script>


<style lang="scss" scoped>

  @import '~/assets/definitions';

  .content {
    display: none;
    padding: 16px 24px;
    margin: 12px 0;
    border: 1px solid $border-color;

    ul,
    ol {
      padding-left: 20px;
    }
  }

</style>
