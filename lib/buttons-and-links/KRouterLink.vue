<template>

  <!-- no extra whitespace inside link -->

  <!-- The use of @mouseover.native and @mouseleave.native allows us to
  listen to the DOM events directly, since routerlink does not emit those
  events -->

  <router-link
    :class="buttonClasses"
    :to="to"
    :replace="replace"
    dir="auto"
    @mouseover.native="hovering = true"
    @mouseleave.native="hovering = false"
  >

    <slot name="icon">
      <KIcon
        v-if="icon"
        :icon="icon"
        style="top: 4px;"
        :color="hovering ? $themeTokens.primaryDark : $themeTokens.primary"
      />
    </slot>

    <slot v-if="$slots.default"></slot>

    <template v-else>
      <span class="link-text" :style="spanStyle">{{ text }}</span>
    </template>

    <slot name="iconAfter">
      <KIcon
        v-if="iconAfter"
        :icon="iconAfter"
        style="top: 4px;"
        :color="hovering ? $themeTokens.primaryDark : $themeTokens.primary"
      />
    </slot>
  </router-link>

</template>


<script>

  import buttonMixin from './buttonMixin.js';

  /**
   * KRouterLink creates a styled router-link
   */
  export default {
    name: 'KRouterLink',
    mixins: [buttonMixin],
    props: {
      /**
       * vue-router link object
       */
      to: {
        required: true,
        type: Object,
      },
      /**
       * If provided, shows a KIcon in front of the text
       */
      icon: {
        type: String,
        default: null,
      },
      /**
       * Use window.history.replaceState() so navigation will not leave history record
       */
      replace: {
        type: Boolean,
        default: false,
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
       * If icon is provided, add 8px margin between the icon and the text
       */
      spanStyle() {
        let styles = {};
        if (this.icon) {
          if (this.isRtl) {
            // If RTL-language, but English link, displays correct margins
            styles['marginRight'] = '8px';
            // Checks to see if link is in same dir as page lang
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
