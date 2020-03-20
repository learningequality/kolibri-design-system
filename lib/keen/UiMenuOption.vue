<template>

  <li
    ref="menuOption"
    class="ui-menu-option"
    role="menu-item"

    :class="classes"
    :tabindex="(isDivider || disabled) ? null : '0'"
  >
    <slot v-if="!isDivider">
      <div class="ui-menu-option-content">
        <div class="ui-menu-option-text">
          {{ label }}
        </div>
        <div v-if="secondaryText" class="ui-menu-option-secondary-text">
          {{ secondaryText }}
        </div>
      </div>
    </slot>

  </li>

</template>


<script>

  export default {
    name: 'UiMenuOption',

    props: {
      type: String,
      label: String,
      secondaryText: String,
      disabled: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      classes() {
        return {
          'is-divider': this.isDivider,
          'is-disabled': this.disabled,
        };
      },

      isDivider() {
        return this.type === 'divider';
      },
    },
  };

</script>


<style lang="scss">

  @import './styles/imports';

  /* stylelint-disable */

  .ui-menu-option {
    position: relative;
    display: block;
    width: 100%;
    font-family: $font-stack;
    user-select: none;

    &.is-divider {
      display: block;
      height: rem-calc(1px);
      padding: 0;
      margin: rem-calc(6px 0);
      background-color: rgba(black, 0.08);
    }

    &:not(.is-divider) {
      min-height: rem-calc(40px);
      font-size: $ui-dropdown-item-font-size;
      font-weight: normal;
      color: $primary-text-color;
      cursor: pointer;
      outline: none;

      &:hover:not(.is-disabled),
      body[modality='keyboard'] &:focus {
        background-color: #eeeeee; // rgba(black, 0.1);
      }

      &.is-disabled {
        color: $secondary-text-color;
        cursor: default;
        opacity: 0.5;

        .ui-menu-option-secondary-text {
          color: $secondary-text-color;
        }
      }
    }
  }

  .ui-menu-option-content {
    display: flex;
    align-items: center;
    height: rem-calc(40px);
    padding: rem-calc(0 16px);
  }

  .ui-menu-option-text {
    @include text-truncation;

    flex-grow: 1;
  }

  .ui-menu-option-secondary-text {
    flex-shrink: 0;
    margin-left: rem-calc(4px);
    font-size: rem-calc(13px);
    color: $hint-text-color;
  }

</style>
