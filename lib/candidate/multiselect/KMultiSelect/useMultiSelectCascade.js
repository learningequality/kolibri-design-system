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
      if (selectedCount > 0 && !selected.has(getOptionValue(opt))) {
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

    for (const val of removed) {
      const descendants = getDescendants(val, flat);
      result = result.filter(v => !descendants.includes(v));
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
      const text = getOptionText(option) || '';
      const count = Array.isArray(result) ? result.length : 0;
      sendPoliteMessage(`${text} removed, ${count} item${count === 1 ? '' : 's'} selected`);
    }
  }

  return {
    indeterminateValues,
    onListboxInput,
    removeOption: cascadeRemoveOption,
  };
}
