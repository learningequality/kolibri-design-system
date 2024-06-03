<template>

  <BaseCard
    :to="to"
    :title="title"
    :headingLevel="headingLevel"
    :titleLines="titleLines"
  >
    <template #default>
      <div
        class="horizontal-layout-style"
        :style="wrapperStyle"
      >
        <aside
          v-if="thumbnailDisplay !== 'none'"
          :style="forSmallThumbnailDisplay"
        >
          <KImg
            :src="thumbnailSrc"
            :isDecorative="true"
            :appearanceOverrides="{ scaleType: thumbnailScaleType }"
            class="thumbnail-image"
            :style="imageRadius"
          />
          <!-- @slot Act as image placeholder  when the image is not available or can't be loaded. -->
          <slot v-if="!thumbnailSrc" name="thumbnailPlaceholder"></slot>
        </aside>
        <div class="spacing">
          <div>
            <div data-testid="aboveTitle">
              <slot name="aboveTitle"></slot>
            </div>
            <!-- @slot Optional slot section containing the
            title contents, should not contain a heading element. -->
            <div class="title-slot-style">
              <slot v-if="!title" name="title"></slot>
            </div>
            <div data-testid="belowTitle">
              <!-- @slot  Places content below the title -->
              <slot name="belowTitle"></slot>
            </div>
            <div class="footer">
              <!--@slot places content in the footer-->
              <div data-testid="footer">
                <slot name="footer"></slot>
              </div>
            </div>
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
       * Displays  Card title.
       * This prop is optional and defaults to null if not provided.
       */
      title: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * Sets the HTML heading level (h1, h2, etc.) for the title.
       */
      headingLevel: {
        type: Number,
        required: true,
        validator(value) {
          if (!value) {
            console.error('Error: Prop headingLevel is required and cannot be empty.');
            return false;
          } else {
            if (value <= 6 || value >= 2) {
              return true;
            } else {
              console.error('Error: Prop headingLevel must be between 1 and 6.');
              return false;
            }
          }
        },
      },
      /**
       * The number of lines to display for the title. Defaults to 2.
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
       * The layout style of the hero banner. Required and cannot be empty.
       *
       * @validator
       * @param {String} value - The layout value.
       * @returns {Boolean} - True if the value is not empty, false otherwise.
       */
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
      /**
       * Controls the display of the thumbnail image.
       * Options: 'none' (default), 'small', or 'large'.
       * */
      thumbnailDisplay: {
        type: String,
        required: false,
        default: 'none',
      },
      /**
       * Sets the source for the thumbnail image.
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
       * Sets the scale type for the thumbnail image.
       * Options: 'centerCrop', 'centerInside', 'fitCenter', 'fitEnd', 'fitStart', 'fitXY'.
       * Defaults to 'centerInside' if not provided.
       * @type {String}
       * @default 'centerInside'
       */
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
      imageRadius() {
        if (this.layout === 'horizontal') {
          if (this.thumbnailDisplay === 'large') {
            return {
              borderRadius: '0.5em 0 0 0.5em',
            };
          }
          if (this.thumbnailDisplay === 'small') {
            return {
              borderRadius: '0.5em',
            };
          }
          return;
        } else {
          if (this.thumbnailDisplay === 'large') {
            return {
              borderRadius: '0.5em 0.5em 0 0',
            };
          }
          return {
            borderRadius: '0',
          };
        }
      },
      forSmallThumbnailDisplay() {
        if (this.thumbnailDisplay === 'small') {
          return {
            margin: '1em',
          };
        } else {
          return {
            margin: '0em',
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
  .spacing {
    margin: 1em;
  }

  .horizontal-layout-style {
    display: flex;
    flex-direction: column;
  }

  .thumbnail-image {
    height: 100%;
  }

  .footer {
    margin: 12px 0;
    /* position: absolute; */
    bottom: 0;
    width: 100%;
  }

  .title-slot-style{
    font-weight: 700;
    font-size: 1em;
  }

</style>
