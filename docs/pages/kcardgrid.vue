<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>Displays a grid of cards <DocsLibraryLink component="KCard" />.</p>

      <p><code>KCardGrid</code> provides base layouts for the most common grids in our ecosystem, as well as customization or complete override of the base layouts.</p>

      <p>Together with <code>KCard</code>, it ensures accessible navigation within card lists, such as announcing only their titles when using the tab key to avoid overwhelming screen reader outputs.</p>

      <p>Grid's visual behavior is based on the <DocsInternalLink text="window breakpoint system" href="/layout#responsiveness" />. <code>KCardGrid</code> determines how many cards per row to display based on its layout and a current window breakpoint.</p>

      <p><code>KCardGrid</code> doesn't manage inner card content. This is <code>KCard</code>'s responsibility.</p>
    </DocsPageSection>

    <DocsPageSection title="Guidelines" anchor="#guidelines">
      <ul>
        <li>
          <code>KCardGrid</code> must be a direct parent of <code>KCard</code> (<DocsInternalLink text="KCard: KCard and KCardGrid" href="/kcard#k-card-and-grid" />)
        </li>
        <li>
          Avoid setting  card widths. Rely on <code>KCardGrid</code> layouts and customization options (<DocsInternalLink text="Base layouts" href="#base-layouts" />, <DocsInternalLink text="Layout customization" href="#layout-customization" />)
        </li>
        <li>
          Avoid setting card heights. Instead, set heights on card sections, use text truncation, or limit content in other ways (<DocsInternalLink text="Card height, content tolerance and  alignment" href="#card-height-and-alignment" />)
        </li>
        <li>
          Ensure robust content tolerance and consistent content alignment (<DocsInternalLink text="Card height, content tolerance and  alignment" href="#card-height-and-alignment" />)
        </li>
        <li>Preview cards on all screen sizes  (<DocsInternalLink text="Fine-tuning responsiveness" href="#fine-tuning-responsiveness" />)</li>
      </ul>

      <p>Also follow <DocsInternalLink text="KCard guidelines" href="/kcard#guidelines" />.</p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <DocsSubNav
        :items="[
          { text: 'Base layouts', href: '#base-layouts' },
          { text: 'Layout customization', href: '#layout-customization' },
          { text: 'Card height, content tolerance and  alignment', href: '#card-height-and-alignment' },
          { text: 'Fine-tuning responsiveness', href: '#fine-tuning-responsiveness' },
          { text: 'Loading state (TBD)', href: '#loading-state' },
        ]"
      />

      <h3>
        Base layouts
        <DocsAnchorTarget anchor="#base-layouts" />
      </h3>

      <p>Three base layouts are available: <code>'1-1-1'</code>, <code>'1-2-2'</code>, and <code>'1-2-3'</code>. They determine the number of cards per row for each <DocsInternalLink text="window breakpoint level" href="/layout#responsiveness" />.</p>

      <h4>
        '1-1-1' grid
        <DocsAnchorTarget anchor="#1-1-1-grid" />
      </h4>
      <p>Displays a grid with 1 card per row on every screen size. <DocsToggleButton contentId="more-1-1-1-grid" showText="Show full definition" hideText="Hide full definition" /></p>

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

      <DocsShow block>
        <KCardGrid layout="1-1-1">
          <DocsKCard
            v-for="i in 2"
            :key="i"
            :headingLevel="5"
            orientation="horizontal"
            :prependTitle="`(${i})`"
          />
        </KCardGrid>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KCardGrid layout="1-1-1">
          <KCard
            v-for="i in 2"
            ...
          />
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <h4>
        '1-2-2' grid
        <DocsAnchorTarget anchor="#1-2-2-grid" />
      </h4>
      <p>Displays a grid with 1 card per row on smaller screens, and 2 cards per row on medium and larger screens. <DocsToggleButton contentId="more-1-2-2-grid" showText="Show full definition" hideText="Hide full definition" /></p>

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

      <DocsShow block>
        <KCardGrid layout="1-2-2">
          <DocsKCard
            v-for="i in 3"
            :key="i"
            :headingLevel="5"
            :prependTitle="`(${i})`"
          />
        </KCardGrid>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KCardGrid layout="1-2-2">
          <KCard
            v-for="i in 3"
            ...
          />
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <h4>
        '1-2-3' grid
        <DocsAnchorTarget anchor="#1-2-3-grid" />
      </h4>
      <p>Displays a grid with 1 card per row on smaller screens, 2 cards per row on medium screens, and 3 cards per row on larger screens. <DocsToggleButton contentId="more-1-2-3-grid" showText="Show full definition" hideText="Hide full definition" /></p>

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

      <DocsShow block>
        <KCardGrid layout="1-2-3">
          <DocsKCard
            v-for="i in 5"
            :key="i"
            :headingLevel="5"
            :prependTitle="`(${i})`"
          />
        </KCardGrid>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KCardGrid layout="1-2-3">
          <KCard
            v-for="i in 5"
            ...
          />
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <h3>
        Layout customization
        <DocsAnchorTarget anchor="#layout-customization" />
      </h3>

      <p>Base layouts can be customized or even completely overriden via the <code>layoutOverride</code> prop. <code>layoutOverride</code> takes an array of objects <code>{ breakpoints, cardsPerRow, columnGap, rowGap }</code>, where:</p>

      <ul>
        <li><code>breakpoints</code> is an array of <code>0-7</code> values corresponding to the <DocsInternalLink text="window breakpoint levels" href="/layout#responsiveness" /></li>
        <li><code>cardsPerRow</code> overrides the number of cards per row for specified <code>breakpoints</code></li>
        <li><code>columnGap</code>/<code>rowGap</code> overrides grid column/row gaps for specified <code>breakpoints</code></li>
      </ul>

      <p>For example:</p>

      <DocsShow block>
        <KCardGrid
          layout="1-2-3"
          :layoutOverride="layoutOverride"
        >
          <DocsKCard
            v-for="i in 6"
            :key="i"
            :headingLevel="6"
            :prependTitle="`(${i})`"
            hideFooter
          />
        </KCardGrid>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KCardGrid
          layout="1-2-3"
          :layoutOverride="layoutOverride"
        >
          <KCard
            v-for="i in 6"
            :key="i"
            ...
          />
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <!-- eslint-disable -->
      <DocsShowCode language="javascript">
        export default {
          ...
          data() {
            return {
              layoutOverride: [
                {
                  breakpoints: [0, 1],
                  columnGap: '20px',
                  rowGap: '20px',
                },
                {
                  breakpoints: [4, 5, 6, 7],
                  cardsPerRow: 4,
                },
              ],
            };
          },
        };
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>Here, the base <code>1-2-3</code> layout is overriden partially. Column and row gaps are decreased to <code>20px</code> on breakpoints <code>0-1</code>, and the number of cards per row is increased to 4 on breakpoints <code>4-7</code>.</p>

      <h3>
        Card height, content tolerance and  alignment
        <DocsAnchorTarget anchor="#card-height-and-alignment" />
      </h3>

      <p>Cards displayed in <code>KCardGrid</code> stretch vertically to fit their content, making a grid row height match its tallest card.</p>

      <p><em>Setting height on cards is discouraged. Instead, manage height bottom-up, for example by setting height on card sections, using text truncation, or other ways to limit its inner content.</em> Such approaches ensure content tolerance, prevent from unexpected overflows or excessive height, and keep vertical alignment of card sections consistent on a grid row. This is especially important when dealing with unknown lenghts or amounts of content displayed in cards. Consider:</p>

      <DocsShow language="html">
        <KCardGrid layout="1-2-3">
          <DocsKCard
            :headingLevel="4"
            preserveAboveTitle
          >
            <template #aboveTitle>
              <div :style="{ height: '24px' }">
                <KLabeledIcon icon="readSolid" label="Read" />
              </div>
            </template>
            <template #title>
              <div :style="{ height: '52px' }">
                <KTextTruncator
                  :maxLines="2"
                  text="(1) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities"
                />
              </div>
            </template>
            <template #belowTitle>
              <KTextTruncator
                :maxLines="4"
                text="Short description"
              />
            </template>
            <template #footer>
              <div class="pills" :style="{ 'color': $themeTokens.annotation }">
                <span
                  v-for="(pill, i) in slicedPills"
                  :key="i"
                  :style="{ 'background-color': $themePalette.grey.v_50 }"
                >
                  {{ pill }}
                </span>
              </div>
            </template>
          </DocsKCard>

          <DocsKCard
            :headingLevel="4"
            preserveAboveTitle
          >
            <template #aboveTitle>
              <div :style="{ height: '24px' }">
                <KLabeledIcon icon="readSolid" label="Read" />
              </div>
            </template>
            <template #title>
              <div :style="{ height: '52px' }">
                <KTextTruncator
                  :maxLines="2"
                  text="(2) Short title"
                />
              </div>
            </template>
            <template #belowTitle>
              <KTextTruncator
                :maxLines="4"
                text="Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live. "
              />
            </template>
            <template #footer>
              <div></div>
            </template>
          </DocsKCard>

          <DocsKCard
            :headingLevel="4"
            preserveAboveTitle
          >
            <template #aboveTitle>
              <div :style="{ height: '24px' }"></div>
            </template>
            <template #title>
              <div :style="{ height: '52px' }">
                <KTextTruncator
                  :maxLines="2"
                  text="(3) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities"
                />
              </div>
            </template>
            <template #belowTitle>
              <KTextTruncator
                :maxLines="4"
                text="Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live. "
              />
            </template>
            <template #footer>
              <div class="pills" :style="{ 'color': $themeTokens.annotation }">
                <span
                  v-for="(pill, i) in slicedPills"
                  :key="i"
                  :style="{ 'background-color': $themePalette.grey.v_50 }"
                >
                  {{ pill }}
                </span>
              </div>
            </template>
          </DocsKCard>
        </KCardGrid>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KCardGrid ...>
          <KCard
            ...
            preserveAboveTitle
          >
            <template #aboveTitle>
              <div :style="{ height: '24px' }">
                ...
              </div>
            </template>
            <template #title>
              <div :style="{ height: '52px' }">
                <KTextTruncator
                  :maxLines="2"
                  :text="..."
                />
              </div>
            </template>
            <template #belowTitle>
              <KTextTruncator
                :maxLines="4"
                :text="..."
              />
            </template>
            <template #footer>
              <span v-for="pill in slicedPills">
                ...
              </span>
            </template>
          </KCard>
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <!-- eslint-disable -->
      <DocsShowCode language="javascript">
        export default {
          ...
          computed: {
            slicedPills() {
              return pills.slice(0, 2);
            },
          },
        };
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>Here, <code>KCard</code> has the following adjustments related to its visual output in the grid:</p>
      <ul>
        <li>Height is set on its <code>aboveTitle</code> slot content, and its <code>preserveAboveTitle</code> prop keeps the slot area even without content. This results in consistent alignment of all cards' titles on a grid row.</li>
        <li>Similarly, height is set on its <code>title</code> slot, and the title is truncated.</li>
        <li>Its <code>belowTitle</code> slot's content is truncated.</li>
        <li>The number of pills in its <code>footer</code> slot is limited to a reasonable amount.</li>
      </ul>

      <p><code>KCard</code> offers other <code>preserve...</code> props corresponding to its slots.</p>

      <h3>
        Fine-tuning responsiveness
        <DocsAnchorTarget anchor="#fine-tuning-responsiveness" />
      </h3>

      <p>Grid configuration can be combined with <code>KCard</code>'s settings to further improve responsive experience. A common pattern is switching <code>KCard</code>'s horizontal orientation to vertical for smaller screens to organize content more effectively in limited space:</p>

      <DocsShow block>
        <KCardGrid layout="1-2-2">
          <DocsKCard
            v-for="i in 2"
            :key="i"
            :headingLevel="4"
            :orientation="windowBreakpoint < 4 ? 'vertical' : 'horizontal'"
            :prependTitle="`(${i})`"
          />
        </KCardGrid>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="javascript">
        import useKResponsiveWindow from 'kolibri-design-system/lib/composables/useKResponsiveWindow';

        export default {
          setup() {
            const { windowBreakpoint } = useKResponsiveWindow();
            return { windowBreakpoint };
          },
        };
      </DocsShowCode>
      <!-- eslint-enable -->

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KCardGrid layout="1-2-2">
          <KCard
            v-for="i in 2"
            :orientation="windowBreakpoint < 4 ? 'vertical' : 'horizontal'"
            ...
          />
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>This technique also works for adjusting <code>KCard</code> slots content. In the following example, some metadata pills are hidden on smaller screens:</p>

      <DocsShow block>
        <KCardGrid layout="1-2-2">
          <DocsKCard
            v-for="i in 2"
            :key="i"
            :headingLevel="4"
            :prependTitle="`(${i})`"
          >
            <template #footer>
              <div class="pills" :style="{ 'color': $themeTokens.annotation }">
                <span
                  :style="{ 'background-color': $themePalette.grey.v_50 }"
                >
                  <KIcon icon="readSolid" :style="{ fontSize: '13px', position: 'relative', top: '3px' }" />
                  Read
                </span>
                <span
                  :style="{ 'background-color': $themePalette.grey.v_50 }"
                >
                  Short Activity
                </span>
                <template v-if="windowBreakpoint > 3">
                  <span
                    :style="{ 'background-color': $themePalette.grey.v_50 }"
                  >
                    Biology
                  </span>
                  <span
                    :style="{ 'background-color': $themePalette.grey.v_50 }"
                  >
                    Ecology
                  </span>
                </template>
              </div>
            </template>
          </DocsKCard>
        </KCardGrid>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KCardGrid layout="1-2-2">
          <KCard
            v-for="i in 2"
            ...
          >
            <template #footer>
              <span ...>Read</span>
              <span ...>Short Activity</span>
              <template v-if="windowBreakpoint > 3">
                <span ...>Biology</span>
                <span ...>Ecology</span>
              </template>
            </template>
          </KCard>
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <h3>
        Loading state
        <DocsAnchorTarget anchor="#loading-state" />
      </h3>

      <p>When cards are loading, <code>KCardGrid</code> displays skeleton cards...(TBD)</p>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsLibraryLink component="KCard" /> is a component for use within <code>KCardGrid</code>
        </li>
        <li>
          <DocsLibraryLink component="useKResponsiveWindow" /> can be used to detect the current window breakpoint for <DocsInternalLink text="fine-tuning responsiveness" href="#fine-tuning-responsiveness" />
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  import useKResponsiveWindow from '../../lib/composables/useKResponsiveWindow';
  import DocsKCard from '../pages-components/DocsKCard';

  export default {
    components: {
      DocsKCard,
    },
    setup() {
      const { windowBreakpoint } = useKResponsiveWindow();
      return { windowBreakpoint };
    },
    data() {
      return {
        layoutOverride: [
          {
            breakpoints: [0, 1],
            columnGap: '20px',
            rowGap: '20px',
          },
          {
            breakpoints: [4, 5, 6, 7],
            cardsPerRow: 4,
          },
        ],
      };
    },
    computed: {
      slicedPills() {
        return ['Short Activity', 'Biology', 'Ecology', 'Ornithology'].slice(0, 2);
      },
    },
  };

</script>


<style lang="scss" scoped>

  .pills {
    margin-left: -4px;

    span {
      display: inline-block;
      padding: 4px 8px;
      margin: 4px;
      border-radius: 4px;
    }
  }

</style>