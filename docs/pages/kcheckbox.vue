<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>The checkbox is generally used to select one of two possible values in a form.</p>
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
    </DocsPageSection>

    <DocsPageSection title="Layout" anchor="#layout">
      <ul>
        <li>Aligned with container margin</li>
        <li>When used in a group, vertically stacked</li>
        <li>Hierarchical nesting is avoided</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Guidelines" anchor="#guidelines">
      <ul>
        <li>Labels should be short and concise</li>
        <li>Checkbox should not be used to make real-time changes; for this situation, use a <DocsLibraryLink component="KSwitch" /> component instead</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="States" anchor="#states">
      <p>The checked state represents an affirmative value.</p>
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

    <DocsPageSection title="Example: Label content" anchor="#example-labels">
      Label content can be passed via the <code>label</code> property:

      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="html">
        &lt;KCheckbox label="First lesson" /&gt;
      </DocsShowCode>
      <!-- eslint-enable -->
      <DocsShow>
        <KCheckbox label="First lesson" />
      </DocsShow>

      In more complex situations, for example when another component is responsible for rendering the label, the default slot can be used:

      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="html">
        &lt;KCheckbox&gt;
          &lt;KLabeledIcon icon="lesson" label="First lesson" /&gt;
        &lt;/KCheckbox&gt;
      </DocsShowCode>
      <!-- eslint-enable -->
      <DocsShow>
        <KCheckbox>
          <KLabeledIcon icon="lesson" label="First lesson" />
        </KCheckbox>
      </DocsShow>

      <DocsDoNot>
        <template #not>
          <p>Don't wrap the default slot's content in <code>&lt;label&gt;</code>:</p>
          <!-- eslint-disable -->
          <!-- prevent prettier from changing indentation -->
          <DocsShowCode language="html">
            &lt;KCheckbox&gt;
              &lt;label&gt;
                &lt;KLabeledIcon icon="lesson" label="First lesson" /&gt;
              &lt;/label&gt;
            &lt;/KCheckbox&gt;
          </DocsShowCode>
          <!-- eslint-enable -->

          <p>That would cause two nested <code>&lt;label&gt;</code> elements to be rendered as <code>KCheckbox</code> takes care of it already.</p>
        </template>
      </DocsDoNot>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
