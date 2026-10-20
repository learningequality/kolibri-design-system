import { computed } from 'vue';
import useKLiveRegion from '../../../composables/useKLiveRegion';

// Resolves a live-region announcement from the messages object.
// The messages prop must be an object of translator functions.
// If a key is missing or not a function, the announcement is silently skipped.
function getAnnouncement(messages, key, variables = {}) {
  if (typeof messages[key] === 'function') {
    return messages[key](variables);
  }
  return null;
}

export default function useMultiSelectCascade(
  props,
  emit,
  {
    normalizedOptions,
    getOptionValue,
    getOptionText = o => o.label,
    setSearchText,
    closeDropdown,
    defaultRemoveOption,
    messages = {},
  },
) {
  const { sendPoliteMessage } = useKLiveRegion();

  // Parents the component checked automatically, either because the user had
  // selected all their children (promotion) or because autoSelectParent added
  // them as ancestors of a selection. When children get unchecked later, these
  // are unchecked too, but a parent the user checked themselves is left alone.
  const derivedParents = new Set();

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
    let currentLevel = flatOptions[idx].level ?? 0;
    const result = [];
    for (let i = idx - 1; i >= 0; i--) {
      const l = flatOptions[i].level ?? 0;
      if (l < currentLevel) {
        result.push(getOptionValue(flatOptions[i]));
        currentLevel = l;
        if (currentLevel <= 0) break;
      }
    }
    return result;
  }

  function getDirectChildren(value, flatOptions) {
    const idx = optionIndexMap.value.get(value);
    if (idx === undefined) return [];
    const parentLevel = flatOptions[idx].level ?? 0;
    const childLevel = parentLevel + 1;
    const result = [];
    for (let i = idx + 1; i < flatOptions.length; i++) {
      const l = flatOptions[i].level ?? 0;
      if (l <= parentLevel) break;
      if (l === childLevel) result.push(getOptionValue(flatOptions[i]));
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
      const val = getOptionValue(opt);
      const descendants = getDescendants(val, flat);
      if (descendants.length === 0) continue;
      const selectedCount = descendants.filter(v => selected.has(v)).length;
      if (selectedCount > 0 && !selected.has(val)) {
        result.add(val);
      }
      if (
        props.autoSelectParent &&
        selected.has(val) &&
        selectedCount > 0 &&
        selectedCount < descendants.length
      ) {
        result.add(val);
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
      if (!silent && added) {
        const optIdx = optionIndexMap.value.get(result);
        const opt = optIdx !== undefined ? normalizedOptions.value[optIdx] : null;
        const label = opt ? getOptionText(opt) : '';
        const msg = getAnnouncement(messages, 'selected', { label, count: 1 });
        if (msg) sendPoliteMessage(msg);
      }

      if (setSearchText) setSearchText('');
      closeDropdown();
      return result;
    }

    if (!isHierarchical.value) {
      emit('input', newValues);

      const prev = Array.isArray(props.value) ? props.value : [];
      const added = newValues.filter(v => !prev.includes(v));
      if (!silent && added.length > 0) {
        const firstIdx = optionIndexMap.value.get(added[0]);
        const firstOpt = firstIdx !== undefined ? normalizedOptions.value[firstIdx] : null;
        const label = firstOpt ? getOptionText(firstOpt) : '';
        const msg = getAnnouncement(messages, 'selected', { label, count: newValues.length });
        if (msg) sendPoliteMessage(msg);
      }

      return newValues;
    }

    const flat = normalizedOptions.value;
    const prev = Array.isArray(props.value) ? props.value : [];

    const added = newValues.filter(v => !prev.includes(v));
    const removed = prev.filter(v => !newValues.includes(v));

    for (const p of [...derivedParents]) {
      if (!prev.includes(p)) {
        derivedParents.delete(p);
      }
    }
    added.forEach(v => derivedParents.delete(v));

    let result = [...newValues];

    // When a parent is unchecked, remove all its descendants too.
    for (const val of removed) {
      const descendants = getDescendants(val, flat);
      result = result.filter(v => !descendants.includes(v));
      derivedParents.delete(val);
      descendants.forEach(d => derivedParents.delete(d));
    }

    // When autoSelectParent is true, selecting a child also selects all its
    // ancestors, inserted before the child in root-first order.
    if (props.autoSelectParent) {
      for (const val of added) {
        const ancestors = getAncestors(val, flat).reverse();
        const missing = ancestors.filter(ancestor => !result.includes(ancestor));
        if (missing.length > 0) {
          result.splice(result.indexOf(val), 0, ...missing);
          missing.forEach(ancestor => derivedParents.add(ancestor));
        }
      }
    }

    if (props.autoSelectChild) {
      for (const val of added) {
        const descendants = getDescendants(val, flat);
        for (const descendant of descendants) {
          if (!result.includes(descendant)) {
            result.push(descendant);
          }
        }
      }
    }

    if (props.autoPromoteParent !== false) {
      let changed = true;
      while (changed) {
        changed = false;
        const resultSet = new Set(result);
        for (const opt of flat) {
          const val = getOptionValue(opt);
          if (resultSet.has(val)) continue;
          const directChildren = getDirectChildren(val, flat);
          if (directChildren.length > 0 && directChildren.every(c => resultSet.has(c))) {
            const descendants = getDescendants(val, flat);
            let insertAt = result.length;
            for (const descendant of descendants) {
              const i = result.indexOf(descendant);
              if (i !== -1 && i < insertAt) insertAt = i;
            }
            result.splice(insertAt, 0, val);
            resultSet.add(val);
            // Auto-promoted, so it can be auto-demoted later.
            derivedParents.add(val);
            changed = true;
          }
        }
      }
    }

    // A child was deselected: drop auto-selected ancestors whose reason is gone.
    // With autoSelectParent that means no selected descendant remains; otherwise
    // it means the children are no longer fully covered. Loops so demotion
    // cascades upward.
    if (removed.length > 0) {
      const affectedAncestors = new Set();
      for (const val of removed) {
        for (const ancestor of getAncestors(val, flat)) {
          affectedAncestors.add(ancestor);
        }
      }
      let demoted = true;
      while (demoted) {
        demoted = false;
        const resultSet = new Set(result);
        for (const ancestor of affectedAncestors) {
          if (!resultSet.has(ancestor)) continue;
          // With autoSelectChild a parent's state is always derived from its
          // children, so it always demotes. Otherwise only auto-selected
          // parents demote; a parent the user checked themselves stays checked.
          if (!props.autoSelectChild && !derivedParents.has(ancestor)) continue;
          if (props.autoSelectParent) {
            const descendants = getDescendants(ancestor, flat);
            if (descendants.some(d => resultSet.has(d))) continue;
            result = result.filter(v => v !== ancestor);
            derivedParents.delete(ancestor);
            demoted = true;
            continue;
          }
          const directChildren = getDirectChildren(ancestor, flat);
          if (directChildren.length > 0 && !directChildren.every(c => resultSet.has(c))) {
            result = result.filter(v => v !== ancestor);
            derivedParents.delete(ancestor);
            demoted = true;
          }
        }
      }
    }

    emit('input', result);

    if (!silent && added.length > 0) {
      const firstIdx = optionIndexMap.value.get(added[0]);
      const firstOpt = firstIdx !== undefined ? normalizedOptions.value[firstIdx] : null;
      const label = firstOpt ? getOptionText(firstOpt) : '';
      const msg = getAnnouncement(messages, 'selected', { label, count: result.length });
      if (msg) sendPoliteMessage(msg);
    }

    return result;
  }

  function cascadeRemoveOption(optionValue) {
    if (!props.multiple) {
      if (defaultRemoveOption) defaultRemoveOption(optionValue);
      return;
    }

    const optIdx = optionIndexMap.value.get(optionValue);
    const option = optIdx !== undefined ? normalizedOptions.value[optIdx] : null;
    const currentArray = Array.isArray(props.value) ? props.value : [];
    const newValue = currentArray.filter(v => v !== optionValue);

    // Call with silent: true so onListboxInput does not fire a selected announcement.
    const finalResult = onListboxInput(newValue, { silent: true });

    if (option) {
      const label = getOptionText(option);
      const count = finalResult.length; // always an array, single mode returns early above
      const msg = getAnnouncement(messages, 'removed', { label, count });
      if (msg) sendPoliteMessage(msg);
    }
  }

  return {
    indeterminateValues,
    onListboxInput,
    removeOption: cascadeRemoveOption,
  };
}
