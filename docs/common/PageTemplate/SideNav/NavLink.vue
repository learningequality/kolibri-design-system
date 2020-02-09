<template>

  <a :href="href" :class="{ active: href === $route.path }">
    <code v-if="code">{{ text }}</code>
    <template v-else>{{ text }}</template>
  </a>

</template>


<script>

  export default {
    name: 'NavLink',
    props: {
      text: {
        type: String,
        required: true,
      },
      href: {
        type: String,
        required: true,
      },
      code: {
        type: Boolean,
        default: false,
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '~/assets/definitions';

  a {
    display: block;
    padding: 8px;
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
