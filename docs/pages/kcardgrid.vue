<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>Displays a grid of cards <DocsLibraryLink component="KCard" />.</p>

      <p>
        <code>KCardGrid</code> provides base layouts for the most common grids in our ecosystem, as
        well as customization or complete override of the base layouts.
      </p>

      <p>
        Together with <code>KCard</code>, it ensures accessible navigation within card lists, such
        as announcing only their titles when using the tab key to avoid overwhelming screen reader
        outputs.
      </p>

      <p>
        Grid's visual behavior is based on the
        <DocsInternalLink
          text="window breakpoint system"
          href="/layout#responsiveness"
        />.
        <code>KCardGrid</code> determines how many cards per row to display based on its layout
        and the current window breakpoint.
      </p>

      <p>
        <code>KCardGrid</code> doesn't manage inner card content. This is <code>KCard</code>'s
        responsibility.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Guidelines"
      anchor="#guidelines"
    >
      <ul>
        <li>
          <code>KCardGrid</code> must be a direct parent of <code>KCard</code> (<DocsInternalLink
            text="KCard: KCard and KCardGrid"
            href="/kcard#k-card-and-grid"
          />)
        </li>
        <li>
          Avoid setting card widths. Rely on <code>KCardGrid</code> layouts and customization
          options (<DocsInternalLink
            text="Base layouts"
            href="#base-layouts"
          />,
          <DocsInternalLink
            text="Layout customization"
            href="#layout-customization"
          />)
        </li>
        <li>
          Avoid setting card heights. Instead, set heights on card sections, use text truncation, or
          limit content (<DocsInternalLink
            text="Card height, content tolerance and alignment"
            href="#card-height-and-alignment"
          />)
        </li>
        <li>
          Ensure robust content tolerance and consistent content alignment (<DocsInternalLink
            text="Card height, content tolerance and alignment"
            href="#card-height-and-alignment"
          />)
        </li>
        <li>
          Preview cards on all screen sizes (<DocsInternalLink
            text="Fine-tuning responsiveness"
            href="#fine-tuning-responsiveness"
          />)
        </li>
        <li>
          Configure loading skeleton cards to match the expected visual output of cards with loaded
          data as closely as possible on all screen sizes (<DocsInternalLink
            text="Loading state"
            href="#loading-state"
          />)
        </li>
      </ul>

      <p>
        Also follow
        <DocsInternalLink
          text="KCard guidelines"
          href="/kcard#guidelines"
        />.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <DocsSubNav
        :items="[ 
          { text: 'Base layouts', href: '#base-layouts' },
          { text: 'Layout customization', href: '#layout-customization' },
          {
            text: 'Card height, content tolerance and alignment',
            href: '#card-height-and-alignment',
          },
          { text: 'Fine-tuning responsiveness', href: '#fine-tuning-responsiveness' },
          { text: 'Loading state', href: '#loading-state' },
        ]"
      />

      <h3>
        Base layouts
        <DocsAnchorTarget anchor="#base-layouts" />
      </h3>

      <p>
        Three base layouts are available:
        <code>'1-1-1'</code>, <code>'1-2-2'</code>, and <code>'1-2-3'</code>. They determine the
        number of cards per row for each
        <DocsInternalLink
          text="window breakpoint level"
          href="/layout#responsiveness"
        />.
      </p>

      <!-- '1-1-1' grid example -->
      <h4>
        '1-1-1' grid
        <DocsAnchorTarget anchor="#1-1-1-grid" />
      </h4>
      <p>
        Displays a grid with 1 card per row on every screen size.
        <DocsToggleButton
          contentId="more-1-1-1-grid"
          showText="Show full definition"
          hideText="Hide full definition"
        />
      </p>

      <DocsToggleContent id="more-1-1-1-grid">
        <DocsTable>
          <tr>
            <th></th>
            <th>Level 0</th>
            <th>Level 1</th>
            <th>Level 2</th>
            <th>Level 3</th>
            <th>Level 4</th>
            <th>Level 5</th>
            <th>Level 6</th>
            <th>Level 7</th>
          </tr>
          <tr>
            <th>Cards per row</th>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </DocsTable>
      </DocsToggleContent>

      <DocsExample
        exampleId="1-1-1-grid"
        loadExample="KCardGrid/BasicGrids/1-1-1.vue"
      >
        <template #html>
          <!-- eslint-disable -->
          <DocsShowCode language="html">
            <KCardGrid layout="1-1-1">
              <KCard v-for="(card, index) in 2" :key="index" />
            </KCardGrid>
          </DocsShowCode>
          <!-- eslint-enable -->
        </template>

        <template #javascript>
          <!-- prettier-ignore -->
          <DocsShowCode language="javascript">
            export default {
              name: 'Grid111Example',
              components: { DocsKCard, KIcon, KTextTruncator },
            };
          </DocsShowCode>
          <!-- prettier-ignore-end -->
        </template>
      </DocsExample>

      <!-- '1-2-2' grid example -->
      <h4>
        '1-2-2' grid
        <DocsAnchorTarget anchor="#1-2-2-grid" />
      </h4>
      <p>
        Displays a grid with 1 card per row on smaller screens, and 2 cards per row on medium and larger screens.
        <DocsToggleButton
          contentId="more-1-2-2-grid"
          showText="Show full definition"
          hideText="Hide full definition"
        />
      </p>

      <DocsToggleContent id="more-1-2-2-grid">
        <DocsTable>
          <tr>
            <th></th>
            <th>Level 0</th>
            <th>Level 1</th>
            <th>Level 2</th>
            <th>Level 3</th>
            <th>Level 4</th>
            <th>Level 5</th>
            <th>Level 6</th>
            <th>Level 7</th>
          </tr>
          <tr>
            <th>Cards per row</th>
            <td>1</td>
            <td>1</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
          </tr>
        </DocsTable>
      </DocsToggleContent>

      <DocsExample
        exampleId="1-2-2-grid"
        loadExample="KCardGrid/BasicGrids/1-2-2.vue"
      >
        <template #html>
          <!-- eslint-disable -->
          <DocsShowCode language="html">
            <KCardGrid layout="1-2-2">
              <KCard v-for="(card, index) in 3" :key="index" />
            </KCardGrid>
          </DocsShowCode>
          <!-- eslint-enable -->
        </template>

        <template #javascript>
          <!-- prettier-ignore -->
          <DocsShowCode language="javascript">
            export default {
              name: 'Grid122Example',
              components: { DocsKCard, KIcon, KTextTruncator },
              data() {
                return {
                  loading: true,
                  skeletonsConfig2: [
                    {
                      breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
                      orientation: 'vertical',
                      thumbnailDisplay: 'large',
                      height: '470px'
                    },
                    { breakpoints: [2, 3], height: '430px' },
                    { breakpoints: [4, 5, 6, 7], height: '360px' }
                  ]
                };
              },
              mounted() {
                setTimeout(() => { this.loading = false; }, 3000);
              }
            };
          </DocsShowCode>
          <!-- prettier-ignore-end -->
        </template>
      </DocsExample>

      <!-- '1-2-3' grid example -->
      <h4>
        '1-2-3' grid
        <DocsAnchorTarget anchor="#1-2-3-grid" />
      </h4>
      <p>
        Displays a grid with 1 card per row on smaller screens, 2 on medium, and 3 on larger screens.
        <DocsToggleButton
          contentId="more-1-2-3-grid"
          showText="Show full definition"
          hideText="Hide full definition"
        />
      </p>

      <DocsToggleContent id="more-1-2-3-grid">
        <DocsTable>
          <tr>
            <th></th>
            <th>Level 0</th>
            <th>Level 1</th>
            <th>Level 2</th>
            <th>Level 3</th>
            <th>Level 4</th>
            <th>Level 5</th>
            <th>Level 6</th>
            <th>Level 7</th>
          </tr>
          <tr>
            <th>Cards per row</th>
            <td>1</td>
            <td>1</td>
            <td>2</td>
            <td>2</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>
        </DocsTable>
      </DocsToggleContent>

      <DocsExample
        exampleId="1-2-3-grid"
        loadExample="KCardGrid/BasicGrids/1-2-3.vue"
      >
        <template #html>
          <!-- eslint-disable -->
          <DocsShowCode language="html">
            <KCardGrid layout="1-2-3">
              <KCard v-for="(card, index) in 5" :key="index" />
            </KCardGrid>
          </DocsShowCode>
          <!-- eslint-enable -->
        </template>

        <template #javascript>
          <!-- prettier-ignore -->
          <DocsShowCode language="javascript">
            export default {
              name: 'Grid123Example',
              components: { DocsKCard, KIcon, KTextTruncator },
              data() {
                return {
                  loading: true,
                  skeletonsConfig3: [
                    {
                      breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
                      orientation: 'vertical',
                      thumbnailDisplay: 'large',
                      height: '470px'
                    },
                    { breakpoints: [2, 3], height: '430px' },
                    { breakpoints: [4, 5, 6, 7], height: '390px' }
                  ]
                };
              },
              mounted() {
                setTimeout(() => { this.loading = false; }, 3000);
              }
            };
          </DocsShowCode>
          <!-- prettier-ignore-end -->
        </template>
      </DocsExample>

      <!-- Layout customization -->
      <h3>
        Layout customization
        <DocsAnchorTarget anchor="#layout-customization" />
      </h3>

      <p>
        Base layouts can be customized or even completely overridden via the
        <code>layoutOverride</code> prop. <code>layoutOverride</code> takes an array of objects
        <code>{ breakpoints, cardsPerRow, columnGap, rowGap }</code>, where:
      </p>

      <ul>
        <li>
          <code>breakpoints</code> is an array of <code>0-7</code> values corresponding to the
          <DocsInternalLink
            text="window breakpoint levels"
            href="/layout#responsiveness"
          />. All other attributes in the same object take effect on these breakpoints.
        </li>
        <li>
          <code>cardsPerRow</code> overrides the number of cards per row for the specified breakpoints.
        </li>
        <li>
          <code>columnGap</code>/<code>rowGap</code> overrides grid column/row gaps for the specified breakpoints.
        </li>
      </ul>

      <p>For example:</p>

      <DocsExample
        exampleId="custom-layout"
        loadExample="KCardGrid/LayoutOverride.vue"
      >
        <template #html>
          <!-- eslint-disable -->
          <DocsShowCode language="html">
            <KCardGrid layout="1-2-3" :layoutOverride="layoutOverride">
              <KCard v-for="(card, index) in 6" :key="index" />
            </KCardGrid>
          </DocsShowCode>
          <!-- eslint-enable -->
        </template>

        <template #javascript>
          <!-- prettier-ignore -->
          <DocsShowCode language="javascript">
            export default {
              name: 'LayoutOverrideExample',
              components: { DocsKCard, KTextTruncator },
              data() {
                return {
                  loading: true,
                  layoutOverride: [
                    { breakpoints: [0, 1], columnGap: '20px', rowGap: '20px' },
                    { breakpoints: [4, 5, 6, 7], cardsPerRow: 4 }
                  ],
                  skeletonsConfig: [
                    {
                      breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
                      orientation: 'vertical',
                      thumbnailDisplay: 'large'
                    }
                  ]
                };
              },
              mounted() {
                setTimeout(() => { this.loading = false; }, 3000);
              }
            };
          </DocsShowCode>
          <!-- prettier-ignore-end -->
        </template>
      </DocsExample>

      <p>
        Here, the base <code>1-2-3</code> layout is partially overridden. Column and row gaps are decreased to <code>20px</code> on breakpoints <code>0-1</code>, and the number of cards per row is increased to 4 on breakpoints <code>4-7</code>.
      </p>

      <!-- Card height, content tolerance and alignment -->
      <h3>
        Card height, content tolerance and alignment
        <DocsAnchorTarget anchor="#card-height-and-alignment" />
      </h3>

      <p>
        Cards displayed in <code>KCardGrid</code> stretch vertically to fit their content, making a grid row height match its tallest card.
      </p>

      <p>
        <em>Setting height on cards is discouraged. Instead, manage height bottom-up, for example by setting height on card sections, using text truncation, or other ways to limit its inner content.</em>
        Such approaches ensure content tolerance, prevent unexpected overflows or excessive height, and keep vertical alignment of card sections consistent on a grid row.
        Consider:
      </p>

      <DocsExample
        exampleId="card-height-alignment"
        loadExample="KCardGrid/CardHeightAlignment.vue"
      >
        <template #html>
          <!-- eslint-disable -->
          <DocsShowCode language="html">
            <KCardGrid layout="1-2-3">
              <KCard />
              <KCard />
              <KCard />
            </KCardGrid>
          </DocsShowCode>
          <!-- eslint-enable -->
        </template>

        <template #javascript>
          <!-- prettier-ignore -->
          <DocsShowCode language="javascript">
            export default {
              name: 'CardHeightAlignmentExample',
              components: { KLabeledIcon, KTextTruncator, DocsKCard },
              data() { return { loading: true }; },
              mounted() { setTimeout(() => { this.loading = false; }, 3000); }
            };
          </DocsShowCode>
          <!-- prettier-ignore-end -->
        </template>
      </DocsExample>

      <p>
        Here, <code>KCard</code> has the following adjustments:
      </p>

      <ul>
        <li>Height is set on its <code>aboveTitle</code> slot content, and its <code>preserveAboveTitle</code> prop keeps the slot even without content.</li>
        <li>Height is set on its <code>title</code> slot, and the title is truncated.</li>
        <li>The <code>belowTitle</code> slot's content is truncated.</li>
        <li>The number of pills in its <code>footer</code> is limited.</li>
      </ul>

      <p>
        <code>KCard</code> offers other <code>preserve...</code> props corresponding to its slots.
      </p>

      <!-- Fine-tuning responsiveness -->
      <h3>
        Fine-tuning responsiveness
        <DocsAnchorTarget anchor="#fine-tuning-responsiveness" />
      </h3>

      <p>
        Grid configuration can be combined with <code>KCard</code>'s settings to further improve responsive experience.
        A common pattern is switching <code>KCard</code>'s horizontal orientation to vertical for smaller screens to organize content more effectively in limited space:
      </p>

      <DocsExample
        exampleId="responsive-orientation"
        loadExample="KCardGrid/ResponsiveOrientation.vue"
      >
        <template #html>
          <!-- eslint-disable -->
          <DocsShowCode language="html">
            <KCardGrid layout="1-2-2">
              <KCard v-for="(card, index) in 2" :key="index" :orientation="windowBreakpoint < 4 ? 'vertical' : 'horizontal'" />
            </KCardGrid>
          </DocsShowCode>
          <!-- eslint-enable -->
        </template>

        <template #javascript>
          <!-- prettier-ignore -->
          <DocsShowCode language="javascript">
            import useKResponsiveWindow from 'kolibri-design-system/lib/composables/useKResponsiveWindow';
            export default {
              name: 'ResponsiveOrientationExample',
              components: { DocsKCard, KTextTruncator, KIcon },
              setup() {
                const { windowBreakpoint } = useKResponsiveWindow();
                return { windowBreakpoint };
              },
              data() { return { loading: true }; },
              mounted() { setTimeout(() => { this.loading = false; }, 3000); }
            };
          </DocsShowCode>
          <!-- prettier-ignore-end -->
        </template>
      </DocsExample>

      <p>
        This technique also works for adjusting <code>KCard</code> slots content. In the following example, some metadata pills are hidden on smaller screens:
      </p>

      <DocsExample
        exampleId="responsive-footer"
        loadExample="KCardGrid/ResponsiveFooter.vue"
      >
        <template #html>
          <!-- eslint-disable -->
          <DocsShowCode language="html">
            <KCardGrid layout="1-2-2">
              <KCard v-for="(card, index) in 2" :key="index" />
            </KCardGrid>
          </DocsShowCode>
          <!-- eslint-enable -->
        </template>

        <template #javascript>
          <!-- prettier-ignore -->
          <DocsShowCode language="javascript">
            import useKResponsiveWindow from 'kolibri-design-system/lib/composables/useKResponsiveWindow';
            export default {
              name: 'ResponsiveFooterExample',
              components: { DocsKCard, KIcon, KTextTruncator },
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
                      height: '430px'
                    },
                    { breakpoints: [4, 5, 6, 7], height: '370px' }
                  ]
                };
              },
              mounted() { setTimeout(() => { this.loading = false; }, 3000); }
            };
          </DocsShowCode>
          <!-- prettier-ignore-end -->
        </template>
      </DocsExample>

      <!-- Loading state -->
      <h3>
        Loading state
        <DocsAnchorTarget anchor="#loading-state" />
      </h3>

      <p>
        While data is loading, <code>KCardGrid</code> shows loading skeleton cards. Use the
        <code>loading</code> prop to toggle the state.
        Note that internal optimizations may affect how closely the visual loading experience matches <code>loading</code>.
      </p>

      <ul>
        <li>The loading skeletons won't be displayed for short loading times (&lt; 1s)</li>
        <li>When displayed, they will be visible for at least 1s</li>
      </ul>
      <p>Use the buttons in the example below to preview.</p>
      <p>
        <strong>Number of loading skeletons</strong><br />
        By default, the number corresponds to the number of cards in a full row.
        This behavior can be overridden via the <code>count</code> attribute.
      </p>

      <p>
        <strong>Loading skeletons configuration</strong><br />
        Use the <code>skeletonsConfig</code> prop to configure skeleton cards.
      </p>

      <p>
        <code>skeletonsConfig</code> takes an array of objects { breakpoints, count, height, orientation, thumbnailDisplay, thumbnailAlign }.
      </p>

      <ul>
        <li>
          <code>breakpoints</code> is an array of <code>0-7</code> values corresponding to the
          <DocsInternalLink text="window breakpoint levels" href="/layout#responsiveness" />.
        </li>
        <li>
          <code>count</code> sets the number of skeleton cards.
        </li>
        <li><code>height</code> sets the height of skeleton cards.</li>
        <li>
          <code>orientation</code> sets the orientation of skeleton cards (see <DocsInternalLink text="KCard's orientation" href="/kcard#prop:orientation" code />).
        </li>
        <li>
          <code>thumbnailDisplay</code> sets the thumbnail display (see <DocsInternalLink text="KCard's thumbnailDisplay" href="/kcard#prop:thumbnailDisplay" code />).
        </li>
        <li>
          <code>thumbnailAlign</code> sets the thumbnail alignment (see <DocsInternalLink text="KCard's thumbnailAlign" href="/kcard#prop:thumbnailAlign" code />).
        </li>
      </ul>

      <p>
        For easier development, enable the <code>debug</code> prop to display the current breakpoint.
      </p>

      <DocsExample exampleId="loading-state" loadExample="KCardGrid/LoadingState.vue">
        <template #html>
          <!-- eslint-disable -->
          <DocsShowCode language="html">
            <KCardGrid layout="1-2-2" :loading="loading">
              <KCard v-for="(card, index) in 3" :key="index" />
            </KCardGrid>
          </DocsShowCode>
          <!-- eslint-enable -->
        </template>

        <template #javascript>
          <!-- prettier-ignore -->
          <DocsShowCode language="javascript">
            import useKResponsiveWindow from 'kolibri-design-system/lib/composables/useKResponsiveWindow';
            export default {
              name: 'LoadingStateExample',
              components: { DocsKCard, KTextTruncator, KIcon },
              setup() {
                const { windowBreakpoint } = useKResponsiveWindow();
                return { windowBreakpoint };
              },
              data() {
                return {
                  loading: true,
                  debug: false,
                  skeletonsConfig: [
                    { breakpoints: [0, 1, 2, 3, 4, 5, 6, 7], orientation: 'vertical', thumbnailDisplay: 'large', height: '400px' },
                    { breakpoints: [4, 5, 6, 7], height: '220px', orientation: 'horizontal', thumbnailAlign: 'left' }
                  ]
                };
              },
              mounted() { setTimeout(() => { this.loading = false; }, 3000); },
              methods: {
                load500() { this.loading = true; setTimeout(() => { this.loading = false; }, 500); },
                load1200() { this.loading = true; setTimeout(() => { this.loading = false; }, 1200); },
                load4000() { this.loading = true; setTimeout(() => { this.loading = false; }, 4000); }
              }
            };
          </DocsShowCode>
          <!-- prettier-ignore-end -->
        </template>
      </DocsExample>

      <p>
        Here, the skeleton cards use a base height of <code>400px</code> on breakpoints <code>0-3</code> and <code>220px</code> on breakpoints <code>4-7</code>.
      </p>

      <p>
        To see skeleton layouts, reload this page and the <code>KCard</code> page.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Related"
      anchor="#related"
    >
      <ul>
        <li>
          <DocsLibraryLink component="KCard" /> is a component for use within <code>KCardGrid</code>
        </li>
        <li>
          <DocsLibraryLink component="useKResponsiveWindow" /> can be used to detect the current window breakpoint for
          <DocsInternalLink
            text="fine-tuning responsiveness"
            href="#fine-tuning-responsiveness"
          />
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>

<script>
import useKResponsiveWindow from '../../lib/composables/useKResponsiveWindow';

export default {
  name: 'DocsKcardGrid',
  setup() {
    const { windowBreakpoint } = useKResponsiveWindow();
    return { windowBreakpoint };
  },
};
</script>