import merge from 'lodash/merge';
import { FLAT_BUTTON, RAISED_BUTTON, BASIC_LINK, validator } from './appearances.js';

const $primaryRaisedColor = 'white';
const $primaryRaisedDisabledColor = 'rgba(white, 0.45)';

const disabledStyle = {
  pointerEvents: 'none',
  cursor: 'default',
  boxShadow: 'none',
  opacity: 0.5,
};

export default {
  props: {
    /**
     * Button label text
     */
    text: {
      type: String,
      default: null,
    },
    /**
     * Button appearance: `'raised-button'`, `'flat-button'`, or `'basic-link'`
     */
    appearance: {
      type: String,
      default: 'basic-link',
      validator,
    },
    /**
     * Overrides that will modify the styles sent to `$computedClass` based on `appearance` prop
     */
    appearanceOverrides: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Show as primary rather than secondary style (for `'raised-button'` and `'flat-button'` appearance)
     */
    primary: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      const buttonClass = 'button';
      const linkClass = 'link';
      const raisedClass = 'raised';
      if (this.appearance === BASIC_LINK) {
        return [this.buttonComputedClass(this.linkStyle), linkClass];
      } else if (this.primary && this.appearance === RAISED_BUTTON) {
        return [buttonClass, this.buttonComputedClass(this.primaryRaisedStyle), raisedClass];
      } else if (this.primary && this.appearance === FLAT_BUTTON) {
        return [buttonClass, this.buttonComputedClass(this.primaryFlatStyle)];
      } else if (!this.primary && this.appearance === RAISED_BUTTON) {
        return [buttonClass, this.buttonComputedClass(this.secondaryRaisedStyle), raisedClass];
      } else if (!this.primary && this.appearance === FLAT_BUTTON) {
        return [buttonClass, this.buttonComputedClass(this.secondaryFlatStyle)];
      }
    },
    linkStyle() {
      return {
        color: this.$themeTokens.link,
        ':hover': { color: this.$themeTokens.primaryDark },
        ':focus': this.$coreOutline,
        ...(this.disabled ? disabledStyle : {}),
      };
    },
    primaryRaisedStyle() {
      return {
        color: $primaryRaisedColor,
        backgroundColor: this.$themeTokens.primary,
        ':hover': { backgroundColor: this.$themeTokens.primaryDark },
        ':focus': { ...this.$coreOutline, outlineOffset: '6px' },
        ':disabled': Object.assign(
          {
            color: $primaryRaisedDisabledColor,
            svg: {
              fill: $primaryRaisedDisabledColor,
            },
          },
          disabledStyle
        ),
        svg: {
          fill: $primaryRaisedColor,
        },
      };
    },
    primaryFlatStyle() {
      return {
        color: this.$themeTokens.primary,
        ':hover': {
          backgroundColor: this.$themePalette.grey.v_200,
        },
        ':focus': { ...this.$coreOutline, outlineOffset: 0 },
        ':disabled': disabledStyle,
        svg: {
          fill: this.$themeTokens.secondary,
        },
      };
    },
    secondaryRaisedStyle() {
      return {
        color: this.$themeTokens.text,
        backgroundColor: this.$themePalette.grey.v_100,
        ':hover': {
          backgroundColor: this.$themePalette.grey.v_200,
        },
        ':focus': { ...this.$coreOutline, outlineOffset: '6px' },
        ':disabled': disabledStyle,
        svg: {
          fill: this.$themeTokens.text,
        },
      };
    },
    secondaryFlatStyle() {
      return {
        color: this.$themeTokens.text,
        ':hover': {
          backgroundColor: this.$themePalette.grey.v_200,
        },
        ':focus': { ...this.$coreOutline, outlineOffset: 0 },
        ':disabled': disabledStyle,
        svg: {
          fill: this.$themeTokens.text,
        },
      };
    },
  },
  methods: {
    buttonComputedClass(styles) {
      const printOverrides = this.$isPrint ? { color: '#000 !important' } : {};
      return this.$computedClass(merge({}, styles, this.appearanceOverrides, printOverrides));
    },
  },
};
