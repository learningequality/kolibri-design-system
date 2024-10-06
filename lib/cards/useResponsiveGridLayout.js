import cloneDeep from 'lodash/cloneDeep';
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

  /**
   * Get configuration object for a breakpoint.
   *
   * @param {Array} config A configuration in the same format as in LAYOUT_CONFIGS
   * @param {Number} breakpoint 0-7
   *
   * @returns {Object} The configuration object corresponding to the `breakpoint`
   */
  function getBreakpointConfig(config, breakpoint) {
    if (!config || !config.length) {
      return undefined;
    }
    return config.find(
      subConfig => subConfig.breakpoints && subConfig.breakpoints.includes(breakpoint)
    );
  }

  /**
   * Obtains the base grid layout configuration object
   * for the given breakpoint. If `layoutOverride`
   * is defined, applies overrides and returns the final
   * grid layout configuration.
   *
   * @param {Object} props `KCardGrid` props
   * @param {Number} breakpoint Breakpoint 0-7
   *
   * @returns {Object} The final grid layout configuration
   *                   object for the `breakpoint`
   */
  function getLayoutConfigForBreakpoint(props, breakpoint) {
    if (breakpoint === null || breakpoint === undefined) {
      return getLayoutConfigForBreakpoint(props, 0);
    }
    // Obtain the base layout configuration for the breakpoint
    const baseLayoutConfig = LAYOUT_CONFIGS[props.layout];
    const baseBreakpointConfig = getBreakpointConfig(baseLayoutConfig, breakpoint);

    // Deep clone to protect mutating LAYOUT_CONFIGS
    const finalBreakpointConfig = cloneDeep(baseBreakpointConfig);

    // Remove `breakpoints` attribute as it's not needed
    delete finalBreakpointConfig.breakpoints;

    // Override if `layoutOverride` contains
    // settings for the breakpoint
    const breakpointOverride = getBreakpointConfig(props.layoutOverride, breakpoint);
    if (breakpointOverride) {
      for (const key of ['cardsPerRow', 'columnGap', 'rowGap']) {
        if (breakpointOverride[key]) {
          finalBreakpointConfig[key] = breakpointOverride[key];
        }
      }
    }

    return finalBreakpointConfig;
  }

  // Watch props too to make `layout` and `layoutOverride` reactive
  watch(
    [windowBreakpoint, props],
    ([newBreakpoint]) => {
      currentBreakpointConfig.value = getLayoutConfigForBreakpoint(props, newBreakpoint);
    },
    { immediate: true, deep: true }
  );

  return { currentBreakpointConfig };
}
