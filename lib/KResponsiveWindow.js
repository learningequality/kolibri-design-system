import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';

function windowMetrics() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function addMediaQuery(query, callback) {
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

export default function useResponsiveWindow() {
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

  const stopWatchOrientation = watchEffect(onInvalidate => {
    const { stopListening } = addMediaQuery(`(orientation: portrait)`, event => {
      _updateOrientation(event.matches);
      _updateWindow();
      _updateGutter();
    });

    onInvalidate(() => {
      stopListening();
    });
  });

  const stopWatchWindowHeight = watchEffect(onInvalidate => {
    const { stopListening } = addMediaQuery(`(max-height: 600px)`, event => {
      windowIsShort.value = event.matches;
      _updateWindow();
    });

    onInvalidate(() => {
      stopListening();
    });
  });

  const stopWatchWindowWidth = watchEffect(onInvalidate => {
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
    const listeners = [];
    queries.forEach((query, index) => {
      const { stopListening } = addMediaQuery(query, event => {
        if (event.matches) {
          windowBreakpoint.value = index;
          _updateWindow();
          _updateGutter();
        }
      });
      listeners.push({ stopListening });
    });

    onInvalidate(() => {
      listeners.forEach(listener => {
        const { stopListening } = listener;
        stopListening();
      });
    });
  });

  const _updateGutter = () => {
    if (windowIsSmall.value) {
      windowGutter.value = 16;
    } else if (_smallestWindowDimensionIsLessThan(600)) {
      windowGutter.value = 16;
    } else {
      windowGutter.value = 24;
    }
  };

  const _smallestWindowDimensionIsLessThan = dimension => {
    return (
      windowBreakpoint.value < 4 && Math.min(windowWidth.value, windowHeight.value) < dimension
    );
  };

  const _updateOrientation = portrait => {
    windowIsPortrait.value = portrait;
    windowIsLandscape.value = !windowIsPortrait.value;
  };

  const _updateWindow = () => {
    const metrics = windowMetrics();
    windowWidth.value = metrics.width;
    windowHeight.value = metrics.height;
  };

  onMounted(() => {
    _updateWindow();
  });
  onBeforeUnmount(() => {
    stopWatchOrientation();
    stopWatchWindowHeight();
    stopWatchWindowWidth();
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
