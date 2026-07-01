<template>

  <div
    class="kmselect"
    :style="appearanceOverrides"
  >
    <label
      v-if="label"
      :id="labelId"
      class="kmselect-label"
      :style="{
        display: 'block',
        marginBottom: '4px',
        fontSize: '12px',
        fontWeight: 600,
        color: disabled ? $themeTokens.textDisabled : $themeTokens.text,
      }"
    >
      {{ label }}
    </label>

    <div
      ref="containerEl"
      class="kmselect-container"
      :style="{ position: 'relative' }"
    >
      <KMultiSelectInput
        ref="inputComponent"
        :selectedOptions="selectedOptionsData"
        :searchText="internalSearchText"
        :placeholder="placeholder"
        :listboxId="listboxId"
        :required="required"
        :errorId="errorId"
        :isOpen="isOpen"
        :multiple="multiple"
        :itemText="itemText"
        :itemValue="itemValue"
        :clearable="clearable"
        :clearAllLabel="typeof messages.clearText === 'function' ? messages.clearText() : ''"
        :openLabel="typeof messages.open === 'function' ? messages.open() : ''"
        :closeLabel="typeof messages.close === 'function' ? messages.close() : ''"
        :disabled="disabled"
        :invalid="showInvalidMessage"
        :focused="inputFocused"
        :activeDescendant="activeDescendantId"
        :labelId="labelId"
        @update:searchText="onSearchInput"
        @input-keydown="onInputKeydown"
        @input-focus="onInputFocus"
        @input-blur="onInputBlur"
        @chip-remove="onChipRemove"
        @clear-all="onClearAll"
        @toggle="toggleDropdown"
      >
        <template
          v-if="$scopedSlots.chip"
          #chip="slotProps"
        >
          <!--@slot Custom slot for rendering selected items (chips) in multiple select mode. -->
          <slot
            name="chip"
            v-bind="slotProps"
          ></slot>
        </template>
      </KMultiSelectInput>

      <KMultiSelectDropdown
        ref="dropdownComponent"
        :isOpen="isOpen"
        :options="dropdownOptions"
        :selectedValues="selectedValuesArray"
        :listboxId="listboxId"
        :listboxLabel="label || placeholder"
        :noResultsText="noResultsText"
        :itemText="itemText"
        :itemValue="itemValue"
        :indeterminateValues="indeterminateValues"
        :multiple="multiple"
        :hideSelected="hideSelected"
        :listboxMessages="computedListboxMessages"
        @input="onListboxInput"
        @active-descendant-change="id => (activeDescendantId = id)"
      >
        <template
          v-if="$scopedSlots.option"
          #option="slotProps"
        >
          <!--@slot Custom slot for rendering option items in the dropdown menu. -->
          <slot
            name="option"
            v-bind="slotProps"
          ></slot>
        </template>
        <template
          v-if="$scopedSlots.empty"
          #empty
        >
          <!--@slot Custom slot for rendering content when no search results are found. -->
          <slot
            name="empty"
            :searchText="internalSearchText"
          ></slot>
        </template>
      </KMultiSelectDropdown>
    </div>

    <p
      v-if="showInvalidMessage && invalidText"
      :id="errorId"
      :style="{
        margin: '4px 0 0',
        fontSize: '12px',
        color: $themeTokens.error,
      }"
    >
      {{ invalidText }}
    </p>
  </div>

</template>


