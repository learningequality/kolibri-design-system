<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p><code>KImg</code> displays an image and provides functionality to manipulate it such as setting its dimensions, aspect ratio, scaling, letterboxing, and more.</p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <p>Unless you set fixed dimensions, <code>KImg</code> is responsive by default.</p>

      <p>
        <em>Note that the majority of settings are applied to the image container rather than the image itself.</em> If you need to apply dimensions, aspect ratio, etc. directly to the image, you can use <code>'fitXY'</code> <DocsInternalLink href="/kimg#prop:scaleType">
          scale type
        </DocsInternalLink>.
      </p>

      <p>
        Depending on the scale type and other settings, the image may be letterboxed. When an image is letterboxed, <DocsInternalLink href="/kimg#prop:backgroundColor">
          <code>backgroundColor</code>
        </DocsInternalLink> (gray by default) fills the remaining space.
      </p>

      <p>This is in more detail illustrated in the examples below, where the original image dimensions are 200×114 px.</p>

      <h3>Rendering within inline and block elements</h3>

      <h4>Inline</h4>

      <p>When rendered within an inline element, the image preserves its original dimensions by default.</p>

      <DocsShowCode language="html">
        <span>
          <KImg
            src="hummingbird.jpg"
            altText="A sitting hummingbird"
          />
        </span>
      </DocsShowCode>
      <DocsShow>
        <span>
          <KImg
            :src="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            altText="A sitting hummingbird"
          />
        </span>
      </DocsShow>


      <h4>Block</h4>

      <p>
        When rendered within a block element, the image container fills the parent block element and the image scales with the <code>'centerInside'</code> <DocsInternalLink href="/kimg#prop:scaleType">
          scale type
        </DocsInternalLink> by default.
      </p>

      <DocsShowCode language="html">
        <div>
          <KImg
            src="hummingbird.jpg"
            altText="A sitting hummingbird"
          />
        </div>
      </DocsShowCode>
      <DocsShow block>
        <div>
          <KImg
            :src="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            altText="A sitting hummingbird"
          />
        </div>
      </DocsShow>

      <h3>Alternative text</h3>

      <p>
        Unless an image is <DocsExternalLink text="decorative" href="https://www.w3.org/WAI/tutorials/images/decorative/" />, you need to provide alternative text via <DocsInternalLink href="/kimg#prop:altText">
          <code>altText</code>
        </DocsInternalLink>.
      </p>

      <DocsShowCode language="html">
        <KImg
          src="hummingbird.jpg"
          altText="A sitting hummingbird"
        />
      </DocsShowCode>

      <p>
        If it's meant to be decorative, indicate it by using <DocsInternalLink href="/kimg#prop:isDecorative">
          <code>isDecorative</code>
        </DocsInternalLink>. Alternative text won't be required in this case and the image will be hidden from assistive technologies.
      </p>

      <DocsShowCode language="html">
        <KImg
          src="hummingbird.jpg"
          isDecorative
        />
      </DocsShowCode>

      <h3>Scaling</h3>

      <p>
        The <DocsInternalLink href="/kimg#prop:scaleType">
          scale type
        </DocsInternalLink> determines how an image scales within the image container.
      </p>

      <h4><code style="font-weight: bold">'centerInside'</code> scale type</h4>

      <p>Scales an image uniformly and maintains its original aspect ratio. Both its width and height are equal to or less than the width and height of the image container. An image can be letterboxed. It's the safest mode as it <em>never distorts an image or impairs its quality.</em></p>

      <DocsShowCode language="html">
        <div>
          <KImg
            src="hummingbird.jpg"
            altText="A sitting hummingbird"
            scaleType="centerInside"
            :style="{ height: '200px', width: '100%', maxWidth: '500px' }"
          />
        </div>
      </DocsShowCode>
      <DocsShow block>
        <div>
          <KImg
            altText="A sitting hummingbird"
            scaleType="centerInside"
            :src="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            :style="{ height: '200px', width: '100%', maxWidth: '500px' }"
          />
        </div>
      </DocsShow>

      <h4><code style="font-weight: bold">'contain'</code> scale type</h4>

      <p>Behaves similarly to <code>'centerInside'</code> except it ensures that at least one axis of an image fits the image container exactly. The original aspect ratio is maintained. An image can be letterboxed. This mode <em>may impair an image's quality by enlarging it above its original size</em>.</p>

      <DocsShowCode language="html">
        <div>
          <KImg
            src="hummingbird.jpg"
            altText="A sitting hummingbird"
            scaleType="contain"
            :style="{ height: '200px', width: '100%', maxWidth: '500px' }"
          />
        </div>
      </DocsShowCode>
      <DocsShow block>
        <div>
          <KImg
            altText="A sitting hummingbird"
            scaleType="contain"
            :src="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            :style="{ height: '200px', width: '100%', maxWidth: '500px' }"
          />
        </div>
      </DocsShow>

      <h4><code style="font-weight: bold">'fitXY'</code> scale type</h4>

      <p>Scales X and Y axis of an image independently, so that the image matches the container exactly. An image is never letterboxed. This mode <em>may impair an image's quality by enlarging it above its original size, or distort its aspect ratio.</em></p>

      <DocsShowCode language="html">
        <div>
          <KImg
            src="hummingbird.jpg"
            altText="A sitting hummingbird"
            scaleType="fitXY"
            :style="{ height: '200px', width: '100%', maxWidth: '500px' }"
          />
        </div>
      </DocsShowCode>
      <DocsShow block>
        <div>
          <KImg
            altText="A sitting hummingbird"
            scaleType="fitXY"
            :src="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            :style="{ height: '200px', width: '100%', maxWidth: '500px' }"
          />
        </div>
      </DocsShow>

      <h3>Aspect ratio</h3>

      <p>
        You can set the aspect ratio of the image container with 
        <DocsInternalLink href="/kimg#prop:aspectRatio">
          <code>aspectRatio</code>
        </DocsInternalLink> and combine it with any of the scale types.
      </p>

      <p>Note that the ratio styles calculations need to have the width information, therefore it needs to be available in some way. For example, you can set the width directly on <code>KImg</code>. Alternatively, you could ensure that <code>KImg</code>'s parent element has width by setting it explicitly or by using a block element.</p>

      <DocsShowCode language="html">
        <div>
          <KImg
            src="hummingbird.jpg"
            altText="A sitting hummingbird"
            aspectRatio="4:3"
          />
        </div>
      </DocsShowCode>
      <DocsShow block>
        <div>
          <KImg
            :src="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            altText="A sitting hummingbird"
            aspectRatio="4:3"
          />
        </div>
      </DocsShow>

      <h3>Placeholder area</h3>

      <p>
        The placeholder area is displayed when an image is not available. The area respects the dimensions set on the image container and is gray by default. You can change the area color via <DocsInternalLink href="/kimg#prop:backgroundColor">
          <code>backgroundColor</code>
        </DocsInternalLink> and use the <DocsInternalLink href="/kimg#slot:placeholder">
          <code>#placeholder</code>
        </DocsInternalLink>
        slot to place content in the area.
      </p>

      <DocsShowCode language="html">
        <div>
          <KImg
            src=""
            isDecorative
            aspectRatio="16:9"
            :style="{ maxWidth: '200px' }"
          >
            <template #placeholder>
              <span :style="{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }">
                <KIcon icon="readSolid" />
              </span>
            </template>
          </KImg>
        </div>
      </DocsShowCode>
      <DocsShow block>
        <div>
          <KImg
            src=""
            isDecorative
            aspectRatio="16:9"
            :style="{ maxWidth: '200px' }"
          >
            <template #placeholder>
              <span :style="{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }">
                <KIcon icon="readSolid" />
              </span>
            </template>
          </KImg>
        </div>
      </DocsShow>

      <h3>Displaying content on top of an image</h3>

      <p>
        Use <DocsInternalLink href="/kimg#slot:topLeft">
          <code>#topLeft</code>
        </DocsInternalLink>, <DocsInternalLink href="/kimg#slot:topRight">
          <code>#topRight</code>
        </DocsInternalLink>, <DocsInternalLink href="/kimg#slot:bottomLeft">
          <code>#bottomLeft</code>
        </DocsInternalLink>, or <DocsInternalLink href="/kimg#slot:bottomRight">
          <code>#bottomRight</code>
        </DocsInternalLink> slots to place content on top of the image container.
      </p>

      <DocsShowCode language="html">
        <KImg
          src="hummingbird.jpg"
          altText="A sitting hummingbird"
        >
          <template #topLeft>
            <span :style="{ display: 'inline-block', margin: '8px', padding: '2px', backgroundColor: 'white' }">
              Top left
            </span>
          </template>
        </KImg>
      </DocsShowCode>
      <DocsShow>
        <KImg
          :src="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
          altText="A sitting hummingbird"
        >
          <template #topLeft>
            <span :style="{ display: 'inline-block', margin: '8px', padding: '2px', backgroundColor: 'white' }">
              Top left
            </span>
          </template>
        </KImg>
      </DocsShow>


    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>
