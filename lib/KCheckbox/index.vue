<template>

  <div
    class="k-checkbox-container"
    data-testid="k-checkbox-container"
    :class="{ 'k-checkbox-disabled': disabled }"
    :style="{ pointerEvents: presentational ? 'none' : 'auto' }"
    @click="toggleCheck"
  >
    <div class="tr">
      <div class="k-checkbox">
        <input
          v-if="!presentational"
          :id="id"
          ref="kCheckboxInput"
          type="checkbox"
          class="k-checkbox-input"
          :aria-checked="ariaChecked"
          :checked="isChecked"
          :value="value"
          :indeterminate.prop="indeterminate"
          :disabled="disabled"
          @click.stop="toggleCheck"
          @focus="isActive = true"
          @blur="markInactive"
          @keydown="$emit('keydown', $event)"
        >

        <KIcon
          v-if="indeterminate"
          :style="[notBlank, activeOutline]"
          class="checkbox-icon"
          icon="indeterminateCheck"
          data-testid="icon-indeterminateCheck"
        />
        <KIcon
          v-else-if="!indeterminate && isChecked"
          :style="[notBlank, activeOutline]"
          class="checkbox-icon"
          icon="checked"
          data-testid="icon-checked"
        />
        <KIcon
          v-else
          :style="[blank, activeOutline]"
          class="checkbox-icon"
          icon="unchecked"
          data-testid="icon-unchecked"
        />
      </div>

      <component
        :is="labelTag"
        :dir="labelDir"
        class="k-checkbox-label"
        :for="presentational ? null : id"
        :class="{ visuallyhidden: !showLabel }"
        :style="labelStyle"
        @click.prevent
      >
        <template v-if="$slots.default">
          <!-- @slot Optional slot as alternative to `label` prop -->
          <slot></slot>
        </template>
        <template v-else>
          {{ label }}
        </template>
        <div
          v-if="description"
          class="description"
        >
          {{ description }}
        </div>
      </component>
    </div>
  </div>

</template>


