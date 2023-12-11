<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        This is a radio button component:
      </p>
      <DocsShow>
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
        <p>
          Current value: {{ exampleValue }}
        </p>
      </DocsShow>
      <p>
        A radio button is used to make a single selection from a group of options. Radio buttons should be used instead of checkboxes if only one option can be selected.
      </p>
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
        <li>There must always be exactly one radio button selected within a group</li>
        <li>If the user is allowed to not select any of the options, provide a "None" option</li>
        <li>By default, the first radio option is selected, but may be configured to have any option preselected</li>
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
