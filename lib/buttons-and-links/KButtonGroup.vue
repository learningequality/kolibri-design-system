<template>

  <span class="button-group">
    <slot></slot>
  </span>

</template>


<script>

export default {
  name: "KButtonGroup",
}

</script>


<style lang="scss" scoped>
  .button-group {
    overflow: none;
  }
  /* KButton can produce <a> or <button> tags */
  .button-group > a,
  .button-group > button {
    margin: 8px;
  }
</style>
