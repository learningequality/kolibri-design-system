<template>

  <!--
   This component was forked from the  library in order to handle
   dynamic styling of the drop down text color.

   The formatting has been changed to match our linters. We may eventually
   want to simply consolidate it with our component and remove any unused
   functionality.
  -->
  <div class="ui-textbox" :class="classes">
    <div v-if="icon || $slots.icon" class="ui-textbox-icon-wrapper">
      <slot name="icon">
        <UiIcon :icon="icon" />
      </slot>
    </div>

    <div class="ui-textbox-content">
      <label class="ui-textbox-label">
        <input
          v-if="!multiLine"
          ref="input"

          v-autofocus="autofocus"
          class="ui-textbox-input"
          :autocapitalize="autocapitalize ? autocapitalize : null"
          :autocomplete="autocomplete ? autocomplete : null"
          :disabled="disabled"
          :max="maxValue"
          :maxlength="enforceMaxlength ? maxlength : null"
          :minlength="minlength"
          :min="minValue"
          :name="name"
          :number="type === 'number' ? true : null"
          :placeholder="hasFloatingLabel ? null : placeholder"
          :readonly="readonly"
          :required="required"
          :step="stepValue"
          :style="isActive ? { borderBottomColor: $themeTokens.primaryDark } : {}"
          :tabindex="tabindex"
          :type="type"
          :value="value"
          @blur="onBlur"
          @change="onChange"
          @focus="onFocus"
          @input="updateValue($event.target.value)"

          @keydown.enter="onKeydownEnter"
          @keydown="onKeydown"
        >

        <textarea
          v-else
          ref="textarea"

          v-autofocus="autofocus"
          :value="value"
          class="ui-textbox-textarea"
          :autocapitalize="autocapitalize ? autocapitalize : null"
          :autocomplete="autocomplete ? autocomplete : null"
          :disabled="disabled"
          :maxlength="enforceMaxlength ? maxlength : null"
          :minlength="minlength"
          :name="name"
          :placeholder="hasFloatingLabel ? null : placeholder"
          :readonly="readonly"
          :required="required"

          :rows="rows"
          :style="isActive ? { borderBottomColor: $themeTokens.primaryDark } : {}"

          :tabindex="tabindex"

          @blur="onBlur"
          @change="onChange"
          @focus="onFocus"
          @input="updateValue($event.target.value)"

          @keydown.enter="onKeydownEnter"
          @keydown="onKeydown"
        ></textarea>

        <div
          v-if="label || $slots.default"
          class="ui-textbox-label-text"
          :class="labelClasses"
        >
          <slot>{{ label }}</slot>
        </div>
      </label>

      <div class="ui-textbox-feedback">
        <div v-if="showError" class="ui-textbox-feedback-text" :style="{ color: $themeTokens.error }">
          <slot name="error">
            {{ error }}
          </slot>
        </div>

        <div v-else-if="showHelp" class="ui-textbox-feedback-text">
          <slot name="help">
            {{ help }}
          </slot>
        </div>

        <!-- Placeholder to keep the text height spacing in place even when
             not showing any errors -->
        <div v-else class="ui-textbox-feedback-text">
          &nbsp;
        </div>

        <div v-if="maxlength" class="ui-textbox-counter">
          {{ valueLength + '/' + maxlength }}
        </div>
      </div>
    </div>
  </div>

</template>


