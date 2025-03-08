<template>

  <KCardGrid
    layout="1-2-3"
    :loading="loading"
  >
    <!-- Card 1 -->
    <DocsKCard
      :headingLevel="4"
      preserveAboveTitle
    >
      <template #aboveTitle>
        <div style="height: 24px">
          <KLabeledIcon
            icon="readSolid"
            label="Read"
          />
        </div>
      </template>
      <template #title>
        <div style="height: 52px">
          <KTextTruncator
            :maxLines="2"
            text="(1) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities"
          />
        </div>
      </template>
      <template #belowTitle>
        <KTextTruncator
          :maxLines="4"
          text="Short description"
        />
      </template>
      <template #footer>
        <div style="margin-top: 10px; color: #616161">
          <span
            style="
  padding: 4px 8px;
  margin-right: 8px;
  background-color: #dddddd;
  border-radius: 4px;
            "
          >
            Biology
          </span>
          <span style="padding: 4px 8px; background-color: #dddddd; border-radius: 4px">
            Short Activity
          </span>
        </div>
      </template>
    </DocsKCard>

    <!-- Card 2 -->
    <DocsKCard
      :headingLevel="4"
      preserveAboveTitle
    >
      <template #aboveTitle>
        <div style="height: 24px">
          <KLabeledIcon
            icon="readSolid"
            label="Read"
          />
        </div>
      </template>
      <template #title>
        <div style="height: 52px">
          <KTextTruncator
            :maxLines="2"
            text="(2) Short title"
          />
        </div>
      </template>
      <template #belowTitle>
        <KTextTruncator
          :maxLines="4"
          text="Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live."
        />
      </template>
      <template #footer>
        <div style="margin-top: 10px"></div>
      </template>
    </DocsKCard>

    <!-- Card 3 -->
    <DocsKCard
      :headingLevel="4"
      preserveAboveTitle
    >
      <template #aboveTitle>
        <div style="height: 24px"></div>
      </template>
      <template #title>
        <div style="height: 52px">
          <KTextTruncator
            :maxLines="2"
            text="(3) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities"
          />
        </div>
      </template>
      <template #belowTitle>
        <KTextTruncator
          :maxLines="4"
          text="Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live."
        />
      </template>
      <template #footer>
        <div style="margin-top: 10px; color: #616161">
          <span
            style="
  padding: 4px 8px;
  margin-right: 8px;
  background-color: #dddddd;
  border-radius: 4px;
            "
          >
            Short Activity
          </span>
          <span style="padding: 4px 8px; background-color: #dddddd; border-radius: 4px">
            Biology
          </span>
        </div>
      </template>
    </DocsKCard>
  </KCardGrid>

</template>


<script>

  import KLabeledIcon from '../../../lib/KLabeledIcon.vue';
  import KTextTruncator from '../../../lib/KTextTruncator.vue';
  import DocsKCard from '../../pages-components/DocsKCard.vue';

  export default {
    name: 'CardHeightAlignmentExample',
    components: { KLabeledIcon, KTextTruncator, DocsKCard },
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
