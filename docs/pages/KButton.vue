<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Creates a <code>&lt;button&gt;</code> tag and is appropriate for triggering javascript functions on-click.
      </p>
      <p>
        It can take on a number of visual styles, including buttons:
      </p>
      <DocsShow>
        <KButtonGroup>
          <KButton text="Primary" :primary="true" appearance="raised-button" />
          <KButton text="Primary flat" :primary="true" appearance="flat-button" />
          <KButton text="Secondary" :primary="false" appearance="raised-button" />
          <KButton text="Secondary flat" :primary="false" appearance="flat-button" />
        </KButtonGroup>
      </DocsShow>
      <p>
        and links:
      </p>
      <DocsShow>
        <p>
          <KButton text="Link" appearance="basic-link" />
        </p>
        <p>
          <KButton text="Link with icon before" appearance="basic-link" icon="person" />
        </p>
      </DocsShow>
    </DocsPageSection>
    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsInternalLink text="Buttons and links" href="/buttons" /> has an overview and usage guidance
        </li>
        <li><DocsLibraryLink page="KExternalLink" /> and <DocsLibraryLink page="KRouterLink" /> are similar but handle events differently</li>
        <li><DocsLibraryLink page="KIconButton" /> has a tooltip instead of a text label</li>
        <li><DocsLibraryLink page="KButtonGroup" /> is used for button layout</li>
      </ul>
    </DocsPageSection>

  </DocsPageTemplate>

</template>
