<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Once added to a component it provides the following reactive window's size information:
      </p>

      <dl>
        <dt><code>windowIsSmall</code>, <code>windowIsMedium</code>, and <code>windowIsLarge</code></dt>
        <dd>Returns <code>true</code> when the window width fits the small, medium, or large breakpoint respectively as defined in <DocsInternalLink text="Layout: Responsiveness" href="/layout#responsiveness" /> (boolean)</dd>

        <dt><code>windowHeight</code></dt>
        <dd>Returns the window height in pixels (integer)</dd>

        <dt><code>windowWidth</code></dt>
        <dd>Returns the window width in pixels (integer)</dd>

        <dt><code>windowBreakpoint</code></dt>
        <dd>Returns one of the more granular breakpoints defined as levels in <DocsInternalLink text="Layout: Responsiveness" href="/layout#responsiveness" /> (integer, 0-7)</dd>
      </dl>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <p>Provided reactive properties are typically used to dynamically drive the layout of components by adjusting inline styles, CSS classes, component visibility, or even swapping out one component for a completely different one.</p>

      <h3>As mixin</h3>
      <p>It can be imported as <code>KResponsiveWindowMixin</code>. As with any other mixin, you need to register it in the script part of a component file:</p>

      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="javascript">
        import KResponsiveWindowMixin from 'kolibri-design-system/lib/KResponsiveWindowMixin';

        export default {
          mixins: [KResponsiveWindowMixin]
        };
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>
        Provided reactive properties can then be accessed on the component instance via <code>this</code>.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Example" anchor="#example">
      <p>
        Consider a Vue file with this in its template and script:
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
        computed: {
          boxStyle() {
            if (this.windowIsLarge) {
              return { display: 'inline-block' };
            }
            return { display: 'block' };
          },
        },
      </DocsShowCode>
      <!-- eslint-enable -->
      <p>
        This results in two boxes that stack vertically on small screens and otherwise display side-by-side:
      </p>
      <DocsShow>
        <div>Breakpoint level: {{ windowBreakpoint }}</div>
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

  import responsiveWindowMixin from '~~/lib/KResponsiveWindowMixin.js';

  export default {
    mixins: [responsiveWindowMixin],
    computed: {
      boxStyle() {
        return { display: this.windowIsLarge ? 'inline-block' : 'block' };
      },
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
