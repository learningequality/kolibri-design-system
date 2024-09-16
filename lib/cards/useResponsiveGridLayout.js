import { watch, ref } from '@vue/composition-api';

import useKResponsiveWindow from '../composables/useKResponsiveWindow';

import { LAYOUT_CONFIGS, LEVELS } from './gridBaseLayouts';

/**
 * Observes the window breakpoint level
 * and returns the grid layout configuration
 * object for the current breakpoint level.
 */
export default function useResponsiveGridLayout(props) {
  const currentLevelConfig = ref({});

  const { windowBreakpoint } = useKResponsiveWindow();

  /**
   *
   * @param {Object} props `KCardGrid` props
   * @param {Number} breakpoint The breakpoint level 0-7
   *
   * @returns {Object} The grid layout configuration object
   *                   for the given breakpoint level
   */
  function getLevelLayoutConfig(props, breakpoint) {
    const baseLayoutConfig = LAYOUT_CONFIGS[props.layout];
    const baseLevelConfig = baseLayoutConfig[LEVELS[breakpoint]];

    return { ...baseLevelConfig };
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
