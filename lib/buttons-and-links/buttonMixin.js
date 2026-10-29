import warnOnPseudoSelectors from '../styles/warnOnPseudoSelectors.js';
import { FLAT_BUTTON, RAISED_BUTTON, BASIC_LINK, validator } from './appearances.js';

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
     * Styles that complement or override the styles of the `appearance` prop.
     * Applied inline, so a pseudo-class, media query or nested element key is dropped.
     * Use `hoverColor` and `hoverBackgroundColor` for hover, a stylesheet for the rest.
     * Any key but `color` and `backgroundColor` outranks the hover and disabled states.
     */
    appearanceOverrides: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Text color on hover. Leave unset to keep the hover color of the
     * `appearance` prop.
     */
    hoverColor: {
      type: String,
      default: null,
    },
    /**
     * Background color on hover. Leave unset to keep the hover background of
     * the `appearance` prop.
     */
    hoverBackgroundColor: {
      type: String,
      default: null,
    },
    /**
     * Show as primary rather than secondary style
     * (for `'raised-button'` and `'flat-button'` appearance)
     */
    primary: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    appearanceOverrides: {
      immediate: true,
      handler(overrides) {
        warnOnPseudoSelectors(overrides, 'appearanceOverrides', this.$options.name);
      },
    },
  },
  computed: {
    buttonClasses() {
      if (this.appearance === BASIC_LINK) {
        // an `<a>` never matches `:disabled`, so the disabled look needs a class
        return ['link', { 'is-disabled': this.disabled }];
      }
      return [
        'button',
        this.appearance === RAISED_BUTTON ? 'raised' : 'flat',
        { 'is-primary': this.primary },
      ];
    },
    buttonStyles() {
      // hardcoded, because print ink must not be themeable
      const printOverrides = this.$isPrint ? { color: '#000 !important' } : {};
      const { color, backgroundColor, ...rest } = this.appearanceOverrides;
      return [this.colorCssVariables(color, backgroundColor), rest, printOverrides];
    },
    iconColor() {
      if (this.appearance === BASIC_LINK) {
        // follows the text, which `hoverColor` and `appearanceOverrides.color` can move
        return this.hovering
          ? 'var(--k-button-hover-color, var(--tokens-primaryDark))'
          : 'var(--k-button-color, var(--tokens-primary))';
      }

      if (this.appearance === RAISED_BUTTON) {
        return this.primary ? 'var(--tokens-textInverted)' : 'var(--tokens-text)';
      }

      if (this.appearance === FLAT_BUTTON) {
        return this.primary ? 'var(--tokens-primary)' : 'var(--tokens-text)';
      }

      return {};
    },
  },
  methods: {
    colorCssVariables(color, backgroundColor) {
      const variables = {};
      if (color) {
        variables['--k-button-color'] = color;
      }
      if (backgroundColor) {
        variables['--k-button-background-color'] = backgroundColor;
      }
      if (this.hoverColor) {
        variables['--k-button-hover-color'] = this.hoverColor;
      }
      if (this.hoverBackgroundColor) {
        variables['--k-button-hover-background-color'] = this.hoverBackgroundColor;
      }
      return variables;
    },
  },
};
