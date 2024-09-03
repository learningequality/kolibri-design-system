<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>The checkbox is generally used to select one of two possible values in a form.</p>
      <DocsShow>
        <KCheckbox
          label="Some label"
          :checked="checked1"
          @change="checked1 = !checked1"
        />
        <KCheckbox
          label="Another label"
          :checked="checked2"
          @change="checked2 = !checked2"
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
          :indeterminate="indeterminate3"
          :checked="checked3"
          @change="handle3"
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
        <KCheckbox label="First lesson" />
      </DocsShowCode>
      <!-- eslint-enable -->
      <DocsShow>
        <KCheckbox label="First lesson" :checked="checked4" @change="checked4 = !checked4" />
      </DocsShow>

      In more complex situations, for example when another component is responsible for rendering the label, the default slot can be used:

      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="html">
        <KCheckbox>
          <KLabeledIcon icon="lesson" label="First lesson" />
        </KCheckbox>
      </DocsShowCode>
      <!-- eslint-enable -->
      <DocsShow>
        <KCheckbox :checked="checked5" @change="checked5 = !checked5">
          <KLabeledIcon icon="lesson" label="First lesson" />
        </KCheckbox>
      </DocsShow>

      <DocsDoNot>
        <template #not>
          <p>Don't wrap the default slot's content in <code>&lt;label&gt;</code>:</p>
          <!-- eslint-disable -->
          <!-- prevent prettier from changing indentation -->
          <DocsShowCode language="html">
            <KCheckbox>
              <label>
                <KLabeledIcon icon="lesson" label="First lesson"></KLabeledIcon>
              </label>
            </KCheckbox>
          </DocsShowCode>
          <!-- eslint-enable -->

          <p>That would cause two nested <code>&lt;label&gt;</code> elements to be rendered as <code>KCheckbox</code> takes care of it already.</p>
        </template>
      </DocsDoNot>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {
    data() {
      return {
        checked1: true,
        checked2: false,
        checked3: false,
        indeterminate3: true,
        checked4: false,
        checked5: false,
      };
    },
    methods: {
      handle3() {
        this.checked3 = !this.checked3;
        this.indeterminate3 = false;
      },
    },
  };

</script>
