<template>

  <div>
    <div :style="{ display: 'flex', justifyContent: 'flex-end', marginBottom: '17px' }">
      <KButtonGroup>
        <KButton
          primary
          @click="load200"
        >
          Load (0.2 s)
        </KButton>
        <KButton
          primary
          @click="load400"
        >
          Load (0.4 s)
        </KButton>
        <KButton
          primary
          @click="load4000"
        >
          Load (4 s)
        </KButton>
        <KButton @click="debug = !debug"> Debug: {{ debug ? 'On' : 'Off' }} </KButton>
      </KButtonGroup>
    </div>
    <KCardGrid
      layout="1-2-2"
      :skeletonsConfig="skeletonsConfig"
      :loading="loading"
      :debug="debug"
    >
      <Card
        v-for="i in 3"
        :key="i"
        :headingLevel="4"
        :orientation="windowBreakpoint < 4 ? 'vertical' : 'horizontal'"
        :prependTitle="`(${i})`"
      />
    </KCardGrid>
  </div>

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
    data() {
      return {
        loading: true,
        debug: false,
        skeletonsConfig: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'vertical',
            thumbnailDisplay: 'large',
            height: '400px',
          },
          {
            breakpoints: [4, 5, 6, 7],
            height: '220px',
            orientation: 'horizontal',
            thumbnailAlign: 'left',
          },
        ],
      };
    },
    mounted() {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
    methods: {
      load200() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 200);
      },
      load400() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 400);
      },
      load4000() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 4000);
      },
    },
  };

</script>
