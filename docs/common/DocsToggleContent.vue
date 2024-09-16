<template>

  <div class="wrapper">
    <button class="toggle" @click="show = !show">
      <span v-if="show">{{ hideText }}<KIcon icon="dropup" /></span>
      <span v-else>{{ showText }}<KIcon icon="dropdown" /></span>
    </button>
    <div v-show="show" class="content">
      <slot></slot>
    </div>
  </div>

</template>


<script>

  /**
   * Toggles visibility of content
   * provided via the default slot
   */
  export default {
    name: 'DocsToggleContent',
    props: {
      /**
       * Label for the toggle button
       * for showing the content
       */
      showText: {
        type: String,
        required: true,
      },
      /**
       * Label for the toggle button
       * for hiding the content
       */
      hideText: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        show: false,
      };
    },
  };

</script>


<style lang="scss" scoped>

  @import '~/assets/definitions';

  .wrapper {
    margin: 12px 0;
  }

  .toggle {
    display: inline-block; // prevents trailing spaces
    color: $link-color;
    text-decoration: underline;
    cursor: pointer;
    background: none;
    border: 0;
    transition: $basic-transition;

    svg {
      fill: $link-color !important;
      transition: $basic-transition;
    }

    &:hover {
      color: $link-hover-color;
      svg {
        fill: $link-hover-color;
      }
    }
  }

  .content {
    padding: 16px 24px;
    margin: 12px 0;
    border: 1px solid $border-color;

    ul,
    ol {
      padding-left: 20px;
    }
  }

</style>
