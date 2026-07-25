<template>

  <DocsPageTemplate apiDocs>
    <template #developerNotes>
      <ul :style="{ margin: 0 }">
        <li>
          <code>KMultiSelect</code> currently covers single and multiple selection, flat lists, and
          deeply nested hierarchical trees with cascading behavior.
        </li>
        <li>
          Free-text custom value entry (combobox mode) is not currently supported and is planned for
          a future release.
        </li>
      </ul>
    </template>

    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        <code>KMultiSelect</code> is a searchable select component that supports single and multiple
        selections, flat arrays, and deeply nested hierarchical trees with cascading selection
        behavior.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Messages"
      anchor="#messages"
    >
      <p>
        <code>KMultiSelect</code> requires a <code>messages</code> object with eight required keys,
        each a function returning a translated string. Additional optional keys enable further
        live-region announcements.
      </p>
      <KTable
        :headers="messageHeaders"
        :rows="tableRows"
        caption="KMultiSelect messages"
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
          { text: 'Multiple selection', href: '#multiple-selection' },
          { text: 'Single selection', href: '#single-selection' },
          { text: 'Multi-field search', href: '#multifield-search' },
          { text: 'Hierarchical tree', href: '#hierarchical-tree' },
          { text: 'Primitive values', href: '#primitive-values' },
        ]"
      />

      <h3>
        Multiple selection
        <DocsAnchorTarget anchor="#multiple-selection" />
      </h3>
      <p>
        Selecting multiple items from a flat list of objects using <code>itemText</code> and
        <code>itemValue</code> to map object properties.
      </p>
      <DocsExample
        block
        exampleId="kmultiselect-multiple-selection"
        loadExample="KMultiSelect/CountryFieldMultiple.vue"
      />

      <h3>
        Single selection
        <DocsAnchorTarget anchor="#single-selection" />
      </h3>
      <p>
        Selecting a single item from a flat list using <code>:multiple="false"</code>. Use
        <code>appearanceOverrides</code> to constrain the width.
      </p>
      <DocsExample
        block
        exampleId="kmultiselect-single-selection"
        loadExample="KMultiSelect/CountryFieldSingle.vue"
      />

      <h3>
        Multi-field search
        <DocsAnchorTarget anchor="#multifield-search" />
      </h3>
      <p>
        Searching across multiple fields on each option using the <code>searchKeys</code> prop. Try
        typing a native script form or a related term to see matches across all configured fields.
      </p>
      <DocsExample
        block
        exampleId="kmultiselect-multifield-search"
        loadExample="KMultiSelect/LanguageFilter.vue"
      />

      <h3>
        Hierarchical tree
        <DocsAnchorTarget anchor="#hierarchical-tree" />
      </h3>
      <p>
        Selecting from a nested tree of options where selecting or deselecting a parent cascades to
        its children. An indeterminate state is shown when only some children are selected.
      </p>
      <DocsExample
        block
        exampleId="kmultiselect-hierarchical-tree"
        loadExample="KMultiSelect/CategoryOptionsTree.vue"
      />

      <h3>
        Primitive values
        <DocsAnchorTarget anchor="#primitive-values" />
      </h3>
      <p>
        Using a flat array of primitive values (numbers or strings) instead of objects. No
        <code>itemText</code> or <code>itemValue</code> mapping is needed.
      </p>
      <DocsExample
        block
        exampleId="kmultiselect-primitive-values"
        loadExample="KMultiSelect/ActivityDurationShort.vue"
      />
    </DocsPageSection>

    <DocsPageSection
      title="Related"
      anchor="#related"
    >
      <ul>
        <li>
          <DocsLibraryLink component="KSelect" /> for simpler, non-searchable dropdowns without
          tokenization.
        </li>
        <li>
          <DocsLibraryLink component="KListbox" /> which powers the underlying dropdown menu and
          keyboard navigation for this component.
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {
    name: 'KMultiselectDocs',
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
            name: 'clearText',
            required: 'Yes',
            description: 'aria-label for the clear (×) button.',
            example: 'Clear all selections',
          },
          {
            name: 'open',
            required: 'Yes',
            description: 'aria-label for the open (▼) button.',
            example: 'Open options',
          },
          {
            name: 'close',
            required: 'Yes',
            description: 'aria-label for the close (▲) button.',
            example: 'Close options',
          },
          {
            name: 'clickable',
            required: 'Yes',
            description: 'Accessible description indicating that options are interactive.',
            example: 'Options are clickable',
          },
          {
            name: 'allOptionsSelected',
            required: 'Yes',
            description: 'Announced via live region when every option is selected.',
            example: 'All options selected',
          },
          {
            name: 'allOptionsDeselected',
            required: 'Yes',
            description: 'Announced via live region when no options are selected.',
            example: 'No options selected',
          },
          {
            name: 'optionDeselected',
            required: 'Yes',
            description: 'Announced via live region when an individual option is deselected.',
            example: 'Option deselected',
          },
          {
            name: 'itemsSelected',
            required: 'Yes',
            description:
              'Announced via live region when the component receives focus. ' +
              'In multiple mode, receives a count (number). ' +
              'In single mode, receives the selected option label (string).',
            example: '3 items selected',
          },
          {
            name: 'partiallySelected',
            required: 'No',
            description:
              'Renders visually-hidden text inside indeterminate parent nodes so screen ' +
              'readers announce the partial selection state. Use with hierarchical trees.',
            example: 'Partially selected',
          },
          {
            name: 'selected',
            required: 'No',
            description:
              'Announced via live region when an option is selected. Receives { label, count }.',
            example: 'Apple selected, 3 total',
          },
          {
            name: 'removed',
            required: 'No',
            description:
              'Announced via live region when a chip is removed. Receives { label, count }.',
            example: 'Removed Apple, 2 remaining',
          },
          {
            name: 'cleared',
            required: 'No',
            description: 'Announced via live region when all selections are cleared.',
            example: 'All selections cleared',
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


<style lang="scss" scoped></style>
