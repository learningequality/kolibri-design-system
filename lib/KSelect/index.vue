<template>

  <!--
   This component was forked from the Keen library in order to handle
   dynamic styling.

   The formatting has been changed to match our linters. We may eventually
   want to simply consolidate it with our component and remove any unused
   functionality.

   BELOW: KModal targets KeenUiSelect by using div.ui-select selector
  -->
  <div class="k-select ui-select" :class="classes">
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

        @click="toggleDropdown"
        @focus="onFocus"
        @keydown.enter.prevent="openDropdown"
        @keydown.space.prevent="openDropdown"
        @keydown.tab="onBlur"
        @keydown.up.prevent="highlightPreviousOption"
        @keydown.down.prevent="highlightNextOption"
        @keydown.self="highlightQuickMatch"
      >
        <div
          v-if="label || $slots.default"
          class="ui-select-label-text"
          :class="labelClasses"
          :style="activeColorStyle"
        >
          <slot>{{ label }}</slot>
        </div>

        <div class="ui-select-display" :style="activeBorderStyle">
          <div
            class="ui-select-display-value"
            :class="{ 'is-placeholder': !hasDisplayText }"
          >
            <slot name="display">
              {{ hasDisplayText ? displayText : (
                hasFloatingLabel && isLabelInline) ? null : placeholder }}
            </slot>
          </div>

          <UiIcon v-if="!clearableState" class="ui-select-dropdown-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.984 9.984h10.03L12 15z" /></svg>
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

        <transition name="ui-select-transition-fade">
          <div
            v-show="showDropdown"
            ref="dropdown"
            class="ui-select-dropdown"
            :style="{ color: $themeTokens.primary, backgroundColor: $themeTokens.surface, bottom: dropdownButtonBottom }"
            tabindex="-1"
            @keydown.enter.prevent.stop="selectHighlighted"
            @keydown.space.prevent.stop="selectHighlighted"
            @keydown.esc.prevent="closeDropdown()"
            @keydown.tab="onBlur"
            @keydown.up.prevent.stop="highlightPreviousOption"
            @keydown.down.prevent.stop="highlightNextOption"
            @keydown.self="highlightQuickMatch"
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
                :option="option"
                :selected="isOptionSelected(option)"

                type="basic"
                @click.native.stop="selectOption(option)"

                @mouseover.native.stop="onMouseover(option)"
              >
                <slot
                  name="option"

                  :highlighted="isOptionHighlighted(option)"
                  :index="index"
                  :option="option"
                  :selected="isOptionSelected(option)"
                ></slot>
              </KSelectOption>

              <div v-show="hasNoResults" class="ui-select-no-results">
                <slot name="no-results">
                  {{ noResultsText }}
                </slot>
              </div>
            </ul>
          </div>
        </transition>
      </div>

      <div v-if="hasFeedback" class="ui-select-feedback">
        <div v-if="showError" class="ui-select-feedback-text">
          <slot name="error">
            {{ invalidText }}
          </slot>
        </div>
      </div>
    </div>
  </div>

</template>


