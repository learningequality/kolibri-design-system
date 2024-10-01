<template>

  <button class="toggle" @click="onClick">
    <span v-if="show">{{ hideText }}<KIcon icon="dropup" /></span>
    <span v-else>{{ showText }}<KIcon icon="dropdown" /></span>
  </button>

</template>


<script>

  /**
   * Button that toggles the content of 'DocsToggleContent'
   */
  export default {
    name: 'DocsToggleButton',
    props: {
      /**
       * id of the corresponding 'DocsToggleContent'
       */
      contentId: {
        type: String,
        required: true,
      },
      /**
       * Label for the toggle button
       * for showing the content
       */
      showText: {
        type: String,
        required: false,
        default: 'Show more',
      },
      /**
       * Label for the toggle button
       * for hiding the content
       */
      hideText: {
        type: String,
        required: false,
        default: 'Hide',
      },
    },
    data() {
      return {
        show: false,
      };
    },
    methods: {
      onClick() {
        this.show = !this.show;
        if (this.show) {
          document.getElementById(this.contentId).style.display = 'block';
        } else {
          document.getElementById(this.contentId).style.display = 'none';
        }
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '~/assets/definitions';

  .toggle {
    display: inline-block; // prevents trailing spaces
    font-weight: bold;
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

</style>
