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

  function openDropdown() {
    isDropdownOpen.value = true;
    if (!props.autocomplete) {
      searchText.value = '';
    }
  }

  function closeDropdown() {
    isDropdownOpen.value = false;
    resetFocusState();
    if (!props.autocomplete) {
      searchText.value = '';
    }
  }

  function toggleDropdown() {
    if (isDropdownOpen.value) {
      closeDropdown();
      nextTick(() => {
        instance.proxy.$refs.comboboxInput.focus();
      });
    } else {
      openDropdown();
    }
  }

  function handleClickOutside(event) {
    if (state.comboboxContainer.value &&
      !state.comboboxContainer.value.contains(event.target)) {
      state.isInsideComponent.value = false;
      closeDropdown();
    }
  }

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

  function getDropdownContainerStyles() {
    return {
      position: 'relative',
      border: `1px solid var(--fine-line)`,
      borderRadius: '4px',
    };
  }

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

  function isDropdownVisible() {
    return isDropdownOpen.value;
  }

  function getToggleDropdownLabel() {
    return isDropdownOpen.value ?
      'Close options list' : 'Open options list';
  }

  function getToggleDropdownIcon() {
    return isDropdownOpen.value ? 'chevronUp' : 'chevronDown';
  }

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

  function getDropdownListAriaAttributes() {
    return {
      'aria-multiselectable': 'true',
      'aria-labelledby': props.ariaLabelledby,
      'aria-describedby': state.ariaDescribedById,
    };
  }

  return {
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
  };
}
