<template>

  <!--
   This component was forked from the Keen library in order to handle
   dynamic styling.

   The formatting has been changed to match our linters. We may eventually
   want to simply consolidate it with our component and remove any unused
   functionality.
  -->
  <div
    class="ui-select"
    :class="classes"
  >
    <input
      v-if="name"
      class="ui-select-hidden-input"
      type="hidden"
      :name="name"
      :value="submittedValue"
    >

    <div class="ui-select-content">
      <div
        ref="label"
        class="ui-select-label"
        :class="$computedClass({ ':focus': $coreOutline })"
        :tabindex="disabled ? null : '0'"
        @focus="onFocus"
        @blur="selectBlur"
        @keydown.enter.prevent="onEnterSpace"
        @keydown.space.prevent="onEnterSpace"
        @keydown.tab="onBlur"
        @keydown.up.prevent="highlightPreviousOption"
        @keydown.down.prevent="highlightNextOption"
        @keydown.self="highlightQuickMatch"
        @keydown.esc.prevent="closeDropdown()"
      >
        <div
          v-if="label || $slots.default"
          class="ui-select-label-text"
          :class="labelClasses"
          :style="activeColorStyle"
        >
          <!-- @slot Optional slot as alternative to `label` prop -->
          <slot>{{ label }}</slot>
        </div>

        <div
          class="ui-select-display"
          :style="activeBorderStyle"
        >
          <div
            class="ui-select-display-value"
            :class="{ 'is-placeholder': !hasDisplayText }"
          >
            <!-- @slot Optional slot to override the display of the selected value -->
            <slot name="display">
              {{
                hasDisplayText
                  ? displayText
                  : hasFloatingLabel && isLabelInline
                    ? null
                    : placeholder
              }}
            </slot>
          </div>

          <UiIcon
            v-if="!clearableState"
            class="ui-select-dropdown-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M6.984 9.984h10.03L12 15z" />
            </svg>
          </UiIcon>
          <KIconButton
            v-else
            class="overlay-close-button"
            icon="close"
            :ariaLabel="clearText"
            :color="$themeTokens.text"
            :tooltip="clearText"
            @click.stop="setValue()"
          />
        </div>
        <Popper
          v-if="appendToEl"
          ref="dropdownPopper"
          closeOnScroll
          transition="ui-select-transition-fade"
          trigger="click"
          :appendToEl="appendToEl"
          :reference="$refs.label"
          :visibleArrow="false"
          :options="dropdownPopperOptions"
          :disabled="disabled"
          @show="onOpen"
          @hide="onClose"
        >
          <div
            ref="dropdown"
            class="ui-select-dropdown"
            :style="{
              color: $themeTokens.primary,
              backgroundColor: $themeTokens.surface,
              bottom: dropdownButtonBottom,
            }"
          >
            <ul
              ref="optionsList"
              class="ui-select-options"
              :style="{ backgroundColor: $themeTokens.surface }"
            >
              <KSelectOption
                v-for="(option, index) in filteredOptions"
                ref="options"
                :key="index"
                :highlighted="isOptionHighlighted(option)"
                :keys="keys"
                :multiple="multiple"
                :option="option"
                :selected="isOptionSelected(option)"
                type="basic"
                @click.native.stop="selectOption(option)"
                @mouseover.native.stop="onMouseover(option)"
              >
                <!-- @slot Optional slot to override the display of
                the option in the options dropdown -->
                <slot
                  name="option"
                  :highlighted="isOptionHighlighted(option)"
                  :index="index"
                  :option="option"
                  :selected="isOptionSelected(option)"
                ></slot>
              </KSelectOption>

              <div
                v-show="hasNoResults"
                class="ui-select-no-results"
              >
                <!-- @slot Optional slot as alternative to `noResultsText` prop -->
                <slot name="no-results">
                  {{ noResultsText }}
                </slot>
              </div>
            </ul>
          </div>
        </Popper>
      </div>

      <div
        v-if="hasFeedback"
        class="ui-select-feedback"
      >
        <div
          v-if="showError"
          class="ui-select-feedback-text"
        >
          <!-- @slot Optional slot as alternative to `invalidText` prop -->
          <slot name="error">
            {{ invalidText }}
          </slot>
        </div>

        <div
          v-else-if="showHelp"
          class="ui-select-feedback-text"
        >
          <!-- @slot Optional slot as alternative to `help` prop -->
          <slot name="help">
            {{ help }}
          </slot>
        </div>
      </div>
    </div>
  </div>

