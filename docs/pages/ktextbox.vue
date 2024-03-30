<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      For detailed design guidance, refer to the page on <DocsInternalLink href="/textfields" text="text fields" />.
    </DocsPageSection>

    <DocsPageSection title="Input Types and Features">
      <h3>Input with Label</h3>
      <KTextbox label="Input with Label" />
      <p>This text box includes a visible label, providing clear guidance and context to the user about the expected input.</p>

      <h3>Input without Label</h3>
      <KTextbox />
      <p>This text box does not include a visible label. It's useful when the context of the input is obvious without a label, or if space constraints necessitate omitting it.</p>

      <h3>Valid and Invalid Input</h3>
      <KTextbox 
        v-model="numericInput" 
        label="Numbers Only" 
        :invalid="!isNumeric(numericInput)" 
        invalidText="Please enter a valid number." 
      />
      <p>This text box only accepts numeric input. If any non-numeric character is entered, it will be considered invalid.</p>

      <h3>Disabled Input</h3>
      <KTextbox label="Disabled Input" disabled />
      <p>This text box is disabled and cannot be edited.</p>

      <h3>Number Input</h3>
      <KTextbox label="Number Input" type="number" :min="0" :max="100" />
      <p>This is a numeric input field where users can input values within the range of 0 to 100.</p>

      <h3>Text Area</h3>
      <KTextbox label="Text Area" :textArea="true" />
      <p>This is a multi-line text input area, suitable for longer text entries.</p>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>
export default {
  data() {
    return {
      numericInput: '',
    };
  },
  methods: {
    isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }
  }
};
</script>
