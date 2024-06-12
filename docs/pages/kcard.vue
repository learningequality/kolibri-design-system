<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        <code>KCard</code>
        provides an accessible component for managing most frequently card content such as thumbnail, layouts and other customization options.
      </p>
    </DocsPageSection>


    <DocsPageSection title="Usage" anchor="#usage">
      <p> <code>KCard</code>  KCard is a versatile base component for creating various card types, including lesson cards, resource cards, and channel cards. It can be configured by adding product-specific content and logic to generate distinct card components. KCard provides slots for adding content such as titles, subtitles, and footers, along with options for displaying thumbnail images and customizing the layout.</p>
      <DocsPageSection title="Layouts" anchor="#Layouts">
        <p>
          <code>KCard</code> offers two main types of layouts to accommodate different content needs: horizontal and vertical.
        </p>

        <h3>layouts</h3>
        <p>
          Vertical
          <DocsInternalLink href="/kcard#prop:layout">
            <code>layout</code>
          </DocsInternalLink> and no
          <DocsInternalLink href="/kcard#prop:thumbnailDisplay">
            <code> thumbnailDisplay</code>
          </docsinternallink> solely consists of content without any accompanying thumbnail image. This layout is suitable when visual representation is not necessary or when the content itself is sufficiently descriptive or engaging without the need for an image.
        </p>
        <DocsShowCode language="html">
          <div>
            <KCard
              :to="{ name: '/' }"
              :headingLevel="2"
              layout="horizontal"
              thumbnailDisplay="none"
              :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            >
              <template #title>
                <div>
                  <KTextTruncator
                    text="The Philosophy of Rick and Morty and the meaning of All life"
                    :maxLines="2"
                  />
                </div>
              </template>
              <template #aboveTitle>
                <div>
                  Rutrum pellentesque utrum...
                </div>
              </template>
              <template #footer>
                <div>
                  <div class="footer-top-header">
                    <span> <KIcon icon="quiz" /> Practice</span>
                    <span>Short Activity</span>
                  </div>
                  <br>
                  <div class="footer-top-header">
                    <span>
                      <progress class="" value="50" max="100"></progress>
                    </span>
                    <span>
                      <KIcon icon="schedule" class="icon-size" />
                    </span>
                    <span>
                      <KIcon icon="download" class="icon-size" />
                    </span>
                  </div>
                </div>
              </template>
            </KCard>
          </div>
        </DocsShowCode>

        <DocsShow block>
          <div>

            <KCard
              :to="{ name: '/' }"
              :headingLevel="2"
              layout="horizontal"
              thumbnailDisplay="none"
              :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            >
              <template #title>
                <div>
                  <KTextTruncator
                    text="The Philosophy of Rick and Morty and the meaning of All life"
                    :maxLines="2"
                  />
                </div>
              </template>
              <template #aboveTitle>
                <div>
                  Rutrum pellentesque utrum...
                </div>
              </template>
              <template #footer>
                <div>
                  <div class="footer-top-header">
                    <span> <KIcon icon="quiz" /> Practice</span>
                    <span>Short Activity</span>
                  </div>
                  <br>
                  <div class="footer-top-header">
                    <span>
                      <progress class="" value="50" max="100"></progress>
                    </span>
                    <span>
                      <KIcon icon="schedule" class="icon-size" />
                    </span>
                    <span>
                      <KIcon icon="download" class="icon-size" />
                    </span>
                  </div>
                </div>
              </template>
            </KCard>
          </div>
        </DocsShow>

        <h3>
          Vertical
          <DocsInternalLink href="/kcard#prop:layout">
            <code>layout</code>
          </DocsInternalLink> and
          <DocsInternalLink href="/kcard#prop:thumbnailDisplay">
            <code> thumbnailDisplay </code>
          </docsinternallink> small
        </h3>
        <p>
          This layout offers a combined view of content and a thumbnail image. This provides users with both textual information
        </p>

        <DocsShow block>
          <div>
            <KCard
              :to="{ name: '/' }"
              layout="vertical"
              thumbnailDisplay="small"
              :headingLevel="2"
              :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            >
              <template #title>
                <div>
                  Sample text in the title slot
                </div>
              </template>
              <template #aboveTitle>
                <div>
                  This is a sample above title slot text that can cover more that 3 lines
                </div>
              </template>
              <template #footer>
                <div>
                  This is a sample footer section for the kcard
                </div>
              </template>
            </KCard>
          </div>
        </DocsShow>

        <h3>
          Vertical
          <DocsInternalLink href="/kcard#prop:layout">
            <code>layout</code>
          </DocsInternalLink> and
          <DocsInternalLink href="/kcard#prop:thumbnailDisplay">
            <code> thumbnailDisplay</code>
          </docsinternallink> large
        </h3>

        <DocsShow block>
          <div>
            <KCard
              :to="{ name: '/' }"
              layout="vertical"
              thumbnailDisplay="large"
              :headingLevel="2"
              :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            >
              <template #title>
                <div>
                  Kolibri video tutorials to understand the Learner, Coach, and Admin features.
                </div>
              </template>
              <template #aboveTitle>
                <div>
                  This is a sample above title slot text that can cover more that 3 lines
                </div>
              </template>
              <template #footer>
                <div>
                  This is a sample footer section for the kcard
                </div>
              </template>
            </KCard>
          </div>
        </DocsShow>
        <h3>
          Horizontal Layout
        </h3>
        <p>
          It's important to note that besides the mandatory   <DocsInternalLink href="/kcard#prop:title">
            <code>title</code>
          </DocsInternalLink> prop/slot, all other slots are optional.
          This flexibility allows for creating diverse layouts by combining different options for the <DocsInternalLink href="/KCard#prop:layout">
            <code>layout</code>
          </DocsInternalLink>
          and
          <DocsInternalLink href="/kcard#prop:thumbnailDisplay">
            <code> thumbnailDisplay</code>
          </DocsInternalLink>  properties. Additionally, the order of slots is not strictly enforced. For instance,
          the  <DocsInternalLink href="/kcard#slot:title">
            <code>title</code>
          </DocsInternalLink>
          slot can take the position of the
          <DocsInternalLink href="/kcard#slot:aboveTitle">
            <code>aboveTitle</code>
          </DocsInternallink>
          slot if the latter is not used.
        </p>
        <p>
          The thumbnail's appearance depends on two factors: the size of the original image and the chosen
          <DocsInternalLink href="/KImg#prop:thumnailcaletype">
            <code>
              thumbnailScaleType
            </code>
          </DocsInternalLink>
          property.  This property controls how the image is scaled to fit the designated thumbnail area.
          The available scaling options are the same as those offered by the KImg component's scaleTypes property.
        </p>
        Here are a few examples...

        <p>
          Horizontal
          <DocsInternalLink href="/kcard#prop:layout">
            <code> layout</code>
          </DocsInternalLink> and
          <DocsInternalLink href="/kcard#prop:thumbnailDisplay">
            <code> thumbnailDisplay </code>
          </docsinternallink> large
        </p>
        <p>
          in the event where <DocsInternalLink href="/kcard#prop:thumbnailDisplay">
            <code> thumbnailDisplay</code>
          </DocsInternalLink> and  <DocsInternalLink href="/KImg#prop:thumnailcaletype">
            <code>
              thumbnailScaleType
            </code>
          </DocsInternalLink> is not provided we will end something like this
        </p>
        <DocsShowCode language="html">
          <div>
            <KCard
              :to="{ name: '/' }"
              :headingLevel="2"
              layout="horizontal"
              thumbnailDisplay="large"
              :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            >
              <template #title>
                <div>
                  Sample text in the title slot
                </div>
              </template>
              <template #aboveTitle>
                <div>
                  This is a sample above title slot text that can cover more that 3 lines
                </div>
              </template>
              <template #belowTitle>
                <div>
                  This is a sample below title slot text that can cover more that 3 lines
                </div>
              </template>
              <template #footer>
                <div>
                  This is a sample footer section for the kcard
                </div>
              </template>
            </KCard>
          </div>
        </DocsShowCode>
        <h3>
          if the layout is Horizontal
          <DocsInternalLink href="/kcard#prop:layout">
            <code>layout</code>
          </DocsInternalLink> and
          <DocsInternalLink href="/kcard#prop:thumbnailDisplay">
            <code> thumbnailDisplay</code>
          </docsinternallink> is set to large
        </h3>
        <DocsShow block>
          <div>
            <KCard
              :to="{ name: '/' }"
              :headingLevel="2"
              layout="horizontal"
              thumbnailDisplay="large"
              :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            >
              <template #title>
                <div>
                  Sample text in the title slot
                </div>
              </template>
              <template #aboveTitle>
                <div>
                  This is a sample above title slot text that can cover more that 3 lines
                </div>
              </template>
              <template #footer>
                <div>
                  This is a sample footer section for the kcard
                </div>
              </template>
            </KCard>
          </div>
        </DocsShow>

        <h3>
          Thumbnail Display Options
        </h3>
        <p>
          KCard provides options for displaying thumbnails alongside content. The  <DocsInternalLink href="/kcard#prop:thumbnailDisplay">
            <code>thumbnailDisplay</code>
          </DocsInternalLink> prop controls whether a thumbnail is shown or hidden.
        </p>

        <p>
          The thumbnail's display options depends on two factors: the size of the original image and the chosen   <DocsInternalLink href="/kcard#prop:thumbnailScaleType">
            <code>thumbnailScaleType </code>
          </DocsInternalLink> prop. This property controls how the image is scaled to fit the designated thumbnail area. The available scaling options are the same as those offered by the KImg component's scaleTypes property
        </p>


        <!-- 
        <h3>
          Thumbnail Display
          <DocsInternalLink href="/kcard#prop:layout">
            <code>layout</code>
          </DocsInternalLink> and no
          <DocsInternalLink href="/kcard#prop:thumbnailDisplay">
            <code> thumbnailDisplay</code>
          </docsinternallink> is set
        </h3>
        <DocsShow block>
          <div>
            <KCard
              :to="{ name: '/' }"
              :headingLevel="2"
              title="How to get started with Kolibri"
              layout="horizontal"
              thumbnailDisplay="none"
            >
              <template #aboveTitle>
                <div>
                  This is a sample above title slot text that can cover more that 3 lines
                </div>
              </template>
              <template #footer>
                <div>
                  This is a sample footer section for the kcard
                </div>
              </template>
            </KCard>
          </div>
        </DocsShow>

        <h3>
          Horizontal
          <DocsInternalLink href="/kcard#prop:layout">
            <code>layout</code>
          </DocsInternalLink> and
          <DocsInternalLink href="/kcard#prop:thumbnailDisplay">
            <code> thumbnailDisplay</code>
          </docsinternallink>is set to small
        </h3>
        <DocsShow block>
          <div>
            <KCard
              :to="{ name: '/' }"
              :headingLevel="2"
              title="How to get started with Kolibri"
              layout="horizontal"
              thumbnailDisplay="small"
              :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            >
              <template #aboveTitle>
                <div>
                  This is a sample above title slot text that can cover more that 3 lines
                </div>
              </template>

            </KCard>
          </div>
        </DocsShow>
        </h2>
        </h> -->
      </DocsPageSection>
    </docspagesection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped>

  em {
    font-style: normal;
    font-weight: bold;
  }

</style>
