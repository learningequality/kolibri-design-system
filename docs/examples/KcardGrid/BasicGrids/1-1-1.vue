<template>
  <KCardGrid layout="1-1-1">
    <DocsKCard
      v-for="i in 2"
      :key="i"
      :headingLevel="5"
      orientation="horizontal"
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
          style="width: 100%; max-width: 250px; object-fit: cover;"
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
import DocsKCard from '../../../pages-components/DocsKCard.vue';
import KIcon from '../../../../lib/KIcon/index.vue';
import KTextTruncator from '../../../../lib/KTextTruncator.vue';

export default {
  name: 'Grid111Example',
  components: {
    DocsKCard,
    KIcon,
    KTextTruncator,
  },
};
</script>







