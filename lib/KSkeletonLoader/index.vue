<template>

  <div v-if="show">
    <template v-if="appearance === 'generic'">
      <transition name="fade" mode="out-in" appear>
        <SkeletonGeneric
          v-if="isLoading"
          key="loading"
        />
        <div
          v-else
          key="loaded"
        >
          <slot></slot>
        </div>
      </transition>
    </template>

    <template v-else-if="appearance === 'cardGrid'">
      <transition name="fade" mode="out-in" appear>
        <KCardGrid
          v-if="isLoading"
          key="loading"
          :layout="grid.layout"
          :layoutOverride="grid.layoutOverride"
        >
          <SkeletonCard
            v-for="i in grid.skeletonCount"
            :key="i"
            :height="grid.skeletonHeight"
            :orientation="grid.skeletonOrientation"
            :thumbnailDisplay="grid.skeletonThumbnailDisplay"
            :thumbnailAlign="grid.skeletonThumbnailAlign"
          />
        </KCardGrid>
        <div
          v-else
          key="loaded"
        >
          <slot></slot>
        </div>
      </transition>
    </template>

    <template v-else-if="appearance === 'custom'">
      <transition name="fade" mode="out-in" appear>
        <div
          v-if="isLoading"
          key="loading"
        >
          <SkeletonCustom>
            <slot name="skeleton"></slot>
          </SkeletonCustom>
        </div>
        <div
          v-else
          key="loaded"
        >

          <slot></slot>
        </div>
      </transition>
    </template>
  </div>

</template>


<script>

  import SkeletonCard from './SkeletonCard';
  import SkeletonGeneric from './SkeletonGeneric';
  import SkeletonCustom from './SkeletonCustom';
  import useLoading from './useLoading';

  export default {
    name: 'KSkeletonLoader',
    components: {
      SkeletonCard,
      SkeletonCustom,
      SkeletonGeneric,
    },
    setup(props) {
      const { show, isLoading, grid } = useLoading(props);

      return {
        show,
        isLoading,
        grid,
      };
    },
    props: {
      // eslint-disable-next-line kolibri/vue-no-unused-properties
      loading: {
        type: Boolean,
        required: false,
        default: false,
      },
      // eslint-enable-next-line kolibri/vue-no-unused-properties
      // 'generic', 'cardGrid', 'custom'
      appearance: {
        required: false,
        type: String,
        default: 'generic',
      },
      // for grid: { `layout`, `layoutOverride`, `skeletonsConfig` }
      // eslint-disable-next-line kolibri/vue-no-unused-properties
      config: {
        type: Object,
        required: false,
        default: null,
      },
      // eslint-enable-next-line kolibri/vue-no-unused-properties
    },
  };

</script>


<style lang="scss" scoped>

  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-active,
  .fade-appear-active {
    transition: opacity 0.5s ease;
  }

  .fade-leave-to {
    opacity: 0.2;
  }

  .fade-enter,
  .fade-appear {
    opacity: 0;
  }

</style>
