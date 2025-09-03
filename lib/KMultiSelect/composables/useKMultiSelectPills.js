import { computed } from 'vue';
import useKLiveRegion from '../../composables/useKLiveRegion';

export default function useKMultiSelectPills(props, emit, accessibilityHandlers = {}) {
  const { sendPoliteMessage } = useKLiveRegion();
  const { announceOptionRemoval, announceAllCleared } = accessibilityHandlers;
  const selectedOptionsData = computed(() => {
    return props.options.filter(option => props.value.includes(option.id));
  });

  function deselectOption(option) {
    const newValue = props.value.filter(id => id !== option.id);
    emit('input', newValue);
    if (announceOptionRemoval) {
      announceOptionRemoval(option);
    } else {
      sendPoliteMessage(`${option.label} removed`);
    }
  }

  function clearAll() {
    const count = props.value.length;
    emit('input', []);
    if (announceAllCleared) {
      announceAllCleared(count);
    } else {
      sendPoliteMessage(`${count} selections cleared`);
    }
  }

  function getClearPillLabel(label) {
    return `Remove ${label} from selection`;
  }

  const clearAllMessage = 'Clear all selections';

  return {
    selectedOptionsData,
    deselectOption,
    clearAll,
    getClearPillLabel,
    clearAllMessage,
  };
}
