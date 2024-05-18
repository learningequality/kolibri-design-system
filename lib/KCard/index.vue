<template>

  <BaseCard
    :title="title"
    :headingLevel="headingLevel"
    :titleLines="titleLines"
    :to="to"
  >
    <template #default>
      <div class="horizontal-layout-style" :style="wrapperStyle">
        <aside v-if="thumbnailDisplay !== 'none'">
          <KImg
            :src="thumbnailSrc"
            :isDecorative="true"
            :appearanceOverrides="{ scaleType: thumbnailScaleType }"
            style="border-radius: 13px;"
            class="spacing"
          />
          <slot v-if="!thumbnailSrc" name="thumbnailPlaceholder"></slot>
        </aside>
        <div>
          <div v-if="thumbnailDisplay === 'none'" class="spacing">
            <slot v-if="!title" name="title"></slot>
            <slot name="aboveTitle"></slot>
          </div>
          <KGrid v-else>
            <KGridItem
              :layout12="{ span: isVerticalLayout ? 12 : 6 }"
              :layout8="{ span: isVerticalLayout ? 8 : 4 }"
              :layout4="{ span: isVerticalLayout ? 4 : 2 }"
            >
              <div class="spacing" :style="textColor">
                <slot name="aboveTitle"></slot>
              </div>
              <div>
                <slot name="belowTitle"></slot>
              </div>
            </KGridItem>
          </KGrid>
          <div class="spacing">
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
            console.error('Error: Prop layout is required and can not be empty.');
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
          return { flexDirection: 'row-reverse' }; // Image on right
        } else {
          return { flexDirection: 'row' }; // Image on left
        }
      },
      isVerticalLayout() {
        return (
          this.layout === 'vertical' ||
          (this.layout === 'horizontal' && this.thumbnailDisplay === 'large')
        );
      },
      textColor() {
        return { color: this.$themeTokens.text };
      },
    },
  };

</script>


<style scoped>
  
    .spacing{
      margin: 1em;
    }
    .footer{
      margin-top: auto;
    }
  
    .horizontal-layout-style{
      display: flex;
    }
    
</style>