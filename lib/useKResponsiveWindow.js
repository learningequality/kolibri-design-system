import { computed, onBeforeUnmount, onMounted, ref } from '@vue/composition-api';

/**
 * Returns window inner width and height
 * @returns {Object} The window's inner width and height
 */
function windowMetrics() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Check if Nuxt is server side rendering
 * @returns {Boolean}
 */
function isNuxtServerSideRendering() {
  return process && process.server;
}

/**
 * Add a media query
 * @param {String} query
 * @param {requestCallback} callback
 * @returns {Object} The mediaQueryList, eventHandler, and stopListening
 */
function addMediaQuery(query, callback) {
  if (isNuxtServerSideRendering()) {
    return;
  }

  const mediaQueryList = window.matchMedia(query);
  const eventHandler = event => {
    callback(event);
  };
  const stopListening = () => {
    mediaQueryList.removeEventListener('change', eventHandler);
  };
  mediaQueryList.addEventListener('change', eventHandler);

  return {
    mediaQueryList,
    eventHandler,
    stopListening,
  };
}

/**
 * Export window properties
 * @returns {Object} Window properties
 */
export default function useKResponsiveWindow() {
  /** Window properties */
  const windowWidth = ref(null);
  const windowHeight = ref(null);
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
    updateWindow();
    updateGutter();
  });

  /**
   * @function addMediaQuery
   */
  const heightQuery = addMediaQuery(`(max-height: 600px)`, event => {
    windowIsShort.value = event.matches;
    updateWindow();
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

    const mediaQueries = [];
    queries.forEach((query, index) => {
      const widthQuery = addMediaQuery(query, () => {
        windowBreakpoint.value = index;
        updateWindow();
        updateGutter();
      });
      mediaQueries.push(widthQuery);
    });
    return mediaQueries;
  })();

  /**
   * Initialize properties
   */
  const initProps = () => {
    orientationQuery.eventHandler(orientationQuery.mediaQueryList);
    heightQuery.eventHandler(heightQuery.mediaQueryList);
    widthQueries.every(widthQuery => {
      if (widthQuery.mediaQueryList.matches) {
        widthQuery.eventHandler(widthQuery.mediaQueryList);
        return false;
      }
      return true;
    });
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

  /**
   * Update window width and height
   */
  const updateWindow = () => {
    const metrics = windowMetrics();
    windowWidth.value = metrics.width;
    windowHeight.value = metrics.height;
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
