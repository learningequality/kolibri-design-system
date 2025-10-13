<template>

  <div class="mh">
    <UiTextbox
      ref="textbox"
      v-model="currentText"
      class="textbox"
      :label="label"
      :readonly="readonly"
      :disabled="disabled"
      :clearAriaLabel="clearAriaLabel"
      :clearable="clearable"
      :invalid="showInvalidMessage"
      :error="invalidText"
      :autofocus="autofocus"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :style="[changedOrFocused ? $coreOutline : {}, appearanceOverrides]"
      :type="type"
      :min="min"
      :max="max"
      :enforceMaxlength="true"
      :floatingLabel="floatingLabel"
      :multiLine="textArea"
      :rows="3"
      @input="updateText"
      @keydown="emitKeydown"
      @focus="emitFocus"
      @blur="emitBlur"
    >
      <template #outerBefore>
        <!--@slot Places content before the input area-->
        <slot name="outerBefore"></slot>
      </template>
      <template #innerBefore>
        <!--@slot Places content before the input's inner content -->
        <slot name="innerBefore"></slot>
      </template>
      <template #innerAfter>
        <!--@slot Places content after the input's inner content -->
        <slot name="innerAfter"></slot>
      </template>
      <template #outerAfter>
        <!--@slot Places content after the input area-->
        <slot name="outerAfter"></slot>
      </template>
    </UiTextbox>
  </div>

</template>


<script>

  import UiTextbox from '../keen/UiTextbox';

  /**
   * Handles user input.
   */
  export default {
    name: 'KTextbox',
    components: { UiTextbox },
    inheritAttrs: true,
    props: {
      /**
       * Label for the text field
       */
      label: {
        type: String,
        required: true,
      },
      /**
       * Value of the aria-label for clear button
       */
      clearAriaLabel: { type: String, default: 'Clear' },
      /**
       * Value of the text field
       */
      value: {
        type: [String, Number],
        default: null,
      },
      /**
       * Whether or not the current `value` is invalid
       */
      invalid: {
        type: Boolean,
        default: false,
      },
      /**
       * Text conditionally displayed based on values of `invalid` and `showInvalidText`
       */
      invalidText: {
        type: String,
        default: null,
      },
      /**
       * Show the `invalidText` even if the user has not focused or change the input.
       * `invalid` must also be `true` for this to take effect.
       */
      showInvalidText: {
        type: Boolean,
        default: false,
      },
      /**
       * Whether or not the field is disabled
       */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       * Makes the input field non-editable.
       * Still allowing to focus and copy the content
       */
      readonly: {
        type: Boolean,
        default: false,
      },
      /**
       * Whether or not to autofocus
       */
      autofocus: {
        type: Boolean,
        default: false,
      },
      /**
       * Maximum number of characters for `value`
       */
      maxlength: {
        type: Number,
        default: null,
      },
      /**
       * HTML5 autocomplete attribute (`off`, `on`, `name`, `username`, `current-password`, etc)
       */
      autocomplete: {
        type: String,
        default: null,
      },
      /**
       * HTML5 autocapitalize attribute. Used for touch-input enabled UI (`off`, `on`, `words`, etc)
       */
      autocapitalize: {
        type: String,
        default: null,
      },
      /**
       * HTML5 type of input (`text`, `password`, `number`, etc.)
       */
      type: {
        type: String,
        default: 'text',
      },
      /**
       * Minimum value (when `value` type is `number`)
       */
      min: {
        type: Number,
        default: null,
      },
      /**
       * Maximum value (when `value` type is `number`)
       */
      max: {
        type: Number,
        default: null,
      },
      /**
       * Whether to display as a multi-line text area
       */
      textArea: {
        type: Boolean,
        default: false,
      },
      /**
       * When set to `true`, the component displays a clear button inside the input field.
       */
      clearable: {
        type: Boolean,
        default: false,
      },
      /**
       * CSS styles to apply to the container
       */
      appearanceOverrides: {
        type: Object,
        default: null,
      },
      /**
       * @ignore
       * Whether or not to display as a floating label.
       * This should not actually be used
       */
      floatingLabel: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        currentText: this.value,
        changedOrFocused: false,
        hasBeenFocused: false,
      };
    },
    computed: {
      showInvalidMessage() {
        return this.invalid && (this.changedOrFocused || this.showInvalidText);
      },
    },
    watch: {
      value(val) {
        this.currentText = val;
      },
    },
    methods: {
      updateText() {
        /**
         * Emitted on each change with new `value`
         */
        this.$emit('input', this.currentText);
      },
      /**
       * @private
       * Resets text field value to default.
       * Unclear if this is used anywhere.
       */
      /* eslint-disable kolibri/vue-no-unused-methods */
      reset() {
        this.$refs.textbox.reset();
      },
      /* eslint-enable kolibri/vue-no-unused-methods */
      emitKeydown(e) {
        /**
         * Emitted with `keydown` events
         */
        this.$emit('keydown', e);
      },
      emitBlur(e) {
        /**
         * Emitted with `blur` events
         */
        this.changedOrFocused = false;
        this.$emit('blur', e);
      },
      emitFocus(e) {
        /**
         * Emitted with `focus` events
         */
        // Skip first focus event if autofocus is enabled
        if (!this.autofocus || this.hasBeenFocused) {
          this.changedOrFocused = true;
        }
        this.hasBeenFocused = true;
        this.$emit('focus', e);
      },
      /**
       * @public
       * Puts keyboard focus in the text field
       */
      focus() {
        this.changedOrFocused = true;
        this.hasBeenFocused = true;
        this.$refs.textbox.$el.querySelector('input').focus();
      },
    },
  };

</script>


<style lang="scss" scoped>

  .textbox {
    max-width: 400px;
  }

  .mh {
    min-height: 72px;
  }

</style>
