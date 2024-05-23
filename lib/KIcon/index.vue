<template>

  <component
    :is="svgIconComponent"
    :style="{ fill: computedColor }"
    :class="{ 'rtl-flip-icon': rtlFlip }"
  />

</template>


<script>

  import { KolibriIcons } from './iconDefinitions';

  export default {
    name: 'KIcon',
    props: {
      /**
       * Icon token identifier
       */
      icon: {
        type: String,
        required: true,
        validator(value) {
          if (Object.keys(KolibriIcons).includes(value)) {
            return true;
          } else {
            /* eslint-disable-next-line no-console */
            console.error(`KIcon: No icon defined for token: ${value}`);
            return false;
          }
        },
      },
      /**
       * Color to apply to the icon
       */
      color: {
        type: String,
        default: null,
      },
      /**
       * @ignore
       * Don't apply automatic fill, allowing external styling.
       * Currently used by the design system itself. Not exposed until we see a broader need
       */
      disableColor: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      selectedIcon() {
        if (!KolibriIcons[this.icon]) {
          return KolibriIcons.brokenImage;
        }
        return KolibriIcons[this.icon];
      },
      computedColor() {
        if (this.disableColor) {
          return null;
        }
        if (this.color) {
          return this.color;
        } else if (this.selectedIcon.defaultColor) {
          return this.selectedIcon.defaultColor;
        }
        return this.$themeTokens.text;
      },
      rtlFlip() {
        return this.selectedIcon.rtlFlip && this.isRtl;
      },
      svgIconComponent() {
        return this.selectedIcon.icon;
      },
    },
    mounted() {
      if (KolibriIcons[this.icon].fixedColor && this.color) {
        // eslint-disable-next-line no-console
        console.error(
          `KIcon: ${this.icon} color property will not be applied because the icon has a fixed color.`
        );
      }
    },
  };

</script>


<style lang="scss" scoped>

  @import '../styles/definitions';

  svg {
    position: relative;
    top: 0.125em;
    width: 1.125em;
    height: 1.125em;
    transition: fill $core-time ease;
  }

  .rtl-flip-icon {
    transform: scaleX(-1);
  }

</style>
