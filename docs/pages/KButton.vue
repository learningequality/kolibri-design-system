<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        For an overview of buttons and links in Kolibri, see the <DocsInternalLink text="Buttons and links" href="/buttons" /> page.
      </p>
      <p>
        The <code>KButton</code> component creates a <code>&lt;button&gt;</code> tag and is appropriate for triggering javascript functions on-click.
      </p>
      <p>
        It can take on a number of visual styles, including buttons:
      </p>
      <DocsShow>
        <KButtonGroup>
          <KButton text="Primary" :primary="true" appearance="raised-button" />
          <KButton text="Secondary" :primary="false" appearance="raised-button" />
          <KButton text="Primary" :primary="true" appearance="flat-button" />
          <KButton text="Secondary" :primary="false" appearance="flat-button" />
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
    <DocsPageSection title="Related components" anchor="#related">
      <ul>
        <li><DocsLibraryLink page="KButtonGroup" /></li>
        <li><DocsLibraryLink page="KExternalLink" /></li>
        <li><DocsLibraryLink page="KIconButton" /></li>
        <li><DocsLibraryLink page="KRouterLink" /></li>
      </ul>
    </DocsPageSection>

  </DocsPageTemplate>

</template>
