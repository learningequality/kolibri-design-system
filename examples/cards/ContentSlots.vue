<template>

  <KCardGrid
    layout="1-1-1"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <KCard
      :to="{ path: '#guidelines' }"
      :headingLevel="4"
      :thumbnailSrc="require('../common/hummingbird-large-cc-by-sa-4.jpg')"
      thumbnailDisplay="large"
      :title="title"
    >
      <template #aboveTitle>
        <KLabeledIcon
          icon="readSolid"
          label="Read"
        />
      </template>
      <template #belowTitle>
        <KTextTruncator
          :text="description"
          :maxLines="5"
        />
      </template>
      <template #footer>
        <div class="pills">
          <span> Short Activity </span>
          <span> Biology </span>
        </div>
      </template>
    </KCard>
  </KCardGrid>

</template>


<script>

  export default {
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
        title:
          'Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities',
        description:
          'Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live.',
        skeletonsConfig: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'horizontal',
            thumbnailDisplay: 'large',
            thumbnailAlign: 'left',
            minHeight: '300px',
          },
          {
            breakpoints: [3, 4, 5, 6, 7],
            minHeight: '190px',
          },
        ],
      };
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


<style scoped>

  .pills {
    margin-left: -4px;
    color: var(--tokens-annotation);
  }

  .pills span {
    display: inline-block;
    padding: 4px 8px;
    margin: 4px;
    background-color: var(--palette-grey-v100);
    border-radius: 4px;
  }

</style>
