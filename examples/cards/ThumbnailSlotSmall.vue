<template>

  <div>
    <ThumbnailSlotSmallHorizontal v-if="windowBreakpoint > 2" />
    <ThumbnailSlotSmallVertical v-else />
  </div>

</template>


<script>

  import useKResponsiveWindow from '../../lib/composables/useKResponsiveWindow';
  import ThumbnailSlotSmallHorizontal from './ThumbnailSlotSmallHorizontal.vue';
  import ThumbnailSlotSmallVertical from './ThumbnailSlotSmallVertical.vue';

  export default {
    components: {
      ThumbnailSlotSmallHorizontal,
      ThumbnailSlotSmallVertical,
    },
    setup() {
      const { windowBreakpoint } = useKResponsiveWindow();
      return { windowBreakpoint };
    },
  };

</script>
