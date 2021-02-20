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
    <slot name="icon">
      <KIcon
        v-if="icon"
        :icon="icon"
        style="top: 4px;"
        :color="hovering ? $themeTokens.primaryDark : $themeTokens.primary"
      />
    </slot>
    <span class="link-text" :style="spanStyle">{{ text }}</span>
    <slot name="iconAfter">
      <KIcon
        v-if="iconAfter"
        :icon="iconAfter"
        style="top: 4px;"
        :color="hovering ? $themeTokens.primaryDark : $themeTokens.primary"
      />
    </slot>
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
        type: Boolean,
        default: false,
      },
      /**
       * If provided, opens link in new tab and displays a "pop out" icon
       */
      openInNewTab: {
        type: Boolean,
        default: false,
      },
      /**
       * If provided, shows a KIcon in front of the text
       */
      icon: {
        type: String,
        default: null,
      },
      /**
       * If provided, shows a KIcon after the text
       */
      iconAfter: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        hovering: false,
      };
    },
    computed: {
      /**
       * If link opens in new tab or if icon is provided, add 8px margin between the icon and the text
       */
      spanStyle() {
        let styles = {};
        if (this.openInNewTab || this.icon) {
          if (this.isRtl) {
            // If RTL-language, but English link, displays correct margins
            styles['marginRight'] = '8px';
            // Checks to see if link for new tab is in same dir as page lang
            if (this.text !== this.href) {
              styles['marginRight'] = '0px';
              styles['marginLeft'] = '8px';
            }
          } else {
            if (this.text === this.href) {
              styles['marginRight'] = '8px';
            } else {
              styles['marginLeft'] = '8px';
            }
          }
        }

        if (this.iconAfter) {
          styles['marginRight'] = '8px';
        }
        return { ...styles };
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import './buttons';

</style>
