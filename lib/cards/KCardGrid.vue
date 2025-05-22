<template>

  <div>
    <div
      v-if="showGrid"
      class="k-card-grid"
    >
      <transition
        name="fade"
        mode="out-in"
        appear
      >
        <ul
          v-if="isLoading"
          key="loading"
          :style="gridStyle"
        >
          <SkeletonCard
            v-for="i in skeletonCount"
            :key="i"
            :height="skeletonHeight"
            :orientation="skeletonOrientation"
            :thumbnailDisplay="skeletonThumbnailDisplay"
            :thumbnailAlign="skeletonThumbnailAlign"
          />
        </ul>
        <ul
          v-else
          key="loaded"
          :style="gridStyle"
        >
          <!-- @slot Slot for `KCard`s -->
          <slot></slot>
        </ul>
      </transition>

      <div
        v-if="debug"
        class="k-debug"
      >
        <div>DEBUG</div>
        <div>breakpoint: {{ windowBreakpoint }}</div>
      </div>
    </div>
  </div>

</template>


<script>

  import { watch, ref, provide } from 'vue';

  import { LAYOUT_1_1_1, LAYOUT_1_2_2, LAYOUT_1_2_3 } from './gridBaseLayouts';
  import useGridLayout from './useGridLayout';
  import useGridLoading from './useGridLoading';
  import useGridMetrics from './useGridMetrics';
  import SkeletonCard from './SkeletonCard';

  /**
   * Displays a grid of cards `KCard`.
   */
  export default {
    name: 'KCardGrid',
    components: {
      SkeletonCard,
    },
    setup(props) {
      if (props.syncCardsMetrics) {
        useGridMetrics();
      }
      const { currentBreakpointConfig, windowBreakpoint } = useGridLayout(props);
      const {
        showGrid,
        isLoading,
        skeletonCount,
        skeletonHeight,
        skeletonOrientation,
        skeletonThumbnailDisplay,
        skeletonThumbnailAlign,
      } = useGridLoading(props);

      const gridStyle = ref({});
      const gridItemStyle = ref({});

      watch(
        currentBreakpointConfig,
        newValue => {
          if (!newValue) {
            return;
          }

          const { cardsPerRow, columnGap, rowGap } = newValue;

          gridStyle.value = {
            'column-gap': columnGap,
            'row-gap': rowGap,
          };
          gridItemStyle.value = {
            // remove all column gaps widths from the available width and
            // then divide by the number of cards per row to get a single card width
            // do not use `flex-basis` to avoid rounding errors
            // causing incorrect display on some screen sizes
            width: `calc((100% - ${cardsPerRow - 1} * ${columnGap}) / ${cardsPerRow})`,
          };
        },
        {
          immediate: true,
        },
      );

      // provide to `KCard`
      // controls the width and layout of `KCard` items in the grid
      provide('gridItemStyle', gridItemStyle);

      return {
        windowBreakpoint,
        gridStyle,
        isLoading,
        showGrid,
        skeletonCount,
        skeletonHeight,
        skeletonOrientation,
        skeletonThumbnailDisplay,
        skeletonThumbnailAlign,
      };
    },
    props: {
      /**
       * Sets the base grid layout.
       * Options: `'1-1-1'`, `'1-2-2'`, and `'1-2-3'`.
       */
      // eslint-disable-next-line vue/no-unused-properties
      layout: {
        required: false,
        type: String,
        default: '1-2-2',
        validator: value => {
          return [LAYOUT_1_1_1, LAYOUT_1_2_2, LAYOUT_1_2_3].includes(value);
        },
      },
      /**
       * Overrides the base grid `layout` for chosen breakpoints levels
       */
      // eslint-disable-next-line vue/no-unused-properties
      layoutOverride: {
        type: Array,
        required: false,
        default: null,
      },
      /**
       * Set to `true` as long as data for cards
       * are being loaded to display loading skeletons
       */
      // eslint-disable-next-line vue/no-unused-properties
      loading: {
        type: Boolean,
        default: false,
      },
      /**
       * Configures loading skeletons
       */
      // eslint-disable-next-line vue/no-unused-properties
      skeletonsConfig: {
        type: Array,
        required: false,
        default: null,
      },
      /**
       * Use for development only. Shows information in
       * the grid's corner that is useful for configuring
       * loading skeletons.
       *
       */
      debug: {
        type: Boolean,
        default: false,
      },
      /**
       * Enables the `syncCardsMetrics` feature.
       * This feature is used to synchronize the metrics of
       * cards in the grid, e.g. when you have some cards with
       * a select control and some without it, this will make that
       * all cards have the same space for the select control.
       */
      syncCardsMetrics: {
        type: Boolean,
        default: true,
      },
    },
  };

</script>


<style lang="scss" scoped>

  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-active,
  .fade-appear-active {
    transition: opacity 0.5s ease;
  }

  .fade-leave-to {
    opacity: 0.2;
  }

  .fade-enter,
  .fade-appear {
    opacity: 0;
  }

  .k-card-grid {
    position: relative; // for '.debug' absolute positioning
  }

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .k-debug {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    padding: 20px;
    color: white;
    background-color: rgb(41, 49, 207);

    div:first-child {
      text-decoration: underline;
    }
  }

</style>
