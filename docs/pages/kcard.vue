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

      <h3>Vertical layout</h3>
      <p>
        Vertical
        <DocsInternalLink href="/KCard#prop:layout">
          <code>layout</code>
        </DocsInternalLink> and no
        <DocsInternalLink href="/KCard#prop:thumbnailDisplay">
          <code> thumbnailDisplay</code>
        </docsinternallink> solely consists of content without any accompanying thumbnail image. This layout is suitable when visual representation is not necessary or when the content itself is sufficiently descriptive or engaging without the need for an image.
      </p>
      <DocsShowCode language="html">
        <div>
          <KCard
            :to="{ name: '/' }"
            title="how to get started with Kolibri"
            headingLevel="2"
            layout="verticle"
            thumbnailDisplay="none"
          >
            <template #title>
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
            title="How to get started with Kolibri"
            headingLevel="2"
            layout="vertical"
            thumbnailDisplay="none"
          >
            <template #title>
              <div>
                How to get started with Kolibri
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

      <h5>
        Vertical
        <DocsInternalLink href="/KCard#prop:layout">
          <code>layout</code>
        </DocsInternalLink> and 
        <DocsInternalLink href="/KCard#prop:thumbnailDisplay">
          <code> thumbnailDisplay </code> 
        </docsinternallink> small
      </h5>
      <p>
        This layout offers a combined view of content and a thumbnail image. This provides users with both textual information
      </p>

      <DocsShow block>
        <div style="max-width: 300px;">
          <KCard
            :to="{ name: '/' }"
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

      <h5>
        Vertical
        <DocsInternalLink href="/KCard#prop:layout">
          <code>layout</code>
        </DocsInternalLink> and
        <DocsInternalLink href="/KCard#prop:thumbnailDisplay">
          <code> thumbnailDisplay</code> 
        </docsinternallink> large
      </h5>

      <DocsShow block>
        <div style="max-width: 300px;">
          <KCard
            :to="{ name: '/' }"
            layout="vertical"
            thumbnailDisplay="large"
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
        It's important to note that besides the mandatory   <DocsInternalLink href="/KCard#prop:title">
          <code>title</code>
        </DocsInternalLink> prop/slot, all other slots are optional. 
        This flexibility allows for creating diverse layouts by combining different options for the <DocsInternalLink href="/KCard#prop:layout">
          <code>layout</code>
        </DocsInternalLink>
        and
        <DocsInternalLink href="/KCard#prop:thumbnailDisplay">
          <code> thumbnailDisplay</code>
        </DocsInternalLink>  properties. Additionally, the order of slots is not strictly enforced. For instance,
        the  <DocsInternalLink href="/KCard#slot:title">
          <code>title</code>
        </DocsInternalLink> 
        slot can take the position of the 
        <DocsIternalLink href="/KCard#slot:aboveTitle">
          <code>aboveTitle</code>
        </DocsIternalLink> slot if the latter is not used.
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
        <DocsInternalLink href="/KCard#prop:layout">
          <code> layout</code>
        </DocsInternalLink> and 
        <DocsInternalLink href="/KCard#prop:thumbnailDisplay">
          <code> thumbnailDisplay </code>
        </docsinternallink> large
      </p>
      <p>
        in the event where <DocsInternalLink href="/KCard#prop:thumbnailDisplay">
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
            <template #footer>
              <div>
                This is a sample footer section for the kcard
              </div>
            </template>
          </KCard>
        </div>
      </DocsShowCode>
      <p>
        And if the layout is set  Horizontal
        <DocsInternalLink href="/KCard#prop:layout">
          <code>layout</code>
        </DocsInternalLink> and
        <DocsInternalLink href="/KCard#prop:thumbnailDisplay">
          <code> thumbnailDisplay</code> 
        </docsinternallink>is set to small
      </p>
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
      <DocsShow block>
        <div>
          <KCard
            :to="{ name: '/' }"
            :headingLevel="2"
            title="How to get started with Kolibri"
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

      <h4>
        Horizontal
        <DocsInternalLink href="/KCard#prop:layout">
          <code>layout</code>
        </DocsInternalLink> and
        <DocsInternalLink href="/KCard#prop:thumbnailDisplay">
          <code> thumbnailDisplay</code> 
        </docsinternallink>is set to small
      </h4>
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