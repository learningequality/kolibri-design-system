<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        <code>KCard</code> is a versatile and accessible base component for creating various types
        of cards, such as lesson cards, resource cards, and more.
      </p>

      <p>
        It manages the layout, including the thumbnail image, title, and other content. It offers
        several base layouts and many customization options. Cards like the examples shown can be
        created, and many others.
      </p>

      <DocsShow
        block
        :style="{ maxWidth: '800px' }"
      >
        <KCardGrid
          layout="1-1-1"
          :skeletonsConfig="skeletonsConfig"
          :loading="loading"
        >
          <Card
            :headingLevel="3"
            :orientation="windowBreakpoint > 2 ? 'horizontal' : 'vertical'"
            thumbnailDisplay="large"
            thumbnailAlign="right"
            prependTitle="(1)"
            showProgressInFooter
          />
        </KCardGrid>
      </DocsShow>

      <p>
        It is intended for use with <code>KCardGrid</code>. Below is an overview of
        <code>KCard</code>'s features and best practices focused on its inner content. To learn more
        about card grids and related <code>KCard</code> features, see
        <DocsLibraryLink component="KCardGrid" />.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Guidelines"
      anchor="#guidelines"
    >
      <ul>
        <li>
          Use <code>KCard</code> within <code>KCardGrid</code> as its direct child
          (<DocsInternalLink
            text="KCard and KCardGrid"
            href="#k-card-and-grid"
          />)
        </li>
        <li>
          Set a correct heading level (<DocsInternalLink
            text="Title"
            href="#title"
          />)
        </li>
        <li>
          Ensure each card title is unique within a card grid (<DocsInternalLink
            text="Title"
            href="#title"
          />)
        </li>
        <li>Do not use a heading element within the <code>title</code> slot</li>
        <li>
          Ensure content provided via slots is accessible (<DocsInternalLink
            text="Accessibility"
            href="#a11y"
          />)
        </li>
        <li>
          Even if a thumbnail image is available, provide a placeholder element (<DocsInternalLink
            text="Placeholder"
            href="#thumbnail-placeholder"
          />)
        </li>
        <li>
          If using selection controls, use pre-defined labels (<DocsInternalLink
            text="Selection controls"
            href="#selection-controls"
          />)
        </li>
        <li>
          Test final cards for semantic structure, accessibility, and right-to-left support
          (<DocsInternalLink
            text="Accessibility"
            href="#a11y"
          />)
        </li>
      </ul>

      <p>
        Also follow
        <DocsInternalLink
          text="KCardGrid guidelines"
          href="/kcardgrid#guidelines"
        />.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <DocsSubNav
        :items="[
          { text: 'KCard and KCardGrid', href: '#k-card-and-grid' },
          { text: 'Title', href: '#title' },
          { text: 'Accessibility', href: '#a11y' },
          { text: 'Click event and navigation', href: '#click-navigation' },
          { text: 'Layout', href: '#layout' },
          { text: 'Responsiveness', href: '#responsiveness' },
          { text: 'Content slots', href: '#content-slots' },
          { text: 'Thumbnail', href: '#thumbnail' },
          { text: 'Interactive elements', href: '#interactive-elements' },
          { text: 'Selection controls', href: '#selection-controls' },
        ]"
      />

      <h3>
        KCard and KCardGrid
        <DocsAnchorTarget anchor="#k-card-and-grid" />
      </h3>

      <p>
        <em><code>KCard</code> must always be used within <code>KCardGrid</code> as its direct
          child</em>
        to ensure proper semantics and accessibility. Refer to
        <DocsLibraryLink component="KCardGrid" /> to see how these components work together.
        <DocsToggleButton contentId="more-card-and-grid" />
      </p>

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
                <KCard> ... </KCard>
              </template>
            </DocsShowCode>
            <!-- eslint-enable -->
          </template>
          <template #not>
            <span>Build cards in such a way<br >that <code>KCard</code> is not a direct child of
              <code>KCardGrid</code></span>
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
                  <KCard> ... </KCard>
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

      <p>
        <em>Always use the <code>title</code> prop to assign an unique title to each card in a grid,
          and the <code>headingLevel</code> prop to set the heading level on it. The level needs to
          correspond to the surrounding context.</em>
        <DocsToggleButton contentId="more-heading-level" />
      </p>

      <DocsToggleContent id="more-heading-level">
        <p>Examples:</p>
        <ul>
          <li>
            If a page with cards has an <code>h1</code> and no subsections, set
            <code>headingLevel</code> to <code>2</code> to render card titles as <code>h2</code>.
          </li>

          <li>
            If there's an <code>h2</code> subsection with cards, set <code>headingLevel</code> to
            <code>3</code> to render card titles as <code>h3</code>.
          </li>
        </ul>
      </DocsToggleContent>

      <p>
        The scoped <code>title</code> slot with its <code>titleText</code> attribute can be used to
        customize the title.
      </p>

      <DocsExample
        loadExample="KCard/Title.vue"
        exampleId="kcard-title"
        block
      >
        <template #html>
          <DocsShowCode language="html">
            <template>
              <KCardGrid>
                <KCard
                  :headingLevel="3"
                  title="(1) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities"
                  ...
                >
                  <template #title="{ titleText }">
                    <KLabeledIcon icon="readSolid">
                      <KTextTruncator
                        :text="titleText"
                        :maxLines="1"
                      />
                    </KLabeledIcon>
                  </template>
                </KCard>
              </KCardGrid>
            </template>
          </DocsShowCode>
        </template>
      </DocsExample>

      <p>
        <em>Do not use a heading element within the <code>title</code> slot to avoid duplicate
          headings in the markup output.</em><code>KCard</code> already handles a heading element internally.<DocsToggleButton
          contentId="more-title-slot"
        />
      </p>

      <DocsToggleContent id="more-title-slot">
        <DocsDoNot>
          <template #not>
            <DocsShowCode language="html">
              <template>
                <KCardGrid>
                  <KCard
                    :headingLevel="3"
                    title="(1) Learn everything about hummingbirds"
                    ...
                  >
                    <template #title="{ titleText }">
                      <h3>
                        <KLabeledIcon icon="readSolid">
                          <KTextTruncator
                            :text="titleText"
                            :maxLines="2"
                          />
                        </KLabeledIcon>
                      </h3>
                    </template>
                  </KCard>
                </KCardGrid>
              </template>
            </DocsShowCode>
          </template>
        </DocsDoNot>
      </DocsToggleContent>

      <p>
        The <code>titleMaxLines</code> prop can be used to truncate the title to a set number of
        lines.
      </p>

      <h3>
        Accessibility
        <DocsAnchorTarget anchor="#a11y" />
      </h3>

      <p>
        <code>KCard</code> and <code>KCardGrid</code> offer built-in accessibility. For the parts
        they are responsible for, they manage proper semantics, screen reader support, and
        right-to-left language compatibility.
      </p>

      <p>
        However,
        <em>it is necessary to ensure that cards built with <code>KCard</code> are fully accessible,
          particularly the slot content that <code>KCard</code> doesn't control.</em>
        Refer to
        <DocsInternalLink
          text="Interactive elements"
          href="#interactive-elements"
        />
        for one such example.
      </p>

      <p><em>Always test semantics, accessibility, and right-to-left of the final cards.</em></p>

      <h3>
        Click event and navigation
        <DocsAnchorTarget anchor="#click-navigation" />
      </h3>

      <p><code>KCard</code>'s entire area is clickable.</p>

      <p>You can use the <code>to</code> prop to navigate to a URL when the card is clicked.</p>

      <DocsShowCode language="html">
        <KCardGrid ...>
          <KCard
            ...
            :to="{ name: 'NamedRoute' }"
          />
          <KCard
            ...
            :to="{ path: '/kcard' }"
          />
        </KCardGrid>
      </DocsShowCode>

      <p>
        Listen to the <code>click</code> event to perform a custom action (whether or not the
        <code>to</code> prop is used).
      </p>

      <DocsShowCode language="html">
        <KCardGrid ...>
          <KCard
            ...
            @click="onClick"
          />
          <KCard
            ...
            :to="{ path: '/kcard' }"
            @click="onClick"
          />
        </KCardGrid>
      </DocsShowCode>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        export default {
          methods() {
            onClick() {
              console.log('Card clicked');
            }
          },
        };
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>Note that long clicks are ignored to allow for text selection.</p>

      <p>
        See
        <DocsInternalLink
          text="Interactive elements"
          href="#interactive-elements"
        />
        to learn how to disable card navigation in favor of a custom handler when elements like
        buttons are rendered within a card.
      </p>

      <h3>
        Layout
        <DocsAnchorTarget anchor="#layout" />
      </h3>

      <p>
        <code>KCard</code> has two orientations: horizontal and vertical. It is also possible to
        configure whether a thumbnail area is displayed, its size and alignment. By combining
        <code>orientation</code>, <code>thumbnailDisplay</code> and
        <code>thumbnailAlign</code> props, the following card layouts can be achieved to organize
        diverse kinds of content:
      </p>

      <DocsExample
        loadExample="KCard/Layout1.vue"
        exampleId="kcard-layout"
        block
      >
        <template #html>
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
          </DocsShowCode>

          <!-- eslint-enable -->
        </template>
      </DocsExample>

      <DocsExample
        loadExample="KCard/Layout2.vue"
        exampleId="kcard-layout"
        block
      >
        <template #html>
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
          </DocsShowCode>

          <!-- eslint-enable -->
        </template>
      </DocsExample>

      <DocsExample
        loadExample="KCard/Layout3.vue"
        exampleId="kcard-layout"
        block
      >
        <template #html>
          <!-- eslint-disable -->

          <DocsShowCode language="html">
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
        </template>
      </DocsExample>

      <h3>
        Responsiveness
        <DocsAnchorTarget anchor="#responsiveness" />
      </h3>

      <p>
        To a large extent, <code>KCardGrid</code> takes care of responsiveness. Depending on a
        chosen card layout, <code>KCard</code>'s inner area can be further adjusted to offer even
        better experience. Refer to
        <DocsInternalLink
          text="KCardGrid: Fine-tuning responsiveness"
          href="/kcardgrid#fine-tuning-responsiveness"
        />.
      </p>

      <h3>
        Content slots
        <DocsAnchorTarget anchor="#content-slots" />
      </h3>

      <p>
        Use <code>aboveTitle</code>, <code>belowTitle</code>, and <code>footer</code> slots to add
        content to a card. <code>KCard</code> will organize these areas according to its
        <DocsInternalLink
          text="layout configuration"
          href="#layout"
        />. Apply custom styling to the inner content of slots to achieve desired effects.
      </p>

      <DocsExample
        loadExample="KCard/ContentSlots.vue"
        exampleId="kcard-content-slots"
        block
      >
        <template #html>
          <!-- eslint-disable -->
          <DocsShowCode language="html">
            <KCardGrid ...>
              <KCard ...>
                <template #aboveTitle>
                  <KLabeledIcon
                    icon="readSolid"
                    label="Read"
                  />
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
        </template>
      </DocsExample>

      <p>
        The <code>title</code> slot is available as an alternative to the <code>title</code> prop.
        See
        <DocsInternalLink
          text="Title"
          href="#title"
        />.
      </p>

      <h3>
        Thumbnail
        <DocsAnchorTarget anchor="#thumbnail" />
      </h3>

      <p>
        <code>KCard</code> offers multiple ways to display thumbnails, depending on these factors:
      </p>

      <ul>
        <li>
          The <code>orientation</code> prop decides if the thumbnail area appears above or beside
          other content.
        </li>
        <li>The <code>thumbnailDisplay</code> prop manages the thumbnail's visibility and size.</li>
        <li>
          The <code>thumbnailAlignment</code> prop sets which side the thumbnail appears on in
          horizontal orientation.
        </li>
      </ul>

      <p>
        See
        <DocsInternalLink
          text="Layout"
          href="#layout"
        />
        to see how these options can be combined to create different card layouts.
      </p>

      <h4>
        Placeholder
        <DocsAnchorTarget anchor="#thumbnail-placeholder" />
      </h4>

      <p>
        When <code>KCard</code> is set to display the thumbnail, the thumbnail area acts as a
        placeholder if the image is missing, fails to load, or is still loading. In such cases, a
        light gray background is shown in place of the image.
      </p>

      <p>
        Use the <code>thumbnailPlaceholder</code> slot to add a placeholder element, such as an
        icon, to this area.
        <em>Provide a placeholder element even if a thumbnail image is available.</em> It serves as
        fallback content if the image fails to load unexpectedly.
      </p>
      <DocsExample
        loadExample="KCard/Placeholder.vue"
        exampleId="kcard-placeholder"
        block
      >
        <template #html>
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
        </template>
      </DocsExample>

      <h4>
        Image scaling
        <DocsAnchorTarget anchor="#thumbnail-image-scaling" />
      </h4>

      <p>
        The <code>thumbnailScaleType</code> prop determines how a thumbnail image is scaled to fit
        the thumbnail area. The available options are the same as <code>KImg</code>'s scaling
        options.
      </p>

      <p>
        <em>If a thumbnail image's quality and ratio are unknown, which is often the case in our
          cards, it's best to use the default value <code>'centerInside'</code></em>
        since it never distorts the image or impairs its quality.
      </p>

      <p>
        See
        <DocsInternalLink
          text="KImg's scaling guidance"
          href="/kimg#scaling"
        />.
      </p>

      <h3>
        Interactive elements
        <DocsAnchorTarget anchor="#interactive-elements" />
      </h3>

      <p>
        When adding interactive elements like buttons to a card via slots, apply the
        <code>.stop</code> event modifier to their <code>@click</code> event to prevent the card
        <DocsInternalLink
          text="click event and navigation"
          href="#click-navigation"
        />.
      </p>

      <p>
        <em>This applies to all slot content, but considering accessibility is especially important
          with interactive elements.</em>
        For instance, <code>ariaLabel</code> is applied to the bookmark icon button in the following
        example so that screenreaders can communicate its purpose. In production, more work would be
        needed to indicate the bookmark's toggled state. Always assess on a case-by-case basis.
      </p>

      <DocsExample
        loadExample="KCard/InteractiveElements.vue"
        exampleId="kcard-interactive-elements"
        block
      >
        <template #html>
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
        </template>
      </DocsExample>

      <h3>
        Selection controls
        <DocsAnchorTarget anchor="#selection-controls" />
      </h3>

      <p>
        Selection controls like checkboxes or radio buttons can be placed next to the card's main
        area via the <code>select</code> slot.
      </p>

      <p>
        <em>Use <span :style="{ fontStyle: 'italic' }">"Select '[card title]'"</span> as label and
          hide it with the <code>visuallyhidden</code> class to keep the label available for screen
          readers.</em>
      </p>

      <p>
        <code>KCard</code> handles all remaining accessibility aspects, including semantics and
        focus order. If there are other interactive elements in a card, a selection control will
        receive focus last in the keyboard navigation order.
      </p>

      <p>Managing the selection state is not <code>KCard</code>'s responsibility.</p>

      <DocsExample
        loadExample="KCard/SelectionControls.vue"
        exampleId="kcard-selection-controls"
        block
      >
        <template #html>
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
        </template>
      </DocsExample>
    </DocsPageSection>

    <DocsPageSection
      title="Related"
      anchor="#related"
    >
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

  export default {
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
      };
    },
    mounted() {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  };

</script>
