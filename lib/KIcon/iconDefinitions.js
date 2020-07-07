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
  menu: { icon: require('./precompiled-icons/material-icons/menu/baseline.vue').default },
  dropdown: {
    icon: require('./precompiled-icons/material-icons/arrow_drop_down/baseline.vue').default,
  },
  back: {
    icon: require('./precompiled-icons/material-icons/arrow_back/baseline.vue').default,
    rtlFlip: true,
  },
  forward: {
    icon: require('./precompiled-icons/material-icons/arrow_forward/baseline.vue').default,
    rtlFlip: true,
  },
  clear: { icon: require('./precompiled-icons/material-icons/clear/baseline.vue').default },
  language: { icon: require('./precompiled-icons/material-icons/language/baseline.vue').default },
  logout: {
    icon: require('./precompiled-icons/material-icons/exit_to_app/baseline.vue').default,
    rtlFlip: true,
  },
  search: { icon: require('./precompiled-icons/material-icons/search/baseline.vue').default },
  error: {
    icon: require('./precompiled-icons/material-icons/error/baseline.vue').default,
    defaultColor: themeTokens().error,
  },

  // Features and links
  learn: { icon: require('./precompiled-icons/material-icons/school/baseline.vue').default },
  device: { icon: require('./precompiled-icons/material-icons/tablet_mac/baseline.vue').default },
  profile: {
    icon: require('./precompiled-icons/material-icons/account_circle/baseline.vue').default,
  },
  login: { icon: require('./precompiled-icons/material-icons/exit_to_app/baseline.vue').default },
  coach: { icon: require('./precompiled-icons/material-icons/local_library/baseline.vue').default },

  // Users
  facility: { icon: require('./precompiled-icons/material-icons/business/baseline.vue').default },
  group: { icon: require('./precompiled-icons/material-icons/group_work/baseline.vue').default },
  people: { icon: require('./precompiled-icons/material-icons/people/baseline.vue').default },
  person: { icon: require('./precompiled-icons/material-icons/person/baseline.vue').default },
  permission: { icon: require('./precompiled-icons/material-icons/vpn_key/baseline.vue').default },

  // Content
  app: { icon: require('./precompiled-icons/material-icons/widgets/baseline.vue').default },
  audio: { icon: require('./precompiled-icons/material-icons/audiotrack/baseline.vue').default },
  channel: { icon: require('./precompiled-icons/material-icons/apps/baseline.vue').default },
  document: { icon: require('./precompiled-icons/material-icons/book/baseline.vue').default },
  exercise: { icon: require('./precompiled-icons/material-icons/assignment/baseline.vue').default },
  topic: { icon: require('./precompiled-icons/material-icons/folder/baseline.vue').default },
  video: {
    icon: require('./precompiled-icons/material-icons/ondemand_video/baseline.vue').default,
  },
  html5: { icon: require('./precompiled-icons/material-icons/widgets/baseline.vue').default },
  slideshow: {
    icon: require('./precompiled-icons/material-icons/photo_library/baseline.vue').default,
  },
  unlistedchannel: {
    icon: require('./precompiled-icons/material-icons/lock_open/baseline.vue').default,
  },
  done: {
    icon: require('./precompiled-icons/material-icons/done/baseline.vue').default,
    defaultColor: themeTokens().success,
  },
  coachContent: {
    icon: require('./precompiled-icons/material-icons/local_library/baseline.vue').default,
    defaultColor: themeTokens().coachContent,
  },

  // Progress tracking
  correct: {
    icon: require('./precompiled-icons/material-icons/check_circle/baseline.vue').default,
    defaultColor: themeTokens().correct,
  },
  helpNeeded: {
    icon: require('./precompiled-icons/material-icons/error/baseline.vue').default,
    defaultColor: themeTokens().incorrect,
  },
  hint: {
    icon: require('./precompiled-icons/material-icons/lightbulb/outline.vue').default,
    defaultColor: themeTokens().annotation,
  },
  incorrect: {
    icon: require('./precompiled-icons/material-icons/close/baseline.vue').default,
    defaultColor: themeTokens().annotation,
  },
  inProgress: {
    icon: require('./precompiled-icons/material-icons/access_time/baseline.vue').default,
    defaultColor: themeTokens().progress,
  },
  mastered: {
    icon: require('./precompiled-icons/material-icons/stars/baseline.vue').default,
    defaultColor: themeTokens().mastered,
  },
  notStarted: {
    icon: require('./precompiled-icons/material-icons/lens/baseline.vue').default,
    defaultColor: themeTokens().textDisabled,
  },
  rectified: {
    icon: require('./precompiled-icons/material-icons/brightness_1/baseline.vue').default,
    defaultColor: themeTokens().annotation,
  },

  // Coaching
  lesson: {
    icon: require('./precompiled-icons/material-icons/import_contacts/baseline.vue').default,
  },
  question: {
    icon: require('./precompiled-icons/material-icons/keyboard_arrow_right/baseline.vue').default,
  },
  quiz: {
    icon: require('./precompiled-icons/mdi/file-document-edit-outline.vue').default,
  },

  // Miscellaneous
  dot: { icon: require('./precompiled-icons/material-icons/brightness_1/baseline.vue').default },

  // Studio
  info: { icon: require('./precompiled-icons/material-icons/info/baseline.vue').default },
  star: { icon: require('./precompiled-icons/material-icons/star/baseline.vue').default },
  starBorder: {
    icon: require('./precompiled-icons/material-icons/star_border/baseline.vue').default,
  },
  optionsVertical: {
    icon: require('./precompiled-icons/material-icons/more_vert/baseline.vue').default,
  },
  optionsHorizontal: {
    icon: require('./precompiled-icons/material-icons/more_horiz/baseline.vue').default,
  },
  clipboard: {
    icon: require('./precompiled-icons/material-icons/content_paste/baseline.vue').default,
    rtlFlip: true,
  },
  copy: {
    icon: require('./precompiled-icons/material-icons/content_copy/baseline.vue').default,
    rtlFlip: true,
  },
  edit: { icon: require('./precompiled-icons/material-icons/edit/baseline.vue').default },
  delete: { icon: require('./precompiled-icons/material-icons/cancel/baseline.vue').default },
  trash: { icon: require('./precompiled-icons/material-icons/delete/baseline.vue').default },
  check: { icon: require('./precompiled-icons/material-icons/check/baseline.vue').default },
  help: { icon: require('./precompiled-icons/material-icons/help_outline/outline.vue').default },
  close: { icon: require('./precompiled-icons/material-icons/close/baseline.vue').default },

  // Found while removing mat-svg
  indeterminateCheck: {
    icon: require('./precompiled-icons/material-icons/indeterminate_check_box/baseline.vue')
      .default,
  },
  radioSelected: {
    icon: require('./precompiled-icons/material-icons/radio_button_checked/baseline.vue').default,
  },
  radioUnselected: {
    icon: require('./precompiled-icons/material-icons/radio_button_unchecked/baseline.vue').default,
  },
  checked: { icon: require('./precompiled-icons/material-icons/check_box/baseline.vue').default },
  unchecked: {
    icon: require('./precompiled-icons/material-icons/check_box_outline_blank/baseline.vue')
      .default,
  },
  // ProgressIcon
  schedule: { icon: require('./precompiled-icons/material-icons/schedule/baseline.vue').default },
  // DragSortWidget
  dragVertical: {
    icon: require('./precompiled-icons/material-icons/drag_indicator/baseline.vue').default,
  },
  // CreateExamPreview
  plus: { icon: require('./precompiled-icons/material-icons/add/baseline.vue').default },
  minus: { icon: require('./precompiled-icons/material-icons/remove/baseline.vue').default },
  refresh: { icon: require('./precompiled-icons/material-icons/refresh/baseline.vue').default },
  // ReportsControls
  print: { icon: require('./precompiled-icons/material-icons/print/baseline.vue').default },
  download: { icon: require('./precompiled-icons/material-icons/get_app/baseline.vue').default },
  // TopNavbar
  dashboard: { icon: require('./precompiled-icons/material-icons/dashboard/baseline.vue').default },
  data: { icon: require('./precompiled-icons/material-icons/insert_chart/baseline.vue').default },
  reports: {
    icon: require('./precompiled-icons/material-icons/insert_chart/baseline.vue').default,
  },
  // DeviceTopNav
  permissions: { icon: require('./precompiled-icons/material-icons/https/baseline.vue').default },
  deviceInfo: {
    icon: require('./precompiled-icons/material-icons/perm_device_information/baseline.vue')
      .default,
  },
  settings: { icon: require('./precompiled-icons/material-icons/settings/baseline.vue').default },
  // SettingsButton
  tune: { icon: require('./precompiled-icons/material-icons/tune/baseline.vue').default },
  // TocButton
  list: { icon: require('./precompiled-icons/material-icons/list/baseline.vue').default },
  // TopBar (and likely others?)
  fullscreen: {
    icon: require('./precompiled-icons/material-icons/fullscreen/baseline.vue').default,
  },
  fullscreen_exit: {
    icon: require('./precompiled-icons/material-icons/fullscreen_exit/baseline.vue').default,
  },
  //SyncInterface
  //done
  registered: {
    icon: require('./precompiled-icons/material-icons/verified_user/baseline.vue').default,
  },
  //FacilityTopNav
  save: { icon: require('./precompiled-icons/material-icons/save/baseline.vue').default },
  domain: { icon: require('./precompiled-icons/material-icons/domain/baseline.vue').default },
  // LearnTopNav
  recommended: { icon: require('./precompiled-icons/material-icons/forum/baseline.vue').default },
  // Searchbox
  filterList: {
    icon: require('./precompiled-icons/material-icons/filter_list/baseline.vue').default,
  },
  warning: { icon: require('./precompiled-icons/material-icons/warning/baseline.vue').default },
  projects: {
    icon: require('./precompiled-icons/material-icons/bubble_chart/baseline.vue').default,
  },
  generateThumbnail: {
    icon: require('./precompiled-icons/material-icons/camera/baseline.vue').default,
  },
  crop: { icon: require('./precompiled-icons/material-icons/crop/baseline.vue').default },
  move: { icon: require('./precompiled-icons/material-icons/swap_horiz/baseline.vue').default },
  collection: { icon: require('./precompiled-icons/material-icons/storage/baseline.vue').default },
  duplicate: {
    icon: require('./precompiled-icons/material-icons/content_copy/baseline.vue').default,
    rtlFlip: true,
  },
  systemUpdate: { icon: require('./precompiled-icons/material-icons/build/baseline.vue').default },
  remove: { icon: require('./precompiled-icons/mdi/minus-circle-outline.vue').default },
  emptyTopic: {
    icon: require('./precompiled-icons/material-icons/folder_open/baseline.vue').default,
  },
  image: { icon: require('./precompiled-icons/material-icons/photo_library/baseline.vue').default },
  view: {
    icon: require('./precompiled-icons/material-icons/keyboard_arrow_right/baseline.vue').default,
  },
  pdf: { icon: require('./precompiled-icons/material-icons/picture_as_pdf/baseline.vue').default },
  openNewTab: { icon: require('./precompiled-icons/material-icons/launch/baseline.vue').default },
  history: { icon: require('./precompiled-icons/material-icons/restore/baseline.vue').default },
  myLocation: {
    icon: require('./precompiled-icons/material-icons/gps_fixed/baseline.vue').default,
  },
  undo: { icon: require('./precompiled-icons/material-icons/undo/baseline.vue').default },
  redo: { icon: require('./precompiled-icons/material-icons/redo/baseline.vue').default },
  chevronLeft: {
    icon: require('./precompiled-icons/material-icons/keyboard_arrow_left/baseline.vue').default,
    rtlFlip: true,
  },
  chevronRight: {
    icon: require('./precompiled-icons/material-icons/keyboard_arrow_right/baseline.vue').default,
    rtlFlip: true,
  },
  chevronDown: {
    icon: require('./precompiled-icons/material-icons/expand_more/baseline.vue').default,
  },
  chevronUp: {
    icon: require('./precompiled-icons/material-icons/expand_less/baseline.vue').default,
  },
  collapseAll: { icon: require('./precompiled-icons/mdi/collapse-all.vue').default },
  dragHorizontal: { icon: require('./precompiled-icons/le/drag_horizontal.vue').default },
  classes: { icon: require('./precompiled-icons/le/class.vue').default },
};

export { KolibriIcons };
