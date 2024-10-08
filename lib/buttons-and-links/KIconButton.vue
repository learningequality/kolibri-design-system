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
    <UiTooltip
      v-if="tooltip"
      :zIndex="24"
      open-on="hover"
      :position="tooltipPosition" 
    >
      {{ tooltip }}
    </UiTooltip>
    <KIcon :icon="icon" :color="color" :style="iconStyles" />
    <slot name="menu"></slot>
  </KButton>

</template>

<script>

  import UiTooltip from '../keen/UiTooltip.vue';

  export default {
    name: 'KIconButton',
    components: { UiTooltip },
    props: {
      icon: {
        type: String,
        required: true,
      },
      appearance: {
        type: String,
        default: 'flat-button',
      },
      color: {
        type: String,
        default: null,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      buttonType: {
        type: String,
        default: 'button',
      },
      size: {
        type: String,
        default: 'regular',
      },
      ariaLabel: {
        type: String,
        default: null,
      },
      tooltip: {
        type: String,
        default: null,
      },
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
          borderRadius: '50%',
          minWidth: '32px',
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
