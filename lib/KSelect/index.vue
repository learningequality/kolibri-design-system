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
    :style="{
      'border-bottom-color':
        isActive && !disabled ? 'var(--brand-primary-v600)' : 'var(--palette-grey-v700)',
    }"
  >
    <input
      v-if="name"
      class="ui-select-hidden-input"
      type="hidden"
      :name="name"
      :value="submittedValue"
    >

    <div class="ui-select-content">
      <div class="ui-select-control">
        <div
          ref="label"
          class="ui-select-label"
          :class="$computedClass({ ':focus': $coreOutline })"
          supports-modality="keyboard"
          role="combobox"
          :tabindex="disabled ? null : '0'"
          aria-haspopup="listbox"
          :aria-expanded="String(isDropdownOpen)"
          :aria-controls="listboxId"
          :aria-activedescendant="(isDropdownOpen && activeDescendantId) || null"
          :aria-labelledby="ariaLabelledBy"
          :aria-label="ariaLabel"
          :aria-invalid="invalid ? 'true' : null"
          :aria-describedby="describedBy"
          :aria-disabled="disabled ? 'true' : null"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="onKeydown"
          @keyup="onKeyup"
        >
          <div
            v-if="hasLabel"
            :id="labelId"
            class="ui-select-label-text"
            :class="labelClasses"
            :style="{
              color: isActive ? 'var(--tokens-primary)' : 'var(--palette-grey-v700)',
            }"
            aria-hidden="true"
          >
            <!-- @slot Optional slot as alternative to `label` prop -->
            <slot>{{ label }}</slot>
          </div>

          <div
            class="ui-select-display"
            :style="activeBorderStyle"
          >
            <div
              :id="valueId"
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
              aria-hidden="true"
              :style="{ color: isActive ? 'var(--tokens-primary)' : 'var(--palette-grey-v700)' }"
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
            <span
              v-else
              class="ui-select-clear-spacer"
            ></span>
          </div>
        </div>

        <span
          v-if="clearableState"
          class="ui-select-clear"
          @keydown.stop
        >
          <KIconButton
            size="small"
            class="overlay-close-button"
            icon="close"
            :ariaLabel="clearText"
            color="var(--tokens-text)"
            :tooltip="clearText"
            @click.stop="onClear"
          />
        </span>

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
            class="ui-select-dropdown"
            :style="{
              backgroundColor: 'var(--tokens-surface)',
              bottom: dropdownButtonBottom,
            }"
            @mousedown.prevent
          >
            <KListbox
              v-if="listboxRendered"
              :id="listboxId"
              ref="listbox"
              class="ui-select-options"
              :value="listboxValue"
              :ariaLabelledBy="listboxLabelledBy"
              :ariaLabel="ariaLabel"
              :messages="listboxMessages"
              :multiple="false"
              :tabbable="false"
              containScroll
              @active-descendant-change="onActiveDescendantChange"
            >
              <KListboxOption
                v-for="(option, index) in filteredOptions"
                :key="index"
                :value="index"
                :label="optionLabel(option)"
                :disabled="Boolean(option.disabled)"
                @click.native.stop="selectOption(option)"
              >
                <span class="ui-select-option-content">
                  <!-- @slot Optional slot to override the display of
                  the option in the options dropdown -->
                  <slot
                    name="option"
                    :highlighted="index === slotHighlightedIndex"
                    :index="index"
                    :option="option"
                    :selected="index === renderedSelectedIndex"
                  >
                    <span :class="{ 'ui-select-option-truncated': truncateOptionsLabel }">
                      {{ option[keys.label] }}
                    </span>
                  </slot>
                </span>
              </KListboxOption>
            </KListbox>

            <div
              v-show="hasNoResults"
              class="ui-select-no-results"
            >
              <!-- @slot Optional slot as alternative to `noResultsText` prop -->
              <slot name="no-results">
                {{ noResultsText }}
              </slot>
            </div>
          </div>
        </Popper>
      </div>

      <div
        v-if="hasFeedback"
        class="ui-select-feedback"
      >
        <div
          v-if="showError"
          :id="feedbackId"
          class="ui-select-feedback-text"
        >
          <!-- @slot Optional slot as alternative to `invalidText` prop -->
          <slot name="error">
            {{ invalidText }}
          </slot>
        </div>

        <div
          v-else-if="showHelp"
          :id="feedbackId"
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
  import { onMounted, ref } from 'vue';
  import UiIcon from '../keen/UiIcon';

  import { looseEqual } from '../keen/helpers/util';
  import config from '../keen/config';
  import Popper from '../_Popper.vue';
  import _useOverlay from '../composables/_useOverlay';
  import KListbox from '../candidate/listbox/KListbox/index.vue';
  import KListboxOption from '../candidate/listbox/KListboxOption/index.vue';

  const PAGE_SIZE = 10;

  const OPENING_KEYS = ['ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter', ' '];

  const SILENT_LISTBOX_MESSAGES = {
    clickable: '',
    allOptionsSelected: '',
    allOptionsDeselected: '',
    optionDeselected: '',
  };

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
      KListbox,
      KListboxOption,
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
      /**
       * Whether or not to truncate the options label
       * when the label is too long to fit in one line.
       * If false, the label will break into multiple lines.
       */
      truncateOptionsLabel: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        query: '',
        isActive: false,
        isTouched: false,
        slotHighlightedIndex: -1,
        // Copy of selectedIndex for the option slot: reading the computed once per option
        // re-adds all of its dependencies each time, which is quadratic in the option count
        renderedSelectedIndex: -1,
        activeDescendantId: null,
        isDropdownOpen: false,
        listboxRendered: false,
        initialValue: JSON.stringify(this.value),
        quickMatchString: '',
        quickMatchTimeout: null,
        stopEscapeKeyup: false,
        dropdownButtonBottom: 'auto',
        // workaround for Keen-ui not displaying floating labels for empty objects
        selection: Object.keys(this.value || {}).length === 0 ? '' : this.value,
      };
    },

    computed: {
      name() {
        return `ui-select-${this._uid}`;
      },
      labelId() {
        return `${this.name}-label`;
      },
      valueId() {
        return `${this.name}-value`;
      },
      listboxId() {
        return `${this.name}-listbox`;
      },
      feedbackId() {
        return `${this.name}-feedback`;
      },
      ariaLabelledBy() {
        return this.hasLabel ? this.labelId : null;
      },
      ariaLabel() {
        return this.hasLabel ? null : this.placeholder || null;
      },
      listboxLabelledBy() {
        return this.ariaLabelledBy || (this.ariaLabel ? null : this.valueId);
      },
      listboxMessages() {
        return SILENT_LISTBOX_MESSAGES;
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
        return !this.selection && !this.isActive;
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

      describedBy() {
        return this.hasFeedback && (this.showError || this.showHelp) ? this.feedbackId : null;
      },

      filteredOptions() {
        return this.options.filter((option, index) => {
          return this.defaultFilter(option, index);
        });
      },

      displayText() {
        return this.selection ? this.optionLabel(this.selection) : '';
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

        return this.selection[this.keys.value] || this.selection;
      },

      selectedIndex() {
        return this.filteredOptions.findIndex(option => this.isOptionSelected(option));
      },

      enabledIndexes() {
        return this.filteredOptions.flatMap((option, index) => (option.disabled ? [] : [index]));
      },

      listboxValue() {
        return this.selectedIndex === -1 ? [] : [this.selectedIndex];
      },

      activeBorderStyle() {
        if (this.isActive && !this.clearableState) {
          return {
            borderBottomColor: 'var(--tokens-primary)',
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
      selectedIndex: {
        handler(index) {
          this.renderedSelectedIndex = index;
        },
        immediate: true,
      },
      filteredOptions(newOptions, oldOptions) {
        if (this.isDropdownOpen && this.$refs.listbox && !looseEqual(newOptions, oldOptions)) {
          this.$refs.listbox.onListBlur();
          this.highlightInitialOption();
        }
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
        value = value || '';
        this.selection = value;
        /**
         * Emits an 'input' event with the new value when the selection is updated.
         */
        this.$emit('input', value);
      },

      highlightedOrSelectedIndex() {
        const focusedValue = this.$refs.listbox.focusedValue;
        return focusedValue === null ? this.selectedIndex : focusedValue;
      },

      highlightQuickMatch(key) {
        this.quickMatchString += key.toLowerCase();
        const query = this.quickMatchString;
        const start = this.highlightedOrSelectedIndex() + 1;
        const ordered = [
          ...this.enabledIndexes.filter(index => index >= start),
          ...this.enabledIndexes.filter(index => index < start),
        ];
        const startsWith = string => index =>
          this.optionLabel(this.filteredOptions[index]).toLowerCase().startsWith(string);
        let match = ordered.find(startsWith(query));
        if (match === undefined && [...query].every(char => char === query[0])) {
          match = ordered.find(startsWith(query[0]));
        }
        if (match !== undefined) {
          this.$refs.listbox.setFocus(match);
        }
      },

      highlightIndex(index) {
        if (index !== undefined) {
          this.$refs.listbox.setFocus(index);
        }
      },

      highlightInitialOption() {
        if (this.$refs.listbox.focusedValue === null) {
          this.highlightIndex(
            this.selectedIndex === -1 ? this.enabledIndexes[0] : this.selectedIndex,
          );
        }
      },

      highlightBy(delta) {
        const current = this.highlightedOrSelectedIndex();
        const ahead =
          delta > 0
            ? this.enabledIndexes.filter(index => index > current)
            : this.enabledIndexes.filter(index => index < current).reverse();
        if (ahead.length) {
          this.$refs.listbox.setFocus(ahead[Math.min(Math.abs(delta), ahead.length) - 1]);
        }
      },

      async renderListbox() {
        if (!this.$refs.listbox) {
          this.listboxRendered = true;
          await this.$nextTick();
        }
      },

      async onKeydown(event) {
        const { key, altKey, ctrlKey, metaKey } = event;
        if (!this.$refs.listbox) {
          if (OPENING_KEYS.includes(key)) {
            event.preventDefault();
          }
          await this.renderListbox();
        }
        const isOpen = this.isDropdownOpen;

        if (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey) {
          this.highlightQuickMatch(key);
          this.openDropdown();
          return;
        }

        switch (key) {
          case 'ArrowUp':
            event.preventDefault();
            if (isOpen && altKey) {
              this.selectHighlighted();
            } else if (isOpen) {
              this.highlightBy(-1);
            } else {
              this.highlightIndex(this.enabledIndexes[0]);
              this.openDropdown();
            }
            break;
          case 'ArrowDown':
            event.preventDefault();
            if (isOpen && !altKey) {
              this.highlightBy(1);
            } else {
              this.openDropdown();
            }
            break;
          case 'Home':
          case 'End':
            event.preventDefault();
            this.highlightIndex(
              this.enabledIndexes[key === 'Home' ? 0 : this.enabledIndexes.length - 1],
            );
            this.openDropdown();
            break;
          case 'PageUp':
          case 'PageDown':
            if (isOpen) {
              event.preventDefault();
              this.highlightBy(key === 'PageDown' ? PAGE_SIZE : -PAGE_SIZE);
            }
            break;
          case 'Enter':
          case ' ':
            event.preventDefault();
            if (isOpen) {
              this.selectHighlighted();
            } else {
              this.openDropdown();
            }
            break;
          case 'Tab':
            if (isOpen) {
              this.selectHighlighted();
            }
            this.$nextTick(() => {
              /**
               * Emitted when the select loses focus
               */
              this.$emit('blur', event);
            });
            break;
          case 'Escape':
            if (isOpen) {
              event.preventDefault();
              event.stopPropagation();
              // KModal cancels on Escape keyup
              this.stopEscapeKeyup = true;
              this.closeDropdown();
            }
            break;
        }
      },

      onKeyup(event) {
        if (event.key === 'Escape' && this.stopEscapeKeyup) {
          event.stopPropagation();
          this.stopEscapeKeyup = false;
        }
      },

      onActiveDescendantChange(id) {
        this.activeDescendantId = id;
        const focusedValue = this.$refs.listbox.focusedValue;
        this.slotHighlightedIndex = focusedValue === null ? -1 : focusedValue;
      },

      onClear() {
        this.setValue();
        this.$nextTick(() => {
          this.$refs.label.focus();
        });
      },

      selectHighlighted() {
        this.selectOption(this.filteredOptions[this.$refs.listbox.focusedValue]);
      },

      selectOption(option) {
        if (!option || option.disabled) {
          return;
        }

        this.setValue(option);
        /**
         * Emitted when an option is selected by the user. Will not be emitted if the selection is
         * changed programmatically.
         */
        this.$emit('select', option, { selected: false });

        this.clearQuery();

        this.closeDropdown();
      },

      optionLabel(option) {
        const label = option[this.keys.label];
        return label === undefined || label === null ? '' : String(label);
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

      openDropdown() {
        this.$refs.dropdownPopper.doShow();
      },

      closeDropdown() {
        this.$refs.dropdownPopper.doClose();
      },

      onFocus(e) {
        this.renderListbox();
        if (this.isActive) {
          return;
        }

        this.isActive = true;
        /**
         * Emitted when the select gets focus
         */
        this.$emit('focus', e);
      },

      onBlur() {
        this.isActive = false;

        if (this.isDropdownOpen) {
          this.closeDropdown();
        }
      },

      async onOpen() {
        this.isActive = true;
        this.isDropdownOpen = true;
        await this.renderListbox();
        this.highlightInitialOption();
        this.$emit('dropdown-open');
      },

      onClose() {
        this.isActive = document.activeElement === this.$refs.label;
        this.query = '';
        if (!this.isTouched) {
          this.isTouched = true;
          this.$emit('touch');
        }

        if (this.$refs.listbox) {
          this.$refs.listbox.onListBlur();
        }
        this.isDropdownOpen = false;
        this.$emit('dropdown-close');
      },

      /**
       * Resets the selected values of dropdown
       * @public This is a public method
       */
      reset() {
        this.setValue(JSON.parse(this.initialValue));
        this.clearQuery();
        this.resetTouched();
      },

      /**
       * Sets keyboard focus to the select without opening the dropdown
       * @public
       */
      focus() {
        this.$refs.label.focus();
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
    border-bottom-style: solid;
    border-bottom-width: $ui-input-border-width;
    border-radius: 2px 2px 0 0;
    outline: none;

    /* stylelint-disable */
    &:hover:not(.is-disabled):not(.is-active) {
      border-bottom-color: $ui-input-border-color--hover !important;

      .ui-select-label-text {
        color: $ui-input-label-color--hover !important;
      }

      .ui-select-dropdown-button {
        color: $ui-input-button-color--hover !important;
      }
    }

    &.has-floating-label {
      .ui-select-label-text {
        // Behaves like a block, but width is the width of its content.
        // Needed here so label doesn't overflow parent when scaled.
        display: table;

        &.is-inline {
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

  // KIconButton's small size
  $ui-select-clear-size: 32px;
  $ui-select-label-padding-x: 10px;

  .ui-select-control {
    position: relative;
  }

  .ui-select-label {
    position: relative;
    display: block;
    width: 100%;
    padding: 0 $ui-select-label-padding-x;
    margin: 0;
    outline: none;
  }

  .ui-select-content {
    flex-grow: 1;
    width: 100%;
  }

  .ui-select-label-text {
    margin-bottom: $ui-input-label-margin-bottom;
    font-size: $ui-input-label-font-size;
    line-height: $ui-input-label-line-height;
    cursor: default;
    transition:
      color 0.1s ease,
      transform 0.2s ease;
    transform-origin: left;
  }

  .ui-select-display {
    display: flex;
    height: $ui-input-height;
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
  }

  .ui-select-dropdown {
    @extend %dropshadow-2dp;

    position: absolute;
    z-index: $z-index-dropdown;
    margin-top: 2px;
  }

  .ui-select-clear {
    position: absolute;
    right: $ui-select-label-padding-x;
    bottom: 0;
    display: flex;
    align-items: center;
    height: $ui-input-height;
  }

  .ui-select-clear-spacer {
    flex-shrink: 0;
    width: $ui-select-clear-size;
  }

  .ui-select-options {
    max-height: rem-calc(256px);
    font-size: $ui-dropdown-item-font-size;
    color: $primary-text-color;
  }

  .ui-select-option-content {
    min-width: 0;
  }

  .ui-select-option-truncated {
    @include text-truncation;

    display: block;
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
