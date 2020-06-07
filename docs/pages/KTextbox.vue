<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">

      <p>
        The textbox is the most common type of input element. It can support arbitrary text, numbers, multi-line content
      </p>

      <h3>Single line</h3>

      <p>Single line text input is the most minimal example advisable.</p>

      <DocsShow>
        <KTextbox
          label="Some label"

          v-model="textbox1"
        />
      </DocsShow>

      <h4>Touch-UI</h4>

      <p>When using with touch devices, you may need more control via the <code>autocomplete</code> and <code>autocapitalize</code> attributes.</p>

      <DocsShow>
        <KTextbox
          label="Some label"

          autocapitalize="none"

          v-model="textbox2"
        />
      </DocsShow>

      <h3>Multi-line</h3>

      <p>Milti-line text input slightly more than the minimal example advisable.</p>

      <DocsShow>
        <KTextbox
          label="Some label"

          multiLine="true"

          v-model="textbox3"
        />
      </DocsShow>

      <h4>Touch-UI</h4>

      <p>Similarly to the single line version, multi-line also supports the same parameters.</p>

      <DocsShow>
        <KTextbox
          label="Some label"

          autocapitalize="none"
          multiLine="true"

          v-model="textbox4"
        />
      </DocsShow>
    </DocsPageSection>

  </DocsPageTemplate>

</template>

<script>

  import KTextbox from '~~/lib/KTextbox';

  export default {
    name: 'Example',
    components: { KTextbox },
    data: () => ({
      textbox1: '',
      textbox2: '',
      textbox3: '',
      textbox4: '',
    }),
  };

</script>
