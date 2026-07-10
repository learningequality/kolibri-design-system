<template>

  <div
    class="kmselect"
    :style="appearanceOverrides"
  >
    <div
      ref="containerEl"
      class="kmselect-container"
      :class="[
        { 'has-label': label, 'is-disabled': disabled, 'is-active': inputFocused || isOpen },
        $computedClass({
          ':hover:not(.is-disabled):not(.is-active)': {
            borderBottomColor: $themeTokens.text,
          },
        }),
      ]"
      :style="{
        backgroundColor: disabled ? $themeTokens.textDisabled + '20' : $themePalette.grey.v_100,
        borderRadius: '2px 2px 0 0',
        borderBottom: `1px solid ${
          invalid
            ? $themeTokens.error
            : inputFocused
              ? $themeTokens.primary
              : $themePalette.grey.v_700
        }`,
      }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      @click="onContainerClick"
    >
      <label
        v-if="label"
        :id="labelId"
        :for="inputId"
        class="kmselect-label"
        :class="{
          'is-inline': isLabelInline,
          'is-floating': !isLabelInline,
        }"
        :style="{
          color: disabled
            ? $themeTokens.textDisabled
            : invalid
              ? $themeTokens.error
              : inputFocused || isOpen
                ? $themeTokens.primary
                : isHovered
                  ? $themeTokens.text
                  : $themePalette.grey.v_700,
        }"
      >
        {{ label }}
      </label>
      <KMultiSelectInput
        ref="inputComponent"
        :selectedOptions="selectedOptionsData"
        :searchText="internalSearchText"
        :placeholder="computedPlaceholder"
        :listboxId="listboxId"
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
        :invalid="invalid"
        :focused="inputFocused"
        :hovered="isHovered && !inputFocused && !isOpen"
        :activeDescendant="activeDescendantId"
        :labelId="labelId"
        :inputId="inputId"
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
          <!-- @slot Custom slot for rendering selected items (chips) in multiple select mode. -->
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
          <!-- @slot Custom slot for rendering option items in the dropdown menu. -->
          <slot
            name="option"
            v-bind="slotProps"
          ></slot>
        </template>
        <template
          v-if="$scopedSlots['no-results']"
          #no-results
        >
          <!-- @slot Optional slot as alternative to `noResultsText` prop -->
          <slot
            name="no-results"
            :searchText="internalSearchText"
          ></slot>
        </template>
      </KMultiSelectDropdown>
    </div>

    <div class="kmselect-feedback">
      <div
        v-if="showError"
        :id="errorId"
        class="kmselect-feedback-text"
        :style="{ color: $themeTokens.error }"
      >
        <!-- @slot Optional slot as alternative to `invalidText` prop -->
        <slot name="error">
          {{ invalidText }}
        </slot>
      </div>
      <div
        v-else
        class="kmselect-feedback-text"
      >
        &nbsp;
      </div>
    </div>
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
      const isHovered = ref(false);
      const containerEl = ref(null);
      const inputComponent = ref(null);
      const dropdownComponent = ref(null);
      const activeDescendantId = ref(null);

      const showError = computed(
        () => props.invalid && (Boolean(props.invalidText) || Boolean(instance.proxy.$slots.error)),
      );

      const listboxId = computed(() => `kmselect-listbox-${uid}`);
      const labelId = computed(() => `kmselect-label-${uid}`);
      const errorId = computed(() => `kmselect-error-${uid}`);
      const inputId = computed(() => `kmselect-input-${uid}`);

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

      const { isOpen, openDropdown, closeDropdown, toggleDropdown } = useMultiSelectDropdownLogic(
        props,
        {
          containerEl,
          setSearchText,
          suppressFilter,
          normalizedOptions,
          getOptionValue,
          getOptionText,
        },
      );

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
        // Lift filter suppression when the user starts typing.
        if (suppressFilter.value) suppressFilter.value = false;
        setSearchText(val);
        if (!isOpen.value && val) openDropdown();
      }

      function onInputFocus() {
        inputFocused.value = true;
        emit('focus');
      }

      function onContainerClick() {
        if (props.disabled) return;
        inputComponent.value?.focus();
        if (!isOpen.value) {
          openDropdown();
        }
      }

      watch(isOpen, newVal => {
        if (newVal) {
          nextTick(() => {
            inputRef.value?.focus();
            if (!props.multiple && suppressFilter.value) {
              inputRef.value?.select();
            }
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

      const isLabelInline = computed(
        () =>
          Boolean(props.label) &&
          selectedOptionsData.value.length === 0 &&
          !internalSearchText.value &&
          !inputFocused.value,
      );
      const computedPlaceholder = computed(() => (isLabelInline.value ? '' : props.placeholder));

      return {
        listboxId,
        labelId,
        errorId,
        inputId,
        activeDescendantId,
        isOpen,
        internalSearchText,
        inputFocused,
        isHovered,
        showError,
        containerEl,
        inputComponent,
        dropdownComponent,
        dropdownOptions,
        computedListboxMessages,
        selectedOptionsData,
        selectedValuesArray,
        indeterminateValues,
        isLabelInline,
        computedPlaceholder,
        onContainerClick,
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
      };
    },

    props: {
      /**
       * Custom CSS styles applied to the root container element.
       */
      appearanceOverrides: {
        type: Object,
        default: null,
      },
      /**
       * The currently selected value(s). Use v-model to keep in sync.
       * Array when multiple=true, String/Number/null when multiple=false.
       */
      value: {
        default: null,
        validator: v =>
          v === null || Array.isArray(v) || typeof v === 'string' || typeof v === 'number',
      },
      /**
       * Array of option objects or primitive values to display in the dropdown.
       */
      // eslint-disable-next-line vue/no-unused-properties
      options: {
        type: Array,
        required: true,
      },
      /**
       * The current search/filter input text. Supports .sync modifier.
       */
      searchText: {
        type: String,
        default: '',
      },
      /**
       * Whether multiple options can be selected or not.
       */
      multiple: {
        type: Boolean,
        default: true,
      },
      /**
       * Key on option objects used as the display label.
       */
      itemText: {
        type: String,
        default: 'label',
      },
      /**
       * Key on option objects used as the unique value for selection tracking.
       */
      itemValue: {
        type: String,
        default: 'value',
      },
      /**
       * Additional option object keys to include in search matching.
       * By default, only itemText is searched.
       */
      // eslint-disable-next-line vue/no-unused-properties
      searchKeys: {
        type: Array,
        default: null,
      },
      /**
       * Label for the field.
       */
      label: {
        type: String,
        default: '',
      },
      /**
       * Sets the placeholder value.
       */
      placeholder: {
        type: String,
        default: '',
      },
      /**
       * Text shown in the dropdown when the search query has no matching options.
       */
      noResultsText: {
        type: String,
        default: null,
      },
      /**
       * Whether or not the field is disabled.
       */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       * Whether or not the current value is invalid.
       */
      invalid: {
        type: Boolean,
        default: false,
      },
      /**
       * Text conditionally displayed when invalid=true.
       */
      invalidText: {
        type: String,
        default: '',
      },
      /**
       * Whether to turn into a clearable state when a value has been selected.
       */
      clearable: {
        type: Boolean,
        default: false,
      },
      /**
       * Only applies to hierarchical options. When true, selecting a child
       * automatically selects all its ancestors as well.
       */
      // eslint-disable-next-line vue/no-unused-properties
      autoSelectParent: {
        type: Boolean,
        default: false,
      },
      /**
       * Dictionary of translation strings used for accessibility announcements
       * and localizable UI text.
       */
      messages: {
        type: Object,
        default: () => ({}),
      },
      /**
       * When true, hides already-selected options from the dropdown list.
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

  .kmselect-container {
    position: relative;
    width: 100%;

    &.has-label {
      padding-top: 20px;
    }
  }

  .kmselect-label {
    position: absolute;
    inset-inline-start: 10px;
    top: 2px;
    z-index: 1;
    display: table;
    width: fit-content;
    margin-bottom: 0;
    font-size: 15px;
    font-weight: normal;
    transition:
      color 0.1s ease,
      transform 0.2s ease;
    transform-origin: left;

    &.is-inline {
      cursor: text;
      transform: translateY(24px) scale(1.1);
    }

    &.is-floating {
      transform: translateY(0) scale(1);
    }
  }

  .kmselect-feedback {
    margin: 4px 0 0;
    font-size: 12px;
  }

</style>
