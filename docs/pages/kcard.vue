<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p><code>KCard</code> is a versatile and accessible base component for creating various types of cards, such as lesson cards, resource cards, and more.</p>

      <p>It manages the layout, including the thumbnail image, title, and other content. It offers several base layouts and many customization options. Cards like the examples shown can be created, and many others.</p>

      <DocsShow block :style="{ maxWidth: '800px' }">
        <KCardGrid
          layout="1-1-1"
          :skeletonsConfig="skeletonsConfig1"
          :loading="loading"  
        >
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

      <p>It is intended for use with <code>KCardGrid</code>. Below is an overview of <code>KCard</code>'s features and best practices focused on its inner content. To learn more about card grids and related <code>KCard</code> features, see <DocsLibraryLink component="KCardGrid" />.</p>
    </DocsPageSection>

    <DocsPageSection title="Guidelines" anchor="#guidelines">
      <ul>
        <li>
          Use <code>KCard</code> within <code>KCardGrid</code> as its direct child (<DocsInternalLink text="KCard and KCardGrid" href="#k-card-and-grid" />)
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
          { text: 'Responsiveness', href: '#responsiveness' },
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

      <p><em><code>KCard</code> must always be used within <code>KCardGrid</code> as its direct child</em> to ensure proper semantics and accessibility. Refer to <DocsLibraryLink component="KCardGrid" /> to see how these components work together. <DocsToggleButton contentId="more-card-and-grid" /></p>

      <DocsToggleContent id="more-card-and-grid">
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

      <p><em>Use the <code>title</code> prop to assign an unique title to each card in a grid, and the <code>headingLevel</code> prop to set the heading level on it. The level needs to correspond to the surrounding context.</em> <DocsToggleButton contentId="more-heading-level" /></p>

      <DocsToggleContent id="more-heading-level">
        <p>Examples:</p>
        <ul>
          <li>If a page with cards has an <code>h1</code> and no subsections, set <code>headingLevel</code> to <code>2</code> to render card titles as <code>h2</code>.</li>

          <li>If there's an <code>h2</code> subsection with cards, set <code>headingLevel</code> to <code>3</code> to render card titles as <code>h3</code>.</li>
        </ul>
      </DocsToggleContent>

      <p>The <code>titleMaxLines</code> prop can be used to truncate the title to a set number of lines.</p>

      <p>For more customization, the <code>title</code> slot can be used. Provide only a title text to the slot without wrapping it in a heading element to avoid duplicate headings in the markup output. <DocsToggleButton contentId="more-title-slot" /></p>

      <DocsToggleContent id="more-title-slot">
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

      <p><code>KCard</code> and <code>KCardGrid</code> offer built-in accessibility. For the parts they are responsible for, they manage proper semantics, screen reader support, and right-to-left language compatibility.</p>

      <p>However, <em>it is necessary to ensure that cards built with <code>KCard</code> are fully accessible, particularly the slot content that <code>KCard</code> doesn't control.</em> Refer to <DocsInternalLink text="Interactive elements" href="#interactive-elements" /> for one such example.</p>

      <p><em>Always test semantics, accessibility, and right-to-left of the final cards.</em></p>

      <h3>
        Navigation
        <DocsAnchorTarget anchor="#navigation" />
      </h3>

      <p><code>KCard</code>'s entire area is clickable, navigating to a target provided via the <code>to</code> prop as a regular Vue route object. <DocsToggleButton contentId="more-navigation" /></p>

      <DocsToggleContent id="more-navigation">
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
      </DocsToggleContent>

      <p>See <DocsInternalLink text="Interactive elements" href="#interactive-elements" /> to learn how to disable card navigation in favor of a custom handler when elements like buttons are rendered within a card.</p>

      <h3>
        Layout
        <DocsAnchorTarget anchor="#layout" />
      </h3>

      <p><code>KCard</code> has two orientations: horizontal and vertical. It is also possible to configure whether a thumbnail area is displayed, its size and alignment. By combining <code>orientation</code>, <code>thumbnailDisplay</code> and <code>thumbnailAlign</code> props, the following card layouts can be achieved to organize diverse kinds of content:</p>

      <DocsShow block>
        <KCardGrid
          layout="1-2-3"
          :skeletonsConfig="skeletonsConfig2"
          :loading="loading"  
        >
          <DocsKCard
            :headingLevel="4"
            orientation="vertical"
            thumbnailDisplay="large"
            prependTitle="(1)"
          >
            <template #aboveTitle>
              <KLabeledIcon icon="readSolid" label="Read" />
            </template>
            <template #footer>
              <div class="pills" :style="{ 'color': $themeTokens.annotation }">
                <span
                  :style="{ 'background-color': $themePalette.grey.v_100 }"
                >
                  Short Activity
                </span>
                <span
                  :style="{ 'background-color': $themePalette.grey.v_100 }"
                >
                  Biology
                </span>
              </div>
            </template>
          </DocsKCard>
          <DocsKCard
            :headingLevel="4"
            orientation="vertical"
            thumbnailDisplay="large"
            :thumbnailSrc="null"
            prependTitle="(2)"
          >
            <template #aboveTitle>
              <KLabeledIcon icon="readSolid" label="Read" />
            </template>
            <template #footer>
              <div class="pills" :style="{ 'color': $themeTokens.annotation }">
                <span
                  :style="{ 'background-color': $themePalette.grey.v_100 }"
                >
                  Short Activity
                </span>
              </div>
            </template>
          </DocsKCard>
          <DocsKCard
            :headingLevel="4"
            orientation="vertical"
            thumbnailDisplay="small"
            prependTitle="(3)"
            hideFooter
          >
            <template #aboveTitle>
              <KLabeledIcon icon="readSolid" label="Read" />
            </template>
          </DocsKCard>
        </KCardGrid>
      </DocsShow>

      <DocsShow block>
        <KCardGrid
          layout="1-2-2"
          :skeletonsConfig="skeletonsConfig3"
          :loading="loading"  
        >
          <DocsKCard
            :headingLevel="4"
            orientation="horizontal"
            thumbnailDisplay="large"
            :thumbnailSrc="null"
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
        <KCardGrid
          layout="1-2-3"
          :skeletonsConfig="skeletonsConfig4"
          :loading="loading"
        >
          <DocsKCard
            :headingLevel="4"
            orientation="vertical"
            thumbnailDisplay="none"
            prependTitle="(1)"
          />
          <DocsKCard
            :headingLevel="4"
            orientation="vertical"
            thumbnailDisplay="none"
            prependTitle="(2)"
            showProgressInFooter
          >
            <template #footer>
              <span></span>
            </template>
          </DocsKCard>
          <DocsKCard
            :headingLevel="4"
            orientation="vertical"
            thumbnailDisplay="none"
            prependTitle="(3)"
            showMenuInFooter
          />
        </KCardGrid>
      </DocsShow>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KCardGrid ...>
          <KCard
            ...
            orientation="vertical"
            thumbnailDisplay="large"
          />
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
        </KCardGrid>

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
            v-for="i in 3"
            orientation="vertical"
            thumbnailDisplay="none"
          />
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <h3>
        Responsiveness
        <DocsAnchorTarget anchor="#responsiveness" />
      </h3>

      <p>To a large extent, <code>KCardGrid</code> takes care of responsiveness. Depending on a chosen card layout, <code>KCard</code>'s inner area can be further adjusted to offer even better experience. Refer to <DocsInternalLink text="KCardGrid: Fine-tuning responsiveness" href="/kcardgrid#fine-tuning-responsiveness" />.</p>

      <h3>
        Content slots
        <DocsAnchorTarget anchor="#content-slots" />
      </h3>

      <p>Use <code>aboveTitle</code>, <code>belowTitle</code>, and <code>footer</code> slots to add content to a card. <code>KCard</code> will organize these areas according to its <DocsInternalLink text="layout configuration" href="#layout" />. Apply custom styling to the inner content of slots to achieve desired effects.</p>

      <DocsShow block>
        <KCardGrid
          layout="1-1-1"
          :skeletonsConfig="skeletonsConfig5"
          :loading="loading"  
        >
          <KCard
            :to="{ path: '#guidelines' }"
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
              <div class="pills" :style="{ 'color': $themeTokens.annotation }">
                <span
                  :style="{ 'backgroundColor': $themePalette.grey.v_100 }"
                >
                  Short Activity
                </span>
                <span
                  :style="{ 'backgroundColor': $themePalette.grey.v_100 }"
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
              <span :style="{ ... }">Short Activity</span>
              <span :style="{ ... }">Biology</span>
            </template>
          </KCard>
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>The <code>title</code> slot is available as an alternative to the <code>title</code> prop. See <DocsInternalLink text="Title" href="#title" />.</p>

      <h3>
        Thumbnail
        <DocsAnchorTarget anchor="#thumbnail" />
      </h3>

      <p><code>KCard</code> offers multiple ways to display thumbnails, depending on these factors:</p>

      <ul>
        <li>The <code>orientation</code> prop decides if the thumbnail area appears above or beside other content.</li>
        <li>The <code>thumbnailDisplay</code> prop manages the thumbnail's visibility and size.</li>
        <li>The <code>thumbnailAlignment</code> prop sets which side the thumbnail appears on in horizontal orientation.</li>
      </ul>

      <p>See <DocsInternalLink text="Layout" href="#layout" /> to see how these options can be combined to create different card layouts.</p>

      <h4>
        Placeholder
        <DocsAnchorTarget anchor="#thumbnail-placeholder" />
      </h4>

      <p>When <code>KCard</code> is set to display the thumbnail, the thumbnail area acts as a placeholder if the image is missing, fails to load, or is still loading. In such cases, a light gray background is shown in place of the image.</p>

      <p>Use the <code>thumbnailPlaceholder</code> slot to add a placeholder element, such as an icon, to this area. <em>Provide a placeholder element even if a thumbnail image is available.</em> It serves as fallback content if the image fails to load unexpectedly.</p>

      <DocsShow block>
        <KCardGrid
          layout="1-1-1"
          :skeletonsConfig="skeletonsConfig6"
          :loading="loading"  
        >
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
          <KCard ...>
            <template #thumbnailPlaceholder>
              <KIcon
                :style="{ fontSize: '48px' }"
                icon="readSolid"
              />
            </template>
          </KCard>
        </KCardGrid>
      </DocsShowCode>
      <!-- eslint-enable -->

      <h4>
        Image scaling
        <DocsAnchorTarget anchor="#thumbnail-image-scaling" />
      </h4>

      <p>The <code>thumbnailScaleType</code> prop determines how a thumbnail image is scaled to fit the thumbnail area. The available options are the same as <code>KImg</code>'s scaling options.</p>

      <p><em>If a thumbnail image's quality and ratio are unknown, which is often the case in our cards, it's best to use the default value  <code>'centerInside'</code></em> since it never distorts the image or impairs its quality.</p>

      <p>See <DocsInternalLink text="KImg's scaling guidance" href="/kimg#scaling" />.</p>

      <h3>
        Interactive elements
        <DocsAnchorTarget anchor="#interactive-elements" />
      </h3>

      <p>When adding interactive elements like buttons to a card via slots, apply the <code>.stop</code> event modifier to their <code>@click</code> event to prevent the card from navigating away when clicked.</p>

      <p><em>This applies to all slot content, but considering accessibility is especially important with interactive elements.</em> For instance, <code>ariaLabel</code> is applied to the bookmark icon button in the following example so that screenreaders can communicate its purpose. In production, more work would be needed to indicate the bookmark's toggled state. Always assess on a case-by-case basis.</p>

      <DocsShow block>
        <KCardGrid
          layout="1-1-1"
          :skeletonsConfig="skeletonsConfig7"
          :loading="loading"
        >
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

      <p>Selection controls like checkboxes or radio buttons can be placed next to the card's main area via the <code>select</code> slot.</p>

      <p><em>Use <span :style="{ fontStyle: 'italic' }">"Select '[card title]'"</span> as label and hide it with the <code>visuallyhidden</code> class to keep the label available for screen readers.</em></p>

      <p><code>KCard</code> handles all remaining accessibility aspects, including semantics and focus order. If there are other interactive elements in a card, a selection control will receive focus last in the keyboard navigation order.</p>

      <p>Managing the selection state is not <code>KCard</code>'s responsibility.</p>

      <DocsShow block :style="{ maxWidth: '800px' }">
        <KCardGrid
          layout="1-1-1"
          :skeletonsConfig="skeletonsConfig8"
          :loading="loading"
        >
          <DocsKCard
            :to="{ path: '#guidelines' }"
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
            :to="{ path: '#guidelines' }"
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
        loading: true,
        skeletonsConfig1: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'vertical',
            thumbnailDisplay: 'large',
            height: '490px',
          },
          {
            breakpoints: [2],
            height: '430px',
          },
          {
            breakpoints: [3, 4, 5, 6, 7],
            orientation: 'horizontal',
            thumbnailAlign: 'right',
            height: '220px',
          },
        ],
        skeletonsConfig2: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'vertical',
            thumbnailDisplay: 'large',
            height: '490px',
          },
          {
            breakpoints: [3, 4, 5, 6, 7],
            height: '420px',
          },
        ],
        skeletonsConfig3: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'horizontal',
            thumbnailDisplay: 'large',
            thumbnailAlign: 'left',
            height: '310px',
          },
          {
            breakpoints: [4, 5, 6, 7],
            height: '240px',
          },
        ],
        skeletonsConfig4: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            height: '290px',
          },
          {
            breakpoints: [4, 5, 6, 7],
            height: '225px',
          },
        ],
        skeletonsConfig5: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'horizontal',
            thumbnailDisplay: 'large',
            thumbnailAlign: 'left',
            height: '300px',
          },
          {
            breakpoints: [3, 4, 5, 6, 7],
            height: '190px',
          },
        ],
        skeletonsConfig6: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'vertical',
            thumbnailDisplay: 'large',
            height: '460px',
          },
          {
            breakpoints: [2],
            height: '390px',
          },
          {
            breakpoints: [3, 4, 5, 6, 7],
            orientation: 'horizontal',
            thumbnailAlign: 'right',
            height: '170px',
          },
        ],
        skeletonsConfig7: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'vertical',
            thumbnailDisplay: 'large',
            height: '460px',
          },
          {
            breakpoints: [2],
            height: '390px',
          },
          {
            breakpoints: [3, 4, 5, 6, 7],
            orientation: 'horizontal',
            thumbnailAlign: 'right',
            height: '170px',
          },
        ],
        skeletonsConfig8: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'vertical',
            thumbnailDisplay: 'large',
            height: '400px',
          },
          {
            breakpoints: [2],
            height: '380px',
          },
          {
            breakpoints: [3, 4, 5, 6, 7],
            orientation: 'horizontal',
            thumbnailAlign: 'right',
            height: '180px',
          },
        ],
      };
    },
    mounted() {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
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