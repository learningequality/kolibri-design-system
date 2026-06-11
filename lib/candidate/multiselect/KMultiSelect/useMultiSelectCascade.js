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
    defaultRemoveOption,
    messages = {},
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

  // Assumes options are in depth-first tree order (parents before their children).
  // This matches the output of getSortedCategories() in Studio and is required for
  // getDescendants() and getAncestors() to work correctly.
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
    for (let i = idx - 1; i >= 0; i--) {
      const l = flatOptions[i].level ?? 0;
      if (l < nodeLevel) {
        result.push(getOptionValue(flatOptions[i]));
        if (l === 0) break;
      }
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

  function onListboxInput(newValues, { silent = false } = {}) {
    if (!props.multiple) {
      const result = newValues.length > 0 ? newValues[newValues.length - 1] : null;
      emit('input', result);

      const prev = Array.isArray(props.value) ? props.value : props.value ? [props.value] : [];
      const added = result && !prev.includes(result);
      if (!silent && added && messages.selected) {
        sendPoliteMessage(messages.selected);
      }

      if (setSearchText) setSearchText('');
      closeDropdown();
      return result;
    }

    if (!isHierarchical.value) {
      emit('input', newValues);

      const prev = Array.isArray(props.value) ? props.value : [];
      const added = newValues.filter(v => !prev.includes(v));
      if (!silent && added.length > 0 && messages.selected) {
        sendPoliteMessage(messages.selected);
      }

      return newValues;
    }

    const flat = normalizedOptions.value;
    const prev = Array.isArray(props.value) ? props.value : [];

    const added = newValues.filter(v => !prev.includes(v));
    const removed = prev.filter(v => !newValues.includes(v));

    let result = [...newValues];

    // When a parent is unchecked, remove all its descendants too.
    for (const val of removed) {
      const descendants = getDescendants(val, flat);
      result = result.filter(v => !descendants.includes(v));
    }

    // When autoSelectParent is true, selecting a child also selects all its ancestors.
    if (props.autoSelectParent) {
      for (const val of added) {
        const ancestors = getAncestors(val, flat);
        for (const ancestor of ancestors) {
          if (!result.includes(ancestor)) {
            result.push(ancestor);
          }
        }
      }
    }

    emit('input', result);

    if (!silent && added.length > 0 && messages.selected) {
      sendPoliteMessage(messages.selected);
    }

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

    onListboxInput(newValue, { silent: true });

    if (option && messages.removed) {
      sendPoliteMessage(messages.removed);
    }
  }

  return {
    indeterminateValues,
    onListboxInput,
    removeOption: cascadeRemoveOption,
  };
}
