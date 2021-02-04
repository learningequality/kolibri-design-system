<template>

  <!-- no extra whitespace inside link -->
  <router-link :class="buttonClasses" :to="to" dir="auto">
    <KLabeledIcon
      :maxWidth="maxWidth"
      :icon="icon"
      :iconAfter="iconAfter"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >

      <!-- Keep on the same line to avoid empty underlined spacing -->
      <slot name="text" :text="text">
        <span class="link-text">{{ text }}</span>
      </slot>

    </KLabeledIcon>
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
      },
      /**
       * If provided, shows a KIcon after the text
       */
      iconAfter: {
        type: String,
        required: false,
      },
      /**
       * Set a max width for content
       */
      maxWidth: {
        type: String,
        required: false,
        default: '100%',
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

</style>
