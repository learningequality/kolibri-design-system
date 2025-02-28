<template>

  <!--
     This component was forked from the  library in order to handle
     dynamic styling.

     The formatting has been changed to match our linters. We may eventually
     want to simply consolidate it with our component and remove any unused
     functionality.
    -->
  <component
    :is="isAnchor ? 'a' : 'button'"
    ref="button"
    class="ui-icon-button"
    :aria-label="ariaLabel || tooltip"
    :class="classes"
    :style="buttonColor"
    :disabled="disabled || loading"
    tabindex="0"
    :href="isAnchor ? (disabled ? null : href) : null"
    :type="isAnchor ? null : buttonType"

    @click="onClick"
  >
    <div
      v-if="icon || $slots.default"
      class="ui-icon-button-icon"
      :style="{
        color: !primaryType ? $themeTokens.primary : ''
      }"
    >
      <slot>
        <UiIcon :icon="icon" />
      </slot>
    </div>

    <div 
      class="ui-icon-button-focus-ring"
    ></div>
    <KCircularLoader
      v-show="loading"

      class="keen-ui-icon-button-progress"
      :size="size === 'large' ? 24 : 18"

      :stroke="4.5"
    />

    <UiPopover
      v-if="hasDropdown"
      ref="dropdown"

      constain-focus
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
  import UiTooltip from './UiTooltip.vue';

  export default {
    name: 'UiIconButton',

    components: {
      UiIcon,
      UiPopover,
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
        default: 'normal', // 'mini', 'small', normal', or 'large'
      },
      icon: String,
      ariaLabel: String,
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
          `ui-icon-button--type-${this.type}`,
          `ui-icon-button--color-${this.color}`,
          `ui-icon-button--size-${this.size}`,
          { 'is-anchor': this.isAnchor },
          { 'is-loading': this.loading },
          { 'is-disabled': this.disabled || this.loading },
          { 'has-dropdown': this.hasDropdown },
        ];
      },

      primaryType() {
        return this.type === 'primary';
      },
      primaryColor() {
        return this.color === 'primary';
      },
      buttonColor() {
        if (this.primaryColor && this.primaryType) {
          const style = {
            backgroundColor: this.$themeTokens.primary,
          };
          if (this.dropdownOpen) {
            style[':hover:not(.is-disabled)'] = {
              backgroundColor: this.$themeTokens.primaryDark,
            };
          }
          return style;
        } else if (this.primaryColor && !this.primaryType) {
          const style = {
            color: this.$themeTokens.primary,
            fill: this.$themeTokens.primary,
          };
          if (this.dropdownOpen) {
            style[':hover:not(.is-disabled)'] = {
              backgroundColor: this.$darken1(this.$themeBrand.primary.v_600)
            }
          }
          style['--focus-ring-bg'] =this.$darken2(this.$themeBrand.primary.v_600)
          return style;
        }

        return {};
      },

      isAnchor() {
        return this.href !== undefined;
      },
      /* !! removed during vendoring
      progressColor() {
        if (this.type === 'primary') {
          if (this.color === 'default' || this.color === 'black') {
            return 'black';
          }

          return 'white';
        }

        if (this.color === 'white') {
          return 'white';
        }

        return 'black';
      },
      */
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
      /**
       * @public
       */
      openDropdown() {
        if (this.$refs.dropdown) {
          this.$refs.dropdown.open();
        }
      },
      /**
       * @public
       */
      closeDropdown() {
        if (this.$refs.dropdown) {
          this.$refs.dropdown.close();
        }
      },
      /**
       * @public
       */
      toggleDropdown() {
        if (this.$refs.dropdown) {
          this.$refs.dropdown.toggle();
        }
      },
    },
  };

</script>


