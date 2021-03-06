<template>

  <!-- HTML makes clicking label apply to input by default -->
  <label
    :class="['k-radio-button', { disabled }]"
    :style="{ color: disabled ? $themeTokens.textDisabled : '' }"
  >
    <!-- v-model listens for @input event by default -->
    <!-- @input has compatibility issues for input of type radio -->
    <!-- Here, manually listen for @change (no compatibility issues) -->
    <input
      :id="id"
      ref="input"
      type="radio"
      class="input"
      :checked="isChecked"
      :value="value"
      :disabled="disabled"
      :autofocus="autofocus"
      @focus="active = true"
      @blur="active = false"
      @change="update"
      @keydown="keydown"
    >

    <!-- the radio buttons the user sees -->
    <KIcon
      v-if="isChecked"
      icon="radioSelected"
      class="checked"
      name="radio_button_checked"
      :style="[{ fill: $themeTokens.primary }, disabledStyle, activeStyle ]"
    />
    <KIcon
      v-else
      icon="radioUnselected"
      class="unchecked"
      name="radio_button_unchecked"
      :style="[{ fill: $themeTokens.annotation }, disabledStyle, activeStyle ]"
    />

    <span class="text" dir="auto">
      <div class="truncate-text">{{ label }}</div>
      <div
        v-if="description"
        class="description"
        :style="[{ color: disabled ? '' : $themeTokens.annotation }, disabledStyle ]"
      >
        {{ description }}
      </div>
      <!-- @slot Shown below label text and description -->
      <slot></slot>
    </span>

  </label>

</template>


<script>

  /**
   * Used to display all options
   */
  export default {
    name: 'KRadioButton',
    model: {
      prop: 'currentValue',
    },
    props: {
      /**
       * Label text
       */
      label: {
        type: String,
        required: true,
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
      value: {
        type: [String, Number, Boolean],
        required: true,
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
    },
    data: () => ({
      active: false,
    }),
    computed: {
      isChecked() {
        return this.value.toString() === this.currentValue.toString();
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
    },
    methods: {
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
         * Used to set `value` to `v-model` when checked
         */
        this.$emit('input', this.value);
      },
    },
  };

</script>


<style lang="scss" scoped>

  $radio-height: 24px;

  .k-radio-button {
    position: relative;
    display: block;
    margin-top: 8px;
    margin-bottom: 8px;
    &:not(.disabled) {
      cursor: pointer;
    }
  }

  .input,
  .text {
    // consistent look in inline and block displays
    vertical-align: top;
  }

  .input {
    width: $radio-height;
    height: $radio-height;
    // use opacity, not appearance:none because ie compatibility
    opacity: 0;
  }

  // KIcon overrides
  .checked,
  .unchecked {
    position: absolute;
    top: 0;
    left: 0;
    // lay our custom radio buttons on top of the actual element
    width: $radio-height;
    height: $radio-height;
  }

  .text {
    display: inline-block;
    max-width: calc(100% - #{$radio-height});
    padding-left: 8px;
    line-height: $radio-height;
  }

  .truncate-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .description {
    font-size: 12px;
    line-height: normal;
  }

</style>
