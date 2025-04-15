<template>

  <KCardGrid
    layout="1-1-1"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <Card
      :headingLevel="3"
      orientation="horizontal"
      thumbnailDisplay="small"
      thumbnailAlign="right"
      prependTitle="(1)"
      hideFooter
    >
      <template #title="{ titleText }">
        <KLabeledIcon icon="readSolid">
          <KTextTruncator
            :text="titleText"
            :maxLines="1"
          />
        </KLabeledIcon>
      </template>
    </Card>
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
            orientation: 'horizontal',
            thumbnailDisplay: 'small',
            thumbnailAlign: 'right',
            height: '130px',
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
