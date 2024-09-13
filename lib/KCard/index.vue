<template>

  <!-- see trackInputModality  for [data-focus=true] -->
  <!--
    do not use @onmouseup but rather @click
    to allow for @click.stop on buttons and similar
    rendered within a card via its slots -->
  <li
    tabindex="0"
    data-focus="true"
    :class="['k-card', $computedClass(coreOutlineFocus)]"
    @focus="onFocus"
    @mouseenter="onHover"
    @mousedown="onMouseDown"
    @click="onClick"
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
          tabindex="-1"
          :to="to"
          draggable="false"
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
    props: {
      /**
       * A regular Vue route object that defines
       * where the card click should navigate.
       */
      to: {
        type: Object,
        required: true,
      },
      /**
       * Sets the HTML heading level in range (h2 - h6) for the title.
       * Ensure that the heading level is correct within a particular
       * context of a page where cards are displayed.
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
       * Sets card title if provided. The title should be
       * unique within a grid and descriptive to aid screenreader
       * navigation.
       */
      title: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * Truncates title to this number of lines.
       */
      titleLines: {
        type: Number,
        required: false,
        default: 2,
      },
      /**
       * Controls content orientation.
       * Options: `'horizontal'`, `'vertical'`.
       */
      layout: {
        type: String,
        default: 'horizontal',
        validator: cardValidator(Layouts, 'layout'),
      },
      /**
       * Controls how the thumbnail appears in the card.
       * Options: `'none'`, `'small'`, or `'large'`.
       * */
      thumbnailDisplay: {
        type: String,
        default: 'none',
        validator: cardValidator(ThumbnailDisplays, 'thumbnailDisplay'),
      },
      /**
       * Sets the thumbnail source path.
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
       * in horizontal layouts. with `'small'` or `'large'` thumbnails
       * Options: `'left'`, `'right'`
       */
      thumbnailAlign: {
        type: String,
        default: 'left',
        validator: cardValidator(ThumbnailAlignOptions, 'thumbnailAlign'),
      },
      /**
       * If `aboveTitle` slot is empty, this controls whether
       * its space is preserved or not. Typically used to achieve
       * consistent vertical alignment of information when there
       * are multiple cards on the same grid row.
       */
      preserveAboveTitle: {
        type: Boolean,
        default: false,
      },
      /**
       * If `belowTitle` slot is empty, this controls whether
       * its space is preserved or not. Typically used to achieve
       * consistent vertical alignment of information when there
       * are multiple cards on the same grid row.
       */
      preserveBelowTitle: {
        type: Boolean,
        default: false,
      },
      /**
       * If `footer` slot is empty, this controls whether
       * its space is preserved or not. Typically used to achieve
       * consistent vertical alignment of information when there
       * are multiple cards on the same grid row.
       */
      preserveFooter: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        mouseDownTime: 0,
        ThumbnailDisplays,
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
      onClick() {
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
    display: block;
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  .card-area {
    @extend %dropshadow-2dp;

    position: relative; /* basis for absolute positioning of thumbnail images */
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    height: auto;
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
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;

    a {
      color: inherit;
      text-decoration: none;
    }
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
      min-height: 45%;
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
    .thumbnail {
      position: absolute;
      top: $spacer;
      width: 35%; /* square dimension achieved via KImgs's aspect-ratio 1:1 */
      min-width: 100px;
      max-width: 120px;
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