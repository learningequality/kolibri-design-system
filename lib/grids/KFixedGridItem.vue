<template>

  <div class="grid-item" :class="unitClass" :style="computedStyle">
    <div
      :class="{ debug: gridMetrics.debug, error: !validInputs }"
      :dir="alignment === 'auto' ? 'auto' : null"
    >
      <!-- @slot Contents of the grid item -->
      <slot></slot>
    </div>
  </div>

</template>


<script>

  import { validateAlignment, validateSpan } from './common';

  /**
   * Basic fixed grid item
   */
  export default {
    name: 'KFixedGridItem',
    props: {
      /**
       * Number of grid columns that the item should span.
       *
       * If not provided, the item will span the full width of the grid.
       */
      span: {
        type: [Number, String],
        default: null,
        validator: validateSpan,
      },
      /**
       * Horizontal alignment of the item's contents. `'left'`, `'right'`,
       * and `'center'` will set `text-align`. `'auto'` will set `dir="auto"`
       * for user-generated content to support bidirectional text.
       */
      alignment: {
        type: String,
        default: 'left',
        validator: validateAlignment,
      },
    },
    inject: ['gridMetrics'], // provided by the parent grid component
    computed: {
      computedSpan() {
        if (this.span === null) {
          return this.gridMetrics.numCols;
        }
        return parseInt(this.span);
      },
      unitClass() {
        const size = this.computedSpan;
        const numCols = this.gridMetrics.numCols;
        // handle percentage
        if (this.percentage) {
          return `pure-u-${(24 * size) / 100}-24`;
        }
        // handle size in number of columns
        if (24 % numCols === 0) {
          // handled by Pure's built-in 24-column units
          return `pure-u-${(24 * size) / numCols}-24`;
        }
        // handled by our custom extra units
        return `pure-u-${size}-${numCols}`;
      },
      computedStyle() {
        const padding = `${this.gridMetrics.gutterWidth / 2}px`;
        const style = {
          paddingLeft: padding,
          paddingRight: padding,
        };

        // no text-align should be set - handled by dir="auto"
        if (this.alignment === 'auto') {
          return style;
        }

        // centered regardless of RTL
        if (this.alignment === 'center') {
          style.textAlign = 'center';
          return style;
        }

        // handle left and right alignment
        let isRtl = this.isRtl;
        if (this.gridMetrics && this.gridMetrics.direction) {
          isRtl = this.gridMetrics.direction === 'rtl';
        }
        if (isRtl && this.alignment === 'left') {
          style.textAlign = 'right';
        } else if (isRtl && this.alignment === 'right') {
          style.textAlign = 'left';
        } else {
          style.textAlign = this.alignment;
        }
        return style;
      },
      validInputs() {
        if (!this.gridMetrics || !this.gridMetrics.numCols || !this.gridMetrics.gutterWidth) {
          // eslint-disable-next-line no-console
          console.error('Grid metrics were not provided by parent');
          return false;
        }

        if (this.computedSpan > this.gridMetrics.numCols) {
          // eslint-disable-next-line no-console
          console.error(
            `Item span (${this.computedSpan}) is larger than grid size (${this.gridMetrics.numCols})`
          );
          return false;
        }
        return true;
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '../styles/definitions';

  .grid-item {
    // override pure grid default font family
    @include font-family-noto;
  }

  .debug {
    border: 1px solid #e6c003;
  }

  .error {
    border: 2px solid red !important;
  }

</style>
