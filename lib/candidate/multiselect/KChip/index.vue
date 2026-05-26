<template>

  <div
    class="k-chip"
    :class="{
      'k-chip-closeable': close,
      'k-chip-disabled': disabled,
    }"
    :style="chipStyles"
  >
    <div class="k-chip-content">
      <div class="k-chip-text">
        <slot>
          {{ text }}
        </slot>
      </div>

      <button
        v-if="close"
        class="k-chip-close-button"
        :class="closeButtonClass"
        :aria-label="computedRemoveLabel"
        type="button"
        data-testid="k-chip-close"
        :disabled="disabled || undefined"
        @click.stop="handleClose"
      >
        <span
          class="k-chip-icon-wrap"
          aria-hidden="true"
        >
          <KIcon
            icon="delete"
            :color="iconOutlineColor"
            class="k-chip-icon k-chip-icon-outline"
          />
          <KIcon
            icon="delete"
            :color="iconFilledColor"
            class="k-chip-icon k-chip-icon-filled"
          />
        </span>
      </button>
    </div>
  </div>

</template>


<script>

  export default {
    name: 'KChip',

    props: {
      /**
       * Text label displayed inside the chip.
       * Ignored when the default slot is used.
       */
      text: {
        type: String,
        default: '',
      },

      /**
       * When true, renders a remove/close button on the trailing end of the chip.
       */
      close: {
        type: Boolean,
        default: false,
      },

      /**
       * Disables the chip and makes the close button non-interactive.
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * Accessible label for the close button.
       * Defaults to "Remove <text>" when not provided.
       * Pass a translated string when deploying in non-English contexts.
       */
      removeLabel: {
        type: String,
        default: null,
      },
    },

    emits: ['close'],

    computed: {
      chipStyles() {
        if (this.disabled) {
          return {
            backgroundColor: this.$themePalette.grey.v_100,
            color: this.$themeTokens.textDisabled,
          };
        }
        return {
          backgroundColor: this.$themePalette.grey.v_200,
        };
      },

      computedRemoveLabel() {
        if (this.removeLabel) return this.removeLabel;
        return this.text ? `Remove ${this.text}` : 'Remove';
      },

      iconOutlineColor() {
        return this.disabled ? this.$themeTokens.textDisabled : this.$themePalette.grey.v_400;
      },

      iconFilledColor() {
        return this.disabled ? this.$themeTokens.textDisabled : this.$themePalette.grey.v_900;
      },

      closeButtonClass() {
        return this.$computedClass({
          ':focus': {
            ...this.$coreOutline,
            outlineOffset: 0,
          },
        });
      },
    },

    methods: {
      handleClose() {
        if (this.disabled) return;
        /**
         * Emitted when the close/remove button is activated.
         * @event close
         */
        this.$emit('close');
      },
    },
  };

</script>


<style lang="scss" scoped>

  /* https://www.w3.org/TR/WCAG21/#target-size */
  $toucharea-min-size: 44px;

  .k-chip {
    display: inline-flex;
    align-items: center;
    height: 26px;
    min-height: 26px;
    padding: 2px 12px;
    margin: 5px;
    font-size: 13px;
    white-space: nowrap;
    user-select: none;
    border-radius: 12px;
    transition: all 0.2s ease;
  }

  .k-chip-content {
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .k-chip-text {
    display: flex;
    align-items: center;
  }

  .k-chip-close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    background: transparent;
    border: 0;
    border-radius: 50%;
  }

  .k-chip.k-chip-closeable {
    padding: 3px 6px 2px 12px;
  }

  .k-chip-disabled {
    pointer-events: none;
  }

  .k-chip-icon-wrap {
    position: relative;
    display: inline-block;
    width: 24px;
    height: 24px;
    font-size: 18px;
    cursor: pointer;
  }

  .k-chip-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 24px;
    transition: opacity 0.4s ease;
    transform: translate(-50%, -50%);
  }

  .k-chip-icon-filled {
    z-index: 1;
    opacity: 0;
  }

  .k-chip-close-button:not(:disabled):hover {
    .k-chip-icon-filled {
      opacity: 1;
    }

    .k-chip-icon-outline {
      opacity: 0;
    }
  }

</style>
