<template>

  <div class="k-radio-button-container" :class="{ 'k-radio-button-disabled': disabled }" @click="toggleCheck">
    <div class="tr">
      <div class="k-radio-button">
        <input
          :id="id"
          ref="input"
          v-autofocus="autofocus"
          type="radio"
          :tabindex="tabIndex"
          class="k-radio-button-input"
          :checked="isChecked"
          :value="buttonValue !== null ? buttonValue : value"
          :disabled="disabled"
          @click.stop="toggleCheck"
          @focus="active = true"
          @blur="blur"
          @change="update"
          @keydown="keydown"
        >

        <KIcon
          v-if="isChecked"
          icon="radioSelected"
          class="radio-button-icon"
          name="radio_button_checked"
          :style="[{ fill: $themeTokens.primary }, disabledStyle, activeStyle ]"
        />
        <KIcon
          v-else
          icon="radioUnselected"
          class="radio-button-icon"
          name="radio_button_unchecked"
          :style="[{ fill: $themeTokens.annotation }, disabledStyle, activeStyle ]"
        />
      </div>

      <label
        :dir="labelDir"
        class="k-radio-button-label"
        :for="id"
        :class="{ 'visuallyhidden': !showLabel }"
        :style="labelStyle"
        @click.prevent
      >
        <template v-if="$slots.default">
          <!-- @slot Optional slot as alternative to `label` prop -->
          <slot></slot>
        </template>
        <template v-else>
          <div :class="[truncateText]">{{ label }}</div>
        </template>
        <div v-if="description" class="description" :style="[{ color: disabled ? '' : $themeTokens.annotation }, disabledStyle ]">
          {{ description }}
        </div>
      </label>
    </div>
  </div>

</template>


<script>

  const autofocus = {
    inserted(el, { value }) {
      if (value) {
        el.focus();
      }
    },
  };

  /**
   * Used to display radio buttons.
   *
   * To be used within `KRadioButtonGroup`.
   */
  export default {
    name: 'KRadioButton',
    directives: {
      autofocus,
    },
    model: {
      prop: 'currentValue',
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
       * Whether or not to show the label
       */
      showLabel: {
        type: Boolean,
        default: true,
      },
      /**
       * RTL dir of the text label
       * Options: 'auto', 'ltr', 'rtl', null.
       */
      labelDir: {
        type: String,
        default: 'auto',
      },
      /**
       * Component `data` with which to associate this radio button and its siblings
       */
      currentValue: {
        type: [String, Number, Boolean],
        required: true,
      },
      /**
       * Unique value that will be assigned to `v-model` data when this radio button is selected
       */
      buttonValue: {
        type: [String, Number, Boolean],
        default: null,
      },
      /**
       * (DEPRECATED)
       */
      value: {
        type: [String, Number, Boolean],
        default: null,
      },
      /**
       * If provided, description underneath label text
       */
      description: {
        type: String,
        default: null,
      },
      /**
       * Whether or not the field is disabled
       */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       * Whether or not to auto-focus on mount
       */
      autofocus: {
        type: Boolean,
        default: false,
      },
      /**
       * Whether or not to truncate label
       */
      truncateLabel: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      active: false,
      tabIndex: 0,
    }),
    computed: {
      isChecked() {
        return this.currentValue === (this.buttonValue === null ? this.value : this.buttonValue);
      },
      id() {
        return `${this._uid}`;
      },
      activeStyle() {
        // setting opacity to 0 hides input's default outline
        return this.active ? this.$coreOutline : {};
      },
      disabledStyle() {
        return this.disabled ? { fill: this.$themeTokens.textDisabled } : {};
      },
      labelStyle() {
        return {
          color: this.disabled ? this.$themeTokens.textDisabled : '',
        };
      },
      truncateText() {
        return this.truncateLabel ? 'truncate-text' : '';
      },
    },
    mounted() {
      if (this.buttonValue === null && this.value === null) {
        console.error('KRadioButton: buttonValue prop is required');
      }
      if (this.buttonValue === null) {
        console.warn(
          "KRadioButton: 'value' prop is deprecated and will be removed in a future release. Please use 'buttonValue' instead."
        );
      }
      if (process.env.NODE_ENV !== 'production') {
        this.checkForKRadioButtonGroup();
      }
    },
    methods: {
      /**
       * Toggles the check state of the radio button.
       *
       * @public
       * @param {Event} event - The event object.
       */
      toggleCheck(event) {
        if (!this.disabled) {
          this.focus();
          this.update(event);
        }
      },
      /**
       * @public
       * Puts keyboard focus on the radiobutton
       */
      focus() {
        this.$refs.input.focus();
      },
      keydown(event) {
        /**
         * Emitted with `keydown` events
         */
        this.$emit('keydown', event);
      },
      update(event) {
        /**
         * Emitted on each change with new boolean of button state
         */
        this.$emit('change', this.isChecked, event);

        /**
         * Used to set `buttonValue` to `v-model` when checked
         */
        this.$emit('input', this.buttonValue === null ? this.value : this.buttonValue);
      },
      blur() {
        this.active = false;
        /**
         * Emits blur event, useful for validation
         */
        this.$emit('blur');
      },
      /**
       * @public
       * Sets `tab-index` on input
       */
      setTabIndex(val) {
        this.tabIndex = val;
      },

      checkForKRadioButtonGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.name === 'KRadioButtonGroup') {
            return; // Found KRadioButtonGroup, no warning needed
          }
          parent = parent.$parent;
        }
        // If we get here, no KRadioButtonGroup was found
        console.warn('KRadioButton should be nested inside a KRadioButtonGroup component.');
      },
    },
  };

</script>


<style lang="scss" scoped>

  $radio-height: 24px;

  .k-radio-button-container {
    display: table;
    width: 100%;
    margin-top: 8px;
    margin-bottom: 8px;
    table-layout: fixed;
  }

  .tr {
    display: table-row;
  }

  .k-radio-button {
    position: relative;
    display: table-cell;
    width: $radio-height;
    height: $radio-height;
    vertical-align: top;
    cursor: pointer;
  }

  .k-radio-button-input {
    position: absolute;
    top: 50%;
    left: 50%;
    cursor: pointer;
    opacity: 0;
    transform: translate(-50%, -50%);
  }

  .k-radio-button-label {
    display: table-cell;
    padding-left: 8px;
    line-height: 24px;
    cursor: pointer;
    user-select: none;
  }

  .k-radio-button-disabled {
    .k-radio-button,
    .k-radio-button-input,
    .k-radio-button-label {
      cursor: default;
    }
  }

  .truncate-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  //KIcon overrides
  .radio-button-icon {
    top: 0;
    width: $radio-height;
    height: $radio-height;
  }

  .description {
    font-size: 12px;
    line-height: normal;
  }

</style>
