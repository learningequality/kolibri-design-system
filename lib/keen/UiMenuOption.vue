<template>

  <component
    :is="isAnchor ? 'a' : 'li'"
    class="ui-menu-option"

    role="menu-item"
    :class="classes"
    :href="isAnchor ? (disabled ? null : href) : null"
    :tabindex="(isDivider || isAnchor || disabled) ? null : '0'"
    :target="isAnchor ? (disabled ? null : target) : null"
    @focus="onFocus"
    @blur="onBlur"
    :style="isActive ? this.activeStyles : {}"

  >
    <slot v-if="!isDivider">
      <div class="ui-menu-option-content">
        <UiIcon
          v-if="icon"

          class="ui-menu-option-icon"
          :icon-set="iconProps.iconSet"
          :icon="icon"
          :remove-text="iconProps.removeText"

          :use-svg="iconProps.useSvg"
        />

        <div class="ui-menu-option-text">
          {{ label }}
        </div>

        <div v-if="secondaryText" class="ui-menu-option-secondary-text">
          {{ secondaryText }}
        </div>
      </div>
    </slot>

  </component>

</template>


<script>

  import UiIcon from './UiIcon.vue';

  export default {
    name: 'UiMenuOption',

    components: {
      UiIcon,
    },

    props: {
      type: String,
      label: String,
      href: String,
      target: String,
      icon: String,
      iconProps: {
        type: Object,
        default() {
          return {};
        },
      },
      secondaryText: String,
      disabled: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        isActive: false,
      };
    },

    computed: {
      classes() {
        return {
          'is-divider': this.isDivider,
          'is-disabled': this.disabled,
          'is-anchor': this.isAnchor,
        };
      },

      isDivider() {
        return this.type === 'divider';
      },

      isAnchor() {
        return !this.isDivider && this.href !== undefined;
      },
      activeStyles() {
        return { ...this.$coreOutline, outlineOffset: '-2px' }
      },
    },
    methods: {
      onFocus(e) {
        this.isActive = true;
        this.$emit('focus', e);
      },
      onBlur(e) {
        this.isActive = false;
        this.$emit('blur', e);
      },
    }
  };

</script>


<style lang="scss">

  /* stylelint-disable */

  @import './styles/imports';

  .ui-menu-option {
    position: relative;
    display: block;
    width: 100%;
    font-family: inherit;
    user-select: none;

    &.is-divider {
      display: block;
      height: rem(1px);
      padding: 0;
      margin: rem(6px 0);
      background-color: rgba(black, 0.08);
    }

    &:not(.is-divider) {
      min-height: rem(40px);
      font-size: $ui-dropdown-item-font-size;
      font-weight: normal;
      color: $primary-text-color;
      text-decoration: none;
      cursor: pointer;
      outline: none;

      &:hover:not(.is-disabled),
      body[modality='keyboard'] &:focus {
        background-color: $ui-menu-item-hover-color;
      }

      &:focus:not(.is-disabled),
      body[modality='keyboard'] &:focus {
        background-color: $ui-menu-item-hover-color;
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
    height: rem(40px);
    padding: rem(0 16px);
  }

  .ui-menu-option-icon {
    margin-right: rem(16px);
    font-size: rem(18px);
    color: $secondary-text-color;
  }

  .ui-menu-option-text {
    @include text-truncation;

    flex-grow: 1;
  }

  .ui-menu-option-secondary-text {
    flex-shrink: 0;
    margin-left: rem(4px);
    font-size: rem(13px);
    color: $hint-text-color;
  }

</style>
