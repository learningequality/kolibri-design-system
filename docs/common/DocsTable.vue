<template>

  <table>
    <slot></slot>
  </table>

</template>


<script>

  /**
   * A table component
   */
  export default {
    name: 'DocsTable',
  };

</script>


<style lang="scss" scoped>

  @use '~/assets/definitions' as *;

  table {
    border-collapse: collapse;
  }

  th,
  td {
    padding: 8px;
    text-align: left;
    border: 1px solid $border-color;
  }

</style>
