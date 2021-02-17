<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        For an overview of buttons and links in Kolibri, see the <DocsInternalLink text="Buttons and links" href="/buttons" /> page.
      </p>
      <p>
        The <code>KRouterLink</code> component creates a <DocsExternalLink href="https://router.vuejs.org/api/#router-link" text="router-link" code /> element and is appropriate for triggering internal Vue router navigation on-click.
      </p>
      <p>
        It can take on a number of visual styles, including buttons:
      </p>
      <DocsShow>
        <p>
          <KButtonGroup style="margin-bottom: 8px;">
            <KRouterLink text="Primary" :primary="true" appearance="raised-button" />
            <KRouterLink text="Secondary" :primary="false" appearance="raised-button" />
          </KButtonGroup>
        </p>
        <p>
          <KButtonGroup>
            <KRouterLink text="Primary" :primary="true" appearance="flat-button" />
            <KRouterLink text="Secondary" :primary="false" appearance="flat-button" />
          </KButtonGroup>
        </p>
      </DocsShow>
      <p>
        and also links:
      </p>
      <DocsShow>
        <p>
          <KRouterLink text="Link" appearance="basic-link" />
        </p>
        <p>
          <KRouterLink text="Link with icon before" appearance="basic-link" icon="person" />
        </p>
      </DocsShow>
      <p>
        See also:
      </p>
      <ul>
        <li><DocsLibraryLink page="KButton" /></li>
        <li><DocsLibraryLink page="KButtonGroup" /></li>
        <li><DocsLibraryLink page="KExternalLink" /></li>
        <li><DocsLibraryLink page="KIconButton" /></li>
      </ul>

    </DocsPageSection>

  </DocsPageTemplate>

</template>
