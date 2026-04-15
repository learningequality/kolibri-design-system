<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        KToolbar is a versatile toolbar component designed for app bars and navigation headers in
        Kolibri applications. It provides a consistent structure for displaying titles, navigation
        icons, and action buttons.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <h3>Default</h3>
      <p>
        Out of the box, <code>KToolbar</code> renders with default colors from
        <code>$themeTokens.surface</code> (background) and
        <code>$themeTokens.text</code> (text).
      </p>

      <DocsExample
        loadExample="KToolbar/Default.vue"
        exampleId="ktoolbar-default"
        block
      />

      <h3>Overriding colors</h3>
      <p>
        Override the defaults via the native <code>:style</code> binding on the component.
        The example below uses <code>$themeTokens.appBarDark</code> and
        <code>$themeTokens.textInverted</code> for an inverted palette typical of full-
        screen modal or immersive bars.
      </p>

      <DocsExample
        loadExample="KToolbar/Inverted.vue"
        exampleId="ktoolbar-inverted"
        block
      />

      <h3>Navigation and actions</h3>
      <p>
        The <code>#navigation</code> and <code>#actions</code> slots hold links or menu
        items and action buttons respectively.
      </p>

      <DocsExample
        loadExample="KToolbar/NavigationAndActions.vue"
        exampleId="ktoolbar-navigation-and-actions"
        block
      />

      <h3>Brand area</h3>
      <p>
        The <code>#brand</code> slot accommodates a product mark.
      </p>

      <DocsExample
        loadExample="KToolbar/Brand.vue"
        exampleId="ktoolbar-brand"
        block
      />

      <h3>Not raised</h3>
      <p>
        Pass <code>:raised="false"</code> for an in-page toolbar without a drop shadow.
      </p>

      <DocsExample
        loadExample="KToolbar/NotRaised.vue"
        exampleId="ktoolbar-not-raised"
        block
      />
    </DocsPageSection>
  </DocsPageTemplate>

</template>