<script>

  export default {
    name: 'KCheckbox',
    model: {
      prop: 'inputValue',
      event: 'change',
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
       * RTL dir of the text label
       * Options: 'auto', 'ltr', 'rtl', null.
       */
      labelDir: {
        type: String,
        default: 'auto',
      },
      /**
       * Whether or not to show the label
       */
      showLabel: {
        type: Boolean,
        default: true,
      },
      /**
       * Reactive v-model checkbox state. Updates with the `change` event.
       */
      /*
       * The reactive state of the checkbox which is used with v-model.
       * It is changed with the "change" event.
       * If used as an array, "value" prop is added/removed from it based on the checkbox state.
       * If used as a boolean, it is set to true when checked and false when unchecked.
       * If used as any other type, it is set to "value" prop when checked and null when unchecked.
       */
      inputValue: {
        type: [Array, Boolean, Number, String, Object],
        default: undefined, // Use undefined to differentiate if it’s passed
      },
      /**
       * Legacy API checkbox state. (Note: Use either `v-model` or `checked`.
       * If both are passed, `v-model` takes precedence.)
       */
      checked: {
        type: Boolean,
        default: false,
      },
      /**
       * Indeterminate state. Overrides `v-model` or `checked` checkbox state.
       */
      indeterminate: {
        type: Boolean,
        default: false,
      },
      /**
       * The value that (1) will be added to the `v-model` array, or (2) `v-model` will be set to,
       * when the checkbox is checked.
       */
      /*
       * The value of the checkbox.
       * If the checkbox is used with a v-model of array type,
       * then this value would be added/removed from the array based on the checkbox state.
       * If the checkbox is used with a v-model of any other type, then the v-model would
       * be set to this value when the checkbox is checked and set to null when unchecked.
       */
      value: {
        type: [Number, String, Object],
        default: null,
      },
      /**
       * Disabled state
       */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       * Description - subtext to the label
       */
      description: {
        type: String,
        default: null,
        required: false,
      },
      /**
       * Whether or not the checkbox is presentational.
       * Useful for cases where the checkbox is used
       * as a visual element only, and keyboard focus
       * should be managed by other elements.
       */
      presentational: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      isActive: false,
      lastUserEvent: null,
    }),
    computed: {
      usingLegacyApi() {
        return this.inputValue === undefined;
      },
      isChecked: {
        get() {
          if (this.usingLegacyApi) return this.checked;

          if (Array.isArray(this.inputValue)) {
            return this.inputValue.includes(this.value);
          }
          if (typeof this.inputValue === 'boolean') {
            return this.inputValue;
          }
          return Boolean(this.inputValue !== null);
        },
        set(checked) {
          if (Array.isArray(this.inputValue)) {
            const index = this.inputValue.indexOf(this.value);
            if (checked && index === -1) {
              this.updateInputValue([this.value, ...this.inputValue]);
            } else if (!checked && index !== -1) {
              const newInputValue = [...this.inputValue];
              newInputValue.splice(index, 1);
              this.updateInputValue(newInputValue);
            }
            return;
          }

          if (this.usingLegacyApi || typeof this.inputValue === 'boolean') {
            this.updateInputValue(checked);
            return;
          }

          if (checked) {
            this.updateInputValue(this.value);
          } else {
            this.updateInputValue(null);
          }
        },
      },
      ariaChecked() {
        return this.indeterminate ? 'mixed' : this.isChecked ? 'true' : 'false';
      },
      id() {
        return `k-checkbox-${this._uid}`;
      },
      blank() {
        return {
          fill: this.disabled ? this.$themeTokens.textDisabled : this.$themeTokens.annotation,
        };
      },
      notBlank() {
        return {
          fill: this.disabled ? this.$themeTokens.textDisabled : this.$themeTokens.primary,
        };
      },
      activeOutline() {
        return this.isActive ? this.$coreOutline : {};
      },
      labelStyle() {
        return {
          color: this.disabled ? this.$themeTokens.textDisabled : '',
        };
      },
      labelTag() {
        return this.presentational ? 'div' : 'label';
      },
    },
    methods: {
      toggleCheck(event) {
        if (!this.disabled) {
          this.lastUserEvent = event || null;
          this.$refs.kCheckboxInput.focus();
          this.isChecked = !this.isChecked;
          this.lastUserEvent = null;
        }
      },
      updateInputValue(newValue) {
        /**
         * Emits change event with the new checkbox state.
         * Used by v-model or legacy API to keep the checkbox state in sync.
         */
        this.$emit('change', newValue, this.lastUserEvent);
      },
      markInactive() {
        this.isActive = false;
        /**
         * Emits blur event, useful for validation.
         */
        this.$emit('blur');
      },
      /**
       * @public
       * Sets keyboard focus to the checkbox
       */
      focus() {
        this.$refs.kCheckboxInput.focus();
      },
    },
  };

</script>


<style lang="scss" scoped>

  $checkbox-height: 24px;

  .k-checkbox-container {
    display: table;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .tr {
    display: table-row;
  }

  .k-checkbox {
    position: relative;
    display: table-cell;
    width: $checkbox-height;
    height: $checkbox-height;
    vertical-align: top;
    cursor: pointer;
  }

  .k-checkbox-input {
    position: absolute;
    top: 50%;
    left: 50%;
    cursor: pointer;
    opacity: 0;
    transform: translate(-50%, -50%);
  }

  .k-checkbox-label {
    display: table-cell;
    padding-left: 8px;
    line-height: 24px;
    cursor: pointer;
    user-select: none;
  }

  .k-checkbox-disabled {
    .k-checkbox,
    .k-checkbox-input,
    .k-checkbox-label {
      cursor: default;
    }
  }

  // KIcon overrides
  .checkbox-icon {
    top: 0;
    width: $checkbox-height;
    height: $checkbox-height;
  }

  .description {
    font-size: 12px;
    line-height: normal;
  }

</style>
