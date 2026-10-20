<template>

  <KCardGrid layout="1-2-3">
    <KCard
      v-for="{ display, align } in thumbnailCombinations"
      :key="`${display}-${align}`"
      :headingLevel="3"
      orientation="horizontal"
      :thumbnailDisplay="display"
      :thumbnailAlign="align"
      :thumbnailSrc="require('../common/hummingbird-large-cc-by-sa-4.jpg')"
      :title="`With thumbnail display: '${display}' and thumbnail align: '${align}'`"
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
          :maxLines="3"
        />
      </template>
      <template #footer>
        <div class="footer-wrapper">
          <div class="pills">
            <span>
              <KIcon
                icon="readSolid"
                :style="{ fontSize: '13px', position: 'relative', top: '3px' }"
              />
              Read
            </span>
            <span>Short Activity</span>
          </div>
        </div>
        <div :style="{ marginTop: '8px' }">
          <KFixedGrid :numCols="4">
            <KFixedGridItem
              :span="3"
              :style="{ paddingTop: '8px' }"
            >
              <KLinearLoader
                type="determinate"
                :progress="20"
              />
            </KFixedGridItem>
            <KFixedGridItem
              :span="1"
              alignment="right"
            >
              <KIcon
                icon="schedule"
                :style="{ fontSize: '18px' }"
              />
            </KFixedGridItem>
          </KFixedGrid>
        </div>
      </template>
    </KCard>
  </KCardGrid>

</template>


<script>

  export default {
    data() {
      return {
        description:
          'Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live.',
        thumbnailCombinations: [
          {
            display: 'none',
            align: 'left',
          },
          {
            display: 'small',
            align: 'left',
          },
          {
            display: 'large',
            align: 'left',
          },
          {
            display: 'none',
            align: 'right',
          },
          {
            display: 'small',
            align: 'right',
          },
          {
            display: 'large',
            align: 'right',
          },
        ],
      };
    },
  };

</script>


<style lang="scss" scoped>

  .footer-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .pills {
    margin-left: -4px;
    color: var(--tokens-annotation);

    span {
      display: inline-block;
      padding: 4px 8px;
      margin: 4px;
      background-color: var(--palette-grey-v100);
      border-radius: 4px;
    }
  }

</style>
