<template>

  <ul
    class="k-card-grid"
    :style="gridStyle"
  >
    <!-- @slot Slot for `KCard`s -->
    <slot></slot>
  </ul>

</template>


<script>

  import { watch, ref, provide } from '@vue/composition-api';

  import { LAYOUT_1_2, LAYOUT_1_2_3 } from './gridBaseLayouts';
  import useGridLayout from './useGridLayout';

  /**
   * Provides grid layouts for `KCard`s.
   *
   * Offers default behavior corresponding to the most
   * commonly used grids, as well as advance configuration
   * options to customize the base grid layout or even
   * completely override it.
   */
  export default {
    name: 'KCardGrid',
    setup(props) {
      const { currentLevelConfig } = useGridLayout(props);

      const gridStyle = ref({});
      // grid-related card style to be injected from `KCard`
      const cardStyle = ref({});

      watch(
        currentLevelConfig,
        newValue => {
          const { columns, columnGap, rowGap, rowHeight } = newValue;

          gridStyle.value = {
            'column-gap': columnGap,
            'row-gap': rowGap,
          };
          cardStyle.value = {
            // remove all column gaps widths from the available width and then divide by the number of columns to get the card/column width
            'flex-basis': `calc((100% - ${columns - 1} * ${columnGap}) / ${columns})`,
            height: rowHeight,
          };
        },
        {
          immediate: true,
        }
      );

      // provide to `KCard`
      provide('cardGridStyle', cardStyle);

      return {
        gridStyle,
      };
    },
    props: {
      /**
       * Sets the base grid layout.
       *
       * Available options are `'1-2'` or `'1-2-3'`.
       *
       * `'1-2'` is a grid with 1 column on smaller screens
       * and 2 columns on larger screens.
       *
       * `'1-2-3'` is a grid with 1 column on smaller screens,
       * 2 columns on medium screens, and 3 columns on larger
       * screens.
       *
       * The resulting layout can be adjusted or
       * even completely overriden by other props.
       */
      // eslint-disable-next-line kolibri/vue-no-unused-properties
      layout: {
        required: false,
        type: String,
        default: '1-2',
        validator: value => {
          return [LAYOUT_1_2, LAYOUT_1_2_3].includes(value);
        },
      },
      /**
       * Overrides the number of columns on all breakpoint levels.
       */
      // eslint-disable-next-line kolibri/vue-no-unused-properties
      columns: {
        required: false,
        type: Number,
        default: null,
      },
      /**
       * Overrides `column-gap` on all breakpoint levels.
       * Accepts standard CSS values.
       */
      // eslint-disable-next-line kolibri/vue-no-unused-properties
      columnGap: {
        required: false,
        type: String,
        default: null,
      },
      /**
       * Overrides `row-gap` on all breakpoint levels.
       * Accepts standard CSS values.
       */
      // eslint-disable-next-line kolibri/vue-no-unused-properties
      rowGap: {
        required: false,
        type: String,
        default: null,
      },
      /**
       * Overrides row `height` on all breakpoint levels.
       * Accepts standard CSS values.
       */
      // eslint-disable-next-line kolibri/vue-no-unused-properties
      rowHeight: {
        required: false,
        type: String,
        default: '',
      },
      /**
       * Overrides grid layout on chosen breakpoints levels.
       * Takes preference over other props.
       * Can be used to override only some parts of the base
       * layout or to define a completely new layout.
       *
       * For example:
       *
       * ```
       * {
       *   'level-0': {
       *     columns: 2
       *   },
       *   'level-1': {
       *      columns: 2,
       *      columnGap: '20px',
       *      rowGap: '20px'
       *    },
       *    'level-2': {
       *      rowHeight: '150px'
       *     }
       * }
       * ```
       *
       * overrides the number of columns on the breakpoint levels 0 and 1,
       * the column and row gaps on the breakpoint level 1, and the row height
       * on the breakpoint level 2.
       *
       * The levels correspond to the standard KDS layout breakpoint levels.
       *
       * Available levels: `'level-0'`, `'level-1'`,..., `'level-7'`.
       * Available level configuration: `columns`, `columnGap`,
       * `rowGap`, `rowHeight`.
       */
      // eslint-disable-next-line kolibri/vue-no-unused-properties
      layoutConfig: {
        required: false,
        type: Object,
        default: null,
      },
    },
  };

</script>


<style lang="scss" scoped>

  .k-card-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;
  }

</style>