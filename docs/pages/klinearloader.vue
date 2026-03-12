<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>Linear loaders illustrate progress by moving an indicator along a horizontal track.</p>

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
          loadExample="KLinearLoader/Determinate.vue"
          exampleId="klinearloader-determinate"
        >
          <template #html>
            <DocsShowCode language="html">
              <KLinearLoader
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
          loadExample="KLinearLoader/Indeterminate.vue"
          exampleId="klinearloader-indeterminate"
        >
          <template #html>
            <DocsShowCode language="html">
              <KLinearLoader type="indeterminate" />
            </DocsShowCode>
          </template>
        </DocsExample>
      </section>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
