import { computed, onBeforeUnmount, onMounted, ref } from '@vue/composition-api';
import useKWindowDimensions from '../useKWindowDimensions';
import MediaQuery from './MediaQuery';

/**
 * Add a media query
 * @param {String} query - The query String
 * @param {requestCallback} handler - The function callback
 * @returns {Object} Object with mediaQueryList, eventHandler, and stopListening properties
 */
function addMediaQuery(query, handler) {
  return new MediaQuery(query, handler).addMediaQuery();
}

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

  /**
   * @function addMediaQuery
   */
  const orientationQuery = addMediaQuery(`(orientation: portrait)`, event => {
    updateOrientation(event.matches);
    updateGutter();
  });

  /**
   * @function addMediaQuery
   */
  const heightQuery = addMediaQuery(`(max-height: 600px)`, event => {
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
      `(min-width: 1601px)`,
    ];

    return queries.map((query, index) =>
      addMediaQuery(query, () => {
        windowBreakpoint.value = index;
        updateGutter();
      })
    );
  })();

  /**
   * Initialize properties
   */
  const initProps = () => {
    orientationQuery.eventHandler(orientationQuery.mediaQueryList);
    heightQuery.eventHandler(heightQuery.mediaQueryList);
    for (const widthQuery of widthQueries) {
      if (widthQuery.mediaQueryList.matches) {
        widthQuery.eventHandler(widthQuery.mediaQueryList);
        break;
      }
    }
  };

  /**
   * Stop listening to media query changes
   */
  const stopListening = () => {
    orientationQuery.stopListening();
    heightQuery.stopListening();
    widthQueries.forEach(mediaQuery => {
      const { stopListening } = mediaQuery;
      stopListening();
    });
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
