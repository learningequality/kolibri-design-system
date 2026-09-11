import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

export default function useMultiSelectDropdown(
  props,
  {
    containerEl,
    setSearchText,
    suppressFilter,
    searchText,
    normalizedOptions,
    getOptionValue,
    getOptionText = o => o.label,
  },
) {
  const isOpen = ref(props.expanded);
  function selectedOptionText() {
    if (props.multiple || props.value == null || props.value === '') return '';
    const opt = normalizedOptions.value.find(o => getOptionValue(o) === props.value);
    return opt ? getOptionText(opt) : '';
  }

  function openDropdown() {
    if (props.disabled) return;
    isOpen.value = true;
    if (props.multiple) return;
    const label = selectedOptionText();
    const isShowingValue = !searchText || !searchText.value || searchText.value === label;
    if (label && isShowingValue) {
      if (suppressFilter) suppressFilter.value = true;
      setSearchText(label);
    }
  }

  function closeDropdown() {
    if (props.expanded) {
      // No open/close lifecycle here. Single mode still needs the selection in the field,
      // with filtering suppressed so the whole list stays visible behind it.
      if (!props.multiple) {
        const label = selectedOptionText();
        if (suppressFilter) suppressFilter.value = Boolean(label);
        setSearchText(label);
      }
      return;
    }
    isOpen.value = false;
    if (suppressFilter) suppressFilter.value = false;
    setSearchText(props.multiple ? '' : selectedOptionText());
  }

  function toggleDropdown() {
    if (isOpen.value) closeDropdown();
    else openDropdown();
  }

  function handleClickOutside(event) {
    if (props.expanded) return;
    if (isOpen.value && containerEl.value && !containerEl.value.contains(event.target)) {
      closeDropdown();
    }
  }

  watch(
    () => props.disabled,
    isDisabled => {
      if (isDisabled) closeDropdown();
    },
  );

  function handleKeydown(event) {
    if (props.expanded) return;
    if (isOpen.value && event.key === 'Escape') {
      closeDropdown();
    }
  }

  onMounted(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeydown);
    }
  });

  onBeforeUnmount(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    }
  });

  return {
    isOpen,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  };
}
