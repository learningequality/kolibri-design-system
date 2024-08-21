<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>A radio button is used to make a single selection from a group of options. Radio buttons should be used instead of checkboxes if only one option can be selected.</p>

      <p><code>KRadioButton</code>'s are always be wrapped in <DocsLibraryLink component="KRadioButtonGroup" />.</p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <DocsShowCode lang="html">
        <KRadioButtonGroup>
          <KRadioButton
            v-model="exampleValue"
            label="Option A"
            value="val-a"
          />
          <KRadioButton
            v-model="exampleValue"
            label="Option B"
            value="val-b"
          />
          <KRadioButton
            v-model="exampleValue"
            label="Option C"
            description="This one is special!"
            buttonValue="val-c"
          />
          <KRadioButton
            v-model="exampleValue"
            label="Truncated label. Adjusting your browser window size to see this in action."
            buttonValue="val-d"
            truncateLabel
          />
        </KRadioButtonGroup>
      </DocsShowCode>

      <DocsShow>
        <KRadioButtonGroup>
          <KRadioButton
            v-model="exampleValue"
            label="Option A"
            value="val-a"
          />
          <KRadioButton
            v-model="exampleValue"
            label="Option B"
            value="val-b"
          />
          <KRadioButton
            v-model="exampleValue"
            label="Option C"
            description="This one is special!"
            buttonValue="val-c"
          />
          <KRadioButton
            v-model="exampleValue"
            label="Truncated label. Adjusting your browser window size to see this in action."
            buttonValue="val-d"
            truncateLabel
          />
        </KRadioButtonGroup>
        <p>
          Current value: {{ exampleValue }}
        </p>
      </DocsShow>

      </docsshowcode>
    </DocsPageSection>

    <DocsPageSection title="Layout" anchor="#layout">
      <ul>
        <li>Align with container margin</li>
        <li>Stack vertically in lists</li>
        <li>
          Avoid nesting radio buttons
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Label" anchor="#label">
      <ul>
        <li>Labels should be short and concise</li>
        <li>Labels should be positioned above the radio button group</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Guidelines" anchor="#guidelines">
      <ul>
        <li>Always wrap <code>KRadioButton</code> group in <DocsLibraryLink component="KRadioButtonGroup" /></li>
        <li>There must always be exactly one radio button selected within a group</li>
        <li>If the user is allowed to not select any of the options, provide a "None" option</li>
        <li>By default, the first radio option is selected, but may be configured to have any option preselected</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsLibraryLink component="KRadioButtonGroup" /> ensures <code>KRadioButton</code> groups are accessible in all supported browsers.
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {
    data() {
      return {
        exampleValue: 'val-b',
      };
    },
  };

</script>


<style lang="scss" scoped></style>
