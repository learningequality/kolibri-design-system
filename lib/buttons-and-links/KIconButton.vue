<template>

  <KButton
    :color="color"
    :disabled="disabled"
    :appearance="appearance"
    :appearanceOverrides="appearanceOverrides"
    :buttonType="buttonType"
    :aria-label="ariaLabel"
    v-on="$listeners"
  >
    <UiTooltip
      v-if="tooltip"
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
      appearance: {
        type: String,
        default: 'flat-button',
        required: false,
      },
      icon: {
        type: String,
        required: true,
      },
      /* color: hex or rgb[a] color */
      color: {
        type: String,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      buttonType: {
        type: String,
        default: 'button',
        required: false,
      },
      size: {
        type: String,
        default: null,
      },
      ariaLabel: {
        type: String,
      },
      tooltip: {
        type: String,
        required: false,
        default: null,
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
          // Remove mins & padding
          minHeight: '0px',
          minWidth: '0px',
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
