<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Usage" anchor="#usage">
      In all the modes below, <code>KSkeletonLoader</code> provides delay and minimum loading time optimizations. What differs is only apperiance of skeletons. <code>KSkeletonLoader</code> is built to allow for experimentation and adding of new skeleton appearances easily.

      <h2>Generic</h2>
      <div :style="{ display: 'flex', justifyContent: 'flex-end' }">
        <KButtonGroup>
          <KButton primary @click="load500">
            Load (0.5 s)
          </KButton>
          <KButton primary @click="load1200">
            Load (1.2 s)
          </KButton>
          <KButton primary @click="load4000">
            Load (4 s)
          </KButton>
        </KButtonGroup>
      </div>

      <DocsShow block>
        <KSkeletonLoader
          :loading="loading"
          appearance="generic"
        >
          <h3>Learn everything about hummingbirds</h3>

          <p>Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live.</p>

          <p>Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live.</p>
        </KSkeletonLoader>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KSkeletonLoader
          :loading="loading"
          appearance="generic"
        >
          <h3>Learn everything about hummingbirds</h3>

          <p>Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live.</p>

          <p>Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live.</p>
        </KSkeletonLoader>
      </DocsShowCode>
      <!-- eslint-enable -->

      <h2>Card grid: over more sections</h2>
      <p>If there are more sections on a page being loaded, in some situations it may be best to show only one skeleton grid to prevent section jumps.</p>

      <div :style="{ display: 'flex', justifyContent: 'flex-end' }">
        <KButtonGroup>
          <KButton primary @click="load500">
            Load (0.5 s)
          </KButton>
          <KButton primary @click="load1200">
            Load (1.2 s)
          </KButton>
          <KButton primary @click="load4000">
            Load (4 s)
          </KButton>
        </KButtonGroup>
      </div>

      <DocsShow block>
        <KSkeletonLoader
          :loading="loading"
          :config="config"
          appearance="cardGrid"
        >
          <h3>Section 1</h3>
          <KCardGrid layout="1-1-1">
            <DocsKCard
              v-for="i in 2"
              :key="i"
              :headingLevel="6"
              :prependTitle="`(${i})`"
              orientation="horizontal"
            />
          </KCardGrid>

          <h3>Section 2</h3>
          <KCardGrid layout="1-1-1">
            <DocsKCard
              v-for="i in 2"
              :key="i"
              :headingLevel="6"
              :prependTitle="`(${i})`"
              orientation="horizontal"
            />
          </KCardGrid>
        </KSkeletonLoader>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KSkeletonLoader
          :loading="loading"
          :config="config"
          appearance="cardGrid"
        >
          <h3>Section 1</h3>
          <KCardGrid layout="1-1-1">
            <KCard
              v-for="i in 2"
              ...
            />
          </KCardGrid>

          <h3>Section 2</h3>
          <KCardGrid layout="1-1-1">
            <KCard
              v-for="i in 2"
              ...
            />
          </KCardGrid>
        </KSkeletonLoader>
      </DocsShowCode>
      <!-- eslint-enable -->

      <h2>Card grid: for each section</h2>
      <p>If we want to achieve even better progressive loading experience, we can also show skeletons for each section individually. In this case, some other measure may be needed for smooth transitioning, here for example <code>min-height</code> is set on each section to mitigate jump.</p>

      <div :style="{ display: 'flex', justifyContent: 'flex-end' }">
        <KButtonGroup>
          <KButton primary @click="load500">
            Load (0.5 s)
          </KButton>
          <KButton primary @click="load1200">
            Load (1.2 s)
          </KButton>
          <KButton primary @click="load4000">
            Load (4 s)
          </KButton>
        </KButtonGroup>
      </div>

      <DocsShow block>
        <section :style="{ 'min-height': '230px' }">
          <h3>Section 1</h3>
          <KSkeletonLoader
            :loading="loading"
            :config="config2"
            appearance="cardGrid"
          >
            <KCardGrid layout="1-1-1">
              <DocsKCard
                v-for="i in 2"
                :key="i"
                :headingLevel="6"
                :prependTitle="`(${i})`"
                orientation="horizontal"
              />
            </KCardGrid>
          </KSkeletonLoader>
        </section>

        <h3>Section 2</h3>
        <section :style="{ 'min-height': '230px' }">
          <KSkeletonLoader
            :loading="loading"
            :config="config2"
            appearance="cardGrid"
          >
            <KCardGrid layout="1-1-1">
              <DocsKCard
                v-for="i in 2"
                :key="i"
                :headingLevel="6"
                :prependTitle="`(${i})`"
                orientation="horizontal"
              />
            </KCardGrid>
          </KSkeletonLoader>
        </section>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <section :style="{ 'min-height': '230px' }">
          <h3>Section 1</h3>
          <KSkeletonLoader
            :loading="loading"
            :config="config"
            appearance="cardGrid"
          >
            <KCardGrid layout="1-1-1">
              <KCard
                v-for="i in 2"
                ...
              />
            </KCardGrid>
          </KSkeletonLoader>
        </section>

        <section :style="{ 'min-height': '230px' }">
          <h3>Section 2</h3>
          <KSkeletonLoader
            :loading="loading"
            :config="config"
            appearance="cardGrid"
          >
            <KCardGrid layout="1-1-1">
              <KCard
                v-for="i in 2"
                ...
              />
            </KCardGrid>
          </KSkeletonLoader>
        </section>
      </DocsShowCode>
      <!-- eslint-enable -->

      <h2>Custom</h2>
      <p>If generic or card skeletons are not suitable, it is possible to provide a custom skeleton shape via the <code>#skeleton</code> slot. All transition and animations will be applied on it automatically. This can be used for experimentation with new skeleton shapes that can later be moved to KDS as a new <code>appearance</code> mode if needed.</p>

      <div :style="{ display: 'flex', justifyContent: 'flex-end' }">
        <KButtonGroup>
          <KButton primary @click="load500">
            Load (0.5 s)
          </KButton>
          <KButton primary @click="load1200">
            Load (1.2 s)
          </KButton>
          <KButton primary @click="load4000">
            Load (4 s)
          </KButton>
        </KButtonGroup>
      </div>

      <DocsShow block>
        <KSkeletonLoader
          :loading="loading"
          appearance="custom"
        >
          <template #skeleton>
            <div
              class="shape-1"
              :style="{ backgroundColor: $themePalette.grey.v_100 }"
            ></div>
            <div
              class="shape-2"
              :style="{ backgroundColor: $themePalette.grey.v_100 }"
            ></div>
          </template>

          <template>
            <h3>Learn everything about hummingbirds</h3>

            <p>Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live.</p>

            <p>Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live.</p>
          </template>
        </KSkeletonLoader>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KSkeletonLoader
          :loading="loading"
          appearance="custom"
        >
          <template #skeleton>
            <div
              class="shape-1"
              :style="{ backgroundColor: $themePalette.grey.v_100 }"
            ></div>
            <div
              class="shape-2"
              :style="{ backgroundColor: $themePalette.grey.v_100 }"
            ></div>
          </template>

          <template>
            <h3>Learn everything about hummingbirds</h3>

            <p>Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live.</p>

            <p>Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live.</p>
          </template>
        </KSkeletonLoader>
      </DocsShowCode>
      <!-- eslint-enable -->

      <!-- eslint-disable -->
      <DocsShowCode language="css">
        .shape-1,
        .shape-2 {
          height: 100px;
          margin-top: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
        }

        .shape-1 {
          width: 100%;
        }

        .shape-2 {
          width: 80%;
        }
      </DocsShowCode>
      <!-- eslint-enable -->

    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  import DocsKCard from '../pages-components/DocsKCard';

  export default {
    name: 'Kskeletonloader',
    components: {
      DocsKCard,
    },
    data: function() {
      return {
        loading: false,
        config: {
          layout: '1-1-1',
          layoutOverride: {},
          skeletonsConfig: [
            {
              breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
              count: 3,
              orientation: 'horizontal',
              thumbnailDisplay: 'large',
              thumbnailAlign: 'left',
              height: '250px',
            },
            {
              breakpoints: [3, 4, 5, 6, 7],
              height: '180px',
            },
          ],
        },
        config2: {
          layout: '1-1-1',
          layoutOverride: {},
          skeletonsConfig: [
            {
              breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
              count: 1,
              orientation: 'horizontal',
              thumbnailDisplay: 'large',
              thumbnailAlign: 'left',
              height: '250px',
            },
            {
              breakpoints: [3, 4, 5, 6, 7],
              height: '180px',
            },
          ],
        },
      };
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


<style lang="scss" scoped>

  .shape-1,
  .shape-2 {
    height: 100px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 4px;
  }

  .shape-1 {
    width: 100%;
  }

  .shape-2 {
    width: 80%;
  }

</style>