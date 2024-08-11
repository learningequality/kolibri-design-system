<template>

  <span :style="outerContainerStyles">
    <span :style="innerContainerStyles">
      <img
        :src="src"
        :alt="alternativeText"
        :style="imgStyles"
        @error="onError"
      >
      <span
        v-if="$slots.placeholder"
        :style="{ position: 'absolute', top: '0', right: '0', left: '0', bottom: '0', zIndex: '0' }"
      >
        <!-- @slot Places content to the placeholder area. -->
        <slot name="placeholder"></slot>
      </span>

      <span
        v-if="$slots.topLeft"
        :style="{ position: 'absolute', top: '0',left: '0', zIndex: '2' }"
      >
        <!-- @slot Places content on top of an image, to its top left corner. -->
        <slot name="topLeft"></slot>
      </span>
      <span
        v-if="$slots.topRight"
        :style="{ position: 'absolute', top: '0', right: '0', zIndex: '2' }"
      >
        <!-- @slot Places content on top of an image, to its top right corner. -->
        <slot name="topRight"></slot>
      </span>
      <span
        v-if="$slots.bottomLeft"  
        :style="{ position: 'absolute', bottom: '0', left: '0', zIndex: '2' }"
      >
        <!-- @slot Places content on top of an image, to its bottom left corner. -->
        <slot name="bottomLeft"></slot>
      </span>
      <span
        v-if="$slots.bottomRight"
        :style="{ position: 'absolute', bottom: '0', right: '0', zIndex: '2' }"
      >
        <!-- @slot Places content on top of an image, to its bottom right corner. -->
        <slot name="bottomRight"></slot>
      </span>

    </span>
  </span>

</template>


<script>

  const ScaleTypes = {
    CENTER_INSIDE: 'centerInside',
    CONTAIN: 'contain',
    FIT_XY: 'fitXY',
  };
  const RATIO_REGEX = /^(\d+):(\d+)$/;

  function isValidScaleType(value) {
    return value && Object.values(ScaleTypes).includes(value);
  }

  /**
   * Extract x and y from an aspect ratio x:y
   *
   * @param {String} value aspect ratio in "x:y" format
   * @returns {Object} { x, y }
   */
  function extractAspectRatio(value) {
    const match = value.match(RATIO_REGEX);
    return { x: match[1], y: match[2] };
  }

  /**
   * @returns {Boolean} Returns true if value satisfies "x:y"
   *                    format where x and y are numbers
   */
  function isValidAspectRatio(value) {
    return RATIO_REGEX.test(value);
  }

  /**
   * Displays an image and provides additional functionality
   * to manipulate it such as setting an aspect ratio,
   * scaling, and more.
   */
  export default {
    name: 'KImg',
    props: {
      /**
       * Sets the image path
       */
      src: {
        type: String,
        default: null,
      },
      /**
       * Alternative text for the image. Required unless `isDecorative` is true.
       */
      altText: {
        type: String,
        default: null,
      },
      /**
       * Sets the image as decorative.
       */
      isDecorative: {
        type: Boolean,
        default: false,
      },
      /**
       * Sets the ratio of the width(w) to the height(h)
       * of the image container. The required format is `w:h`.
       */
      aspectRatio: {
        type: String,
        default: null,
        validator: isValidAspectRatio,
      },
      /**
       * Specifies how an image should be scaled within the container.
       * Can be one of  `'centerInside'`, `'contain'`, or `'fitXY'`.
       */
      scaleType: {
        type: String,
        default: 'centerInside', // needs to be duplicated rather than using ScaleTypes.CENTER_INSIDE, otherwise it doesn't render correctly in the auto-generated Props documentation
        validator: isValidScaleType,
      },
      /**
       * A color to be displayed instead or behind an image.
       * It creates a background area which respects the dimensions
       * set on the image container.
       *
       * It can serve as (1) a color of the area surrounding an image when
       * it's letterboxed, (2) a placeholder area displayed
       * over the whole container when an image source is not provided,
       * (3) a progressive loading experience as the colored background
       * is displayed while an image is loading.
       *
       * Its default value is `$themePalette.grey.v_50`.
       */
      backgroundColor: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * The border radius of the image container or the placeholder area
       */
      borderRadius: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * A dynamic style object that overrides the default styles
       */
      appearanceOverrides: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      ratio() {
        return extractAspectRatio(this.aspectRatio);
      },
      alternativeText() {
        return this.isDecorative ? '' : this.altText;
      },
      baseStyles() {
        const backgroundColor = this.backgroundColor
          ? this.backgroundColor
          : this.$themePalette.grey.v_50;
        const borderRadius = this.borderRadius ? this.borderRadius : 0;

        return {
          outerContainer: {
            display: 'block',
            position: 'relative',
            backgroundColor,
            borderRadius,
            overflow: 'hidden',
          },
          innerContainer: {
            display: 'block',
          },
          img: {
            display: 'block',
            position: 'relative',
            zIndex: '1',
          },
        };
      },
      /**
       * Returns all styles related to the logic
       * that controls how the image scales within
       * the image container
       */
      scaleStyles() {
        const scaleKind = isValidScaleType(this.scaleType) ? this.scaleType : ScaleTypes.CONTAIN;
        const scaleStyles = {
          [ScaleTypes.CONTAIN]: {
            outerContainer: {},
            innerContainer: {
              height: '100%',
              width: '100%',
            },
            img: {
              objectFit: 'contain',
              height: '100%',
              width: '100%',
            },
          },
          [ScaleTypes.FIT_XY]: {
            outerContainer: {},
            innerContainer: {
              height: '100%',
              width: '100%',
            },
            img: {
              width: '100%',
              height: '100%',
            },
          },
          [ScaleTypes.CENTER_INSIDE]: {
            outerContainer: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
            innerContainer: {},
            img: {
              maxWidth: '100%',
              maxHeight: '100%',
            },
          },
        };
        return scaleStyles[scaleKind];
      },
      /**
       * Returns all styles related to the logic
       * that controls the image ratio
       */
      ratioStyles() {
        if (!this.aspectRatio) {
          return {
            outerContainer: {},
            innerContainer: {},
            img: {},
          };
        }
        // https://www.sitepoint.com/maintain-image-aspect-ratios-responsive-web-design/
        const paddingTopInPercent = (this.ratio.y / this.ratio.x) * 100;
        return {
          outerContainer: {},
          innerContainer: {
            position: 'relative',
            display: 'block',
            height: 0,
            width: '100%',
            padding: `${paddingTopInPercent}% 0 0`,
          },
          img: {
            position: 'absolute',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
            margin: 'auto',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 2,
          },
        };
      },
      outerContainerStyles() {
        // order matters
        return {
          ...this.baseStyles.outerContainer,
          ...this.scaleStyles.outerContainer,
          ...this.ratioStyles.outerContainer,
          ...this.appearanceOverrides,
        };
      },
      innerContainerStyles() {
        // order matters
        return {
          ...this.baseStyles.innerContainer,
          ...this.scaleStyles.innerContainer,
          ...this.ratioStyles.innerContainer,
        };
      },
      imgStyles() {
        // order matters
        return {
          ...this.baseStyles.img,
          ...this.scaleStyles.img,
          ...this.ratioStyles.img,
        };
      },
    },
    created() {
      if (!this.isDecorative && !this.altText) {
        throw new Error('Missing required prop - provide altText or indicate isDecorative');
      }
    },
    methods: {
      onError(event) {
        /**
         * Emitted when the image fails to load. The DOM event that triggered the error is available in the payload.
         */
        this.$emit('error', event);
      },
    },
  };

</script>


<style scoped></style>