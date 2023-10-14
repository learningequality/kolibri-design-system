<template>

  <div>
    <KImg
      :src="logo"
      :altText="alternateText"
    />
  </div>

</template>

<script>

  import KImg from '../KImg.vue';
  import kolibriLogo from './kolibri-logo.svg';

  export default {
    name: 'KLogo',
    props: {
      /**
       * Alternate text for the image. This is required and will throw a warning when it's not provided (empty) unless isDecorative is true
       */
      altText: {
        type: String,
        default: '',
      },
      /**
       * Sets the height for the component
       */
      height: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the width for the component
       */
      width: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the maximum height for the component
       */
      maxHeight: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the minimum height for the component
       */
      minHeight: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the maximum width for the component
       */
      maxWidth: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * 	Sets the minimum width for the component
       */
      minWidth: {
        type: [Number, String],
        default: undefined,
      },
    },
    data() {
      return {
    computed: {
      alternateText() {
        return this.altText;
      },
      imgHeight() {
        return this.validateAndFormatUnits(this.height);
      },
      imgWidth() {
        return this.validateAndFormatUnits(this.width);
      },
      imgMaxHeight() {
        return this.validateAndFormatUnits(this.maxHeight);
      },
      imgMinHeight() {
        return this.validateAndFormatUnits(this.minHeight);
      },
      imgMaxWidth() {
        return this.validateAndFormatUnits(this.maxWidth);
      },
      imgMinWidth() {
        return this.validateAndFormatUnits(this.minWidth);
      },
      logo() {
        return kolibriLogo;
      },
    },
    created() {
      console.log(this.altText);
      if (!this.altText) {
        throw new Error('Missing required prop - provide altText');
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
    },
  };

</script>

<style scoped></style>
