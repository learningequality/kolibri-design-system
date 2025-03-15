<template>

  <KCardGrid
    layout="1-2-2"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <DocsKCard
      v-for="i in 2"
      :key="i"
      :headingLevel="4"
      orientation="vertical"
    >
      <template #title>
        <div :style="{ height: '52px' }">
          <KTextTruncator
            :maxLines="2"
            :text="`(${i}) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities`"
          />
        </div>
      </template>

      <template #footer>
        <div class="footer-container">
          <span class="read-pill">
            <KIcon
              icon="readSolid"
              :style="{ position: 'relative', top: '2px', marginRight: '4px', fontSize: '13px' }"
            />
            Read
          </span>
          <span class="activity-pill">Short Activity</span>
          <template v-if="windowBreakpoint > 3">
            <span class="biology-pill">Biology</span>
            <span class="ecology-pill">Ecology</span>
          </template>
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
        skeletonsConfig: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'vertical',
            thumbnailDisplay: 'large',
            height: '430px',
          },
          {
            breakpoints: [4, 5, 6, 7],
            height: '370px',
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

  .footer-container {
    margin-top: 10px;
  }

  .read-pill,
  .activity-pill,
  .biology-pill,
  .ecology-pill {
    padding: 4px 8px;
    margin-right: 8px;
    font-size: 14px;
    color: #616161;
    background-color: #dddddd;
    border-radius: 4px;
  }

  .ecology-pill {
    margin-right: 0; /* Remove margin for the last pill */
  }

</style>
