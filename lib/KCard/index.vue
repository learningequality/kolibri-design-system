<template>

  <BaseCard
    :title="title"
    :headingLevel="headingLevel"
    :titleLines="titleLines"
    :to="to"
  >
    <template #default>
      <div
        class="horizontal-layout-style"
        :style="wrapperStyle"
      >

        <aside
          v-if="thumbnailDisplay !== 'none'"
        >
          <KImg
            :src="thumbnailSrc"
            :isDecorative="true"
            :appearanceOverrides="{ scaleType: thumbnailScaleType }"
            class="thumbnail-image"
          />
          <slot v-if="!thumbnailSrc" name="thumbnailPlaceholder"></slot>
        </aside>
        <div class="spacing">
          <div>
            <slot v-if="!title" name="title"></slot>
            <slot name="aboveTitle"></slot>
            <slot name="belowTitle"></slot>
          </div>
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </template>
  </BaseCard>

</template>

<script>

  import KImg from '../KImg';
  import BaseCard from './BaseCard.vue';

  export default {
    name: 'KCard',
    components: { BaseCard, KImg },
    props: {
      title: {
        type: String,
        required: false,
        default: null,
      },
      headingLevel: {
        type: Number,
        required: true,
      },
      titleLines: {
        type: Number,
        required: true,
        default: 2,
      },
      to: {
        type: Object,
        required: true,
      },
      layout: {
        type: String,
        required: true,
        validator(value) {
          if (!value) {
            console.error('Error: Prop layout is required and cannot be empty.');
            return false;
          }
          return true;
        },
      },
      thumbnailDisplay: {
        type: String,
        required: false,
        default: 'none',
      },
      thumbnailSrc: {
        type: String,
        required: false,
        default: null,
      },
      thumbnailScaleType: {
        type: String,
        required: false,
        default: 'centerInside',
      },
    },
    computed: {
      wrapperStyle() {
        if (this.layout === 'vertical') {
          return { flexDirection: 'column' };
        } else if (this.layout === 'horizontal' && this.thumbnailDisplay === 'small') {
          return { flexDirection: 'row-reverse' };
        } else {
          return { flexDirection: 'row' };
        }
      },
    },
  };

</script>


<style scoped>
  .spacing {
    margin: 1em;
  }

  .horizontal-layout-style {
    display: flex;
  }

  .thumbnail-image {
    width: 100%;
  }

  .footer {
    margin: 12px 0;
  }

</style>