<script>

  import autosize from 'autosize';
  import UiIcon from './UiIcon.vue';

  const autofocus = {
    inserted(el, { value }) {
      if (value) {
        el.focus();
      }
    },
  };

  export default {
    name: 'UiTextbox',

    components: {
      UiIcon,
    },

    directives: {
      autofocus,
    },

    props: {
      name: String,
      placeholder: String,
      tabindex: [String, Number],
      value: {
        type: [String, Number],
        default: '',
      },
      icon: String,
      iconPosition: {
        type: String,
        default: 'left', // 'left' or 'right'
      },
      label: String,
      floatingLabel: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'text', // all the possible HTML5 input types, except those that have a special UI
      },
      multiLine: {
        type: Boolean,
        default: false,
      },
      rows: {
        type: Number,
        default: 2,
      },
      autocomplete: String,
      autocapitalize: String,
      autofocus: {
        type: Boolean,
        default: false,
      },
      autosize: {
        type: Boolean,
        default: true,
      },
      min: Number,
      max: Number,
      step: {
        type: [String, Number],
        default: 'any',
      },
      maxlength: Number,
      minlength: Number,
      enforceMaxlength: {
        type: Boolean,
        default: false,
      },
      required: {
        type: Boolean,
        default: false,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      help: String,
      error: String,
      invalid: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        isActive: false,
        isTouched: false,
        initialValue: this.value,
        autosizeInitialized: false,
      };
    },

    computed: {
      classes() {
        return [
          `ui-textbox--icon-position-${this.iconPosition}`,
          { 'is-active': this.isActive },
          { 'is-invalid': this.invalid },
          { 'is-touched': this.isTouched },
          { 'is-multi-line': this.multiLine },
          { 'has-counter': this.maxlength },
          { 'is-disabled': this.disabled },
          { 'has-label': this.hasLabel },
          { 'has-floating-label': this.hasFloatingLabel },
        ];
      },

      labelClasses() {
        return {
          'is-inline': this.hasFloatingLabel && this.isLabelInline,
          'is-floating': this.hasFloatingLabel && !this.isLabelInline,
        };
      },

      hasLabel() {
        return Boolean(this.label) || Boolean(this.$slots.default);
      },

      hasFloatingLabel() {
        return this.hasLabel && this.floatingLabel;
      },

      isLabelInline() {
        return this.valueLength === 0 && !this.isActive;
      },

      minValue() {
        if (this.type === 'number' && this.min !== undefined) {
          return this.min;
        }

        return null;
      },

      maxValue() {
        if (this.type === 'number' && this.max !== undefined) {
          return this.max;
        }

        return null;
      },

      stepValue() {
        return this.type === 'number' ? this.step : null;
      },

      valueLength() {
        return this.value ? this.value.length : 0;
      },

      hasErrorFeedback() {
        return Boolean(this.error) || Boolean(this.$slots.error);
      },

      showError() {
        return this.invalid && this.hasErrorFeedback;
      },

      showHelp() {
        return Boolean(this.help) || Boolean(this.$slots.help);
      },
    },

    created() {
      // Normalize the value to an empty string if it's null
      if (this.value === null) {
        this.initialValue = '';
        this.updateValue('');
      }
    },

    mounted() {
      if (this.multiLine && this.autosize) {
        autosize(this.$refs.textarea);
        this.autosizeInitialized = true;
      }
    },

    beforeDestroy() {
      if (this.autosizeInitialized) {
        autosize.destroy(this.$refs.textarea);
      }
    },

    methods: {
      updateValue(value) {
        this.$emit('input', value);
      },

      onChange(e) {
        this.$emit('change', this.value, e);
      },

      onFocus(e) {
        this.isActive = true;
        this.$emit('focus', e);
      },

      onBlur(e) {
        this.isActive = false;
        this.$emit('blur', e);

        if (!this.isTouched) {
          this.isTouched = true;
          this.$emit('touch');
        }
      },

      onKeydown(e) {
        this.$emit('keydown', e);
      },

      onKeydownEnter(e) {
        this.$emit('keydown-enter', e);
      },
      /**
       * @public
       */
      reset() {
        // Blur the input if it's focused to prevent required errors
        // when it's value is reset
        if (
          document.activeElement === this.$refs.input ||
          document.activeElement === this.$refs.textarea
        ) {
          document.activeElement.blur();
        }

        this.updateValue(this.initialValue);
        this.resetTouched();
      },

      resetTouched(options = { touched: false }) {
        this.isTouched = options.touched;
      },
      /**
       * @public
       */
      refreshSize() {
        if (this.autosizeInitialized) {
          autosize.update(this.$refs.textarea);
        }
      },
      /**
       * @public
       */
      focus() {
        (this.$refs.input || this.$refs.textarea).focus();
      },
    },
  };

</script>


