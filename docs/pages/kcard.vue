<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p><code>KCard</code> is a versatile and accessible base component for creating various types of cards, such as lesson cards, resource cards, and more.</p>

      <p>It manages the layout, including the thumbnail image, title, and other content. It offers several base layouts and many customization options. Cards like the examples shown can be created, and many others.</p>

      <DocsShow block :style="{ maxWidth: '800px' }">
        <KCardGrid layout="1-1-1">
          <DocsKCard
            :headingLevel="3"
            :orientation="windowBreakpoint > 2 ? 'horizontal' : 'vertical'"
            thumbnailDisplay="large"
            thumbnailAlign="right"
            prependTitle="(2)"
            showProgressInFooter
          />
        </KCardGrid>
      </DocsShow>

      <p>It is inteded for use with <DocsLibraryLink component="KCardGrid" />.</p>

      <p>Below is an overview of <code>KCard</code>'s features and best practices focused on its inner content. To learn more about card grids and related <code>KCard</code> features, see <DocsLibraryLink component="KCardGrid" />.</p>
    </DocsPageSection>

    <DocsPageSection title="Guidelines" anchor="#guidelines">
      <ul>
        <li>
          Use <code>KCard</code> within <DocsLibraryLink component="KCardGrid" /> as its direct child (<DocsInternalLink text="KCard and KCardGrid" href="#k-card-and-grid" />)
        </li>
        <li>Set a correct heading level (<DocsInternalLink text="Title" href="#title" />)</li>
        <li>Ensure each card title is unique within a card grid (<DocsInternalLink text="Title" href="#title" />)</li>
        <li>Ensure content provided via slots is accessible (<DocsInternalLink text="Accessibility" href="#a11y" />)</li>
        <li>Even if a thumbnail image is available, provide a placeholder element (<DocsInternalLink text="Placeholder" href="#thumbnail-placeholder" />)</li>
        <li>If using selection controls, use pre-defined labels (<DocsInternalLink text="Selection controls" href="#selection-controls" />)</li>
        <li>Test final cards for semantic structure, accessibility, and right-to-left support (<DocsInternalLink text="Accessibility" href="#a11y" />)</li>
      </ul>

      <p>Also follow <DocsInternalLink text="KCardGrid guidelines" href="/kcardgrid#guidelines" />.</p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <DocsSubNav
        :items="[
          { text: 'KCard and KCardGrid', href: '#k-card-and-grid' },
          { text: 'Title', href: '#title' },
          { text: 'Accessibility', href: '#a11y' },
          { text: 'Navigation', href: '#navigation' },
          { text: 'Layout', href: '#layout' },
          { text: 'Content slots', href: '#content-slots' },
          { text: 'Thumbnail', href: '#thumbnail' },
          { text: 'Interactive elements', href: '#interactive-elements' },
          { text: 'Selection controls', href: '#selection-controls' }
        ]"
      />

      <h3>
        KCard and KCardGrid
        <DocsAnchorTarget anchor="#k-card-and-grid" />
      </h3>

      <p><code>KCard</code> must always be used as a direct child of <DocsLibraryLink component="KCardGrid" /> to ensure proper semantics and accessibility. Read <DocsLibraryLink component="KCardGrid" /> to see how these components work together.</p>

      <DocsToggleContent>
        <DocsDoNot>
          <template #do>
            <span>Always use <code>KCardGrid</code>, even for a single card</span>
            <!-- eslint-disable -->
            <DocsShowCode language="html">
              <template>
                <KCardGrid>
                  <KCard />
                </KCardGrid>
              </template>
            </DocsShowCode>
            <!-- eslint-enable -->
          </template>
          <template #not>
            <span>Not use <code>KCardGrid</code></span>
            <!-- eslint-disable -->
            <DocsShowCode language="html">
              <template>
                <div>
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
            <span>Build cards in such a way<br>that <code>KCard</code> is not a direct child of <code>KCardGrid</code></span>
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

      <p>First, use the <DocsInternalLink text="headingLevel" href="#prop:headingLevel" code /> prop to set the appropriate heading level (<code>2-6</code>) based on the surrounding context.</p>

      <DocsToggleContent>
        <p>Examples:</p>
        <ul>
          <li>If a page with cards has an <code>h1</code> and no subsections, set <DocsInternalLink text="headingLevel" href="#prop:headingLevel" code /> to <code>2</code> to render card titles as <code>h2</code>.</li>

          <li>If there's an <code>h2</code> subsection with cards, set <DocsInternalLink text="headingLevel" href="#prop:headingLevel" code /> to <code>3</code> to render card titles as <code>h3</code>.</li>
        </ul>
      </DocsToggleContent>

      <p>Then, use the <DocsInternalLink text="title" href="#prop:title" code /> prop to assign an unique title to each card in a grid.</p>

      <p>The <DocsInternalLink text="titleMaxLines" href="#prop:titleMaxLines" code /> prop can be used to truncate the title to a set number of lines.</p>

      <p>For more customization, the <DocsInternalLink text="title" href="#slot:title" code /> slot can be used. Provide only the title text to the slot without wrapping it in a heading element to avoid duplicate headings in the markup output.</p>

      <DocsToggleContent>
        <DocsDoNot>
          <template #do>
            <!-- eslint-disable -->
            <DocsShowCode language="html">
              <template>
                <KCardGrid>
                  <KCard
                    :headingLevel="3"
                    ...
                  >
                    <template #title>
                      Card title
                    </template>
                  </KCard>
                </KCardGrid>
              </template>
            </DocsShowCode>
            <!-- eslint-enable -->
          </template>
          <template #not>
            <DocsShowCode language="html">
              <template>
                <KCardGrid>
                  <KCard
                    :headingLevel="3"
                    ...
                  >
                    <template #title>
                      <h3>Card title</h3>
                    </template>
                  </KCard>
                </KCardGrid>
              </template>
            </DocsShowCode>
          </template>
        </DocsDoNot>
      </DocsToggleContent>

      <h3>
        Accessibility
        <DocsAnchorTarget anchor="#a11y" />
      </h3>

      <p><code>KCard</code> together with <code>KCardGrid</code>  have robust built-in accessibility. For the parts they are responsible for, they ensure semantics, screen reader experience, as well as support for right-to-left languages.</p>

      <p>However, it is always necessary to make sure that cards built on top of <code>KCard</code> are fully accessible. This is the case particularly for inner content of slots as <code>KCard</code> doesn't have control over them. See <DocsInternalLink text="Interactive elements" href="#interactive-elements" /> for one such example. here are innumerable kinds of content that can be provided via the slots. <em>Always test and consider what's the expected experience of every final card as a whole.</em></p>

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
        Layout
        <DocsAnchorTarget anchor="#layout" />
      </h3>

      <p><code>KCard</code> offers two main orientations: horizontal and vertical. In addition, it provides several ways to configure whether a thumbnail area is displayed, its size and alignment. These are the main building blocks for achieving a wide variety of card layouts.</p>

      <p>By combining the <DocsInternalLink text="orientation" href="#prop:orientation" code />, <DocsInternalLink text="thumbnailDisplay" href="#prop:thumbnailDisplay" code /> and <DocsInternalLink text="thumbnailAlign" href="#prop:thumbnailAlign" code /> props, cards like this can be created:</p>

      <DocsShow block>
        <KCardGrid layout="1-2-2">
          <DocsKCard
            :headingLevel="4"
            orientation="horizontal"
            thumbnailDisplay="large"
            thumbnailAlign="left"
            prependTitle="(1)"
          />
          <DocsKCard
            :headingLevel="4"
            orientation="horizontal"
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
            orientation="vertical"
            thumbnailDisplay="large"
            prependTitle="(1)"
          />
          <DocsKCard
            :headingLevel="4"
            orientation="vertical"
            thumbnailDisplay="small"
            prependTitle="(2)"
            showMenuInFooter
          />
          <DocsKCard
            :headingLevel="4"
            orientation="vertical"
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
            orientation="horizontal"
            thumbnailDisplay="large"
            thumbnailAlign="left"
          />
          <KCard
             ...
            orientation="horizontal"
            thumbnailDisplay="small"
            thumbnailAlign="right"
          />
        </KCardGrid>

        <KCardGrid ...>
          <KCard
            ...
            orientation="vertical"
            thumbnailDisplay="large"
          />
          <KCard
            ...
            orientation="vertical"
            thumbnailDisplay="small"
          />
          <KCard
            ...
            orientation="vertical"
            thumbnailDisplay="none"
          />
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <h3>
        Content slots
        <DocsAnchorTarget anchor="#content-slots" />
      </h3>

      <p>Use the <DocsInternalLink text="aboveTitle" href="#slot:aboveTitle" code />, <DocsInternalLink text="belowTitle" href="#slot:belowTitle" code />, and <DocsInternalLink text="footer" href="#slot:footer" code /> slots to add content to your card. <code>KCard</code> will organizing these areas within the card based on its layout. Apply custom styling to the inner content of slots to achieve desired effects.</p>

      <DocsShow block>
        <KCardGrid layout="1-1-1">
          <KCard
            :to="{ path: '/test-url' }"
            :headingLevel="4"
            :thumbnailSrc="require('../assets/hummingbird-large-cc-by-sa-4.jpg')"
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
        Thumbnail
        <DocsAnchorTarget anchor="#thumbnail" />
      </h3>

      <p><code>KCard</code> provides several ways to display thumbnails. If and how the thumbnail area is displayed depends on the following factors:</p>

      <ul>
        <li>The <DocsInternalLink text="orientation" href="#prop:orientation" code /> prop determines whether the thumbnail area is displayed above other content or if it is displayed next to it.</li>
        <li>The <DocsInternalLink text="thumbnailDisplay" href="#prop:thumbnailDisplay" code /> prop controls whether the thumbnail area is shown and what is its size</li>
        <li>The <DocsInternalLink text="thumbnailAlignment" href="#prop:thumbnailAlignment" code /> prop controls what side is the thumbnail area displayed when in card's horizontal orientation</li>
      </ul>

      <p>Go to <DocsInternalLink text="Layout" href="#layout" code /> to see how can these be combined to achieve various card layouts.</p>

      <h4>
        Placeholder
        <DocsAnchorTarget anchor="#thumbnail-placeholder" />
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
            :orientation="windowBreakpoint > 2 ? 'horizontal' : 'vertical'"
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
        <DocsAnchorTarget anchor="#thumbnail-image-scaling" />
      </h4>

      <p>The <DocsInternalLink text="thumbnailScaleType" href="#prop:thumbnailScaleType" code /> prop controls how a thumbnail image is scaled to fit the thumbnail area. The available options are the same as <code>KImg</code>'s <DocsInternalLink text="scaling options" href="/kimg#scaling" code />.</p>

      <p>If a thumbnail image quality and ratio is unknown, which is often the case in our cards, it is not recommended to use a different <code>thumbnailScaleType</code> value than its default <code>'centerInside'</code>. Despite all unknowns, this mode never distorts an image or impairs its quality. See <DocsInternalLink text="KImg's scaling guidance" href="/kimg#scaling" /> for more.</p>

      <h3>
        Interactive elements
        <DocsAnchorTarget anchor="#interactive-elements" />
      </h3>

      <p>When interactive elements, such as buttons, are provided to a card via one of its slots, <code>.stop</code> event modifier needs to be applied to their <code>@click</code> event to prevent the card from navigating away when clicked.</p>

      <p>Even though this applies to all content provided via slots, it is important to consider accessibility particularly when adding interactive elements to cards. For example in the following, <code>ariaLabel</code> is applied to the bookmark icon button so that screenreader users can understand its purpose. And in a production environemnt, some more work would need to be done to communicate the bookmark toggled state. Always assess on a case-by-case basis.</p>

      <DocsShow block>
        <KCardGrid layout="1-1-1">
          <DocsKCard
            :headingLevel="4"
            :orientation="windowBreakpoint > 2 ? 'horizontal' : 'vertical'"
            thumbnailDisplay="large"
            thumbnailAlign="right"
          >
            <template #footer>
              <KIconButton
                ariaLabel="Bookmark resource"
                :icon="isBookmarked1 ? 'bookmark' : 'bookmarkEmpty'"
                @click.stop="isBookmarked1 = !isBookmarked1"
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
                ariaLabel="Bookmark resource"
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

      <p>Selection controls such as checkbox or radio button can be displayed next to the card's main area via the <DocsInternalLink text="select" href="#slot:select" /> slot.</p>

      <p><em>Always use <span :style="{ fontStyle: 'italic' }">"Select '[card title]'"</span> as a label for selection controls. Use the <code>visuallyhidden</code> class to hide the label visually but allow screen readers to detect it.</em></p>

      <p><code>KCard</code> takes care of the remaining aspects of accessible experience, such as semantics and focus order.</p>

      <p>If there are other interactive elements in a card, a selection control receives the focus as last in the keyboard navigation order.</p>

      <p>Handling the selection state is not <code>KCard</code>'s responsibility.</p>

      <DocsShow block :style="{ maxWidth: '800px' }">
        <KCardGrid layout="1-1-1">
          <DocsKCard
            :to="{ path: '/kcard' }"
            :headingLevel="4"
            :orientation="windowBreakpoint > 2 ? 'horizontal' : 'vertical'"
            thumbnailDisplay="large"
            thumbnailAlign="right"
            title="First card"
          >
            <template #select>
              <KCheckbox
                :checked="isFirstCardChecked"
                @change="isFirstCardChecked = !isFirstCardChecked"
              >
                <span class="visuallyhidden">Select 'First card'</span>
              </KCheckbox>
            </template>
            <template #footer>
              <KIconButton
                ariaLabel="Bookmark resource"
                :icon="isBookmarked2 ? 'bookmark' : 'bookmarkEmpty'"
                @click.stop="isBookmarked2 = !isBookmarked2"
              />
            </template>
          </DocsKCard>

          <DocsKCard
            :to="{ path: '/kcard' }"
            :headingLevel="4"
            :orientation="windowBreakpoint > 2 ? 'horizontal' : 'vertical'"
            thumbnailDisplay="large"
            thumbnailAlign="right"
            title="Second card"
          >
            <template #select>
              <KCheckbox
                :checked="isSecondCardChecked"
                @change="isSecondCardChecked = !isSecondCardChecked"
              >
                <span class="visuallyhidden">Select 'Second card'</span>
              </KCheckbox>
            </template>
            <template #footer>
              <KIconButton
                ariaLabel="Bookmark resource"
                :icon="isBookmarked3 ? 'bookmark' : 'bookmarkEmpty'"
                @click.stop="isBookmarked3 = !isBookmarked3"
              />
            </template>
          </DocsKCard>
        </KCardGrid>
      </DocsShow>


      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KCardGrid ...>
          <KCard ...>
            <template #select>
              <KCheckbox
                :checked="..."
                @change="..."
              >
                <span class="visuallyhidden">Select 'First card'</span>
              </KCheckbox>
            </template>
          </KCard>

          <KCard ...>
            <template #select>
              <KCheckbox
                :checked="..."
                @change="..."
              >
                <span class="visuallyhidden">Select 'Second card'</span>
              </KCheckbox>
            </template>
          </KCard>
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->
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
        isBookmarked1: false,
        isBookmarked2: false,
        isBookmarked3: false,
        isFirstCardChecked: false,
        isSecondCardChecked: false,
      };
    },
  };

</script>