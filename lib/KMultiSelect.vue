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
      <div
        class="input-wrapper"
        :style="{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          minHeight: '40px',
          padding: '4px',
          gap: '4px'
        }"
      >
        <!-- Search Icon -->
        <KIcon
          v-if="autocomplete && !selectedOptions.length"
          icon="search"
          class="search-icon"
          :style="{
            color: $themeTokens.annotation,
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '16px',
            zIndex: 1,
          }"
          aria-hidden="true"
        />

        <!-- Selected Pills inside input -->
        <div
          v-for="(option, index) in selectedOptionsData"
          :key="option.id"
          class="pill"
          :style="{
            backgroundColor: $themeTokens.surface,
            border: `1px solid ${$themeTokens.fineLine}`,
            borderRadius: '16px',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '14px',
            flexShrink: 0,
          }"
          role="listitem"
        >
          <span>{{ option.label }}</span>
          <KIconButton
            size="small"
            icon="clear"
            :ariaLabel="getClearPillLabel(option.label)"
            :title="getClearPillLabel(option.label)"
            @click="deselectOption(option)"
            @keydown="handlePillButtonKeydown($event, option, index)"
          />
        </div>

        <!-- Clear All Button (only when there are selections) -->
        <KIconButton
          v-if="selectedOptions && selectedOptions.length"
          size="small"
          icon="clear"
          :ariaLabel="clearAllMessage"
          :title="clearAllMessage"
          class="clear-all-button"
          :style="{ flexShrink: 0 }"
          @click="clearAll"
        />

        <!-- Input Field -->
        <input
          ref="comboboxInput"
          v-model.trim="searchText"
          type="text"
          role="combobox"
          :class="['combobox-input', $computedClass(inputStyles)]"
          :style="{
            flex: '1',
            minWidth: '120px',
            height: '32px',
            padding: getSearchInputPadding(),
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            color: $themeTokens.text,
          }"
          :placeholder="getSearchPlaceholder()"
          :aria-label="comboboxAriaLabel"
          :aria-expanded="isDropdownOpen.toString()"
          :aria-controls="listboxId"
          :aria-activedescendant="getActiveDescendant()"
          :aria-describedby="ariaDescribedById"
          :aria-autocomplete="autocomplete ? 'list' : 'none'"
          :aria-required="required ? 'true' : 'false'"
          :aria-invalid="invalid ? 'true' : 'false'"
          :disabled="disabled"
          :readonly="!autocomplete"
          @input="handleInput"
          @keydown="handleComboboxKeydown"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          @click="handleInputClick"
        >

        <!-- Clear Search Button -->
        <KIconButton
          v-if="searchText && autocomplete"
          size="small"
          icon="clear"
          class="clear-search-button"
          :style="{
            position: 'absolute',
            right: '32px',
            top: '50%',
            transform: 'translateY(-50%)',
            flexShrink: 0,
          }"
          :ariaLabel="clearSearchMessage"
          :title="clearSearchMessage"
          @click="clearSearch"
        />

        <!-- Dropdown Toggle Button -->
        <KIconButton
          size="small"
          :icon="isDropdownOpen ? 'chevronUp' : 'chevronDown'"
          class="dropdown-toggle"
          :style="{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            flexShrink: 0,
          }"
          :ariaLabel="getToggleDropdownLabel()"
          :title="getToggleDropdownLabel()"
          :aria-expanded="isDropdownOpen.toString()"
          @click="toggleDropdown"
          @mousedown.prevent
        />
      </div>

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
  import {themeTokens } from './styles/theme';
  import useKLiveRegion from './composables/useKLiveRegion';
  import useKMultiSelectPills from './composables/useKMultiSelectPills';
  import useKMultiSelectList from './composables/useKMultiSelectList';
  import useKMultiSelectHighlighting from './composables/useKMultiSelectHighlighting';
  import useKMultiSelectKeyboard from './composables/useKMultiSelectKeyboard';
  import useKMultiSelectDropdown from './composables/useKMultiSelectDropdown';

  export default {
    name: 'KMultiSelect',
    setup(props, { emit }) {
      const { autocomplete } = toRefs(props);
      const { sendPoliteMessage } = useKLiveRegion();

      // Initialize reactive variables first
      const searchText = ref('');
      const isDropdownOpen = ref(false);
      const focusedOption = ref(null);
      const focusedIndex = ref(-1);
      const isSelectAllFocused = ref(false);
      const inputFocused = ref(false);
      const comboboxContainer = ref(null);
      const dropdownContainer = ref(null);
      const optionRefs = ref([]);
      const isClient = ref(false);
      const isInsideComponent = ref(false); // Track if focus is within component
      const isKeyboardNavigating = ref(false);

      const {
        selectedOptionsData,
        deselectOption,
        clearAll,
        getClearPillLabel,
        clearAllMessage,
      } = useKMultiSelectPills(props, emit);

      // Use the list composable
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

      // Use the highlighting composable
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

      const comboboxAriaLabel = computed(() => {
        const baseLabel = autocomplete.value ?
          props.searchLabel : props.placeholder;
        const selectedCount = selectedOptions.value.length;
        if (selectedCount > 0) {
          const optionText = selectedCount === 1 ? 'option' : 'options';
          return `${baseLabel}, ${selectedCount} ${optionText} selected`;
        }
        return baseLabel;
      });

      const selectedOptions = computed({
        get() { return props.value; },
        set(newValue) { emit('input', newValue); },
      });

      // Explicitly reference options prop to satisfy ESLint
      const optionsCount = computed(() => props.options.length);

      // Define required functions before composables
      function resetFocusState() {
        focusedIndex.value = -1;
        focusedOption.value = null;
        isSelectAllFocused.value = false;
        isKeyboardNavigating.value = false;
      }

      function setFocusedOption(option) {
        focusedOption.value = option;
        focusedIndex.value = displayedOptions.value.findIndex(
          opt => opt.id === option.id
        );
        isSelectAllFocused.value = false;
        isInsideComponent.value = true;
      }

      function setFocusedSelectAll() {
        isSelectAllFocused.value = true;
        focusedOption.value = null;
        focusedIndex.value = -1;
        isInsideComponent.value = true;
      }

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
        instance.proxy.$refs.comboboxInput.focus();
        sendPoliteMessage('Search cleared');
      }

      function handleInput(event) {
        if (autocomplete.value) {
          searchText.value = event.target.value;
          if (!isDropdownOpen.value) {
            isDropdownOpen.value = true;
          }
          resetFocusState();
          sendPoliteMessage(getSearchResultsMessage(displayedOptions.value.length));
        } else {
          event.preventDefault();
          searchText.value = '';
        }
      }

      function handleInputFocus() {
        inputFocused.value = true;
        isInsideComponent.value = true;

        const selectedCount = selectedOptions.value.length;
        if (selectedCount > 0) {
          const optionText = selectedCount === 1 ? 'option' : 'options';
          sendPoliteMessage(`Search field focused, ${selectedCount} ${optionText} selected`);
        } else {
          sendPoliteMessage('Search field focused');
        }
      }

      function handleInputBlur() {
        inputFocused.value = false;

        // Only close dropdown if focus is moving completely outside the component
        setTimeout(() => {
          const activeElement = document.activeElement;
          const isStillInComponent = comboboxContainer.value &&
            comboboxContainer.value.contains(activeElement);

          if (!isStillInComponent) {
            isInsideComponent.value = false;
            closeDropdown();
          }
        }, 50); // Reduced timeout for better responsiveness
      }

      function handleInputClick() {
        if (!isDropdownOpen.value) {
          openDropdown();
        }
      }

      // Use the dropdown composable
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

      // Use the keyboard composable
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





      // FIXED: Enhanced styling functions - only show blue highlight during keyboard navigation
      function getOptionBackgroundColor(option) {
        const isFocused = focusedOption.value?.id === option.id;
        const isSelected = isOptionSelected(option);

        // Only show blue highlight if keyboard navigating AND focused
        if (isFocused && isKeyboardNavigating.value) {
          return isSelected ?
            `${themeTokens().primary}30` : // Lighter blue for focused selected
            `${themeTokens().primary}20`; // Light blue for focused
        }
        return 'transparent';
      }

      function getOptionOutline(option) {
        const isFocused = focusedOption.value?.id === option.id;
        return (isFocused && isKeyboardNavigating.value) ? `2px solid ${themeTokens().primary}` : 'none';
      }

      function getOptionOutlineOffset(option) {
        const isFocused = focusedOption.value?.id === option.id;
        return (isFocused && isKeyboardNavigating.value) ? '-2px' : '0';
      }


      function getSelectAllBackgroundColor() {
        if (isSelectAllFocused.value && isKeyboardNavigating.value) {
          return `${themeTokens().primary}20`; // Light blue for focused
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

        return {
          ':hover': { backgroundColor: `${themeTokens().primary}15` },
          ':not(:last-child)': {
            borderBottom: `1px solid ${themeTokens().fineLine}`
          },
          ...(isSelected ? { fontWeight: 'bold' } : {})
        };
      }

      function getSelectAllStyles() {
        return {
          ':hover': { backgroundColor: `${themeTokens().primary}15` },
        };
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

      const inputStyles = computed(() => ({
        '::placeholder': { color: themeTokens().annotation }
      }));

      const noResultsMessage = computed(() =>
        autocomplete.value ? 'No results found' : 'No options available'
      );

      const clearSearchMessage = 'Clear search';



      return {
        searchText, isDropdownOpen, focusedOption, focusedIndex,
        isSelectAllFocused, inputFocused, selectedOptions, selectedOptionsData,
        displayedOptions, filteredOptions, allOptionsSelected, someOptionsSelected, showSelectAll,
        comboboxContainer, dropdownContainer, optionRefs, listboxId,
        ariaDescribedById, comboboxAriaLabel, inputStyles, uid,
        isKeyboardNavigating,
        handleInput, handleInputFocus, handleInputBlur,
        handleInputClick, toggleDropdown, isOptionSelected, toggleOption,
        selectAll, clearSearch, setFocusedOption,
        setFocusedSelectAll, getElementOptionId, getOptionStyles,
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
        // Highlighting composable functions
        shouldHighlight, getHighlightedSegments, getSearchResultsMessage,
        shouldHighlightText, getSearchPlaceholder, getSearchInputPadding,
        // Keyboard composable functions
        handleComboboxKeydown, handleListKeydown, navigateDown, navigateUp, setInitialFocus,
        // Dropdown composable functions
        openDropdown, closeDropdown,handleClickOutside,
        getDropdownStyles, getDropdownContainerStyles, getInputWrapperStyles,
        isDropdownVisible, getToggleDropdownLabel, getToggleDropdownIcon,
        getDropdownAriaAttributes, getDropdownListAriaAttributes,
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

.combobox-input:focus {
  outline: 2px solid var(--primary);
  outline-offset: -2px;
}

/* Additional readonly input styling */
.combobox-input[readonly] {
  cursor: pointer;
  background-color: transparent;
}

.combobox-input[readonly]:focus {
  outline: 2px solid var(--primary);
  outline-offset: -2px;
}

.dropdown-container {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pill {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.dropdown-list li {
  user-select: none;
  transition: background-color 0.15s ease, outline 0.15s ease;
}

.input-wrapper {
  min-height: 40px !important;
}

/* Enhanced focus styles - These styles are now handled dynamically in JS */
.dropdown-list li:hover {
  background-color: var(--hover-background);
}

/* Fallback focus styles for accessibility */
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
