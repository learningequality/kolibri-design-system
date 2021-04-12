<template>

  <KButton
    :color="color"
    :disabled="disabled"
    :appearance="appearance"
    :appearanceOverrides="appearanceOverrides"
    :type="buttonType"
    :aria-label="ariaLabel"
    text=""
    v-on="$listeners"
  >
    <UiTooltip
      v-if="tooltip"
      :zIndex="24"
      open-on="hover"
      position="bottom"
    >
      {{ tooltip }}
    </UiTooltip>
    <!-- UiIconButton used flexbox - 7px is the magic centering number -->
    <KIcon :icon="icon" :color="color" :style="iconStyles" />
  </KButton>

</template>


<script>

  import UiTooltip from '../keen/UiTooltip.vue';

  export default {
    name: 'KIconButton',
    components: { UiTooltip },
    props: {
      /**
       * Button appearance: `'raised-button'` or `'flat-button'`
       */
      appearance: {
        type: String,
        default: 'flat-button',
      },
      /**
       * Name of icon to display
       */
      icon: {
        type: String,
        required: true,
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
        default: null,  // https://github.com/learningequality/kolibri-design-system/issues/168
      },
      /**
       * Tooltip label
       */
      tooltip: {
        type: String,
        default: null,  // https://github.com/learningequality/kolibri-design-system/issues/168
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
    },
  };

</script>


<style lang="scss" scoped></style>
