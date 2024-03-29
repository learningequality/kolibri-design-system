import { computed, onBeforeUnmount, onMounted, ref, watch } from '@vue/composition-api';
import useKWindowDimensions, { windowWidth, windowHeight } from '../_useKWindowDimensions';
import { isNuxtServerSideRendering } from '../../utils';
import MediaQuery from './MediaQuery';

/** Global variables */
/*
  Implementing breakpoint controlled by watchers to work around
  optimization issue: https://github.com/vuejs/vue/issues/10344
  If that issue ever gets addressed, we should make them computed props.
*/
const windowBreakpoint = ref(null);
const windowGutter = ref(16);

const windowIsPortrait = ref(false);
const windowIsLandscape = ref(false);
const windowIsShort = ref(false);

const windowIsLarge = computed(() => windowBreakpoint.value > 2);
const windowIsMedium = computed(() => windowBreakpoint.value === 2);
const windowIsSmall = computed(() => windowBreakpoint.value < 2);

const usageCount = ref(0);

const orientationQuery = new MediaQuery('screen and (orientation: portrait)', event => {
  updateOrientation(event.matches);
});
const heightQuery = new MediaQuery('screen and (max-height: 600px)', event => {
  windowIsShort.value = event.matches;
});

/**
 * Initialize media query window properties
 */
function initProps() {
  if (isNuxtServerSideRendering()) {
    return;
  }
  if (window.matchMedia) {
    orientationQuery.eventHandler(orientationQuery.mediaQueryList);
    heightQuery.eventHandler(heightQuery.mediaQueryList);
  }
}

initProps();

/**
 * Start listening to media query changes
 */
function startListening() {
  orientationQuery.startListening();
  heightQuery.startListening();
}

/**
 * Stop listening to media query changes
 */
function stopListening() {
  orientationQuery.stopListening();
  heightQuery.stopListening();
}

/**
 * Update window breakpoint
 */
function updateBreakPoint() {
  const SCROLL_BAR = 16;
  const widthBreakpoints = [
    480,
    600,
    840,
    960 - SCROLL_BAR,
    1280 - SCROLL_BAR,
    1440 - SCROLL_BAR,
    1600 - SCROLL_BAR,
  ];

  // if windowWidth is null (upon initialization), breakpoint = 0
  const firstMatchingWidthIndex = windowWidth.value
    ? widthBreakpoints.findIndex(matchingWidth => windowWidth.value <= matchingWidth)
    : 0;

  // if windowWidth > 1585, breakpoint = 7
  const matchingBreakpoint = firstMatchingWidthIndex >= 0 ? firstMatchingWidthIndex : 7;

  windowBreakpoint.value = matchingBreakpoint;
  updateGutter();
}

watch([windowWidth, windowHeight], updateBreakPoint);

/**
 * Update window gutter
 */
function updateGutter() {
  if (windowIsSmall.value || smallestWindowDimensionIsLessThan(600)) {
    windowGutter.value = 16;
  } else {
    windowGutter.value = 24;
  }
}

/**
 * Check if the smallest window dimension(width or height) is smaller than the specified dimension
 * @param {Number} dimension in px
 * @returns {Boolean}
 */
function smallestWindowDimensionIsLessThan(dimension) {
  return windowBreakpoint.value < 4 && Math.min(windowWidth.value, windowHeight.value) < dimension;
}

/**
 * Update window orientation
 * @param {Boolean} portrait
 */
function updateOrientation(portrait) {
  windowIsPortrait.value = portrait;
  windowIsLandscape.value = !windowIsPortrait.value;
}

/**
 * Export window properties
 * @returns {Object} Object with window properties
 */
export default function useKResponsiveWindow() {
  // Do this to ensure that we call the useKWindowDimension lifecycle hooks
  useKWindowDimensions();

  onMounted(() => {
    if (usageCount.value === 0) {
      // No component is currently using this, so we need to initialize
      startListening();
    }
    usageCount.value++;
  });

  onBeforeUnmount(() => {
    usageCount.value--;
    if (usageCount.value === 0) {
      // No component is now using this, so we can clean up
      stopListening();
    }
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
