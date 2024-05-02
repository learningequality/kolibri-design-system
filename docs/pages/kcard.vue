<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        <code>KCard</code>
        provides an accessible component for managing most frequently card content such as thumbnail,layouts and other customization options
      </p>
    </DocsPageSection>


    <DocsPageSection title="Usage" anchor="#usage">
      <p>Use the <code>KCard</code> component to display a card with a title, thumbnail, and other content.</p>

      <h3>Available layouts for card content and thumbnails</h3>
      <p>For layout vertical</p>

      <p>
        <DocsInternalLink href="#">
          <code>Vertical</code>
        </DocsInternalLink> and thumbnailDisplay
        <DocsInternalLink href="#">
          <code> none</code>
        </docsinternallink>
      </p>
      <DocsShowCode language="html">
        <div>
          <KCard
            :to="{ name: '/' }"
            :headingLevel="2"
            title="Sampling title"
            layout="vertical"
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
        <div>
          <KCard
            :to="{ name: '/' }"
            :headingLevel="2"
            title="Sampling title"
            layout="vertical"
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
        <DocsInternalLink href="#">
          <code>Vertical</code>
        </DocsInternalLink> and thumbnailDisplay
        <DocsInternalLink href="#">
          <code> small</code>
        </docsinternallink>
      </p>
      <DocsShowCode language="html">
        <div>
          <KCard
            :to="{ name: '/' }"
            :headingLevel="2"
            title="Sampling title"
            layout="vertical"
            thumbnailDisplay="small"
            thumbnailSrc="../assets/hummingbird CC BY-SA 4.0.jpg"
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
        <div>
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
        <DocsInternalLink href="#">
          <code>Vertical</code>
        </DocsInternalLink> and thumbnailDisplay
        <DocsInternalLink href="#">
          <code> large</code>
        </docsinternallink>
      </p>
      <DocsShowCode language="html">
        <div>
          <KCard
            :to="{ name: '/' }"
            :headingLevel="2"
            title="Sampling title"
            layout="vertical"
            thumbnailDisplay="large"
            thumbnailSrc="../assets/hummingbird CC BY-SA 4.0.jpg"
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




      <p>For layout horizontal</p>
      <p>
        <DocsInternalLink href="#">
          <code>Horizontal</code>
        </DocsInternalLink> and thumbnailDisplay
        <DocsInternalLink href="#">
          <code> none</code>
        </docsinternallink>
      </p>
      <DocsShowCode language="html">
        <span>
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
        </span>
      </DocsShowCode>

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
        <DocsInternalLink href="/kcard#prop:layout">
          <code>Horizontal</code>
        </DocsInternalLink> and thumbnailDisplay
        <DocsInternalLink href="#">
          <code> small</code>
        </docsinternallink>
      </p>
      <DocsShowCode language="html">
        <span>
          <KCard
            :to="{ name: '/' }"
            :headingLevel="2"
            title="Sampling title"
            layout="horizontal"
            thumbnailDisplay="small"
            thumbnailSrc="../assets/hummingbird CC BY-SA 4.0.jpg"
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
        </span>
      </DocsShowCode>

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
        <DocsInternalLink href="/KCard#prop:layout">
          <code>layout</code>
        </DocsInternalLink> Horizontal and
        <DocsInternalLink href="/KCard#prop:thumbnailDisplay">
          <code> thumbnailDisplay </code>
        </docsinternallink>large
      </p>
      <DocsShowCode language="html">
        <span>
          <KCard
            :to="{ name: '/' }"
            :headingLevel="2"
            title="Sampling title"
            layout="horizontal"
            thumbnailDisplay="large"
            thumbnailSrc="../assets/hummingbird CC BY-SA 4.0.jpg"
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
        </span>
      </DocsShowCode>

      <DocsShow block>
        <div>
          <KCard
            :to="{ name: '/' }"
            :headingLevel="2"
            title="Sampling title"
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