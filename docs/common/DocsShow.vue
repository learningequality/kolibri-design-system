<template>

  <div>
    <div class="show" :style="style">
      <slot></slot>
    </div>
  </div>

</template>


<script>

  export default {
    name: 'DocsShow',
    props: {
      block: {
        type: Boolean,
        default: false,
      },
      padding: {
        type: Boolean,
        default: true,
      },
      /**
       * Toggles dark background
       */
      dark: {
        type: Boolean,
        required: false,
      },
    },
    computed: {
      style() {
        return {
          display: this.block ? 'block' : 'inline-block',
          padding: this.padding ? '8px 24px' : null,
          backgroundColor: this.dark ? this.$themePalette.grey.v_700 : undefined,
        };
      },
    },
  };

</script>


<style lang="scss" scoped>

  .show {
    margin: 16px 0;
    border: 1px solid #dedede;
    border-radius: 4px;
  }

</style>
