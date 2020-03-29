<template>

  <PageTemplate>

    <PageSection title="Overview" anchor="#overview">
      <p>These are checkbox components:</p>
      <Show>
        <KCheckbox
          label="Some label"
          :checked="true"
        />
        <KCheckbox
          label="Another label"
          :checked="false"
        />
      </Show>
      <p>
        The checkbox is generally used to select one of two possible values in a form. It should not be used to make real-time changes; for this situation, use a <code>KSwitch</code> component instead.
      </p>
      <p>Layout:</p>
      <ul>
        <li>Always left-aligned</li>
        <li>When used in a group, always vertically stacked</li>
        <li>Avoid hierarchical nesting</li>
      </ul>
      <p>Labels:</p>
      <ul>
        <li>Labels should be short and concise</li>
        <li>The checked state should represent an affirmative value</li>
      </ul>
      <p>
        Checkboxes can also have a "partially-checked" or "indeterminate" state used in cases where the value is neither true nor false, such as when a subset of a topic is selected:
      </p>
      <Show>
        <KCheckbox
          label="Topic is selected"
          :indeterminate="true"
        />
      </Show>
      <p>
        A user cannot enter the indeterminate state by interacting directly with the checkbox; it only occurs due to external interactions.
      </p>
    </PageSection>

    <PageSection title="Usage" anchor="#usage" fullwidth>
      Hello
    </PageSection>

  </PageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
