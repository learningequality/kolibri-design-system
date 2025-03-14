<template>

  <KCardGrid
    layout="1-2-2"
    :loading="loading"
  >
    <DocsKCard
      v-for="i in 2"
      :key="i"
      :orientation="windowBreakpoint < 4 ? 'vertical' : 'horizontal'"
      :headingLevel="4"
    >
      <template #title>
        <div class="title-area">
          <KTextTruncator
            :maxLines="2"
            :text="`(${i}) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities`"
          />
        </div>
      </template>

      <template #media>
        <img
          src="https://via.placeholder.com/400x300?text=Hummingbird"
          alt="Hummingbird on a branch"
          class="hummingbird-img"
        >
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

  import useKResponsiveWindow from '../../../lib/composables/useKResponsiveWindow';

  export default {
    setup() {
      const { windowBreakpoint } = useKResponsiveWindow();
      return { windowBreakpoint };
    },
    data() {
      return {
        loading: true,
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

  .hummingbird-img {
    width: 100%;
    max-width: 200px;
    object-fit: cover;
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