<style lang="scss">

  @import './styles/imports';

  /* stylelint-disable */

  $ui-icon-button-size: rem(36px) !default;
  $ui-icon-button--size-mini: rem(24px) !default;
  $ui-icon-button--size-small: rem(32px) !default;
  $ui-icon-button--size-large: rem(48px) !default;

  .ui-icon-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    overflow: hidden;
    cursor: pointer;
    background: none;
    border: none;
    border-radius: 50%;
    outline: none;

    // Fix for border radius not clipping internal content of positioned elements (Chrome/Opera)
    -webkit-mask-image: -webkit-radial-gradient(circle, white, black);

    &,
    .ui-icon-button-focus-ring {
      width: $ui-icon-button-size;
      height: $ui-icon-button-size;
    }

    body[modality='keyboard'] &:focus {
      .ui-icon-button-focus-ring {
        opacity: 1;
        transform: scale(1);
      }
    }

    // Remove the Firefox dotted outline
    &::-moz-focus-inner {
      border: 0;
    }

    &.is-anchor {
      text-decoration: none;
      cursor: pointer;

      &.is-disabled {
        cursor: default;
      }
    }

    &.is-loading {
      .ui-icon-button-icon {
        opacity: 0;
      }
    }

    &.is-disabled {
      opacity: 0.6;
    }
  }

  .ui-icon-button-icon {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%; // Firefox: needs the width and height reset for flexbox centering
    height: initial;
    color: currentColor;
    opacity: 1;
    transition: opacity 0.2s ease;
    transition-delay: 0.1s;

    .ui-icon {
      display: block;
    }
  }

  .ui-icon-button-focus-ring {
    position: absolute;
    top: 0;
    left: 0;
    width: $ui-icon-button-size;
    height: $ui-icon-button-size;
    border-radius: 50%;
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform: scale(0);
    transform-origin: center;
  }

  .ui-progress-circular.ui-icon-button-progress {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  // ================================================
  // Sizes
  // ================================================

  .ui-icon-button--size-mini {
    &,
    .ui-icon-button-focus-ring {
      width: $ui-icon-button--size-mini;
      height: $ui-icon-button--size-mini;
    }

    .ui-icon {
      font-size: rem(18px);
    }
  }

  .ui-icon-button--size-small {
    &,
    .ui-icon-button-focus-ring {
      width: $ui-icon-button--size-small;
      height: $ui-icon-button--size-small;
    }

    .ui-icon {
      font-size: rem(18px);
    }
  }

  .ui-icon-button--size-large {
    &,
    .ui-icon-button-focus-ring {
      width: $ui-icon-button--size-large;
      height: $ui-icon-button--size-large;
    }
  }

  // ================================================
  // Colors
  // ================================================

  .ui-icon-button--color-black,
  .ui-icon-button--color-white {
    background-color: transparent;

    &:hover:not(.is-disabled),
    &.has-dropdown-open {
      background-color: rgba(black, 0.1);
    }

    .ui-icon-button-focus-ring {
      background-color: rgba(black, 0.12);
    }
  }

  .ui-icon-button--color-black {
    color: $secondary-text-color;
  }

  .ui-icon-button--color-white {
    color: white;
  }

  // ================================================
  // Types
  // ================================================

  .ui-icon-button--type-primary {
    &.ui-icon-button--color-default {
      color: $primary-text-color;
      background-color: $md-grey-200;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: darken($md-grey-200, 7.5%);
      }

      .ui-icon-button-focus-ring {
        background-color: darken($md-grey-200, 12%);
      }
    }

    &.ui-icon-button--color-primary,
    &.ui-icon-button--color-accent,
    &.ui-icon-button--color-green,
    &.ui-icon-button--color-orange,
    &.ui-icon-button--color-red {
      color: white;
    }

    

    &.ui-icon-button--color-accent {
      background-color: $brand-accent-color;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: darken($brand-accent-color, 10%);
      }

      .ui-icon-button-focus-ring {
        background-color: darken($brand-accent-color, 12%);
      }
    }

    &.ui-icon-button--color-green {
      background-color: $md-green;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: darken($md-green, 10%);
      }

      .ui-icon-button-focus-ring {
        background-color: darken($md-green, 12%);
      }
    }

    &.ui-icon-button--color-orange {
      background-color: $md-orange;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: darken($md-orange, 10%);
      }

      .ui-icon-button-focus-ring {
        background-color: darken($md-orange, 12%);
      }
    }

    &.ui-icon-button--color-red {
      background-color: $md-red;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: darken($md-red, 10%);
      }

      .ui-icon-button-focus-ring {
        background-color: darken($md-red, 12%);
      }
    }
  }

  .ui-icon-button--type-secondary {
    &.ui-icon-button--color-default {
      color: $secondary-text-color;

      &:hover:not(.is-disabled),
      &.has-dropdown-open,
      &.has-focus-ring:focus,
      body[modality='keyboard'] &:focus {
        color: $primary-text-color;
      }

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: rgba(black, 0.1);
      }

      .ui-icon-button-focus-ring {
        background-color: rgba(black, 0.26);
      }
    }


    &.ui-icon-button--color-accent {
      color: $brand-accent-color;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: rgba($brand-accent-color, 0.12);
      }

      .ui-icon-button-focus-ring {
        background-color: rgba($brand-accent-color, 0.26);
      }
    }

    &.ui-icon-button--color-green {
      color: $md-green-600;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: rgba($md-green-600, 0.12);
      }

      .ui-icon-button-focus-ring {
        background-color: rgba($md-green-600, 0.26);
      }
    }

    &.ui-icon-button--color-orange {
      color: $md-orange;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: rgba($md-orange, 0.12);
      }

      .ui-icon-button-focus-ring {
        background-color: rgba($md-orange, 0.26);
      }
    }

    &.ui-icon-button--color-red {
      color: $md-red;

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: rgba($md-red, 0.12);
      }

      .ui-icon-button-focus-ring {
        background-color: rgba($md-red, 0.26);
      }
    }
  }

</style>
