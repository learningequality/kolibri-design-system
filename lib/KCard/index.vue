<template>

  <BaseCard
    :title="title"
    :headingLevel="headingLevel"
    :titleLines="titleLines"
    :to="to"
  >
    <template #default>
      <aside
        v-if="layout === 'vertical' && thumbnailDisplay !== 'none'"
      >
        <KImg
          :src="thumbnailSrc"
          :isDecorative="true"
          :style="KImgVerticalSmallStyle"
        />
        <slot v-if="!thumbnailSrc" name="thumbnailPlaceholder"></slot>
      </aside>

      <div class="horizontal-layout-style">
        <aside
          v-if="layout === 'horizontal' && thumbnailDisplay === 'large'"
        >
          <KImg
            :src="thumbnailSrc"
            :isDecorative="true"
          />
          <slot v-if="!thumbnailSrc" name="thumbnailPlaceholder"></slot>
        </aside>

        <div>
          <header
            v-if="thumbnailDisplay === 'none'"
            class="spacing"
          >
            <!-- @slot Places content to be placed above the title.. -->
            <slot name="aboveTitle"></slot>
            <!-- @slot for the title content -->
            <slot name="title"></slot>
            <!-- @slot  Places content below the title.. -->
            <slot name="belowTitle"></slot>
          </header>
          <KGrid
            v-else
          >
            <KGridItem
              :layout12="{ span: isVerticalLayout ? 12 : 6 }"
              :layout8="{ span: isVerticalLayout ? 8 : 4 }"
              :layout4="{ span: isVerticalLayout ? 4 : 2 }"
            >
              <header
                class="spacing"
                :style="textColor"
              >
                <!-- @slot Places content to be placed above the title.. -->
                <slot name="aboveTitle"></slot>
                <!-- @slot for the title content -->
                <slot name="title"></slot>
              </header>

              <div>
                <!-- @slot  Places content below the title.. -->
                <slot name="belowTitle"></slot>
              </div>
            </KGridItem>

            <KGridItem
              v-if="layout === 'horizontal'"
              :layout12="{ span: 6 }"
              :layout8="{ span: 4 }"
              :layout4="{ span: 4 }"
            >
              <aside
                v-if="thumbnailDisplay === 'small'"
              >
                <KImg
                  :src="thumbnailSrc"
                  :isDecorative="true"
                  :appearanceOverrides="{
                    scaleType: thumbnailScaleType,
                  }"
                  style="border-radius:13px;"
                  class="spacing"
                />
                <slot v-if="!thumbnailSrc" name="thumbnailPlaceholder"></slot>
              </aside>

            </KGridItem>
          </KGrid>

          <footer class="spacing">
            <slot name="footer"></slot>
          </footer>
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
      /**
       * Sets the HTML heading level (h1, h2, etc.) for the title.
       */
      headingLevel: {
        type: Number,
        required: true,
      },
      /**
       * The number of lines to display for the title. Defaults to 2.
       */
      titleLines: {
        type: Number,
        required: true,
        default: 2,
      },
      /**
       * An object containing the route definition for the link.
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
            console.error('Error: Prop layout is required and can not be empty.');
            return false;
          }
          return true;
        },
      },
      /**
       * Controls the display of the thumbnail image.
       * Options: 'none' (default), 'block', or 'inline'.
       */
      thumbnailDisplay: {
        type: String,
        required: false,
        default: 'none',
      },
      /**
       * Set the source URL of the thumbnail image.
       */
      thumbnailSrc: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * sets the scale type for the thumbnail image.
       *  Options: 'centerInside' (default), 'cover', or 'contain'.
       */
      thumbnailScaleType: {
        type: String,
        required: false,
        default: 'centerInside',
      },
    },
    computed: {
      KImgVerticalSmallStyle() {
        if (this.thumbnailDisplay === 'small') {
          return {
            padding: '1em',
          };
        } else {
          return {
            padding: '0em',
          };
        }
      },
      isVerticalLayout() {
        return (
          this.layout === 'vertical' ||
          (this.layout === 'horizontal' && this.thumbnailDisplay === 'large')
        );
      },
      textColor() {
        return {
          color: this.$themeTokens.text,
        };
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