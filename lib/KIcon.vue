<!--
  No template here. This component uses a render function dynamically
  below in the created() lifecycle hook
-->

<script>
  const VueTemplateCompiler = require('vue-template-compiler');

  const iconTypes = [
    // tracking
    'correct',
    'helpNeeded',
    'hint',
    'incorrect',
    'inProgress',
    'mastered',
    'notStarted',
    'rectified',
    // coaching
    'coach',
    'lesson',
    'question',
    'quiz',
    // content
    'app',
    'audio',
    'channel',
    'doc',
    'document',
    'exercise',
    'topic',
    'video',
    'html5',
    'slideshow',
    'unlistedchannel',
    'multiple',
    'done',
    // users
    'classroom',
    'group',
    'people',
    'permission',
    'person',
    // misc
    'dot',
    'error',
    // UI
    'back',
    'forward',
    'clear',
    'dropdown',
    'language',
    'logout',
    'menu',
    'search',
    // side nav
    'learn',
    'device',
    'profile',
    'login',
    'logout',
    'coach',
    'facility',
  ];

  export default {
    name: 'KIcon',
    props: {
      icon: {
        type: String,
        required: true,
        validator(value) {
          return iconTypes.includes(value);
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
    created() {
      const SVG_FILE_PREFIX = "data:image/svg+xml;base64,";

      const styles = ":style=style";
      const a11yAttrs = `role="presentation" focusable="false"`;
      const cssClass = `:class="rtlClass"`;

      // ... hard coded svg below ...
      const svgFile = require("@material-icons/svg/svg/arrow_back/baseline.svg");
      const svgBase64 = svgFile.replace(SVG_FILE_PREFIX, "");
      const svgElementString = atob(svgBase64);
      const styledAndAccessibleSvg = svgElementString.replace("<svg", `<svg ${cssClass} ${styles} ${a11yAttrs}`);
      console.log(styledAndAccessibleSvg);
      console.log(typeof(styledAndAccessibleSvg));
      const template = VueTemplateCompiler.compileToFunctions(styledAndAccessibleSvg);
      this.$options.render = template.render;
    },
    computed: {
      /* eslint-disable kolibri/vue-no-unused-properties */
      // We are generating a string template using these computed properties so
      // they are indeed being used in the created() lifecycle hook
      style() {
        if (this.color) {
          return { fill: this.color };
        }
        return { fill: this.$themeTokens.text };
      },
      rtlClass() {
        return this.isRtl ? 'rtl-flip-icon' : '';
      },
      /* eslint-enable kolibri/vue-no-unused-properties */
    },
  };

</script>


<style lang="scss" scoped>

  .rtl-flip-icon {
    transform: scaleX(-1);
  }

</style>
