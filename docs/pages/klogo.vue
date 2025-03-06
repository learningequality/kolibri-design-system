<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        <code>KLogo</code> displays the Kolibri logo and provides functionality to manipulate it
        such as setting its dimensions, color scheme, animation, and background.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <h3>Default display</h3>
      <p>Shows Kolibri logo.</p>

      <DocsShow>
        <KLogo
          ref="defaultLogoNoBackground"
          altText="Kolibri Logo"
          :size="150"
        />
        <div style="display: none; width: 100%; text-align: center">
          <KButton @click="saveSVG('defaultLogoNoBackground')"> Save SVG </KButton>
        </div>
      </DocsShow>
      <DocsShowCode language="html">
        <KLogo
          altText="Kolibri logo"
          :size="150"
        />
      </DocsShowCode>

      <h3>Display with backgrounds</h3>
      <p>Shows Kolibri logo with background.</p>

      <DocsShow>
        <KLogo
          ref="defaultLogoWithBackground"
          altText="Kolibri Logo with background"
          :showBackground="true"
          :size="150"
        />
        <div style="display: none; width: 100%; text-align: center">
          <KButton @click="saveSVG('defaultLogoWithBackground')"> Save SVG </KButton>
        </div>
      </DocsShow>
      <DocsShowCode language="html">
        <KLogo
          altText="Kolibri Logo with background"
          :showBackground="true"
          :size="150"
        />
      </DocsShowCode>

      <p>Shows Kolibri logo with rectangular background.</p>

      <DocsShow>
        <KLogo
          ref="defaultLogoWithRectBackground"
          altText="Kolibri Logo with rectangular background"
          backgroundStyle="rect"
          :showBackground="true"
          :size="150"
        />
        <div style="display: none; width: 100%; text-align: center">
          <KButton @click="saveSVG('defaultLogoWithRectBackground')"> Save SVG </KButton>
        </div>
      </DocsShow>
      <DocsShowCode language="html">
        <KLogo
          altText="Kolibri Logo with rectangular background"
          backgroundStyle="rect"
          :showBackground="true"
          :size="150"
        />
      </DocsShowCode>

      <h3>Display with animation</h3>
      <p>Shows Kolibri logo with loading animation.</p>

      <DocsShow>
        <KLogo
          altText="Kolibri Logo with loading animation"
          :animate="true"
          :size="150"
        />
      </DocsShow>
      <DocsShowCode language="html">
        <KLogo
          altText="Kolibri Logo with loading animation"
          :animate="true"
          :size="150"
        />
      </DocsShowCode>

      <h3>Display with different color schemes</h3>
      <p>
        Different color schemes can be used - but only with the showBackground prop. Note the
        transparent lines for the monochrome logos.
      </p>

      <DocsShow>
        <template
          v-for="colorScheme in [
            'monoBlack',
            'monoWhite',
            'monoPrimary',
            'monoSecondary',
            'whiteGrey',
            'blackGrey',
          ]"
        >
          <p :key="`text${colorScheme}`">Color scheme: {{ colorScheme }}</p>
          <KLogo
            :ref="`${colorScheme}LogoWithBackground`"
            :key="colorScheme"
            class="halfsquare-background"
            :colorScheme="colorScheme"
            altText="Kolibri Logo"
            :showBackground="true"
            :size="150"
          />
          <div
            :key="`button${colorScheme}`"
            style="display: none; width: 100%; text-align: center"
          >
            <KButton @click="saveSVG(`${colorScheme}LogoWithBackground`)"> Save SVG </KButton>
          </div>
        </template>
      </DocsShow>

      <h3>Dimensions</h3>

      <p>
        You can apply the most common dimensions to the image container via the props
        <DocsInternalLink href="/kimg#prop:size">
          <code>size</code>
        </DocsInternalLink>,
        <DocsInternalLink href="/kimg#prop:maxSize">
          <code>maxSize</code>
        </DocsInternalLink>, and
        <DocsInternalLink href="/kimg#prop:minSize">
          <code>minSize</code>
        </DocsInternalLink>. Values may be either numbers or strings consisting of a numeral and a valid unit. The
        following units are supported:
        <code>%, cm, em, ex, ch, in, lh, mm, px, rem, rlh, vh, vw</code>. If you don't provide a
        unit, <code>px</code> will be used by default.
      </p>

      <DocsShowCode language="html">
        <KLogo
          altText="A hummingbird logo"
          size="250px"
          maxSize="10vw"
          :minSize="25"
        />
      </DocsShowCode>

      <h3>Alternative text</h3>

      <p>
        Alternative text (<code>altText</code>) is required for the logo image. When creating it,
        consider the following:
      </p>
      <ul>
        <li>If the logo is used as a flat image, you can use the string "Kolibri logo"</li>
        <li>
          If the the logo is used as a link, then the alternative text needs to give the context
          where the link is leading (for example "Go to home page", or similar)
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  // Note for developers, to utilize the saveSVG method, select all of:
  // style="width: 100%; text-align: center; display: none;"
  // and replace with:
  // style="width: 100%; text-align: center;"
  // we keep this hidden for future usage, but it doesn't need to be here all the time.

  export default {
    methods: {
      saveSVG(refName) {
        const svgElement = this.$refs[refName].$el || this.$refs[refName][0].$el;
        // Get the SVG data as a string
        const svgData = svgElement.outerHTML;
        // Create a Blob from the SVG data
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor (`<a>`) element
        const downloadLink = document.createElement('a');
        // Set the download attribute to the desired file name
        downloadLink.download = `${refName}.svg`;
        // Set the href to the Blob URL
        downloadLink.href = url;
        // Append the anchor to the document
        document.body.appendChild(downloadLink);
        // Programmatically click the anchor to trigger the download
        downloadLink.click();
        // Clean up by revoking the Blob URL and removing the anchor from the document
        URL.revokeObjectURL(url);
        downloadLink.remove();
      },
    },
  };

</script>


<style scoped>

  .halfsquare-background {
    background-image: linear-gradient(45deg, #ffffff 50%, #f5f5f5 50%),
      linear-gradient(45deg, #f5f5f5 50%, #ffffff 50%);
    background-repeat: repeat;
    background-position:
      0 0,
      /* this is the position of the first pattern */ 5px 5px; /* this position offsets the second pattern to create the checker effect */

    background-size: 10px 10px; /* size of the squares */
  }

</style>
