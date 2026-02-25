<template>

  <KCardGrid
    layout="1-2-2"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <Card
      v-for="i in 2"
      :key="i"
      :headingLevel="4"
      :prependTitle="`(${i})`"
    >
      <template #footer>
        <div
          :style="{
            marginLeft: '-4px',
            color: $themeTokens.annotation,
          }"
        >
          <span
            :style="{
              display: 'inline-block',
              padding: '4px 8px',
              margin: '4px',
              borderRadius: '4px',
              backgroundColor: $themePalette.grey.v_100,
            }"
          >
            <KIcon
              icon="readSolid"
              :style="{ fontSize: '13px', position: 'relative', top: '3px' }"
            />
            Read
          </span>

          <span
            :style="{
              display: 'inline-block',
              padding: '4px 8px',
              margin: '4px',
              borderRadius: '4px',
              backgroundColor: $themePalette.grey.v_100,
            }"
          >
            Short Activity
          </span>

          <template v-if="windowBreakpoint > 3">
            <span
              :style="{
                display: 'inline-block',
                padding: '4px 8px',
                margin: '4px',
                borderRadius: '4px',
                backgroundColor: $themePalette.grey.v_100,
              }"
            >
              Biology
            </span>

            <span
              :style="{
                display: 'inline-block',
                padding: '4px 8px',
                margin: '4px',
                borderRadius: '4px',
                backgroundColor: $themePalette.grey.v_100,
              }"
            >
              Ecology
            </span>
          </template>
        </div>
      </template>
    </Card>
  </KCardGrid>

</template>


<script>

  import useKResponsiveWindow from '../../lib/composables/useKResponsiveWindow';
  import Card from './Card';

  export default {
    components: {
      Card,
    },
    setup() {
      const { windowBreakpoint } = useKResponsiveWindow();
      return { windowBreakpoint };
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
            minHeight: '430px',
          },
          {
            breakpoints: [4, 5, 6, 7],
            minHeight: '370px',
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
