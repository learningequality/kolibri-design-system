<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      For detailed design guidance, refer to the page on
      <DocsInternalLink
        href="/textfields"
        text="text fields"
      />.
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <h3>Input with label</h3>
      <KTextbox label="Input with label" />
      <DocsShowCode language="html">
        <KTextbox label="Input with label" />
      </DocsShowCode>
      <p>
        This text box includes a visible label, providing clear guidance and context to the user
        about the expected input.
      </p>

      <h3>Valid and invalid input</h3>

      <KTextbox
        v-model="numericInput"
        label="Numbers only"
        :invalid="!isNumeric(numericInput)"
        invalidText="Please enter a valid number."
      />

      <DocsShowCode language="html">
        <KTextbox
          v-model="numericInput"
          label="Numbers only"
          :invalid="!isNumeric(numericInput)"
          invalidText="Please enter a valid number."
        />
      </DocsShowCode>

      <p>
        This text box only accepts numeric input. If any non-numeric character is entered, it will
        be considered invalid.
      </p>

      <h3>Disabled input</h3>
      <KTextbox
        label="Disabled input"
        disabled
      />
      <DocsShowCode language="html">
        <KTextbox
          label="Disabled input"
          disabled
        />
      </DocsShowCode>
      <p>
        This text box is disabled. It cannot be edited or focused, so it will be skipped during
        keyboard navigation.
      </p>

      <h3>Readonly input</h3>
      <KTextbox
        label="Token"
        value="123456789"
        readonly
      />
      <DocsShowCode language="html">
        <KTextbox
          label="Token"
          value="123456789"
          readonly
        />
      </DocsShowCode>
      <p>
        This text box is readonly. It cannot be edited but it can still select and copy the text.
        It's also included in keyboard navigation.
      </p>

      <h3>Number input</h3>
      <KTextbox
        label="Number input"
        type="number"
        :min="0"
        :max="100"
      />

      <DocsShowCode language="html">
        <KTextbox
          label="Number Input"
          type="number"
          :min="0"
          :max="100"
        />
      </DocsShowCode>

      <p>
        This is a numeric input field where users can input values within the range of 0 to 100.
      </p>
      <p>
        <strong>Note:</strong> The KTextbox does not automatically validate the min and max values,
        however, it is recommended to use them for accessibility purposes while using the invalid
        and invalidText props to handle validation as needed.
      </p>

      <h3>Text area</h3>
      <KTextbox
        label="Text area"
        :textArea="true"
      />
      <DocsShowCode language="html">
        <KTextbox
          label="Text area"
          :textArea="true"
        />
      </DocsShowCode>
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
      },
    },
  };

</script>
