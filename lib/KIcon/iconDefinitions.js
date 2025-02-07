import { themePalette, themeTokens } from '../styles/theme';

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
 * - fixedColor: if 'true' the icon has a fixed color and KIcon color property will not be applied
 *
 * NOTE: this file is currently processed using regex by utils/pregenerate.js in order to
 * extract information for use in user docs. It is also processed
 * by utils/precompileSvgs/precompilationDiff.js.
 * Before refactoring, please take those brittle dependencies into consideration.
 */

const KolibriIcons = {
  // UI
  menu: { icon: require('./precompiled-icons/material-icons/menu/baseline.vue').default },
  dropdown: {
    icon: require('./precompiled-icons/material-icons/arrow_drop_down/baseline.vue').default,
  },
  dropup: {
    icon: require('./precompiled-icons/le/dropup.vue').default,
  },
  back: {
    icon: require('./precompiled-icons/material-icons/arrow_back/baseline.vue').default,
    rtlFlip: true,
  },
  forward: {
    icon: require('./precompiled-icons/material-icons/arrow_forward/baseline.vue').default,
    rtlFlip: true,
  },
  forwardRounded: {
    icon: require('./precompiled-icons/material-icons/forward/round.vue').default,
    rtlFlip: true,
  },
  restart: {
    icon: require('./precompiled-icons/material-icons/restart_alt/baseline.vue').default,
  },
  timer: {
    icon: require('./precompiled-icons/material-icons/timer/outline.vue').default,
  },
  alternativeRoute: {
    icon: require('./precompiled-icons/material-icons/alt_route/baseline.vue').default,
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
  brokenImage: {
    icon: require('./precompiled-icons/material-icons/broken_image/baseline.vue').default,
    defaultColor: themePalette().grey.v_400,
  },
  previewUnavailable: {
    icon: require('./precompiled-icons/le/preview-unavailable.vue').default,
  },
  sort: { icon: require('./precompiled-icons/le/sort.vue').default },
  sortColumn: {
    icon: require('./precompiled-icons/le/sortColumn.vue').default,
  },

  // Features and links
  learn: { icon: require('./precompiled-icons/material-icons/school/baseline.vue').default },
  thumbUp: {
    icon: require('./precompiled-icons/material-icons/thumb_up/baseline.vue').default,
  },
  thumbDown: {
    icon: require('./precompiled-icons/material-icons/thumb_down/outline.vue').default,
  },
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
  audience: { icon: require('./precompiled-icons/material-icons/groups/baseline.vue').default },
  // for use in RST docs as we cannot change the fill dynamically in RST
  superadmin: {
    icon: require('./precompiled-icons/material-icons/vpn_key/baseline.vue').default,
    defaultColor: themeTokens().mastered,
  },

  // Content
  app: { icon: require('./precompiled-icons/material-icons/widgets/baseline.vue').default },
  audio: { icon: require('./precompiled-icons/material-icons/audiotrack/baseline.vue').default },
  channel: { icon: require('./precompiled-icons/material-icons/apps/baseline.vue').default },
  document: { icon: require('./precompiled-icons/material-icons/book/baseline.vue').default },
  exercise: {
    icon: require('./precompiled-icons/material-icons/assignment/baseline.vue').default,
    rtlFlip: true,
  },
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
  onDevice: {
    icon: require('./precompiled-icons/material-icons/check_circle/baseline.vue').default,
    defaultColor: themeTokens().success,
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
  incorrectReport: {
    icon: require('./precompiled-icons/material-icons/close/outline.vue').default,
    defaultColor: themeTokens().error,
  },

  // Miscellaneous
  dot: { icon: require('./precompiled-icons/material-icons/brightness_1/baseline.vue').default },
  // Setting a color for the a11y icon - it doesn't use the color for its fill,
  // but this ensures it's displayed alongside other icons with a defaultColor
  a11y: {
    icon: require('./precompiled-icons/le/a11y.vue').default,
    defaultColor: themeTokens().text,
    fixedColor: true,
  },
  // Studio
  home: { icon: require('./precompiled-icons/material-icons/home/baseline.vue').default },
  unpublishedChange: {
    icon: require('./precompiled-icons/material-icons/fiber_manual_record/outline.vue').default,
    defaultColor: themeTokens().success,
  },
  unpublishedResource: {
    icon: require('./precompiled-icons/material-icons/fiber_manual_record/baseline.vue').default,
    defaultColor: themeTokens().success,
  },
  info: { icon: require('./precompiled-icons/material-icons/info/baseline.vue').default },
  infoOutline: { icon: require('./precompiled-icons/material-icons/info/outline.vue').default },
  // infoPrimary is Primarily in place for use in RST docs as we cannot change the fill dynamically
  infoPrimary: {
    icon: require('./precompiled-icons/material-icons/info/baseline.vue').default,
    defaultColor: themeTokens().primary,
  },
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
    icon: require('./precompiled-icons/material-icons/content_paste/outline.vue').default,
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
  rename: {
    icon: require('./precompiled-icons/le/rename.vue').default,
    rtlFlip: true,
  },

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
  filter: { icon: require('./precompiled-icons/material-icons/tune/baseline.vue').default },
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
  disconnected: {
    icon: require('./precompiled-icons/material-icons/wifi_tethering_off/baseline.vue').default,
  },
  wifi: {
    icon: require('./precompiled-icons/material-icons/wifi/baseline.vue').default,
  },
  cloud: {
    icon: require('./precompiled-icons/material-icons/cloud/outline.vue').default,
  },
  laptop: {
    icon: require('./precompiled-icons/material-icons/laptop/baseline.vue').default,
  },
  pinned: {
    icon: require('./precompiled-icons/material-icons/push_pin/baseline.vue').default,
  },
  notPinned: {
    icon: require('./precompiled-icons/material-icons/push_pin/outline.vue').default,
  },
  // Content node fields
  categories: { icon: require('./precompiled-icons/le/categories.vue').default },
  activities: { icon: require('./precompiled-icons/le/activities.vue').default },
  levels: {
    icon: require('./precompiled-icons/le/levels.vue').default,
    rtlFlip: true,
  },
  attribution: {
    icon: require('./precompiled-icons/material-icons/attribution/baseline.vue').default,
  },

  // for use in RST docs as we cannot change the fill dynamically in RST
  registeredKDP: {
    icon: require('./precompiled-icons/material-icons/verified_user/baseline.vue').default,
    defaultColor: themeTokens().success,
  },
  //FacilityTopNav
  save: { icon: require('./precompiled-icons/material-icons/save/baseline.vue').default },
  // LearnTopNav
  recommended: { icon: require('./precompiled-icons/material-icons/forum/baseline.vue').default },
  // Searchbox
  filterList: {
    icon: require('./precompiled-icons/material-icons/filter_list/baseline.vue').default,
  },
  warning: { icon: require('./precompiled-icons/material-icons/warning/baseline.vue').default },
  // warningIncomplete for use in RST docs as we cannot change the fill dynamically in RST
  warningIncomplete: {
    icon: require('./precompiled-icons/material-icons/warning/baseline.vue').default,
    defaultColor: themeTokens().mastered,
  },
  projects: {
    icon: require('./precompiled-icons/material-icons/bubble_chart/baseline.vue').default,
  },
  generateThumbnail: {
    icon: require('./precompiled-icons/material-icons/camera/baseline.vue').default,
  },
  crop: { icon: require('./precompiled-icons/material-icons/crop/baseline.vue').default },
  move: { icon: require('./precompiled-icons/material-icons/swap_horiz/baseline.vue').default },
  collection: { icon: require('./precompiled-icons/material-icons/storage/baseline.vue').default },
  systemUpdate: { icon: require('./precompiled-icons/material-icons/build/baseline.vue').default },
  add: {
    icon: require('./precompiled-icons/material-icons/add_circle_outline/baseline.vue').default,
  },
  remove: { icon: require('./precompiled-icons/mdi/minus-circle-outline.vue').default },
  emptyTopic: {
    icon: require('./precompiled-icons/material-icons/folder_open/baseline.vue').default,
  },
  image: { icon: require('./precompiled-icons/material-icons/photo_library/baseline.vue').default },
  view: {
    icon: require('./precompiled-icons/material-icons/keyboard_arrow_right/baseline.vue').default,
  },
  pdf: { icon: require('./precompiled-icons/material-icons/picture_as_pdf/baseline.vue').default },
  openNewTab: {
    icon: require('./precompiled-icons/material-icons/launch/baseline.vue').default,
    rtlFlip: true,
  },
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
  expandAll: { icon: require('./precompiled-icons/mdi/expand-all.vue').default },
  dragHorizontal: { icon: require('./precompiled-icons/le/drag_horizontal.vue').default },
  // Setting a color for the points* icons - they don't use the color for their fill,
  // but this ensures they're displayed alongside other icons with a defaultColor
  pointsActive: {
    icon: require('./precompiled-icons/le/pointsLeafActive.vue').default,
    defaultColor: themeTokens().text,
  },
  classes: { icon: require('./precompiled-icons/le/class.vue').default },
  email: { icon: require('./precompiled-icons/material-icons/mail_outline/baseline.vue').default },
  sidebar: {
    icon: require('./precompiled-icons/material-icons/vertical_split/baseline.vue').default,
    rtlFlip: true,
  },

  bookmark: { icon: require('./precompiled-icons/mdi/bookmark.vue').default },
  bookmarkEmpty: { icon: require('./precompiled-icons/mdi/bookmark-outline.vue').default },
  resourceList: {
    icon: require('./precompiled-icons/material-icons/menu_book/baseline.vue').default,
  },
  library: {
    icon: require('./precompiled-icons/material-icons/manage_search/baseline.vue').default,
  },

  // Resource category icons
  socialSciencesResource: {
    icon: require('./precompiled-icons/material-icons/groups/baseline.vue').default,
    resourceCategory: true,
  },
  artsResource: {
    icon: require('./precompiled-icons/material-icons/brush/baseline.vue').default,
    resourceCategory: true,
  },
  publicHealthResource: {
    icon: require('./precompiled-icons/material-icons/local_hospital/outline.vue').default,
    resourceCategory: true,
  },
  mediaLiteracyResource: {
    icon: require('./precompiled-icons/material-icons/phone_android/baseline.vue').default,
    resourceCategory: true,
  },
  numeracyResource: {
    icon: require('./precompiled-icons/material-icons/calculate/baseline.vue').default,
    resourceCategory: true,
  },
  digitalLiteracyResource: {
    icon: require('./precompiled-icons/material-icons/devices/baseline.vue').default,
    resourceCategory: true,
  },
  guidesResource: {
    icon: require('./precompiled-icons/material-icons/menu_book/baseline.vue').default,
    resourceCategory: true,
  },
  lessonPlansResource: {
    icon: require('./precompiled-icons/material-icons/menu_book/baseline.vue').default,
    resourceCategory: true,
  },
  mathematicsResource: {
    icon: require('./precompiled-icons/le/math.vue').default,
    resourceCategory: true,
  },
  sciencesResource: {
    icon: require('./precompiled-icons/le/science.vue').default,
    resourceCategory: true,
  },
  readingAndWritingResource: {
    icon: require('./precompiled-icons/le/readingWriting.vue').default,
    resourceCategory: true,
  },
  historyResource: {
    icon: require('./precompiled-icons/le/history.vue').default,
    resourceCategory: true,
  },
  computerScienceResource: {
    icon: require('./precompiled-icons/le/computerScience.vue').default,
    resourceCategory: true,
  },
  entrepreneurshipResource: {
    icon: require('./precompiled-icons/le/entrepreneurship.vue').default,
    resourceCategory: true,
  },
  financialLiteracyResource: {
    icon: require('./precompiled-icons/le/financialLiteracy.vue').default,
    resourceCategory: true,
  },
  currentEventsResource: {
    icon: require('./precompiled-icons/le/currentEvents.vue').default,
    resourceCategory: true,
  },
  environmentResource: {
    icon: require('./precompiled-icons/le/environment.vue').default,
    resourceCategory: true,
  },
  diversityResource: {
    icon: require('./precompiled-icons/le/diversity.vue').default,
    resourceCategory: true,
  },
  mentalHealthResource: {
    icon: require('./precompiled-icons/le/mentalHealth.vue').default,
    resourceCategory: true,
  },
  literacyResource: {
    icon: require('./precompiled-icons/le/literacy.vue').default,
    resourceCategory: true,
  },
  logicCriticalThinkingResource: {
    icon: require('./precompiled-icons/le/logicCriticalThinking.vue').default,
    resourceCategory: true,
  },
  learningSkillsResource: {
    icon: require('./precompiled-icons/le/learningSkills.vue').default,
    resourceCategory: true,
  },
  skillsResource: {
    icon: require('./precompiled-icons/le/skills.vue').default,
    resourceCategory: true,
  },

  // Learning Activity icons
  allActivities: {
    icon: require('./precompiled-icons/le/all-solid.vue').default,
    learningActivity: true,
  },
  createShaded: {
    icon: require('./precompiled-icons/le/create-shaded.vue').default,
    learningActivity: true,
  },
  createSolid: {
    icon: require('./precompiled-icons/le/create-solid.vue').default,
    learningActivity: true,
  },
  interactShaded: {
    icon: require('./precompiled-icons/le/interact-shaded.vue').default,
    learningActivity: true,
  },
  interactSolid: {
    icon: require('./precompiled-icons/le/interact-solid.vue').default,
    learningActivity: true,
  },
  listenShaded: {
    icon: require('./precompiled-icons/le/listen-shaded.vue').default,
    learningActivity: true,
  },
  listenSolid: {
    icon: require('./precompiled-icons/le/listen-solid.vue').default,
    learningActivity: true,
  },
  practiceShaded: {
    icon: require('./precompiled-icons/le/practice-shaded.vue').default,
    learningActivity: true,
  },
  practiceSolid: {
    icon: require('./precompiled-icons/le/practice-solid.vue').default,
    learningActivity: true,
  },
  readShaded: {
    icon: require('./precompiled-icons/le/read-shaded.vue').default,
    learningActivity: true,
  },
  readSolid: {
    icon: require('./precompiled-icons/le/read-solid.vue').default,
    learningActivity: true,
  },
  reflectShaded: {
    icon: require('./precompiled-icons/le/reflect-shaded.vue').default,
    learningActivity: true,
  },
  reflectSolid: {
    icon: require('./precompiled-icons/le/reflect-solid.vue').default,
    learningActivity: true,
  },
  watchShaded: {
    icon: require('./precompiled-icons/le/watch-shaded.vue').default,
    learningActivity: true,
  },
  watchSolid: {
    icon: require('./precompiled-icons/le/watch-solid.vue').default,
    learningActivity: true,
  },
};

export { KolibriIcons };
