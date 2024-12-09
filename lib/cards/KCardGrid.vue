<template>

  <div class="card-grid">
    <ul :style="gridStyle">
      <!-- @slot Slot for `KCard`s -->
      <slot></slot>
    </ul>

    <div
      v-if="debug"
      class="debug"
    >
      <div>DEBUG</div>
      <div>breakpoint: {{ windowBreakpoint }}</div>
    </div>
  </div>

</template>


<script>

  import { watch, ref, provide, toRefs } from '@vue/composition-api';

  import { LAYOUT_1_1_1, LAYOUT_1_2_2, LAYOUT_1_2_3 } from './gridBaseLayouts';
  import useGridLayout from './useGridLayout';
  /*   import useGridLoading from './useGridLoading'; */
  /* import SkeletonCard from './SkeletonCard';
   */
  /**
   * Displays a grid of cards `KCard`.
   */
  export default {
    name: 'KCardGrid',
    /* components: {
          SkeletonCard,
        }, */
    setup(props) {
      const { layout, layoutOverride } = toRefs(props);
      const { currentBreakpointConfig, windowBreakpoint } = useGridLayout(layout, layoutOverride);

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
            // remove all column gaps widths from the available width and then divide by the number of cards per row to get a single card width
            // do not use `flex-basis` to avoid rounding errors causing incorrect display on some screen sizes
            width: `calc((100% - ${cardsPerRow - 1} * ${columnGap}) / ${cardsPerRow})`,
          };
        },
        {
          immediate: true,
        }
      );

      // provide to `KCard`
      // controls the width and layout of `KCard` items in the grid
      provide('gridItemStyle', gridItemStyle);

      return {
        windowBreakpoint,
        gridStyle,
      };
    },
    props: {
      /**
       * Sets the base grid layout.
       * Options: `'1-1-1'`, `'1-2-2'`, and `'1-2-3'`.
       */
      // eslint-disable-next-line kolibri/vue-no-unused-properties
      layout: {
        required: false,
        type: String,
        default: '1-2-2',
        validator: value => {
          return [LAYOUT_1_1_1, LAYOUT_1_2_2, LAYOUT_1_2_3].includes(value);
        },
      },
      // eslint-enable-next-line kolibri/vue-no-unused-properties
      /**
       * Overrides the base grid `layout` for chosen breakpoints levels
       */
      // eslint-disable-next-line kolibri/vue-no-unused-properties
      layoutOverride: {
        type: Array,
        required: false,
        default: null,
      },
      // eslint-enable-next-line kolibri/vue-no-unused-properties
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
    },
  };

</script>


<style lang="scss" scoped>

  .card-grid {
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

  .debug {
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