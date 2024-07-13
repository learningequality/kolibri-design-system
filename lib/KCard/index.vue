<template>

  <BaseCard
    :to="to"
    :title="title"
    :headingLevel="headingLevel"
    :titleLines="titleLines"
    :style="wrapperStyle"
    :class="{ 'horizontal-layout': (layout === 'horizontal' && thumbnailDisplay !== 'none' ), 'vertical-layout': layout === 'vertical' }"
  >
    <template #title>
      <!-- @slot Optional slot section containing the title contents, should not contain a heading element. -->
      <div
        :style="titleSlotOrder"
        class="title-slot"
      >
        <slot name="title"></slot>
      </div>
    </template>
    <template #default>
      <aside
        v-if="thumbnailDisplay !== 'none'"
        :style="{ ...dynamicOrder, }"
        :class="{
          'image-class-horizontal': (layout === 'horizontal' && thumbnailDisplay === 'small')
        }"
      >
        <KImg
          v-if="thumbnailSrc"
          :src="thumbnailSrc"
          :isDecorative="true"
          :appearanceOverrides="{ scaleType: thumbnailScaleType, width: cardPartition }"
          class="thumbnail-image"
          :style="imageRadius"
        />
        <slot v-if="!thumbnailSrc" name="thumbnailPlaceholder"></slot>
      </aside>
      <div
        data-testid="aboveTitle"
        class="above-title-style"
        :style="cardPartition"
      >
        <slot name="aboveTitle"></slot>
      </div>
      <div
        data-testid="belowTitle"
        class="below-title"
        :style="cardPartition"
      >
        <slot name="belowTitle"></slot>
      </div>
      <div
        class="footer"
        :class="{ 'footer-horizontal': layout === 'horizontal' }"
        :style="(layout === 'horizontal' && thumbnailDisplay === 'large') ? { ...cardPartition } : {}"
      >
        <div data-testid="footer">
          <slot name="footer"></slot>
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
            flexDirection: 'column',
            width: '100%',
            alignItems: this.thumbnailDisplay === 'small' ? 'flex-start' : 'flex-end',
          };
        }

        if (this.layout === 'vertical') {
          return {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          };
        }
        return {};
      },
      imageRadius() {
        if (this.layout === 'horizontal') {
          if (this.thumbnailDisplay === 'large') {
            return { borderRadius: '0.5em 0 0 0.5em', aligntItems: 'start' };
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
            return { marginLeft: '1em', marginRight: '.1em' };
          }
        }
        return {};
      },
      dynamicOrder() {
        if (this.layout === 'horizontal') {
          if (this.thumbnailDisplay === 'small') {
            return {
              order: 5,
              width: '40%',
              right: 0,
              position: 'absolute',
            };
          }
          if (this.thumbnailDisplay === 'large') {
            return {
              order: 5,
              width: '40%',
              height: '100%',
              left: 0,
              position: 'absolute',
            };
          }
        }
        return {
          order: -1,
          // position: 'absolute',
          top: 0,
          width: '100%',
        };
      },
      titleSlotOrder() {
        if (this.layout === 'vertical') {
          if (this.thumbnailDisplay !== 'none') {
            return {
              marginLeft: '1em',
              marginRight: '1em',
            };
          }
        }

        if (this.layout === 'horizontal' && this.thumbnailDisplay === 'small') {
          return {
            marginLeft: '1em',
          };
        }

        if (this.thumbnailDisplay === 'none') {
          return { marginLeft: '1em', marginRight: '1em' };
        }
        return {};
      },
      cardPartition() {
        if (
          this.layout === 'horizontal' &&
          (this.thumbnailDisplay === 'small' || this.thumbnailDisplay === 'large')
        ) {
          return {
            width: '50%',
          };
        } else {
          return {
            width: '100%',
          };
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

  .title-slot {
    font-size: 16px; 
    font-weight: 600;
    line-height: 1.5;
  }

  /deep/ .base-card-heading {
    order: 1;
  }

  .below-title{
    width: '100%';
    margin-left:1em;
    margin-right:1em;
  }

  .thumbnail-image {
    height: 100%;
    min-width: 140px;
    min-height:auto;
  }

  .footer {
    width: 100%;
    margin-top:auto;
    padding-right: 1em;
    padding-left:1em;
    order: 5;
  }

  .above-title-style{
    font-size: 12px;
    padding-right: 1em;
    padding-left:1em;
    padding-top: 0.5em;
  }
  .footer-horizontal{
    max-width:'100%';
  }
  .image-class-horizontal{
    order:8;
    padding-bottom:3em;
    padding-left: 1em;
    padding-right: 1em;
    margin-top: 1em;
  }

  .horizontal-layout /deep/ h2 {
    width: 50%;
  }

  .vertical-layout /deep/ h2 {
    width: 100%;
  }

  .position-above-title{
    /* position:absolute;
    padding-top:30px; */
  }
</style>