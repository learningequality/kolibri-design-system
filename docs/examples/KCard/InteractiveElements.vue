<template>

  <KCardGrid
    layout="1-1-1"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <Card
      :headingLevel="4"
      :orientation="windowBreakpoint > 2 ? 'horizontal' : 'vertical'"
      thumbnailDisplay="large"
      thumbnailAlign="right"
    >
      <template #footer>
        <KIconButton
          ariaLabel="Bookmark resource"
          :icon="isBookmarked ? 'bookmark' : 'bookmarkEmpty'"
          @click.stop="isBookmarked = !isBookmarked"
        />
      </template>
    </Card>
  </KCardGrid>

</template>


<script>

  import useKResponsiveWindow from '../../../lib/composables/useKResponsiveWindow';

  export default {
    setup() {
      const { windowBreakpoint } = useKResponsiveWindow();
      return { windowBreakpoint };
    },
    data() {
      return {
        isBookmarked: false,
        loading: true,
        skeletonsConfig: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'vertical',
            thumbnailDisplay: 'large',
            height: '460px',
          },
          {
            breakpoints: [2],
            height: '390px',
          },
          {
            breakpoints: [3, 4, 5, 6, 7],
            orientation: 'horizontal',
            thumbnailAlign: 'right',
            height: '170px',
          },
        ],
      };
    },
    mounted() {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  };

</script>
