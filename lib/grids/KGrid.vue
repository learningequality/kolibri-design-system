<template>

  <KFixedGrid
    :numCols="windowGridColumns"
    :gutter="gutter"
    :gridStyle="gridStyle"
    :debug="debug"
  >
    <!-- @slot Children of a `KFixedGrid` must be `KGridItem` components -->
    <slot></slot>
  </KFixedGrid>

</template>


<script>

  import useKResponsiveWindow from '../composables/useKResponsiveWindow';
  import KFixedGrid from './KFixedGrid';
  import { validateGutter } from './common';

  /**
   * Grid layout with a dynamic number of columns based on the current window width.
   *
   * The grid will have 4 columns for small windows (width < 840px), 8 columns
   * for medium windows (840 px <= width < 960), and 12 columns for large windows
   * (960px <=  width)
   */
  export default {
    name: 'KGrid',
    components: { KFixedGrid },
    setup() {
      const { windowIsSmall, windowIsMedium } = useKResponsiveWindow();
      return { windowIsSmall, windowIsMedium };
    },
    props: {
      /**
       * The size of column gutters in pixels. If not provided, the gutter is set to `16px`
       * if either window dimension is less than `600px`, and set to `24px` otherwise.
       */
      gutter: {
        type: [Number, String],
        default: null,
        validator: validateGutter,
      },
      /**
       * @ignore
       * EXPERIMENTAL: Extra styles to attach to the internal grid DOM node
       */
      gridStyle: {
        type: Object,
        default: () => ({}),
      },
      /**
       * Show gridlines for debugging purposes
       */
      debug: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      windowGridColumns() {
        if (this.windowIsSmall) {
          return 4;
        }
        if (this.windowIsMedium) {
          return 8;
        }
        // windowIsLarge
        return 12;
      },
    },
  };

</script>


<style lang="scss"></style>