</template>


<script>

  import has from 'lodash/has';
  import isObject from 'lodash/isObject';
  import throttle from 'lodash/throttle';
  import fuzzysearch from 'fuzzysearch';
  import startswith from 'lodash/startsWith';
  import sortby from 'lodash/sortBy';
  import { onMounted, ref } from 'vue';
  import UiIcon from '../keen/UiIcon';

  import { looseIndexOf, looseEqual } from '../keen/helpers/util';
  import { scrollIntoView, resetScroll } from '../keen/helpers/element-scroll';
  import config from '../keen/config';
  import Popper from '../_Popper.vue';
  import _useOverlay from '../composables/_useOverlay';
  import KSelectOption from './KSelectOption.vue';

  function areValidOptions(array) {
    return array.every(object => {
      return isValidOption(object);
    });
  }

  function isValidOption(object) {
    if (!isObject(object)) {
      return false;
    } else if (Object.keys(object).length === 0) {
      return true;
    }
    return has(object, 'value') && has(object, 'label');
  }

  /*
    A customized version of a select component that was originally
    copied from older version of Keen UI. Note that in
    https://github.com/learningequality/kolibri-design-system/pull/549,
    the component went through larger refactor as part of migrating away from Keen
    and some pieces we didn't use were removed. When adding new features,
    it may still be helpful to check out the referenced PR to see if some
    of the removed functionality may be handy, at least as inspiration. */
  export default {
    name: 'KSelect',
    components: {
      UiIcon,
      KSelectOption,
      Popper,
    },
    setup() {
      const { getOverlayEl } = _useOverlay();
      const appendToEl = ref(null);

      onMounted(() => {
        const overlayEl = getOverlayEl();
        // set appendToEl on mounted to avoid SSR issues, and to wait for the component
        // to be mounted before rendering the popper component, as it needs
        // the reference to be rendered first
        appendToEl.value = overlayEl;
      });

      return { appendToEl };
    },
    model: {
      event: 'change',
    },
    props: {
      /**
       * Object currently selected
       */
      value: {
        type: Object,
        required: true,
        validator(val) {
          return isValidOption(val);
        },
      },
      /**
       * Array of option objects { value, label, disabled }.
       * Disabled key is optional
       */
      options: {
        type: Array,
        required: true,
        validator(val) {
          return areValidOptions(val);
        },
      },
      /**
       * Sets the placeholder value
       */
      placeholder: {
        type: String,
        default: '',
      },
      /**
       * Specifies the label text. Default is  empty  if not provided.
       */
      label: {
        type: String,
        default: null,
      },
      /**
       * Floating Label
       */
      floatingLabel: {
        type: Boolean,
        default: true,
      },
      /**
       * Whether multiple options can be selected or not
       */
      multiple: {
        type: Boolean,
        default: false,
      },
      /**
       * Delimiter for multiple selected options
       */
      multipleDelimiter: {
        type: String,
        default: ', ',
      },
      /**
       * Text displayed if no results
       */
      noResultsText: {
        type: String,
        default: '',
      },
      /**
       * Object that defines the label, value and image keys in objects of the `options` prop.
       * Default: { label: 'label', value: 'value', image: 'image' }
       */
      keys: {
        type: Object,
        default() {
          return config.data.UiSelect.keys;
        },
      },
      /**
       * Whether invalid or not
       */
      invalid: {
        type: Boolean,
        default: false,
      },
      /**
       * Text displayed if invalid
       */
      invalidText: {
        type: String,
        default: null,
      },
      /**
       * Help text
       */
      help: {
        type: String,
        default: null,
      },
      /**
       * Whether disabled or not
       */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       * Whether to turn into a clearable state
       * when an option has been selected.
       */
      clearable: {
        type: Boolean,
        default: false,
      },
      /**
       * Defines the tooltip and aria-label of the clear button if the select is clearable.
       */
      clearText: {
        type: String,
        default: '',
      },
      /**
       * Whether or not display as inline block
       */
      inline: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        query: '',
        isActive: false,
        isTouched: false,
        highlightedOption: null,
        isDropdownOpen: false,
        initialValue: JSON.stringify(this.value),
        quickMatchString: '',
        quickMatchTimeout: null,
        dropdownButtonBottom: 'auto',
        maxDropdownHeight: 256,
        // workaround for Keen-ui not displaying floating labels for empty objects
        selection: Object.keys(this.value || {}).length === 0 ? '' : this.value,
      };
    },

    computed: {
      name() {
        return `ui-select-${this._uid}`;
      },
      classes() {
        return [
          `ui-select-type-basic`,
          { 'is-active': this.isActive },
          { 'is-invalid': this.invalid },
          { 'is-touched': this.isTouched },
          { 'is-disabled': this.disabled },
          { 'is-multiple': this.multiple },
          { 'has-label': this.hasLabel },
          { 'has-floating-label': this.hasFloatingLabel },
          { 'ui-select-inline': this.inline },
          { 'ui-select-disabled': this.disabled },
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
        return this.selection.length === 0 && !this.isActive;
      },

      hasFeedback() {
        return Boolean(this.help) || Boolean(this.invalidText) || Boolean(this.$slots.error);
      },

      showError() {
        return this.invalid && (Boolean(this.invalidText) || Boolean(this.$slots.error));
      },

      showHelp() {
        return !this.showError && (Boolean(this.help) || Boolean(this.$slots.help));
      },

      filteredOptions() {
        return this.options.filter((option, index) => {
          return this.defaultFilter(option, index);
        });
      },

      displayText() {
        if (this.multiple) {
          if (this.selection.length > 0) {
            return this.selection
              .map(selection => selection[this.keys.label] || selection)
              .join(this.multipleDelimiter);
          }

          return '';
        }
        return this.selection ? this.selection[this.keys.label] || this.selection : '';
      },

      hasDisplayText() {
        return Boolean(this.displayText.length);
      },

      hasNoResults() {
        if (this.query.length === 0) {
          return false;
        }

        return this.filteredOptions.length === 0;
      },

      dropdownPopperOptions() {
        return {
          placement: 'bottom-start',
          modifiers: {
            applyStyle: {
              enabled: true,
              fn: throttle(data => {
                // Set the width of the dropdown to match the width of the label
                data.styles.width = `${data.offsets.reference.width}px`;
                Object.assign(data.instance.popper.style, data.styles);
                return data;
              }, 50),
            },
            preventOverflow: {
              enabled: true,
              // Set boundaries to be the viewport so that the dropdown is not cut off
              // by the parent container, and can calculate the flip behavior having the
              // viewport as reference
              boundariesElement: 'viewport',
            },
          },
        };
      },

      submittedValue() {
        // Assuming that if there is no name, then there's no
        // need to computed the submittedValue
        if (!this.name || !this.selection) {
          return;
        }

        if (Array.isArray(this.selection)) {
          return this.selection.map(option => option[this.keys.value] || option).join(',');
        }

        return this.selection[this.keys.value] || this.selection;
      },

      // Returns the index of the currently highlighted option
      highlightedIndex() {
        return this.options.findIndex(option => looseEqual(this.highlightedOption, option));
      },

      // Returns an array containing the options and extra annotations
      annotatedOptions() {
        const options = JSON.parse(JSON.stringify(this.options));
        return options.map((option, index) => {
          // If not object, create object
          if (typeof option !== 'object') {
            option = {
              [this.keys.value]: option,
              [this.keys.label]: option,
            };
          }

          // Add index to object
          option.index = index;

          // Check if valid prev/next
          if (!option.disabled) {
            if (index < this.highlightedIndex) {
              option.validPreviousOption = true;
            } else if (index > this.highlightedIndex) {
              option.validNextOption = true;
            }
          }

          // Check if matches
          option.startsWith = startswith(
            option[this.keys.label].toLowerCase(),
            this.quickMatchString.toLowerCase(),
          );

          return option;
        });
      },
      activeColorStyle() {
        if (this.isActive) {
          return {
            color: this.$themeTokens.primary,
          };
        }

        return {};
      },
      activeBorderStyle() {
        if (this.isActive && !this.clearableState) {
          return {
            borderBottomColor: this.$themeTokens.primary,
          };
        } else if (this.clearableState) {
          return {
            cursor: 'default',
          };
        }

        return {};
      },
      clearableState() {
        return (
          this.clearable && this.selection && Object.keys(this.selection).length && !this.disabled
        );
      },
    },

    watch: {
      value(inputValue) {
        this.selection = inputValue;
      },
      filteredOptions() {
        this.highlightedOption = this.filteredOptions[0];
        resetScroll(this.$refs.optionsList);
      },
      query() {
        /**
         * Emits whenever the query value changes.
         */
        this.$emit('query-change', this.query);
      },

      quickMatchString(string) {
        if (string) {
          if (this.quickMatchTimeout) {
            clearTimeout(this.quickMatchTimeout);
            this.quickMatchTimeout = null;
          }
          this.quickMatchTimeout = setTimeout(() => {
            this.quickMatchString = '';
          }, 500);
        }
      },

      selection(newSelection) {
        /* Emits new selection.*/
        if (!this.disabled) {
          /**
           * Emitted when the value is changed
           */
          this.$emit('change', newSelection);
        }
      },
    },

    created() {
      if (!this.selection || this.selection === '') {
        this.setValue(null);
      }
    },

    methods: {
      setValue(value) {
        value = value ? value : this.multiple ? [] : '';
        this.selection = value;
        /**
         * Emits an 'input' event with the new value when the selection is updated.
         */
        this.$emit('input', value);
      },

      // Highlights the matching option on key input
      highlightQuickMatch(event) {
        // https://github.com/ccampbell/mousetrap/blob/master/mousetrap.js#L39
        const specialKeyCodes = [
          8, 9, 13, 16, 17, 18, 20, 27, 32, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 91, 93, 224,
        ];
        const keyCode = event.keyCode;
        if (specialKeyCodes.includes(keyCode)) {
          return;
        }

        const character = event.key.toString();
        this.quickMatchString += character;
        let matchingItems = this.annotatedOptions.filter(
          option => option.startsWith && !option.disabled,
        );
        if (matchingItems.length !== 0) {
          matchingItems = sortby(matchingItems, [this.keys.label]);
          matchingItems = sortby(matchingItems, item => item[this.keys.label].length);
          this.highlightOption(this.options[matchingItems[0].index]);
        }
      },

      // Highlights the previous valid option
      highlightPreviousOption() {
        const options = this.annotatedOptions;
        let validPreviousOptionIndex = -1;
        for (let i = 0; i < options.length; i++) {
          if (options[i].validPreviousOption) {
            validPreviousOptionIndex = i;
          }
        }
        if (validPreviousOptionIndex !== -1) {
          this.highlightOption(this.options[validPreviousOptionIndex]);
        }
      },

      // Highlights the next valid option
      highlightNextOption() {
        const options = this.annotatedOptions;
        const validNextOptionIndex = options.findIndex(option => option.validNextOption);
        if (validNextOptionIndex !== -1) {
          this.highlightOption(this.options[validNextOptionIndex]);
        }
      },

      // Highlights the option
      highlightOption(option, options = { autoScroll: true }) {
        if (
          !option ||
          option.disabled ||
          looseEqual(this.highlightedOption, option) ||
          this.$refs.options.length === 0
        ) {
          return;
        }

        this.highlightedOption = option;

        if (options.autoScroll) {
          const index = this.filteredOptions.findIndex(option =>
            looseEqual(this.highlightedOption, option),
          );
          const optionToScrollTo = this.$refs.options[index];
          if (optionToScrollTo) {
            this.scrollOptionIntoView(optionToScrollTo.$el);
          }
        }
      },

      selectHighlighted() {
        if (
          this.highlightedOption &&
          !this.highlightedOption.disabled &&
          this.$refs.options.length > 0
        ) {
          this.selectOption(this.highlightedOption);
        }
      },

      selectOption(option, options = { autoClose: true }) {
        if (!option || option.disabled) {
          return;
        }

        const shouldSelect = this.multiple && !this.isOptionSelected(option);

        if (this.multiple) {
          this.updateOption(option, { select: shouldSelect });
        } else {
          this.setValue(option);
        }
        /**
         * Emitted when an option is selected by the user. Will not be emitted if the selection is
         * changed programmatically.
         */
        this.$emit('select', option, {
          selected: !this.isOptionSelected(option),
        });

        this.clearQuery();

        if (!this.multiple && options.autoClose) {
          this.closeDropdown();
        }
      },

      // Checks if option is highlighted
      isOptionHighlighted(option) {
        return looseEqual(this.highlightedOption, option);
      },

      isOptionSelected(option) {
        if (this.multiple) {
          return looseIndexOf(this.selection, option) > -1;
        }
        return looseEqual(this.selection, option);
      },

      updateOption(option, options = { select: true }) {
        let value = [];
        let updated = false;
        const i = looseIndexOf(this.selection, option);

        if (options.select && i < 0) {
          value = this.selection.concat(option);
          updated = true;
        }

        if (!options.select && i > -1) {
          value = this.selection.slice(0, i).concat(this.selection.slice(i + 1));
          updated = true;
        }

        if (updated) {
          this.setValue(value);
        }
      },

      defaultFilter(option) {
        const query = this.query.toLowerCase();
        let text = option[this.keys.label] || option;

        if (typeof text === 'string') {
          text = text.toLowerCase();
        }

        return fuzzysearch(query, text);
      },

      clearQuery() {
        this.query = '';
      },

      onEnterSpace() {
        if (this.isDropdownOpen) {
          this.selectHighlighted();
        } else {
          this.$refs.label.click();
        }
      },

      async closeDropdown(options = { autoBlur: false }) {
        this.$refs.dropdownPopper.doClose();
        if (!options.autoBlur) {
          await this.$nextTick();
          this.$refs.label.focus();
          this.isActive = true;
        }
      },

      onMouseover(option) {
        if (this.isDropdownOpen) {
          this.highlightOption(option, { autoScroll: false });
        }
      },

      onFocus(e) {
        if (this.isActive) {
          return;
        }

        this.isActive = true;
        /**
         * Emitted when the select gets focus
         */
        this.$emit('focus', e);
      },

      selectBlur() {
        // A diffent blur (other than the `onBlur` method) is needed for the label
        // to prevent the dropdown from closing
        if (!this.isDropdownOpen) {
          this.isActive = false;
        }
      },

      onBlur(e) {
        this.isActive = false;
        /**
         * Emitted when the select loses focus
         */
        this.$emit('blur', e);

        if (this.isDropdownOpen) {
          this.closeDropdown({ autoBlur: true });
        }
      },

      onOpen() {
        if (this.highlightedIndex === -1) {
          this.highlightNextOption();
        }

        this.isActive = true;

        this.highlightedOption = this.multiple ? null : this.selection;
        this.$nextTick(() => {
          this.$refs['dropdown'].focus();
          const selectedOption = this.$refs.optionsList.querySelector('.is-selected');
          if (selectedOption) {
            this.scrollOptionIntoView(selectedOption);
          } else {
            this.scrollOptionIntoView(
              this.$refs.optionsList.querySelector('.ui-select-option:not(.is-disabled)'),
            );
          }
        });
        this.isDropdownOpen = true;
        this.$emit('dropdown-open');
      },

      onClose() {
        this.isActive = false;
        this.query = '';
        if (!this.isTouched) {
          this.isTouched = true;
          this.$emit('touch');
        }

        this.highlightedOption = this.multiple ? null : this.selection;
        this.isDropdownOpen = false;
        this.$emit('dropdown-close');
      },

      async scrollOptionIntoView(optionEl) {
        await this.$nextTick();
        scrollIntoView(optionEl, {
          container: this.$refs.optionsList,
          marginTop: 180,
        });
      },

      /**
       * Resets the selected values of dropdown
       * @public This is a public method
       */
      reset() {
        this.setValue(JSON.parse(this.initialValue));
        this.clearQuery();
        this.resetTouched();
        this.highlightedOption = null;
      },

      resetTouched(options = { touched: false }) {
        this.isTouched = options.touched;
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '../styles/definitions';
  @import '../keen/styles/imports';

  /* stylelint-disable csstree/validator */

  .ui-select {
    @include font-family-noto;

    position: relative;
    display: flex;
    align-items: flex-start;
    margin-bottom: $ui-input-margin-bottom;
    background: $md-grey-100;
    border-bottom-color: $ui-input-border-color;
    border-bottom-style: solid;
    border-bottom-width: $ui-input-border-width;
    border-radius: 2px 2px 0 0;
    outline: none;

    &:hover:not(.is-disabled) {
      border-bottom-color: $ui-input-border-color--hover;

      .ui-select-label-text {
        color: $ui-input-label-color--hover;
      }

      .ui-select-dropdown-button {
        color: $ui-input-button-color--hover;
      }
    }

    &.is-active:not(.is-disabled) {
      border-bottom-color: $ui-input-border-color--active;

      .ui-icon {
        color: $ui-input-icon-color--active;
      }
    }

    &.has-floating-label {
      .ui-select-label-text {
        // Behaves like a block, but width is the width of its content.
        // Needed here so label doesn't overflow parent when scaled.
        display: table;

        &.is-inline {
          color: $ui-input-label-color; // So the hover styles don't override it
          cursor: pointer;
          transform: translateY($ui-input-label-top--inline) scale(1.1);
        }

        &.is-floating {
          padding-top: rem(9px);
          transform: translateY(0) scale(1);
        }
      }
    }

    &.has-label {
      .ui-select-dropdown-button {
        top: $ui-input-button-margin-top--with-label;
      }
    }

    &:not(.is-multiple) {
      .ui-select-display {
        height: $ui-input-height;
      }
    }

    &.is-multiple {
      .ui-select-display {
        padding-top: rem-calc(4px);
        padding-bottom: rem-calc(4px);
      }
    }

    &.is-invalid:not(.is-disabled) {
      .ui-select-label-text {
        color: $ui-input-label-color--invalid;
      }

      .ui-select-feedback {
        color: $ui-input-feedback-color--invalid;
      }
    }

    &.is-disabled {
      pointer-events: none;

      .ui-select-display {
        color: $ui-input-text-color--disabled;
        cursor: default;
      }

      .ui-select-dropdown-button,
      .ui-select-display-value.is-placeholder {
        color: $ui-input-text-color--disabled;
        opacity: $ui-input-button-opacity--disabled;
      }

      .ui-select-feedback {
        opacity: $ui-input-feedback-opacity--disabled;
      }
    }
  }

  .ui-select-label {
    position: relative;
    display: block;
    width: 100%;
    padding: 0 10px;
    margin: 0;
    outline: none;
  }

  .ui-select-content {
    flex-grow: 1;
  }

  .ui-select-label-text {
    margin-bottom: $ui-input-label-margin-bottom;
    font-size: $ui-input-label-font-size;
    line-height: $ui-input-label-line-height;
    color: $ui-input-label-color;
    cursor: default;
    transition:
      color 0.1s ease,
      transform 0.2s ease;
    transform-origin: left;
  }

  .ui-select-display {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0;
    font-size: $ui-input-text-font-size;
    font-weight: normal;
    line-height: 1.4;
    color: $ui-input-text-color;
    cursor: pointer;
    user-select: none;
    border: 0;
    transition: border 0.1s ease;
  }

  .ui-select-display-value {
    position: relative;
    top: 1px;
    flex-grow: 1;
    height: 22px; // height and top help prevent descender clipping
    overflow: hidden;
    text-overflow: ellipsis;

    // if inline-block
    white-space: nowrap;

    &.is-placeholder {
      color: $hint-text-color;
    }
  }

  .ui-select-dropdown-button {
    margin-right: rem-calc(-4px);
    margin-left: auto;
    font-size: $ui-input-button-size;
    color: $ui-input-button-color;
  }

  .ui-select-dropdown {
    @extend %dropshadow-2dp;

    position: absolute;
    z-index: $z-index-dropdown;
    margin-top: 2px;
    list-style-type: none;
    outline: none;
  }

  .ui-select-options {
    position: relative;
    display: block;
    min-width: 100%;
    max-height: rem-calc(256px);
    padding: 0;
    margin: 0;
    overflow-y: auto;
    color: $primary-text-color;
    list-style-type: none;
  }

  .ui-select-no-results {
    width: 100%;
    padding: rem-calc(8px 12px);
    font-size: rem-calc(14px);
    color: $secondary-text-color;
  }

  .ui-select-feedback {
    position: relative;
    padding-top: $ui-input-feedback-padding-top;
    margin: 0;
    font-size: $ui-input-feedback-font-size;
    line-height: $ui-input-feedback-line-height;
    color: $ui-input-feedback-color;
  }

  // ================================================
  // Transitions
  // ================================================

  .ui-select-transition-fade-enter-active,
  .ui-select-transition-fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .ui-select-transition-fade-enter,
  .ui-select-transition-fade-leave-active {
    opacity: 0;
  }

  /* stylelint-enable */

  .overlay-close-button {
    position: absolute;
    right: 0;
  }

  .ui-select-inline {
    display: inline-block;
    width: 150px;
    margin-right: 16px;
    vertical-align: bottom;
  }

  /* stylelint-disable csstree/validator */

  .ui-select-disabled {
    border-bottom-color: $ui-input-text-color--disabled;
    border-bottom-style: $ui-input-border-style--disabled;
    border-bottom-width: $ui-input-border-width--active;
  }

  /* stylelint-enable */

</style>
