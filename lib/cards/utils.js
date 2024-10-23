/**
 * Get final configuration object for a breakpoint
 *
 * @param {Array} config A configuration in the same format as in LAYOUT_CONFIGS
 * @param {Number} breakpoint 0-7
 *
 * @returns {Object} The configuration object for the `breakpoint`
 */
export function getBreakpointConfig(config, breakpoint) {
  if (!config || !config.length) {
    return undefined;
  }

  // The same breakpoint can be used in multiple configuration
  // objects so here filter all matching configurations objects
  // for the breakpoint...
  const matchingConfigs = config.filter(
    breakpointConfig =>
      breakpointConfig.breakpoints && breakpointConfig.breakpoints.includes(breakpoint)
  );

  // ...and populate all configurations related to the breakpoint
  // to its final configuration object.
  // If there are competing values, give preference to the last one
  const result = {};
  matchingConfigs.forEach(breakpointConfig => {
    Object.keys(breakpointConfig).forEach(key => {
      if (key !== 'breakpoints') {
        result[key] = breakpointConfig[key];
      }
    });
  });

  return Object.keys(result).length ? result : undefined;
}
