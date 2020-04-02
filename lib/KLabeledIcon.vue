<template>

  <span class="labeled-icon-wrapper">
    <span class="icon">
      <slot name="icon">
        <KIcon v-if="icon" :icon="icon" :color="color || $themeTokens.text" style="top: 2px;" />
      </slot>
    </span>
    <span class="label" :style="labelStyle">
      <!-- nest slot inside span to get alignment and flow correct for mixed RLT/LTR -->
      <span dir="auto" class="debug-warning">
        <!-- Use zero-width space when empty -->
        <slot>
          <span v-if="!labelEmpty">{{ label }}</span>
          <span v-else>&#8203;</span>
        </slot>
      </span>
    </span>
    <span class="iconAfter">
      <slot name="iconAfter">
        <KIcon v-if="iconAfter" :icon="iconAfter" :color="color || $themeTokens.text" style="top: 2px;" />
      </slot>
    </span>
  </span>

</template>


<script>

  import KIcon from './KIcon';

  export default {
    name: 'KLabeledIcon',
    components: {
      KIcon,
    },
    props: {
      // If provided, will render a KIcon using the value given as the `icon` prop. The icon will be prepended to the label.
      icon: {
        type: String,
        required: false,
      },
      // If provided, will render a KICon using the value given as the `icon` prop. The iconAfter will be appended to the label.
      iconAfter: {
        type: String,
        required: false,
      },
      // If provided, determines the color of the label and any icons that are provided.
      color: {
        type: String,
        required: false,
      },
      // If provided, will place this text in the default slot
      label: {
        type: String,
        required: false,
      },
    },
    computed: {
      labelEmpty() {
        if (this.label) {
          return false;
        }

        if (!('default' in this.$slots) || !this.$slots.default.length) {
          return true;
        }

        const defaultSlot = this.$slots.default[0];
        return !(
          defaultSlot.text ||
          defaultSlot.tag ||
          (defaultSlot.children && defaultSlot.children.length)
        );
      },
      labelStyle() {
        let styles = {};
        // Margin for icons - use em to match parent font size
        if(this.iconAfter || this.$slots['iconAfter']) {
          styles['marginRight'] = '1.975em';
        }

        if(this.icon || this.$slots['icon']) {
          styles['marginLeft'] = '1.975em';
        }

        return styles;
      },
    },
  };

</script>


<style lang="scss" scoped>

  .labeled-icon-wrapper {
    position: relative;
    display: inline-block;
  }

  .icon {
    position: absolute;
    left: 0;
  }

  .iconAfter {
    position: absolute;
    right: 0;
  }

  .label {
    display: inline-block;
  }

  .debug-warning > svg {
    // if you see this, you need to pass the icon into the slot
    border: 1px solid red;
  }

</style>
