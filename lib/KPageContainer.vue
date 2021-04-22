<template>

  <div
    class="page-container"
    :class="classes"
    :style="{ backgroundColor: $themeTokens.surface, marginTop: `${topMargin}px` }"
  >
    <!-- @slot Contents of the page container -->
    <slot></slot>
  </div>

</template>


<script>

  import KResponsiveWindowMixin from './KResponsiveWindowMixin';

  export default {
    name: 'KPageContainer',
    mixins: [KResponsiveWindowMixin],
    props: {
      /**
       * Whether or not to disable internal container padding
       */
      noPadding: {
        type: Boolean,
        default: false,
      },
      /**
       * Value in pixels for top margin
       */
      topMargin: {
        type: Number,
        default: 24,
      },
    },
    computed: {
      classes() {
        return {
          small: this.windowIsSmall,
          'no-padding': this.noPadding,
        };
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import './styles/definitions';

  .page-container {
    @extend %dropshadow-1dp;

    padding: 8px 24px 24px;
    overflow-x: auto;
    border-radius: 4px;
  }

  .no-padding {
    padding: 0;
  }

  .page-container.small {
    padding: 8px 16px 16px;
    margin-top: 0;
  }

</style>
