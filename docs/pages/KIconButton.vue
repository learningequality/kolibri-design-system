<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Use <DocsLibraryLink page="KIconButton" /> in situations where larger buttons with visible text would hinder the user experience. Use the flat secondary style unless the action should be highlighted.
      </p>
      <p>
        A tooltip with the name of the action is required for an icon button.
      </p>
      <DocsShow>
        <KButtonGroup>
          <KIconButton tooltip="Add" icon="plus" :primary="true" appearance="raised-button" />
          <KIconButton tooltip="Subtract" icon="minus" :primary="false" appearance="raised-button" />
          <KIconButton tooltip="Add" text="Flat button" :primary="true" icon="plus" appearance="flat-button" />
          <KIconButton tooltip="Subtract" text="Flat button" :primary="false" icon="minus" appearance="flat-button" />
        </KButtonGroup>
      </DocsShow>
    </DocsPageSection>
    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsInternalLink text="Buttons and links" href="/buttons" /> has an overview and usage guidance
        </li>
        <li><DocsLibraryLink page="KButton" />, <DocsLibraryLink page="KExternalLink" />, and <DocsLibraryLink page="KRouterLink" /> are all similar but handle events differently</li>
        <li><DocsLibraryLink page="KButtonGroup" /> is used for button layout</li>
      </ul>
    </DocsPageSection>

  </DocsPageTemplate>

</template>
