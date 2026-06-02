import { ref, onMounted, onUnmounted } from 'vue';

export default function useMultiSelectDropdown(
  props,
  { containerEl, setSearchText, normalizedOptions, getOptionValue },
) {
  const isOpen = ref(false);

  function openDropdown() {
    if (props.disabled) return;
    isOpen.value = true;
    if (!props.multiple && props.value != null && props.value !== '' && setSearchText) {
      const opt = normalizedOptions.value.find(o => getOptionValue(o) === props.value);
      if (opt) {
        setSearchText(opt[props.itemText] ?? '');
      }
    }
  }

  function closeDropdown() {
    isOpen.value = false;
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

  onMounted(() => document.addEventListener('mousedown', handleClickOutside));
  onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside));

  return {
    isOpen,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  };
}
