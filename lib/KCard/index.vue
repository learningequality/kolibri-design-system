<template>

  <BaseCard
    :to="to"
    :title="title"
    :headingLevel="headingLevel"
    :titleLines="titleLines"
    :class="['k-card', rootClass]"
    :headingStyles="headingStyles"
  >
    <template v-if="$slots.title" #title>
      <!-- @slot Optional slot section containing the title contents, should not contain a heading element. -->
      <slot name="title"></slot>
    </template>
    <template #default>
      <div class="thumbnail">
        <KImg
          v-if="thumbnailSrc"
          :src="thumbnailSrc"
          :scaleType="thumbnailScaleType"
          :aspectRatio="thumbnailAspectRatio"
          :isDecorative="true"
          :appearanceOverrides="thumbnailStyles"
        >
          <template #placehoder>
            <slot v-if="!thumbnailSrc" name="thumbnailPlaceholder"></slot>

          </template>
        </KImg>
      </div>
      <div
        data-test="aboveTitle"
        class="above-title"
      >
        <slot name="aboveTitle"></slot>
      </div>
      <div
        data-test="belowTitle"
        class="below-title"
      >
        <slot name="belowTitle"></slot>
      </div>
      <div
        data-test="footer"
        class="footer"
      >
        <slot name="footer"></slot>
      </div>
    </template>
  </BaseCard>

</template>


<script>

  import BaseCard from './BaseCard.vue';

  export default {
    name: 'KCard',
    components: { BaseCard },
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
      rootClass() {
        return this.stylesAndClasses.rootClass;
      },
      titleLines() {
        return this.stylesAndClasses.titleLines;
      },
      thumbnailAspectRatio() {
        return this.stylesAndClasses.thumbnailAspectRatio;
      },
      headingStyles() {
        return this.stylesAndClasses.headingStyles;
      },
      thumbnailStyles() {
        return this.stylesAndClasses.thumbnailStyles;
      },
      /*
        Returns dynamic classes and few style-like data that CSS was cumbersome/impossible to use for ,or are in need of using theme, grouped by all possible combinations of layouts.

        New styles and classes are meant to be added to this single-source-of-truth object so
        that we can easily locate all styling being applied to a particular layout

        Could be further simplified by using solely dynamic styles, but that would have detrimental effects on our auto RTL machinery and we would need to take care manually of more places. 
      */
      stylesAndClasses() {
        /* In px. Needs to be the same as $spacer variable in styles part */
        const SPACER = '12';

        const headingCommonStyles = {
          order: 3,
          margin: `${SPACER}px ${SPACER}px ${SPACER / 2}px ${SPACER}px`,
        };
        const thumbnailCommonStyles = {
          width: '100%',
          height: '100%',
        };

        if (this.layout === 'vertical' && this.thumbnailDisplay === 'large') {
          return {
            rootClass: 'vertical-with-large-thumbnail',
            titleLines: 3,
            thumbnailAspectRatio: undefined,
            headingStyles: {
              ...headingCommonStyles,
            },
            thumbnailStyles: {
              ...thumbnailCommonStyles,
              borderRadius: '8px 8px 0 0',
            },
          };
        }
        if (this.layout === 'vertical' && this.thumbnailDisplay === 'small') {
          return {
            rootClass: 'vertical-with-small-thumbnail',
            titleLines: 3,
            thumbnailAspectRatio: undefined,
            headingStyles: {
              ...headingCommonStyles,
            },
            thumbnailStyles: {
              ...thumbnailCommonStyles,
              borderRadius: '4px',
            },
          };
        }
        if (this.layout === 'vertical' && this.thumbnailDisplay === 'none') {
          return {
            rootClass: 'vertical-with-no-thumbnail',
            titleLines: 2,
            thumbnailAspectRatio: undefined,
            headingStyles: {
              ...headingCommonStyles,
            },
            thumbnailStyles: {
              ...thumbnailCommonStyles,
            },
          };
        }
        if (this.layout === 'horizontal' && this.thumbnailDisplay === 'large') {
          return {
            rootClass: 'horizontal-with-large-thumbnail',
            titleLines: 3,
            thumbnailAspectRatio: undefined,
            headingStyles: {
              ...headingCommonStyles,
              width: `calc(60% - ${SPACER * 2}px)` /* same as slots width defined in styles */,
            },
            thumbnailStyles: {
              ...thumbnailCommonStyles,
              borderRadius: '8px 0 0 8px',
            },
          };
        }
        if (this.layout === 'horizontal' && this.thumbnailDisplay === 'small') {
          return {
            rootClass: 'horizontal-with-small-thumbnail',
            titleLines: 2,
            thumbnailAspectRatio: '1:1',
            headingStyles: {
              ...headingCommonStyles,
              width: `calc(70% - ${SPACER * 3}px)` /* same as slots width defined in styles */,
            },
            thumbnailStyles: {
              ...thumbnailCommonStyles,
              borderRadius: '8px',
            },
          };
        }
        if (this.layout === 'horizontal' && this.thumbnailDisplay === 'none') {
          return {
            rootClass: 'horizontal-with-no-thumbnail',
            titleLines: 2,
            thumbnailAspectRatio: undefined,
            headingStyles: {
              ...headingCommonStyles,
            },
            thumbnailStyles: {
              ...thumbnailCommonStyles,
            },
          };
        }
        return {};
      },
    },
  };