<script>

  import has from 'lodash/has';
  import isObject from 'lodash/isObject';
  import fuzzysearch from 'fuzzysearch';
  import startswith from 'lodash/startsWith';
  import sortby from 'lodash/sortBy';
  import UiIcon from '../keen/UiIcon';

  import { looseIndexOf, looseEqual } from '../keen/helpers/util';
  import { scrollIntoView, resetScroll } from '../keen/helpers/element-scroll';
  import config from '../keen/config';
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

  export default {
    name: 'KSelect',
    components: {
      UiIcon,
      KSelectOption,
    },
    model: {
      event: 'change',
    },
    props: {
      value: {
        type: Object,
        required: true,
        validator(val) {
          return isValidOption(val);
        },
      },
      options: {
        type: Array,
        required: true,
        validator(val) {
          return areValidOptions(val);
        },
      },
      placeholder: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: null,
      },
      floatingLabel: {
        type: Boolean,
        default: true,
      },
      noResultsText: {
        type: String,
        default: '',
      },
      keys: {
        type: Object,
        default() {
          return config.data.UiSelect.keys;
        },
      },
      invalid: {
        type: Boolean,
        default: false,
      },
      invalidText: {
        type: String,
        default: null,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      clearable: {
        type: Boolean,
        default: false,
      },
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
        isInsideModal: false,
        isActive: false,
        isTouched: false,
        highlightedOption: null,
        showDropdown: false,
        initialValue: JSON.stringify(this.value),
        quickMatchString: '',
        quickMatchTimeout: null,
        scrollableAncestor: null,
        dropdownButtonBottom: 'auto',
        maxDropdownHeight: 256,
        // workaround for Keen-ui not displaying floating labels for empty objects
        selection: Object.keys(this.value || {}).length === 0 ? '' : this.value,
      };
    },

    computed: {
      name() {
        return `k-select-${this._uid}`;
      },
      classes() {
        return [
          `ui-select-type-basic`,
          { 'is-active': this.isActive },
          { 'is-invalid': this.invalid },
          { 'is-touched': this.isTouched },
          { 'is-disabled': this.disabled },
          { 'has-label': this.hasLabel },
          { 'has-floating-label': this.hasFloatingLabel },
          { 'k-select-inline': this.inline },
          { 'k-select-disabled': this.disabled },
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
        return Boolean(this.invalidText) || Boolean(this.$slots.error);
      },

      showError() {
        return this.invalid && (Boolean(this.invalidText) || Boolean(this.$slots.error));
      },

      filteredOptions() {
        return this.options.filter((option, index) => {
          return this.defaultFilter(option, index);
        });
      },

      displayText() {
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
            this.quickMatchString.toLowerCase()
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
      filteredOptions() {
        this.highlightedOption = this.filteredOptions[0];
        resetScroll(this.$refs.optionsList);
      },

      showDropdown() {
        if (this.showDropdown) {
          this.onOpen();
          this.$emit('dropdown-open');
        } else {
          this.onClose();
          this.$emit('dropdown-close');
        }
      },

      query() {
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
          this.$emit('change', newSelection);
        }
      },
    },

    created() {
      if (!this.selection || this.selection === '') {
        this.setValue(null);
      }
    },

    mounted() {
      document.addEventListener('click', this.onExternalClick);
      // Find nearest scrollable ancestor
      this.scrollableAncestor = this.$el;
      while (
        (this.scrollableAncestor &&
          this.scrollableAncestor.clientHeight < this.scrollableAncestor.scrollHeight) ||
        !/auto|scroll/.test(window.getComputedStyle(this.scrollableAncestor).overflowY)
      ) {
        if (!this.scrollableAncestor.parentNode) {
          break;
        }
        this.scrollableAncestor = this.scrollableAncestor.parentNode;

        // Stop if we reach the body-- tagName is likely uppercase
        if (/body/i.test(this.scrollableAncestor.tagName)) {
          break;
        }
      }

      // look for KSelects nested within modals
      const allSelects = document.querySelectorAll('div.modal div.ui-select');
      // create array from a nodelist [IE does not support Array.from()]
      const allSelectsArr = Array.prototype.slice.call(allSelects);
      this.isInsideModal = allSelectsArr.includes(this.$el);
    },

    beforeDestroy() {
      document.removeEventListener('click', this.onExternalClick);
    },

    methods: {
      setValue(value) {
        value = value ? value : '';
        this.selection = value;

        this.$emit('input', value);
      },

      // Highlights the matching option on key input
      highlightQuickMatch(event) {
        // https://github.com/ccampbell/mousetrap/blob/master/mousetrap.js#L39
        const specialKeyCodes = [
          8,
          9,
          13,
          16,
          17,
          18,
          20,
          27,
          32,
          33,
          34,
          35,
          36,
          37,
          38,
          39,
          40,
          45,
          46,
          91,
          93,
          224,
        ];
        const keyCode = event.keyCode;
        if (specialKeyCodes.includes(keyCode)) {
          return;
        }

        const character = event.key.toString();
        this.quickMatchString += character;
        let matchingItems = this.annotatedOptions.filter(
          option => option.startsWith && !option.disabled
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
        this.openDropdown();

        if (options.autoScroll) {
          const index = this.filteredOptions.findIndex(option =>
            looseEqual(this.highlightedOption, option)
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

        this.setValue(option);

        this.$emit('select', option, {
          selected: !this.isOptionSelected(option),
        });

        this.clearQuery();

        if (options.autoClose) {
          this.closeDropdown();
        }
      },

      // Checks if option is highlighted
      isOptionHighlighted(option) {
        return looseEqual(this.highlightedOption, option);
      },

      isOptionSelected(option) {
        return looseEqual(this.selection, option);
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

      toggleDropdown() {
        // if called on dropdown inside modal, dropdown will generally render above input/placeholder when opened,
        // rather than below it: we want to render dropdown above input only in cases where there isn't enough
        // space available beneath input, but when dropdown extends outside a modal the func doesn't work as intended
        if (!this.isInsideModal) this.calculateSpaceBelow();

        this[this.showDropdown ? 'closeDropdown' : 'openDropdown']();
      },

      openDropdown() {
        if (this.disabled || this.clearableState) {
          return;
        }

        if (this.highlightedIndex === -1) {
          this.highlightNextOption();
        }

        this.showDropdown = true;
        // IE: clicking label doesn't focus the select element
        // to set isActive to true
        if (!this.isActive) {
          this.isActive = true;
        }
      },

      closeDropdown(options = { autoBlur: false }) {
        this.showDropdown = false;
        this.query = '';
        if (!this.isTouched) {
          this.isTouched = true;
          this.$emit('touch');
        }

        if (options.autoBlur) {
          this.isActive = false;
        } else {
          this.$refs.label.focus();
        }
      },

      onMouseover(option) {
        if (this.showDropdown) {
          this.highlightOption(option, { autoScroll: false });
        }
      },

      onFocus(e) {
        if (this.isActive) {
          return;
        }

        this.isActive = true;
        this.$emit('focus', e);
      },

      onBlur(e) {
        this.isActive = false;
        this.$emit('blur', e);

        if (this.showDropdown) {
          this.closeDropdown({ autoBlur: true });
        }
      },

      onOpen() {
        this.highlightedOption = this.selection;
        this.$nextTick(() => {
          this.$refs['dropdown'].focus();
          const selectedOption = this.$refs.optionsList.querySelector('.is-selected');
          if (selectedOption) {
            this.scrollOptionIntoView(selectedOption);
          } else {
            this.scrollOptionIntoView(
              this.$refs.optionsList.querySelector('.ui-select-option:not(.is-disabled)')
            );
          }
        });
      },

      onClose() {
        this.highlightedOption = this.selection;
      },

      onExternalClick(e) {
        if (!this.$el.contains(e.target)) {
          if (this.showDropdown) {
            this.closeDropdown({ autoBlur: true });
          } else if (this.isActive) {
            this.isActive = false;
          }
        }
      },

      scrollOptionIntoView(optionEl) {
        scrollIntoView(optionEl, {
          container: this.$refs.optionsList,
          marginTop: 180,
        });
      },

      /**
       * @public
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
      calculateSpaceBelow() {
        // Get the height of element
        const buttonHeight = this.$el.getBoundingClientRect().height;

        // Get the position of the element relative to the viewport
        const buttonPosition = this.$el.getBoundingClientRect().top;

        // Check if there is enough space below element
        // and update the "dropdownButtonBottom" data property accordingly
        const notEnoughSpaceBelow =
          buttonPosition > this.maxDropdownHeight &&
          this.scrollableAncestor.offsetHeight - buttonPosition <
            buttonHeight + this.maxDropdownHeight;

        this.dropdownButtonBottom = notEnoughSpaceBelow ? buttonHeight + 'px' : 'auto';
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
    outline: none;

    &:hover:not(.is-disabled) {
      .ui-select-label-text {
        color: $ui-input-label-color--hover;
      }

      .ui-select-display {
        border-bottom-color: $ui-input-border-color--hover;
      }

      .ui-select-dropdown-button {
        color: $ui-input-button-color--hover;
      }
    }

    &.is-active:not(.is-disabled) {
      .ui-select-display {
        border-bottom-width: $ui-input-border-width--active;
      }
    }

    &.is-active {
      .ui-select-display {
        border-bottom-width: $ui-input-border-width--active;
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
        line-height: 1;
      }
    }

    &.is-multiple {
      .ui-select-display {
        padding-top: rem-calc(4px);
        padding-bottom: rem-calc(4px);
        line-height: 1.4;
      }
    }

    &.is-invalid:not(.is-disabled) {
      .ui-select-label-text {
        color: $ui-input-label-color--invalid;
      }

      .ui-select-display {
        border-bottom-color: $ui-input-border-color--invalid;
      }

      .ui-select-feedback {
        color: $ui-input-feedback-color--invalid;
      }
    }

    &.is-disabled {
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
    padding: 0;
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
    transition: color 0.1s ease, transform 0.2s ease;
    transform-origin: left;
  }

  .ui-select-display {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0;
    font-size: $ui-input-text-font-size;
    font-weight: normal;
    color: $ui-input-text-color;
    cursor: pointer;
    user-select: none;
    border: 0;
    border-bottom-color: $ui-input-border-color;
    border-bottom-style: solid;
    border-bottom-width: $ui-input-border-width;
    transition: border 0.1s ease;
  }

  .ui-select-display-value {
    position: relative;
    top: 2px;
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
    position: absolute;
    z-index: $z-index-dropdown;
    display: block;
    width: 100%;
    min-width: rem-calc(180px);
    padding: 0;
    margin: 0;
    margin-bottom: rem-calc(8px);
    list-style-type: none;
    outline: none;
    box-shadow: 1px 2px 8px $md-grey-600;
  }

  .ui-select-search-input {
    @include font-family-noto;

    width: 100%;
    height: $ui-input-height + rem-calc(4px);
    padding: rem-calc(0 12px);
    padding-left: rem-calc(40px);
    font-size: $ui-input-text-font-size - rem-calc(1px);
    font-weight: normal;
    color: $ui-input-text-color;
    cursor: auto;
    background: none;
    border: 0;
    border-bottom-color: $ui-input-border-color;
    border-bottom-style: solid;
    border-bottom-width: $ui-input-border-width;
    border-radius: 0;
    outline: none;
    transition: border 0.1s ease;

    // Hide Edge and IE input clear button
    &::-ms-clear {
      display: none;
    }
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

  .k-select-inline {
    display: inline-block;
    width: 150px;
    margin-right: 16px;
    vertical-align: bottom;
  }

  .k-select-disabled /deep/ .ui-select__label-text.is-inline {
    cursor: default;
  }

  /* stylelint-disable csstree/validator */

  .k-select-disabled {
    border-bottom-color: $ui-input-text-color--disabled;
    border-bottom-style: $ui-input-border-style--disabled;
    border-bottom-width: $ui-input-border-width--active;
  }

  /* stylelint-enable */

  /deep/ .ui-select__display-value {
    line-height: 1.3;
  }

</style>
