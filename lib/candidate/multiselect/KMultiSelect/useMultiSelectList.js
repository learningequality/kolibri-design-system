import { computed } from 'vue';
import useKLiveRegion from '../../../composables/useKLiveRegion';

export default function useMultiSelectList(props, emit, { searchText }) {
  const { sendPoliteMessage } = useKLiveRegion();

  const normalizedOptions = computed(() => {
    return props.options.map(option => {
      if (typeof option !== 'object' || option === null) {
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
          if (String(text).toLowerCase().includes(query)) {
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

    if (props.allowCustom && searchText.value && searchText.value.trim()) {
      const q = searchText.value.trim();
      const overLimit = props.maxlength != null && q.length > props.maxlength;

      if (!overLimit) {
        const exactMatch = normalizedOptions.value.some(
          o => String(getOptionText(o)).toLowerCase() === q.toLowerCase(),
        );
        if (!exactMatch) {
          const synthetic = { [props.itemValue]: q, [props.itemText]: q };
          return [synthetic, ...filtered];
        }
      }
    }

    return filtered;
  });

  const selectedOptionsData = computed(() => {
    const makeSynthetic = v => {
      if (!props.allowCustom || v == null) return null;
      return { [props.itemValue]: v, [props.itemText]: v };
    };

    if (!props.multiple) {
      if (props.value == null || props.value === '') return [];
      const opt = normalizedOptions.value.find(o => getOptionValue(o) === props.value);
      return [opt || makeSynthetic(props.value)].filter(Boolean);
    }
    const currentArray = Array.isArray(props.value) ? props.value : [];
    return currentArray
      .map(v => normalizedOptions.value.find(o => getOptionValue(o) === v) || makeSynthetic(v))
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
      const text = getOptionText(option) || option.label || '';
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
