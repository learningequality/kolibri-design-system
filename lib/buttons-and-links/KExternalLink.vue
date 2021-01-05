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
        :style="iconStyle"
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
       * If link opens in new tab, add 8px margin between the icon and the text
       */
      spanStyle() {
        let styles = {};
        if (this.openInNewTab) {
          if (this.isRtl) {
            styles['marginRight'] = '8px';
            if (this.text !== this.href) {
              styles['marginRight'] = '0px';
              styles['marginLeft'] = '8px';
            }
          } else {
            styles['marginRight'] = '8px';
          }
        }
        return { ...styles };
      },
      /**
       * Changes icon direction according to language of text of URL
       */
      iconStyle() {
        let styles = { top: '4px' };
        if (this.text === this.href) {
          styles['transform'] = 'scaleX(1)';
        }
        return { ...styles };
      },
    },
    methods: {},
  };

</script>


<style lang="scss" scoped>

  @import './buttons';

</style>
