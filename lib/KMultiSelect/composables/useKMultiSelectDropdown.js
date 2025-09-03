import { nextTick } from 'vue';

export default function useKMultiSelectDropdown(props, emit, state, handlers) {
  const {
    isDropdownOpen,
    searchText,
    instance
  } = state;

  const {
    resetFocusState
  } = handlers;

  // Dropdown state management
  function openDropdown() {
    isDropdownOpen.value = true;
    if (!props.autocomplete) {
      searchText.value = '';
    }
    // FIXED: Don't automatically focus on select all when opening dropdown via click
    // Only set initial focus during keyboard navigation
  }

  function closeDropdown() {
    isDropdownOpen.value = false;
    resetFocusState();
    // Clear search text when autocomplete is disabled
    if (!props.autocomplete) {
      searchText.value = '';
    }
  }

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

  // Click outside handling
  function handleClickOutside(event) {
    if (state.comboboxContainer.value &&
      !state.comboboxContainer.value.contains(event.target)) {
      state.isInsideComponent.value = false;
      closeDropdown();
    }
  }

  // Dropdown positioning and styling
  function getDropdownStyles() {
    return {
      position: 'absolute',
      top: '100%',
      left: '0',
      right: '0',
      zIndex: '1000',
      backgroundColor: 'var(--surface)',
      border: '1px solid var(--fine-line)',
      borderTop: 'none',
      borderRadius: '0 0 4px 4px',
      maxHeight: '400px',
      overflowY: 'auto',
    };
  }

  // Dropdown container styles
  function getDropdownContainerStyles() {
    return {
      position: 'relative',
      border: `1px solid var(--fine-line)`,
      borderRadius: '4px',
    };
  }

  // Input wrapper styles
  function getInputWrapperStyles() {
    return {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      minHeight: '40px',
      padding: '4px',
      gap: '4px'
    };
  }

  // Dropdown visibility management
  function isDropdownVisible() {
    return isDropdownOpen.value;
  }

  // Dropdown toggle label
  function getToggleDropdownLabel() {
    return isDropdownOpen.value ?
      'Close options list' : 'Open options list';
  }

  // Dropdown toggle icon
  function getToggleDropdownIcon() {
    return isDropdownOpen.value ? 'chevronUp' : 'chevronDown';
  }

  // Dropdown accessibility attributes
  function getDropdownAriaAttributes() {
    return {
      'aria-expanded': isDropdownOpen.value.toString(),
      'aria-controls': state.listboxId,
      'aria-activedescendant': state.getActiveDescendant(),
      'aria-describedby': state.ariaDescribedById,
      'aria-autocomplete': props.autocomplete ? 'list' : 'none',
      'aria-required': props.required ? 'true' : 'false',
      'aria-invalid': props.invalid ? 'true' : 'false',
    };
  }

  // Dropdown list accessibility attributes
  function getDropdownListAriaAttributes() {
    return {
      'aria-multiselectable': 'true',
      'aria-labelledby': props.ariaLabelledby,
      'aria-describedby': state.ariaDescribedById,
    };
  }

  return {
    // State management
    openDropdown,
    closeDropdown,
    toggleDropdown,
    handleClickOutside,

    // Styling
    getDropdownStyles,
    getDropdownContainerStyles,
    getInputWrapperStyles,

    // Visibility
    isDropdownVisible,

    // Accessibility
    getToggleDropdownLabel,
    getToggleDropdownIcon,
    getDropdownAriaAttributes,
    getDropdownListAriaAttributes,
  };
}
