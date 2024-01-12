<template>

  <span :style="rootContainerStyles">
    <span :style="ratioContainerStyles">
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
        <!-- @slot Places content to the image placeholder area. -->
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
        default: '',
      },
      /**
       * Sets the image as decorative.
       */
      isDecorative: {
        type: Boolean,
        default: false,
      },
      /**
       * Sets the height of the image container
       */
      height: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the width of the image container
       */
      width: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the maximum height of the image container
       */
      maxHeight: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the minimum height of the image container
       */
      minHeight: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the maximum width of the image container
       */
      maxWidth: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * 	Sets the minimum width of the image container
       */
      minWidth: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the ratio of the width(w) to the height(h)
       * of the image container. The required format is `w:h`.
       */
      aspectRatio: {
        type: String,
        default: undefined,
        validator: isValidAspectRatio,
      },
      /**
       * Specifies how an image should be scaled within the container.
       * Can be one of  `'centerInside'` (default), `'contain'`, or `'fitXY'`.
       * See the documentation examples.
       */
      scaleType: {
        type: String,
        default: 'centerInside', // needs to be duplicated rather than using ScaleTypes.CENTER_INSIDE, otherwise it doesn't render correctly in the auto-generated Props documentation
        validator: isValidScaleType,
      },
      /**
       * A color to be displayed instead or behind an image.
       * It creates a background area which respects the dimensions
       * set on the container.
       *
       * It can serve as (1) a color of the area surrounding an image when
       * it's letterboxed, (2) creates a placeholder area displayed
       * over the whole container when an image source is not provided,
       * (3) creates a progressive loading experience as the colored background
       * is displayed while an image is loading.
       *
       * Its default value is `$themePalette.grey.v_200`.
       */
      backgroundColor: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * The border radius of an image or its placeholder area
       * as a standard CSS 'border-radius' value.
       */
      borderRadius: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * Accepts a Vue dynamic styles object to override the default styles to modify the appearance of the component.
       * It's attributes always take precedence over any specified styling (internal component's styles, styles calculated from props etc.)
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
          : this.$themePalette.grey.v_200;
        const borderRadius = this.borderRadius ? this.borderRadius : 0;

        return {
          rootContainer: {
            display: 'block',
            position: 'relative',
            backgroundColor,
            borderRadius,
            overflow: 'hidden',
            height: this.validateAndFormatUnits(this.height),
            width: this.validateAndFormatUnits(this.width),
            maxHeight: this.validateAndFormatUnits(this.maxHeight),
            minHeight: this.validateAndFormatUnits(this.minHeight),
            maxWidth: this.validateAndFormatUnits(this.maxWidth),
            minWidth: this.validateAndFormatUnits(this.minWidth),
          },
          ratioContainer: {
            display: 'block',
          },
          img: {
            display: 'block',
            position: 'relative',
            zIndex: '1',
          },
        };
      },
      scaleStyles() {
        const scaleKind = isValidScaleType(this.scaleType) ? this.scaleType : ScaleTypes.CONTAIN;
        const scaleStyles = {
          [ScaleTypes.CONTAIN]: {
            rootContainer: {},
            ratioContainer: {
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
            rootContainer: {},
            ratioContainer: {
              height: '100%',
              width: '100%',
            },
            img: {
              width: '100%',
              height: '100%',
            },
          },
          [ScaleTypes.CENTER_INSIDE]: {
            rootContainer: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
            ratioContainer: {},
            img: {
              maxWidth: '100%',
              maxHeight: '100%',
            },
          },
        };
        return scaleStyles[scaleKind];
      },
      ratioStyles() {
        if (!this.aspectRatio) {
          return {
            rootContainer: {},
            ratioContainer: {},
            img: {},
          };
        }
        const paddingTopInPercent = (this.ratio.y / this.ratio.x) * 100;
        return {
          rootContainer: {},
          ratioContainer: {
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
      rootContainerStyles() {
        // order matters
        return {
          ...this.baseStyles.rootContainer,
          ...this.scaleStyles.rootContainer,
          ...this.ratioStyles.rootContainer,
          ...this.appearanceOverrides,
        };
      },
      ratioContainerStyles() {
        // order matters
        return {
          ...this.baseStyles.ratioContainer,
          ...this.scaleStyles.ratioContainer,
          ...this.ratioStyles.ratioContainer,
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
      validateAndFormatUnits(propValue) {
        if (propValue) {
          if (!isNaN(propValue)) {
            return `${propValue}px`;
          } else {
            // split numbers apart from units
            const [, ...arr] = propValue.match(/(\d*\.?\d+)([a-zA-Z | %]*)/);
            const validUnits = [
              '%',
              'cm',
              'em',
              'ex',
              'ch',
              'in',
              'lh',
              'mm',
              'px',
              'rem',
              'rlh',
              'vh',
              'vw',
            ];

            // if made up of valid numbers and valid units
            if (!isNaN(arr[0]) && validUnits.includes(arr[1])) {
              return propValue;
            }
          }
        }
      },
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