import { nextTick } from 'vue';

export default function useKMultiSelectKeyboard(props, emit, state, handlers) {
  const {
    searchText,
    isDropdownOpen,
    focusedOption,
    focusedIndex,
    isSelectAllFocused,
    isKeyboardNavigating,
    displayedOptions,
    showSelectAll,
    instance,
  } = state;

  const { openDropdown, closeDropdown, toggleOption, selectAll, clearSearch } = handlers;

  function navigateDown() {
    isKeyboardNavigating.value = true;

    if (isSelectAllFocused.value) {
      if (displayedOptions.value.length > 0) {
        isSelectAllFocused.value = false;
        focusedIndex.value = 0;
        focusedOption.value = displayedOptions.value[0];
      }
    } else if (focusedIndex.value < displayedOptions.value.length - 1) {
      focusedIndex.value++;
      focusedOption.value = displayedOptions.value[focusedIndex.value];
    } else if (showSelectAll.value) {
      isSelectAllFocused.value = true;
      focusedIndex.value = -1;
      focusedOption.value = null;
    } else if (displayedOptions.value.length > 0) {
      focusedIndex.value = 0;
      focusedOption.value = displayedOptions.value[0];
    }
  }

  function navigateUp() {
    isKeyboardNavigating.value = true;

    if (isSelectAllFocused.value) {
      if (displayedOptions.value.length > 0) {
        isSelectAllFocused.value = false;
        focusedIndex.value = displayedOptions.value.length - 1;
        focusedOption.value = displayedOptions.value[displayedOptions.value.length - 1];
      }
    } else if (focusedIndex.value > 0) {
      focusedIndex.value--;
      focusedOption.value = displayedOptions.value[focusedIndex.value];
    } else if (showSelectAll.value) {
      isSelectAllFocused.value = true;
      focusedIndex.value = -1;
      focusedOption.value = null;
    } else if (displayedOptions.value.length > 0) {
      focusedIndex.value = displayedOptions.value.length - 1;
      focusedOption.value = displayedOptions.value[displayedOptions.value.length - 1];
    }
  }

  function setInitialFocus() {
    isKeyboardNavigating.value = true;

    if (showSelectAll.value) {
      isSelectAllFocused.value = true;
      focusedIndex.value = -1;
      focusedOption.value = null;
    } else if (displayedOptions.value.length > 0) {
      focusedIndex.value = 0;
      focusedOption.value = displayedOptions.value[0];
      isSelectAllFocused.value = false;
    }
  }

  function handleComboboxKeydown(event) {
    const { key } = event;

    if (
      !props.autocomplete &&
      key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      event.preventDefault();
      return;
    }

    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        isKeyboardNavigating.value = true;
        if (!isDropdownOpen.value) {
          openDropdown();
          nextTick(() => {
            setInitialFocus();
          });
        } else {
          navigateDown();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        isKeyboardNavigating.value = true;
        if (!isDropdownOpen.value) {
          openDropdown();
          nextTick(() => {
            if (displayedOptions.value.length > 0) {
              focusedIndex.value = displayedOptions.value.length - 1;
              focusedOption.value = displayedOptions.value[displayedOptions.value.length - 1];
              isSelectAllFocused.value = false;
            }
          });
        } else {
          navigateUp();
        }
        break;

      case 'Tab':
        if (isDropdownOpen.value) {
          // Allow natural tab behavior to move focus into dropdown
        }
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        isKeyboardNavigating.value = true;
        if (isDropdownOpen.value) {
          if (isSelectAllFocused.value) {
            selectAll();
          } else if (focusedOption.value) {
            toggleOption(focusedOption.value);
          }
        } else {
          openDropdown();
          nextTick(() => {
            setInitialFocus();
          });
        }
        break;

      case 'Escape':
        event.preventDefault();
        if (isDropdownOpen.value) {
          closeDropdown();
        } else if (props.autocomplete && searchText.value) {
          clearSearch();
        }
        break;
    }
  }

  function handleListKeydown(event) {
    const { key, target } = event;

    isKeyboardNavigating.value = true;

    const optionType = target.dataset?.optionType;
    const optionId = target.dataset?.optionId;

    const option =
      optionType === 'regular' ? displayedOptions.value.find(opt => opt.id === optionId) : null;

    switch (key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (optionType === 'select-all') {
          selectAll();
        } else if (option) {
          toggleOption(option);
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        navigateDown();
        break;

      case 'ArrowUp':
        event.preventDefault();
        navigateUp();
        break;

      case 'Escape':
        event.preventDefault();
        closeDropdown();
        instance.proxy.$refs.comboboxInput.focus();
        break;

      case 'Tab':
        break;
    }
  }

  function handlePillButtonKeydown(event, option, index, deselectOption) {
    const { key } = event;
    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      deselectOption(option);
    } else if (key === 'ArrowLeft') {
      event.preventDefault();
      const pillButtons = document.querySelectorAll('.pill .k-icon-button');
      if (index > 0) {
        pillButtons[index - 1].focus();
      } else {
        const input = document.querySelector('.combobox-input');
        if (input) input.focus();
      }
    } else if (key === 'ArrowRight') {
      event.preventDefault();
      const pillButtons = document.querySelectorAll('.pill .k-icon-button');
      if (index < pillButtons.length - 1) {
        pillButtons[index + 1].focus();
      } else {
        const clearAllButton = document.querySelector('.clear-all-button');
        if (clearAllButton) {
          clearAllButton.focus();
        }
      }
    }
  }

  return {
    navigateDown,
    navigateUp,
    setInitialFocus,
    handleComboboxKeydown,
    handleListKeydown,
    handlePillButtonKeydown,
  };
}
