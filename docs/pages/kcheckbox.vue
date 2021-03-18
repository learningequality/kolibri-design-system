<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>These are checkbox components:</p>
      <DocsShow>
        <KCheckbox
          label="Some label"
          :checked="true"
        />
        <KCheckbox
          label="Another label"
          :checked="false"
        />
      </DocsShow>
      <p>
        The checkbox is generally used to select one of two possible values in a form. It should not be used to make real-time changes; for this situation, use a <DocsLibraryLink component="KSwitch" /> component instead.
      </p>
      <p>Layout:</p>
      <ul>
        <li>Aligned with container margin</li>
        <li>When used in a group, vertically stacked</li>
        <li>Hierarchical nesting is avoided</li>
      </ul>
      <p>Labels:</p>
      <ul>
        <li>Labels should be short and concise</li>
        <li>The checked state should represent an affirmative value</li>
      </ul>
      <p>
        Checkboxes can also have a "partially-checked" or "indeterminate" state used in cases where the value is neither true nor false, such as when a subset of a topic is selected:
      </p>
      <DocsShow>
        <KCheckbox
          label="Topic is selected"
          :indeterminate="true"
        />
      </DocsShow>
      <p>
        A user cannot enter the indeterminate state by interacting directly with the checkbox; it only occurs due to external interactions.
      </p>
    </DocsPageSection>

  </DocsPageTemplate>

</template>
