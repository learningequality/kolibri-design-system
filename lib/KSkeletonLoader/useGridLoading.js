import { ref, watch } from '@vue/composition-api';

import useGridLayout from '../cards/useGridLayout';
import { getBreakpointConfig } from '../cards/utils';

const DEFAULT_SKELETON = {
  count: undefined, // default determined by the grid layout and the current breakpoint
  height: '200px',
  orientation: 'horizontal',
  thumbnailDisplay: 'none',
  thumbnailAlign: 'left',
};

export default function useGridLoading(skeletonsConfig, layout, layoutOverride) {
  const { currentBreakpointConfig, windowBreakpoint } = useGridLayout(layout, layoutOverride);

  const skeletonCount = ref(DEFAULT_SKELETON.count);
  const skeletonHeight = ref(DEFAULT_SKELETON.height);
  const skeletonOrientation = ref(DEFAULT_SKELETON.orientation);
  const skeletonThumbnailDisplay = ref(DEFAULT_SKELETON.thumbnailDisplay);
  const skeletonThumbnailAlign = ref(DEFAULT_SKELETON.thumbnailAlign);

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
    skeletonCount,
    skeletonHeight,
    skeletonOrientation,
    skeletonThumbnailDisplay,
    skeletonThumbnailAlign,
  };
}
