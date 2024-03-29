<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>Provides the following reactive window's size information:</p>

      <dl>
        <dt><code>windowIsSmall</code>, <code>windowIsMedium</code>, and <code>windowIsLarge</code></dt>
        <dd>Returns <code>true</code> when the window width fits the small, medium, or large breakpoint respectively as defined in <DocsInternalLink text="Layout: Responsiveness" href="/layout#responsiveness" /> (boolean)</dd>

        <dt><code>windowHeight</code></dt>
        <dd>Returns the window height in pixels (integer)</dd>

        <dt><code>windowWidth</code></dt>
        <dd>Returns the window width in pixels (integer)</dd>

        <dt><code>windowBreakpoint</code></dt>
        <dd>Returns one of the granular breakpoints defined as levels in <DocsInternalLink text="Layout: Responsiveness" href="/layout#responsiveness" /> (integer, 0-7)</dd>
      </dl>

      <p>Provided reactive properties are typically used to dynamically drive the layout of components by adjusting inline styles, CSS classes, component visibility, or even swapping out one component for a completely different one.</p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="javascript">
        import useKResponsiveWindow from 'kolibri-design-system/lib/composables/useKResponsiveWindow';

        export default {
          setup() {
            const {
              windowIsSmall,
              windowIsMedium,
              windowIsLarge,
              windowHeight,
              windowWidth,
              windowBreakpoint
            } = useKResponsiveWindow();
          }
        };
      </DocsShowCode>
      <!-- eslint-enable -->
    </DocsPageSection>

    <DocsPageSection title="Example" anchor="#example">
      <p>
        Consider a Vue file with the following template and script:
      </p>
      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="html">
        <div class="box" :style="boxStyle">
          Box 1
        </div>
        <div class="box" :style="boxStyle">
          Box 2
        </div>
      </DocsShowCode>
      <DocsShowCode language="javascript">
        import { computed } from '@vue/composition-api';
        import useKResponsiveWindow from 'kolibri-design-system/lib/composables/useKResponsiveWindow';

        export default {
          setup() {
            const {
              windowIsLarge
            } = useKResponsiveWindow();

            const boxStyle = computed(function () {
              return { display: windowIsLarge.value ? 'inline-block' : 'block' };
            });

            return { 
              boxStyle,
            };
          }
        };
      </DocsShowCode>
      <!-- eslint-enable -->
      <p>
        This results in two boxes that stack vertically on small screens and otherwise display side-by-side:
      </p>
      <DocsShow>
        <div>Window is large: {{ windowIsLarge }}</div>
        <div>
          <div class="box" :style="boxStyle">
            Box 1
          </div>
          <div class="box" :style="boxStyle">
            Box 2
          </div>
        </div>
      </DocsShow>
      <p>
        Try adjusting your browser window size to see the example in action.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsInternalLink text="Layout: Responsiveness" href="/layout#responsiveness" /> has an overview of breakpoints
        </li>
        <li>
          See <DocsLibraryLink component="KResponsiveElement" /> if you need a component's size reactive information rather than that of the window
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  import { computed } from '@vue/composition-api';
  import useKResponsiveWindow from '../../lib/composables/useKResponsiveWindow';

  export default {
    setup() {
      const { windowIsLarge } = useKResponsiveWindow();

      const boxStyle = computed(() => {
        return { display: windowIsLarge.value ? 'inline-block' : 'block' };
      });

      return { windowIsLarge, boxStyle };
    },
  };

</script>


<style lang="scss" scoped>

  .box {
    padding: 16px;
    margin-top: 8px;
    margin-right: 8px;
    border: 1px solid gray;
  }

</style>
