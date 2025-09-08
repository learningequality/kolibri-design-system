<template>

  <div class="autocomplete-multiselect">
    <!-- Combobox Input Container -->
    <div
      ref="comboboxContainer"
      class="combobox-container"
      :style="{
        position: 'relative',
        border: `1px solid ${$themeTokens.fineLine}`,
        borderRadius: '4px',
      }"
    >
      <KMultiSelectInput
        ref="multiSelectInput"
        :searchText="searchText"
        :autocomplete="autocomplete"
        :searchPlaceholder="getSearchPlaceholder()"
        :searchInputPadding="getSearchInputPadding()"
        :selectedOptions="selectedOptions"
        :selectedOptionsData="selectedOptionsData"
        :ariaLabel="comboboxAriaLabel"
        :listboxId="listboxId"
        :activeDescendant="getActiveDescendant()"
        :ariaDescribedById="ariaDescribedById"
        :isDropdownOpen="isDropdownOpen"
        :disabled="disabled"
        :required="required"
        :invalid="invalid"
        :clearAllMessage="clearAllMessage"
        :clearSearchMessage="clearSearchMessage"
        :toggleDropdownLabel="getToggleDropdownLabel()"
        :getClearPillLabel="getClearPillLabel"
        @update:searchText="searchText = $event"
        @deselect-option="deselectOption"
        @clear-all="clearAll"
        @input-keydown="handleComboboxKeydown"
        @input-focus="handleInputFocus"
        @input-blur="handleInputBlur"
        @input-click="handleInputClick"
        @clear-search="clearSearch"
        @toggle-dropdown="toggleDropdown"
        @search-input="handleInput"
        @pill-keydown="handlePillButtonKeydown"
      />

      <!-- Dropdown List -->
      <div
        v-show="isDropdownOpen"
        ref="dropdownContainer"
        class="dropdown-container"
        :style="{
          position: 'absolute',
          top: '100%',
          left: '0',
          right: '0',
          zIndex: '1000',
          backgroundColor: $themeTokens.surface,
          border: `1px solid ${$themeTokens.fineLine}`,
          borderTop: 'none',
          borderRadius: '0 0 4px 4px',
          maxHeight: '400px',
          overflowY: 'auto',
        }"
        role="region"
        @mousedown.prevent
      >
        <ul
          :id="listboxId"
          class="dropdown-list"
          role="listbox"
          aria-multiselectable="true"
          :style="{
            margin: '0',
            padding: '0',
            listStyle: 'none',
            outline: 'none',
          }"
          :aria-labelledby="ariaLabelledby"
          :aria-describedby="ariaDescribedById"
          tabindex="-1"
          @keydown="handleListKeydown"
          @click="handleListClick"
          @mouseenter="handleListMouseEnter"
          @mouseleave="handleListMouseLeave"
          @focus="handleListFocus"
        >
          <!-- Select All Option -->
          <li
            v-if="showSelectAll"
            :id="`select-all-${uid}`"
            role="option"
            :class="$computedClass(getSelectAllStyles())"
            :aria-selected="allOptionsSelected.toString()"
            :style="{
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '40px',
              borderBottom: `1px solid ${$themeTokens.fineLine}`,
              fontWeight: 'bold',
              backgroundColor: getSelectAllBackgroundColor(),
              outline: getSelectAllOutline(),
              outlineOffset: getSelectAllOutlineOffset(),
            }"
            :tabindex="isSelectAllFocused ? 0 : -1"
            data-option-type="select-all"
            @mousedown.prevent
            @mouseenter="handleSelectAllMouseEnter"
          >
            <KCheckbox
              presentational
              :checked="allOptionsSelected"
              :indeterminate="someOptionsSelected && !allOptionsSelected"
              :style="{ flexShrink: 0 }"
              tabindex="-1"
              aria-hidden="true"
            />
            <span :style="{ flex: 1 }">Select All</span>
          </li>

          <li
            v-for="(option, index) in displayedOptions"
            :id="getElementOptionId(option)"
            :key="option.id"
            :ref="el => { if (el) optionRefs[index] = el }"
            role="option"
            :class="$computedClass(getOptionStyles(option))"
            :aria-selected="isOptionSelected(option).toString()"
            :aria-setsize="displayedOptions.length"
            :aria-posinset="index + 1"
            :style="{
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '40px',
              backgroundColor: getOptionBackgroundColor(option),
              outline: getOptionOutline(option),
              outlineOffset: getOptionOutlineOffset(option),
            }"
            :tabindex="focusedOption?.id === option.id ? 0 : -1"
            :data-option-id="option.id"
            :data-option-index="index"
            data-option-type="regular"
            @mousedown.prevent
            @mouseenter="handleOptionMouseEnter(option)"
          >
            <KCheckbox
              presentational
              :checked="isOptionSelected(option)"
              :style="{ flexShrink: 0 }"
              tabindex="-1"
              aria-hidden="true"
            />
            <span :style="{ flex: 1, wordBreak: 'break-word' }">
              <!-- Safe highlighting using computed text segments -->
              <template v-if="shouldHighlightText(option.label)">
                <span
                  v-for="(segment, segmentIndex) in
                    getHighlightedSegments(option.label, searchText)"
                  :key="`${option.id}-segment-${segmentIndex}`"
                >
                  <mark
                    v-if="segment.highlight"
                    :style="{
                      backgroundColor: 'yellow',
                      color: 'black',
                      padding: '0'
                    }"
                  >{{ segment.text }}</mark>
                  <span v-else>{{ segment.text }}</span>
                </span>
              </template>
              <template v-else>
                {{ option.label }}
              </template>
            </span>
          </li>
        </ul>

        <div
          v-if="!displayedOptions.length"
          role="status"
          class="no-options"
          :style="{
            padding: '12px',
            margin: '0',
            textAlign: 'center',
            color: $themeTokens.annotation,
          }"
        >
          {{ noResultsMessage }}
        </div>
      </div>
    </div>
  </div>

