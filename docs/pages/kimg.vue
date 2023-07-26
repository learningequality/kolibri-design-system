<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>It displays an image and provides additional functionality to manipulate it such as setting dimensions, aspect ratio, scaling, letter boxing, and more.</p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <p>When setting the dimensions of an image by using any of the supported methods, note that the settings are applied to the container of the image, rather than the image itself. Depending on the scale type and other settings, the image may be letterboxed. If you need to apply dimensions directly to the image, you can use <code>'fitXY'</code> scale type. This, and other modes, are illustrated in the examples below, where the original image dimensions are 200×114 px.</p>

      <p>Unless you set fixed dimensions, <code>KImg</code> is responsive by default.</p>

      <h3>Rendering within inline and block elements</h3>

      <h4>Inline</h4>

      <p>When rendered within an inline element, an image preserves its original dimensions.</p>

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

      <p>When rendered within a block element, an image scales to its parent element with the <code>'centerInside'</code> scale type (see below) by default.</p>

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

      <h3>Dimensions</h3>

      <p>You can use the most common dimensions right on the <code>KImg</code> via props like <code>width</code>, <code>maxHeight</code>, etc. See <a href="#props">Props</a> for the full list of available props. Values may be either numbers or strings consisting of a numeral and valid units. The following units are supported: <code>%, cm, em, ex, ch, in, lh, mm, px, rem, rlh, vh, vw</code>. If you don't provide a unit, <code>px</code> will be used by default.</p>

      <DocsShowCode language="html">
        <div>
          <KImg
            src="hummingbird.jpg"
            altText="A sitting hummingbird"
            height="250.2px"
            width="100%"
            maxWidth="10vw"
            :minWidth="25"
          />
        </div>
      </DocsShowCode>

      <h3>Alternative text</h3>

      <p>Unless an image is <DocsExternalLink text="decorative" href="https://www.w3.org/WAI/tutorials/images/decorative/" />, you need to provide alternative text via <code>altText</code>. If it's meant to be decorative, then use <code>isDecorative</code> to indicate it. Then, alternative text won't be required, and the image will be hidden from assistive technologies.</p>

      <DocsShowCode language="html">
        <div>
          <KImg
            src="hummingbird.jpg"
            isDecorative
          />
        </div>
      </DocsShowCode>

      <h3>Scaling</h3>

      <h4><code style="font-weight: bold">'centerInside'</code> scale type</h4>

      <p>Scales an image uniformly and maintains its original aspect ratio so that both its width and height are equal to or less than the container. The image can be letterboxed. It's the safest mode as it never distorts the image.</p>

      <DocsShowCode language="html">
        <div>
          <KImg
            src="hummingbird.jpg"
            altText="A sitting hummingbird"
            height="200px"
            width="100%"
            maxWidth="500px"
            scaleType="centerInside"
          />
        </div>
      </DocsShowCode>
      <DocsShow block>
        <div>
          <KImg
            :src="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            altText="A sitting hummingbird"
            height="200px"
            width="100%"
            maxWidth="500px"
            scaleType="centerInside"
          />
        </div>
      </DocsShow>

      <h4><code style="font-weight: bold">'contain'</code> scale type</h4>

      <p>Behaves like <code>'centerInside'</code> except it ensures that at least one axis of the image fits the container exactly. The original aspect ratio is maintained. The image can be letterboxed. This mode may distort the image by enlarging it above its original size.</p>

      <DocsShowCode language="html">
        <div>
          <KImg
            src="hummingbird.jpg"
            altText="A sitting hummingbird"
            height="200px"
            width="100%"
            maxWidth="500px"
            scaleType="contain"
          />
        </div>
      </DocsShowCode>
      <DocsShow block>
        <div>
          <KImg
            :src="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            altText="A sitting hummingbird"
            height="200px"
            width="100%"
            maxWidth="500px"
            scaleType="contain"
          />
        </div>
      </DocsShow>

      <h4><code style="font-weight: bold">'fitXY'</code> scale type</h4>

      <p>Scales X and Y axis of an image independently, so that the image matches the container exactly. This mode may distort the image as its original aspect ratio is ignored. The image is never letterboxed. It could also distort the image by enlarging it above its original size.</p>

      <DocsShowCode language="html">
        <div>
          <KImg
            src="hummingbird.jpg"
            altText="A sitting hummingbird"
            height="200px"
            width="100%"
            maxWidth="500px"
            scaleType="fitXY"
          />
        </div>
      </DocsShowCode>
      <DocsShow block>
        <div>
          <KImg
            :src="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
            altText="A sitting hummingbird"
            height="200px"
            width="100%"
            maxWidth="500px"
            scaleType="fitXY"
          />
        </div>
      </DocsShow>

      <h3>Aspect ratio</h3>

      <p>You can set aspect ratio via <code>aspectRatio</code> on an image and combine it with any of the scale types.</p>

      <p>Note that ratio styles are based on the width information, therefore it needs to be available in some way. For example, it could be provided directly to <code>KImg</code>, or you could ensure that its parent element has width by setting it explicitly or by using a block element.</p>

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
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
