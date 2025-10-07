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
    <span class="kexlink-inner">
      <!-- @slot Slot alternative to the `icon` prop -->
      <slot name="icon">
        <KIcon
          v-if="icon"
          :icon="icon"
          style="top: 4px"
          :color="iconColor"
        />
      </slot>

      <slot v-if="$slots.default"></slot>

      <template v-else>
        <span class="link-text">{{ text }}</span>
      </template>

      <slot name="iconAfter">
        <KIcon
          v-if="iconAfter"
          :icon="iconAfter"
          style="top: 4px"
          :color="iconColor"
        />
      </slot>
      <KIcon
        v-if="openInNewTab"
        icon="openNewTab"
        style="top: 4px"
        :color="iconColor"
      />
    </span>
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
        default: null,
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
  };

</script>


<style lang="scss" scoped>

  @import './buttons';

  .kexlink-inner {
    display: inline-flex;
    gap: 8px;
    align-items: baseline;
  }

</style>
