<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <DocsShow>
        <KSelect
          v-model="exampleData"
          :options="options"
          label="Who are you?"
          placeholder="Nobody"
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
        Use a select dropdown for the following:
      </p>
      <ul>
        <li></li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Specifications" anchor="#specifications">
      <ul>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Guidelines" anchor="#guidelines">
      <ul>
      </ul>
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
