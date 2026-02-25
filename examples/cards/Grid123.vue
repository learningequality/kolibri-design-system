<template>

  <KCardGrid
    layout="1-2-3"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <Card
      v-for="i in 5"
      :key="i"
      :headingLevel="5"
      :prependTitle="`(${i})`"
    />
  </KCardGrid>

</template>


<script>

  import Card from './Card';

  export default {
    components: {
      Card,
    },
    props: {
      /**
       * How long in seconds to simulate loading
       * state before displaying cards
       */
      loadFor: {
        type: Number,
        default: 3,
      },
    },
    data() {
      return {
        loading: this.loadFor > 0,
        skeletonsConfig: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            minHeight: '380px',
            orientation: 'vertical',
            thumbnailDisplay: 'large',
          },
        ],
      };
    },
    mounted() {
      if (this.loadFor > 0) {
        setTimeout(() => {
          this.loading = false;
        }, this.loadFor * 1000);
      }
    },
  };

</script>
