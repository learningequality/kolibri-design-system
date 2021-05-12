<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Creates a <DocsExternalLink href="https://router.vuejs.org/api/" text="Vue client-side router" /> link. It can take on a number of visual styles, including links:
      </p>
      <DocsShow>
        <p>
          <KRouterLink :to="{}" text="Link" appearance="basic-link" />
        </p>
        <p>
          <KRouterLink :to="{}" text="Link with icon before" appearance="basic-link" icon="person" />
        </p>
      </DocsShow>
      <p>
        and buttons:
      </p>
      <DocsShow>
        <KButtonGroup>
          <KRouterLink :to="{}" text="Primary" :primary="true" appearance="raised-button" />
          <KRouterLink :to="{}" text="Primary flat" :primary="true" appearance="flat-button" />
          <KRouterLink :to="{}" text="Secondary" :primary="false" appearance="raised-button" />
          <KRouterLink :to="{}" text="Secondary flat" :primary="false" appearance="flat-button" />
        </KButtonGroup>
      </DocsShow>
    </DocsPageSection>
    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsInternalLink text="Buttons and links" href="/buttons" /> has an overview and usage guidance
        </li>
        <li><DocsLibraryLink component="KButton" /> and <DocsLibraryLink component="KExternalLink" /> are similar but handle events differently</li>
        <li>
          <DocsLibraryLink component="KIconButton" /> has a tooltip instead of a text label
        </li>
        <li><DocsLibraryLink component="KButtonGroup" /> is used for button layout</li>
      </ul>
    </DocsPageSection>

  </DocsPageTemplate>

</template>
