<template>

  <KCardGrid
    layout="1-2-3"
    :layoutOverride="layoutOverride"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <Card
      v-for="i in 6"
      :key="i"
      :headingLevel="6"
      :prependTitle="`(${i})`"
      hideFooter
    />
  </KCardGrid>

</template>


<script>

  export default {
    data() {
      return {
        loading: true,
        layoutOverride: [
          {
            breakpoints: [0, 1],
            columnGap: '20px',
            rowGap: '20px',
          },
          {
            breakpoints: [4, 5, 6, 7],
            cardsPerRow: 4,
          },
        ],
        skeletonsConfig: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'vertical',
            thumbnailDisplay: 'large',
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
