import { throttle } from 'frame-throttle';
import { getCurrentInstance, inject, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import useKResponsiveElement from '../composables/useKResponsiveElement';

/**
 * Composable to provide the context for calculating card metrics inside a grid.
 * It allows cards to register and unregister their get metrics functions, and with
 * this, we calculate the greatest metrics among all registered cards, so cards can then
 * use this information to calculate their own metrics and have a consistent layout.
 */
export default function useGridMetrics() {
  const registeredCards = ref({});

  const registerCard = (uid, { getMetrics }) => {
    registeredCards.value = {
      ...registeredCards.value,
      [uid]: {
        getMetrics,
      },
    };
  };
  const unregisterCard = uid => {
    const newRegisteredCards = { ...registeredCards.value };
    delete newRegisteredCards[uid];
    registeredCards.value = newRegisteredCards;
  };

  const selectionControlWidth = ref(0);

  const calculateGridMetrics = () => {
    let newSelectionControlWidth = 0;
    const cards = Object.values(registeredCards.value);
    for (const card of cards) {
      const metrics = card.getMetrics();
      if (metrics.selectionControlWidth > newSelectionControlWidth) {
        newSelectionControlWidth = metrics.selectionControlWidth;
      }
    }
    selectionControlWidth.value = newSelectionControlWidth;
  };
  const throttledCalculateGridMetrics = throttle(calculateGridMetrics);

  const { elementWidth, elementHeight } = useKResponsiveElement();

  watch([elementWidth, elementHeight, registeredCards], throttledCalculateGridMetrics);

  provide('registerCard', registerCard);
  provide('unregisterCard', unregisterCard);
  provide('selectionControlWidth', selectionControlWidth);
}

/**
 * Composable to inject the card metrics inside a card.
 * It allows cards to register their get metrics function,
 * so the grid can calculate the greatest metrics
 * among all registered cards.
 *
 * @param {Object} options - Options for the composable.
 * @param {Function} options.getMetrics - Function to get the card metrics. It should return
 *  an object with the following properties:
 *   - selectionControlWidth: The width of the selection control of the card.
 *
 * @returns {Object} - The card metrics.
 * @property {Ref<number>} selectionControlWidth - Width of selection control the card should use.
 */
export function useCardMetrics({ getMetrics } = {}) {
  if (!getMetrics) {
    throw new Error('getMetrics function is required');
  }
  const registerCard = inject('registerCard', null);
  const unregisterCard = inject('unregisterCard', null);
  const selectionControlWidth = inject('selectionControlWidth', null);

  if (!registerCard || !unregisterCard || !selectionControlWidth) {
    return {
      selectionControlWidth: ref(null),
    };
  }

  const instance = getCurrentInstance();
  const uid = instance.proxy._uid;

  onMounted(() => {
    registerCard(uid, { getMetrics });
  });
  onBeforeUnmount(() => {
    unregisterCard(uid);
  });

  return {
    selectionControlWidth,
  };
}
