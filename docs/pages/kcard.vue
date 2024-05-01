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

      <DocsShow>
        <span>
          <KImg
            :src="require('../assets/vertical-layout.png')"
            altText="Vertical layout"
          />
        </span>
      </DocsShow>

      <p>For layout horizontal</p>

      <p>
        layout
        <DocsInternalLink href="#">
          <code>Vertical</code>
        </DocsInternalLink> and thumbnailDisplay

        <DocsInternalLink href="#">
          <code> large</code>
        </docsinternallink>
      </p>
      <DocsShow>
        <span>
          <KImg
            :src="require('../assets/horizontal-layout.png')"
            altText="Horizontal layout"
          />
        </span>
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