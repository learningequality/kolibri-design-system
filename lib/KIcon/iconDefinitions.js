import { themeTokens } from '../styles/theme';

/**
 * Defines all icons in the Kolibri Design System
 *
 * You can see the icons here: https://github.com/material-icons/material-icons/tree/master/svg
 *
 * Each key in the KolibriIcons object is the `alias` (aka `token`) used to refer to the icon
 * in the Kolibri Design System.
 *
 * Each of those keys refers to an object
 *
 * That object includes the following properties. Only the `icon` property is required:
 *
 * - icon: A Vue component which renders the icon
 * - rtlFlip: When `true` the icon will be flipped when in rtl
 * - defaultColor: A color for the icon. If not defined, icons are `themeTokens.text` colored
 */
const KolibriIcons = {
  // UI
  back: {
    icon: require('./material-svg/arrow_back/Baseline.vue').default,
    rtlFlip: true,
  },
  forward: {
    icon: require('./material-svg/arrow_forward/Baseline.vue').default,
    rtlFlip: true,
  },
  clear: { icon: require('./material-svg/clear/Baseline.vue').default },
  dropdown: { icon: require('./material-svg/arrow_drop_down/Baseline.vue').default },
  language: { icon: require('./material-svg/language/Baseline.vue').default },
  logout: {
    icon: require('./material-svg/exit_to_app/Baseline.vue').default,
    rtlFlip: true,
  },
  menu: { icon: require('./material-svg/menu/Baseline.vue').default },
  search: { icon: require('./material-svg/search/Baseline.vue').default },
  error: {
    icon: require('./material-svg/error/Baseline.vue').default,
    defaultColor: themeTokens().error,
  },

  // Features and links
  learn: { icon: require('./material-svg/school/Baseline.vue').default },
  device: { icon: require('./material-svg/tablet_mac/Baseline.vue').default },
  profile: { icon: require('./material-svg/account_circle/Baseline.vue').default },
  login: { icon: require('./material-svg/exit_to_app/Baseline.vue').default },
  coach: { icon: require('./material-svg/local_library/Baseline.vue').default },
  facility: { icon: require('./material-svg/settings_input_antenna/Baseline.vue').default },

  // Users
  classroom: { icon: require('./material-svg/business/Baseline.vue').default },
  group: { icon: require('./material-svg/group_work/Baseline.vue').default },
  people: { icon: require('./material-svg/people/Baseline.vue').default },
  person: { icon: require('./material-svg/person/Baseline.vue').default },
  permission: { icon: require('./material-svg/vpn_key/Baseline.vue').default },

  // Content
  app: { icon: require('./material-svg/widgets/Baseline.vue').default },
  audio: { icon: require('./material-svg/audiotrack/Baseline.vue').default },
  channel: { icon: require('./material-svg/apps/Baseline.vue').default },
  doc: { icon: require('./material-svg/book/Baseline.vue').default },
  document: { icon: require('./material-svg/book/Baseline.vue').default },
  exercise: { icon: require('./material-svg/assignment/Baseline.vue').default },
  topic: { icon: require('./material-svg/folder/Baseline.vue').default },
  video: { icon: require('./material-svg/ondemand_video/Baseline.vue').default },
  html5: { icon: require('./material-svg/widgets/Baseline.vue').default },
  slideshow: { icon: require('./material-svg/photo_library/Baseline.vue').default },
  unlistedchannel: { icon: require('./material-svg/lock_open/Baseline.vue').default },
  done: {
    icon: require('./material-svg/done/Baseline.vue').default,
    defaultColor: themeTokens().success,
  },
  coachContent: {
    icon: require('./material-svg/local_library/Baseline.vue').default,
    defaultColor: themeTokens().coachContent,
  },

  // Progress tracking
  correct: {
    icon: require('./material-svg/check_circle/Baseline.vue').default,
    defaultColor: themeTokens().correct,
  },
  helpNeeded: {
    icon: require('./material-svg/error/Baseline.vue').default,
    defaultColor: themeTokens().incorrect,
  },
  hint: {
    icon: require('./material-svg/lightbulb/Outline.vue').default,
    defaultColor: themeTokens().annotation,
  },
  incorrect: {
    icon: require('./material-svg/close/Baseline.vue').default,
    defaultColor: themeTokens().annotation,
  },
  inProgress: {
    icon: require('./material-svg/access_time/Baseline.vue').default,
    defaultColor: themeTokens().progress,
  },
  mastered: {
    icon: require('./material-svg/stars/Baseline.vue').default,
    defaultColor: themeTokens().mastered,
  },
  notStarted: {
    icon: require('./material-svg/brightness_1/Baseline.vue').default,
    defaultColor: themeTokens().textDisabled,
  },
  rectified: {
    icon: require('./material-svg/lens/Baseline.vue').default,
    defaultColor: themeTokens().annotation,
  },

  // Coaching
  lesson: { icon: require('./material-svg/import_contacts/Baseline.vue').default },
  question: { icon: require('./material-svg/keyboard_arrow_right/Baseline.vue').default },
  quiz: { icon: require('./material-svg/assignment_late/Baseline.vue').default },

  // Miscellaneous
  dot: { icon: require('./material-svg/brightness_1/Baseline.vue').default },
  checkbox_circle: { icon: require('./material-svg/open_in_new/Baseline.vue').default },

  // Studio
  info: { icon: require('./material-svg/info/Baseline.vue').default },
  star: { icon: require('./material-svg/star/Baseline.vue').default },
  star_border: { icon: require('./material-svg/star_border/Baseline.vue').default },
  options: { icon: require('./material-svg/more_vert/Baseline.vue').default },
  copy: {
    icon: require('./material-svg/content_copy/Baseline.vue').default,
    rtlFlip: true,
  },
  edit: { icon: require('./material-svg/edit/Baseline.vue').default },
  delete: { icon: require('./material-svg/delete/Baseline.vue').default },
  check: { icon: require('./material-svg/check/Baseline.vue').default },
  help: { icon: require('./material-svg/help/Outline.vue').default },
  arrow_down: { icon: require('./material-svg/expand_more/Baseline.vue').default },
  arrow_up: { icon: require('./material-svg/expand_less/Baseline.vue').default },
  add: { icon: require('./material-svg/add/Baseline.vue').default },
  keyboard_arrow_up: { icon: require('./material-svg/keyboard_arrow_up/Baseline.vue').default },
  keyboard_arrow_down: {
    icon: require('./material-svg/keyboard_arrow_down/Baseline.vue').default,
  },
  close: { icon: require('./material-svg/close/Baseline.vue').default },

  // Found while removing mat-svg
  indeterminate_check_box: {
    icon: require('./material-svg/indeterminate_check_box/Baseline.vue').default,
  },
  radio_button_checked: {
    icon: require('./material-svg/radio_button_checked/Baseline.vue').default,
  },
  radio_button_unchecked: {
    icon: require('./material-svg/radio_button_unchecked/Baseline.vue').default,
  },
  check_box: { icon: require('./material-svg/check_box/Baseline.vue').default },
  check_box_outline_blank: {
    icon: require('./material-svg/check_box_outline_blank/Baseline.vue').default,
  },
  cancel: { icon: require('./material-svg/cancel/Baseline.vue').default },
  // left/right found in navbar/index
  keyboard_arrow_left: {
    icon: require('./material-svg/keyboard_arrow_left/Baseline.vue').default,
    rtlFlip: true,
  },
  keyboard_arrow_right: {
    icon: require('./material-svg/keyboard_arrow_right/Baseline.vue').default,
    rtlFlip: true,
  },
  // ProgressIcon
  schedule: { icon: require('./material-svg/schedule/Baseline.vue').default },
  // DragSortWidget
  drag: { icon: require('./material-svg/drag_indicator/Baseline.vue').default },
  // CreateExamPreview
  minus_sign: { icon: require('./material-svg/remove/Baseline.vue').default },
  plus_sign: { icon: require('./material-svg/add/Baseline.vue').default },
  refresh: { icon: require('./material-svg/refresh/Baseline.vue').default },
  // ReportsControls
  print: { icon: require('./material-svg/print/Baseline.vue').default },
  get_app: { icon: require('./material-svg/get_app/Baseline.vue').default },
  // TopNavbar
  dashboard: { icon: require('./material-svg/dashboard/Baseline.vue').default },
  insert_chart: { icon: require('./material-svg/insert_chart/Baseline.vue').default },
  // DeviceTopNav
  https: { icon: require('./material-svg/https/Baseline.vue').default },
  perm_device_information: {
    icon: require('./material-svg/perm_device_information/Baseline.vue').default,
  },
  settings: { icon: require('./material-svg/settings/Baseline.vue').default },
  // SettingsButton
  tune: { icon: require('./material-svg/tune/Baseline.vue').default },
  // TocButton
  list: { icon: require('./material-svg/list/Baseline.vue').default },
  // TopBar (and likely others?)
  fullscreen: { icon: require('./material-svg/fullscreen/Baseline.vue').default },
  fullscreen_exit: { icon: require('./material-svg/fullscreen_exit/Baseline.vue').default },
  //SyncInterface
  verified_user: { icon: require('./material-svg/verified_user/Baseline.vue').default },
  //FacilityTopNav
  save: { icon: require('./material-svg/save/Baseline.vue').default },
  domain: { icon: require('./material-svg/domain/Baseline.vue').default },
  // LearnTopNav
  forum: { icon: require('./material-svg/forum/Baseline.vue').default },
  // Searchbox
  filter_list: { icon: require('./material-svg/filter_list/Baseline.vue').default },
  warning: { icon: require('./material-svg/warning/Baseline.vue').default },
};