<style lang="scss" scoped>

  /* stylelint-disable */

  @import './styles/imports';

  .ui-textbox {
    display: flex;
    align-items: flex-start;
    margin-bottom: $ui-input-margin-bottom;

    &:hover:not(.is-disabled) {
      .ui-textbox-label-text {
        color: $ui-input-label-color--hover;
      }

      .ui-textbox-label,
      .ui-textbox-textarea {
        border-bottom-color: $ui-input-border-color--hover;
        border-bottom-width: $ui-input-border-width--active;
      }
    }

    &.is-active:not(.is-disabled) {
      .ui-textbox-label-text {
        color: $ui-input-border-color--active;
      }
      .ui-textbox-label,
      .ui-textbox-textarea {
        border-bottom-color: $ui-input-border-color--active;
      }
    }

    &.has-label {
      .ui-textbox-icon-wrapper {
        padding-top: $ui-input-icon-margin-top--with-label;
      }
    }

    &.has-counter {
      .ui-textbox-feedback-text {
        padding-right: rem(48px);
      }
    }

    &.has-floating-label {
      .ui-textbox-label-text {
        // Behaves like a block, but width is the width of its content.
        // Needed here so label doesn't overflow parent when scaled up (to appear inline).
        display: table;
        width: fit-content;

        &.is-inline {
          color: $ui-input-label-color; // So the hover styles don't override it
          cursor: text;
          // 1em here is custom to keep text centered
          transform: translateY(1em) scale(1.1);
        }

        &.is-floating {
          transform: translateY(0) scale(1);
        }
      }

      // Fixes glitch in chrome where label and input value overlap each other
      // when webkit-autofill value has not been propagated yet (e.g. https://github.com/vuejs/vue/issues/1331)
      // The webkit-autofill value will only be propagated on first click into the viewport.
      // Before that .is-inline will be wrongly set and cause the auto filled input value and the label to overlap.
      // This fix will style the wrong .is-inline like an .is-floating in case :-webkit-autofill is set.
      .ui-textbox-label > input:-webkit-autofill + .ui-textbox-label-text.is-inline {
        transform: translateY(0) scale(1);
      }
    }

    &.is-invalid:not(.is-disabled) {
      .ui-textbox-label-text,
      .ui-textbox-icon-wrapper .ui-icon,
      .ui-textbox-counter {
        color: $ui-input-label-color--invalid;
      }

      .ui-textbox-label,
      .ui-textbox-textarea {
        border-bottom-color: $ui-input-border-color--invalid;
      }

      .ui-textbox-feedback {
        color: $ui-input-feedback-color--invalid;
      }
    }

    &.is-disabled {
      .ui-textbox-input,
      .ui-textbox-label,
      .ui-textbox-textarea {
        color: $ui-input-text-color--disabled;
        border-bottom-style: $ui-input-border-style--disabled;
        border-bottom-width: $ui-input-border-width--active;
      }

      .ui-textbox-icon-wrapper .ui-icon {
        opacity: $ui-input-icon-opacity--disabled;
      }

      .ui-textbox-feedback {
        opacity: $ui-input-feedback-opacity--disabled;
      }
    }
  }

  .ui-textbox-label {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    padding: 4px 0 0 0;
    margin: 0;
    background: $md-grey-100;
    border-radius: 4px 4px 0 0;
    border-bottom-color: $ui-input-border-color;
    border-bottom-style: solid;
    border-bottom-width: $ui-input-border-width;
  }

  .ui-textbox-icon-wrapper {
    flex-shrink: 0;
    padding-top: $ui-input-icon-margin-top;
    margin-right: rem(12px);

    .ui-icon {
      color: $ui-input-icon-color;
    }
  }

  .ui-textbox-content {
    flex-grow: 1;
  }

  .ui-textbox-label-text {
    margin: 0 8px 0;
    font-size: $ui-input-label-font-size;
    line-height: $ui-input-label-line-height;
    color: $ui-input-label-color;
    cursor: default;
    transition: color 0.1s ease, transform 0.2s ease;
    transform-origin: left;
  }

  .ui-textbox-input,
  .ui-textbox-textarea {
    display: block;
    width: 100%;
    padding: 0 0 0 8px;
    margin: 0;
    font-size: $ui-input-text-font-size;
    font-weight: normal;
    color: $ui-input-text-color;
    cursor: auto;
    background: none;
    border: none;
    border-radius: 0;
    outline: none;
    transition: border 0.1s ease;
  }

    .ui-textbox-textarea {
    border-bottom-color: $ui-input-border-color;
    border-bottom-style: solid;
    border-bottom-width: $ui-input-border-width;
  }

  .ui-textbox-input {
    height: $ui-input-height;
  }

  .ui-textbox-textarea {
    padding-bottom: rem(6px);
    overflow-x: hidden;
    overflow-y: auto;
    resize: vertical;
  }

  .ui-textbox-feedback {
    position: relative;
    padding-top: $ui-input-feedback-padding-top;
    margin: 0;
    font-size: $ui-input-feedback-font-size;
    line-height: $ui-input-feedback-line-height;
    color: $ui-input-feedback-color;
  }

  .ui-textbox-counter {
    position: absolute;
    top: $ui-input-feedback-padding-top;
    right: 0;
  }

  // ================================================
  // Icon position
  // ================================================

  .ui-textbox--icon-position-right {
    .ui-textbox-icon-wrapper {
      order: 1;
      margin-right: 0;
      margin-left: rem(8px);
    }
  }

</style>
