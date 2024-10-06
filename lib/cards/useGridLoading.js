import Vue from 'vue';
import { ref, watch, onMounted, toRefs } from '@vue/composition-api';

import useKResponsiveWindow from '../composables/useKResponsiveWindow';
import { getBreakpointConfig } from './utils';

// Loading state lasts for at least this duration.
const MIN_LOADING_TIME = 2000;

const DEFAULT_SKELETON = {
  count: 3,
  height: '200px',
  orientation: 'horizontal',
  thumbnailDisplay: 'none',
  thumbnailAlign: 'left',
};

/**
 * Manages `KCardGrid`'s loading state
 */
export default function useGridLoading(props) {
  const { loading, skeletonsConfig } = toRefs(props);
  const { windowBreakpoint } = useKResponsiveWindow();

  const skeletonCount = ref(DEFAULT_SKELETON.count);
  const skeletonHeight = ref(DEFAULT_SKELETON.height);
  const skeletonOrientation = ref(DEFAULT_SKELETON.orientation);
  const skeletonThumbnailDisplay = ref(DEFAULT_SKELETON.thumbnailDisplay);
  const skeletonThumbnailAlign = ref(DEFAULT_SKELETON.thumbnailAlign);

  // Used by `KCardGrid` to prevent flashes of unstyled content
  const finishedMounting = ref(false);
  onMounted(() => {
    Vue.nextTick(() => {
      finishedMounting.value = true;
    });
  });

  // Handles `KCardGrid`'s `loading` prop changes and returns
  // final `isLoading` state to be used by `KCardGrid`.
  //
  // After loading started, `isLoading` ensures that
  // loading state is truthy for at least `MIN_LOADING_TIME`
  // to avoid unexpected flashes during the transition.
  let loadingStartTime = null;
  let loadingElapsedTime = null;
  let remainingLoadingTime = 0;
  const isLoading = ref(false);

  watch(
    [loading, finishedMounting],
    ([newLoading, newFinishedMounting]) => {
      if (newLoading === true) {
        loadingStartTime = Date.now();
        isLoading.value = true;
      }

      if (newFinishedMounting && loadingStartTime) {
        // if loading was started before mounting,
        // move loading start time forward to
        // ensure that minimum loading time is respected
        loadingStartTime = Date.now();

        if (newLoading === false) {
          loadingElapsedTime = Date.now() - loadingStartTime;

          if (loadingElapsedTime < MIN_LOADING_TIME) {
            remainingLoadingTime = MIN_LOADING_TIME - loadingElapsedTime;
          } else {
            remainingLoadingTime = 0;
          }

          setTimeout(() => {
            loadingStartTime = null;
            isLoading.value = false;
          }, remainingLoadingTime);
        }
      }
    },
    { immediate: true }
  );

  // Updates the loading skeleton configuration
  //for the current breakpoint
  watch(
    [windowBreakpoint, skeletonsConfig],
    ([newBreakpoint]) => {
      const breakpointSkeletonconfig = getBreakpointConfig(skeletonsConfig.value, newBreakpoint);
      if (breakpointSkeletonconfig) {
        if (breakpointSkeletonconfig.count) {
          skeletonCount.value = breakpointSkeletonconfig.count;
        }
        if (breakpointSkeletonconfig.height) {
          skeletonHeight.value = breakpointSkeletonconfig.height;
        }
        if (breakpointSkeletonconfig.orientation) {
          skeletonOrientation.value = breakpointSkeletonconfig.orientation;
        }
        if (breakpointSkeletonconfig.thumbnailDisplay) {
          skeletonThumbnailDisplay.value = breakpointSkeletonconfig.thumbnailDisplay;
        }
        if (breakpointSkeletonconfig.thumbnailAlign) {
          skeletonThumbnailAlign.value = breakpointSkeletonconfig.thumbnailAlign;
        }
      }
    },
    { immediate: true, deep: true }
  );

  return {
    finishedMounting,
    isLoading,
    skeletonCount,
    skeletonHeight,
    skeletonOrientation,
    skeletonThumbnailDisplay,
    skeletonThumbnailAlign,
  };
}
