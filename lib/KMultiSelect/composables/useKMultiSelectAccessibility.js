import { computed } from 'vue';
import useKLiveRegion from '../../composables/useKLiveRegion';

export default function useKMultiSelectAccessibility(props, emit, state, handlers) {
  const { sendPoliteMessage } = useKLiveRegion();

  const {
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
  } = state;

  const { getActiveDescendant } = handlers;

  // Accessibility computed properties
  const comboboxAriaLabel = computed(() => {
    const baseLabel = props.autocomplete ? props.searchLabel : props.placeholder;
    const selectedCount = selectedOptions.value.length;
    if (selectedCount > 0) {
      const optionText = selectedCount === 1 ? 'option' : 'options';
      return `${baseLabel}, ${selectedCount} ${optionText} selected`;
    }
    return baseLabel;
  });

  const comboboxAriaAttributes = computed(() => ({
    'aria-expanded': isDropdownOpen.value.toString(),
    'aria-controls': listboxId,
    'aria-activedescendant': getActiveDescendant(),
    'aria-describedby': ariaDescribedById,
    'aria-autocomplete': props.autocomplete ? 'list' : 'none',
    'aria-required': props.required ? 'true' : 'false',
    'aria-invalid': props.invalid ? 'true' : 'false',
    'aria-labelledby': props.ariaLabelledby,
    'aria-multiselectable': 'true',
  }));

  const listboxAriaAttributes = computed(() => ({
    'aria-multiselectable': 'true',
    'aria-labelledby': props.ariaLabelledby,
    'aria-describedby': ariaDescribedById,
    'aria-activedescendant': getActiveDescendant(),
  }));

  const optionAriaAttributes = computed(() => option => ({
    'aria-selected': handlers.isOptionSelected(option).toString(),
    'aria-posinset': (displayedOptions.value.findIndex(opt => opt.id === option.id) + 1).toString(),
    'aria-setsize': displayedOptions.value.length.toString(),
  }));

  const selectAllAriaAttributes = computed(() => ({
    'aria-selected': handlers.allOptionsSelected.value.toString(),
    'aria-posinset': '1',
    'aria-setsize': (displayedOptions.value.length + (showSelectAll.value ? 1 : 0)).toString(),
  }));

  // Accessibility messaging functions
  function announceOptionSelection(option, wasSelected) {
    const action = wasSelected ? 'selected' : 'deselected';
    sendPoliteMessage(`${option.label} ${action}`);
  }

  function announceSelectAll(wasSelected) {
    const action = wasSelected ? 'selected' : 'deselected';
    sendPoliteMessage(`All options ${action}`);
  }

  function announceSearchResults(count) {
    if (!props.autocomplete) {
      sendPoliteMessage(`${count} options available`);
      return;
    }
    if (searchText.value && searchText.value.length > 0) {
      sendPoliteMessage(`${count} results found`);
    } else {
      sendPoliteMessage(`${count} options available`);
    }
  }

  function announceSearchCleared() {
    sendPoliteMessage('Search cleared');
  }

  function announceInputFocus() {
    const selectedCount = selectedOptions.value.length;
    if (selectedCount > 0) {
      const optionText = selectedCount === 1 ? 'option' : 'options';
      sendPoliteMessage(`Search field focused, ${selectedCount} ${optionText} selected`);
    } else {
      sendPoliteMessage('Search field focused');
    }
  }

  function announceOptionRemoval(option) {
    sendPoliteMessage(`${option.label} removed`);
  }

  function announceAllCleared(count) {
    sendPoliteMessage(`${count} selections cleared`);
  }

  function announceDropdownToggle(isOpen) {
    const action = isOpen ? 'opened' : 'closed';
    sendPoliteMessage(`Options list ${action}`);
  }

  // Focus management for accessibility
  function focusFirstOption() {
    if (displayedOptions.value.length > 0) {
      handlers.setFocusedOption(displayedOptions.value[0]);
      return true;
    }
    return false;
  }

  function focusLastOption() {
    if (displayedOptions.value.length > 0) {
      const lastIndex = displayedOptions.value.length - 1;
      handlers.setFocusedOption(displayedOptions.value[lastIndex]);
      return true;
    }
    return false;
  }

  function focusSelectAll() {
    if (showSelectAll.value) {
      handlers.setFocusedSelectAll();
      return true;
    }
    return false;
  }

  function focusInput() {
    if (state.instance?.proxy?.$refs?.comboboxInput) {
      state.instance.proxy.$refs.comboboxInput.focus();
      return true;
    }
    return false;
  }

  // Keyboard accessibility helpers
  function getNextFocusableElement(currentIndex, direction = 'next') {
    const options = displayedOptions.value;
    const hasSelectAll = showSelectAll.value;

    if (direction === 'next') {
      if (isSelectAllFocused.value) {
        return options.length > 0 ? { type: 'option', index: 0 } : null;
      }
      if (focusedIndex.value < options.length - 1) {
        return { type: 'option', index: focusedIndex.value + 1 };
      }
      if (hasSelectAll) {
        return { type: 'select-all' };
      }
      if (options.length > 0) {
        return { type: 'option', index: 0 };
      }
    } else {
      if (isSelectAllFocused.value) {
        return options.length > 0 ? { type: 'option', index: options.length - 1 } : null;
      }
      if (focusedIndex.value > 0) {
        return { type: 'option', index: focusedIndex.value - 1 };
      }
      if (hasSelectAll) {
        return { type: 'select-all' };
      }
      if (options.length > 0) {
        return { type: 'option', index: options.length - 1 };
      }
    }
    return null;
  }

  // Screen reader specific functions
  function announceCurrentFocus() {
    if (isSelectAllFocused.value) {
      sendPoliteMessage('Select all option focused');
    } else if (focusedOption.value) {
      const isSelected = handlers.isOptionSelected(focusedOption.value);
      const status = isSelected ? 'selected' : 'not selected';
      sendPoliteMessage(`${focusedOption.value.label}, ${status}`);
    }
  }

  function announceOptionCount() {
    const totalOptions = props.options.length;
    const selectedCount = selectedOptions.value.length;
    sendPoliteMessage(`${selectedCount} of ${totalOptions} options selected`);
  }

  // Accessibility validation
  function validateAccessibility() {
    const errors = [];

    if (!props.ariaLabelledby && !props.placeholder && !props.searchLabel) {
      errors.push(
        'Component must have aria-labelledby, placeholder, or searchLabel for accessibility'
      );
    }

    if (props.required && !props.ariaLabelledby) {
      errors.push('Required components should have aria-labelledby for better accessibility');
    }

    return errors;
  }

  return {
    // Computed properties
    comboboxAriaLabel,
    comboboxAriaAttributes,
    listboxAriaAttributes,
    optionAriaAttributes,
    selectAllAriaAttributes,

    // Messaging functions
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

    // Focus management
    focusFirstOption,
    focusLastOption,
    focusSelectAll,
    focusInput,

    // Keyboard helpers
    getNextFocusableElement,

    // Validation
    validateAccessibility,
  };
}
