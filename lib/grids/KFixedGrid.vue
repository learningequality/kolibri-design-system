<template>

  <div style="direction: inherit;">
    <div class="pure-g" :style="style">
      <!-- @slot Children of a `KFixedGrid` must be `KFixedGridItem` components -->
      <slot></slot>
    </div>
    <Overlay
      v-if="debug"
      :cols="actualNumCols"
      :gutterWidth="windowGutter"
    />
  </div>

</template>


<script>

  import useKResponsiveWindow from '../composables/useKResponsiveWindow';
  import Overlay from './Overlay';
  import { validateGutter } from './common';

  /**
   * Grid layout with a fixed number of columns
   */
  export default {
    name: 'KFixedGrid',
    components: { Overlay },
    setup() {
      const { windowGutter } = useKResponsiveWindow();
      return { windowGutter };
    },
    props: {
      /**
       * The number of columns. Can be an integer between `2` and `12`
       */
      numCols: {
        type: [Number, String],
        required: true,
        validator(value) {
          if (value < 2 || value > 12) {
            // eslint-disable-next-line no-console
            console.error(`Number of columns (${value}) must be between 2 and 12`);
            return false;
          }
          return true;
        },
      },
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
      actualNumCols() {
        return parseInt(this.numCols);
      },
      actualGutterSize() {
        if (this.gutter !== null) {
          return this.gutter;
        }
        return this.windowGutter;
      },
      marginOffset() {
        // Inner grid items use padding to define gutters, but then we need
        // to bring them back flush with the outer edges.
        return `${(-1 * this.actualGutterSize) / 2}px`;
      },
      style() {
        const style = { marginLeft: this.marginOffset, marginRight: this.marginOffset };
        Object.assign(style, this.gridStyle);
        return style;
      },
    },
    provide() {
      // Injects reactive attributes to grid items:
      // https://medium.com/@znck/provide-inject-in-vue-2-2-b6473a7f7816
      const gridMetrics = {};
      Object.defineProperty(gridMetrics, 'numCols', {
        enumerable: true,
        get: () => this.actualNumCols,
      });
      Object.defineProperty(gridMetrics, 'gutterWidth', {
        enumerable: true,
        get: () => this.actualGutterSize,
      });
      Object.defineProperty(gridMetrics, 'direction', {
        enumerable: true,
        get: () => (this.$el ? getComputedStyle(this.$el).direction : null),
      });
      Object.defineProperty(gridMetrics, 'debug', {
        enumerable: true,
        get: () => this.debug,
      });
      return { gridMetrics };
    },
  };

</script>


<style lang="scss"></style>
