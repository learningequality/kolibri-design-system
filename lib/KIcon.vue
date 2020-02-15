<!--
  No template here. This component uses a render function dynamically
  below in the created() lifecycle hook
-->

<script>
  const VueTemplateCompiler = require('vue-template-compiler');

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
      materialName: {
        type: String,
        required: false,
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

      // Dynamically pull in the icon requested and console an error if we cannot find it.
      let svgFile;
      try {
        svgFile = require(`@material-icons/svg/svg/${fileName}/baseline.svg`);
      } catch(e) {
        console.error(`Could not load SVG for ${fileName}`);
        return;
      }

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


<style scoped>

  .rtl-flip-icon {
    transform: scaleX(-1);
  }

</style>
