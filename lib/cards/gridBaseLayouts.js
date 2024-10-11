/**
 * Contains configurations for the base card grid layouts
 * corresponding to the most commonly used grids in our designs.
 */

// Breakpoint levels
// Correspond to https://design-system.learningequality.org/layout/#responsiveness
const LEVEL_0 = 'level-0';
const LEVEL_1 = 'level-1';
const LEVEL_2 = 'level-2';
const LEVEL_3 = 'level-3';
const LEVEL_4 = 'level-4';
const LEVEL_5 = 'level-5';
const LEVEL_6 = 'level-6';
const LEVEL_7 = 'level-7';

// Settings common to all breakpoint levels
const levelCommon = {
  columnGap: '30px',
  rowGap: '30px',
};

/**
 * Configuration for '1-1-1' grid,
 * that is a grid with 1 card per row
 * on all screen sizes.
 */
const LAYOUT_CONFIG_1_1_1 = {
  [LEVEL_0]: {
    cardsPerRow: 1,
    ...levelCommon,
  },
  [LEVEL_1]: {
    cardsPerRow: 1,
    ...levelCommon,
  },
  [LEVEL_2]: {
    cardsPerRow: 1,
    ...levelCommon,
  },
  [LEVEL_3]: {
    cardsPerRow: 1,
    ...levelCommon,
  },
  [LEVEL_4]: {
    cardsPerRow: 1,
    ...levelCommon,
  },
  [LEVEL_5]: {
    cardsPerRow: 1,
    ...levelCommon,
  },
  [LEVEL_6]: {
    cardsPerRow: 1,
    ...levelCommon,
  },
  [LEVEL_7]: {
    cardsPerRow: 1,
    ...levelCommon,
  },
};

/**
 * Configuration for '1-2-2' grid,
 * that is a grid with
 * - 1 card per row on smaller screens
 * - 2 cards per row on medium screens
 * - 2 cards per row on larger screens
 */
const LAYOUT_CONFIG_1_2_2 = {
  [LEVEL_0]: {
    cardsPerRow: 1,
    ...levelCommon,
  },
  [LEVEL_1]: {
    cardsPerRow: 1,
    ...levelCommon,
  },
  [LEVEL_2]: {
    cardsPerRow: 2,
    ...levelCommon,
  },
  [LEVEL_3]: {
    cardsPerRow: 2,
    ...levelCommon,
  },
  [LEVEL_4]: {
    cardsPerRow: 2,
    ...levelCommon,
  },
  [LEVEL_5]: {
    cardsPerRow: 2,
    ...levelCommon,
  },
  [LEVEL_6]: {
    cardsPerRow: 2,
    ...levelCommon,
  },
  [LEVEL_7]: {
    cardsPerRow: 2,
    ...levelCommon,
  },
};

/**
 * Configuration for '1-2-3' grid,
 * that is a grid with
 * - 1 card per row on smaller screens
 * - 2 cards per row on medium screens
 * - 3 cards per row on larger screens
 */
const LAYOUT_CONFIG_1_2_3 = {
  [LEVEL_0]: {
    cardsPerRow: 1,
    ...levelCommon,
  },
  [LEVEL_1]: {
    cardsPerRow: 1,
    ...levelCommon,
  },
  [LEVEL_2]: {
    cardsPerRow: 2,
    ...levelCommon,
  },
  [LEVEL_3]: {
    cardsPerRow: 2,
    ...levelCommon,
  },
  [LEVEL_4]: {
    cardsPerRow: 3,
    ...levelCommon,
  },
  [LEVEL_5]: {
    cardsPerRow: 3,
    ...levelCommon,
  },
  [LEVEL_6]: {
    cardsPerRow: 3,
    ...levelCommon,
  },
  [LEVEL_7]: {
    cardsPerRow: 3,
    ...levelCommon,
  },
};

export const LAYOUT_1_1_1 = '1-1-1';
export const LAYOUT_1_2_2 = '1-2-2';
export const LAYOUT_1_2_3 = '1-2-3';
export const LEVELS = {
  0: LEVEL_0,
  1: LEVEL_1,
  2: LEVEL_2,
  3: LEVEL_3,
  4: LEVEL_4,
  5: LEVEL_5,
  6: LEVEL_6,
  7: LEVEL_7,
};
export const LAYOUT_CONFIGS = {
  [LAYOUT_1_1_1]: LAYOUT_CONFIG_1_1_1,
  [LAYOUT_1_2_2]: LAYOUT_CONFIG_1_2_2,
  [LAYOUT_1_2_3]: LAYOUT_CONFIG_1_2_3,
};
