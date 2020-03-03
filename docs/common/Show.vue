<template>

  <div>
    <div class="show" :style="{display: block ? 'block' : 'inline-block'}">
      <slot></slot>
    </div>
  </div>

</template>


<script>

  export default {
    name: 'Show',
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
    padding-right: 24px;
    padding-left: 24px;
    border: 1px solid #dedede;
    border-radius: 4px;
  }

</style>
