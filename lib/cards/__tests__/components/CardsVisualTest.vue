<template>

  <VisualTestLayout>
    <VisualTestExample
      title="Horizontal layout"
      loadExample="cards/HorizontalLayout.vue"
      :loadFor="0"
    />

    <VisualTestExample
      title="Vertical layout with large thumbnail"
      loadExample="cards/VerticalLayoutLargeThumbnail.vue"
      :loadFor="0"
    />

    <VisualTestExample
      title="Vertical layout without thumbnail"
      loadExample="cards/VerticalLayoutNoThumbnail.vue"
      :loadFor="0"
    />

    <VisualTestExample
      title="Horizontal layout with less content"
      loadExample="cards/HorizontalLayoutLessContent.vue"
    />

    <VisualTestExample
      title="Horizontal layout with more content"
      loadExample="cards/HorizontalLayoutMoreContent.vue"
    />

    <VisualTestExample
      title="Vertical layout with less content"
      loadExample="cards/VerticalLayoutLessContent.vue"
    />

    <VisualTestExample
      title="Vertical layout with more content"
      loadExample="cards/VerticalLayoutMoreContent.vue"
    />

    <VisualTestExample
      title="Customized title"
      loadExample="cards/Title.vue"
      :loadFor="0"
    />

    <VisualTestExample
      title="Content provided via slots"
      loadExample="cards/ContentSlots.vue"
      :loadFor="0"
    />

    <VisualTestExample
      title="Thumbnail slot with 16:9 KImg, small thumbnail area, horizontal orientation"
      loadExample="cards/ThumbnailSlotSmallHorizontal.vue"
    />

    <VisualTestExample
      title="Thumbnail slot with 16:9 KImg, large thumbnail area, horizontal orientation"
      loadExample="cards/ThumbnailSlotLargeHorizontal.vue"
    />

    <VisualTestExample
      title="Thumbnail slot with 16:9 KImg, small thumbnail area, vertical orientation"
      loadExample="cards/ThumbnailSlotSmallVertical.vue"
    />

    <VisualTestExample
      title="Thumbnail slot with 16:9 KImg, large thumbnail area, vertical orientation"
      loadExample="cards/ThumbnailSlotLargeVertical.vue"
    />

    <VisualTestExample
      title="Thumbnail placeholder"
      loadExample="cards/Placeholder.vue"
      :loadFor="0"
    />

    <VisualTestExample
      title="Interactive elements"
      loadExample="cards/InteractiveElements.vue"
      :loadFor="0"
    />

    <VisualTestExample
      title="Selection controls"
      loadExample="cards/SelectionControls.vue"
      :loadFor="0"
    />

    <VisualTestExample
      title="Grid 1-1-1"
      loadExample="cards/Grid111.vue"
      :loadFor="0"
    />

    <VisualTestExample
      title="Grid 1-2-2"
      loadExample="cards/Grid122.vue"
      :loadFor="0"
    />

    <VisualTestExample
      title="Grid 1-2-3"
      loadExample="cards/Grid123.vue"
      :loadFor="0"
    />

    <VisualTestExample
      title="Content tolerance and consistent alignment of card sections on a grid row"
      loadExample="cards/HeightAndAlignment.vue"
      :loadFor="0"
    />

    <VisualTestExample
      title="Overridden grid layout"
      loadExample="cards/LayoutOverride.vue"
      :loadFor="0"
    />

    <VisualTestExample
      title="Loading state for horizontal cards"
      loadExample="cards/Grid111.vue"
      width="800px"
      :loadFor="30"
    />

    <VisualTestExample
      title="Loading state for vertical cards"
      loadExample="cards/Grid122.vue"
      width="800px"
      :loadFor="30"
    />
  </VisualTestLayout>

</template>