<script>

  import { ref, computed, watch, getCurrentInstance, nextTick } from 'vue';

  import KMultiSelectInput from './components/KMultiSelectInput.vue';
  import KMultiSelectDropdown from './components/KMultiSelectDropdown.vue';

  import useMultiSelectList from './useMultiSelectList.js';
  import useMultiSelectCascade from './useMultiSelectCascade.js';
  import useMultiSelectDropdownLogic from './useMultiSelectDropdown.js';

  /**
   * A searchable select component supporting both single and multiple selections, flat
   * arrays, and deeply nested hierarchical trees with cascading selection behavior.
   */
  export default {
    name: 'KMultiSelect',

    components: {
      KMultiSelectInput,
      KMultiSelectDropdown,
    },

    setup(props, { emit }) {
      const instance = getCurrentInstance();
      const uid = instance.proxy._uid;

      const internalSearchText = ref(props.searchText || '');
      const inputFocused = ref(false);
      const changedOrFocused = ref(false);
      const containerEl = ref(null);
      const inputComponent = ref(null);
      const dropdownComponent = ref(null);
      const activeDescendantId = ref(null);

      const showInvalidMessage = computed(() => props.invalid && changedOrFocused.value);

      const listboxId = computed(() => `kmselect-listbox-${uid}`);
      const labelId = computed(() => `kmselect-label-${uid}`);
      const errorId = computed(() => `kmselect-error-${uid}`);

      watch(
        () => props.searchText,
        val => {
          internalSearchText.value = val;
        },
      );

      function setSearchText(val) {
        internalSearchText.value = val;
        emit('update:searchText', val);
      }

      // suppressFilter is owned here so it can be passed to both composables.
      // The dropdown composable sets it to true when pre-filling; the list
      // composable reads it to skip filtering; onSearchInput clears it.
      const suppressFilter = ref(false);

      const {
        normalizedOptions,
        displayedOptions,
        selectedOptionsData,
        getOptionValue,
        getOptionText,
        removeOption: defaultRemoveOption,
        clearAll,
      } = useMultiSelectList(props, emit, {
        searchText: internalSearchText,
        suppressFilter,
        messages: props.messages,
      });

      const { isOpen, openDropdown, closeDropdown, toggleDropdown } =
        useMultiSelectDropdownLogic(props, {
          containerEl,
          setSearchText,
          suppressFilter,
          normalizedOptions,
          getOptionValue,
          getOptionText,
        });

      const {
        indeterminateValues,
        onListboxInput: onCascadeListboxInput,
        removeOption,
      } = useMultiSelectCascade(props, emit, {
        normalizedOptions,
        getOptionValue,
        setSearchText,
        closeDropdown,
        getOptionText,
        defaultRemoveOption,
        messages: props.messages,
      });

      const inputRef = computed(() => inputComponent.value?.$refs?.inputEl ?? null);

      const selectedValuesArray = computed(() => {
        if (Array.isArray(props.value)) return props.value;
        return props.value !== null && props.value !== undefined ? [props.value] : [];
      });

      function onInputKeydown(event) {
        const navigationKeys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
        const isCtrlA =
          (event.key === 'a' || event.key === 'A') && (event.ctrlKey || event.metaKey);

        if (navigationKeys.includes(event.key) || isCtrlA) {
          if (!isOpen.value) {
            event.preventDefault();
            openDropdown();
            return;
          }
          event.preventDefault();
          dropdownComponent.value?.forwardKeydown(event);
          return;
        }

        switch (event.key) {
          case 'Escape':
            event.preventDefault();
            event.stopPropagation();
            closeDropdown();
            inputRef.value?.focus();
            break;

          case 'Enter':
            event.preventDefault();
            event.stopPropagation();
            if (!isOpen.value) {
              openDropdown();
            } else {
              const fwd = key =>
                dropdownComponent.value?.forwardKeydown(
                  new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }),
                );
              const hasFocused = dropdownComponent.value?.hasFocusedOption();
              if (!hasFocused) fwd('ArrowDown');
              fwd(' ');

              if (dropdownOptions.value.length === 0 && internalSearchText.value) {
                setSearchText('');
              }
            }
            break;

          case 'Backspace':
            if (
              props.multiple &&
              !internalSearchText.value &&
              selectedValuesArray.value.length > 0
            ) {
              // Multi-select: remove the last chip
              event.preventDefault();
              removeOption(selectedValuesArray.value[selectedValuesArray.value.length - 1]);
            } else if (
              !props.multiple &&
              !isOpen.value &&
              !internalSearchText.value &&
              selectedValuesArray.value.length > 0
            ) {
              // Single-select: open dropdown so user can edit/change the selection.
              // Guard with !isOpen.value so holding Backspace after clearing the
              // pre-filled text does NOT re-trigger openDropdown() in a loop.
              event.preventDefault();
              openDropdown();
            }
            break;



          case 'Tab':
            closeDropdown();
            break;

          default:
            if (!isOpen.value && event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
              openDropdown();
            }
        }
      }

      function onSearchInput(val) {
        // User is actively typing — lift the filter suppression so the
        // dropdown starts filtering based on what the user types.
        if (suppressFilter.value) suppressFilter.value = false;
        setSearchText(val);
        if (!isOpen.value && val) openDropdown();
      }

      function onInputFocus() {
        inputFocused.value = true;
        changedOrFocused.value = true;
        emit('focus');
      }

      // When the dropdown opens in single-select mode with a pre-filled value,
      // select all the text so the user can immediately type to replace it.
      watch(isOpen, newVal => {
        if (newVal && !props.multiple && suppressFilter.value) {
          nextTick(() => {
            inputRef.value?.select();
          });
        }
      });

      function onInputBlur() {
        inputFocused.value = false;
        setTimeout(() => {
          if (containerEl.value && !containerEl.value.contains(document.activeElement)) {
            closeDropdown();
            emit('blur');
          }
        }, 150);
      }

      async function onClearAll() {
        clearAll();
        await nextTick();
        inputRef.value?.focus();
      }

      async function onListboxInput(newValues) {
        onCascadeListboxInput(newValues);
        await nextTick();
        if (isOpen.value) {
          inputRef.value?.focus();
        }
      }

      async function onChipRemove(val) {
        removeOption(val);
        await nextTick();
        inputRef.value?.focus();
      }

      const dropdownOptions = computed(() => displayedOptions.value);

      const computedListboxMessages = computed(() => {
        const result = {};
        const keys = [
          'clickable',
          'allOptionsSelected',
          'allOptionsDeselected',
          'optionDeselected',
        ];
        keys.forEach(key => {
          if (typeof props.messages[key] === 'function') {
            result[key] = props.messages[key];
          }
        });
        return Object.keys(result).length > 0 ? result : undefined;
      });

      function focus() {
        inputComponent.value?.focus();
      }

      function validate() {
        changedOrFocused.value = true;
        if (props.required) {
          const isEmpty = Array.isArray(props.value)
            ? props.value.length === 0
            : props.value == null || props.value === '';
          return !isEmpty;
        }
        return true;
      }

      function resetValidation() {
        changedOrFocused.value = false;
        emit('reset-validation');
      }

      return {
        listboxId,
        labelId,
        errorId,
        activeDescendantId,
        isOpen,
        internalSearchText,
        inputFocused,
        showInvalidMessage,
        containerEl,
        inputComponent,
        dropdownComponent,
        dropdownOptions,
        computedListboxMessages,
        selectedOptionsData,
        selectedValuesArray,
        indeterminateValues,
        onChipRemove,
        onClearAll,
        toggleDropdown,
        onSearchInput,
        onInputFocus,
        onInputBlur,
        onListboxInput,
        onInputKeydown,
        // eslint-disable-next-line vue/no-unused-properties
        focus,
        // eslint-disable-next-line vue/no-unused-properties
        validate,
        // eslint-disable-next-line vue/no-unused-properties
        resetValidation,
      };
    },

    props: {
      /**
       * Custom CSS styles to apply directly to the root container.
       */
      appearanceOverrides: {
        type: Object,
        default: null,
      },
      /**
       * The currently selected value(s). Bind this prop using v-model.
       * When multiple is true, this must be an Array. When multiple is false,
       * this can be a String or Number.
       */
      value: {
        default: null,
        validator: v =>
          v === null || Array.isArray(v) || typeof v === 'string' || typeof v === 'number',
      },
      /**
       * An array of all available options to display in the dropdown.
       * Options can be objects or primitive values.
       */
      // eslint-disable-next-line vue/no-unused-properties
      options: {
        type: Array,
        required: true,
      },
      /**
       * The current search/filter string. Supports .sync modifier.
       */
      searchText: {
        type: String,
        default: '',
      },
      /**
       * Determines whether multiple options can be selected simultaneously.
       */
      multiple: {
        type: Boolean,
        default: true,
      },
      /**
       * The object key to use for resolving the display text of each option.
       */
      itemText: {
        type: String,
        default: 'label',
      },
      /**
       * The object key to use for resolving the unique identifier of each option.
       */
      itemValue: {
        type: String,
        default: 'value',
      },
      /**
       * An array of object keys to search against when the user types in the input
       * (defaults to itemText).
       */
      // eslint-disable-next-line vue/no-unused-properties
      searchKeys: {
        type: Array,
        default: null,
      },
      /**
       * The visible, human-readable label rendered above the input field.
       */
      label: {
        type: String,
        default: '',
      },
      /**
       * The placeholder text shown inside the input field when no options are selected.
       */
      placeholder: {
        type: String,
        default: '',
      },
      /**
       * The message shown in the dropdown menu when a user's search query
       * yields no matching options.
       */
      noResultsText: {
        type: String,
        default: null,
      },
      /**
       * When true, the input is completely disabled.
       */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       * When true, visually indicates an error state by turning the input border red.
       */
      invalid: {
        type: Boolean,
        default: false,
      },
      /**
       * The validation error message shown directly below the input field when
       * invalid is true.
       */
      invalidText: {
        type: String,
        default: '',
      },
      /**
       * When true, displays a clear 'X' icon button on the right side of the input.
       */
      clearable: {
        type: Boolean,
        default: false,
      },
      /**
       * When true, marks the field as required for form submission.
       */
      required: {
        type: Boolean,
        default: false,
      },
      /**
       * Only applies to hierarchical (tree) options.
       * When true, selecting a child option automatically selects all its ancestor
       * options too — both the child and its parents will appear as chips in the input
       * and as fully checked in the dropdown.
       * When false (default), only the explicitly selected option is added; ancestor
       * options that have some but not all children selected will appear with an
       * indeterminate state in the dropdown and will not produce a chip.
       */
      // eslint-disable-next-line vue/no-unused-properties
      autoSelectParent: {
        type: Boolean,
        default: false,
      },
      /**
       * Dictionary of translation strings used for accessibility announcements
       * and localizable UI text. All keys are optional.
       *
       * Supported keys:
       * - `removed`   — announced to screen readers when a chip is removed
       * - `cleared`   — announced to screen readers when all chips are cleared
       * - `clearText` — aria-label for the clear (×) button (used when clearable=true).
       * - `open`      — aria-label for the dropdown expand (▼) button.
       * - `close`     — aria-label for the dropdown collapse (▲) button.
       */
      messages: {
        type: Object,
        default: () => ({}),
      },
      /**
       * When true, removes already-selected options from the dropdown list so they
       * only appear as chips above the input — never as checkboxes in the dropdown.
       * Use this for Tags-style free-text chip creation (allowCustom).
       * Also automatically hides checkboxes since items vanish on selection.
       */
      hideSelected: {
        type: Boolean,
        default: false,
      },
    },
  };

</script>


<style lang="scss" scoped>

  .kmselect {
    position: relative;
    width: 100%;
  }

</style>
