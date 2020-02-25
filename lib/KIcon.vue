<!--
  No template here. This component uses a render function dynamically
  below in the created() lifecycle hook
-->

<script>
  const VueTemplateCompiler = require('vue-template-compiler');

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
    // tracking
    correct: 'check_circle/baseline',
    helpNeeded: 'error/baseline',
    hint: 'lightbulb/outline',
    incorrect: 'close/baseline',
    inProgress: 'access_time/baseline',
    mastered: 'stars/baseline',
    notStarted: 'brightness_1/baseline',
    rectified: 'lens/baseline',

    // coaching
    coach: 'local_library/baseline',
    lesson: 'import_contacts/baseline',
    question: 'keyboard_arrow_right/baseline',
    quiz: 'assignment_late/baseline',

    // content types
    app: 'widgets/baseline',
    html5: 'widgets/baseline',
    audio: 'audiotrack/baseline',
    channel: 'apps/baseline',
    doc: 'book/baseline',
    document: 'book/baseline',
    exercise: 'assignment/baseline',
    topic: 'folder/baseline',
    video: 'ondemand_video/baseline',
    slideshow: 'photo_library/baseline',
    unlistedchannel: 'lock_open/baseline',
    multiple: 'view_module/baseline',
    done: 'done/baseline',

    // users
    classroom: 'business/baseline',
    group: 'group_work/baseline',
    people: 'people/baseline',
    person: 'person/baseline',
    permission: 'vpn_key/baseline',

    // misc
    dot: 'brightness_1/baseline',
    error: 'error/baseline',

    // UI
    back: 'arrow_back/baseline',
    forward: 'arrow_forward/baseline',
    clear: 'clear/baseline',
    dropdown: 'arrow_drop_down/baseline',
    language: 'language/baseline',
    logout: 'exit_to_app/baseline',
    menu: 'menu/baseline',
    search: 'search/baseline',

    // side nav
    learn: 'school/baseline',
    device: 'tablet_mac/baseline',
    profile: 'account_circle/baseline',
    login: 'exit_to_app/baseline',
      // logout & coach defined above
    facility: 'settings_input_antenna/baseline'
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
      /**
       * materialName should refer to the icon you want.
       * If you want a specific style, add it after a forward slash
       */
      materialName: {
        type: String,
        required: false,
        validator(str) {
          if(str.includes('/')) {
            let style = str.split('/')[1];
            return ['baseline', 'outline', 'twotone', 'round', 'sharp'].includes(style);
          } else {
            return true;
          }
        }
      }
    },
    computed: {
      /* eslint-disable kolibri/vue-no-unused-properties */
      // We are generating a string template using these computed properties so
      // they are indeed being used in the created() lifecycle hook
      style() {
        if (this.color) {
          return { fill: this.color };
        }
        return { fill: 'black' };
      },
      rtlClass() {
        return this.isRtl ? 'rtl-flip-icon' : '';
      },
      /* eslint-enable kolibri/vue-no-unused-properties */
      svgFromIcon() {
        if(this.icon) {
          return require(`@material-icons/svg/svg/${KolibriIcons[this.icon]}.svg`);
        } else {
          return null;
        }
      },
      svgFromMaterialName() {
        // Avoid expensive computation
        if(this.icon) {
          return "Not loaded due to 'icon' prop being provided.";
        } else {
          // Append baseline if we aren't given a style
          let fileName = this.materialName.indexOf("/") >= 0 ?
            this.materialName :
            this.materialName + "/baseline";
          // Try to find the icon and return an error if we can't.
          try {
            return require(`@material-icons/svg/svg/${fileName}.svg`);
          } catch(e) {
            const error = `Failed to load SVG for material icons name ${this.materialName}.`;
            console.error(error);
            return null;
          }
        }
      }
    },
    created() {
      // Make sure we have icon or materialName. Favor icon - so if both are given
      // materialName is ignored.

      // TODO: This will be updated to pull the icon from the upcoming dictionary
      let fileName = this.icon ? this.icon : this.materialName;
      if(!fileName) {
        console.error("Cannot render icon without one of the two props 'icon' or 'materialName'");
        return;
      }
      const SVG_FILE_PREFIX = "data:image/svg+xml;base64,";

      const styles = ":style=style";
      const a11yAttrs = `role="presentation" focusable="false"`;
      const cssClass = `:class="rtlClass"`;

      const svgFile = this.icon ? this.svgFromIcon : this.svgFromMaterialName;

      const svgBase64 = svgFile.replace(SVG_FILE_PREFIX, "");
      const svgElementString = atob(svgBase64);
      const styledAndAccessibleSvg = svgElementString.replace("<svg", `<svg ${cssClass} ${styles} ${a11yAttrs}`);
      console.log(styledAndAccessibleSvg);
      console.log(typeof(styledAndAccessibleSvg));
      const template = VueTemplateCompiler.compileToFunctions(styledAndAccessibleSvg);
      this.$options.render = template.render;
    },

  };

</script>


<style scoped>

  .rtl-flip-icon {
    transform: scaleX(-1);
  }

</style>
