<template>

  <div
    class="k-toolbar"
    :class="classes"
    :style="toolbarStyles"
  >
    <div class="k-toolbar-left">
      <div
        v-if="!removeNavIcon"
        class="k-toolbar-nav-icon"
      >
        <!-- @slot Customize the navigation icon. Provides a UiIconButton by default. -->
        <slot name="icon">
          <UiIconButton
            size="large"
            type="secondary"
            :color="textColor"
            :icon="navIcon"
            @click="navIconClick"
          />
        </slot>
      </div>

      <div
        v-if="brand || $slots.brand"
        class="k-toolbar-brand"
      >
        <!-- @slot Customize the brand area. Shows brand text by default. -->
        <slot name="brand">
          <div class="k-toolbar-brand-text">
            {{ brand }}
          </div>
        </slot>
      </div>

      <!-- @slot Main content area. Shows the title by default. -->
      <slot>
        <div
          v-if="title"
          class="k-toolbar-title"
        >
          {{ title }}
        </div>
      </slot>

      <div
        v-if="$slots.navigation"
        class="k-toolbar-nav"
      >
        <!-- @slot Navigation links or menu items area. -->
        <slot name="navigation"></slot>
      </div>
    </div>

    <div class="k-toolbar-right">
      <!-- @slot Action buttons or secondary controls area. -->
      <slot name="actions"></slot>
    </div>

    <UiProgressLinear
      v-show="loading"
      class="k-toolbar-progress"
      :color="progressColor"
    />
  </div>

</template>


<script>

  import UiIconButton from './keen/UiIconButton.vue';
  import UiProgressLinear from './keen/UiProgressLinear.vue';

  export default {
    name: 'KToolbar',
    components: {
      UiIconButton,
      UiProgressLinear,
    },

    props: {
      /**
       * Controls the toolbar appearance and styling. Options are:
       * - 'default': Standard white background with shadow
       * - 'colored': Uses theme primary color as background
       * - 'clear': Transparent background with no shadow or border
       */
      type: {
        type: String,
        default: 'default',
        validator(value) {
          return ['default', 'colored', 'clear'].includes(value);
        },
      },
      /**
       * Controls the text color throughout the toolbar. Use 'white' for dark backgrounds
       * and 'black' for light backgrounds to ensure proper contrast.
       */
      textColor: {
        type: String,
        default: 'black',
        validator(value) {
          return ['black', 'white'].includes(value);
        },
      },
      /**
       * The main title text displayed in the toolbar
       */
      title: {
        type: String,
        default: '',
      },
      /**
       * Brand text displayed alongside the title in the left area
       */
      brand: {
        type: String,
        default: '',
      },
      /**
       * Icon name displayed in the navigation button when using the default icon slot
       */
      navIcon: {
        type: String,
        default: 'menu',
      },
      /**
       * Whether to hide the navigation icon button completely
       */
      removeNavIcon: {
        type: Boolean,
        default: false,
      },
      /**
       * Whether the toolbar has elevated shadow styling for visual hierarchy
       */
      raised: {
        type: Boolean,
        default: true,
      },
      /**
       * Position of the loading progress bar indicator. Options are 'top' or 'bottom'.
       */
      progressPosition: {
        type: String,
        default: 'bottom',
        validator(value) {
          return ['top', 'bottom'].includes(value);
        },
      },
      /**
       * Whether to show the loading progress indicator
       */
      loading: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      classes() {
        return [
          `k-toolbar--type-${this.type}`,
          `k-toolbar--text-color-${this.textColor}`,
          `k-toolbar--progress-position-${this.progressPosition}`,
          { 'is-raised': this.raised },
        ];
      },
      toolbarStyles() {
        if (this.type === 'colored') {
          return { backgroundColor: this.$themeBrand.primary.v_600 };
        }
        return {};
      },
      progressColor() {
        return this.textColor === 'black' ? 'primary' : 'white';
      },
    },

    methods: {
      navIconClick() {
        /**
         * Emitted when the navigation icon is clicked
         * @event nav-icon-click
         */
        this.$emit('nav-icon-click');
      },
    },
  };

</script>


<!-- Your existing styles -->

<style lang="scss">

  @import './styles/definitions';
  @import './keen/styles/imports';

  $k-toolbar-font-size: rem(18px) !default;
  $k-toolbar-height: rem(56px) !default;

  .k-toolbar {
    position: relative;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    height: $k-toolbar-height;
    padding: 0 16px;
    font-family: inherit;
    font-size: $k-toolbar-font-size;

    &.is-raised {
      @extend %dropshadow-2dp;
    }

    &:not(.is-raised).k-toolbar--type-default {
      border-bottom: 1px solid $divider-color;
    }

    .ui-icon-button {
      width: 48px;
      height: 48px;
    }
  }

  .k-toolbar-left {
    display: flex;
    align-items: center;
    margin-left: 16px;
  }

  .k-toolbar-nav-icon {
    margin-right: 8px;
    margin-left: -16px;
  }

  .k-toolbar-nav {
    display: flex;
    align-items: baseline;
    margin-right: 8px;
    margin-left: 16px;
  }

  .k-toolbar-brand {
    min-width: inherit;
  }

  .k-toolbar-brand-text {
    flex-grow: 1;
    padding-right: 8px;
  }

  .k-toolbar__body {
    &.has-brand-divider {
      padding-left: 24px;
      border-left-style: solid;
      border-left-width: 1px;
    }
  }

  .k-toolbar-right {
    display: inline-block;
  }

  .k-toolbar-progress {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 3px;
  }

  .k-toolbar-title {
    overflow: hidden;
    white-space: nowrap;
  }

  // ================================================
  // Types
  // ================================================

  .k-toolbar--type-default {
    background-color: white;
  }

  .k-toolbar--type-clear {
    background-color: transparent;
    border: 0;
    box-shadow: none;
  }

  // ================================================
  // Text colors
  // ================================================

  .k-toolbar--text-color-black {
    color: $primary-text-color;

    .k-toolbar__body {
      border-left-color: rgba(0, 0, 0, 0.15);
    }
  }

  .k-toolbar--text-color-white {
    color: white;

    .k-toolbar__body {
      border-color: rgba(255, 255, 255, 0.4);
    }
  }

  // ================================================
  // Progress positions
  // ================================================

  .k-toolbar--progress-position-top {
    .k-toolbar-progress {
      top: 0;
    }
  }

</style>
