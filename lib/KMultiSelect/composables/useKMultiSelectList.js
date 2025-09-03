import { computed } from 'vue';
import uniq from 'lodash/uniq';
import useKLiveRegion from '../../composables/useKLiveRegion';

export default function useKMultiSelectList(props, emit, focusHandlers = {}) {
  const { sendPoliteMessage } = useKLiveRegion();

  const {
    setFocusedOption,
    setFocusedSelectAll,
    resetFocusState,
    isKeyboardNavigating,
    searchText,
  } = focusHandlers;

  const displayedOptions = computed(() => {
    if (!props.autocomplete) {
      return props.options;
    }
    if (!searchText?.value) {
      return props.options;
    }
    const query = searchText.value.toLowerCase();
    return props.options.filter(option => option.label.toLowerCase().includes(query));
  });

  const filteredOptions = computed(() => displayedOptions.value);

  const showSelectAll = computed(() => {
    return displayedOptions.value.length > 1;
  });

  const allOptionsSelected = computed(() => {
    return (
      displayedOptions.value.length > 0 &&
      displayedOptions.value.every(option => props.value.includes(option.id))
    );
  });

  const someOptionsSelected = computed(() => {
    return displayedOptions.value.some(option => props.value.includes(option.id));
  });

  function isOptionSelected(option) {
    return props.value.includes(option.id);
  }

  function toggleOption(option) {
    if (!option) return;
    const wasSelected = isOptionSelected(option);

    if (wasSelected) {
      const newValue = props.value.filter(id => id !== option.id);
      emit('input', newValue);
      sendPoliteMessage(`${option.label} deselected`);
    } else {
      const newValue = uniq([...props.value, option.id]);
      emit('input', newValue);
      sendPoliteMessage(`${option.label} selected`);
    }
  }

  function selectAll() {
    if (allOptionsSelected.value) {
      const displayedIds = displayedOptions.value.map(opt => opt.id);
      const newValue = props.value.filter(id => !displayedIds.includes(id));
      emit('input', newValue);
      sendPoliteMessage('All options deselected');
    } else {
      const displayedIds = displayedOptions.value.map(opt => opt.id);
      const newValue = uniq([...props.value, ...displayedIds]);
      emit('input', newValue);
      sendPoliteMessage('All options selected');
    }
  }

  function handleListClick(event) {
    const { target } = event;

    const listItem = target.closest('li[role="option"]');
    if (!listItem) return;

    event.stopPropagation();

    const optionType = listItem.dataset?.optionType;
    const optionId = listItem.dataset?.optionId;

    if (optionType === 'select-all') {
      selectAll();
    } else if (optionId) {
      const option = displayedOptions.value.find(opt => opt.id === optionId);
      if (option) {
        toggleOption(option);
      }
    }
  }

  function handleListMouseEnter(event) {
    const { target } = event;
    const listItem = target.closest('li[role="option"]');
    if (!listItem) return;

    const optionType = listItem.dataset?.optionType;
    const optionId = listItem.dataset?.optionId;

    if (optionType === 'select-all') {
      if (setFocusedSelectAll) {
        setFocusedSelectAll();
      }
    } else if (optionId) {
      const option = displayedOptions.value.find(opt => opt.id === optionId);
      if (option && setFocusedOption) {
        setFocusedOption(option);
      }
    }
  }

  function handleListMouseLeave() {
    if (resetFocusState && !isKeyboardNavigating?.value) {
      resetFocusState();
    }
  }

  function handleListFocus(event) {
    const { target } = event;

    const listItem = target.closest('li[role="option"]');
    if (!listItem) return;

    const optionType = listItem.dataset?.optionType;
    const optionId = listItem.dataset?.optionId;

    if (optionType === 'select-all') {
      if (setFocusedSelectAll) {
        setFocusedSelectAll();
      }
    } else if (optionId) {
      const option = displayedOptions.value.find(opt => opt.id === optionId);
      if (option && setFocusedOption) {
        setFocusedOption(option);
      }
    }
  }

  function handleOptionMouseEnter(option) {
    if (setFocusedOption) {
      setFocusedOption(option);
    }
  }

  function handleSelectAllMouseEnter() {
    if (setFocusedSelectAll) {
      setFocusedSelectAll();
    }
  }

  return {
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
  };
}
