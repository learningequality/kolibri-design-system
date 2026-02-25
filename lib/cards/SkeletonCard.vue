<template>

  <!--
    Required props set to avoid console validation errors.
    Their logic is disabled in skeleton mode.
  -->
  <KCard
    :headingLevel="2"
    isSkeleton
    aria-hidden="true"
    class="k-skeleton-card"
    title="_"
    :style="{ minHeight: minHeight }"
    :orientation="orientation"
    :thumbnailDisplay="thumbnailDisplay"
    :thumbnailAlign="thumbnailAlign"
  >
    <template
      v-if="thumbnailAspectRatio"
      #thumbnail
    >
      <KImg
        :style="{ width: '100%', height: '100%' }"
        :aspectRatio="thumbnailAspectRatio"
        isDecorative
      />
    </template>
    <template #title>
      <span
        class="k-title-placeholder"
        :style="{ backgroundColor: $themePalette.grey.v_100 }"
      >
      </span>
    </template>
    <template #belowTitle>
      <span
        class="k-below-title-placeholder"
        :style="{ backgroundColor: $themePalette.grey.v_100 }"
      >
      </span>
    </template>
  </KCard>

</template>


<script>

  /**
   * Loading skeleton card
   *
   * Uses `KCard` under the hood to achieve
   * as similar layout as possible
   */
  export default {
    name: 'SkeletonCard',
    props: {
      /**
       * Card minimum height
       */
      minHeight: {
        required: false,
        type: String,
        default: '300px',
      },
      /**
       * Same as `KCard`'s `orientation`
       */
      orientation: {
        required: false,
        type: String,
        default: 'horizontal',
      },
      /**
       * Same as `KCard`'s `thumbnailDisplay`
       */
      thumbnailDisplay: {
        required: false,
        type: String,
        default: 'none',
      },
      /**
       * Same as `KCard`'s `thumbnailAlign`
       */
      thumbnailAlign: {
        required: false,
        type: String,
        default: 'left',
      },
      /**
       * Thumbnail area aspect ratio
       */
      thumbnailAspectRatio: {
        required: false,
        type: String,
        default: null,
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '../styles/definitions';

  @keyframes loading {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(100%);
    }
  }

  .k-title-placeholder,
  .k-below-title-placeholder {
    display: inline-block;
    height: 28px;
    border-radius: 4px;
  }

  .k-title-placeholder {
    width: 100%;
  }

  .k-below-title-placeholder {
    width: 80%;
  }

  .k-skeleton-card {
    @extend %dropshadow-2dp; // need to re-apply dropshadow because of `oveflow: hidden`

    position: relative;
    // contain animation style within card area
    overflow: hidden;
    // prevents sharp corner, should match inner card area border radius in KCard
    border-radius: 0.5em;
  }

  .k-skeleton-card::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    content: '';
    background: linear-gradient(270deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%);
    animation: loading 1.5s infinite ease-in-out;
  }

</style>
