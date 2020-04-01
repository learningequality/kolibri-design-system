<template>

  <!-- no extra whitespace inside link -->
  <router-link :class="buttonClasses" :to="to" dir="auto">
    <span @mouseenter="hovering = true" @mouseleave="hovering = false">
      <KIcon
        v-if="icon"
        :icon="icon"
        style="top: 4px;"
        :color="hovering ? $themeTokens.primaryDark : $themeTokens.primary"
      />
      <!-- Keep on the same line to avoid empty underlined spacing -->
      <span :style="spanStyle">{{ text }}</span>
    </span>
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
        required: false,
      }
    },
    data() {
      return {
        hovering: false,
      }
    },
    computed: {
      /**
       * If icon is provided, add 8px margin between the icon and the text
       */
      spanStyle() {
        if(this.icon) {
          if(this.isRtl) {
            return { marginRight: '8px' }
          } else {
            return { marginLeft: '8px' };
          }
        } else {
          return {};
        }
      }
    },
  };

</script>


<style lang="scss" scoped>

  @import './buttons';

</style>
