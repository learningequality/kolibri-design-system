import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

export default function useMultiSelectDropdown(
  props,
  {
    containerEl,
    setSearchText,
    suppressFilter,
    normalizedOptions,
    getOptionValue,
    getOptionText = o => o.label,
  },
) {
  const isOpen = ref(false);

  function openDropdown() {
    if (props.disabled) return;
    isOpen.value = true;
    if (!props.multiple && props.value != null && props.value !== '') {
      const opt = normalizedOptions.value.find(o => getOptionValue(o) === props.value);
      if (opt) {
        if (suppressFilter) suppressFilter.value = true;
        setSearchText(getOptionText(opt));
      }
    }
  }

  function closeDropdown() {
    isOpen.value = false;
    if (suppressFilter) suppressFilter.value = false;
    setSearchText('');
  }

  function toggleDropdown() {
    if (isOpen.value) closeDropdown();
    else openDropdown();
  }

  function handleClickOutside(event) {
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
