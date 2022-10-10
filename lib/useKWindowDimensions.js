import { onBeforeUnmount, onMounted, ref } from '@vue/composition-api';

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
 * Add window listener
 * @param {CallableFunction} handler - The event callback function
 */
function addWindowListener(handler) {
  if (!isNuxtServerSideRendering()) {
    if (window.addEventListener) {
      window.addEventListener('resize', handler, true);
    } else if (window.attachEvent) {
      window.attachEvent('onresize', handler);
    }
    //First time initialization of dimensions
    handler();
  }
}

/**
 * Remove window listener
 * @param {CallableFunction} handler - The event callback function
 */
function removeWindowListener(handler) {
  window.removeEventListener(handler);
}

export default function useKWindowDimensions() {
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
