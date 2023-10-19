<template>

  <div>
    <KImg
      :src="logo"
      :altText="altText"
      :height="height"
      :width="width"
      :maxHeight="maxHeight"
      :minHeight="minHeight"
      :maxWidth="maxWidth"
      :minWidth="minWidth"
    />
  </div>

</template>

<script>

  import kolibriLogo from './kolibri-logo.svg';

  export default {
    name: 'KLogo',
    props: {
      /**
       * Alternate text for the image. This is required and will throw a warning when it's not provided (empty)
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
    computed: {
      logo() {
        return kolibriLogo;
      },
    },
    created() {
      if (!this.altText) {
        throw new Error('Missing required prop - provide altText');
      }
    },
  };

</script>

<style scoped></style>
