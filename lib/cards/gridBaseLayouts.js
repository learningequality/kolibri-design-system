/**
 * Contains configurations for base card grid layouts
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
  // Provides sufficiently reasonable default behavior
  // for all card layouts when the row height is not specified.
  // However, to make some of the cards sections' heights
  // follow the designs as closely as possible, we expect `KCardGrid`'s
  // consumers to set the row height explicitly so that calculations
  // can be made more accurately. This concerns, for example,
  // height of the thumbnail area in vertical layouts.
  rowHeight: 'max-content',
};

/**
 * Layout configuration for '1-2' grid,
 * that is a grid with
 * - 1 column on smaller screens
 * - 2 columns on medium and larger screens
 */
const LAYOUT_CONFIG_1_2 = {
  [LEVEL_0]: {
    columns: 1,
    ...levelCommon,
  },
  [LEVEL_1]: {
    columns: 1,
    ...levelCommon,
  },
  [LEVEL_2]: {
    columns: 2,
    ...levelCommon,
  },
  [LEVEL_3]: {
    columns: 2,
    ...levelCommon,
  },
  [LEVEL_4]: {
    columns: 2,
    ...levelCommon,
  },
  [LEVEL_5]: {
    columns: 2,
    ...levelCommon,
  },
  [LEVEL_6]: {
    columns: 2,
    ...levelCommon,
  },
  [LEVEL_7]: {
    columns: 2,
    ...levelCommon,
  },
};

/**
 * Layout configuration for '1-2-3' grid,
 * that is a grid with
 * - 1 column on smaller screens
 * - 2 columns on medium screens
 * - 3 columns on larger screens
 */
const LAYOUT_CONFIG_1_2_3 = {
  [LEVEL_0]: {
    columns: 1,
    ...levelCommon,
  },
  [LEVEL_1]: {
    columns: 1,
    ...levelCommon,
  },
  [LEVEL_2]: {
    columns: 2,
    ...levelCommon,
  },
  [LEVEL_3]: {
    columns: 2,
    ...levelCommon,
  },
  [LEVEL_4]: {
    columns: 3,
    ...levelCommon,
  },
  [LEVEL_5]: {
    columns: 3,
    ...levelCommon,
  },
  [LEVEL_6]: {
    columns: 3,
    ...levelCommon,
  },
  [LEVEL_7]: {
    columns: 3,
    ...levelCommon,
  },
};

export const LAYOUT_1_2 = '1-2';
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
  [LAYOUT_1_2]: LAYOUT_CONFIG_1_2,
  [LAYOUT_1_2_3]: LAYOUT_CONFIG_1_2_3,
};
