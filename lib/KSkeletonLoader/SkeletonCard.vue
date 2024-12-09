<template>

  <!--
    Required props set to avoid console validation errors.
    Their logic is disabled in skeleton mode.
  -->
  <KCard
    :headingLevel="2"
    isSkeleton
    aria-hidden="true"
    class="skeleton-card"
    title="_"
    :style="{ height: height }"
    :orientation="orientation"
    :thumbnailDisplay="thumbnailDisplay"
    :thumbnailAlign="thumbnailAlign"
  >
    <template #title>
      <span
        class="title-placeholder"
        :style="{ backgroundColor: $themePalette.grey.v_100 }"
      >
      </span>
    </template>
    <template #belowTitle>
      <span
        class="below-title-placeholder"
        :style="{ backgroundColor: $themePalette.grey.v_100 }"
      >
      </span>
    </template>
  </kcard>

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
       * Card height
       */
      height: {
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

  .title-placeholder,
  .below-title-placeholder {
    display: inline-block;
    height: 28px;
    border-radius: 4px;
  }

  .title-placeholder {
    width: 100%;
  }

  .below-title-placeholder {
    width: 80%;
  }

  .skeleton-card {
    @extend %dropshadow-2dp; // need to re-apply dropshadow because of `oveflow: hidden`

    position: relative;
    overflow: hidden; // contain animation style within card area
    border-radius: 0.5em; // prevents sharp corner, should match inner card area border radius in KCard
  }

  .skeleton-card::before {
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