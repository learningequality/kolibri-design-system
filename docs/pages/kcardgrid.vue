<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>Displays a grid of cards <DocsLibraryLink component="KCard" />.</p>

      <p><code>KCardGrid</code> offers several base layouts corresponding to the most commonly used grids, as well as advanced configuration via <code>useKCardGrid</code> (TBD) that allows to customize a base layout or even completely override it.</p>

      <p>Grid behavior is based on the <DocsInternalLink text="window breakpoint system" href="/layout#responsiveness" />. <code>KCardGrid</code> decides how many cards per row to display based on a chosen layout and a current window breakpoint level.</p>

      <p><code>KCardGrid</code> doesn't control the organization of inner card content, such as orientation, thumbnail size, etc. See <DocsLibraryLink component="KCard" /> to learn more.</p>
    </DocsPageSection>

    <DocsPageSection title="Guidelines" anchor="#guidelines">
      <ul>
        <li>
          <code>KCardGrid</code> has to be a direct parent of <DocsLibraryLink component="KCard" /> (see <DocsInternalLink text="KCard and KCardGrid" href="/kcard#k-card-and-grid" />)
        </li>
        <li>
          Do not set width on cards. Instead, use <code>KCardGrid</code> base layouts and customization options.
        </li>
        <li>
          Ensure robust content tolerance and consistent alignment (see <DocsInternalLink text="Card height, content tolerance and  alignment" href="#card-height-and-alignment" />)
        </li>
      </ul>

      <p>Also follow <DocsInternalLink text="KCard's guidelines" href="/kcard#guidelines" />.</p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <DocsSubNav
        :items="[
          { text: 'Base layouts', href: '#base-layouts' },
          { text: 'Layout customization (TBD)', href: '#layout-customization' },
          { text: 'Card height, content tolerance and  alignment', href: '#card-height-and-alignment' },
          { text: 'Fine-tuning responsiveness', href: '#fine-tuning-responsiveness' },
          { text: 'Loading state (TBD)', href: '#loading-state' },
        ]"
      />

      <h3>
        Base layouts
        <DocsAnchorTarget anchor="#base-layouts" />
      </h3>

      <p>There are three base layouts available, <code>'1-1-1'</code>, <code>'1-2-2'</code>, and <code>'1-2-3'</code>. They define how many cards per row are displayed on each of the <DocsInternalLink text="window breakpoint levels" href="/layout#responsiveness" />.</p>

      <h4>
        '1-1-1' grid
        <DocsAnchorTarget anchor="#1-1-1-grid" />
      </h4>
      <p>Displays a grid with 1 card per row on all screen sizes.</p>

      <DocsToggleContent
        showText="Show full definition"
        hideText="Hide full definition"
      >
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
      <p>Displays a grid with 1 card per row on smaller screens, and 2 cards per row on medium and larger screens.</p>

      <DocsToggleContent
        showText="Show full definition"
        hideText="Hide full definition"
      >
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
      <p>Displays a grid with 1 card per row on smaller screens, 2 cards per row on medium screens, and 3 cards per row on larger screens.</p>

      <DocsToggleContent
        showText="Show full definition"
        hideText="Hide full definition"
      >
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

      <p>Base layouts can be customized or even completely overriden. See <code>useKCardGrid</code> (TBD link its docs as soon as it's implemented).</p>

      <h3>
        Card height, content tolerance and  alignment
        <DocsAnchorTarget anchor="#card-height-and-alignment" />
      </h3>

      <p>Cards displayed within <code>KCardGrid</code> stretch to fit their content. Therefore, a grid row height corresponds to the height of the tallest card in the row.</p>

      <p><em>Setting a fixed height on cards is discouraged.</em> However, card overall height can still be precisely controlled by techniques such as setting the fixed height on its sections, using text truncation, or other ways of limiting the amount of content.</p>

      <p>Such approaches ensure robust content tolerance and limit  unreasonable card heights or unexpected overflows. Furthemore, they allow to achieve consistent vertical alignment of card sections on a grid row. This is particularly important when dealing with unknown lenghts or amounts of content displayed in cards.</p>

      <p>Consider the following:</p>

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
              <div class="pills">
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
              <div class="pills">
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

      The structure of cards in the grid above is:

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

      <p>Here,</p>
      <ul>
        <li>Fixed height is set on content of the <DocsInternalLink text="aboveTitle" href="#slot:aboveTitle" code /> slot. The <code>KCard</code>'s <DocsInternalLink href="/kcard#prop:preserveAboveTitle" text="preserveAboveTitle" code /> prop is used to make the slot area present even if it has no content. This results in consistent vertical space taken by this area no matter its content, creating the consistent alignment of all cards' titles.</li>
        <li>Similarly, fixed height is set on the <DocsInternalLink text="title" href="#slot:title" code /> slot and the title is truncated.</li>
        <li>The <DocsInternalLink text="belowTitle" href="#slot:belowTitle" code /> slot's content is truncated.</li>
        <li>The number of pills in the footer is sliced to a reasonable amount</li>
      </ul>

      <p>See other <code>KCard</code>'s <code>preserve...</code> <DocsInternalLink href="/kcard#props" text="props" />.</p>

      <p>This example only demonstrate the most common patterns. Other techniques can be used as long as they result in robust content tolerance.</p>

      <h3>
        Fine-tuning responsiveness
        <DocsAnchorTarget anchor="#fine-tuning-responsiveness" />
      </h3>

      <p>The grid configuration can be further combined with <code>KCard</code>'s configuration to achieve even better user experience. One typical example is changing <code>KCard</code>'s horizontal orientation to the vertical one on smaller screens. This provides more suitable organization of content within a card when there is less space:</p>

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

      <p>Here, on smaller screens, <code>KCardGrid</code> ensures that just 1 card per row is displayed and <code>KCard</code> takes care of organizing its content vertically.</p>

      <p>The same technique can be used to configure the content provided to <code>KCard</code> via its slots. For example, in the following, some of the metadata pills are hidden on smaller screens:</p>

      <DocsShow block>
        <KCardGrid layout="1-2-2">
          <DocsKCard
            v-for="i in 2"
            :key="i"
            :headingLevel="4"
            :prependTitle="`(${i})`"
          >
            <template #footer>
              <div class="pills">
                <span
                  :style="{ 'background-color': $themePalette.grey.v_50 }"
                >
                  <KIcon icon="readSolid" :style="{ fontSize: '14px' }" />
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
                  <span
                    :style="{ 'background-color': $themePalette.grey.v_50 }"
                  >
                    Ornithology
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
              <span>Read</span>
              <span>Short Activity</span>
              <template v-if="windowBreakpoint > 3">
                <span>Biology</span>
                <span>Ecology</span>
                <span>Ornithology</span>
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

      <p>When in loading state, <code>KCardGrid</code> displays card skeletons...(TBD)</p>
      <!-- TODO: Also link KCard-Usage-Thumbnail-Placeholder -->
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
      return {};
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
    margin-left: -6px;

    span {
      display: inline-block;
      padding: 6px 8px;
      margin: 6px;
    }
  }

</style>