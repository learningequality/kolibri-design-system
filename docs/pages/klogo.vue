<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>Shows Kolibri logo.</p>

      <DocsShow>
        <KLogo
          altText="Kolibri Logo"
          :height="150"
          width="100%"
          :maxWidth="150"
        />
      </DocsShow>
      <DocsShowCode language="html">
        <KLogo
          altText="Kolibri logo"
          :height="150"
          width="100%"
          :maxWidth="150"
        />
      </DocsShowCode>

      <p>Shows Kolibri logo with background.</p>

      <DocsShow>
        <KLogo
          altText="Kolibri Logo with background"
          :showBackground="true"
          :height="150"
          width="100%"
          :maxWidth="150"
        />
      </DocsShow>
      <DocsShowCode language="html">
        <KLogo
          altText="Kolibri Logo with background"
          :showBackground="true"
          :height="150"
          width="100%"
          :maxWidth="150"
        />
      </DocsShowCode>

      <p>Shows Kolibri logo with loading animation.</p>

      <DocsShow>
        <KLogo
          altText="Kolibri Logo with loading animation"
          :animate="true"
          :height="150"
          width="100%"
          :maxWidth="150"
        />
      </DocsShow>
      <DocsShowCode language="html">
        <KLogo
          altText="Kolibri Logo with loading animation"
          :animate="true"
          :height="150"
          width="100%"
          :maxWidth="150"
        />
      </DocsShowCode>
      <p>Different color schemes can be used - but only with the showBackground prop. Note the transparent lines for the monochrome logos.</p>

      <DocsShow>
        <template
          v-for="colorScheme in ['monoBlack', 'monoWhite', 'monoPrimary', 'monoSecondary', 'whiteGrey', 'blackGrey']"
        >
          <p :key="colorScheme">
            Color scheme: {{ colorScheme }}
          </p>
          <KLogo
            :key="colorScheme"
            class="halfsquare-background"
            :colorScheme="colorScheme"
            altText="Kolibri Logo"
            :showBackground="true"
            :height="150"
            width="100%"
            :maxWidth="150"
          />
        </template>
      </DocsShow>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <h3>Alternative text</h3>

      <p>Alternative text (<code>altText</code>) is required for the logo image. When creating it, consider the following:</p>
      <ul>
        <li>If the logo is used as a flat image, you can use the string "Kolibri logo"</li>
        <li>If the the logo is used as a link, then the alternative text needs to give the context where the link is leading (for example "Go to home page", or similar)</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <code>KLogo</code> is derived from <DocsLibraryLink component="KImg" /> and provides a subset of <code>KImg</code>'s API.
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style scoped>

  .halfsquare-background {
    background-size: 10px 10px; /* size of the squares */
    background-image: 
      linear-gradient(45deg, #ffffff 50%, #F5F5F5 50%),
      linear-gradient(45deg, #F5F5F5 50%, #ffffff 50%);
    background-position:
      0 0, /* this is the position of the first pattern */
      5px 5px; /* this position offsets the second pattern to create the checker effect */
    background-repeat: repeat;
  }

</style>