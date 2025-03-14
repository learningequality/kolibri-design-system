<template>

  <DocsPageTemplate apiDocs>
    <!-- Overview Section -->
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
        />. <code>KCardGrid</code> determines how many cards per row to display based on its layout
        and the current window breakpoint.
      </p>
      <p>
        <code>KCardGrid</code> doesn't manage inner card content. This is <code>KCard</code>'s
        responsibility.
      </p>
    </DocsPageSection>

    <!-- Guidelines Section -->
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

    <!-- Usage Section -->
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
        <!-- Only template and script are shown (style block is hidden) -->
        <template #html>
          <DocsShowCode language="html">
            <KCardGrid layout="1-1-1">
              <KCard
                v-for="(card, index) in 2"
                :key="index"
                ...
              />
            </KCardGrid>
          </DocsShowCode>
        </template>
        <template #javascript>
          <DocsShowCode language="javascript">
            {` /* eslint-disable */ import DocsKCard from '../../../pages-components/DocsKCard.vue';
            import KIcon from '../../../../lib/KIcon/index.vue'; import KTextTruncator from
            '../../../../lib/KTextTruncator.vue'; export default { name: 'Grid111Example',
            components: { DocsKCard, KIcon, KTextTruncator, }, }; /* eslint-enable */ `}
          </DocsShowCode>
        </template>
      </DocsExample>

      <!-- '1-2-2' grid example -->
      <h4>
        '1-2-2' grid
        <DocsAnchorTarget anchor="#1-2-2-grid" />
      </h4>
      <p>
        Displays a grid with 1 card per row on smaller screens, and 2 cards per row on medium and
        larger screens.
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
          <DocsShowCode language="html">
            <KCardGrid layout="1-2-2">
              <KCard
                v-for="(card, index) in 3"
                :key="index"
                ...
              />
            </KCardGrid>
          </DocsShowCode>
        </template>
        <template #javascript>
          <DocsShowCode language="javascript">
            {` /* eslint-disable */ import DocsKCard from '../../../pages-components/DocsKCard.vue';
            import KIcon from '../../../lib/KIcon.vue'; import KTextTruncator from
            '../../../lib/KTextTruncator.vue'; export default { name: 'Grid122Example', components:
            { DocsKCard, KIcon, KTextTruncator }, data() { return { loading: true, skeletonsConfig2:
            [ { breakpoints: [0,1,2,3,4,5,6,7], orientation: 'vertical', thumbnailDisplay: 'large',
            height: '470px', }, { breakpoints: [2,3], height: '430px', }, { breakpoints: [4,5,6,7],
            height: '360px', }, ], }; }, mounted() { setTimeout(() => { this.loading = false; },
            3000); }, }; /* eslint-enable */ `}
          </DocsShowCode>
        </template>
      </DocsExample>

      <!-- '1-2-3' grid example -->
      <h4>
        '1-2-3' grid
        <DocsAnchorTarget anchor="#1-2-3-grid" />
      </h4>
      <p>
        Displays a grid with 1 card per row on smaller screens, 2 on medium, and 3 on larger
        screens.
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
          <DocsShowCode language="html">
            <KCardGrid layout="1-2-3">
              <KCard
                v-for="(card, index) in 5"
                :key="index"
                ...
              />
            </KCardGrid>
          </DocsShowCode>
        </template>
        <template #javascript>
          <DocsShowCode language="javascript">
            {` /* eslint-disable */ import DocsKCard from '../../../pages-components/DocsKCard.vue';
            import KIcon from '../../../lib/KIcon.vue'; import KTextTruncator from
            '../../../lib/KTextTruncator.vue'; export default { name: 'Grid123Example', components:
            { DocsKCard, KIcon, KTextTruncator }, data() { return { loading: true, skeletonsConfig3:
            [ { breakpoints: [0,1,2,3,4,5,6,7], orientation: 'vertical', thumbnailDisplay: 'large',
            height: '470px', }, { breakpoints: [2,3], height: '430px', }, { breakpoints: [4,5,6,7],
            height: '390px', }, ], }; }, mounted() { setTimeout(() => { this.loading = false; },
            3000); }, }; /* eslint-enable */ `}
          </DocsShowCode>
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
          <code>cardsPerRow</code> overrides the number of cards per row for the specified
          breakpoints.
        </li>
        <li>
          <code>columnGap</code>/<code>rowGap</code> overrides grid column/row gaps for the
          specified breakpoints.
        </li>
      </ul>
      <p>For example:</p>
      <DocsExample
        exampleId="custom-layout"
        loadExample="KCardGrid/LayoutOverride.vue"
      >
        <template #html>
          <DocsShowCode language="html">
            <KCardGrid
              layout="1-2-3"
              :layoutOverride="layoutOverride"
            >
              <KCard
                v-for="(card, index) in 6"
                :key="index"
                ...
              />
            </KCardGrid>
          </DocsShowCode>
        </template>
        <template #javascript>
          <DocsShowCode language="javascript">
            {` /* eslint-disable */ import DocsKCard from '../../pages-components/DocsKCard.vue';
            import KTextTruncator from '../../lib/KTextTruncator.vue'; export default { name:
            'LayoutOverrideExample', components: { DocsKCard, KTextTruncator }, data() { return {
            loading: true, layoutOverride: [ { breakpoints: [0,1], columnGap: '20px', rowGap:
            '20px', }, { breakpoints: [4,5,6,7], cardsPerRow: 4, }, ], skeletonsConfig: [ {
            breakpoints: [0,1,2,3,4,5,6,7], orientation: 'vertical', thumbnailDisplay: 'large', },
            ], }; }, mounted() { setTimeout(() => { this.loading = false; }, 3000); }, }; /*
            eslint-enable */ `}
          </DocsShowCode>
        </template>
      </DocsExample>
      <p>
        Here, the base <code>1-2-3</code> layout is partially overridden. Column and row gaps are
        decreased to <code>20px</code> on breakpoints <code>0-1</code>, and the number of cards per
        row is increased to 4 on breakpoints <code>4-7</code>.
      </p>

      <!-- Card height, content tolerance and alignment -->
      <h3>
        Card height, content tolerance and alignment
        <DocsAnchorTarget anchor="#card-height-and-alignment" />
      </h3>
      <p>
        Cards displayed in <code>KCardGrid</code> stretch vertically to fit their content, making a
        grid row height match its tallest card.
      </p>
      <p>
        <em>Setting height on cards is discouraged. Instead, manage height bottom-up, for example by
          setting height on card sections, using text truncation, or other ways to limit its inner
          content.</em>
        Such approaches ensure content tolerance, prevent unexpected overflows or excessive height,
        and keep vertical alignment of card sections consistent on a grid row. This is especially
        important when dealing with unknown lengths or amounts of content displayed in cards.
        Consider:
      </p>
      <DocsExample
        exampleId="card-height-alignment"
        loadExample="KCardGrid/CardHeightAlignment.vue"
      >
        <template #html>
          <DocsShowCode language="html">
            <KCardGrid layout="1-2-3">
              <KCard ... />
              <KCard ... />
              <KCard ... />
            </KCardGrid>
          </DocsShowCode>
        </template>
        <template #javascript>
          <DocsShowCode language="javascript">
            {` /* eslint-disable */ import KLabeledIcon from '../../../lib/KLabeledIcon.vue'; import
            KTextTruncator from '../../../lib/KTextTruncator.vue'; import DocsKCard from
            '../../pages-components/DocsKCard.vue'; export default { name:
            'CardHeightAlignmentExample', components: { KLabeledIcon, KTextTruncator, DocsKCard },
            data() { return { loading: true }; }, mounted() { setTimeout(() => { this.loading =
            false; }, 3000); }, }; /* eslint-enable */ `}
          </DocsShowCode>
        </template>
      </DocsExample>
      <p>
        Here, <code>KCard</code> has the following adjustments related to its visual output in the
        grid:
      </p>
      <ul>
        <li>
          Height is set on its <code>aboveTitle</code> slot content, and its
          <code>preserveAboveTitle</code> prop keeps the slot area even without content. This
          results in consistent alignment of all cards' titles on a grid row.
        </li>
        <li>
          Similarly, height is set on its <code>title</code> slot, and the title is truncated.
        </li>
        <li>Its <code>belowTitle</code> slot's content is truncated.</li>
        <li>
          The number of pills in its <code>footer</code> slot is limited to a reasonable amount.
        </li>
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
        Grid configuration can be combined with <code>KCard</code>'s settings to further improve
        responsive experience. A common pattern is switching <code>KCard</code>'s horizontal
        orientation to vertical for smaller screens to organize content more effectively in limited
        space:
      </p>
      <DocsExample
        exampleId="responsive-orientation"
        loadExample="KCardGrid/ResponsiveOrientation.vue"
      >
        <template #html>
          <DocsShowCode language="html">
            <KCardGrid layout="1-2-2">
              <KCard
                v-for="(card, index) in 2"
                :key="index"
                :orientation="windowBreakpoint < 4 ? 'vertical' : 'horizontal'"
                ...
              />
            </KCardGrid>
          </DocsShowCode>
        </template>
        <template #javascript>
          <DocsShowCode language="javascript">
            {` /* eslint-disable */ import useKResponsiveWindow from
            '../../../lib/composables/useKResponsiveWindow'; import DocsKCard from
            '../../pages-components/DocsKCard.vue'; import KTextTruncator from
            '../../../lib/KTextTruncator.vue'; import KIcon from '../../../lib/KIcon.vue'; export
            default { name: 'ResponsiveOrientationExample', components: { DocsKCard, KTextTruncator,
            KIcon }, setup() { const { windowBreakpoint } = useKResponsiveWindow(); return {
            windowBreakpoint }; }, data() { return { loading: true }; }, mounted() { setTimeout(()
            => { this.loading = false; }, 3000); }, }; /* eslint-enable */ `}
          </DocsShowCode>
        </template>
      </DocsExample>
      <p>
        This technique also works for adjusting <code>KCard</code> slots content. In the following
        example, some metadata pills are hidden on smaller screens:
      </p>
      <DocsExample
        exampleId="responsive-footer"
        loadExample="KCardGrid/ResponsiveFooter.vue"
      >
        <template #html>
          <DocsShowCode language="html">
            <KCardGrid layout="1-2-2">
              <KCard
                v-for="(card, index) in 2"
                :key="index"
                ...
              />
            </KCardGrid>
          </DocsShowCode>
        </template>
        <template #javascript>
          <DocsShowCode language="javascript">
            {` /* eslint-disable */ import useKResponsiveWindow from
            '../../../lib/composables/useKResponsiveWindow'; import DocsKCard from
            '../../pages-components/DocsKCard.vue'; import KIcon from '../../../lib/KIcon.vue';
            import KTextTruncator from '../../../lib/KTextTruncator.vue'; export default { name:
            'ResponsiveFooterExample', components: { DocsKCard, KIcon, KTextTruncator }, setup() {
            const { windowBreakpoint } = useKResponsiveWindow(); return { windowBreakpoint }; },
            data() { return { loading: true, skeletonsConfig: [ { breakpoints: [0,1,2,3,4,5,6,7],
            orientation: 'vertical', thumbnailDisplay: 'large', height: '430px', }, { breakpoints:
            [4,5,6,7], height: '370px', }, ], }; }, mounted() { setTimeout(() => { this.loading =
            false; }, 3000); }, }; /* eslint-enable */ `}
          </DocsShowCode>
        </template>
      </DocsExample>

      <!-- Loading state -->
      <h3>
        Loading state
        <DocsAnchorTarget anchor="#loading-state" />
      </h3>
      <p>
        While data is loading, <code>KCardGrid</code> shows loading skeleton cards. Use the
        <code>loading</code> prop to toggle the loading state. Note that
        <code>KCardGrid</code> internal optimizations may affect how closely the visual loading
        experience matches the <code>loading</code> value:
      </p>
      <ul>
        <li>The loading skeletons won't be displayed for short loading times (&lt; 1s)</li>
        <li>When the loading skeletons are displayed, they will be visible for at least 1s</li>
      </ul>
      <p>Use the buttons in the example below to preview.</p>
      <p>
        <strong>Number of loading skeletons</strong><br >
        By default, the number of loading skeletons corresponds to the number of cards in a single
        grid row if it were full. This behavior can be overridden via the
        <code>count</code> attribute (below), however do not override it unless indicated in the
        designs.
      </p>
      <p>
        <strong>Loading skeletons configuration</strong><br >
        Use the <code>skeletonsConfig</code> prop to configure skeleton cards to match the expected
        visual output of loaded cards on all screen sizes. Preview the layout and height of cards
        with loaded data and adjust <code>skeletonsConfig</code> accordingly.
      </p>
      <p>
        <code>skeletonsConfig</code> takes an array of objects { breakpoints, count, height,
        orientation, thumbnailDisplay, thumbnailAlign }, where:
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
          <code>count</code> sets the number of skeleton cards for the specified breakpoints. See
          <DocsInternalLink
            text="Number of loading skeletons"
            href="#loading-state-skeletons-count"
          />.
        </li>
        <li>
          <code>height</code> sets the height of skeleton cards for the specified breakpoints.
        </li>
        <li>
          <code>orientation</code> sets the orientation of skeleton cards for the specified
          breakpoints. Corresponds to
          <DocsInternalLink
            text="KCard's orientation"
            href="/kcard#prop:orientation"
            code
          />.
        </li>
        <li>
          <code>thumbnailDisplay</code> sets the thumbnail display of skeleton cards for the
          specified breakpoints. Corresponds to
          <DocsInternalLink
            text="KCard's thumbnailDisplay"
            href="/kcard#prop:thumbnailDisplay"
            code
          />.
        </li>
        <li>
          <code>thumbnailAlign</code> sets the thumbnail alignment of skeleton cards for the
          specified breakpoints. Corresponds to
          <DocsInternalLink
            text="KCard's thumbnailAlign"
            href="/kcard#prop:thumbnailAlign"
            code
          />.
        </li>
      </ul>
      <p>
        For easier development, enable the <code>debug</code> prop to display the current breakpoint
        in the top left corner of the grid. Use the button in the example below to preview the debug
        mode.
      </p>
      <DocsExample
        exampleId="loading-state"
        loadExample="KCardGrid/LoadingState.vue"
      >
        <template #html>
          <DocsShowCode language="html">
            <KCardGrid
              layout="1-2-2"
              :loading="loading"
            >
              <KCard
                v-for="(card, index) in 3"
                :key="index"
                ...
              />
            </KCardGrid>
          </DocsShowCode>
        </template>
        <template #javascript>
          <DocsShowCode language="javascript">
            {` /* eslint-disable */ import useKResponsiveWindow from
            '../../../lib/composables/useKResponsiveWindow'; import DocsKCard from
            '../../pages-components/DocsKCard.vue'; import KTextTruncator from
            '../../../lib/KTextTruncator.vue'; import KIcon from '../../../lib/KIcon.vue'; export
            default { name: 'LoadingStateExample', components: { DocsKCard, KTextTruncator, KIcon },
            setup() { const { windowBreakpoint } = useKResponsiveWindow(); return { windowBreakpoint
            }; }, data() { return { loading: true, debug: false, skeletonsConfig: [ { breakpoints:
            [0,1,2,3,4,5,6,7], orientation: 'vertical', thumbnailDisplay: 'large', height: '400px',
            }, { breakpoints: [4,5,6,7], height: '220px', orientation: 'horizontal', thumbnailAlign:
            'left', }, ], }; }, mounted() { setTimeout(() => { this.loading = false; }, 3000); },
            methods: { load500() { this.loading = true; setTimeout(() => { this.loading = false; },
            500); }, load1200() { this.loading = true; setTimeout(() => { this.loading = false; },
            1200); }, load4000() { this.loading = true; setTimeout(() => { this.loading = false; },
            4000); }, }, }; /* eslint-enable */ `}
          </DocsShowCode>
        </template>
      </DocsExample>
      <p>
        Here, the height of loading skeleton cards is <code>400px</code> with vertical orientation
        on breakpoints <code>0-3</code>, and <code>220px</code> with horizontal orientation on
        breakpoints <code>4-7</code>. This makes skeleton cards resemble loaded cards at all
        breakpoints, creating a smooth transition for users during data loading. Note the bottom-up
        approach where we begin with a base setup for all breakpoints and gradually override on
        higher breakpoints. This simplifies the configuration object.
      </p>
      <p>
        To get a sense of what skeleton layouts can be achieved, reload this page and the
        <code>KCard</code> page to preview the loading state in all examples.
      </p>
    </DocsPageSection>

    <!-- Related Section -->
    <DocsPageSection
      title="Related"
      anchor="#related"
    >
      <ul>
        <li>
          <DocsLibraryLink component="KCard" /> is a component for use within <code>KCardGrid</code>
        </li>
        <li>
          <DocsLibraryLink component="useKResponsiveWindow" /> can be used to detect the current
          window breakpoint for
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


<style scoped>

  /* Additional doc page styles if needed */

</style>