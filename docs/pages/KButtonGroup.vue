<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        For an overview of buttons and links in Kolibri, see the <DocsInternalLink text="Buttons and links" href="/buttons" /> page.
      </p>
      <p>
        The <code>KButtonGroup</code> component is used to provide consistent, 8px spacing for buttons. For example:
      </p>
      <DocsShow>
        <KButtonGroup>
          <KButton
            text="Button 1"
          />
          <KButton
            text="Button 2"
          />
          <KButton
            text="Primary button"
            primary
          />
        </KButtonGroup>
      </DocsShow>
      <p>
        It is most often used with the <DocsLibraryLink page="KButton" />, <DocsLibraryLink page="KRouterLink" /> and <DocsLibraryLink page="KExternalLink" /> components.
      </p>
    </DocsPageSection>

  </DocsPageTemplate>

</template>
