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
  // done
  menu: { icon: require('./material-svg/menu/Baseline.vue').default },
  // done
  dropdown: { icon: require('./material-svg/arrow_drop_down/Baseline.vue').default },
  // done
  back: {
    icon: require('./material-svg/arrow_back/Baseline.vue').default,
    rtlFlip: true,
  },
  // done
  forward: {
    icon: require('./material-svg/arrow_forward/Baseline.vue').default,
    rtlFlip: true,
  },
  // done
  clear: { icon: require('./material-svg/clear/Baseline.vue').default },
  // done
  language: { icon: require('./material-svg/language/Baseline.vue').default },
  // done
  logout: {
    icon: require('./material-svg/exit_to_app/Baseline.vue').default,
    rtlFlip: true,
  },
  // done
  search: { icon: require('./material-svg/search/Baseline.vue').default },
  // done
  error: {
    icon: require('./material-svg/error/Baseline.vue').default,
    defaultColor: themeTokens().error,
  },

  // Features and links
  // done
  learn: { icon: require('./material-svg/school/Baseline.vue').default },
  // done
  device: { icon: require('./material-svg/tablet_mac/Baseline.vue').default },
  // done
  profile: { icon: require('./material-svg/account_circle/Baseline.vue').default },
  // done
  login: { icon: require('./material-svg/exit_to_app/Baseline.vue').default },
  // done
  coach: { icon: require('./material-svg/local_library/Baseline.vue').default },
  facility: { icon: require('./material-svg/settings_input_antenna/Baseline.vue').default },

  // Users
  classroom: { icon: require('./material-svg/business/Baseline.vue').default },
  // done
  group: { icon: require('./material-svg/group_work/Baseline.vue').default },
  // done
  people: { icon: require('./material-svg/people/Baseline.vue').default },
  // done
  person: { icon: require('./material-svg/person/Baseline.vue').default },
  // done
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
  // done
  coachContent: {
    icon: require('./material-svg/local_library/Baseline.vue').default,
    defaultColor: themeTokens().coachContent,
  },

  // Progress tracking
  correct: {
    icon: require('./material-svg/check_circle/Baseline.vue').default,
    defaultColor: themeTokens().correct,
  },
  // done
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
  // done
  notStarted: {
    icon: require('./material-svg/lens/Baseline.vue').default,
    defaultColor: themeTokens().textDisabled,
  },
  // done
  rectified: {
    icon: require('./material-svg/brightness_1/Baseline.vue').default,
    defaultColor: themeTokens().annotation,
  },

  // Coaching
  lesson: { icon: require('./material-svg/import_contacts/Baseline.vue').default },
  question: { icon: require('./material-svg/keyboard_arrow_right/Baseline.vue').default },
  quiz: { icon: require('./material-svg/assignment_late/Baseline.vue').default },

  // Miscellaneous
  // done
  dot: { icon: require('./material-svg/brightness_1/Baseline.vue').default },

  // Studio
  // done
  info: { icon: require('./material-svg/info/Baseline.vue').default },
  // done
  star: { icon: require('./material-svg/star/Baseline.vue').default },
  // done
  starBorder: { icon: require('./material-svg/star_border/Baseline.vue').default },
  // done
  optionsVertical: { icon: require('./material-svg/more_vert/Baseline.vue').default },
  // done
  optionsHorizontal: { icon: require('./material-svg/more_horiz/Baseline.vue').default },
  clipboard: {
    icon: require('./material-svg/content_paste/Baseline.vue').default,
    rtlFlip: true,
  },
  copy: {
    icon: require('./material-svg/content_copy/Baseline.vue').default,
    rtlFlip: true,
  },
  // done
  edit: { icon: require('./material-svg/edit/Baseline.vue').default },
  // done
  delete: { icon: require('./material-svg/cancel/Baseline.vue').default },
  trash: { icon: require('./material-svg/delete/Baseline.vue').default },
  check: { icon: require('./material-svg/check/Baseline.vue').default },
  // done
  help: { icon: require('./material-svg/help_outline/Outline.vue').default },
  arrow_down: { icon: require('./material-svg/expand_more/Baseline.vue').default },
  arrow_up: { icon: require('./material-svg/expand_less/Baseline.vue').default },
  keyboard_arrow_up: { icon: require('./material-svg/keyboard_arrow_up/Baseline.vue').default },
  keyboard_arrow_down: {
    icon: require('./material-svg/keyboard_arrow_down/Baseline.vue').default,
  },
  close: { icon: require('./material-svg/close/Baseline.vue').default },

  // Found while removing mat-svg
  // done
  indeterminateCheck: {
    icon: require('./material-svg/indeterminate_check_box/Baseline.vue').default,
  },
  radioSelected: {
    icon: require('./material-svg/radio_button_checked/Baseline.vue').default,
  },
  radioUnselected: {
    icon: require('./material-svg/radio_button_unchecked/Baseline.vue').default,
  },
  checked: { icon: require('./material-svg/check_box/Baseline.vue').default },
  unchecked: {
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
  // done
  dragVertical: { icon: require('./material-svg/drag_indicator/Baseline.vue').default },
  // CreateExamPreview
  // done
  plus: { icon: require('./material-svg/add/Baseline.vue').default },
  // done
  minus: { icon: require('./material-svg/remove/Baseline.vue').default },
  // done
  refresh: { icon: require('./material-svg/refresh/Baseline.vue').default },
  // ReportsControls
  print: { icon: require('./material-svg/print/Baseline.vue').default },
  // done
  download: { icon: require('./material-svg/get_app/Baseline.vue').default },
  // TopNavbar
  dashboard: { icon: require('./material-svg/dashboard/Baseline.vue').default },
  // done
  data: { icon: require('./material-svg/insert_chart/Baseline.vue').default },
  // done
  reports: { icon: require('./material-svg/insert_chart/Baseline.vue').default },
  // DeviceTopNav
  permissions: { icon: require('./material-svg/https/Baseline.vue').default },
  // done
  deviceInfo: {
    icon: require('./material-svg/perm_device_information/Baseline.vue').default,
  },
  settings: { icon: require('./material-svg/settings/Baseline.vue').default },
  // SettingsButton
  // done
  tune: { icon: require('./material-svg/tune/Baseline.vue').default },
  // TocButton
  list: { icon: require('./material-svg/list/Baseline.vue').default },
  // TopBar (and likely others?)
  // done
  fullscreen: { icon: require('./material-svg/fullscreen/Baseline.vue').default },
  fullscreen_exit: { icon: require('./material-svg/fullscreen_exit/Baseline.vue').default },
  //SyncInterface
  //done
  registered: { icon: require('./material-svg/verified_user/Baseline.vue').default },
  //FacilityTopNav
  // done
  save: { icon: require('./material-svg/save/Baseline.vue').default },
  domain: { icon: require('./material-svg/domain/Baseline.vue').default },
  // LearnTopNav
  // done
  recommended: { icon: require('./material-svg/forum/Baseline.vue').default },
  // Searchbox
  filterList: { icon: require('./material-svg/filter_list/Baseline.vue').default },
  warning: { icon: require('./material-svg/warning/Baseline.vue').default },

  // done
  projects: { icon: require('./material-svg/bubble_chart/Baseline.vue').default },
  // done
  generateThumbnail: { icon: require('./material-svg/camera/Baseline.vue').default },
  crop: { icon: require('./material-svg/crop/Baseline.vue').default },
  move: { icon: require('./material-svg/sync_alt/Baseline.vue').default },
  duplicate: {
    icon: require('./material-svg/content_copy/Baseline.vue').default,
    rtlFlip: true,
  },
  systemUpdate: { icon: require('./material-svg/build/Baseline.vue').default },
  remove: { icon: require('./material-svg/remove_circle/Baseline.vue').default },
  emptyTopic: { icon: require('./material-svg/folder_open/Baseline.vue').default },
  image: { icon: require('./material-svg/photo_library/Baseline.vue').default },
  view: { icon: require('./material-svg/keyboard_arrow_right/Baseline.vue').default },
  pdf: { icon: require('./material-svg/picture_as_pdf/Baseline.vue').default },
  openNewTab: { icon: require('./material-svg/launch/Baseline.vue').default },
  history: { icon: require('./material-svg/restore/Baseline.vue').default },
  myLocation: { icon: require('./material-svg/gps_fixed/Baseline.vue').default },
  undo: { icon: require('./material-svg/undo/Baseline.vue').default },
  redo: { icon: require('./material-svg/redo/Baseline.vue').default },
  chevronLeft: { icon: require('./material-svg/chevron_left/Baseline.vue').default },
  chevronDown: { icon: require('./material-svg/expand_more/Baseline.vue').default },
  chevronUp: { icon: require('./material-svg/expand_less/Baseline.vue').default },
};

export { KolibriIcons };
