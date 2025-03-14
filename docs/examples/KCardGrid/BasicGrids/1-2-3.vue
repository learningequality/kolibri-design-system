<template>
  <KCardGrid
    layout="1-2-3"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <DocsKCard
      v-for="i in 5"
      :key="i"
      :headingLevel="5"
      orientation="vertical"
    >
      <template #title>
        <div class="titleArea">
          <KTextTruncator
            :maxLines="2"
            :text="`(${i}) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities`"
          />
        </div>
      </template>

      <template #belowTitle>
        <p>
          Discover how hummingbirds play a big role in nature despite their small size. Find out
          more about their beauty, how they help plants grow, and where they live.
        </p>
      </template>

      <template #footer>
        <div class="footerContainer">
          <span class="readBadge">
            <KIcon icon="readSolid" class="iconAdjust" />
            Read
          </span>
          <span class="shortActivity">Short Activity</span>
        </div>
      </template>
    </DocsKCard>
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
          height: '470px',
        },
        {
          breakpoints: [2, 3],
          height: '430px',
        },
        {
          breakpoints: [4, 5, 6, 7],
          height: '390px',
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
.titleArea {
  height: 52px;
}
.footerContainer {
  margin-top: 10px;
}
.readBadge {
  padding: 4px 8px;
  margin-right: 8px;
  font-size: 14px;
  color: #616161;
  background-color: #dddddd;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
}
.iconAdjust {
  position: relative;
  top: 2px;
  margin-right: 4px;
  font-size: 13px;
}
.shortActivity {
  font-size: 14px;
  color: #616161;
}
</style>