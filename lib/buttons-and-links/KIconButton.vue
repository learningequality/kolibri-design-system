<template>

  <KButton
    :color="color"
    :disabled="disabled"
    :appearance="appearance"
    :appearanceOverrides="appearanceOverrides"
    :type="buttonType"
    :aria-label="computedAriaLabel"
    text=""
    v-on="$listeners"
  >
    <!-- if no "position" is passed as a prop, defaults to bottom, as previously -->
    <UiTooltip
      v-if="tooltip"
      :zIndex="24"
      openOn="hover"
      :position="tooltipPosition"
    >
      {{ tooltip }}
    </UiTooltip>
    <!-- UiIconButton used flexbox - 7px is the magic centering number -->
    <KIcon
      :icon="icon"
      :color="color"
      :style="iconStyles"
    />
    <!-- @slot Pass sub-components into the button, typically `KDropdownMenu` -->
    <template #menu>
      <slot name="menu"></slot>
    </template>
  </KButton>

</template>


<script>

  import UiTooltip from '../keen/UiTooltip.vue';

  export default {
    name: 'KIconButton',
    components: { UiTooltip },
    props: {
      /**
       * Name of icon to display
       */
      icon: {
        type: String,
        required: true,
      },
      /**
       * Button appearance: `'raised-button'` or `'flat-button'`
       */
      appearance: {
        type: String,
        default: 'flat-button',
      },
      /**
       * Optional hex or rgb[a] color for the button background
       */
      color: {
        type: String,
        default: null,
      },
      /**
       * Whether or not button is disabled
       */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       * HTML button `type` attribute (e.g. `'submit'`, `'reset'`)
       */
      buttonType: {
        type: String,
        default: 'button',
      },
      /**
       * Button size: `'mini'`, `'small'`, `'regular'`, or `'large'`
       */
      size: {
        type: String,
        default: 'regular',
      },
      /**
       * `aria-label` attribute
       */
      ariaLabel: {
        type: String,
        default: null, // https://github.com/learningequality/kolibri-design-system/issues/168
      },
      /**
       * Tooltip label
       */
      tooltip: {
        type: String,
        default: null, // https://github.com/learningequality/kolibri-design-system/issues/168
      },
      /**
       * Tooltip position: `'top', 'right', 'bottom', 'left'`
       */
      tooltipPosition: {
        type: String,
        default: 'bottom',
      },
    },
    computed: {
      appearanceOverrides() {
        const hover =
          this.appearance === 'flat-button' ? { backgroundColor: 'rgba(0,0,0,.1)' } : {};
        return {
          ...this.sizeStyles,
          // Circle
          borderRadius: '50%',
          // Added minWidth to prevent squished/oval effect
          minWidth: '32px',
          // Remove minHeight & padding
          minHeight: '0px',
          padding: '0',
          ':hover': hover,
        };
      },
      sizeStyles() {
        switch (this.size) {
          case 'mini':
            return { width: '24px', height: '24px' };
          case 'small':
            return { width: '32px', height: '32px' };
          case 'large':
            return { width: '48px', height: '48px' };
          default:
            return { width: '40px', height: '40px' };
        }
      },
      iconStyles() {
        const sizes = { width: '24px', height: '24px' };
        switch (this.size) {
          case 'mini':
            return { ...sizes, top: '0px' };
          case 'small':
            return { ...sizes, top: '4px' };
          default:
            return { ...sizes, top: '7px' };
        }
      },
      computedAriaLabel() {
        return this.ariaLabel || this.tooltip;
      },
    },
  };

</script>


<style lang="scss" scoped></style>
