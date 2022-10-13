import { computed, onBeforeUnmount, onMounted, ref } from '@vue/composition-api';
import useKWindowDimensions from '../useKWindowDimensions';
import MediaQuery from './MediaQuery';

/**
 * Export window properties
 * @returns {Object} Object with window properties
 */
export default function useKResponsiveWindow() {
  /** Window properties */
  const { windowWidth, windowHeight } = useKWindowDimensions();
  const windowBreakpoint = ref(null);
  const windowIsPortrait = ref(false);
  const windowIsLandscape = ref(false);
  const windowGutter = ref(16);
  const windowIsShort = ref(false);
  const windowIsLarge = computed(() => windowBreakpoint.value > 2);
  const windowIsMedium = computed(() => windowBreakpoint.value === 2);
  const windowIsSmall = computed(() => windowBreakpoint.value < 2);

  const orientationQuery = new MediaQuery('screen and (orientation: portrait)', event => {
    updateOrientation(event.matches);
    updateGutter();
  });

  const heightQuery = new MediaQuery('screen and (max-height: 600px)', event => {
    windowIsShort.value = event.matches;
  });

  /**
   * Generate width media queries
   */
  const widthQueries = (() => {
    const SCROLL_BAR = 16;
    const queries = [
      '(max-width: 480px)',
      '(max-width: 600px)',
      '(max-width: 840px)',
      `(max-width: ${960 - SCROLL_BAR}px)`,
      `(max-width: ${1280 - SCROLL_BAR}px)`,
      `(max-width: ${1440 - SCROLL_BAR}px)`,
      `(max-width: ${1600 - SCROLL_BAR}px)`,
      '(min-width: 1601px)',
    ];

    return queries.map(
      (query, index) =>
        new MediaQuery(`screen and ${query}`, () => {
          windowBreakpoint.value = index;
          updateGutter();
        })
    );
  })();

  /**
   * Initialize window properties
   */
  const initProps = () => {
    orientationQuery.eventHandler(orientationQuery.mediaQueryList());
    heightQuery.eventHandler(heightQuery.mediaQueryList());
    for (const widthQuery of widthQueries) {
      if (widthQuery.mediaQueryList().matches) {
        widthQuery.eventHandler(widthQuery.mediaQueryList());
        break;
      }
    }
  };

  /**
   * Start listening to media query changes
   */
  const startListening = () => {
    orientationQuery.startListening();
    heightQuery.startListening();
    for (const widthQuery of widthQueries) {
      widthQuery.startListening();
    }
  };

  /**
   * Stop listening to media query changes
   */
  const stopListening = () => {
    orientationQuery.stopListening();
    heightQuery.stopListening();
    for (const widthQuery of widthQueries) {
      widthQuery.stopListening();
    }
  };

  /**
   * Update window gutter
   */
  const updateGutter = () => {
    if (windowIsSmall.value) {
      windowGutter.value = 16;
    } else if (smallestWindowDimensionIsLessThan(600)) {
      windowGutter.value = 16;
    } else {
      windowGutter.value = 24;
    }
  };

  /**
   * Check if the smallest window dimension(width or height) is smaller than the specified dimension
   * @param {Number} dimension in px
   * @returns {Boolean}
   */
  const smallestWindowDimensionIsLessThan = dimension => {
    return (
      windowBreakpoint.value < 4 && Math.min(windowWidth.value, windowHeight.value) < dimension
    );
  };

  /**
   * Update window orientation
   * @param {Boolean} portrait
   */
  const updateOrientation = portrait => {
    windowIsPortrait.value = portrait;
    windowIsLandscape.value = !windowIsPortrait.value;
  };

  onMounted(() => {
    initProps();
    startListening();
  });
  onBeforeUnmount(() => {
    stopListening();
  });

  return {
    windowWidth,
    windowHeight,
    windowBreakpoint,
    windowIsPortrait,
    windowIsLandscape,
    windowGutter,
    windowIsShort,
    windowIsLarge,
    windowIsMedium,
    windowIsSmall,
  };
}
