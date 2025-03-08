<template>

  <div>
    <div style="display: flex; justify-content: flex-end; margin-bottom: 12px">
      <KButtonGroup>
        <KButton
          primary
          @click="load500"
        >
          Load (0.5 s)
        </KButton>
        <KButton
          primary
          @click="load1200"
        >
          Load (1.2 s)
        </KButton>
        <KButton
          primary
          @click="load4000"
        >
          Load (4 s)
        </KButton>
        <KButton @click="debug = !debug">Debug: {{ debug ? 'On' : 'Off' }}</KButton>
      </KButtonGroup>
    </div>

    <KCardGrid
      layout="1-2-2"
      :skeletonsConfig="skeletonsConfig"
      :loading="loading"
      :debug="debug"
    >
      <DocsKCard
        v-for="i in 3"
        :key="i"
        :headingLevel="4"
        orientation="vertical"
      >
        <template #title>
          <div style="height: 52px">
            <KTextTruncator
              :maxLines="2"
              :text="`(${i}) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities`"
            />
          </div>
        </template>

        <template #media>
          <img
            src="https://via.placeholder.com/400x300?text=Hummingbird"
            alt="Hummingbird on a branch"
            style="width: 100%; max-width: 200px; object-fit: cover"
          >
        </template>

        <template #belowTitle>
          <p>
            Discover how hummingbirds play a big role in nature despite their small size. Find out
            more about their beauty, how they help plants grow, and where they live.
          </p>
        </template>

        <template #footer>
          <div style="margin-top: 10px">
            <span
              style="
  padding: 4px 8px;
  margin-right: 8px;
  font-size: 14px;
  color: #616161;
  background-color: #dddddd;
  border-radius: 4px;
              "
            >
              <KIcon
                icon="readSolid"
                style=" position: relative; top: 2px; margin-right: 4px;font-size: 13px"
              />
              Read
            </span>
            <span style=" font-size: 14px;color: #616161"> Short Activity </span>
          </div>
        </template>
      </DocsKCard>
    </KCardGrid>
  </div>

</template>


<script>

  import useKResponsiveWindow from '../../../lib/composables/useKResponsiveWindow';
  import DocsKCard from '../../pages-components/DocsKCard.vue';
  import KTextTruncator from '../../../lib/KTextTruncator.vue';
  import KIcon from '../../../lib/KIcon/index.vue';

  export default {
    name: 'LoadingStateExample',
    components: {
      DocsKCard,
      KTextTruncator,
      KIcon,
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
      load500() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
      load1200() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 1200);
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
