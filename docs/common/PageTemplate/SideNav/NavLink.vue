<template>

  <div v-if="page.disabled" class="disabled-link">
    <code v-if="page.code">{{ page.title }}</code>
    <template else>
      {{ page.title }}
    </template>
  </div>
  <a v-else :href="page.path" :class="{ active: page.path === $route.path }">
    <code v-if="page.code">{{ page.title }}</code>
    <template v-else>{{ page.title }}</template>
  </a>

</template>


<script>

  export default {
    name: 'NavLink',
    props: {
      page: {
        type: Object,
        validator(page) {
          if (!page.path || !page.title) {
            return false;
          }
          return true;
        },
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '~/assets/definitions';

  .disabled-link {
    display: block;
    padding: 4px 8px;
    margin-right: -8px;
    margin-bottom: 2px;
    margin-left: -8px;
    color: #777777;
  }

  a {
    display: block;
    padding: 4px 8px;
    margin-right: -8px;
    margin-bottom: 2px;
    margin-left: -8px;
    color: $link-color;
    text-decoration: none;
    border-radius: 4px;
    outline-offset: 3px;

    &:hover {
      color: $link-hover-color;
      background-color: #efefef;

      code {
        color: $link-hover-color;
      }
    }

    &.active {
      color: black;
      background-color: $border-color;
    }
  }

</style>
