import { getBreakpointConfig } from '../utils';

const config = [
  {
    breakpoints: [2, 3],
    count: 1,
    orientation: 'vertical',
    thumbnailDisplay: 'small',
    thumbnailAlign: 'right',
  },
  {
    breakpoints: [4, 5, 6, 7],
    count: 2,
    orientation: 'horizontal',
    thumbnailDisplay: 'large',
    thumbnailAlign: 'left',
  },
  {
    breakpoints: [4, 5],
    height: '250px',
  },
  {
    breakpoints: [5],
    height: '200px',
  },
];

describe('getBreakpointConfig', () => {
  it('returns the correct breakpoint config', () => {
    expect(getBreakpointConfig(config, 2)).toEqual({
      count: 1,
      orientation: 'vertical',
      thumbnailDisplay: 'small',
      thumbnailAlign: 'right',
    });
  });

  it('populates all configuration for a breakpoint that overlaps multiple sub-configs', () => {
    expect(getBreakpointConfig(config, 4)).toEqual({
      count: 2,
      orientation: 'horizontal',
      thumbnailDisplay: 'large',
      thumbnailAlign: 'left',
      height: '250px',
    });
  });

  it('gives preference to a last value for a breakpoint that overlaps multiple sub-configs with competing values', () => {
    expect(getBreakpointConfig(config, 5)).toEqual({
      count: 2,
      orientation: 'horizontal',
      thumbnailDisplay: 'large',
      thumbnailAlign: 'left',
      height: '200px',
    });
  });

  it('returns undefined if the config array is empty or undefined', () => {
    expect(getBreakpointConfig([], 5)).toBeUndefined();
    expect(getBreakpointConfig(undefined, 5)).toBeUndefined();
  });

  it('returns undefined if no matching breakpoints are found', () => {
    expect(getBreakpointConfig(config, 1)).toBeUndefined();
  });
});
