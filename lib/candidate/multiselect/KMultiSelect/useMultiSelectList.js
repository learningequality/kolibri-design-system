import { computed } from 'vue';
import useKLiveRegion from '../../../composables/useKLiveRegion';

// Resolves a live-region announcement from the messages object.
// All message values must be functions, even for static strings, wrap
// them as: removed: () => 'Selection removed'.
// If the key is missing or not a function, the
// announcement is silently skipped (messages is optional).
function getAnnouncement(messages, key, variables = {}) {
  if (typeof messages[key] === 'function') {
    return messages[key](variables);
  }
  return null;
}

export default function useMultiSelectList(
  props,
  emit,
  { searchText, suppressFilter, messages = {} },
) {
  const { sendPoliteMessage } = useKLiveRegion();

  const normalizedOptions = computed(() => {
    return props.options
      .filter(option => option != null)
      .map(option => {
        if (typeof option !== 'object') {
          return { value: option, label: String(option) };
        }
        return option;
      });
  });

  function getOptionText(option) {
    return option[props.itemText];
  }

  function getOptionValue(option) {
    return option[props.itemValue];
  }

  const displayedOptions = computed(() => {
    const isSuppressed = suppressFilter && suppressFilter.value;
    const query = !isSuppressed && searchText.value ? searchText.value.trim().toLowerCase() : '';
    const filtered = !query
      ? normalizedOptions.value
      : normalizedOptions.value.filter(option => {
          const text = getOptionText(option);
          if (text != null && String(text).toLowerCase().includes(query)) {
            return true;
          }
          if (Array.isArray(props.searchKeys)) {
            for (const searchKey of props.searchKeys) {
              const val = option[searchKey];
              if (val != null) {
                if (Array.isArray(val)) {
                  if (val.some(item => String(item).toLowerCase().includes(query))) {
                    return true;
                  }
                } else if (String(val).toLowerCase().includes(query)) {
                  return true;
                }
              }
            }
          }
          return false;
        });

    return filtered;
  });

  const selectedOptionsData = computed(() => {
    if (!props.multiple) {
      if (props.value == null || props.value === '') return [];
      const opt = normalizedOptions.value.find(o => getOptionValue(o) === props.value);
      return [opt].filter(Boolean);
    }
    const currentArray = Array.isArray(props.value) ? props.value : [];
    return currentArray
      .map(v => normalizedOptions.value.find(o => getOptionValue(o) === v))
      .filter(Boolean);
  });

  function removeOption(optionValue) {
    const option = normalizedOptions.value.find(o => getOptionValue(o) === optionValue);
    const label = option ? getOptionText(option) : null;

    if (!props.multiple) {
      emit('input', null);
      const msg = getAnnouncement(messages, 'removed', { label, count: 0 });
      if (msg) sendPoliteMessage(msg);
      return;
    }

    const currentArray = Array.isArray(props.value) ? props.value : [];
    const newValue = currentArray.filter(v => v !== optionValue);

    emit('input', newValue);
    const count = newValue.length;
    const msg = getAnnouncement(messages, 'removed', { label, count });
    if (msg) sendPoliteMessage(msg);
  }

  function clearAll() {
    if (!props.multiple) {
      // Single mode: resolve the label of the currently selected option
      // so the translator can announce e.g. "English cleared".
      const option = normalizedOptions.value.find(o => getOptionValue(o) === props.value);
      const label = option ? getOptionText(option) : null;
      emit('input', null);
      const msg = getAnnouncement(messages, 'cleared', { label });
      if (msg) sendPoliteMessage(msg);
    } else {
      // Multi mode: pass count of items being cleared so the translator
      // can announce e.g. "3 selections cleared" or "All selections cleared".
      const count = Array.isArray(props.value) ? props.value.length : 0;
      emit('input', []);
      const msg = getAnnouncement(messages, 'cleared', { count });
      if (msg) sendPoliteMessage(msg);
    }
  }

  return {
    normalizedOptions,
    displayedOptions,
    selectedOptionsData,
    getOptionText,
    getOptionValue,
    removeOption,
    clearAll,
  };
}
