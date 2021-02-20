<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Creates an <code>&lt;a&gt;</code> tag and is appropriate for links that use server-side routing.
      </p>
      <DocsShow>
        <p>
          <KExternalLink text="Link" appearance="basic-link" />
        </p>
        <p>
          <KExternalLink text="Link with icon before" appearance="basic-link" icon="person" />
        </p>
      </DocsShow>
      <p>
        and buttons:
      </p>
      <DocsShow>
        <KButtonGroup>
          <KExternalLink text="Primary" :primary="true" appearance="raised-button" />
          <KExternalLink text="Primary flat" :primary="true" appearance="flat-button" />
          <KExternalLink text="Secondary" :primary="false" appearance="raised-button" />
          <KExternalLink text="Secondary flat" :primary="false" appearance="flat-button" />
        </KButtonGroup>
      </DocsShow>
    </DocsPageSection>
    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsInternalLink text="Buttons and links" href="/buttons" /> has an overview and usage guidance
        </li>
        <li><DocsLibraryLink page="KButton" /> and <DocsLibraryLink page="KRouterLink" /> are similar but handle events differently</li>
        <li>
          <code>KIconButton</code> has a tooltip instead of a text label
        </li>
        <li><DocsLibraryLink page="KButtonGroup" /> is used for button layout</li>
      </ul>
    </DocsPageSection>

  </DocsPageTemplate>

</template>
