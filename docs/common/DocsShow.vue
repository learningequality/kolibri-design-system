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
    },
    computed: {
      style() {
        return {
          display: this.block ? 'block' : 'inline-block',
          padding: this.padding ? '8px 24px' : null,
        };
      },
    },
  };

</script>


<style lang="scss" scoped>

  .show {
    margin: 8px;
    border: 1px solid #dedede;
    border-radius: 4px;
  }

</style>
