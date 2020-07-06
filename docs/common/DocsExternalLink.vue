<template>

  <!-- eslint-disable -->
  <!-- prevent line from wrapping so that icon displays correctly -->
  <a :href="href" target="_blank"><template v-if="text">{{ text }}</template><template v-else><slot></slot></template><KIcon icon="openNewTab" class="pop" disableColor /></a>
  <!-- eslint-enable -->

</template>


<script>

  export default {
    name: 'DocsExternalLink',
    props: {
      text: {
        type: String,
        required: false,
      },
      href: {
        type: String,
        required: true,
      },
    },
  };

</script>


<style lang="scss" scoped>

  .pop {
    display: inline-block;
    width: 16px;
    margin-left: 4px;
    vertical-align: text-top;
  }

</style>
