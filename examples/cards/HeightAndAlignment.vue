<template>

  <KCardGrid
    layout="1-2-3"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <Card
      :headingLevel="4"
      preserveAboveTitle
    >
      <template #aboveTitle>
        <div :style="{ height: '24px' }">
          <KLabeledIcon
            icon="readSolid"
            label="Read"
          />
        </div>
      </template>
      <template #title>
        <div :style="{ height: '52px' }">
          <KTextTruncator
            :maxLines="2"
            :text="title1"
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
        <div
          class="pills"
          :style="{ color: $themeTokens.annotation }"
        >
          <span
            v-for="(pill, i) in slicedPills"
            :key="i"
            :style="{ 'background-color': $themePalette.grey.v_100 }"
          >
            {{ pill }}
          </span>
        </div>
      </template>
    </Card>

    <Card
      :headingLevel="4"
      preserveAboveTitle
    >
      <template #aboveTitle>
        <div :style="{ height: '24px' }">
          <KLabeledIcon
            icon="readSolid"
            label="Read"
          />
        </div>
      </template>
      <template #title>
        <div :style="{ height: '52px' }">
          <KTextTruncator
            :maxLines="2"
            :text="title2"
          />
        </div>
      </template>
      <template #belowTitle>
        <KTextTruncator
          :maxLines="4"
          :text="description"
        />
      </template>
      <template #footer>
        <div></div>
      </template>
    </Card>

    <Card
      :headingLevel="4"
      preserveAboveTitle
    >
      <template #aboveTitle>
        <div :style="{ height: '24px' }"></div>
      </template>
      <template #title>
        <div :style="{ height: '52px' }">
          <KTextTruncator
            :maxLines="2"
            :text="title3"
          />
        </div>
      </template>
      <template #belowTitle>
        <KTextTruncator
          :maxLines="4"
          :text="description"
        />
      </template>
      <template #footer>
        <div
          class="pills"
          :style="{ color: $themeTokens.annotation }"
        >
          <span
            v-for="(pill, i) in slicedPills"
            :key="i"
            :style="{ 'background-color': $themePalette.grey.v_100 }"
          >
            {{ pill }}
          </span>
        </div>
      </template>
    </Card>
  </KCardGrid>

</template>


<script>

  import Card from './Card';

  export default {
    components: {
      Card,
    },
    props: {
      /**
       * How long in seconds to simulate loading
       * state before displaying cards
       */
      loadFor: {
        type: Number,
        default: 3,
      },
    },
    data() {
      return {
        loading: this.loadFor > 0,
        title1:
          '(1) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities',
        title2: '(2) Short title',
        title3:
          '(3) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities',
        description:
          'Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live.',
        skeletonsConfig: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            minHeight: '380px',
            orientation: 'vertical',
            thumbnailDisplay: 'large',
          },
        ],
      };
    },
    computed: {
      slicedPills() {
        return ['Short Activity', 'Biology', 'Ecology', 'Ornithology'].slice(0, 2);
      },
    },
    mounted() {
      if (this.loadFor > 0) {
        setTimeout(() => {
          this.loading = false;
        }, this.loadFor * 1000);
      }
    },
  };

</script>


<style lang="scss" scoped>

  .pills {
    margin-left: -4px;

    span {
      display: inline-block;
      padding: 4px 8px;
      margin: 4px;
      border-radius: 4px;
    }
  }

</style>
