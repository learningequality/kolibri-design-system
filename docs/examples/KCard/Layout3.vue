<template>

  <KCardGrid
    layout="1-2-3"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <Card
      :headingLevel="4"
      orientation="vertical"
      thumbnailDisplay="none"
      prependTitle="(1)"
    />
    <Card
      :headingLevel="4"
      orientation="vertical"
      thumbnailDisplay="none"
      prependTitle="(2)"
      showProgressInFooter
    >
      <template #footer>
        <span></span>
      </template>
    </Card>
    <Card
      :headingLevel="4"
      orientation="vertical"
      thumbnailDisplay="none"
      prependTitle="(3)"
      showMenuInFooter
    />
  </KCardGrid>

</template>


<script>

  export default {
    data() {
      return {
        loading: true,
        skeletonsConfig: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'vertical',
            thumbnailDisplay: 'large',
            height: '490px',
          },
          {
            breakpoints: [3, 4, 5, 6, 7],
            height: '420px',
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


<style scoped>

  .pills {
    margin-left: -4px;
  }

  .pills span {
    display: inline-block;
    padding: 4px 8px;
    margin: 4px;
    border-radius: 4px;
  }

</style>
