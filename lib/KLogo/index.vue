<template>

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

</template>


<script>

  import kolibriLogo from './kolibri-logo.svg';

  export default {
    name: 'KLogo',
    props: {
      /**
       * Alternative text for the logo
       */
      altText: {
        type: String,
        required: true,
        default: '',
      },
      /**
       * Sets the height for the logo
       */
      height: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the width for the logo
       */
      width: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the maximum height for the logo
       */
      maxHeight: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the minimum height for the logo
       */
      minHeight: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the maximum width for the logo
       */
      maxWidth: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * 	Sets the minimum width for the logo
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
  };

</script>
