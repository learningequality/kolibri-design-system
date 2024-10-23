<template>

  <!--
    do not use @onmouseup but rather @click
    to allow for @click.stop on buttons and similar
    rendered within a card via its slots -->
  <li
    :class="['k-card', $slots.select ? 'with-selection-controls' : undefined]"
    :style="[gridItemStyle, focusStyle]"
    @focus="onFocus"
    @mouseenter="onHover"
    @mousedown="onMouseDown"
    @click="onClick"
    @keyup.enter="onEnter"
  >
    <div
      :class="['card-area', ...cardAreaClasses ]"
      :style="{ backgroundColor: $themeTokens.surface }"
    >
      <component
        :is="headingElement"
        v-if="title || $slots.title"
        class="heading"
        :style="{ color: $themeTokens.text }"
      >
        <!--
          `event=""` prevents router-link click event
          (technique used by Vue community because
          the usual ways don't work for router-link).
          This is to
            - (1) prevent double navigation (the wrapping
                  <li> is supposed to take care of navigation)
            - (2) together with the `draggable` disabled, 
                  ensures that text selection works on
                  the title text (see the feature for allowing
                  selecting card's content in `onClick`)
        -->
        <router-link
          event=""
          :to="to"
          draggable="false"
          class="link"
          @focus.native="onLinkFocus"
          @blur.native="onLinkBlur"
        >
          <!-- @slot Optional slot section containing the title contents, should not contain a heading element. -->
          <slot 
            v-if="$slots.title"
            name="title"
          ></slot>
          <KTextTruncator
            v-else
            :text="title"
            :maxLines="titleMaxLines"
          />
        </router-link>
      </component>

      <div
        v-if="thumbnailDisplay !== ThumbnailDisplays.NONE"
        class="thumbnail"
      >
        <!-- 
          Render KImg even if thumbnailSrc is not provided since in that case
          KImg takes care of showing the gray placeholder area.
        -->
        <KImg
          data-test="thumbnail-img"
          :src="thumbnailSrc"
          :scaleType="thumbnailScaleType"
          :aspectRatio="thumbnailAspectRatio"
          :isDecorative="true"
          :appearanceOverrides="thumbnailStyles"
          @error="onThumbnailError"
        />
        <span
          v-if="!thumbnailSrc || thumbnailError"
          class="thumbnail-placeholder"
        >
          <!-- @slot Places content to the thumbnail placeholder area. -->
          <slot name="thumbnailPlaceholder"></slot>
        </span>
      </div>
      <div
        v-if="hasAboveTitleArea"
        data-test="aboveTitle"
        class="above-title"
      >
        <!-- @slot Places content to the area above the title. -->
        <slot name="aboveTitle"></slot>
      </div>
      <div
        v-if="hasBelowTitleArea"
        data-test="belowTitle"
        class="below-title"
        :style="{ color: $themeTokens.annotation }"
      >
        <!-- @slot Places content to the area below the title. -->
        <slot name="belowTitle"></slot>
      </div>
      <div
        v-if="hasFooterArea"
        data-test="footer"
        class="footer"
      >
        <!-- @slot Places content to the footer area. -->
        <slot name="footer"></slot>
      </div>
    </div>
    <!--
      .stop modifier on keyup.enter and click events
      to ensure that navigation doesn't occur when
      a selection control is pressed or clicked
    -->
    <div
      v-if="$slots.select"
      class="selection-control"
      @keyup.enter.stop
      @click.stop
    >
      <!-- @slot For selection controls such as checkbox or radio button -->
      <slot name="select"></slot>
    </div>
  </li>

</template>


<script>

  import { inject } from '@vue/composition-api';

  const Orientations = {
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
    setup() {
      // provided by `KCardGrid`
      // controls the width and layout of `KCard` items in the grid
      const gridItemStyle = inject('gridItemStyle');

      return {
        gridItemStyle,
      };
    },
    props: {
      /**
       * A Vue route object that defines
       * where the card click should navigate.
       */
      to: {
        type: Object,
        required: true,
      },
      /**
       * HTML heading level in range (h2 - h6) for the title
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
       * Card title
       */
      title: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * Truncates title lines
       */
      titleMaxLines: {
        type: Number,
        required: false,
        default: 2,
      },
      /**
       * Controls card orientation.
       * Options: `'horizontal'`, `'vertical'`.
       */
      orientation: {
        type: String,
        default: 'horizontal',
        validator: cardValidator(Orientations, 'orientation'),
      },
      /**
       * Controls if and how the thumbnail appears in the card.
       * Options: `'none'`, `'small'`, or `'large'`.
       * */
      thumbnailDisplay: {
        type: String,
        default: 'none',
        validator: cardValidator(ThumbnailDisplays, 'thumbnailDisplay'),
      },
      /**
       * Thumbnail source path.
       **/
      thumbnailSrc: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * Specifies how the thumbnail scales in the card.
       * Options: `'centerInside'`, `'contain'`, `'fitXY'`.
       */
      thumbnailScaleType: {
        type: String,
        default: 'centerInside',
      },
      /**
       * Controls the alignment of the thumbnail area
       * in horizontal card orientation.
       * Options: `'left'`, `'right'`
       */
      thumbnailAlign: {
        type: String,
        default: 'left',
        validator: cardValidator(ThumbnailAlignOptions, 'thumbnailAlign'),
      },
      /**
       * If `aboveTitle` slot is empty, controls
       * whether its space is preserved or not.
       */
      preserveAboveTitle: {
        type: Boolean,
        default: false,
      },
      /**
       * If `belowTitle` slot is empty, controls
       * whether its space is preserved or not.
       */
      preserveBelowTitle: {
        type: Boolean,
        default: false,
      },
      /**
       * If `footer` slot is empty, controls
       * whether its space is preserved or not.
       */
      preserveFooter: {
        type: Boolean,
        default: false,
      },
      /**
       * Private. Do not use.
       */
      // Disables validations and functionality
      // that shouldn't be present when card
      // used as loading skeleton via `SkeletonCard`
      isSkeleton: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        mouseDownTime: 0,
        ThumbnailDisplays,
        isLinkFocused: false,
        thumbnailError: false,
      };
    },
    computed: {
      focusStyle() {
        return this.isLinkFocused ? this.$coreOutline : {};
      },
      hasAboveTitleArea() {
        return this.$slots.aboveTitle || this.preserveAboveTitle;
      },
      hasBelowTitleArea() {
        return this.$slots.belowTitle || this.preserveBelowTitle;
      },
      hasFooterArea() {
        return this.$slots.footer || this.preserveFooter;
      },
      headingElement() {
        return this.headingLevel ? 'h' + this.headingLevel : undefined;
      },
      cardAreaClasses() {
        return this.stylesAndClasses.cardAreaClasses;
      },
      thumbnailAspectRatio() {
        return this.stylesAndClasses.thumbnailAspectRatio;
      },
      thumbnailStyles() {
        return this.stylesAndClasses.thumbnailStyles;
      },
      /*
        A source-of-truth that organizes styles and classes by layout combinations
        to aid understanding of what is applied exactly to each layout.

        Alongside other configurations, contains dynamic styles that <style>
        can't handle. Whenever possible, prioritize using <style> over dynamic styles
        since our RTL framework can't pick dynamic styles. Make sure to use 'isRtl'
        when adding dynamic styles related to alignment.
      */
      stylesAndClasses() {
        const thumbnailCommonStyles = {
          width: '100%',
          height: '100%',
        };
        const cardAreaCommonClasses = [
          this.hasAboveTitleArea ? 'with-above-title' : 'without-above-title',
          this.hasBelowTitleArea ? 'with-below-title' : undefined,
        ];

        if (
          this.orientation === Orientations.VERTICAL &&
          this.thumbnailDisplay === ThumbnailDisplays.LARGE
        ) {
          return {
            cardAreaClasses: [...cardAreaCommonClasses, 'vertical-with-large-thumbnail'],
            thumbnailAspectRatio: undefined,
            thumbnailStyles: {
              ...thumbnailCommonStyles,
              borderRadius: '8px 8px 0 0',
            },
          };
        }

        if (
          this.orientation === Orientations.VERTICAL &&
          this.thumbnailDisplay === ThumbnailDisplays.SMALL
        ) {
          return {
            cardAreaClasses: [...cardAreaCommonClasses, 'vertical-with-small-thumbnail'],
            thumbnailAspectRatio: undefined,
            thumbnailStyles: {
              ...thumbnailCommonStyles,
              borderRadius: '4px',
            },
          };
        }

        if (
          this.orientation === Orientations.VERTICAL &&
          this.thumbnailDisplay === ThumbnailDisplays.NONE
        ) {
          return {
            cardAreaClasses: [...cardAreaCommonClasses, 'vertical-with-none-thumbnail'],
            thumbnailAspectRatio: undefined,
            thumbnailStyles: undefined,
          };
        }

        if (
          this.orientation === Orientations.HORIZONTAL &&
          this.thumbnailDisplay === ThumbnailDisplays.LARGE
        ) {
          return {
            cardAreaClasses: [
              ...cardAreaCommonClasses,
              'horizontal-with-large-thumbnail',
              `thumbnail-align-${this.thumbnailAlign}`,
            ],
            thumbnailAspectRatio: undefined,
            thumbnailStyles: {
              ...thumbnailCommonStyles,
              borderRadius: this.thumbnailAlign === 'right' ? '0 8px 8px 0' : '8px 0 0 8px',
            },
          };
        }

        if (
          this.orientation === Orientations.HORIZONTAL &&
          this.thumbnailDisplay === ThumbnailDisplays.SMALL
        ) {
          return {
            cardAreaClasses: [
              ...cardAreaCommonClasses,
              'horizontal-with-small-thumbnail',
              `thumbnail-align-${this.thumbnailAlign}`,
            ],
            thumbnailAspectRatio: '1:1',
            thumbnailStyles: {
              ...thumbnailCommonStyles,
              borderRadius: '8px',
            },
          };
        }

        if (
          this.orientation === Orientations.HORIZONTAL &&
          this.thumbnailDisplay === ThumbnailDisplays.NONE
        ) {
          return {
            cardAreaClasses: [...cardAreaCommonClasses, 'horizontal-with-none-thumbnail'],
            thumbnailAspectRatio: undefined,
            thumbnailStyles: undefined,
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
      onLinkFocus() {
        if (this.isSkeleton) {
          return;
        }
        this.isLinkFocused = true;
      },
      onLinkBlur() {
        this.isLinkFocused = false;
      },
      onThumbnailError() {
        this.thumbnailError = true;
      },
      navigate() {
        if (this.isSkeleton) {
          return;
        }
        this.$router.push(this.to);
      },
      onFocus(e) {
        /**
         * Emitted when a card gets focus
         */
        this.$emit('focus', e);
      },
      onHover(e) {
        /**
         * Emitted when a card is hovered
         */
        this.$emit('hover', e);
      },
      onEnter() {
        this.navigate();
      },
      onMouseDown() {
        this.mouseDownTime = new Date().getTime();
      },
      onClick() {
        if (this.isSkeleton) {
          return;
        }
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

  $spacer: 16px;

  /************* Common styles **************/

  .k-card {
    width: 100%;
    padding: 0;
    margin: 0;
    font-size: 12px;
    text-align: left;
    text-decoration: none;
    list-style-type: none;
    cursor: pointer;

    &.with-selection-controls {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;

      .selection-control {
        margin-right: 20px;
      }
    }
  }

  .card-area {
    @extend %dropshadow-2dp;

    position: relative; /* basis for absolute positioning of thumbnail images */
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100%;
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
  }

  .below-title {
    order: 4;
  }

  .footer {
    order: 5;
  }

  .thumbnail-placeholder {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0; /* <img> in KImg with z-index 1 should cover the placeholder after loaded */
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .link {
    display: inline-block; // allows title placeholder in the skeleton card
    width: 100%; // allows title placeholder in the skeleton card
    color: inherit;
    text-decoration: none;
    outline: none; // the focus ring is moved to the whole <li>
  }

  /************* Manage spaces *************/

  .heading,
  .above-title,
  .below-title,
  .footer {
    padding: 0;
    margin-top: 0;
    margin-right: $spacer;
    margin-bottom: calc(#{$spacer} / 2);
    margin-left: $spacer;
  }

  // when the 'aboveTitle' area is present,
  // apply top margin to it and also set smaller
  // margin between the area and the heading...
  .with-above-title {
    .above-title {
      margin-top: $spacer;
      margin-bottom: calc(#{$spacer} / 2);
    }
  }

  // ...and when the 'aboveTitle' area is not present,
  // instead apply the top margin to the heading
  .without-above-title {
    .heading {
      margin-top: $spacer;
    }
  }

  // if there's the 'belowTitle' area present,
  // override the heading's margin to smaller one
  .with-below-title {
    .heading {
      margin-bottom: calc(#{$spacer} / 2);
    }
  }

  /* stylelint-disable no-duplicate-selectors */
  .footer {
    margin-top: auto; // push footer to the bottom
  }
  /* stylelint-enable no-duplicate-selectors */

  /************* Layout-specific styles *************/

  .vertical-with-large-thumbnail {
    .thumbnail {
      height: 180px;
    }
  }

  .vertical-with-small-thumbnail {
    /* stylelint-disable scss/at-extend-no-missing-placeholder */
    @extend .vertical-with-large-thumbnail;
    /* stylelint-enable scss/at-extend-no-missing-placeholder */

    .thumbnail {
      height: calc(180px - #{$spacer});
      margin: $spacer $spacer 0;
    }
  }

  .horizontal-with-large-thumbnail {
    $thumbnail-width: 40%;

    .thumbnail {
      position: absolute;
      width: $thumbnail-width;
      height: 100%;
    }

    .heading,
    .above-title,
    .below-title,
    .footer {
      width: calc(100% - #{$thumbnail-width} - 2 * #{$spacer});
    }

    &.thumbnail-align-left {
      align-items: flex-end;

      .thumbnail {
        left: 0;
      }
    }

    &.thumbnail-align-right {
      align-items: flex-start;

      .thumbnail {
        right: 0;
      }
    }
  }

  .horizontal-with-small-thumbnail {
    $thumbnail-width: null;

    /*
      Coordinates space taken by the thumbnail area and the content area
      next to it more intelligently in browsers that support `clamp()` by:

      - Instead of defining 'width', 'min-width', and 'max-width' separately,
        `clamp()` is used with the goal to have the actual thumbnail width
        saved in the single `$thumbnail-width` value.

      - The `$thumbnail-width` value is then referenced when calculating
        the remaining space for the content area, ensuring the precise
        distribution of space.

      Resolves some issues related to unprecise calculations, most importantly
      this removes the area of empty space between the thumbnail and content areas
      in some card's sizes, wasting space that can be used for card's textual content.
    */
    @mixin clamp-with-fallback($min, $preferred, $max) {
      // fallback for browsers that don't support 'clamp()'
      $thumbnail-width: $preferred;

      width: $thumbnail-width;
      min-width: $min;
      max-width: $max;

      // clamp(1px, 1%, 1px) only used for testing support
      @supports (width: clamp(1px, 1%, 1px)) {
        $thumbnail-width: clamp(#{$min}, #{$preferred}, #{$max});

        width: $thumbnail-width;
      }
    }

    .thumbnail {
      @include clamp-with-fallback(100px, 35%, 120px);

      position: absolute;
      top: $spacer;
    }

    .heading,
    .above-title,
    .below-title {
      width: calc(100% - #{$thumbnail-width} - 3 * #{$spacer});
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