</template>


<script>

  import {
    ref,
    computed,
    toRefs,
    getCurrentInstance,
    onMounted,
    onUnmounted
  } from 'vue';
  import {themeTokens } from '../styles/theme';

  import KMultiSelectInput from './components/KMultiSelectInput.vue';
  import useKMultiSelectPills from './composables/useKMultiSelectPills';
  import useKMultiSelectList from './composables/useKMultiSelectList';
  import useKMultiSelectHighlighting from './composables/useKMultiSelectHighlighting';
  import useKMultiSelectKeyboard from './composables/useKMultiSelectKeyboard';
  import useKMultiSelectDropdown from './composables/useKMultiSelectDropdown';
  import useKMultiSelectAccessibility from './composables/useKMultiSelectAccessibility';

  export default {
    name: 'KMultiSelect',
    components: {
      KMultiSelectInput,
    },
    setup(props, { emit }) {
      const { autocomplete } = toRefs(props);

      // Initialize reactive variables first
      const searchText = ref('');
      const isDropdownOpen = ref(false);
      const focusedOption = ref(null);
      const focusedIndex = ref(-1);
      const isSelectAllFocused = ref(false);
      const inputFocused = ref(false);
      const comboboxContainer = ref(null);
      const dropdownContainer = ref(null);
      const multiSelectInput = ref(null);
      const optionRefs = ref([]);
      const isClient = ref(false);
      const isInsideComponent = ref(false);
      const isKeyboardNavigating = ref(false);

      function resetFocusState() {
        focusedIndex.value = -1;
        focusedOption.value = null;
        isSelectAllFocused.value = false;
        isKeyboardNavigating.value = false;
      }

      function setFocusedOption(option) {
        focusedOption.value = option;
        isSelectAllFocused.value = false;
        isInsideComponent.value = true;
      }

      function updateFocusedIndex() {
        if (focusedOption.value && displayedOptions && displayedOptions.value) {
          focusedIndex.value = displayedOptions.value.findIndex(
            opt => opt.id === focusedOption.value.id
          );
        }
      }

      function setFocusedSelectAll() {
        isSelectAllFocused.value = true;
        focusedOption.value = null;
        focusedIndex.value = -1;
        isInsideComponent.value = true;
      }

      const {
        displayedOptions,
        filteredOptions,
        showSelectAll,
        allOptionsSelected,
        someOptionsSelected,
        isOptionSelected,
        toggleOption,
        selectAll,
        handleListClick,
        handleListMouseEnter,
        handleListMouseLeave,
        handleListFocus,
        handleOptionMouseEnter,
        handleSelectAllMouseEnter,
      } = useKMultiSelectList(props, emit, {
        setFocusedOption,
        setFocusedSelectAll,
        resetFocusState,
        isKeyboardNavigating,
        searchText
      });

      const {
        shouldHighlight,
        getHighlightedSegments,
        getSearchResultsMessage,
        shouldHighlightText,
        getSearchPlaceholder,
        getSearchInputPadding,
      } = useKMultiSelectHighlighting(props, searchText);

      const instance = getCurrentInstance();
      const uid = instance.proxy._uid;

      const listboxId = computed(() =>
        `autocomplete-multiselect-listbox-${uid}`
      );
      const ariaDescribedById = computed(() =>
        `autocomplete-multiselect-description-${uid}`
      );

      const selectedOptions = computed({
        get() { return props.value; },
        set(newValue) { emit('input', newValue); },
      });
      const optionsCount = computed(() => props.options.length);
      const placeholderText = computed(() => props.placeholder);
      const searchLabelText = computed(() => props.searchLabel);

      function getElementOptionId(option) {
        if (!option?.id) return null;
        return `autocomplete-multiselect-option-${uid}-${option.id}`;
      }

      function getActiveDescendant() {
        if (isSelectAllFocused.value) {
          return `select-all-${uid}`;
        }
        return focusedOption.value ? getElementOptionId(focusedOption.value) : null;
      }

      function clearSearch() {
        searchText.value = '';
        if (multiSelectInput.value) {
          multiSelectInput.value.focusInput();
        }
        announceSearchCleared();
      }

      function handleInput(event) {
        if (autocomplete.value) {
          searchText.value = event.target.value;
          if (!isDropdownOpen.value) {
            isDropdownOpen.value = true;
          }
          resetFocusState();
          announceSearchResults(displayedOptions.value.length);
        } else {
          event.preventDefault();
          searchText.value = '';
        }
      }

      function handleInputFocus() {
        inputFocused.value = true;
        isInsideComponent.value = true;
        announceInputFocus();
      }

      function handleInputBlur() {
        inputFocused.value = false;

        setTimeout(() => {
          const activeElement = document.activeElement;
          const isStillInComponent = comboboxContainer.value &&
            comboboxContainer.value.contains(activeElement);

          if (!isStillInComponent) {
            isInsideComponent.value = false;
            closeDropdown();
          }
        }, 50);
      }

      function handleInputClick() {
        if (!isDropdownOpen.value) {
          openDropdown();
        }
      }

      const {
        openDropdown,
        closeDropdown,
        toggleDropdown,
        handleClickOutside,
        getDropdownStyles,
        getDropdownContainerStyles,
        getInputWrapperStyles,
        isDropdownVisible,
        getToggleDropdownLabel,
        getToggleDropdownIcon,
        getDropdownAriaAttributes,
        getDropdownListAriaAttributes,
      } = useKMultiSelectDropdown(props, emit, {
        isDropdownOpen,
        searchText,
        instance,
        comboboxContainer,
        isInsideComponent,
        listboxId,
        ariaDescribedById,
        getActiveDescendant
      }, {
        resetFocusState
      });

      const {
        comboboxAriaLabel,
        comboboxAriaAttributes,
        listboxAriaAttributes,
        optionAriaAttributes,
        selectAllAriaAttributes,
        announceOptionSelection,
        announceSelectAll,
        announceSearchResults,
        announceSearchCleared,
        announceInputFocus,
        announceOptionRemoval,
        announceAllCleared,
        announceDropdownToggle,
        announceCurrentFocus,
        announceOptionCount,
        focusFirstOption,
        focusLastOption,
        focusSelectAll,
        focusInput,
        getNextFocusableElement,
        validateAccessibility,
      } = useKMultiSelectAccessibility(props, emit, {
        searchText,
        isDropdownOpen,
        focusedOption,
        focusedIndex,
        isSelectAllFocused,
        selectedOptions,
        displayedOptions,
        showSelectAll,
        listboxId,
        ariaDescribedById,
        uid
      }, {
        getActiveDescendant,
        getElementOptionId,
        isOptionSelected: isOptionSelected,
        allOptionsSelected: allOptionsSelected,
        setFocusedOption,
        setFocusedSelectAll,
        instance
      });

      const {
        selectedOptionsData,
        deselectOption,
        clearAll,
        getClearPillLabel,
        clearAllMessage,
      } = useKMultiSelectPills(props, emit, {
        announceOptionRemoval,
        announceAllCleared
      });

      const {
        navigateDown,
        navigateUp,
        setInitialFocus,
        handleComboboxKeydown,
        handleListKeydown,
        handlePillButtonKeydown,
      } = useKMultiSelectKeyboard(props, emit, {
        searchText,
        isDropdownOpen,
        focusedOption,
        focusedIndex,
        isSelectAllFocused,
        isKeyboardNavigating,
        displayedOptions,
        showSelectAll,
        instance
      }, {
        openDropdown,
        closeDropdown,
        toggleOption,
        selectAll,
        clearSearch,
        deselectOption
      });

      function getOptionBackgroundColor(option) {
        const isFocused = focusedOption.value?.id === option.id;
        const isSelected = isOptionSelected(option);

        if (isFocused && isKeyboardNavigating.value) {
          try {
            return isSelected ?
              `${themeTokens().primary}30` :
              `${themeTokens().primary}20`;
          } catch (error) {
            return isSelected ? 'rgba(0, 0, 255, 0.3)' : 'rgba(0, 0, 255, 0.2)';
          }
        }
        return 'transparent';
      }

      function getOptionOutline(option) {
        const isFocused = focusedOption.value?.id === option.id;
        if (isFocused && isKeyboardNavigating.value) {
          try {
            return `2px solid ${themeTokens().primary}`;
          } catch (error) {
            return '2px solid #0000ff';
          }
        }
        return 'none';
      }

      function getOptionOutlineOffset(option) {
        const isFocused = focusedOption.value?.id === option.id;
        return (isFocused && isKeyboardNavigating.value) ? '-2px' : '0';
      }


      function getSelectAllBackgroundColor() {
        if (isSelectAllFocused.value && isKeyboardNavigating.value) {
          try {
            return `${themeTokens().primary}20`; // Light blue for focused
          } catch (error) {
            return 'rgba(0, 0, 255, 0.2)';
          }
        }
        return 'transparent';
      }

      function getSelectAllOutline() {
        return (isSelectAllFocused.value && isKeyboardNavigating.value) ? `2px solid ${themeTokens().primary}` : 'none';
      }

      function getSelectAllOutlineOffset() {
        return (isSelectAllFocused.value && isKeyboardNavigating.value) ? '-2px' : '0';
      }

      function getOptionStyles(option) {
        const isSelected = isOptionSelected(option);
        try {
          return {
            ':hover': { backgroundColor: `${themeTokens().primary}15` },
            ':not(:last-child)': {
              borderBottom: `1px solid ${themeTokens().fineLine}`
            },
            ...(isSelected ? { fontWeight: 'bold' } : {})
          };
        } catch (error) {
          return {
            ':hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
            ':not(:last-child)': {
              borderBottom: '1px solid #e0e0e0'
            },
            ...(isSelected ? { fontWeight: 'bold' } : {})
          };
        }
      }

      function getSelectAllStyles() {
        try {
          return {
            ':hover': { backgroundColor: `${themeTokens().primary}15` },
          };
        } catch (error) {
          return {
            ':hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
          };
        }
      }

      onMounted(() => {
        isClient.value = true;
        document.addEventListener('click', handleClickOutside);
      });

      onUnmounted(() => {
        if (typeof document !== 'undefined') {
          document.removeEventListener('click', handleClickOutside);
        }
      });

      const inputStyles = computed(() => {
        try {
          return {
            '::placeholder': { color: themeTokens().annotation }
          };
        } catch (error) {
          return {
            '::placeholder': { color: '#666666' }
          };
        }
      });

      const noResultsMessage = computed(() =>
        autocomplete.value ? 'No results found' : 'No options available'
      );

      const clearSearchMessage = 'Clear search';

      return {
        searchText, isDropdownOpen, focusedOption, focusedIndex,
        isSelectAllFocused, inputFocused, selectedOptions, selectedOptionsData,
        displayedOptions, filteredOptions, allOptionsSelected, someOptionsSelected, showSelectAll,
        comboboxContainer, dropdownContainer, multiSelectInput, optionRefs, listboxId,
        ariaDescribedById, inputStyles, uid,
        isKeyboardNavigating,
        handleInput, handleInputFocus, handleInputBlur,
        handleInputClick, toggleDropdown, isOptionSelected, toggleOption,
        selectAll, clearSearch,         setFocusedOption,
        setFocusedSelectAll, updateFocusedIndex, getElementOptionId, getOptionStyles,
        getSelectAllStyles,
        noResultsMessage,
        getActiveDescendant, clearSearchMessage,
        isClient, resetFocusState,
        getOptionBackgroundColor,
        getOptionOutline, getOptionOutlineOffset,
        getSelectAllBackgroundColor, getSelectAllOutline, getSelectAllOutlineOffset,
        deselectOption, clearAll, handlePillButtonKeydown, getClearPillLabel, clearAllMessage,
        handleListClick, handleListMouseEnter, handleListMouseLeave, handleListFocus,
        handleOptionMouseEnter, handleSelectAllMouseEnter,
        optionsCount,
        placeholderText,
        searchLabelText,
        shouldHighlight, getHighlightedSegments, getSearchResultsMessage,
        shouldHighlightText, getSearchPlaceholder, getSearchInputPadding,
        handleComboboxKeydown, handleListKeydown, navigateDown, navigateUp, setInitialFocus,
        openDropdown, closeDropdown,handleClickOutside,
        getDropdownStyles, getDropdownContainerStyles, getInputWrapperStyles,
        isDropdownVisible, getToggleDropdownLabel, getToggleDropdownIcon,
        getDropdownAriaAttributes, getDropdownListAriaAttributes,
        comboboxAriaLabel,
        comboboxAriaAttributes,
        listboxAriaAttributes,
        optionAriaAttributes,
        selectAllAriaAttributes,
        announceOptionSelection,
        announceSelectAll,
        announceSearchResults,
        announceSearchCleared,
        announceInputFocus,
        announceOptionRemoval,
        announceAllCleared,
        announceDropdownToggle,
        announceCurrentFocus,
        announceOptionCount,
        focusFirstOption,
        focusLastOption,
        focusSelectAll,
        focusInput,
        getNextFocusableElement,
        validateAccessibility,
      };
    },
    props: {
      value: { type: Array, required: true },
      options: {
        type: Array,
        required: true,
        default: () => [],
        validator: options => Array.isArray(options) && options.every(option =>
          typeof option === 'object' && option !== null &&
          typeof option.id === 'string' && typeof option.label === 'string'
        )
      },
      autocomplete: { type: Boolean, default: false },
      placeholder: { type: String, default: 'Select options...' },
      searchLabel: { type: String, default: 'Search options' },
      ariaLabelledby: { type: String, default: null },
      disabled: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
      invalid: { type: Boolean, default: false },
    },
  };

</script>


<style lang="scss" scoped>

.autocomplete-multiselect {
  position: relative;
  width: 100%;
}

.visuallyhidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.dropdown-container {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-list li {
  user-select: none;
  transition: background-color 0.15s ease, outline 0.15s ease;
}

.dropdown-list li:hover {
  background-color: var(--hover-background);
}

.dropdown-list li:focus {
  outline: 2px solid var(--primary) !important;
  outline-offset: -2px !important;
}

.dropdown-list li:focus-visible {
  outline: 2px solid var(--primary) !important;
  outline-offset: -2px !important;
}

@media (prefers-contrast: high) {
  .combobox-input:focus,
  .dropdown-list li:focus {
    outline: 3px solid;
    outline-offset: -1px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pill {
    animation: none;
  }

  .dropdown-list li {
    transition: none;
  }
}

</style>
