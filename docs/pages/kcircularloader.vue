<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>Circular loaders illustrate progress by moving an indicator along a circular track.</p>

      <p>
        See the
        <DocsInternalLink
          href="/loaders"
          text="loaders page"
        />
        for more information and guidelines.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <section>
        <h3>
          Determinate
          <DocsAnchorTarget anchor="#determinate" />
        </h3>

        <DocsExample
          loadExample="KCircularLoader/Determinate.vue"
          exampleId="kcircularloader-determinate"
        >
          <template #html>
            <DocsShowCode language="html">
              <KCircularLoader
                type="determinate"
                :progress="75"
              />
            </DocsShowCode>
          </template>
        </DocsExample>
      </section>

      <section>
        <h3>
          Indeterminate
          <DocsAnchorTarget anchor="#indeterminate" />
        </h3>

        <DocsExample
          loadExample="KCircularLoader/Indeterminate.vue"
          exampleId="kcircularloader-indeterminate"
        >
          <template #html>
            <DocsShowCode language="html">
              <KCircularLoader type="indeterminate" />
            </DocsShowCode>
          </template>
        </DocsExample>
      </section>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
