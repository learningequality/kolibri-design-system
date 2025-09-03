import { computed } from 'vue';
import useKLiveRegion from '../useKLiveRegion';

export default function useKMultiSelectPills(props, emit, accessibilityHandlers = {}) {
  const { sendPoliteMessage } = useKLiveRegion();
  const { announceOptionRemoval, announceAllCleared } = accessibilityHandlers;

  // Computed properties
  const selectedOptionsData = computed(() => {
    return props.options.filter(option => props.value.includes(option.id));
  });

  // Pill management functions
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



  // Utility functions
  function getClearPillLabel(label) {
    return `Remove ${label} from selection`;
  }

  const clearAllMessage = 'Clear all selections';

  return {
    // State
    selectedOptionsData,

    // Functions
    deselectOption,
    clearAll,
    getClearPillLabel,

    // Constants
    clearAllMessage,
  };
}
 