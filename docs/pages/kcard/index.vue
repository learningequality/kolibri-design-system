<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p><code>KCard</code> is a versatile and accessible base component for creating various types of cards, such as lesson cards, resource cards, and many other cards.</p>

      <p>It takes care of organizing the layout of a card, including thumbnail image, title, and other content. It offers several layouts and other customization options. By configuring it and providing content via its slots, cards like the following, and many more, can be built:</p>

      <DocsShow block :style="{ maxWidth: '800px' }">
        <KCardGrid layout="1-1-1">
          <DocsKCard
            :headingLevel="3"
            :layout="windowBreakpoint > 2 ? 'horizontal' : 'vertical'"
            thumbnailDisplay="large"
            thumbnailAlign="right"
            prependTitle="(2)"
            showProgressInFooter
          />
        </KCardGrid>
      </DocsShow>

      <p>It is meant for use with <DocsLibraryLink component="KCardGrid" />.</p>

      <p>The following is an overview of features that <code>KCard</code> provides, particularly with regard to the organization of its inner content. See <DocsLibraryLink component="KCardGrid" /> to learn more about grids of cards and some more related features of <code>KCard</code>.</p>
    </DocsPageSection>

    <DocsPageSection title="Guidelines" anchor="#guidelines">
      <ul>
        <li>
          Use <code>KCard</code> within <DocsLibraryLink component="KCardGrid" /> as its direct child (see <DocsInternalLink text="KCard and KCardGrid" href="#k-card-and-grid" />)
        </li>
        <li>Configure the heading level properly (see <DocsInternalLink text="Title" href="#title" />)</li>
        <li>Ensure that card titles are unique within a grid (see <DocsInternalLink text="Title" href="#title" />)</li>
        <li>Test semantic structure, accessibility, and right-to-left support of final cards (see <DocsInternalLink text="Accessibility" href="#a11y" />)</li>
        <li>Even when it is expected that a thumbnail image will be available, provide a thumbnail placeholder element via the <DocsInternalLink text="thumbnailPlaceholder" href="#slot:thumbnailPlaceholder" code /> slot (see <DocsInternalLink text="Thumbnails: Placeholder" href="#thumbnails-placeholder" />)</li>
        <li>If using selection controls, provide pre-defined labels to the controls (see <DocsInternalLink text="Selection controls" href="#selection-controls" />)</li>
      </ul>

      <p>Also follow <DocsInternalLink text="KCardGrid's guidelines" href="/kcardgrid#guidelines" />.</p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <DocsSubNav
        :items="[
          { text: 'KCard and KCardGrid', href: '#k-card-and-grid' },
          { text: 'Title', href: '#title' },
          { text: 'Accessibility', href: '#a11y' },
          { text: 'Navigation', href: '#navigation' },
          { text: 'Layouts', href: '#layouts' },
          { text: 'Content slots', href: '#content-slots' },
          { text: 'Thumbnails', href: '#thumbnails' },
          { text: 'Interactive elements', href: '#interactive-elements' },
          { text: 'Selection controls (TBD)', href: '#selection-controls' }
        ]"
      />

      <h3>
        KCard and KCardGrid
        <DocsAnchorTarget anchor="#k-card-and-grid" />
      </h3>

      <p><code>KCard</code> always needs to be used within <DocsLibraryLink component="KCardGrid" /> as its direct child. This ensures a correct semantic structure and lays down the foundation for accessible experience. Read <DocsLibraryLink component="KCardGrid" /> to understand how these two components work together.</p>

      <DocsToggleContent
        showText="Show examples"
        hideText="Hide examples"
      >
        <DocsDoNot>
          <template #do>
            <span>Always use <code>KCardGrid</code> (even when a single card is rendered)</span>
            <!-- eslint-disable -->
            <DocsShowCode language="html">
              <template>
                <KCardGrid>
                  <KCard />
                  <KCard />
                  <KCard />
                </KCardGrid>
              </template>
            </DocsShowCode>
            <!-- eslint-enable -->
          </template>
          <template #not>
            <span>Forget to use <code>KCardGrid</code></span>
            <!-- eslint-disable -->
            <DocsShowCode language="html">
              <template>
                <div>
                  <KCard />
                  <KCard />
                  <KCard />
                </div>
              </template>
            </DocsShowCode>
            <!-- eslint-enable -->
          </template>
        </DocsDoNot>

        <DocsDoNot>
          <template #do>
            <span>Make <code>KCard</code> a direct child of <code>KCardGrid</code></span>
            <!-- eslint-disable -->
            <DocsShowCode language="html">
              <KCardGrid>
                <MyCardComponent />
              </KCardGrid>
            </DocsShowCode>
            <!-- eslint-enable -->

            <!-- eslint-disable -->
            <DocsShowCode language="html">
              <!-- MyCardComponent.vue -->
              <template>
                <KCard>

                  ...

                </KCard>
              </template>
            </DocsShowCode>
            <!-- eslint-enable -->
          </template>
          <template #not>
            <span>Build components in such a way<br>that <code>KCard</code> is not a direct child of <code>KCardGrid</code></span>
            <!-- eslint-disable -->
            <DocsShowCode language="html">
              <KCardGrid>
                <MyCardComponent />
              </KCardGrid>
            </DocsShowCode>
            <!-- eslint-enable -->

            <!-- eslint-disable -->
            <DocsShowCode language="html">
              <!-- MyCardComponent.vue -->
              <template>
                <div>
                  <KCard>
                    ...
                  </KCard>
                </div>
              </template>
            </DocsShowCode>
            <!-- eslint-enable -->
          </template>
        </DocsDoNot>
      </DocsToggleContent>

      <h3>
        Title
        <DocsAnchorTarget anchor="#title" />
      </h3>

      <p>First, always specify the heading level (<code>2-6</code>) via the <DocsInternalLink text="headingLevel" href="#prop:headingLevel" code /> prop. The value needs to correspond to the surrounding context.</p>

      <DocsToggleContent
        showText="Show examples"
        hideText="Hide examples"
      >
        <ul>
          <li>If a page where cards are displayed has <code>h1</code> and there are no sub-sections, set the <DocsInternalLink text="headingLevel" href="#prop:headingLevel" code /> prop to <code>2</code>. This will make card titles render as <code>h2</code>.</li>

          <li>If there is an <code>h2</code> sub-section on a page within which cards are displayed, set the value to <code>3</code> to render card titles as <code>h3</code>.</li>
        </ul>
      </DocsToggleContent>

      <p>Then, use the <DocsInternalLink text="title" href="#prop:title" code /> prop to provide the card's title. Each card title within a card grid should be unique.</p>

      <p>The <DocsInternalLink text="titleMaxLines" href="#prop:titleMaxLines" code /> prop can be used to truncate the title to this number of lines.</p>

      <p>Alternatively, when the title needs to be further customized, use the <DocsInternalLink text="title" href="#slot:title" code /> slot. When using this slot, only provide title's content. Do not wrap the title in the heading element as card already takes care of it and providing it via this slot would result in duplicate headings.</p>

      <p><em>Always check the resulting markup to confirm the meaningful semanting structure.</em></p>

      <h3>
        Accessibility
        <DocsAnchorTarget anchor="#a11y" />
      </h3>

      <p><code>KCard</code> has robust built-in accessibility and when used correctly as documented, it will ensure semantic structure, good screen reader experience, as well as support for right-to-left languages regarding its layouts.</p>

      <p>However, it is always necessary to make sure that cards built on top of <code>KCard</code> are fully accessible. This is the case particularly for inner content of slots as <code>KCard</code> doesn't have control over them. <em>Always test and consider what's expected experience of the final card as a whole.</em></p>

      <h3>
        Navigation
        <DocsAnchorTarget anchor="#navigation" />
      </h3>

      <p><code>KCard</code>'s whole area is clickable and navigates to a target defined as a regular Vue route object object provided via the <DocsInternalLink text="to" href="#prop:to" /> prop, for example:</p>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KCardGrid ...>
          <KCard
            :to="{ name: 'NamedRoute' }"
            ...
          />
          <KCard
            :to="{ path: '/kcard' }"
            ...
          />
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>See <DocsInternalLink text="Interactive elements" href="#interactive-elements" /> to learn how to stop navigation in favor of a custom handler when there are elements such as buttons rendered within a card.</p>

      <h3>
        Layouts
        <DocsAnchorTarget anchor="#layouts" />
      </h3>

      <p><code>KCard</code> offers two main orientation types: horizontal and vertical. In addition, it provides several ways to configure whether a thumbnail area is displayed, its size and alignment. These are the main building blocks for achieving a wide variety of card layouts.</p>

      <p>By combining the <DocsInternalLink text="layout" href="#prop:layout" code />, <DocsInternalLink text="thumbnailDisplay" href="#prop:thumbnailDisplay" code /> and <DocsInternalLink text="thumbnailAlign" href="#prop:thumbnailAlign" code /> props, cards like this can be created:</p>

      <DocsShow block>
        <KCardGrid layout="1-2-2">
          <DocsKCard
            :headingLevel="4"
            layout="horizontal"
            thumbnailDisplay="large"
            thumbnailAlign="left"
            prependTitle="(1)"
          />
          <DocsKCard
            :headingLevel="4"
            layout="horizontal"
            thumbnailDisplay="small"
            thumbnailAlign="right"
            prependTitle="(2)"
            showProgressInFooter
          />
        </KCardGrid>
      </DocsShow>
      <DocsShow block>
        <KCardGrid layout="1-2-3">
          <DocsKCard
            :headingLevel="4"
            layout="vertical"
            thumbnailDisplay="large"
            prependTitle="(1)"
          />
          <DocsKCard
            :headingLevel="4"
            layout="vertical"
            thumbnailDisplay="small"
            prependTitle="(2)"
            showMenuInFooter
          />
          <DocsKCard
            :headingLevel="4"
            layout="vertical"
            thumbnailDisplay="none"
            hideFooter
            prependTitle="(3)"
          />
        </KCardGrid>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KCardGrid ...>
          <KCard
            ...
            layout="horizontal"
            thumbnailDisplay="large"
            thumbnailAlign="left"
          />
          <KCard
             ...
            layout="horizontal"
            thumbnailDisplay="small"
            thumbnailAlign="right"
          />
        </KCardGrid>

        <KCardGrid ...>
          <KCard
            ...
            layout="vertical"
            thumbnailDisplay="large"
          />
          <KCard
            ...
            layout="vertical"
            thumbnailDisplay="small"
          />
          <KCard
            ...
            layout="vertical"
            thumbnailDisplay="none"
          />
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <h3>
        Content slots
        <DocsAnchorTarget anchor="#content-slots" />
      </h3>

      <p>Use the <DocsInternalLink text="aboveTitle" href="#slot:aboveTitle" code />, <DocsInternalLink text="belowTitle" href="#slot:belowTitle" code />, and <DocsInternalLink text="footer" href="#slot:footer" code /> slots to add content to your card. <code>KCard</code> will organizing these areas within the card based on a chosen layout. Apply custom styling to the inner content of slots to achieve desired effects.</p>

      <DocsShow block>
        <KCardGrid layout="1-1-1">
          <KCard
            :to="{ path: '/test-url' }"
            :headingLevel="4"
            :thumbnailSrc="require('../../assets/hummingbird-large-cc-by-sa-4.jpg')"
            thumbnailDisplay="large"
            title="Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities"
          >
            <template #aboveTitle>
              <KLabeledIcon icon="readSolid" label="Read" />
            </template>
            <template #belowTitle>
              <KTextTruncator
                text="Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live."
                :maxLines="5"
              />
            </template>
            <template #footer>
              <div :style="{ marginLeft: '-8px' }">
                <span
                  :style="{ display: 'inline-block', 'backgroundColor': $themePalette.grey.v_50, padding: '8px 6px', margin: '8px' }"
                >
                  Short Activity
                </span>
                <span
                  :style="{ display: 'inline-block', 'backgroundColor': $themePalette.grey.v_50, padding: '8px 6px', margin: '8px' }"
                >
                  Biology
                </span>
              </div>
            </template>
          </KCard>
        </KCardGrid>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KCardGrid ...>
          <KCard ...>
            <template #aboveTitle>
              <KLabeledIcon icon="readSolid" label="Read" />
            </template>
            <template #belowTitle>
              <KTextTruncator
                text="Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live."
                :maxLines="5"
              />
            </template>
            <template #footer>
              <span>Short Activity</span>
              <span>Biology</span>
            </template>
          </KCard>
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <h3>
        Thumbnails
        <DocsAnchorTarget anchor="#thumbnails" />
      </h3>

      <p><code>KCard</code> provides several ways to display thumbnails. If and how the thumbnail area is displayed depends on the following factors:</p>

      <ul>
        <li>The <DocsInternalLink text="layout" href="#prop:layout" code /> prop determines whether the thumbnail area is displayed above other content or if it is displayed next to it.</li>
        <li>The <DocsInternalLink text="thumbnailDisplay" href="#prop:thumbnailDisplay" code /> prop controls whether the thumbnail area is shown and what is its size</li>
        <li>The <DocsInternalLink text="thumbnailAlignment" href="#prop:thumbnailAlignment" code /> prop controls what side is the thumbnail area displayed when in card's horizontal orientation</li>
      </ul>

      <p>Go to <DocsInternalLink text="Layouts" href="#layouts" code /> to see how can these be combined to achieve various card layouts.</p>

      <h4>
        Placeholder
        <DocsAnchorTarget anchor="#thumbnails-placeholder" />
      </h4>

      <p>When <code>KCard</code> is configured to display the thumbnail area, the area will act as a placeholder when a thumbnail image is not available, wasn't loaded properly, or while it's loading. In such cases, the light gray background will be displayed in the place of the thumbnail image.</p>

      <p>The placeholder area can be further enhanced by utilizing the <DocsInternalLink text="thumbnailPlaceholder" href="#slot:thumbnailPlaceholder" code /> slot via which a placeholder element, such as an icon, is placed to the area. <em>Provide the placeholder element via this slot even when it is expected that a thumbnail image will be available</em> since it has more functions:</p>

      <ul>
        <li><span :style="{ fontStyle: 'italic' }">When a thumbnail image is not available or wasn't loaded properly:</span> The placeholder element is displayed in the placeholder area, provoding users with context about the card.</li>
        <li><span :style="{ fontStyle: 'italic' }">When a thumbnail image is available:</span> The placeholder element serves as a progressive loading experience as it will be displayed until the image is loaded. This is particularly important on slower networks (reload this page with the network throttling turned on and observe any card that has a thumbnail image).</li>
      </ul>

      <DocsShow block>
        <KCardGrid layout="1-1-1">
          <DocsKCard
            :headingLevel="4"
            :layout="windowBreakpoint > 2 ? 'horizontal' : 'vertical'"
            thumbnailDisplay="large"
            thumbnailAlign="right"
            :thumbnailSrc="null"
          />
        </KCardGrid>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KCardGrid ...>
          <KCard
            ...
            thumbnailDisplay="large"
            thumbnailAlign="right"
            :thumbnailSrc="null"
          >
            <template #thumbnailPlaceholder>
              <span :style="{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }">
                <KIcon
                  :style="{ fontSize: '48px' }"
                  icon="readSolid"
                  :color="$themePalette.grey.v_800"
                />
              </span>
            </template>
          </KCard>
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <h4>
        Image scaling
        <DocsAnchorTarget anchor="#thumbnails-image-scaling" />
      </h4>

      <p>The <DocsInternalLink text="thumbnailScaleType" href="#prop:thumbnailScaleType" code /> prop controls how a thumbnail image is scaled to fit the thumbnail area. The available options are the same as <code>KImg</code>'s <DocsInternalLink text="scaling options" href="/kimg#scaling" code />.</p>

      <p>If a thumbnail image quality and ratio is unknown, which is often the case in our cards, it is not recommended to use a different <code>thumbnailScaleType</code> value than its default <code>'centerInside'</code>. Despite all unknowns, this mode never distorts an image or impairs its quality. See <DocsInternalLink text="KImg's scaling guidance" href="/kimg#scaling" /> for more.</p>

      <h3>
        Interactive elements
        <DocsAnchorTarget anchor="#interactive-elements" />
      </h3>

      <p>When interactive elements, such as buttons, are provided to a card via one of its slots, <code>.stop</code> event modifier needs to be applied to their <code>@click</code> event to prevent the card from navigating away when clicked.</p>

      <DocsShow block>
        <KCardGrid layout="1-1-1">
          <DocsKCard
            :headingLevel="4"
            :layout="windowBreakpoint > 2 ? 'horizontal' : 'vertical'"
            thumbnailDisplay="large"
            thumbnailAlign="right"
          >
            <template #footer>
              <KIconButton
                :icon="isBookmarked ? 'bookmark' : 'bookmarkEmpty'"
                @click.stop="isBookmarked = !isBookmarked"
              />
            </template>
          </DocsKCard>
        </KCardGrid>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KCardGrid ...>
          <KCard ...>
            <template #footer>
              <KIconButton
                :icon="isBookmarked ? 'bookmark' : 'bookmarkEmpty'"
                @click.stop="isBookmarked = !isBookmarked"
              />
            </template>
          </KCard>
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <h3>
        Selection controls
        <DocsAnchorTarget anchor="#selection-controls" />
      </h3>

      <p>Selection controls such as checkbox or radio button can be displayed next to the card's main area via (TBD) slot.</p>

      <p><em>Always use <span :style="{ fontStyle: 'italic' }">"Select [card title]"</span> as a label for selection controls</em>. This is all that is required to ensure accessible experience as <code>KCard</code> takes care of all remaining aspects.</p>

      <p>Handling the selection state is not <code>KCard</code>'s responsibility .</p>

      <p>(TBD live example with code)</p>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsLibraryLink component="KCardGrid" /> is a component for use with <code>KCard</code>
        </li>
        <li>
          <code>KImg</code> has <DocsInternalLink text="scaling guidance" href="/kimg#scaling" /> that can be applied to <code>KCard</code>'s <DocsInternalLink text="thumbnailScaleType" href="#prop:thumbnailScaleType" code />
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  import useKResponsiveWindow from '../../../lib/composables/useKResponsiveWindow';
  import DocsKCard from '../../pages-components/DocsKCard';

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
        isBookmarked: false,
      };
    },
  };

</script>