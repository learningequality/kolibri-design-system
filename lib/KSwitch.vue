<template>

  <!-- Vendored from  UI UISwitch component https://josephuspaye.github.io/Keen-UI/#/ui-switch -->
  <label class="k-switch" :class="classes">
    <div :style="isActive ? $coreOutline : {}">
      <div class="k-switch-input-wrapper">
        <input
          ref="input"
          class="k-switch-input"
          type="checkbox"
          dir="auto"

          :checked.prop="isChecked"
          :disabled="disabled"
          :name="name"
          :tabindex="tabindex"
          :value="submittedValue"

          @blur="onBlur"
          @click="onClick"
          @focus="onFocus"
        >
        <div class="k-switch-thumb"></div>

        <div class="k-switch-track"></div>
      </div>
    </div>

    <div v-if="label || $slots.default" class="k-switch-label-text">
      <slot>{{ label }}</slot>
    </div>
  </label>

</template>


<script>

  const looseEqual = (a, b) => a == b;

  export default {
    name: 'KSwitch',
    props: {
      /**
       * Current value of the switch state: on or off
       */
      value: {
        type: Boolean,
        required: true,
      },
      /**
       * @ignore
       * does this need to be exposed?
       */
      name: {
        type: String,
        default: null,
      },
      /**
       * If provided, show a text label next to the switch
       */
      label: {
        type: String,
        default: null,
      },
      /**
       * @ignore
       * does this need to be exposed?
       */
      tabindex: {
        type: [String, Number],
        default: null,
      },
      /**
       * @ignore
       * might not be used
       */
      trueValue: {
        type: Boolean,
        default: true,
      },
      /**
       * @ignore
       * might not be used
       */
      falseValue: {
        type: Boolean,
        default: false,
      },
      /**
       * @ignore
       * might not be used
       */
      submittedValue: {
        type: String,
        default: 'on', // HTML default
      },
      /**
       * @ignore
       * seems redundant with 'value'
       */
      checked: {
        type: Boolean,
        default: false,
      },
      /**
       * @ignore
       * not used
       */
      color: {
        type: String,
        // 'primary' by default, but could add more later
        default: 'primary',
      },
      /**
       * @ignore
       * not used
       */
      switchPosition: {
        type: String,
        default: 'left', // 'left' or 'right'
      },
      /**
       * Whether or not the switch is disabled
       */
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isActive: false,
        isChecked: looseEqual(this.value, this.trueValue) || this.checked,
      };
    },
    computed: {
      classes() {
        return [
          `k-switch--color-${this.color}`,
          `k-switch--switch-position-${this.switchPosition}`,
          { 'is-active': this.isActive },
          { 'is-checked': this.isChecked },
          { 'is-disabled': this.disabled },
          { 'is-rtl': this.isRtl },
        ];
      },
    },
    watch: {
      value() {
        this.isChecked = looseEqual(this.value, this.trueValue);
      },
    },
    created() {
      this.$emit('input', this.isChecked ? this.trueValue : this.falseValue);
    },
    methods: {
      onClick(e) {
        const isCheckedPrevious = this.isChecked;
        const isChecked = e.target.checked;
        /**
         * Emitted on each change with new `value`
         */
        this.$emit('input', isChecked ? this.trueValue : this.falseValue, e);
        if (isCheckedPrevious !== isChecked) {
          /**
           * @ignore
           * does this need to be exposed?
           */
          this.$emit('change', isChecked ? this.trueValue : this.falseValue, e);
        }
      },
      onFocus(e) {
        this.isActive = true;
        this.$emit('focus', e);
      },
      onBlur(e) {
        this.isActive = false;
        this.$emit('blur', e);
      },
    },
  };

</script>


<style lang="scss">

  $k-switch-height: 32px !default;
  $k-switch-thumb-size: 20px !default;
  $k-switch-thumb-color: #f5f5f5 !default;
  $k-switch-track-width: 34px !default;
  $k-switch-track-height: 14px !default;

  .k-switch {
    position: relative;
    display: flex;
    align-items: center;
    height: $k-switch-height;

    &.is-checked:not(.is-rtl) {
      .k-switch-thumb {
        transform: translateX($k-switch-track-width - $k-switch-thumb-size);
      }
    }

    &.is-checked.is-rtl {
      .k-switch-thumb {
        transform: translateX($k-switch-track-width - ($k-switch-thumb-size * 2.5));
      }
    }

    &.is-disabled {
      .k-switch-track {
        background-color: rgba(0, 0, 0, 0.12);
      }

      .k-switch-thumb {
        background-color: #bdbdbd;
        box-shadow: none;
      }

      .k-switch-input-wrapper,
      .k-switch-label-text {
        color: rgba(0, 0, 0, 0.38);
        cursor: default;
      }
    }
    &.is-rtl {
      direction: rtl;
    }
  }

  .k-switch-input-wrapper {
    position: relative;
    width: $k-switch-track-width;
    height: $k-switch-thumb-size;
    cursor: pointer;
  }

  .k-switch-input {
    position: absolute;
    opacity: 0;
  }

  .k-switch-track {
    position: absolute;
    top: (($k-switch-thumb-size - $k-switch-track-height) / 2);
    width: $k-switch-track-width;
    height: $k-switch-track-height;
    background-color: #cccccc;
    border-radius: 8px;
    transition: background-color 0.1s linear;
  }

  .k-switch-thumb {
    position: absolute;
    z-index: 1;
    width: $k-switch-thumb-size;
    height: $k-switch-thumb-size;
    background-color: $k-switch-thumb-color;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition-timing-function: ease;
    transition-duration: 0.2s;
    transition-property: background-color, transform;
  }
  .k-switch-label-text {
    margin-left: 16px;
    font-size: 15px;
    cursor: pointer;
  }

  // ================================================
  // Switch positions
  // ================================================
  .k-switch--switch-position-right {
    .k-switch-label-text {
      order: -1;
      margin-right: auto;
      margin-left: 0;
    }
  }

  // ================================================
  // Colors
  // ================================================
  .k-switch--color-primary {
    &.is-checked:not(.is-disabled) {
      .k-switch-track {
        background-color: #b4c3fb;
      }
      .k-switch-thumb {
        background-color: #4368f5;
      }
    }
  }

</style>
