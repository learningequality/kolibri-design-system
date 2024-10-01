<template>

  <nav class="nav">
    <ol>
      <li
        v-for="(item, key) in items"
        :key="key"
      >
        <a :href="item.href">{{ item.text }}</a>
      </li>
    </ol>
  </nav>

</template>


<script>

  /**
   * Displays sub-navigation as a list of links
   */
  export default {
    name: 'DocsSubNav',
    props: {
      /**
       * List of navigation items { text, href}
       */
      items: {
        type: Array,
        required: true,
      },
    },
  };

</script>


<style lang="scss" scoped>

  ol {
    padding-left: 22px;
  }

  .nav {
    margin: 12px 0;
  }

</style>
