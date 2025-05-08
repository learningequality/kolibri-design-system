/**
 * Contains configurations for the base card grid layouts
 * corresponding to the most commonly used grids in our designs.
 */

// Settings common to all breakpoints
const breakpointCommon = {
  columnGap: '24px',
  rowGap: '24px',
};

/**
 * Configuration for '1-1-1' grid,
 * that is a grid with 1 card per row
 * on all screen sizes.
 *
 * Organized by breakpoints as defined in
 * https://design-system.learningequality.org/layout/#responsiveness
 */
const LAYOUT_CONFIG_1_1_1 = [
  {
    breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
    cardsPerRow: 1,
    ...breakpointCommon,
  },
];

/**
 * Configuration for '1-2-2' grid,
 * that is a grid with
 * - 1 card per row on smaller screens
 * - 2 cards per row on medium screens
 * - 2 cards per row on larger screens
 *
 * Organized by breakpoints as defined in
 * https://design-system.learningequality.org/layout/#responsiveness
 */
const LAYOUT_CONFIG_1_2_2 = [
  {
    breakpoints: [0, 1],
    cardsPerRow: 1,
    ...breakpointCommon,
  },
  {
    breakpoints: [2, 3, 4, 5, 6, 7],
    cardsPerRow: 2,
    ...breakpointCommon,
  },
];

/**
 * Configuration for '1-2-3' grid,
 * that is a grid with
 * - 1 card per row on smaller screens
 * - 2 cards per row on medium screens
 * - 3 cards per row on larger screens
 *
 * Organized by breakpoints as defined in
 * https://design-system.learningequality.org/layout/#responsiveness
 */
const LAYOUT_CONFIG_1_2_3 = [
  {
    breakpoints: [0, 1],
    cardsPerRow: 1,
    ...breakpointCommon,
  },
  {
    breakpoints: [2, 3],
    cardsPerRow: 2,
    ...breakpointCommon,
  },
  {
    breakpoints: [4, 5, 6, 7],
    cardsPerRow: 3,
    ...breakpointCommon,
  },
];

export const LAYOUT_1_1_1 = '1-1-1';
export const LAYOUT_1_2_2 = '1-2-2';
export const LAYOUT_1_2_3 = '1-2-3';

export const LAYOUT_CONFIGS = {
  [LAYOUT_1_1_1]: LAYOUT_CONFIG_1_1_1,
  [LAYOUT_1_2_2]: LAYOUT_CONFIG_1_2_2,
  [LAYOUT_1_2_3]: LAYOUT_CONFIG_1_2_3,
};
