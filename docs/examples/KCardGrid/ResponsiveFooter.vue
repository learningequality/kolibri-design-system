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

  import useKResponsiveWindow from '../../../lib/composables/useKResponsiveWindow';

  export default {
    setup() {
      const { windowBreakpoint } = useKResponsiveWindow();
      return { windowBreakpoint };
    },
    data() {
      return {
        loading: true,
        skeletonsConfig: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'vertical',
            thumbnailDisplay: 'large',
            height: '430px',
          },
          {
            breakpoints: [4, 5, 6, 7],
            height: '370px',
          },
        ],
      };
    },
    mounted() {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  };

</script>