</script>


<style lang="scss" scoped>

  /* Needs to be the same as SPACER constant in JavaScript part */
  $spacer: 12px;

  /*
      Just couple of comments that are referenced from several places:
      - (1) Intentionally fixed. Cards on the same row of a grid should have the same overall height and their sections too should have the same height so that information is placed consistently. As documented, consumers need to ensure that contents provided via slots fits well or is truncated.
      - (2) Solves issues with fixed height in a flex item
    */

  /************* Common styles **************/

  .k-card {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    font-size: 12px;
  }

  .thumbnail {
    order: 1;
  }

  .above-title {
    order: 2;
    height: 24px; /* (1) */
    min-height: 24px; /* (2) */
    margin: $spacer $spacer 0;
    overflow: hidden; /* (1) */
  }

  .below-title {
    order: 4;
    height: 18px; /* (1) */
    min-height: 18px; /* (2) */
    margin: 0 $spacer $spacer;
    overflow: hidden; /* (1) */
  }

  .footer {
    order: 5;
    height: 58px; /* (1) */
    min-height: 58px; /* (2) */
    margin: auto $spacer $spacer;
    overflow: hidden; /* (1) */
  }

  /************* Layout-specific styles *************/

  .vertical-with-large-thumbnail {
    height: 480px; /* (1) */

    .thumbnail {
      height: 45%;
      min-height: 45%; /* (2) */
    }
  }

  .vertical-with-small-thumbnail {
    /* stylelint-disable scss/at-extend-no-missing-placeholder */
    @extend .vertical-with-large-thumbnail;
    /* stylelint-enable scss/at-extend-no-missing-placeholder */

    .thumbnail {
      margin: $spacer $spacer 0;
    }
  }

  .horizontal-with-large-thumbnail {
    align-items: flex-end;
    height: 240px; /* (1) */

    .thumbnail {
      position: absolute !important; /* 'important' to override KImg's position relative */
      left: 0;
      width: 40%;
      height: 100%;
    }

    .above-title,
    .below-title,
    .footer {
      width: calc(60% - 2 * #{$spacer}); /* same as heading width defined in script */
    }
  }

  .horizontal-with-small-thumbnail {
    align-items: flex-start;
    height: 220px; /* (1) */

    .thumbnail {
      position: absolute !important; /* 'important' to override KImg's position relative */
      top: $spacer;
      right: $spacer;
      width: 30%; /* square dimension achieved via KImgs's aspect-ratio 1:1 */
      min-width: 80px;
    }

    .above-title,
    .below-title {
      width: calc(70% - 3 * #{$spacer}); /* same as heading width defined in script */
    }

    .footer {
      width: calc(100% - 2 * #{$spacer});
    }
  }

</style>