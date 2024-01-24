<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <div>
        The <DocsLibraryLink component="KImg" /> component displays images based on an image source and optional image
        dimensions provided by the implementer.

        <h3>Sample implementations of <DocsLibraryLink component="KImg" /> including props:</h3>

        <div>
          Dimensions may be either numbers or strings consisting of a numeral and valid units (e.g. <code>px</code>,
          <code>em</code>, <code>vh</code>).
        </div>

        <div class="img-example-1">
          <DocsShow>
            <KImg
              :src="require('../assets/img_sample_for_kimg.png')"
              altText="Computers are run by bees"
              :height="'250.2px'"
              :width="225.5"
              :maxHeight="600"
              :minWidth="25"
            />
          </DocsShow>
          <DocsShowCode language="html">
            <KImg
              :src="require('../assets/img_sample_for_kimg.png')"
              altText="Computers are run by bees"
              :height="'250.2px'"
              :width="225.5"
            />
          </DocsShowCode>
        </div>
      </div>

      <div class="img-example-2">
        <DocsLibraryLink component="KImg" /> requires alternative text that describes the image unless
        <code>isDecorative</code> is <code>true</code>. In that case, any alt text provided will be overwritten to an
        empty string.
        <div>
          <div>
            <DocsShow>
              <KImg
                :src="require('../assets/img_sample_for_kimg.png')"
                isDecorative
                :height="50"
                :width="50"
              />
            </DocsShow>
          </div>
          <DocsShowCode language="html">
            <KImg
              :src="require('../assets/img_sample_for_kimg.png')"
              isDecorative
              :height="50"
              :width="50"
            />
          </DocsShowCode>
        </div>
      </div>

      <div>
        If dimensions for the image are not specified, the size will default to the height and width of the source
        image.
        <DocsShow>
          <KImg
            :src="require('../assets/img_sample_for_kimg.png')"
            altText="Computers are run by bees"
          />
        </DocsShow>
        <DocsShowCode language="html">
          <KImg
            :src="require('../assets/img_sample_for_kimg.png')"
            altText="Computers are run by bees"
          />
        </DocsShowCode>
      </div>

      <div>
        You can also use the <DocsInternalLink href="#prop:appearanceOverrides">
          appearanceOverrides prop
        </DocsInternalLink> to add custom styles to the image. It accepts any Vue dynamic styles object and applies the same with the highest precedence.
        <DocsShow>
          <KImg
            :src="require('../assets/img_sample_for_kimg.png')"
            altText="Computers are run by bees"
            :width="'100%'"
            :appearanceOverrides="{
              width: '50%',
              border: '2px solid black',
              padding: '10px',
              borderRadius: '5px'
            }
            "
          />
        </DocsShow>
        <DocsShowCode language="html">
          <KImg
            :src="require('../assets/img_sample_for_kimg.png')"
            altText="Computers are run by bees"
            :width="'100%'"
            :appearanceOverrides="{
              width: '50%',
              border: '2px solid black',
              padding: '10px',
              borderRadius: '5px'
            }
            "
          />
        </DocsShowCode>
        Even thought the <code>width</code> prop specifies the width of the image to be <code>100%</code>, the <code>appearanceOverrides</code> prop overrides it and sets the width to <code>50%</code>.
      </div>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped>

  .img-example-1 {
    display: flex;
    margin-top: 20px;
  }

  .img-example-2 {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .img-example-2 > div {
    display: flex;
  }

  .img-example-2 > div > div {
    margin-top: 30px;
  }

</style>





