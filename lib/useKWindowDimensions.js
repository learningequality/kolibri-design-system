import './composition-api'; //Due to @vue/composition-api shortcomings, add plugin prior to use in kolibri, studio and tests
import { onBeforeUnmount, onMounted, ref } from '@vue/composition-api';

/** Window dimensions */
const windowWidth = ref(null);
const windowHeight = ref(null);

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
  //Only add listeners when not server side rendering
  if (!isNuxtServerSideRendering()) {
    if (window.addEventListener) {
      window.addEventListener('resize', eventHandler, true);
    } else if (window.attachEvent) {
      window.attachEvent('onresize', eventHandler);
    }
    //First time initialization of dimensions
    eventHandler();
  }
}

/**
 * @param {CallableFunction} eventHandler - The event callback function
 */
function removeWindowListener(eventHandler) {
  window.removeEventListener(eventHandler);
}

export default function useKWindowDimensions() {
  onMounted(() => {
    addWindowListener(updateWindow);
  });

  onBeforeUnmount(() => {
    removeWindowListener(updateWindow);
  });

  return {
    windowWidth,
    windowHeight,
  };
}
