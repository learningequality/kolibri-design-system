<template>

  <span class="labeled-icon-wrapper" v-on="$listeners">
    <span class="icon">
      <!-- @slot Optional slot as alternative to `icon` prop -->
      <slot name="icon">
        <KIcon v-if="icon" :icon="icon" :color="color || $themeTokens.text" style="top: 2px;" />
      </slot>
    </span>
    <span class="label" :style="labelStyle">
      <!-- nest slot inside span to get alignment and flow correct for mixed RLT/LTR -->
      <span dir="auto" class="debug-warning">
        <!-- @slot Optional slot as alternative to `label` prop -->
        <slot>
          <span v-if="!labelEmpty">{{ label }}</span>
          <!-- Use zero-width space when empty -->
          <span v-else>&#8203;</span>
        </slot>
      </span>
    </span>
    <span class="icon-after">
      <!-- @slot Optional slot as alternative to `iconAfter` prop -->
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
      /**
       * Text label
       */
      label: {
        type: String,
        default: null,
      },
      /**
       * An icon that will be prepended to the label. Uses the same icon names as the `KIcon` component
       */
      icon: {
        type: String,
        default: null,
      },
      /**
       * An icon that will be appended to the label. Uses the same icon names as the `KIcon` component
       */
      iconAfter: {
        type: String,
        default: null,
      },
      /**
       * If provided, sets the color of the label and any icons that are provided
       */
      color: {
        type: String,
        default: null,
      },
      /**
       * Limits label width to this value
       */
      maxWidth: {
        type: String,
        default: '100%',
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
        const styles = {};
        let margins = 0;
        const leftLtr = this.isRtl ? 'marginRight' : 'marginLeft';
        const rightLtr = this.isRtl ? 'marginLeft' : 'marginRight';
        // Margin for icons - use em to match parent font size
        if (this.iconAfter || this.$slots['iconAfter']) {
          styles[rightLtr] = '1.975em'; // scale with parent font size
          margins += 1.975;
        }

        if (this.icon || this.$slots['icon']) {
          styles[leftLtr] = '1.975em'; // scale with parent font size
          margins += 1.975;
        }

        const maxWidth = margins > 0 ? `calc(${this.maxWidth} - ${margins}em)` : this.maxWidth;
        return { ...styles, maxWidth };
      },
    },
  };

</script>


<style lang="scss" scoped>

  .labeled-icon-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .icon {
    position: absolute;
    left: 0;
  }

  .icon-after {
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
