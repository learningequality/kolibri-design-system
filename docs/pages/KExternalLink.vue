<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        For an overview of buttons and links in Kolibri, see the <DocsInternalLink text="Buttons and links" href="/buttons" /> page.
      </p>
      <p>
        The <code>KExternalLink</code> component creates an <code>&lt;a&gt;</code> tag and is appropriate for links that use server-side routing.
      </p>
      <p>
        It can take on a number of visual styles, including buttons:
      </p>
      <DocsShow>
        <p>
          <KButtonGroup style="margin-bottom: 8px;">
            <KExternalLink text="Primary" :primary="true" appearance="raised-button" />
            <KExternalLink text="Secondary" :primary="false" appearance="raised-button" />
          </KButtonGroup>
        </p>
        <p>
          <KButtonGroup>
            <KExternalLink text="Primary" :primary="true" appearance="flat-button" />
            <KExternalLink text="Secondary" :primary="false" appearance="flat-button" />
          </KButtonGroup>
        </p>
      </DocsShow>
      <p>
        and also links:
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
        See also:
      </p>
      <ul>
        <li><DocsLibraryLink page="KButton" /></li>
        <li><DocsLibraryLink page="KButtonGroup" /></li>
        <li><DocsLibraryLink page="KIconButton" /></li>
        <li><DocsLibraryLink page="KRouterLink" /></li>
      </ul>

    </DocsPageSection>

  </DocsPageTemplate>

</template>
