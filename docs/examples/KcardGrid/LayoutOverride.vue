<template>
  <KCardGrid
    layout="1-2-3"
    :layoutOverride="layoutOverride"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <DocsKCard
      v-for="i in 6"
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

      <template #media>
        <img
          src="/api/placeholder/400/300"
          alt="Hummingbird on a branch"
          style="width: 100%; object-fit: cover;"
        />
      </template>

      <template #belowTitle>
        <p>
          Discover how hummingbirds play a big role in nature despite their small size.
          Find out more about their beauty, how they help plants grow, and where they live.
        </p>
      </template>
      <!-- No footer -->
    </DocsKCard>
  </KCardGrid>
</template>

<script>
import DocsKCard from '../../pages-components/DocsKCard.vue';
import KTextTruncator from '../../../lib/KTextTruncator.vue';

export default {
  name: 'LayoutOverrideExample',
  components: {
    DocsKCard,
    KTextTruncator,
  },
  data() {
    return {
      loading: true,
      layoutOverride: [
        {
          breakpoints: [0, 1],
          columnGap: '20px',
          rowGap: '20px',
        },
        {
          breakpoints: [4, 5, 6, 7],
          cardsPerRow: 4,
        },
      ],
      skeletonsConfig: [
        {
          breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
          orientation: 'vertical',
          thumbnailDisplay: 'large',
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









