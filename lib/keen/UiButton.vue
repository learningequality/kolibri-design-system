<template>

  <component
    :is="isAnchor ? 'a' : 'button'"

    class="ui-button"
    :class="classes"
    :style="{ backgroundColor: buttonColor }"
    :disabled="disabled || loading"
    :href="isAnchor ? (disabled ? null : href) : null"
    :type="isAnchor ? null : buttonType"

    @click="onClick"
  >
    <div class="ui-button__content">
      <div v-if="icon || $slots.icon" class="ui-button__icon">
        <slot name="icon">
          <UiIcon :icon="icon" />
        </slot>
      </div>

      <slot></slot>

      <UiIcon
        v-if="hasDropdown && iconPosition !== 'right'"
        class="ui-button__dropdown-icon"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M6.984 9.984h10.03L12 15z" />
        </svg>
      </UiIcon>
    </div>

    <div class="ui-button__focus-ring"></div>

    <UiProgressCircular
      v-if="loading"
      class="ui-button__progress"

      disable-transition
      :color="progressColor"
      :size="18"

      :stroke="4.5"
    />


    <UiPopover
      v-if="hasDropdown"
      ref="dropdown"

      contain-focus
      :append-to-body="appendDropdownToBody"
      :constrain-to-scroll-parent="constrainDropdownToScrollParent"
      :position="dropdownPosition"

      :open-on="openDropdownOn"
      @close="onDropdownClose"

      @open="onDropdownOpen"
    >
      <slot name="dropdown"></slot>
    </UiPopover>

    <UiTooltip
      v-if="tooltip"
      :open-on="openTooltipOn"

      :position="tooltipPosition"
    >
      {{ tooltip }}
    </UiTooltip>
  </component>

</template>

<script>

  import UiIcon from './UiIcon.vue';
  import UiPopover from './UiPopover.vue';
  import UiProgressCircular from './UiProgressCircular.vue';
  import UiTooltip from './UiTooltip.vue';

  export default {
    name: 'UiButton',

    components: {
      UiIcon,
      UiPopover,
      UiProgressCircular,
      UiTooltip,
    },

    props: {
      type: {
        type: String,
        default: 'primary', // 'primary' or 'secondary'
      },
      buttonType: String,
      href: String,
      color: {
        type: String,
        default: 'default', // 'default', 'primary', 'accent', 'green', 'orange', or 'red'
      },
      size: {
        type: String,
        default: 'normal', // 'small', 'normal', 'large'
      },
      raised: {
        type: Boolean,
        default: false,
      },
      icon: String,
      iconPosition: {
        type: String,
        default: 'left', // 'left' or 'right'
      },
      loading: {
        type: Boolean,
        default: false,
      },
      hasDropdown: {
        type: Boolean,
        default: false,
      },
      dropdownPosition: {
        type: String,
        default: 'bottom-start',
      },
      appendDropdownToBody: {
        type: Boolean,
        default: true,
      },
      constrainDropdownToScrollParent: {
        type: Boolean,
        default: true,
      },
      openDropdownOn: {
        type: String,
        default: 'click', // 'click', 'hover', 'focus', or 'always'
      },
      tooltip: String,
      openTooltipOn: String,
      tooltipPosition: String,
      disabled: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      classes() {
        return [
          `ui-button--type-${this.type}`,
          `ui-button--color-${this.color}`,
          `ui-button--icon-position-${this.iconPosition}`,
          `ui-button--size-${this.size}`,
          { 'is-anchor': this.isAnchor },
          { 'is-raised': this.raised },
          { 'is-loading': this.loading },
          { 'is-disabled': this.disabled || this.loading },
          { 'has-dropdown': this.hasDropdown },
        ];
      },

      isAnchor() {
        return this.href !== undefined;
      },

      progressColor() {
        if (this.color === 'default' || this.type === 'secondary') {
          return 'black';
        }

        return 'white';
      },
      buttonColor(){
        if(this.color === 'primary' && this.type === 'primary'){
          return this.$themeBrand?.primary?.v_600;
        }
      }
    },


    methods: {
      onClick(e) {
        this.$emit('click', e);
      },

      onDropdownOpen() {
        this.$emit('dropdown-open');
      },

      onDropdownClose() {
        this.$emit('dropdown-close');
      },

      openDropdown() {
        if (this.$refs.dropdown) {
          this.$refs.dropdown.open();
        }
      },

      closeDropdown() {
        if (this.$refs.dropdown) {
          this.$refs.dropdown.close();
        }
      },

      toggleDropdown() {
        if (this.$refs.dropdown) {
          this.$refs.dropdown.toggle();
        }
      },
    },
  };

</script>

