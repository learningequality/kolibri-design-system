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
          return Object.keys(KolibriIcons).includes(value);
        },
      },
      /**
       * Color to apply to the icon
       */
      color: {
        type: String,
        required: false,
      },
      /**
       * @private
       * Don't apply automatic fill, allowing external styling.
       * Currently used by the design system itself; private until we see a broader need.
       */
      disableColor: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      computedColor() {
        if (this.disableColor) {
          return null;
        }
        if (this.color) {
          return this.color;
        } else if (KolibriIcons[this.icon].defaultColor) {
          return KolibriIcons[this.icon].defaultColor;
        }
        return this.$themeTokens.text;
      },
      rtlFlip() {
        return KolibriIcons[this.icon].rtlFlip && this.isRtl;
      },
      svgIconComponent() {
        return KolibriIcons[this.icon].icon;
      },
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
