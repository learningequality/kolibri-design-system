import Vue from 'vue';
import { ref, watch, onMounted, toRefs, computed } from '@vue/composition-api';

import useGridLayout from './useGridLayout';
import { getBreakpointConfig } from './utils';

// The skeleton loaders will be displayed after `LOADING_DELAY`
// for a duration of `MIN_LOADING_TIME`
// (https://www.nngroup.com/articles/skeleton-screens/)
const LOADING_DELAY = 1000;
const MIN_LOADING_TIME = 1000;

const DEFAULT_SKELETON = {
  count: undefined, // default determined by the grid layout and the current breakpoint
  height: '200px',
  orientation: 'horizontal',
  thumbnailDisplay: 'none',
  thumbnailAlign: 'left',
};

/**
 * Manages `KCardGrid`'s loading state
 */
export default function useGridLoading(props) {
  const { currentBreakpointConfig, windowBreakpoint } = useGridLayout(props);
  const { loading, skeletonsConfig } = toRefs(props);

  const skeletonCount = ref(DEFAULT_SKELETON.count);
  const skeletonHeight = ref(DEFAULT_SKELETON.height);
  const skeletonOrientation = ref(DEFAULT_SKELETON.orientation);
  const skeletonThumbnailDisplay = ref(DEFAULT_SKELETON.thumbnailDisplay);
  const skeletonThumbnailAlign = ref(DEFAULT_SKELETON.thumbnailAlign);

  const isLoading = ref(false); // Used by `KCardGrid` to determine whether to display loading skeletons
  const finishedMounting = ref(false);
  const isLoadingDelayActive = ref(false);
  let loadingDelayTimeout = null;
  let loadingStartTime = null;
  let loadingElapsedTime = null;
  let remainingLoadingTime = 0;

  // Handles `KCardGrid`'s `loading` prop changes and returns
  // final `isLoading` state to be used by `KCardGrid`
  watch(
    loading,
    (newLoading, oldLoading) => {
      if (newLoading === oldLoading) {
        return;
      }

      // if loading started, delay it
      if (newLoading) {
        isLoadingDelayActive.value = true;
        loadingDelayTimeout = setTimeout(() => {
          loadingStartTime = Date.now();
          isLoading.value = true;
          isLoadingDelayActive.value = false;
        }, LOADING_DELAY);
      }

      // if loading finished before the loading delay completed,
      // cancel display of the loading state
      if (!newLoading && !loadingStartTime) {
        isLoadingDelayActive.value = false;
        clearTimeout(loadingDelayTimeout);
      }

      // if loading finished some time after the loading delay completed,
      // ensure that the loading state is visible for at least `MIN_LOADING_TIME`
      if (!newLoading && loadingStartTime) {
        loadingElapsedTime = Date.now() - loadingStartTime;
        if (loadingElapsedTime < MIN_LOADING_TIME) {
          remainingLoadingTime = MIN_LOADING_TIME - loadingElapsedTime;
        } else {
          remainingLoadingTime = 0;
        }

        setTimeout(() => {
          isLoading.value = false;

          loadingStartTime = null;
          loadingElapsedTime = null;
          remainingLoadingTime = 0;
        }, remainingLoadingTime);
      }
    },
    { immediate: true }
  );

  // Used by `KCardGrid` to prevent jarring UX:
  // - (1) prevents flashes of unstyled content during the mouning stage
  // - (2) prevents uncomplete cards from being displayed during the loading delay period
  const showGrid = computed(() => {
    return finishedMounting.value && !isLoadingDelayActive.value;
  });

  onMounted(() => {
    Vue.nextTick(() => {
      finishedMounting.value = true;
    });
  });

  // Updates the loading skeleton configuration
  //for the current breakpoint
  watch(
    [windowBreakpoint, skeletonsConfig, currentBreakpointConfig],
    ([newBreakpoint]) => {
      skeletonCount.value = currentBreakpointConfig.value.cardsPerRow;

      const breakpointSkeletonConfig = getBreakpointConfig(skeletonsConfig.value, newBreakpoint);
      if (breakpointSkeletonConfig) {
        if (breakpointSkeletonConfig.count) {
          skeletonCount.value = breakpointSkeletonConfig.count;
        }
        if (breakpointSkeletonConfig.height) {
          skeletonHeight.value = breakpointSkeletonConfig.height;
        }
        if (breakpointSkeletonConfig.orientation) {
          skeletonOrientation.value = breakpointSkeletonConfig.orientation;
        }
        if (breakpointSkeletonConfig.thumbnailDisplay) {
          skeletonThumbnailDisplay.value = breakpointSkeletonConfig.thumbnailDisplay;
        }
        if (breakpointSkeletonConfig.thumbnailAlign) {
          skeletonThumbnailAlign.value = breakpointSkeletonConfig.thumbnailAlign;
        }
      }
    },
    { immediate: true, deep: true }
  );

  return {
    showGrid,
    isLoading,
    skeletonCount,
    skeletonHeight,
    skeletonOrientation,
    skeletonThumbnailDisplay,
    skeletonThumbnailAlign,
  };
}
