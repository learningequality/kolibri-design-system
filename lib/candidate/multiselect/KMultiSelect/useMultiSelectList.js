import { computed } from 'vue';
import useKLiveRegion from '../../../composables/useKLiveRegion';

// Resolves a live-region announcement from the messages object.
// Supports two formats per key:
//   Static string:  messages.removed  = 'Selection removed'
//   Translator fn:  messages.removed$ = ({ label, count }) => `${label} removed`
// The $ suffix signals a translator function. Function variant takes priority.
// If neither is provided the announcement is silently skipped (messages is optional).
function getAnnouncement(messages, key, variables = {}) {
  const fnKey = key + '$';
  if (typeof messages[fnKey] === 'function') {
    return messages[fnKey](variables);
  }
  return messages[key] || null;
}

export default function useMultiSelectList(props, emit, { searchText, messages = {} }) {
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
    const query = searchText.value ? searchText.value.toLowerCase() : '';
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
    if (!props.multiple) {
      emit('input', null);
      const msg = getAnnouncement(messages, 'removed', {});
      if (msg) sendPoliteMessage(msg);
      return;
    }

    const option = normalizedOptions.value.find(o => getOptionValue(o) === optionValue);
    const currentArray = Array.isArray(props.value) ? props.value : [];
    const newValue = currentArray.filter(v => v !== optionValue);

    emit('input', newValue);
    if (option) {
      const label = getOptionText(option);
      const count = newValue.length;
      const msg = getAnnouncement(messages, 'removed', { label, count });
      if (msg) sendPoliteMessage(msg);
    }
  }

  function clearAll() {
    emit('input', props.multiple ? [] : null);
    const msg = getAnnouncement(messages, 'cleared', {});
    if (msg) sendPoliteMessage(msg);
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
