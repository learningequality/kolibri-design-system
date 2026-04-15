<template>

  <div
    class="k-toolbar"
    :class="{ 'is-raised': raised }"
    :style="toolbarStyles"
  >
    <div class="k-toolbar-left">
      <div
        v-if="$slots.icon"
        class="k-toolbar-nav-icon"
      >
        <!-- @slot Navigation icon area (typically a KIconButton). Hidden when empty. -->
        <slot name="icon"></slot>
      </div>

      <div
        v-if="$slots.brand"
        class="k-toolbar-brand"
      >
        <!-- @slot Brand area (typically a KLogo). Hidden when empty. -->
        <slot name="brand"></slot>
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
  </div>

</template>


<script>

  export default {
    name: 'KToolbar',
    props: {
      /**
       * The main title text displayed in the toolbar
       */
      title: {
        type: String,
        default: '',
      },
      /**
       * Whether the toolbar has elevated shadow styling for visual hierarchy
       */
      raised: {
        type: Boolean,
        default: true,
      },
    },

    computed: {
      toolbarStyles() {
        return {
          color: this.$themeTokens.text,
          backgroundColor: this.$themeTokens.surface,
        };
      },
    },
  };

</script>


<style lang="scss">

  @import '../styles/definitions';

  .k-toolbar {
    position: relative;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    height: 3.5rem;
    padding: 0 16px;
    font-family: inherit;
    font-size: 1.125rem;

    &.is-raised {
      @extend %dropshadow-2dp;
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

  .k-toolbar-right {
    display: inline-block;
  }

  .k-toolbar-title {
    overflow: hidden;
    white-space: nowrap;
  }

</style>
