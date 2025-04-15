<template>

  <KCardGrid
    layout="1-2-3"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <Card
      :headingLevel="4"
      orientation="vertical"
      thumbnailDisplay="large"
      prependTitle="(1)"
    >
      <template #aboveTitle>
        <KLabeledIcon
          icon="readSolid"
          label="Read"
        />
      </template>
      <template #footer>
        <div
          class="pills"
          :style="{ color: $themeTokens.annotation }"
        >
          <span :style="{ 'background-color': $themePalette.grey.v_100 }"> Short Activity </span>
          <span :style="{ 'background-color': $themePalette.grey.v_100 }"> Biology </span>
        </div>
      </template>
    </Card>
    <Card
      :headingLevel="4"
      orientation="vertical"
      thumbnailDisplay="large"
      :thumbnailSrc="null"
      prependTitle="(2)"
    >
      <template #aboveTitle>
        <KLabeledIcon
          icon="readSolid"
          label="Read"
        />
      </template>
      <template #footer>
        <div
          class="pills"
          :style="{ color: $themeTokens.annotation }"
        >
          <span :style="{ 'background-color': $themePalette.grey.v_100 }"> Short Activity </span>
        </div>
      </template>
    </Card>
    <Card
      :headingLevel="4"
      orientation="vertical"
      thumbnailDisplay="small"
      prependTitle="(3)"
      hideFooter
    >
      <template #aboveTitle>
        <KLabeledIcon
          icon="readSolid"
          label="Read"
        />
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
