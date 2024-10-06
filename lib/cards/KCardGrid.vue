<template>

  <ul
    class="card-grid"
    :style="gridStyle"
  >
    <!-- @slot Slot for `KCard`s -->
    <slot></slot>
  </ul>

</template>


<script>

  import { watch, ref, provide } from '@vue/composition-api';

  import { LAYOUT_1_1_1, LAYOUT_1_2_2, LAYOUT_1_2_3 } from './gridBaseLayouts';
  import useResponsiveGridLayout from './useResponsiveGridLayout';

  /**
   * Displays a grid of cards `KCard`.
   *
   * Offers default behavior corresponding to the most
   * commonly used grids, as well as advance configuration
   * via `useKCardGrid` to customize a base grid layout
   * or even completely override it.
   */
  export default {
    name: 'KCardGrid',

    setup(props) {
      const { currentBreakpointConfig } = useResponsiveGridLayout(props);

      const gridStyle = ref({});
      const gridItemStyle = ref({});

      watch(
        currentBreakpointConfig,
        newValue => {
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
    },
  };

</script>


<style lang="scss" scoped>

  .card-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    padding: 0;
    margin: 0;
    list-style: none;
  }

</style>