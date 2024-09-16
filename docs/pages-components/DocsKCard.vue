<template>

  <KCard
    :to="{ path: '/test-url' }"
    :headingLevel="headingLevel"
    :orientation="orientation"
    :thumbnailDisplay="thumbnailDisplay"
    :thumbnailAlign="thumbnailAlign"
    :thumbnailSrc="thumbnailSrc === null ? null : require('../assets/hummingbird-large-cc-by-sa-4.jpg')"
    :title="cardTitle"
  >

    <template v-if="$slots.thumbnailPlaceholder" #thumbnailPlaceholder>
      <slot name="thumbnailPlaceholder"></slot>
    </template>
    <template v-else #thumbnailPlaceholder>
      <span :style="{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }">
        <KIcon
          :style="{ fontSize: '48px' }"
          icon="readSolid"
          :color="$themePalette.grey.v_800"
        />
      </span>
    </template>

    <template v-if="$slots.aboveTitle" #aboveTitle>
      <slot name="aboveTitle"></slot>
    </template>

    <template v-if="$slots.title" #title>
      <slot name="title"></slot>
    </template>

    <template v-if="$slots.belowTitle" #belowTitle>
      <slot name="belowTitle"></slot>
    </template>
    <template v-else #belowTitle>
      <KTextTruncator
        text="Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live."
        :maxLines="5"
      />
    </template>

    <template v-if="$slots.footer && !hideFooter" #footer>
      <slot name="footer"></slot>
    </template>
    <template v-else-if="!hideFooter" #footer>
      <div class="footer-wrapper">
        <div class="pills">
          <span
            :style="{ 'background-color': $themePalette.grey.v_50 }"
          >
            <KIcon icon="readSolid" :style="{ fontSize: '14px' }" />
            Read
          </span>
          <span
            v-if="!showMenuInFooter"
            :style="{ 'background-color': $themePalette.grey.v_50 }"
          >
            Short Activity
          </span>
        </div>
        <KIconButton
          v-if="showMenuInFooter"
          icon="optionsVertical"
          @click.stop
        />
      </div>
      <div
        v-if="showProgressInFooter"
        :style="{ marginTop: '8px' }"
      >
        <KFixedGrid :numCols="4">
          <KFixedGridItem :span="3" :style="{ paddingTop: '8px' }">
            <KLinearLoader
              type="determinate"
              :progress="20"
            />
          </KFixedGridItem>
          <KFixedGridItem :span="1" alignment="right">
            <KIcon icon="schedule" :style="{ fontSize: '18px' }" />
          </KFixedGridItem>
        </KFixedGrid>
      </div>
    </template>
  </KCard>

</template>


<script>

  export default {
    name: 'DocsKCard',
    props: {
      title: {
        required: false,
        type: String,
        default: null,
      },
      headingLevel: {
        required: true,
        type: Number,
      },
      thumbnailSrc: {
        required: false,
        type: String,
        default: undefined,
      },
      orientation: {
        required: false,
        type: String,
        default: 'vertical',
      },
      thumbnailAlign: {
        required: false,
        type: String,
        default: 'left',
      },
      thumbnailDisplay: {
        required: false,
        type: String,
        default: 'large',
      },
      // for making card titles unique
      // which is important when live examples
      // are used for QA with screen readers
      prependTitle: {
        required: false,
        type: String,
        default: '',
      },
      hideFooter: {
        required: false,
        type: Boolean,
        default: false,
      },
      showProgressInFooter: {
        required: false,
        type: Boolean,
        default: false,
      },
      showMenuInFooter: {
        required: false,
        type: Boolean,
        default: false,
      },
    },
    computed: {
      cardTitle() {
        if (this.title) {
          return this.title;
        }
        if (this.$slots.title) {
          return null;
        }

        return `${this.prependTitle} Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities`;
      },
    },
  };

</script>


<style lang="scss" scoped>

  .footer-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .pills {
    margin-left: -6px;

    span {
      display: inline-block;
      padding: 6px 8px;
      margin: 6px;
    }
  }

</style>