export default {
  props: {
    /**
     * An array of tab objects `{ id, label, to }` where `id` and `label`
     * properties are required and `to` is optional.
     * When `to` is provided, tabs render as router links.
     * Otherwise, they render as buttons.
     */
    tabs: {
      type: Array,
      required: true,
      validator: value => {
        if (!value.length) {
          console.error('There are no tabs defined');
          return false;
        }
        const isValidTab = tab => tab.id !== undefined && tab.label !== undefined;
        const areAllTabsValid = value.every(isValidTab);
        if (!areAllTabsValid) {
          console.error(`All tabs are required to have 'id' and 'label' properties defined`);
          return false;
        }
        return true;
      },
    },
    /**
     * A label that describes the purpose of the set of tabs.
     * Providing either `ariaLabel` or `ariaLabelledBy`
     * is required.
     */
    ariaLabel: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * ID reference to a DOM element which provides a label
     * that describes the purpose of the set of tabs.
     * Providing either `ariaLabel` or `ariaLabelledBy`
     * is required.
     */
    ariaLabelledBy: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Tabs text color.
     * Defaults to `$themeTokens.annotation`.
     */
    color: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Text color of an active tab.
     * Defaults to `$themeTokens.primary`.
     */
    colorActive: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Tabs background color.
     * Defaults to `$themeTokens.surface`.
     */
    backgroundColor: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Tabs hover background color.
     * Defaults to `$themeBrand.primary.v_200`.
     */
    hoverBackgroundColor: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Tabs styles that complement or override default styles
     * or styles defined via props (will be sent to `$computedClass`,
     * which means that styles that are accepted by `$computedClass`,
     * e.g. pseudo-classes, are supported)
     */
    appearanceOverrides: {
      type: Object,
      required: false,
      default: null,
    },
    /**
     * An active tab styles that complement or override default styles
     * or styles defined via props (will be sent to `$computedClass`,
     * which means that styles that are accepted by `$computedClass`,
     * e.g. pseudo-classes, are supported)
     */
    appearanceOverridesActive: {
      type: Object,
      required: false,
      default: null,
    },
    /**
     * Tab list items are hidden when printing by default.
     * `enablePrint` set to `true` makes them visible in print mode.
     */
    enablePrint: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    /**
     * @returns {Boolean} `true` if at least one tab object contains
     *                    `to` attribute (assuming that a developer wants to
     *                    use tabs together with the router in this case).
     */
    useRouter() {
      return this.tabs && this.tabs.length && this.tabs.some(tab => tab.to);
    },
  },
  mounted() {
    if (!this.ariaLabelledBy && !this.ariaLabel) {
      console.error(`[${this.$options.name}] Missing 'ariaLabel' or 'ariaLabelledBy'`);
    }
  },
};
