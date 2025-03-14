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
        <div class="title-area">
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
        <div class="footer-container">
          <span class="read-badge">
            <KIcon
              icon="readSolid"
              class="icon-adjust"
            />
            Read
          </span>
          <span class="short-activity">Short Activity</span>
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

  .title-area {
    height: 52px;
  }

  .footer-container {
    margin-top: 10px;
  }

  .read-badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 8px;
    margin-right: 8px;
    font-size: 14px;
    color: #616161;
    background-color: #dddddd;
    border-radius: 4px;
  }

  .icon-adjust {
    position: relative;
    top: 2px;
    margin-right: 4px;
    font-size: 13px;
  }

  .short-activity {
    font-size: 14px;
    color: #616161;
  }

</style>