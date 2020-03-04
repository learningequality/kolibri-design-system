<template>

  <component
    :is="svgFromIcon"
    :style="style"
    :rtlClass="rtlClass"
  />

</template>


<script>

  /**
   * There are 5 styles of icon available.
   *
   * baseline - the base version of the icon
   * outline - an outline-stylized version of the icon
   * round - a rounded version where edged are rounded
   * sharp - a sharp version where round edges are hardened
   * twotone - a two-color version
   *
   * baseline is most common, outline is used several times
   *
   * round and sharp are often not different from baseline so only use them
   * if you are sure they are the version that you want.
   *
   * You can see the icons here: https://github.com/material-icons/material-icons/tree/master/svg
   *
   * The string values associated with the key are the svg `name/style` where the `name`
   * is the folder in the link above wherein the icon you want lives and the `style` is
   * which of the 5 styles you want.
   *
   * Append any of the below text items to the URL above and add .svg to it and you can see
   * the icon on Github.
   */
  const KolibriIcons = {
    // UI
    back: require('./material-svg/arrow_back/Baseline.vue').default,
    forward: require('./material-svg/arrow_forward/Baseline.vue').default,
    clear: require('./material-svg/clear/Baseline.vue').default,
    dropdown: require('./material-svg/arrow_drop_down/Baseline.vue').default,
    language: require('./material-svg/language/Baseline.vue').default,
    logout: require('./material-svg/exit_to_app/Baseline.vue').default,
    menu: require('./material-svg/menu/Baseline.vue').default,
    search: require('./material-svg/search/Baseline.vue').default,
    error: require('./material-svg/error/Baseline.vue').default,

    // Features and links
    learn: require('./material-svg/school/Baseline.vue').default,
    device: require('./material-svg/tablet_mac/Baseline.vue').default,
    profile: require('./material-svg/account_circle/Baseline.vue').default,
    login: require('./material-svg/exit_to_app/Baseline.vue').default,
    /* logout */
    coach: require('./material-svg/local_library/Baseline.vue').default,
    facility: require('./material-svg/settings_input_antenna/Baseline.vue').default,

    // Users
    classroom: require('./material-svg/business/Baseline.vue').default,
    group: require('./material-svg/group_work/Baseline.vue').default,
    people: require('./material-svg/people/Baseline.vue').default,
    person: require('./material-svg/person/Baseline.vue').default,
    permission: require('./material-svg/vpn_key/Baseline.vue').default,

    // Content
    app: require('./material-svg/widgets/Baseline.vue').default,
    audio: require('./material-svg/audiotrack/Baseline.vue').default,
    channel: require('./material-svg/apps/Baseline.vue').default,
    doc: require('./material-svg/book/Baseline.vue').default,
    document: require('./material-svg/book/Baseline.vue').default,
    exercise: require('./material-svg/assignment/Baseline.vue').default,
    topic: require('./material-svg/folder/Baseline.vue').default,
    video: require('./material-svg/ondemand_video/Baseline.vue').default,
    html5: require('./material-svg/widgets/Baseline.vue').default,
    slideshow: require('./material-svg/photo_library/Baseline.vue').default,
    unlistedchannel: require('./material-svg/lock_open/Baseline.vue').default,
    done: require('./material-svg/done/Baseline.vue').default,

    // Progress tracking
    correct: require('./material-svg/check_circle/Baseline.vue').default,
    helpNeeded: require('./material-svg/error/Baseline.vue').default,
    hint: require('./material-svg/lightbulb/Outline.vue').default,
    incorrect: require('./material-svg/close/Baseline.vue').default,
    inProgress: require('./material-svg/access_time/Baseline.vue').default,
    mastered: require('./material-svg/stars/Baseline.vue').default,
    notStarted: require('./material-svg/brightness_1/Baseline.vue').default,
    rectified: require('./material-svg/lens/Baseline.vue').default,

    // Coaching
    /* coach */
    lesson: require('./material-svg/import_contacts/Baseline.vue').default,
    question: require('./material-svg/keyboard_arrow_right/Baseline.vue').default,
    quiz: require('./material-svg/assignment_late/Baseline.vue').default,

    // Miscellaneous
    dot: require('./material-svg/brightness_1/Baseline.vue').default,
    checkbox_circle: require('./material-svg/open_in_new/Baseline.vue').default,

    // Studio
    info: require('./material-svg/info/Baseline.vue').default,
    star: require('./material-svg/star/Baseline.vue').default,
    star_border: require('./material-svg/star_border/Baseline.vue').default,
    options: require('./material-svg/more_vert/Baseline.vue').default,
    copy: require('./material-svg/content_copy/Baseline.vue').default,
    edit: require('./material-svg/edit/Baseline.vue').default,
    delete: require('./material-svg/delete/Baseline.vue').default,
    check: require('./material-svg/check/Baseline.vue').default,
    help: require('./material-svg/help/Outline.vue').default,
    arrow_down: require('./material-svg/expand_more/Baseline.vue').default,
    arrow_up: require('./material-svg/expand_less/Baseline.vue').default,
    add: require('./material-svg/add/Baseline.vue').default,
    keyboard_arrow_up: require('./material-svg/keyboard_arrow_up/Baseline.vue').default,
    keyboard_arrow_down: require('./material-svg/keyboard_arrow_down/Baseline.vue').default,
    close: require('./material-svg/close/Baseline.vue').default, // Same as clear...

    // Found while removing mat-svg
    indeterminate_check_box: require('./material-svg/indeterminate_check_box/Baseline.vue').default,
    radio_button_checked: require('./material-svg/radio_button_checked/Baseline.vue').default,
    radio_button_unchecked: require('./material-svg/radio_button_unchecked/Baseline.vue').default,
    check_box: require('./material-svg/check_box/Baseline.vue').default,
    check_box_outline_blank: require('./material-svg/check_box_outline_blank/Baseline.vue').default,
  };

  export default {
    name: 'KIcon',
    props: {
      icon: {
        type: String,
        required: false,
        validator(i) {
          return Object.keys(KolibriIcons).includes(i);
        },
      },
      /**
       * color to apply to the icon
       */
      color: {
        type: String,
        required: false,
      },
    },
    computed: {
      style() {
        if (this.color) {
          return { fill: this.color };
        }
        return { fill: 'black' };
      },
      rtlClass() {
        return this.isRtl ? 'rtl-flip-icon' : '';
      },
      svgFromIcon() {
        if (this.icon) {
          return KolibriIcons[this.icon];
        } else {
          return null;
        }
      },
    },
  };

</script>


<style scoped>

  svg {
    position: relative;
    top: 0.125em;
    width: 1.125em;
    height: 1.125em;
  }

  .rtl-flip-icon {
    transform: scaleX(-1);
  }

</style>
