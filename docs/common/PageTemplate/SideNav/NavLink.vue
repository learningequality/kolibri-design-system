<template>

  <code v-if="code">{{ text }}</code> <!-- WIP -->
  <a v-else :href="href" :class="{ active: href === $route.path }">
    <template>{{ text }}</template>
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

  // WIP
  code {
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