<style lang="scss">
  @import '../styles/definitions';
  @import './styles/imports';

  .ui-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: rem(80px);
    height: $ui-button-height;
    padding: 0;
    padding-right: rem(16px);
    padding-left: rem(16px);
    overflow: hidden;
    font-family: $font-stack;
    font-size: $ui-button-font-size;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    touch-action: manipulation; // IE
    cursor: pointer;
    background: none;
    border: none;
    border-radius: $ui-default-border-radius;
    outline: none;

    // Remove the Firefox dotted outline
    &::-moz-focus-inner {
      border: 0;
    }

    &.has-focus-ring:focus,
    body[modality='keyboard'] &:focus {
      .ui-button__focus-ring::before {
        opacity: 1;
        transform: scale(1.1);
      }
    }

    &.is-anchor {
      text-decoration: none;
      cursor: pointer;

      &.is-disabled {
        cursor: default;
      }
    }

    &.is-raised {
      @extend %dropshadow-2dp;
      transition: box-shadow 0.3s ease;

      &.has-focus-ring:focus,
      body[modality='keyboard'] &:focus {
        @extend %dropshadow-2dp;
      }
    }

    &.is-loading {
      .ui-button__content {
        opacity: 0;
      }
    }

    &.is-disabled {
      opacity: 0.6;
    }
  }

  .ui-button__content {
    position: relative; // IE: prevents shifting when the button is pressed
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
  }

  .ui-button__icon {
    margin-top: rem(-2px);
    margin-right: rem(6px);
    margin-left: rem(-4px);
  }

  .ui-button__dropdown-icon {
    margin-right: rem(-6px);
    margin-left: rem(2px);
    font-size: rem(18px);
  }

  .ui-button__focus-ring {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    &::before {
      position: relative;
      top: 0;
      left: 0;
      display: block;
      padding-top: 100%; // 1:1 aspect ratio - makes height the same as button width
      margin-top: calc(-1 * (50% - #{$ui-button-height / 2}));
      content: '';
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
      transform: scale(0);
    }
  }

  .ui-progress-circular.ui-button__progress {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .ui-button-group {
    display: flex;
    flex-wrap: wrap;
  }

  // ================================================
  // Icon positions
  // ================================================

  .ui-button--icon-position-right {
    .ui-button__icon {
      order: 1;
      margin-right: rem(-4px);
      margin-left: rem(6px);
    }
  }

  // ================================================
  // Sizes
  // ================================================

  .ui-button--size-small {
    height: $ui-button-height--small;
    padding-right: rem(12px);
    padding-left: rem(12px);
    font-size: $ui-button-font-size--small;

    .ui-button__icon {
      margin-top: 0;
      margin-left: 0;

      .ui-icon {
        font-size: rem(18px);
      }
    }

    .ui-button__dropdown-icon {
      margin-right: rem(-4px);
    }

    &.ui-button--icon-position-right {
      .ui-button__icon {
        margin-right: 0;
        margin-left: rem(6px);
      }
    }
  }

  .ui-button--size-large {
    height: $ui-button-height--large;
    padding-right: rem(24px);
    padding-left: rem(24px);
    font-size: $ui-button-font-size--large;

    .ui-button__icon {
      margin-right: rem(8px);
      margin-left: rem(-4px);
    }

    .ui-button__dropdown-icon {
      margin-left: rem(4px);
      font-size: rem(24px);
    }

    &.ui-button--icon-position-right {
      .ui-button__icon {
        margin-right: rem(-4px);
        margin-left: rem(8px);
      }
    }
  }

  // ================================================
  // Types and colors
  // ================================================

  .ui-button--type-primary {
    .ui-button__focus-ring::before {
      background-color: rgba(black, 0.12);
    }

    &.ui-button--color-default {
      color: $primary-text-color;
      background-color: $md-grey-200;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: darken($md-grey-200, 7.5%);
      }

      .ui-ripple-ink__ink {
        opacity: 0.2;
      }

      .ui-button__icon,
      .ui-button__dropdown-icon {
        color: $secondary-text-color;
      }
    }

    &.ui-button--color-primary,
    &.ui-button--color-accent,
    &.ui-button--color-green,
    &.ui-button--color-orange,
    &.ui-button--color-red {
      color: white;

      .ui-ripple-ink__ink {
        opacity: 0.4;
      }
    }

    &.ui-button--color-primary {
      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: darken($brand-primary-color, 10%);
      }
    }

    &.ui-button--color-accent {
      background-color: $brand-accent-color;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: darken($brand-accent-color, 10%);
      }
    }

    &.ui-button--color-green {
      background-color: $md-green;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: darken($md-green, 10%);
      }
    }

    &.ui-button--color-orange {
      background-color: $md-orange;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: darken($md-orange, 10%);
      }
    }

    &.ui-button--color-red {
      background-color: $md-red;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: darken($md-red, 10%);
      }
    }
  }

  .ui-button--type-secondary {
    background-color: transparent;

    &.ui-button--color-default {
      color: $primary-text-color;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: $md-grey-200;
      }

      .ui-button__focus-ring::before {
        background-color: rgba(black, 0.12);
      }

      .ui-button__icon {
        color: $secondary-text-color;
      }
    }

    &.ui-button--color-primary {
      color: $brand-primary-color;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: rgba($brand-primary-color, 0.12);
      }

      .ui-button__focus-ring::before {
        background-color: rgba($brand-primary-color, 0.26);
      }
    }

    &.ui-button--color-accent {
      color: $brand-accent-color;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: rgba($brand-accent-color, 0.12);
      }

      .ui-button__focus-ring::before {
        background-color: rgba($brand-accent-color, 0.26);
      }
    }

    &.ui-button--color-green {
      color: $md-green-600;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: rgba($md-green-600, 0.12);
      }

      .ui-button__focus-ring::before {
        background-color: rgba($md-green-600, 0.26);
      }
    }

    &.ui-button--color-orange {
      color: $md-orange;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: rgba($md-orange, 0.12);
      }

      .ui-button__focus-ring::before {
        background-color: rgba($md-orange, 0.26);
      }
    }

    &.ui-button--color-red {
      color: $md-red;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: rgba($md-red, 0.12);
      }

      .ui-button__focus-ring::before {
        background-color: rgba($md-red, 0.26);
      }
    }
  }

</style>
