<template>

  <!--
   This component was forked from the  library in order to handle
   dynamic styling of the action button.

   The formatting has been changed to match our linters. We may eventually
   want to simply consolidate it with our component and remove any unused
   functionality.
  -->

  <transition :name="transitionName" @after-enter="onEnter" @after-leave="onLeave">
    <div class="ui-snackbar" @click="onClick">
      <div
        class="ui-snackbar-message"
        :style="{ color: $themeTokens.textInverted }"
      >
        <slot>{{ message }}</slot>
      </div>

      <div class="ui-snackbar-action">
        <KButton
          v-if="action"
          class="ui-snackbar-action-button"
          :appearanceOverrides="{ color: $themeTokens.textInverted }"
          @click.stop="onActionClick"
        >
          {{ action }}
        </KButton>
      </div>
    </div>
  </transition>

</template>


<script>

  export default {
    name: 'UiSnackbar',
    props: {
      message: String,
      action: String,
      /* - no use after being re-vendored
      actionColor: {
        type: String,
        default: 'accent', // 'primary' or 'accent'
      },
      */
      transition: {
        type: String,
        default: 'slide', // 'slide' or 'fade'
      },
    },

    computed: {
      transitionName() {
        return 'ui-snackbar--transition-' + this.transition;
      },
    },

    methods: {
      onClick() {
        this.$emit('click');
      },

      onActionClick() {
        this.$emit('action-click');
      },

      onEnter() {
        this.$emit('show');
      },

      onLeave() {
        this.$emit('hide');
      },
    },
  };

</script>


<style lang="scss" scoped>

  /* stylelint-disable */
  
  @import '../styles/definitions';
  @import './styles/imports';

  $ui-snackbar-background-color: #323232 !default;
  $ui-snackbar-font-size: rem(14px) !default;

  .ui-snackbar {
    @extend  %dropshadow-2dp;
    @include font-family-noto;

    display: inline-flex;
    align-items: center;
    min-width: rem(288px);
    max-width: rem(568px);
    min-height: rem(48px);
    padding: rem(14px 24px);
    background-color: $ui-snackbar-background-color;
    border-radius: $ui-default-border-radius;
  }

  .ui-snackbar-message {
    flex-grow: 1;
    font-size: $ui-snackbar-font-size;
    line-height: 1.5;
    color: white;
    cursor: default;
  }

  .ui-snackbar-action {
    padding-left: rem(48px);
    margin: rem(-9px -12px);
    margin-left: auto;
  }

  .ui-snackbar-action-button {
    @include font-family-noto;

    position: relative;
    min-width: initial;
    min-height: initial;
    padding: 0;
    padding-right: rem-calc(16px);
    padding-left: rem-calc(16px);
    margin: 0;
    overflow: hidden;
    font-size: $ui-button-font-size;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    touch-action: manipulation; // IE
    cursor: pointer;
    background: none;
    background-color: $ui-snackbar-background-color !important;
    border: 0;
    border-radius: $ui-default-border-radius;
    outline: none;
    box-shadow: none;
    &:hover {
      background-color: lighten($ui-snackbar-background-color, 5%) !important;
    }
    &:focus body[modality='keyboard'] {
      background-color: lighten($ui-snackbar-background-color, 10%) !important;
    }

    &:hover:not(.is-disabled) {
      background-color: rgba(white, 0.05);
    }

    body[modality='keyboard'] &:focus {
      background-color: rgba(white, 0.1);
    }
  }

  .ui-snackbar--transition-slide-enter-active,
  .ui-snackbar--transition-slide-leave-active {
    transition: transform 0.4s ease;
  }

  .ui-snackbar--transition-slide-enter,
  .ui-snackbar--transition-slide-leave-active {
    transform: translateY(rem(84px));
  }

  .ui-snackbar--transition-fade-enter-active,
  .ui-snackbar--transition-fade-leave-active {
    transition: opacity 0.4s ease;
  }

  .ui-snackbar--transition-fade-enter,
  .ui-snackbar--transition-fade-leave-active {
    opacity: 0;
  }

</style>
