<template>

  <BaseCard
    ref="baseCard"
    :to="to"
    :title="title"
    :headingLevel="headingLevel"
    :titleLines="titleLines"
    :class="['k-card', rootClass, thumbnailAlignClass]"
    :style="cardGridStyle"
    :headingStyles="headingStyles"
  >
    <template v-if="$slots.title" #title>
      <!-- @slot Optional slot section containing the title contents, should not contain a heading element. -->
      <slot name="title"></slot>
    </template>
    <template #default>
      <div
        v-if="thumbnailDisplay !== ThumbnailDisplays.NONE"
        class="thumbnail"
      >
        <!-- 
          Render KImg even if thumbnailSrc is not provided since in that case
          KImg takes care of showing the gray placeholder area.
        -->
        <KImg
          :src="thumbnailSrc"
          :scaleType="thumbnailScaleType"
          :aspectRatio="thumbnailAspectRatio"
          :isDecorative="true"
          :appearanceOverrides="thumbnailStyles"
        />
        <!--
          This is a duplicate of the same slot in KImg. I didn't find a way to utilize
          KImg's placeholder slot from here, likely because this part of code is nested
          in one slot already

          Show it even when thumbnail source is provided - then the placeholder serves
          as progressive loading experience.
        -->
        <span
          v-if="$slots.thumbnailPlaceholder"
          class="thumbnail-placeholder"
        >
          <!-- @slot Places content to the thumbnail placeholder area. -->
          <slot name="thumbnailPlaceholder"></slot>
        </span>
      </div>
      <div
        v-if="$slots.aboveTitle || preserveAboveTitle"
        data-test="aboveTitle"
        class="above-title"
      >
        <!-- @slot Places content to the area above the title. -->
        <slot name="aboveTitle"></slot>
      </div>
      <div
        v-if="$slots.belowTitle || preserveBelowTitle"
        data-test="belowTitle"
        class="below-title"
      >
        <!-- @slot Places content to the area below the title. -->
        <slot name="belowTitle"></slot>
      </div>
      <div
        v-if="$slots.footer || preserveFooter"
        data-test="footer"
        class="footer"
      >
        <!-- @slot Places content to the footer area. -->
        <slot name="footer"></slot>
      </div>
    </template>
  </BaseCard>

</template>


