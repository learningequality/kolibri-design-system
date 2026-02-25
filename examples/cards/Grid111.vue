<template>

  <KCardGrid
    layout="1-1-1"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <Card
      v-for="i in 2"
      :key="i"
      :headingLevel="5"
      orientation="horizontal"
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
            minHeight: '220px',
            orientation: 'horizontal',
            thumbnailDisplay: 'large',
            thumbnailAlign: 'left',
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
