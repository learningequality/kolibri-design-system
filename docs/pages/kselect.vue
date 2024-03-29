<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <DocsShow>
        <KSelect
          v-model="exampleData"
          :options="options"
          label="Who are you?"
          placeholder="Nobody"
          style="width:300px;"
        />
        <p>Value: {{ exampleData }}</p>
      </DocsShow>
      <p>
        A select dropdown component that allows users to select an item from a range of options.
        The options are specified with a value and a label for that value to display to the user.
        Additionally, the component can take slots to customize the display of each option.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <p>
        Select dropdowns are used alongside form components such as text fields and radio selects. They can also be used to filter options in lists and tables.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Specifications" anchor="#specifications">
      <p>
        Default width:
      </p>
      <ul>
        <li>As a filter for lists and tables: 150px</li>
        <li>In a form: 300px</li>
      </ul>
      <p>Increase or decrease this width to fit appropriately with other components in forms or filter groups.</p>
      <p>The select label should be very short and descriptive. Stick to using one word to describe the field, if possible.</p>
    </DocsPageSection>

    <DocsPageSection title="Guidelines" anchor="#guidelines">
      <p>
        Consider using a select when there are 4 or more options available to select for a field. With fewer options, consider using radios or checkboxes.
      </p>
      <h3>Forms</h3>
      <p>
        Sometimes the same select field is used in forms for different variations of an editable object (e.g. the “completion” field of a PDF document vs a video file). If a select option for a particular variation of an editable object is not applicable or will create a confusing or negative user experience, it should be hidden from the select. If all options will create the same adverse experience, the entire select should be hidden from that form.
      </p>
      <p>
        Hiding is better than disabling in this case because there is no condition where it would benefit the user experience to be selectable for that object.
      </p>
      <h3>Filters</h3>
      <p>For design guidance on using selects for filtering, see the <DocsInternalLink href="/filters" text="Filters page" />.</p>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  export default {
    data() {
      return {
        exampleData: null,
        options: [
          {
            label: 'Somebody',
            value: 'somebody',
          },
          {
            label: 'You used to know me',
            value: 'usedto',
          },
        ],
      };
    },
  };

</script>


<style lang="scss" scoped></style>