<script>

  import { inject } from '@vue/composition-api';

  import BaseCard from './BaseCard';

  const Layouts = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
  };

  const ThumbnailDisplays = {
    NONE: 'none',
    SMALL: 'small',
    LARGE: 'large',
  };

  const ThumbnailAlignOptions = {
    LEFT: 'left',
    RIGHT: 'right',
  };

  function cardValidator(allowedValues, propName) {
    return function(value) {
      if (!Object.values(allowedValues).includes(value)) {
        throw new Error(
          `Invalid ${propName} value: '${value}'. Allowed values are: ${Object.values(
            allowedValues
          ).join(', ')}`
        );
      }
      return true;
    };
  }

  export default {
    name: 'KCard',
    components: { BaseCard },
    setup() {
      // provided by `KCardGrid`
      const cardGridStyle = inject('cardGridStyle');

      return {
        cardGridStyle,
      };
    },
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
       */
      layout: {
        type: String,
        default: 'horizontal',
        validator: cardValidator(Layouts, 'layout'),
      },
      /**
       * Controls how the thumbnail appears in the card.
       * Expected Options: 'none' (default), 'small', or 'large'.
       * */
      thumbnailDisplay: {
        type: String,
        default: 'none',
        validator: cardValidator(ThumbnailDisplays, 'thumbnailDisplay'),
      },
      /**
       * Sets the thumbnail path.
       * Defaults to null if not provided.
       * */
      thumbnailSrc: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * Specifies how the thumbnail scales in the card.
       * Options: 'centerInside', 'contain', 'fitXY'.
       */
      thumbnailScaleType: {
        type: String,
        default: 'centerInside',
      },
      /**
       * Controls the alignment of the thumbnail area in horizontal layouts.
       * Only applies to horizontal layouts with 'small' or 'large' thumbnail display.
       * Ignored in other layouts.
       */
      thumbnailAlign: {
        type: String,
        default: 'left',
        validator: cardValidator(ThumbnailAlignOptions, 'thumbnailAlign'),
      },
      /**
       * Specifies the number of lines allowed for the title before truncation occurs.
       */
      titleLines: {
        type: Number,
        required: false,
        default: 2,
      },

      /**
       * When true, preserves the space for the aboveTitle slot even when it's empty.
       * When false, removes the space entirely if the slot is empty.
       */
      preserveAboveTitle: {
        type: Boolean,
        default: false,
      },
      /**
       * When true, preserves the space for the belowTitle slot even when it's empty.
       * When false, removes the space entirely if the slot is empty.
       */
      preserveBelowTitle: {
        type: Boolean,
        default: false,
      },
      /**
       * When true, preserves the space for the footer slot even when it's empty.
       * When false, removes the space entirely if the slot is empty.
       */
      preserveFooter: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        ThumbnailDisplays,
      };
    },
    computed: {
      rootClass() {
        return this.stylesAndClasses.rootClass;
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
      thumbnailAlignClass() {
        return this.stylesAndClasses.thumbnailAlignClass;
      },
      /*
          Returns dynamic classes and few style-like data that CSS was cumbersome/impossible to use for ,or are in need of using theme, grouped by all possible combinations of layouts.

          New styles and classes are meant to be added to this single-source-of-truth object so
          that we can easily locate all styling being applied to a particular layout

          Could be further simplified by using solely dynamic styles, but that would have detrimental effects on our auto RTL machinery and we would need to take care manually of more places. 
        */
      stylesAndClasses() {
        /* In px. Needs to be the same as $spacer variable in styles part */
        const SPACER = 24;

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
            thumbnailAlignClass: undefined,
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
            thumbnailAlignClass: undefined,
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
            rootClass: undefined,
            thumbnailAlignClass: undefined,
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
            thumbnailAlignClass: `thumbnail-align-${this.thumbnailAlign}`,
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
            thumbnailAlignClass: `thumbnail-align-${this.thumbnailAlign}`,
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
            rootClass: undefined,
            thumbnailAlignClass: undefined,
            thumbnailAspectRatio: undefined,
            headingStyles: {
              ...headingCommonStyles,
            },
          };
        }
        return {};
      },
    },
    mounted() {
      // TODO: Cover with a test or two since this is quite a specific
      // way that will cover all that is needed, compared to other possible
      // implementations (e.g. needs to fail on <ul><div><li> etc.)
      this.$nextTick(() => {
        if (this.$refs.baseCard.$el.parentElement.tagName !== 'UL') {
          console.error('[KCard] KCard (<li>) needs to be a direct child of KCardGrid (<ul>).');
        }
      });
    },
  };

</script>


<style lang="scss" scoped>

  /* Needs to be the same as SPACER constant in JavaScript part */
  $spacer: 24px;

  /************* Common styles **************/

  .k-card {
    position: relative; /* basis for absolute positioning of thumbnail images */
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    font-size: 12px;
  }

  .thumbnail {
    position: relative; /* basis for absolute positioning of 'thumbnailPlaceholder' slot content */
    order: 1;
  }

  .above-title {
    order: 2;
    margin: $spacer $spacer 0;
  }

  .below-title {
    order: 4;
    margin: 0 $spacer 0 $spacer;
  }

  .footer {
    order: 5;
    margin: auto $spacer $spacer;
  }

  .thumbnail-placeholder {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0; /* <img> in KImg with z-index 1 should cover the placeholder after loaded */
  }

  /************* Layout-specific styles *************/

  .vertical-with-large-thumbnail {
    .thumbnail {
      height: 45%;
      min-height: 45%; // solves issues with fixed height in a flex item
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
    position: relative;

    .thumbnail {
      position: absolute;
      width: 40%;
      height: 100%;
    }

    .above-title,
    .below-title,
    .footer {
      width: calc(60% - 2 * #{$spacer}); /* same as heading width defined in script */
    }

    &.thumbnail-align-left {
      align-items: flex-end;
      .thumbnail {
        left: 0;
      }

      .above-title,
      .below-title,
      .footer {
        margin-right: $spacer;
      }
    }

    &.thumbnail-align-right {
      align-items: flex-start;
      .thumbnail {
        right: 0;
      }

      .above-title,
      .below-title,
      .footer {
        margin-left: $spacer;
      }
    }
  }

  .horizontal-with-small-thumbnail {
    .thumbnail {
      position: absolute;
      top: $spacer;
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

    &.thumbnail-align-left {
      align-items: flex-end;
      .thumbnail {
        left: $spacer;
      }
    }

    &.thumbnail-align-right {
      align-items: flex-start;
      .thumbnail {
        right: $spacer;
      }
    }
  }

</style>