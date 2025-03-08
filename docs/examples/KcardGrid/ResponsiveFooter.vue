<template>
  <KCardGrid layout="1-2-2" :skeletonsConfig="skeletonsConfig" :loading="loading">
    <DocsKCard
      v-for="i in 2"
      :key="i"
      :headingLevel="4"
      orientation="vertical"
    >
      <template #title>
        <div style="height: 52px;">
          <KTextTruncator
            :maxLines="2"
            :text="`(${i}) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities`"
          />
        </div>
      </template>

      <template #footer>
        <div style="margin-top: 10px;">
          <span
            style="
              background-color: #ddd;
              color: #616161;
              padding: 4px 8px;
              margin-right: 8px;
              border-radius: 4px;
            "
          >
            <KIcon icon="readSolid" style="font-size: 13px; position: relative; top: 2px; margin-right: 4px;" />
            Read
          </span>
          <span
            style="
              background-color: #ddd;
              padding: 4px 8px;
              margin-right: 8px;
              border-radius: 4px;
              color: #616161;
              font-size: 14px;
            "
          >
            Short Activity
          </span>
          <template v-if="windowBreakpoint > 3">
            <span
              style="
                background-color: #ddd;
                padding: 4px 8px;
                margin-right: 8px;
                border-radius: 4px;
                color: #616161;
                font-size: 14px;
              "
            >
              Biology
            </span>
            <span
              style="
                background-color: #ddd;
                padding: 4px 8px;
                border-radius: 4px;
                color: #616161;
                font-size: 14px;
              "
            >
              Ecology
            </span>
          </template>
        </div>
      </template>
    </DocsKCard>
  </KCardGrid>
</template>

<script>
import useKResponsiveWindow from '../../../lib/composables/useKResponsiveWindow';
import DocsKCard from '../../pages-components/DocsKCard.vue';
import KIcon from '../../../lib/KIcon/index.vue';
import KTextTruncator from '../../../lib/KTextTruncator.vue';

export default {
  name: 'ResponsiveFooterExample',
  components: {
    DocsKCard,
    KIcon,
    KTextTruncator,
  },
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


  