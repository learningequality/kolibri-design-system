<template>

  <KCardGrid
    layout="1-1-1"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <Card
      :headingLevel="3"
      orientation="horizontal"
      thumbnailDisplay="small"
      thumbnailAlign="right"
      prependTitle="(1)"
      hideFooter
    >
      <template #title="{ titleText }">
        <KLabeledIcon icon="readSolid">
          <KTextTruncator
            :text="titleText"
            :maxLines="1"
          />
        </KLabeledIcon>
      </template>
    </Card>
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
            orientation: 'horizontal',
            thumbnailDisplay: 'small',
            thumbnailAlign: 'right',
            minHeight: '130px',
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
