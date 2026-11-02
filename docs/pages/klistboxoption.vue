<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        <code>KListboxOption</code> is a single option inside <code>KListbox</code>. See
        <DocsLibraryLink component="KListbox" /> for guidance and examples.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Disabled options"
      anchor="#disabled"
    >
      <p>Set <code>disabled</code> on an option that cannot be chosen. A disabled option:</p>
      <ul>
        <li>has <code>aria-disabled="true"</code>, so screen readers still announce it</li>
        <li>is skipped by arrow keys, Home and End</li>
        <li>cannot be selected or deselected by click, Space, or select all</li>
      </ul>
      <p>
        A disabled option that is already selected stays selected, and the listbox starts on it when
        it receives focus.
      </p>
      <DocsExample
        block
        exampleId="klistboxoption-disabled"
        loadExample="KListbox/Disabled.vue"
      />
    </DocsPageSection>
  </DocsPageTemplate>

</template>
