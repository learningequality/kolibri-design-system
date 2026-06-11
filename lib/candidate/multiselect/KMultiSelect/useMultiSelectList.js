import { computed } from 'vue';
import useKLiveRegion from '../../../composables/useKLiveRegion';

export default function useMultiSelectList(props, emit, { searchText }) {
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
            for (const key of props.searchKeys) {
              const val = option[key];
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
      sendPoliteMessage('Selection removed');
      return;
    }

    const option = normalizedOptions.value.find(o => getOptionValue(o) === optionValue);
    const currentArray = Array.isArray(props.value) ? props.value : [];
    const newValue = currentArray.filter(v => v !== optionValue);

    emit('input', newValue);
    if (option) {
      const text = getOptionText(option) || '';
      sendPoliteMessage(`${text} removed, ${newValue.length} items selected`);
    }
  }

  function clearAll() {
    emit('input', props.multiple ? [] : null);
    sendPoliteMessage('All selections cleared');
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
