<template>

  <!-- see trackInputModality  for [data-focus=true] -->
  <li
    tabindex="0"
    data-focus="true"
    :class="$computedClass(coreOutlineFocus)"
    @focus="onFocus"
    @mouseenter="onHover"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @keyup.enter="onEnter"
  >
    <div
      :class="['card-area', layoutClass, thumbnailAlignClass]"
      :style="{ backgroundColor: $themeTokens.surface }"
    >
      <component
        :is="headingElement"
        v-if="title || $slots.title"
        class="heading"
      >
        <!--
          Prevent router-link click event by setting empty event=""
          (technique used by Vue community because
          the usual ways don't work for router-link).
          This is because <li> is supposed to take care of it.
          Furthemore, together with 'draggable' disabled, it ensures
          that text selection works on the title text.
          See the custom click implementation in 'onMouseUp'. 
        -->
        <router-link
          tabindex="-1"
          :to="to"
          draggable="false"
          event=""
        >
          <span
            class="base-card-title"
            :style="{ color: $themeTokens.text }"
          >
            <!-- @slot Optional slot section containing the title contents, should not contain a heading element. -->
            <slot 
              v-if="$slots.title"
              name="title"
            ></slot>
            <KTextTruncator
              v-else
              :text="title"
              :maxLines="titleLines"
            />
          </span>
        </router-link>
      </component>

      <div
        v-if="thumbnailDisplay !== Thumbnail_Displays.NONE"
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
    </div>
  </li>

</template>


<script>

  const Layouts = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
  };

  const Thumbnail_Displays = {
    NONE: 'none',
    SMALL: 'small',
    LARGE: 'large',
  };

  const thumbnailAlignOptions = {
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
          if (value <= 6 && value >= 2) {
            return true;
          } else {
            console.error(`[KCard] 'headingLevel' must be between 2 and 6.`);
            return false;
          }
        },
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
        validator: cardValidator(Layouts, 'layout'),
      },
      /**
       * Controls how the thumbnail appears in the card.
       * Expected Options: 'none' (default), 'small', or 'large'.
       * */
      thumbnailDisplay: {
        type: String,
        default: 'none',
        validator: cardValidator(Thumbnail_Displays, 'thumbnailDisplay'),
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
      /**
       * Controls the alignment of the thumbnail area in horizontal layouts.
       * Only applies to horizontal layouts with 'small' or 'large' thumbnail display.
       * Ignored in other layouts.
       * @type {String}
       * @values 'left', 'right'
       * @default 'left'
       */
      thumbnailAlign: {
        type: String,
        default: 'left',
        validator: cardValidator(thumbnailAlignOptions, 'thumbnailAlign'),
      },
      /**
       * Specifies the number of lines allowed for the title before truncation occurs.
       * @type {number}
       * @default 2
       */
      titleLines: {
        type: Number,
        required: false,
        default: 2,
      },

      /**
       * When true, preserves the space for the aboveTitle slot even when it's empty.
       * When false, removes the space entirely if the slot is empty.
       * @type {Boolean}
       * @default false
       */
      preserveAboveTitle: {
        type: Boolean,
        default: false,
      },
      /**
       * When true, preserves the space for the belowTitle slot even when it's empty.
       * When false, removes the space entirely if the slot is empty.
       * @type {Boolean}
       * @default false
       */
      preserveBelowTitle: {
        type: Boolean,
        default: false,
      },
      /**
       * When true, preserves the space for the footer slot even when it's empty.
       * When false, removes the space entirely if the slot is empty.
       * @type {Boolean}
       * @default false
       */
      preserveFooter: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        mouseDownTime: 0,
        Thumbnail_Displays,
      };
    },
    computed: {
      coreOutlineFocus() {
        return {
          ':focus': {
            ...this.$coreOutline,
          },
        };
      },
      headingElement() {
        return this.headingLevel ? 'h' + this.headingLevel : undefined;
      },
      layoutClass() {
        return this.stylesAndClasses.layoutClass;
      },
      thumbnailAspectRatio() {
        return this.stylesAndClasses.thumbnailAspectRatio;
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
        const thumbnailCommonStyles = {
          width: '100%',
          height: '100%',
        };
        if (this.layout === 'vertical' && this.thumbnailDisplay === 'large') {
          return {
            layoutClass: 'vertical-with-large-thumbnail',
            thumbnailAlignClass: undefined,
            thumbnailAspectRatio: undefined,
            thumbnailStyles: {
              ...thumbnailCommonStyles,
              borderRadius: '8px 8px 0 0',
            },
          };
        }
        if (this.layout === 'vertical' && this.thumbnailDisplay === 'small') {
          return {
            layoutClass: 'vertical-with-small-thumbnail',
            thumbnailAlignClass: undefined,
            thumbnailAspectRatio: undefined,
            thumbnailStyles: {
              ...thumbnailCommonStyles,
              borderRadius: '4px',
            },
          };
        }
        if (this.layout === 'vertical' && this.thumbnailDisplay === 'none') {
          return {
            layoutClass: undefined,
            thumbnailAlignClass: undefined,
            thumbnailAspectRatio: undefined,
            thumbnailStyles: {
              ...thumbnailCommonStyles,
            },
          };
        }

        if (this.layout === 'horizontal' && this.thumbnailDisplay === 'large') {
          return {
            layoutClass: 'horizontal-with-large-thumbnail',
            thumbnailAlignClass: `thumbnail-align-${this.thumbnailAlign}`,
            thumbnailAspectRatio: undefined,
            thumbnailStyles: {
              ...thumbnailCommonStyles,
              borderRadius: this.thumbnailAlign === 'right' ? '0 8px 8px 0' : '8px 0 0 8px',
            },
          };
        }
        if (this.layout === 'horizontal' && this.thumbnailDisplay === 'small') {
          return {
            layoutClass: 'horizontal-with-small-thumbnail',
            thumbnailAlignClass: `thumbnail-align-${this.thumbnailAlign}`,
            thumbnailAspectRatio: '1:1',
            thumbnailStyles: {
              ...thumbnailCommonStyles,
              borderRadius: '8px',
            },
          };
        }
        if (this.layout === 'horizontal' && this.thumbnailDisplay === 'none') {
          return {
            layoutClass: undefined,
            thumbnailAlignClass: undefined,
            thumbnailAspectRatio: undefined,
          };
        }
        return {};
      },
    },
    mounted() {
      if (!this.$slots.title && !this.title) {
        console.error(`[KCard] provide title via 'title' slot or prop`);
      }
    },
    methods: {
      navigate() {
        this.$router.push(this.to);
      },
      onFocus(e) {
        this.$emit('focus', e);
      },
      onHover(e) {
        this.$emit('hover', e);
      },
      onEnter() {
        this.navigate();
      },
      onMouseDown() {
        this.mouseDownTime = new Date().getTime();
      },
      onMouseUp() {
        const mouseUpTime = new Date().getTime();
        // Make textual content selectable within the whole clickable card area.
        //
        // Calculate the time difference between the mouse button press and release.
        // If the time difference is greater than or equal to 200 milliseconds,
        // it means that the mouse button was pressed and held for a longer time,
        // which is not typically interpreted as a click event. Do not navigate
        // in such case.
        if (mouseUpTime - this.mouseDownTime < 200) {
          this.navigate();
        } else {
          return;
        }
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '../styles/definitions';

  $spacer: 24px;

  /*
        Just couple of comments that are referenced from several places:
        - (1) Intentionally fixed. Cards on the same row of a grid should have the same overall height and their sections too should have the same height so that information is placed consistently. As documented, consumers need to ensure that contents provided via slots fits well or is truncated.
        - (2) Solves issues with fixed height in a flex item
      */

  /************* Common styles **************/

  .card-area {
    @extend %dropshadow-2dp;

    position: relative; /* basis for absolute positioning of thumbnail images */
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    font-size: 12px;
    text-align: left;
    text-decoration: none;
    list-style-type: none;
    cursor: pointer;
    border-radius: 0.5em;
    outline-offset: -1px;
    transition: box-shadow $core-time ease;

    &:hover,
    &:focus {
      @extend %dropshadow-6dp;
    }
  }

  .heading {
    order: 3;
    margin: $spacer $spacer calc(#{$spacer} / 2) $spacer;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
  }

  .thumbnail {
    position: relative; /* basis for absolute positioning of 'thumbnailPlaceholder' slot content */
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
    min-height: 26px; /* (2) */
    margin: 0 $spacer 0 $spacer;
    overflow: hidden; /* (1) */
  }

  .footer {
    order: 5;
    height: 58px; /* (1) */
    min-height: 58px; /* (2) */
    margin: auto $spacer $spacer;
    overflow: hidden; /* (1) */
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
    height: auto; /* (1) */

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
    position: relative;
    height: 240px; /* (1) */

    .thumbnail {
      position: absolute;
      width: 40%;
      height: 100%;
    }

    .heading,
    .above-title,
    .below-title,
    .footer {
      width: calc(60% - 2 * #{$spacer});
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
    height: 220px; /* (1) */

    .thumbnail {
      position: absolute;
      top: $spacer;
      width: 30%; /* square dimension achieved via KImgs's aspect-ratio 1:1 */
      min-width: 80px;
    }

    .heading,
    .above-title,
    .below-title {
      width: calc(70% - 3 * #{$spacer});
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