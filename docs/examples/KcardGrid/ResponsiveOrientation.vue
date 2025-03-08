<template>
  <KCardGrid layout="1-2-2" :loading="loading">
    <DocsKCard
      v-for="i in 2"
      :key="i"
      :orientation="windowBreakpoint < 4 ? 'vertical' : 'horizontal'"
      :headingLevel="4"
    >
      <template #title>
        <div style="height: 52px;">
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
          style="width: 100%; max-width: 200px; object-fit: cover;"
        />
      </template>

      <template #belowTitle>
        <p>
          Discover how hummingbirds play a big role in nature despite their small size.
          Find out more about their beauty, how they help plants grow, and where they live.
        </p>
      </template>

      <template #footer>
        <div style="margin-top: 10px;">
          <span
            style="
              background-color: #ddd;
              color: #616161;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 14px;
              margin-right: 8px;
            "
          >
            <KIcon icon="readSolid" style="font-size: 13px; position: relative; top: 2px; margin-right: 4px;" />
            Read
          </span>
          <span style="color: #616161; font-size: 14px;">
            Short Activity
          </span>
        </div>
      </template>
    </DocsKCard>
  </KCardGrid>
</template>

<script>
import useKResponsiveWindow from '../../../lib/composables/useKResponsiveWindow';
import DocsKCard from '../../pages-components/DocsKCard.vue';
import KTextTruncator from '../../../lib/KTextTruncator.vue';
import KIcon from '../../../lib/KIcon/index.vue';

export default {
  name: 'ResponsiveOrientationExample',
  components: {
    DocsKCard,
    KTextTruncator,
    KIcon,
  },
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