/**
 * Given one of `blackPaths` or `coloredPaths` from `allIcons`,
 * returns array where each element is an array of aliases which
 * refer to the same icon. The sub-arrays are already sorted
 * alphabetically.
 *
 * Example:
 *
 * [
 *     ['arrow_back', 'back'],
 *     ['arrow_forward', 'forward'],
 *     ...
 *     ['verified_user']
 * ]
 *
 */

const sortedIcons = paths => {
  return Object.keys(paths)
    .map(a => paths[a])
    .sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0));
};

/*
 * Assigned the value: `{ blackPaths, coloredPaths }` from the function below.
 *
 * `blackPaths` and `coloredPaths` are objects wherein the keys are unique `paths` to an icon
 *
 * These path keys map to an array of alphabetically sorted aliases associated with that path.
 */

const allIcons = (() => {
  let blackPaths = {};
  let coloredPaths = {};

  Object.keys(KolibriIcons).forEach(alias => {
    const path = KolibriIcons[alias].icon.__file;
    const hasColorToken = KolibriIcons[alias].defaultColor;
    const thePathsWeCareAbout = hasColorToken ? coloredPaths : blackPaths;

    let aliases = [alias];

    if (Object.keys(thePathsWeCareAbout).includes(path)) {
      aliases = [...thePathsWeCareAbout[path], ...aliases].sort();
    }

    thePathsWeCareAbout[path] = aliases;

    if (hasColorToken) {
      coloredPaths = thePathsWeCareAbout;
    } else {
      blackPaths = thePathsWeCareAbout;
    }
  });

  return { blackPaths, coloredPaths };
})();

const sortedColoredIcons = sortedIcons(allIcons.coloredPaths);
const sortedBlackIcons = sortedIcons(allIcons.blackPaths);

export { sortedColoredIcons, sortedBlackIcons, KolibriIcons };
