import { computed } from 'vue';
import useKLiveRegion from '../useKLiveRegion';

export default function useKMultiSelectPills(props, emit) {
  const { sendPoliteMessage } = useKLiveRegion();

  // Computed properties
  const selectedOptionsData = computed(() => {
    return props.options.filter(option => props.value.includes(option.id));
  });

  // Pill management functions
  function deselectOption(option) {
    const newValue = props.value.filter(id => id !== option.id);
    emit('input', newValue);
    sendPoliteMessage(`${option.label} removed`);
  }

  function clearAll() {
    const count = props.value.length;
    emit('input', []);
    sendPoliteMessage(`${count} selections cleared`);
  }

  // Pill button keyboard navigation
  function handlePillButtonKeydown(event, option, index) {
    const { key } = event;
    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      deselectOption(option);
    } else if (key === 'ArrowLeft') {
      event.preventDefault();
      // Move to previous pill button or input
      const pillButtons = document.querySelectorAll('.pill .k-icon-button');
      if (index > 0) {
        pillButtons[index - 1].focus();
      } else {
        // Focus the input field
        const input = document.querySelector('.combobox-input');
        if (input) input.focus();
      }
    } else if (key === 'ArrowRight') {
      event.preventDefault();
      // Move to next pill button or clear all button
      const pillButtons = document.querySelectorAll('.pill .k-icon-button');
      if (index < pillButtons.length - 1) {
        pillButtons[index + 1].focus();
      } else {
        const clearAllButton = document.querySelector('.clear-all-button');
        if (clearAllButton) {
          clearAllButton.focus();
        }
      }
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
    handlePillButtonKeydown,
    getClearPillLabel,

    // Constants
    clearAllMessage,
  };
}
