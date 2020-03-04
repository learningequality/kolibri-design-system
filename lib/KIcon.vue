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
    back: require('./material-svg/arrow_back/baseline'),
    forward: require('./material-svg/arrow_forward/baseline'),
    clear: require('./material-svg/clear/baseline'),
    dropdown: require('./material-svg/arrow_drop_down/baseline'),
    language: require('./material-svg/language/baseline'),
    logout: require('./material-svg/exit_to_app/baseline'),
    menu: require('./material-svg/menu/baseline'),
    search: require('./material-svg/search/baseline'),
    error: require('./material-svg/error/baseline'),

    // Features and links
    learn: require('./material-svg/school/baseline'),
    device: require('./material-svg/tablet_mac/baseline'),
    profile: require('./material-svg/account_circle/baseline'),
    login: require('./material-svg/exit_to_app/baseline'),
    /* logout */
    coach: require('./material-svg/local_library/baseline'),
    facility: require('./material-svg/settings_input_antenna/baseline'),

    // Users
    classroom: require('./material-svg/business/baseline'),
    group: require('./material-svg/group_work/baseline'),
    people: require('./material-svg/people/baseline'),
    person: require('./material-svg/person/baseline'),
    permission: require('./material-svg/vpn_key/baseline'),

    // Content
    app: require('./material-svg/widgets/baseline'),
    audio: require('./material-svg/audiotrack/baseline'),
    channel: require('./material-svg/apps/baseline'),
    doc: require('./material-svg/book/baseline'),
    document: require('./material-svg/book/baseline'),
    exercise: require('./material-svg/assignment/baseline'),
    topic: require('./material-svg/folder/baseline'),
    video: require('./material-svg/ondemand_video/baseline'),
    html5: require('./material-svg/widgets/baseline'),
    slideshow: require('./material-svg/photo_library/baseline'),
    unlistedchannel: require('./material-svg/lock_open/baseline'),
    done: require('./material-svg/done/baseline'),


    // Progress tracking
    correct: require('./material-svg/check_circle/baseline'),
    helpNeeded: require('./material-svg/error/baseline'),
    hint: require('./material-svg/lightbulb/outline'),
    incorrect: require('./material-svg/close/baseline'),
    inProgress: require('./material-svg/access_time/baseline'),
    mastered: require('./material-svg/stars/baseline'),
    notStarted: require('./material-svg/brightness_1/baseline'),
    rectified: require('./material-svg/lens/baseline'),

    // Coaching
    /* coach */
    lesson: require('./material-svg/import_contacts/baseline'),
    question: require('./material-svg/keyboard_arrow_right/baseline'),
    quiz: require('./material-svg/assignment_late/baseline'),

    // Miscellaneous
    dot: require('./material-svg/brightness_1/baseline'),
    checkbox_circle: require('./material-svg/open_in_new/baseline'),

    // Studio
    info: require('./material-svg/info/baseline'),
    star: require('./material-svg/star/baseline'),
    star_border: require('./material-svg/star_border/baseline'),
    options: require('./material-svg/more_vert/baseline'),
    copy: require('./material-svg/content_copy/baseline'),
    edit: require('./material-svg/edit/baseline'),
    delete: require('./material-svg/delete/baseline'),
    check: require('./material-svg/check/baseline'),
    help: require('./material-svg/help/outline'),
    arrow_down: require('./material-svg/expand_more/baseline'),
    arrow_up: require('./material-svg/expand_less/baseline'),
    add: require('./material-svg/add/baseline'),
    keyboard_arrow_up: require('./material-svg/keyboard_arrow_up/baseline'),
    keyboard_arrow_down: require('./material-svg/keyboard_arrow_down/baseline'),
    close: require('./material-svg/close/baseline'), // Same as clear...

    // Found while removing mat-svg
    indeterminate_check_box: require('./material-svg/indeterminate_check_box/baseline'),
    radio_button_checked: require('./material-svg/radio_button_checked/baseline'),
    radio_button_unchecked: require('./material-svg/radio_button_unchecked/baseline'),
    check_box: require('./material-svg/check_box/baseline'),
    check_box_outline_blank: require('./material-svg/check_box_outline_blank/baseline'),
  }

  export default {
    name: 'KIcon',
    props: {
      icon: {
        type: String,
        required: false,
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
        if(this.icon) {
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
