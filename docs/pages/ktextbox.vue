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
      <DocsSubNav
        :items="[
          { text: 'Input with label', href: '#with-label' },
          { text: 'Valid and invalid input', href: '#validation' },
          { text: 'Character limit', href: '#charlimit' },
          { text: 'Disabled input', href: '#disabled' },
          { text: 'Readonly input', href: '#readonly' },
          { text: 'Number input', href: '#number' },
          { text: 'Password input', href: '#password' },
          { text: 'Text area', href: '#textarea' },
          { text: 'Clearable', href: '#clearable' },
          { text: 'Validation text', href: '#invalidtext' },
          { text: 'All slots demo', href: '#all-slots' },
        ]"
      />

      <h3>
        Input with label
        <DocsAnchorTarget anchor="#with-label" />
      </h3>
      <p>
        This text box includes a visible label, providing clear guidance and context to the user
        about the expected input.
      </p>
      <DocsExample
        loadExample="KTextbox/WithLabel.vue"
        exampleId="ktextbox-label"
        block
      />

      <h3>
        Valid and invalid input
        <DocsAnchorTarget anchor="#validation" />
      </h3>
      <p>
        This text box only accepts numeric input. If any non-numeric character is entered, it will
        be considered invalid.
      </p>
      <DocsExample
        loadExample="KTextbox/Validation.vue"
        exampleId="ktextbox-validation"
        block
      />

      <h3>
        Character limit
        <DocsAnchorTarget anchor="#charlimit" />
      </h3>
      <p>
        This text box has a maximum character limit of 20. It displays a character counter to inform
        the user of the remaining characters they can enter.
      </p>
      <DocsExample
        loadExample="KTextbox/CharacterLimit.vue"
        exampleId="ktextbox-charlimit"
        block
      />

      <h3>
        Disabled input
        <DocsAnchorTarget anchor="#disabled" />
      </h3>
      <p>
        This text box is disabled. It cannot be edited or focused, so it will be skipped during
        keyboard navigation.
      </p>
      <DocsExample
        loadExample="KTextbox/Disabled.vue"
        exampleId="ktextbox-disabled"
        block
      />

      <h3>
        Readonly input
        <DocsAnchorTarget anchor="#readonly" />
      </h3>
      <p>
        This text box is readonly. It cannot be edited but it can still select and copy the text.
        It's also included in keyboard navigation.
      </p>
      <DocsExample
        loadExample="KTextbox/Readonly.vue"
        exampleId="ktextbox-readonly"
        block
      />

      <h3>
        Number input
        <DocsAnchorTarget anchor="#number" />
      </h3>
      <p>
        This is a numeric input field where users can input values within the range of 0 to 100.
      </p>
      <p>
        <strong>Note:</strong> The KTextbox does not automatically validate the min and max values,
        however, it is recommended to use them for accessibility purposes while using the invalid
        and invalidText props to handle validation as needed.
      </p>
      <DocsExample
        loadExample="KTextbox/Number.vue"
        exampleId="ktextbox-number"
        block
      />

      <h3>
        Password input
        <DocsAnchorTarget anchor="#password" />
      </h3>
      <p>This text box masks the entered characters to enhance security and privacy.</p>
      <DocsExample
        loadExample="KTextbox/Password.vue"
        exampleId="ktextbox-password"
        block
      />

      <h3>
        Text area
        <DocsAnchorTarget anchor="#textarea" />
      </h3>
      <p>This is a multi-line text input area, suitable for longer text entries.</p>
      <DocsExample
        loadExample="KTextbox/AsTextarea.vue"
        exampleId="ktextbox-textarea"
        block
      />

      <h3>
        Clearable
        <DocsAnchorTarget anchor="#clearable" />
      </h3>

      <p>
        This text box includes a clear button that allows users to quickly remove the entered text.
      </p>
      <DocsExample
        loadExample="KTextbox/Clearable.vue"
        exampleId="ktextbox-clearable"
        block
      />

      <h3>
        Validation text
        <DocsAnchorTarget anchor="#invalidtext" />
      </h3>
      <p>
        When the value is invalid, shows the validation text even if the user has not focused or
        changed the input.
      </p>
      <DocsExample
        loadExample="KTextbox/InvalidText.vue"
        exampleId="ktextbox-invalidtext"
        block
      />

      <h3>
        All slots demonstration
        <DocsAnchorTarget anchor="#all-slots" />
      </h3>
      <p>
        The following examples demonstrate how to use the <code>outerBefore</code>,
        <code>outerAfter</code>, <code>innerBefore</code>, and <code>innerAfter</code> slots for
        advanced customization of <code>KTextbox</code>. You can use these slots to add icons,
        buttons, dropdowns, or any custom content before or after the input, both inside and outside
        the input area.
      </p>
      <DocsExample
        loadExample="KTextbox/OuterSlots.vue"
        exampleId="ktextbox-outer-slots"
        block
      />
      <DocsExample
        loadExample="KTextbox/InnerSlots.vue"
        exampleId="ktextbox-inner-slots"
        block
      />
      <DocsExample
        loadExample="KTextbox/AllSlots.vue"
        exampleId="ktextbox-all-slots"
        block
      />
    </DocsPageSection>
  </DocsPageTemplate>

</template>
