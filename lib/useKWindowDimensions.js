import './composition-api'; //Due to @vue/composition-api shortcomings, add plugin prior to use in kolibri, studio and tests
import { onMounted, onUnmounted, ref } from '@vue/composition-api';

/** Global variables */
const windowWidth = ref(null);
const windowHeight = ref(null);
const isListenerAdded = ref(false);
const usageCount = ref(0);

/**
 * Update window width and height
 */
const updateWindow = () => {
  const metrics = windowMetrics();
  windowWidth.value = metrics.width;
  windowHeight.value = metrics.height;
};

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
 * @param {CallableFunction} eventHandler - The event callback function
 */
function addWindowListener(eventHandler) {
  //Only add listeners when not server side rendering and listener doesnt exist
  if (!isNuxtServerSideRendering() && !isListenerAdded.value) {
    if (window.addEventListener) {
      window.addEventListener('resize', eventHandler, true);
    } else if (window.attachEvent) {
      window.attachEvent('onresize', eventHandler);
    }
    //First time initialization of dimensions
    eventHandler();

    //Prevent addition of multiple listeners
    isListenerAdded.value = true;
  }
}

/**
 * @param {CallableFunction} eventHandler - The event callback function
 */
function removeWindowListener(eventHandler) {
  if (!isUseKWindowDimensionsActiveElsewhere()) {
    window.removeEventListener(eventHandler);

    //Allow addition of a listener
    isListenerAdded.value = false;
  }
}

function isUseKWindowDimensionsActiveElsewhere() {
  return usageCount.value > 0;
}

export default function useKWindowDimensions() {
  onMounted(() => {
    usageCount.value++;
    addWindowListener(updateWindow);
  });

  onUnmounted(() => {
    usageCount.value--;
    removeWindowListener(updateWindow);
  });

  return {
    windowWidth,
    windowHeight,
  };
}
