<template>

  <DocsPageTemplate apiDocs>
    <template #developerNotes>
      <ul :style="{ margin: 0 }">
        <li>
          Listboxes are often combined with searching or filtering, but that's not part of the
          listbox pattern and use cases vary. If a frequent pattern emerges, it may motivate
          dedicated search/filter components that integrate well with <code>KListbox</code>.
        </li>
        <li>
          Currently KListbox doesn't support options reordering, so bear in mind that if the list
          changes due to a filter, the filtered list should preserve the order of the original list
          to avoid unexpected keyboard navigation.
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
        It supports both multi selection (default, <code>multiple: true</code>) and single selection
        (<code>multiple: false</code>).
      </p>

      <p>
        <code>KListbox</code> supports dynamic option sets (useful for integration with filtering,
        pagination, etc.). Currently rendered options are referred to as <i>visible options</i>.
        Selection state of hidden options is preserved.
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
          { text: 'Single select', href: '#single-select' },
          { text: 'Customized', href: '#customized' },
          { text: 'Scrollable', href: '#scrollable' },
          { text: 'Grouped', href: '#grouped' },
        ]"
      />

      <h3>
        Default
        <DocsAnchorTarget anchor="#default" />
      </h3>

      <p><code>KListboxOption</code> is a direct child of <code>KListbox</code>.</p>

      <DocsBanner a11y>
        If <code>KListbox</code> is not part of another widget, such as a combobox, add either a
        visible label referenced by <code>ariaLabelledBy</code> or a value specified for
        <code>ariaLabel</code>. Use a concise, descriptive value.
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
        <code>KCheckbox</code>, to implement the select all functionality. The slot provides:
      </p>

      <ul>
        <li><code>allSelected</code>: <code>true</code> when every visible option is selected.</li>
        <li>
          <code>someSelected</code>: <code>true</code> when at least one (but not all) visible
          options are selected. Useful for indicating indeterminate state.
        </li>
        <li>
          <code>setAllSelected(checked)</code>: Controls selection of all visible options. Call with
          <code>true</code> to select all visible options or <code>false</code> to deselect them.
        </li>
      </ul>

      <DocsBanner a11y>
        Link the control to the listbox <code>id</code> using <code>aria-controls</code>. Provide an explicit label like <code>'Select all users'</code> instead of <code>'All users'</code> because <code>aria-controls</code> does not change what the screen reader says.
      </DocsBanner>

      <DocsExample
        block
        exampleId="klistbox-select-all"
        loadExample="KListbox/SelectAll.vue"
      />

      <h3>
        Single select
        <DocsAnchorTarget anchor="#single-select" />
      </h3>

      <p>
        Set <code>multiple="false"</code> on the listbox. Options automatically hide the checkbox
        selector in single-select mode. Use the <code>showSelector</code> prop on
        <DocsLibraryLink component="KListboxOption" /> to override this behaviour explicitly.
      </p>

      <DocsExample
        block
        exampleId="klistbox-single-select"
        loadExample="KListbox/SingleSelect.vue"
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

      <h3>
        Grouped
        <DocsAnchorTarget anchor="#grouped" />
      </h3>
      <p>Group options using <code>KListboxGroup</code>.</p>
      <DocsExample
        block
        exampleId="klistbox-grouped"
        loadExample="KListbox/Grouped.vue"
      />
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
          <DocsLibraryLink component="KListboxGroup" /> groups options inside
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
          {
            name: 'partiallySelected',
            required: 'No',
            description:
              'Renders a visually-hidden text inside indeterminate options so screen readers announce the partial selection state. Use with grouped listboxes that have parent checkboxes.',
            example: 'Partially selected',
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
