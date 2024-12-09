import cloneDeep from 'lodash/cloneDeep';
import { watch, ref } from '@vue/composition-api';

import useKResponsiveWindow from '../composables/useKResponsiveWindow';

import { LAYOUT_CONFIGS } from './gridBaseLayouts';
import { getBreakpointConfig } from './utils';

/**
 * Observes window size and returns the grid layout
 * configuration object for the current breakpoint.
 */
export default function useGridLayout(layout, layoutOverride) {
  const currentBreakpointConfig = ref({});
  const { windowBreakpoint } = useKResponsiveWindow();

  /**
   * Obtains the base grid layout configuration object
   * for the given breakpoint. If `layoutOverride`
   * is defined, applies overrides and returns the final
   * grid layout configuration.
   *
   * @param {Number} breakpoint Breakpoint 0-7
   *
   * @returns {Object} The final grid layout configuration
   *                   object for the `breakpoint`
   */
  function getLayoutConfigForBreakpoint(breakpoint) {
    if (breakpoint === null || breakpoint === undefined) {
      return getLayoutConfigForBreakpoint(0);
    }
    // Obtain the base layout configuration for the breakpoint
    const baseLayoutConfig = LAYOUT_CONFIGS[layout.value];
    const baseBreakpointConfig = getBreakpointConfig(baseLayoutConfig, breakpoint);

    // Deep clone to protect mutating LAYOUT_CONFIGS
    const finalBreakpointConfig = cloneDeep(baseBreakpointConfig);

    // Remove `breakpoints` attribute as it's not needed
    delete finalBreakpointConfig.breakpoints;

    // Override if `layoutOverride` contains
    // settings for the breakpoint
    const breakpointOverride = getBreakpointConfig(layoutOverride.value, breakpoint);
    if (breakpointOverride) {
      for (const key of ['cardsPerRow', 'columnGap', 'rowGap']) {
        if (breakpointOverride[key]) {
          finalBreakpointConfig[key] = breakpointOverride[key];
        }
      }
    }

    return finalBreakpointConfig;
  }

  watch(
    [windowBreakpoint, layout, layoutOverride],
    ([newBreakpoint]) => {
      currentBreakpointConfig.value = getLayoutConfigForBreakpoint(newBreakpoint);
    },
    { immediate: true, deep: true }
  );

  return { currentBreakpointConfig, windowBreakpoint };
}
