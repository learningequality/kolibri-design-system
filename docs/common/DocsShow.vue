<template>

  <div>
    <div class="show" :style="{display: block ? 'block' : 'inline-block'}">
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
    },
  };

</script>


<style lang="scss" scoped>

  .show {
    padding: 8px 24px;
    margin: 8px;
    border: 1px solid #dedede;
    border-radius: 4px;
  }

</style>
