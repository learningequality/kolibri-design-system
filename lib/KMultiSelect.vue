<template>

  <div class="autocomplete-multiselect">
    <!-- Selected Pills Container -->
    <div
      v-if="selectedOptions && selectedOptions.length"
      class="pills-container"
      :style="{
        borderBottom: `1px solid ${$themeTokens.fineLine}`,
        padding: '8px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        alignItems: 'center',
      }"
      role="region"
      :aria-label="`${selectedOptions.length} options selected`"
    >
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
        }"
        role="listitem"
      >
        <span>{{ option.label }}</span>
        <KIconButton
          size="small"
          icon="clear"
          :ariaLabel="getClearPillLabel(option.label)"
          @click="deselectOption(option)"
          @keydown="handlePillButtonKeydown($event, option, index)"
        />
      </div>

      <!-- Clear All Button -->
      <KIconButton
        size="small"
        icon="clear"
        :ariaLabel="clearAllMessage"
        class="clear-all-button"
        @click="clearAll"
      />
    </div>

    <!-- Combobox Input -->
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
        }"
      >
        <KIcon
          v-if="autocomplete"
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

        <input
          ref="comboboxInput"
          v-model.trim="searchText"
          type="text"
          role="combobox"
          :class="['combobox-input', $computedClass(inputStyles)]"
          :style="{
            width: '100%',
            height: '40px',
            padding: autocomplete ? '0 40px 0 40px' : '0 40px 0 12px',
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            color: $themeTokens.text,
          }"
          :placeholder="placeholder"
          :aria-label="comboboxAriaLabel"
          :aria-expanded="isDropdownOpen.toString()"
          :aria-controls="listboxId"
          :aria-activedescendant="getActiveDescendant()"
          :aria-describedby="ariaDescribedById"
          :aria-autocomplete="autocomplete ? 'list' : 'none'"
          :aria-required="required ? 'true' : 'false'"
          :aria-invalid="invalid ? 'true' : 'false'"
          :disabled="disabled"
          @input="handleInput"
          @keydown="handleComboboxKeydown"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          @click="handleInputClick"
        >

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
          }"
          :ariaLabel="clearSearchMessage"
          @click="clearSearch"
        />

        <KIconButton
          size="small"
          :icon="isDropdownOpen ? 'chevronUp' : 'chevronDown'"
          class="dropdown-toggle"
          :style="{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
          }"
          :ariaLabel="getToggleDropdownLabel()"
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
        :aria-live="autocomplete ? 'polite' : 'off'"
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
        >
          <!-- Select All Option -->
          <li
            v-if="showSelectAll"
            :id="`select-all-${uid}`"
            role="option"
            :class="$computedClass(getSelectAllStyles())"
            :aria-selected="false"
            :style="{
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '40px',
              borderBottom: `1px solid ${$themeTokens.fineLine}`,
              fontWeight: 'bold',
              backgroundColor: isSelectAllFocused ? $themeTokens.primary + '20' : 'transparent',
              outline: isSelectAllFocused ? `2px solid ${$themeTokens.primary}` : 'none',
              outlineOffset: isSelectAllFocused ? '-2px' : '0',
            }"
            :tabindex="isSelectAllFocused ? 0 : -1"
            @click.stop="selectAll"
            @mouseenter="setFocusedSelectAll"
            @keydown="handleOptionKeydown($event, null, -1)"
            @focus="setFocusedSelectAll"
            @mousedown.prevent
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
            v-for="(option, index) in filteredOptions"
            :id="getElementOptionId(option)"
            :key="option.id"
            :ref="el => { if (el) optionRefs[index] = el }"
            role="option"
            :class="$computedClass(getOptionStyles(option))"
            :aria-selected="isOptionSelected(option).toString()"
            :aria-setsize="filteredOptions.length"
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
            @click.stop="toggleOption(option)"
            @mouseenter="setFocusedOption(option)"
            @keydown="handleOptionKeydown($event, option, index)"
            @focus="setFocusedOption(option)"
            @mousedown.prevent
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
              <template v-if="shouldHighlight(option.label)">
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
          v-if="!filteredOptions.length"
          role="status"
          class="no-options"
          :style="{
            padding: '12px',
            margin: '0',
            textAlign: 'center',
            color: $themeTokens.annotation,
          }"
          aria-live="polite"
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
    nextTick,
    onMounted,
    onUnmounted
  } from 'vue';
  import uniq from 'lodash/uniq';
  import {themeTokens } from './styles/theme';
  import useKLiveRegion from './composables/useKLiveRegion';

  export default {
    name: 'KMultiSelect',
    setup(props, { emit }) {
      const { options, autocomplete } = toRefs(props);
      const { sendPoliteMessage } = useKLiveRegion();

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

      const selectedOptionsData = computed(() => {
        return options.value.filter(option =>
          selectedOptions.value.includes(option.id)
        );
      });

      const filteredOptions = computed(() => {
        if (!autocomplete.value || !searchText.value) return options.value;

        const query = searchText.value.toLowerCase();
        return options.value.filter(option =>
          option.label.toLowerCase().includes(query)
        );
      });

      const showSelectAll = computed(() => {
        return filteredOptions.value.length > 1;
      });

      const allOptionsSelected = computed(() => {
        return filteredOptions.value.length > 0 &&
          filteredOptions.value.every(option =>
            selectedOptions.value.includes(option.id)
          );
      });

      const someOptionsSelected = computed(() => {
        return filteredOptions.value.some(option =>
          selectedOptions.value.includes(option.id)
        );
      });

      // Enhanced styling functions for better visual feedback
      function getOptionBackgroundColor(option) {
        const isFocused = focusedOption.value?.id === option.id;
        const isSelected = isOptionSelected(option);

        if (isFocused) {
          return isSelected ?
            `${themeTokens().primary}30` : // Lighter blue for focused selected
            `${themeTokens().primary}20`; // Light blue for focused
        }
        return 'transparent';
      }

      function getOptionOutline(option) {
        const isFocused = focusedOption.value?.id === option.id;
        return isFocused ? `2px solid ${themeTokens().primary}` : 'none';
      }

      function getOptionOutlineOffset(option) {
        const isFocused = focusedOption.value?.id === option.id;
        return isFocused ? '-2px' : '0';
      }

      // Safe highlighting function that returns text segments
      function shouldHighlight(text) {
        return autocomplete.value && searchText.value && text;
      }

      function getHighlightedSegments(text, query) {
        if (!shouldHighlight(text) || !query) {
          return [{ text, highlight: false }];
        }

        // Escape special regex characters in the query
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedQuery})`, 'gi');

        const segments = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
          // Add text before the match
          if (match.index > lastIndex) {
            segments.push({
              text: text.substring(lastIndex, match.index),
              highlight: false
            });
          }

          // Add the highlighted match
          segments.push({
            text: match[1],
            highlight: true
          });

          lastIndex = match.index + match[1].length;
        }

        // Add remaining text after the last match
        if (lastIndex < text.length) {
          segments.push({
            text: text.substring(lastIndex),
            highlight: false
          });
        }

        return segments;
      }

      function getActiveDescendant() {
        if (isSelectAllFocused.value) {
          return `select-all-${uid}`;
        }
        return focusedOption.value ? getElementOptionId(focusedOption.value) : null;
      }

      // Handle keydown on pill close buttons
      function handlePillButtonKeydown(event, option, index) {
        const { key } = event;
        if (key === 'Enter' || key === ' ') {
          event.preventDefault();
          deselectOption(option);
        } else if (key === 'ArrowLeft') {
          event.preventDefault();
          // Move to previous pill button or input
          const pillButtons = document.querySelectorAll('.pill .k-icon-button');
          if (index > 0) {
            pillButtons[index - 1].focus();
          } else {
            instance.proxy.$refs.comboboxInput.focus();
          }
        } else if (key === 'ArrowRight') {
          event.preventDefault();
          // Move to next pill button or clear all button
          const pillButtons = document.querySelectorAll('.pill .k-icon-button');
          if (index < pillButtons.length - 1) {
            pillButtons[index + 1].focus();
          } else {
            document.querySelector('.clear-all-button').focus();
          }
        }
      }

      // Improved option keydown handling
      function handleOptionKeydown(event, option) {
        const { key } = event;

        switch (key) {
          case 'Enter':
          case ' ':
            event.preventDefault();
            if (option) {
              toggleOption(option);
            } else {
              selectAll();
            }
            break;

          case 'ArrowDown':
            event.preventDefault();
            navigateDown();
            focusCurrentOption();
            break;

          case 'ArrowUp':
            event.preventDefault();
            navigateUp();
            focusCurrentOption();
            break;

          case 'Escape':
            event.preventDefault();
            closeDropdown();
            instance.proxy.$refs.comboboxInput.focus();
            break;
        }
      }

      function focusCurrentOption() {
        nextTick(() => {
          if (isSelectAllFocused.value) {
            const selectAllElement = document.getElementById(`select-all-${uid}`);
            if (selectAllElement) {
              selectAllElement.focus();
            }
          } else if (focusedOption.value) {
            const optionElement = document.getElementById(getElementOptionId(focusedOption.value));
            if (optionElement) {
              optionElement.focus();
            }
          }
        });
      }

      function handleInput(event) {
        if (autocomplete.value) {
          searchText.value = event.target.value;
          if (!isDropdownOpen.value) {
            isDropdownOpen.value = true;
          }
          // Reset focus state when searching
          resetFocusState();
          sendPoliteMessage(`${filteredOptions.value.length} options available`);
        }
      }

      function resetFocusState() {
        focusedIndex.value = -1;
        focusedOption.value = null;
        isSelectAllFocused.value = false;
      }

      function handleInputFocus() {
        inputFocused.value = true;
        isInsideComponent.value = true;
      }

      // Improved blur handling - less aggressive
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

      function openDropdown() {
        isDropdownOpen.value = true;
        nextTick(() => {
          setInitialFocus();
        });
      }

      function setInitialFocus() {
        if (showSelectAll.value) {
          isSelectAllFocused.value = true;
          focusedIndex.value = -1;
          focusedOption.value = null;
        } else if (filteredOptions.value.length > 0) {
          focusedIndex.value = 0;
          focusedOption.value = filteredOptions.value[0];
          isSelectAllFocused.value = false;
        }
      }

      function closeDropdown() {
        isDropdownOpen.value = false;
        resetFocusState();
      }

      // Improved toggle dropdown function
      function toggleDropdown() {
        if (isDropdownOpen.value) {
          closeDropdown();
          // Return focus to input after closing
          nextTick(() => {
            instance.proxy.$refs.comboboxInput.focus();
          });
        } else {
          openDropdown();
        }
      }

      function isOptionSelected(option) {
        return selectedOptions.value.includes(option.id);
      }

      function toggleOption(option) {
        if (!option) return;
        const wasSelected = isOptionSelected(option);

        if (wasSelected) {
          selectedOptions.value = selectedOptions.value.filter(
            id => id !== option.id
          );
          sendPoliteMessage(`${option.label} deselected`);
        } else {
          selectedOptions.value = uniq([...selectedOptions.value, option.id]);
          sendPoliteMessage(`${option.label} selected`);
        }

        // Keep dropdown open and maintain focus - improved focus retention
        nextTick(() => {
          // Ensure the option remains visually focused
          if (focusedOption.value?.id === option.id) {
            const optionElement = document.getElementById(getElementOptionId(option));
            if (optionElement) {
              // Don't actually focus, just ensure visual state is maintained
              // This prevents the selection from disappearing
            }
          }
        });
      }

      function selectAll() {
        if (allOptionsSelected.value) {
          const filteredIds = filteredOptions.value.map(opt => opt.id);
          selectedOptions.value = selectedOptions.value.filter(id =>
            !filteredIds.includes(id)
          );
          sendPoliteMessage('All options deselected');
        } else {
          const filteredIds = filteredOptions.value.map(opt => opt.id);
          selectedOptions.value = uniq([
            ...selectedOptions.value,
            ...filteredIds
          ]);
          sendPoliteMessage('All options selected');
        }

        // Keep dropdown open and maintain focus
        nextTick(() => {
          if (isSelectAllFocused.value) {
            const selectAllElement = document.getElementById(`select-all-${uid}`);
            if (selectAllElement) {
              // Maintain visual focus state
            }
          }
        });
      }

      function deselectOption(option) {
        selectedOptions.value = selectedOptions.value.filter(
          id => id !== option.id
        );
        sendPoliteMessage(`${option.label} removed`);
      }

      function clearAll() {
        const count = selectedOptions.value.length;
        selectedOptions.value = [];
        sendPoliteMessage(`${count} selections cleared`);
      }

      function clearSearch() {
        searchText.value = '';
        instance.proxy.$refs.comboboxInput.focus();
      }

      function setFocusedOption(option) {
        focusedOption.value = option;
        focusedIndex.value = filteredOptions.value.findIndex(
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

      function handleComboboxKeydown(event) {
        const { key } = event;

        switch (key) {
          case 'ArrowDown':
            event.preventDefault();
            if (!isDropdownOpen.value) {
              openDropdown();
            } else {
              navigateDown();
              focusCurrentOption();
            }
            break;

          case 'ArrowUp':
            event.preventDefault();
            if (!isDropdownOpen.value) {
              openDropdown();
              // Focus last item when opening with arrow up
              nextTick(() => {
                if (filteredOptions.value.length > 0) {
                  focusedIndex.value = filteredOptions.value.length - 1;
                  focusedOption.value = filteredOptions.value[filteredOptions.value.length - 1];
                  isSelectAllFocused.value = false;
                  focusCurrentOption();
                }
              });
            } else {
              navigateUp();
              focusCurrentOption();
            }
            break;

          case 'Tab':
            if (isDropdownOpen.value) {
              // Move focus into dropdown
              event.preventDefault();
              nextTick(() => {
                if (isSelectAllFocused.value) {
                  const selectAllElement = document.getElementById(`select-all-${uid}`);
                  if (selectAllElement) {
                    selectAllElement.focus();
                  }
                } else if (focusedOption.value) {
                  const optionElement =
                    document.getElementById(getElementOptionId(focusedOption.value));
                  if (optionElement) {
                    optionElement.focus();
                  }
                }
              });
            }
            break;

          case 'Enter':
          case ' ':
            event.preventDefault();
            if (isDropdownOpen.value) {
              if (isSelectAllFocused.value) {
                selectAll();
              } else if (focusedOption.value) {
                toggleOption(focusedOption.value);
              }
            } else {
              openDropdown();
            }
            break;

          case 'Escape':
            event.preventDefault();
            if (isDropdownOpen.value) {
              closeDropdown();
            } else if (searchText.value) {
              searchText.value = '';
            }
            break;
        }
      }

      function navigateDown() {
        if (isSelectAllFocused.value) {
          if (filteredOptions.value.length > 0) {
            isSelectAllFocused.value = false;
            focusedIndex.value = 0;
            focusedOption.value = filteredOptions.value[0];
          }
        } else if (focusedIndex.value < filteredOptions.value.length - 1) {
          focusedIndex.value++;
          focusedOption.value = filteredOptions.value[focusedIndex.value];
        } else if (showSelectAll.value) {
          // Wrap to select all
          isSelectAllFocused.value = true;
          focusedIndex.value = -1;
          focusedOption.value = null;
        } else if (filteredOptions.value.length > 0) {
          // Wrap to first option
          focusedIndex.value = 0;
          focusedOption.value = filteredOptions.value[0];
        }
      }

      function navigateUp() {
        if (isSelectAllFocused.value) {
          if (filteredOptions.value.length > 0) {
            isSelectAllFocused.value = false;
            focusedIndex.value = filteredOptions.value.length - 1;
            focusedOption.value = filteredOptions.value[filteredOptions.value.length - 1];
          }
        } else if (focusedIndex.value > 0) {
          focusedIndex.value--;
          focusedOption.value = filteredOptions.value[focusedIndex.value];
        } else if (showSelectAll.value) {
          // Wrap to select all
          isSelectAllFocused.value = true;
          focusedIndex.value = -1;
          focusedOption.value = null;
        } else if (filteredOptions.value.length > 0) {
          // Wrap to last option
          focusedIndex.value = filteredOptions.value.length - 1;
          focusedOption.value = filteredOptions.value[filteredOptions.value.length - 1];
        }
      }

      // Improved click outside handling
      function handleClickOutside(event) {
        if (comboboxContainer.value &&
          !comboboxContainer.value.contains(event.target)) {
          isInsideComponent.value = false;
          closeDropdown();
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

      const inputStyles = computed(() => ({
        '::placeholder': { color: themeTokens().annotation }
      }));

      const noResultsMessage = computed(() =>
        autocomplete.value ? 'No results found' : 'No options available'
      );

      const clearSearchMessage = 'Clear search';
      const clearAllMessage = 'Clear all selections';

      function getClearPillLabel(label) {
        return `Remove ${label} from selection`;
      }

      function getToggleDropdownLabel() {
        return isDropdownOpen.value ?
          'Close options list' : 'Open options list';
      }

      return {
        searchText, isDropdownOpen, focusedOption, focusedIndex,
        isSelectAllFocused, inputFocused, selectedOptions, selectedOptionsData,
        filteredOptions, allOptionsSelected, someOptionsSelected, showSelectAll,
        comboboxContainer, dropdownContainer, optionRefs, listboxId,
        ariaDescribedById, comboboxAriaLabel, inputStyles, uid,
        handleInput, handleInputFocus, handleInputBlur,
        handleInputClick, toggleDropdown, isOptionSelected, toggleOption,
        selectAll, deselectOption, clearAll, clearSearch, setFocusedOption,
        setFocusedSelectAll, getElementOptionId, getOptionStyles,
        getSelectAllStyles, handleComboboxKeydown, getHighlightedSegments,
        handlePillButtonKeydown, handleOptionKeydown, noResultsMessage,
        shouldHighlight, getActiveDescendant, clearSearchMessage, clearAllMessage,
        getClearPillLabel, getToggleDropdownLabel, isClient, resetFocusState,
        setInitialFocus, focusCurrentOption, getOptionBackgroundColor,
        getOptionOutline, getOptionOutlineOffset,
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
      autocomplete: { type: Boolean, default: true },
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

.pills-container {
  min-height: 40px;
}

/* Enhanced focus styles for better visual feedback */
.dropdown-list li:focus {
  outline: 2px solid var(--primary) !important;
  outline-offset: -2px !important;
  background-color: var(--primary-light) !important;
}

.dropdown-list li:hover {
  background-color: var(--hover-background);
}

/* Ensure consistent focus ring appearance */
.dropdown-list li[tabindex="0"] {
  outline: 2px solid var(--primary);
  outline-offset: -2px;
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