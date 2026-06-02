import { computed } from 'vue';
import useKLiveRegion from '../../../composables/useKLiveRegion';

export default function useMultiSelectCascade(
  props,
  emit,
  {
    normalizedOptions,
    getOptionValue,
    setSearchText,
    closeDropdown,
    getOptionText,
    defaultRemoveOption,
  },
) {
  const { sendPoliteMessage } = useKLiveRegion();
  // Map of option value to index in the flat list for O(1) lookups
  const optionIndexMap = computed(() => {
    const m = new Map();
    normalizedOptions.value.forEach((o, i) => m.set(getOptionValue(o), i));
    return m;
  });

  const isHierarchical = computed(() =>
    normalizedOptions.value.some(o => typeof o.level === 'number' && o.level > 0),
  );

  function getDescendants(value, flatOptions) {
    const idx = optionIndexMap.value.get(value);
    if (idx === undefined) return [];
    const nodeLevel = flatOptions[idx].level ?? 0;
    const result = [];
    for (let i = idx + 1; i < flatOptions.length; i++) {
      const l = flatOptions[i].level ?? 0;
      if (l <= nodeLevel) break;
      result.push(getOptionValue(flatOptions[i]));
    }
    return result;
  }

  function getAncestors(value, flatOptions) {
    const idx = optionIndexMap.value.get(value);
    if (idx === undefined) return [];
    const nodeLevel = flatOptions[idx].level ?? 0;
    const result = [];
    let searchLevel = nodeLevel - 1;
    for (let i = idx - 1; i >= 0 && searchLevel >= 0; i--) {
      const l = flatOptions[i].level ?? 0;
      if (l === searchLevel) {
        result.unshift(getOptionValue(flatOptions[i]));
        searchLevel--;
      }
    }
    return result;
  }

  // Indeterminate if some but not all descendants are selected
  const indeterminateValues = computed(() => {
    if (!props.multiple || !isHierarchical.value) return new Set();
    const flat = normalizedOptions.value;
    const currentArray = Array.isArray(props.value) ? props.value : [];
    const selected = new Set(currentArray);
    const result = new Set();
    for (const opt of flat) {
      const descendants = getDescendants(getOptionValue(opt), flat);
      if (descendants.length === 0) continue;
      const selectedCount = descendants.filter(v => selected.has(v)).length;
      if (selectedCount > 0 && selectedCount < descendants.length) {
        result.add(getOptionValue(opt));
      }
    }
    return result;
  });

  function onListboxInput(newValues) {
    if (!props.multiple) {
      const result = newValues.length > 0 ? newValues[newValues.length - 1] : null;
      emit('input', result);

      const prev = Array.isArray(props.value) ? props.value : props.value ? [props.value] : [];
      const added = result && !prev.includes(result);
      if (added) {
        sendPoliteMessage('Selected');
      }

      if (setSearchText) setSearchText('');
      closeDropdown();
      return result;
    }

    if (!isHierarchical.value) {
      emit('input', newValues);

      const prev = Array.isArray(props.value) ? props.value : [];
      const added = newValues.filter(v => !prev.includes(v));
      if (added.length > 0) {
        sendPoliteMessage('Selected');
      }

      if (setSearchText) setSearchText('');
      return newValues;
    }

    const flat = normalizedOptions.value;
    const prev = Array.isArray(props.value) ? props.value : [];

    const added = newValues.filter(v => !prev.includes(v));
    const removed = prev.filter(v => !newValues.includes(v));

    let result = [...newValues];

    // Downward cascade: deselect all descendants of each removed node
    for (const val of removed) {
      const descendants = getDescendants(val, flat);
      result = result.filter(v => !descendants.includes(v));
    }

    // Upward cascade: select all ancestors of each added node
    for (const val of added) {
      const ancestors = getAncestors(val, flat);
      ancestors.forEach(a => {
        if (!result.includes(a)) result.push(a);
      });
    }

    emit('input', result);

    if (added.length > 0) {
      sendPoliteMessage('Selected');
    }

    if (setSearchText) setSearchText('');
    return result;
  }

  function cascadeRemoveOption(optionValue) {
    if (!props.multiple) {
      if (defaultRemoveOption) defaultRemoveOption(optionValue);
      return;
    }

    const option = normalizedOptions.value.find(o => getOptionValue(o) === optionValue);
    const currentArray = Array.isArray(props.value) ? props.value : [];
    const newValue = currentArray.filter(v => v !== optionValue);

    const result = onListboxInput(newValue);

    if (option) {
      const text = getOptionText
        ? getOptionText(option)
        : option[props.itemText] || option.label || '';
      const count = Array.isArray(result) ? result.length : 0;
      sendPoliteMessage(`${text} removed, ${count} items selected`);
    }
  }

  return {
    indeterminateValues,
    onListboxInput,
    removeOption: cascadeRemoveOption,
  };
}
