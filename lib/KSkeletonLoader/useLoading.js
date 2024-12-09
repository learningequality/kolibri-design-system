import Vue from 'vue';
import { ref, watch, onMounted, toRefs, computed } from '@vue/composition-api';

import useGridLoading from './useGridLoading';

// The skeleton loaders will be displayed after `LOADING_DELAY`
// for a duration of `MIN_LOADING_TIME`
// (https://www.nngroup.com/articles/skeleton-screens/)
const LOADING_DELAY = 1000;
const MIN_LOADING_TIME = 1000;

export default function useLoading(props) {
  const { loading, appearance, config } = toRefs(props);

  let grid = {};

  if (appearance.value === 'cardGrid') {
    const skeletonsConfig = computed(() => config.value.skeletonsConfig);
    const layout = computed(() => config.value.layout);
    const layoutOverride = computed(() => config.value.layoutOverride);

    const {
      skeletonCount,
      skeletonHeight,
      skeletonOrientation,
      skeletonThumbnailDisplay,
      skeletonThumbnailAlign,
    } = useGridLoading(skeletonsConfig, layout, layoutOverride);

    grid = computed(() => {
      return {
        layout: layout.value,
        layoutOverride: layoutOverride.value,
        skeletonCount: skeletonCount.value,
        skeletonHeight: skeletonHeight.value,
        skeletonOrientation: skeletonOrientation.value,
        skeletonThumbnailDisplay: skeletonThumbnailDisplay.value,
        skeletonThumbnailAlign: skeletonThumbnailAlign.value,
      };
    });
  }

  const isLoading = ref(false);
  const finishedMounting = ref(false);
  const isLoadingDelayActive = ref(false);
  let loadingDelayTimeout = null;
  let loadingStartTime = null;
  let loadingElapsedTime = null;
  let remainingLoadingTime = 0;

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

  // Used by `KSkeletonLoader` to prevent jarring UX:
  // - (1) prevents flashes of unstyled content during the mouning stage
  // - (2) prevents uncomplete components from being displayed during the loading delay period
  const show = computed(() => {
    return finishedMounting.value && !isLoadingDelayActive.value;
  });

  onMounted(() => {
    Vue.nextTick(() => {
      finishedMounting.value = true;
    });
  });

  return {
    show,
    isLoading,
    grid,
  };
}
