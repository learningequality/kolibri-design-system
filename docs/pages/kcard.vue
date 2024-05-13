<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        <code>KCard</code>
        provides an accessible component for managing most frequently card content such as thumbnail,layouts and other customization options
      </p>
    </DocsPageSection>


    <DocsPageSection title="Usage" anchor="#usage">
      <p> <code>KCard</code>  serves as a base component for creating different card types such as lesson cards, resource cards, and channel cards. You can configure KCard by adding product-specific content and logic to create distinct card components.</p>

      <p>
        KCard supports multiple layouts for card content and thumbnails, offering flexibility in design. The available layouts include:.
      </p>

      <h4>Vertical layout</h4>
      <p>
        Vertical
        <DocsInternalLink href="/KCard#prop:layout">
          <code>layout</code>
        </DocsInternalLink> and no
        <DocsInternalLink href="/KCard#prop:thumbnailDisplay">
          <code> thumbnailDisplay</code>
        </docsinternallink>
      </p>
      <p>
        This <code>Kcard </code> layout solely consists of content without any accompanying thumbnail image. This layout is suitable when visual representation is not necessary or when the content itself is sufficiently descriptive or engaging without the need for an image. it focuses solely on textual or other content elements without the distraction of a thumbnail image.
      </p>
      <DocsShowCode language="html">
        <div>
          <KCard
            :to="{ name: '/' }"
            :headingLevel="2"
            title="Sampling title"
            layout="verticle"
            thumbnailDisplay="none"
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
      </DocsShowCode>

      <DocsShow block>
        <div style="max-width: 300px;">
          <KCard
            :to="{ name: '/' }"
            :headingLevel="2"
            title="Sampling title"
            layout="vertical"
            thumbnailDisplay="small"
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

      <p>
        Vertical
        <DocsInternalLink href="/KCard#prop:layout">
          <code>layout</code>
        </DocsInternalLink> and small
        <DocsInternalLink href="/KCard#prop:thumbnailDisplay">
          <code> thumbnailDisplay </code>
        </docsinternallink>
      </p>
      <DocsShow block>
        <div style="max-width: 300px;">
          <KCard
            :to="{ name: '/' }"
            :headingLevel="2"
            title="Sampling title"
            layout="vertical"
            thumbnailDisplay="small"
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

      <p>
        Vertical
        <DocsInternalLink href="/KCard#prop:layout">
          <code>layout</code>
        </DocsInternalLink> and large
        <DocsInternalLink href="/KCard#prop:thumbnailDisplay">
          <code> thumbnailDisplay</code>
        </docsinternallink>
      </p>

      <DocsShow block>
        <div style="max-width: 300px;">
          <KCard
            :to="{ name: '/' }"
            :headingLevel="2"
            title="Sampling title"
            layout="vertical"
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


      <h4>
        For layout horizontal
      </h4>
      <p>
        Horizontal
        <DocsInternalLink href="/KCard#prop:layout">
          <code> layout</code>
        </DocsInternalLink> and no
        <DocsInternalLink href="/KCard#prop:thumbnailDisplay">
          <code> thumbnailDisplay </code>
        </docsinternallink>
      </p>

      <DocsShow block>
        <div>
          <KCard
            :to="{ name: '/' }"
            :headingLevel="2"
            title="Sampling title"
            layout="horizontal"
            thumbnailDisplay="none"
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

      <p>
        Horizontal
        <DocsInternalLink href="/KCard#prop:layout">
          <code>layout</code>
        </DocsInternalLink> and small
        <DocsInternalLink href="/KCard#prop:thumbnailDisplay">
          <code> thumbnailDisplay</code>
        </docsinternallink>
      </p>
      <DocsShow block>
        <div>
          <KCard
            :to="{ name: '/' }"
            :headingLevel="2"
            title="Sampling title"
            layout="horizontal"
            thumbnailDisplay="small"
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

      <p>
        Horizontal
        <DocsInternalLink href="/KCard#prop:layout">
          <code>layout</code>
        </DocsInternalLink>  and large
        <DocsInternalLink href="/KCard#prop:thumbnailDisplay">
          <code> thumbnailDisplay </code>
        </docsinternallink>
      </p>
      <DocsShow block>
        <div>
          <KCard
            :to="{ name: '/' }"
            :headingLevel="2"
            title="Sampling title"
            layout="vertical"
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
    </DocsPageSection>
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