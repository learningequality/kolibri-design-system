import merge from 'lodash/merge';
import { watch, ref } from '@vue/composition-api';

import useKResponsiveWindow from '../composables/useKResponsiveWindow';

import { LAYOUT_CONFIGS, LEVELS } from './gridBaseLayouts';

/**
 * Observes the current breakpoint level
 * and returns the grid layout configuration
 * for the level.
 */
export default function useGridLayout(props) {
  // final layout configuration values
  // for the current breakpoint level
  const currentLevelConfig = ref({});

  const { windowBreakpoint } = useKResponsiveWindow();

  // TODO: Unit test this function
  /**
   * Merges the base layout configuration for the given
   * breakpoint level with the configuration from props.
   * 
   * @param {Object} props `KCardGrid` props
   * @param {Number} breakpoint The breakpoint level 0-7
  
   * @returns {Object} The final layout configuration
   *                   for the given breakpoint level
   */
  function getLevelLayoutConfig(props, breakpoint) {
    const baseLayoutConfig = LAYOUT_CONFIGS[props.layout];
    const baseLevelConfig = baseLayoutConfig[LEVELS[breakpoint]];

    // base level configuration
    const levelConfig1 = { ...baseLevelConfig };
    // configuration from props affecting all breakpoints,
    // such as `columns`, `columnGap`, ...
    const levelConfig2 = {};
    // configuration from the `gridLayout` prop
    // for the given breakpoint level
    const levelConfig3 = {};

    if (props.columns) {
      levelConfig2.columns = props.columns;
    }
    if (props.columnGap) {
      levelConfig2.columnGap = props.columnGap;
    }
    if (props.rowGap) {
      levelConfig2.rowGap = props.rowGap;
    }
    if (props.rowHeight) {
      levelConfig2.rowHeight = props.rowHeight;
    }

    // does `layoutConfig` contains settings for the current breakpoint level?
    if (
      props.layoutConfig &&
      Object.keys(props.layoutConfig).length > 0 &&
      LEVELS[breakpoint] in props.layoutConfig
    ) {
      const layoutConfigLevel = props.layoutConfig[LEVELS[breakpoint]];

      if (layoutConfigLevel.columns) {
        levelConfig3.columns = layoutConfigLevel.columns;
      }
      if (layoutConfigLevel.columnGap) {
        levelConfig3.columnGap = layoutConfigLevel.columnGap;
      }
      if (layoutConfigLevel.rowGap) {
        levelConfig3.rowGap = layoutConfigLevel.rowGap;
      }
      if (layoutConfigLevel.rowHeight) {
        levelConfig3.rowHeight = layoutConfigLevel.rowHeight;
      }
    }

    return merge({}, levelConfig1, levelConfig2, levelConfig3);
  }

  watch(
    windowBreakpoint,
    (newBreakpoint, oldBreakpoint) => {
      // can happen very briefly before the breakpoint value gets calculated
      if (newBreakpoint === null) {
        currentLevelConfig.value = getLevelLayoutConfig(props, 0);
      }
      if (newBreakpoint !== oldBreakpoint) {
        currentLevelConfig.value = getLevelLayoutConfig(props, newBreakpoint);
      }
    },
    { immediate: true }
  );

  return { currentLevelConfig };
}
