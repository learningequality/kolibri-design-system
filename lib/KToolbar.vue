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
        <slot name="brand">
          <div class="k-toolbar-brand-text">
            {{ brand }}
          </div>
        </slot>
      </div>
      <slot>
        <div
          v-if="title"
          class="k-toolbar-title"
        >
          {{ title }}
        </div>
      </slot>
      <slot
        name="navigation"
        class="k-toolbar-nav"
      ></slot>
    </div>

    <div class="k-toolbar-right">
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
    name: 'UiToolbar',

    components: {
      UiIconButton,
      UiProgressLinear,
    },

    props: {
      type: {
        type: String,
        default: 'default', // 'default', 'colored' or 'clear' - colored is brand primary color
      },
      textColor: {
        type: String,
        default: 'black', // 'black' or 'white'
      },
      title: {
        type: String,
        default: '',
      },
      brand: {
        type: String,
        default: '',
      },
      navIcon: {
        type: String,
        default: 'menu',
      },
      removeNavIcon: {
        type: Boolean,
        default: false,
      },
      raised: {
        type: Boolean,
        default: true,
      },
      progressPosition: {
        type: String,
        default: 'bottom', // 'top' or 'bottom'
      },
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
        this.$emit('nav-icon-click');
      },
    },
  };

</script>


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
