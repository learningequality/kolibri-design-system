<template>

  <div
    v-if="page.disabled"
    class="block disabled-link"
    :class="{ code: page.isCode }"
  >
    {{ page.title }}
  </div>
  <a
    v-else
    class="block enabled-link"
    :href="page.path"
    :class="{ currentPage, code: page.isCode }"
  >
    {{ page.title }}
  </a>

</template>


<script>

  export default {
    name: 'NavLink',
    props: {
      page: {
        type: Object,
        required: true,
        validator(page) {
          if (!page.path || !page.title) {
            return false;
          }
          return true;
        },
      },
    },
    computed: {
      currentPage() {
        return this.page.path === this.$route.path;
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '~/assets/definitions';

  .block {
    display: block;
    padding: 4px 8px;
    margin-right: -8px;
    margin-bottom: 2px;
    margin-left: -8px;
  }

  .disabled-link {
    color: #777777;
  }

  .enabled-link {
    color: $link-color;
    text-decoration: none;
    border-radius: 4px;
    outline-offset: 3px;
    transition: all 0.2s ease;

    &:hover {
      color: $link-hover-color;
      background-color: #efefef;
    }
  }

  .currentPage {
    color: black;
    background-color: $border-color;

    &:hover {
      color: black;
      background-color: $border-color;
    }
  }

</style>
