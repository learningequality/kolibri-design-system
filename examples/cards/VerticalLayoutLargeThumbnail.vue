<template>

  <KCardGrid
    layout="1-2-3"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <Card
      :headingLevel="4"
      orientation="vertical"
      thumbnailDisplay="large"
      prependTitle="(1)"
    >
      <template #aboveTitle>
        <KLabeledIcon
          icon="readSolid"
          label="Read"
        />
      </template>
      <template #footer>
        <div class="pills">
          <span> Short Activity </span>
          <span> Biology </span>
        </div>
      </template>
    </Card>
    <Card
      :headingLevel="4"
      orientation="vertical"
      thumbnailDisplay="large"
      :thumbnailSrc="null"
      prependTitle="(2)"
    >
      <template #aboveTitle>
        <KLabeledIcon
          icon="readSolid"
          label="Read"
        />
      </template>
      <template #footer>
        <div class="pills">
          <span> Short Activity </span>
        </div>
      </template>
    </Card>
    <Card
      :headingLevel="4"
      orientation="vertical"
      thumbnailDisplay="small"
      prependTitle="(3)"
      hideFooter
    >
      <template #aboveTitle>
        <KLabeledIcon
          icon="readSolid"
          label="Read"
        />
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
            orientation: 'vertical',
            thumbnailDisplay: 'large',
            minHeight: '490px',
          },
          {
            breakpoints: [3, 4, 5, 6, 7],
            minHeight: '420px',
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


<style scoped>

  .pills {
    margin-left: -4px;
    color: var(--tokens-annotation);
  }

  .pills span {
    display: inline-block;
    padding: 4px 8px;
    margin: 4px;
    background-color: var(--palette-grey-v100);
    border-radius: 4px;
  }

</style>
