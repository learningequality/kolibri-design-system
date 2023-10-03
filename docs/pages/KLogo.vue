<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <div>
        Use <DocsLibraryLink component="KLogo" /> component where the kolibri Logo is needed.

        <h3>Sample implementations of <DocsLibraryLink component="KLogo" /> including props:</h3>

        <div>
          Dimensions may be either numbers or strings consisting of a numeral and valid units (e.g. <code>px</code>,
          <code>em</code>, <code>vh</code>).
        </div>

        <div class="img-example-1">
          <DocsShow>
            <KLogo
              altText="KolibriLogo"
              :height="'250.2px'"
              :width="225.5"
              :maxHeight="600"
              :minWidth="25"
            />
          </DocsShow>
          <DocsShowCode language="html">
            <KLogo
              altText="KolibriLogo"
              :height="'250.2px'"
              :width="225.5"
            />
          </DocsShowCode>
        </div>
      </div>

      <div class="img-example-2">
        <DocsLibraryLink component="KLogo" /> requires alternative text that describes the image unless
        <code>isDecorative</code> is <code>true</code>. In that case, any alt text provided will be overwritten to an
        empty string.
        <div>
          <div>
            <DocsShow>
              <KLogo
                isDecorative
                :height="50"
                :width="50"
              />
            </DocsShow>
          </div>
          <DocsShowCode language="html">
            <KLogo
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
          <KLogo
            altText="KolibriLogo"
          />
        </DocsShow>
        <DocsShowCode language="html">
          <KLogo
            altText="KolibriLogo"
          />
        </DocsShowCode>

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
  
  
  
  
  
  