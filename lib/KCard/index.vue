<template>

  <BaseCard
    :to="to"
    :title="title"
    :headingLevel="headingLevel"
    :titleLines="titleLines"
    :style="wrapperStyle"
  >
    <template #title>
      <!-- @slot Optional slot section containing the title contents, should not contain a heading element. -->
      <div class="title-slot">
        <slot name="title"></slot>
      </div>
    </template>

    <template #default>
      <aside
        v-if="thumbnailDisplay !== 'none'"
        :style="{ dynamicOrder }"
        :class="{
          'image-class-vertical': layout === 'vertical',
          'image-class-horizontal': (layout === 'horizontal' && thumbnailDisplay === 'small')
        }"
      >
        <KImg
          v-if="thumbnailSrc"
          :src="thumbnailSrc"
          :isDecorative="true"
          :appearanceOverrides="{ scaleType: thumbnailScaleType, width: cardContentPartial }"
          class="thumbnail-image"
          :style="imageRadius"
        />
        <slot v-if="!thumbnailSrc" name="thumbnailPlaceholder"></slot>
      </aside>
      <div class="display-inline-block" :style="{ width: cardContentPartial }">
        <div
          data-testid="aboveTitle"
          class="above-title-style"
          :class="{ 'above-title-horizontal': layout === 'horizontal' }"
        >
          <slot name="aboveTitle"></slot>
        </div>

        <template>
          <div
            :class="{ 'title-horizontal': layout === 'horizontal' }"
            class="title-slot"
          >
            <!-- <slot name="title"></slot> -->
          </div>
        </template>

        <div
          data-testid="belowTitle"
          class="below-title"
          :class="{ 'below-title-horizontal': layout === 'horizontal' }"
        >
          <slot name="belowTitle"></slot>
        </div>
        <div
          class="footer"
          :class="{ 'footer-horizontal': layout === 'horizontal' }"
        >
          <div data-testid="footer">
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
      /**
       * Sets card title if provided. The title should be
       * unique and descriptive to aid searching through list of links.
       */
      title: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * Sets the HTML heading level in range (h2 - h6) for the title .
       */
      headingLevel: {
        type: Number,
        required: true,
        validator(value) {
          if (!value) {
            console.error('Error: Prop headingLevel is required and cannot be empty.');
            return false;
          } else {
            if (value <= 6 && value >= 2) {
              return true;
            } else {
              console.error('Error: Prop headingLevel must be between 1 and 6.');
              return false;
            }
          }
        },
      },
      /**
       * The maximum number of lines a title covers. Defaults to 2 if not specified.
       */
      titleLines: {
        type: Number,
        required: false,
        default: 2,
      },
      /**
       * An object containing the route definition for the link.
       * Required and cannot be empty.
       */
      to: {
        type: Object,
        required: true,
      },
      /**
       * Controls card orientation. Required and cannot be empty.
       * Expected Options: 'horizontal' (default) or 'vertical'.
       *
       * @param {String} value - The layout value.
       * @returns {Boolean} - True if the value is not empty, false otherwise.
       */
      layout: {
        type: String,
        default: 'horizontal',
      },
      /**
       * Controls how the thumbnail appears in the card.
       * Expected Options: 'none' (default), 'small', or 'large'.
       * */
      thumbnailDisplay: {
        type: String,
        required: false,
        default: 'none',
      },
      /**
       * Sets the thumbnail path.
       * Defaults to null if not provided.
       *
       * @type {String}
       * @default null
       * */
      thumbnailSrc: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * Specifies how the thumbnail scales in the card.
       * Options: 'centerInside', 'contain', 'fitXY'.
       * @type {String}
       * @default 'centerInside'
       */
      thumbnailScaleType: {
        type: String,
        default: 'centerInside',
      },
    },
    computed: {
      wrapperStyle() {
        if (this.layout === 'horizontal') {
          return {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
          };
        } else if (this.layout === 'horizontal' && this.thumbnailDisplay === 'small') {
          return { flexDirection: 'row-reverse' };
        } else {
          return {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          };
        }
      },
      imageRadius() {
        if (this.layout === 'horizontal') {
          if (this.thumbnailDisplay === 'large') {
            return { borderRadius: '0.5em 0 0 0.5em' };
          }
          if (this.thumbnailDisplay === 'small') {
            return { borderRadius: '0.5em' };
          }
        }
        if (this.layout === 'vertical') {
          if (this.thumbnailDisplay === 'large') {
            return { borderRadius: '0.5em 0.5em 0 0' };
          }
          if (this.thumbnailDisplay === 'small') {
            return { margin: '0em' };
          }
        }
        return {};
      },
      dynamicOrder() {
        if (this.layout === 'horizontal') {
          return {
            order: 5,
            width: '40%',
          };
        }
        return {};
      },
      cardContentPartial() {
        if (this.layout === 'horizontal' && this.thumbnailDisplay !== 'none') {
          return 'calc(100% - 50%)';
        } else {
          return '100%';
        }
      },
    },
    mounted() {
      if (!this.$slots.title && !this.title) {
        throw new Error('provide a title slots or prop for the  card');
      } else {
        return true;
      }
    },
  };

</script>


<style scoped>
  .spacing {
    margin: 1em;
  }

  .title-slot {
    font-size: 16px; 
    font-weight: 600;
    line-height: 1.5;
  }

  /deep/ .base-card-heading {
    order: 2;
  }

  .thumbnail-image {
    height: 100%;
    min-width: 240px;
    min-height:auto;
  }

  .footer {
    /* margin: 12px 0; */
    /* position: absolute; */
    width: 100%;
    margin-top:auto;
    order: 5;
  }

  .above-title-style{
    font-size: 12px;
    order: 1;
  }

  .bellow-title{
    order: 4;
  }

  .display-inline-block{
    display: inline-block;
    margin:1em;
  }
  .footer-horizontal{
    order: 8;
  }
  .image-class-vertical{
    order:0;
  }
  .image-class-horizontal{
    order:8;
    padding-bottom:3em;
    padding-left: 1em;
    padding-right: 1em;
    margin-top: 1em;
  }


</style>
