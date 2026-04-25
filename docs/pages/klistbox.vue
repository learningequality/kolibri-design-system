<template>

  <DocsPageTemplate apiDocs>
    <template #developerNotes>
      <ul :style="{ margin: 0 }">
        <li>
          Grouped options aren't supported yet, as we haven't needed them. They could be added by
          extending our listbox components according to
          <DocsExternalLink
            text="grouped options of APG's listbox pattern"
            href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/"
          />
          (likely adding <code>KListboxGroup</code>)
        </li>
        <li>
          Reflecting our first use-cases, multi selection is the default behavior. Single selection
          mode could be added by a few adjustments in line with the same APG listbox pattern.
        </li>
        <li>
          Listboxes are often combined with searching or filtering, but that's not part of the
          listbox pattern and use cases vary. If a frequent pattern emerges, it may motivate
          dedicated search/filter components that integrate well with <code>KListbox</code>.
        </li>
      </ul>
    </template>

    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        <code>KListbox</code> is a representation of the
        <DocsExternalLink
          text="APG listbox pattern"
          href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
        />
        with several additional enhancements. It can be used as a standalone listbox or within a
        composite widget such as a dropdown or combobox.
      </p>

      <p>Its options are provided via <DocsLibraryLink component="KListboxOption" />.</p>

      <p>
        It currently defaults to multi selection and does not yet support single selection or
        grouped options (see developer notes above).
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Messages"
      anchor="#messages"
    >
      <p>
        <code>KListbox</code> requires a <code>messages</code> object. Each entry must be a
        translated string that is short and focused.
      </p>
      <KTable
        :headers="messageHeaders"
        :rows="tableRows"
        caption="KListbox messages"
        :stickyColumns="['first']"
      >
        <template #cell="{ content, colIndex }">
          <code v-if="colIndex === 0">{{ content }}</code>
          <i v-else-if="colIndex === 3">{{ content }}</i>
          <template v-else>{{ content }}</template>
        </template>
      </KTable>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <DocsSubNav
        :items="[
          { text: 'Default', href: '#default' },
          { text: 'Select all', href: '#select-all' },
          { text: 'Customized', href: '#customized' },
          { text: 'Scrollable', href: '#scrollable' },
        ]"
      />

      <h3>
        Default
        <DocsAnchorTarget anchor="#default" />
      </h3>

      <p><code>KListboxOption</code> is a direct child of <code>KListbox</code>.</p>

      <DocsBanner a11y>
        If <code>KListbox</code> is not part of another widget, such as a combobox, add either a
        visible label referenced by <code>aria-labelledby</code> or a value specified for
        <code>aria-label</code>. Use concise and descriptive value.
      </DocsBanner>

      <DocsExample
        block
        exampleId="klistbox-default"
        loadExample="KListbox/Default.vue"
      />

      <h3>
        Select all
        <DocsAnchorTarget anchor="#select-all" />
      </h3>

      <p>
        Use the <code>#selectAll</code> scoped slot together with a select control, typically
        <code>KCheckbox</code>, to implement the select all functionality.
      </p>

      <DocsBanner a11y>
        Set <code>aria-controls</code> on the control to the listbox <code>id</code> to associate
        the two.
      </DocsBanner>

      <DocsExample
        block
        exampleId="klistbox-select-all"
        loadExample="KListbox/SelectAll.vue"
      />

      <h3>
        Customized
        <DocsAnchorTarget anchor="#customized" />
      </h3>
      <p>
        Apply style on the listbox and its rows to add more space, borders, or other appearance
        customizations. Use slots to show rich content.
      </p>

      <DocsBanner a11y>
        Ensure custom content is accessible and the final implementation works as a whole. For
        example here, setting both the row and checkbox width to 100% is needed to make the entire
        <i>All users</i> row clickable.
      </DocsBanner>

      <DocsExample
        block
        exampleId="klistbox-customized"
        loadExample="KListbox/Customized.vue"
      />

      <h3>
        Scrollable
        <DocsAnchorTarget anchor="#scrollable" />
      </h3>
      <p>
        To limit the space a long list takes up, apply a maximum height, and the list will become
        scrollable.
      </p>
      <DocsExample
        block
        exampleId="klistbox-scrollable"
        loadExample="KListbox/Scrollable.vue"
        hideStyle
        hideScript
      >
        <template #html>
          <!-- eslint-disable -->
          <DocsShowCode language="html">
            <KListbox
              :style="{ maxHeight: '200px' }"
              ...
            >
              ...
            </KListbox>
          </DocsShowCode>
          <!-- eslint-enable -->
        </template>
      </DocsExample>
    </DocsPageSection>

    <DocsPageSection
      title="Related"
      anchor="#related"
    >
      <ul>
        <li>
          <DocsLibraryLink component="KListboxOption" /> is a single option inside
          <code>KListbox</code>
        </li>
        <li>
          <DocsExternalLink
            text="APG listbox"
            href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
          />
          specifies the related accessibility pattern
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {
    data() {
      return {
        messageHeaders: [
          { label: 'Name', dataType: 'string', columnId: 'name', minWidth: '220px' },
          { label: 'Required', dataType: 'string', columnId: 'required', minWidth: '140px' },
          { label: 'Description', dataType: 'string', columnId: 'description' },
          { label: 'Examples', dataType: 'string', columnId: 'example', minWidth: '200px' },
        ],
        messageRows: [
          {
            name: 'clickable',
            required: 'Yes',
            description:
              'Accessible description of the listbox to indicate that its options are clickable.',
            example: 'Options are clickable',
          },
          {
            name: 'allOptionsSelected',
            required: 'Yes',
            description:
              'Announced via live region when all options are selected with Ctrl + A or when the select all checkbox is used.',
            example: 'All options selected',
          },
          {
            name: 'allOptionsDeselected',
            required: 'Yes',
            description:
              'Announced via live region when all options are deselected with Ctrl + A or when the select all checkbox is used.',
            example: 'No options selected',
          },
          {
            name: 'optionDeselected',
            required: 'Yes',
            description: 'Announced via live region when an option is deselected.',
            example: 'Deselected',
          },
        ],
      };
    },
    computed: {
      tableRows() {
        return this.messageRows.map(m => [m.name, m.required, m.description, m.example]);
      },
    },
  };

</script>
