<template>

  <!-- no extra whitespace inside link -->
  <a
    :class="buttonClasses"
    :href="href"
    :download="download"
    :openInNewTab="openInNewTab"
    :target="openInNewTab ? '_blank' : false"
    rel="noopener noreferrer"
    dir="auto"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <span class="link-text" :style="spanStyle">{{ text }}</span>
    <slot name="openInNewTab">
      <KIcon
        v-if="openInNewTab"
        icon="openNewTab"
        style="top: 4px;"
        :color="hovering ? $themeTokens.primaryDark : $themeTokens.primary"
      />
    </slot>
  </a>

</template>


<script>

  import buttonMixin from './buttonMixin.js';

  /**
   * KExternalLink creates a styled external link
   */
  export default {
    name: 'KExternalLink',
    mixins: [buttonMixin],
    props: {
      /**
       * URL string
       */
      href: {
        type: String,
        required: true,
      },
      /**
       * Specifies that the file is meant to be downloaded, not displayed in a separate tab.
       */
      download: {
        type: String,
        required: false,
      },
      /**
       * If provided, shows a KIcon in front of the text
       */
      icon: {
        type: String,
        required: false,
      },
      /**
       * If provided, opens link in new tab and displays a "pop out" icon
       */
      openInNewTab: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        hovering: false,
      };
    },
    computed: {
      /**
       * If icon is provided, add 8px margin between the icon and the text
       */
      spanStyle() {
        if (this.icon) {
          if (this.isRtl) {
            return { marginRight: '8px' };
          } else {
            return { marginLeft: '8px' };
          }
        } else {
          return {};
        }
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import './buttons';

</style>
