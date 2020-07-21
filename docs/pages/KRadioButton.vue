<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        This is a radio button component:
      </p>
      <DocsShow>
        <KRadioButton
          label="Some label"
          :checked="true"
        />
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

  export default {};

</script>


<style lang="scss" scoped></style>
