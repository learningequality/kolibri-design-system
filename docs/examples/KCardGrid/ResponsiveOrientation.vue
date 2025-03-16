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
        <div :style="{ height: '52px' }">
          <KTextTruncator
            :maxLines="2"
            :text="`(${i}) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities`"
          />
        </div>
      </template>

      <template #media>
        <img
          src="/api/placeholder/400/300"
          alt="Hummingbird on a branch"
          style="width: 100%; max-width: 200px; object-fit: cover"
        >
      </template>

      <template #belowTitle>
        <p>
          Discover how hummingbirds play a big role in nature despite their small size. Find out
          more about their beauty, how they help plants grow, and where they live.
        </p>
      </template>

      <template #footer>
        <span class="pill">
          <KIcon icon="readSolid" />
          Read
        </span>
        <span class="pill">Short Activity</span>
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

  .pill {
    display: inline-flex;
    padding: 4px 8px;
    margin-right: 8px;
    color: #616161;
    background-color: #dddddd;
    border-radius: 4px;
  }

</style>
