import { watch, ref } from '@vue/composition-api';

import useKResponsiveWindow from '../composables/useKResponsiveWindow';

import { LAYOUT_CONFIGS } from './gridBaseLayouts';

/**
 * Observes window size and returns the grid layout
 * configuration object for the current breakpoint.
 */
export default function useResponsiveGridLayout(props) {
  const currentBreakpointConfig = ref({});

  const { windowBreakpoint } = useKResponsiveWindow();

  function getBreakpointConfig(config, breakpoint) {
    const breakpointConfig = config.find(subConfig => subConfig.breakpoints.includes(breakpoint));
    return breakpointConfig;
  }

  /**
   *
   * @param {Object} props `KCardGrid` props
   * @param {Number} breakpoint Breakpoint 0-7
   *
   * @returns {Object} The grid layout configuration object
   *                   for the `breakpoint`
   */
  function getLayoutConfigForBreakpoint(props, breakpoint) {
    const baseLayoutConfig = LAYOUT_CONFIGS[props.layout];
    const baseBreakpointConfig = getBreakpointConfig(baseLayoutConfig, breakpoint);
    return { ...baseBreakpointConfig };
  }

  watch(
    windowBreakpoint,
    (newBreakpoint, oldBreakpoint) => {
      // can happen very briefly before the breakpoint value gets calculated
      if (newBreakpoint === null) {
        currentBreakpointConfig.value = getLayoutConfigForBreakpoint(props, 0);
      }
      if (newBreakpoint !== oldBreakpoint) {
        currentBreakpointConfig.value = getLayoutConfigForBreakpoint(props, newBreakpoint);
      }
    },
    { immediate: true }
  );

  return { currentBreakpointConfig };
}
