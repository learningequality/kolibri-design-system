<template>

  <DocsPageTemplate apiDocs>
    <template #developerNotes>
      <ul :style="{ margin: 0 }">
        <li>
          <code>KMultiSelect</code> currently focuses on Phase 1 & 2 of the Vuetify migration
          strategy, fully supporting <code>v-autocomplete</code> capabilities including single/multi
          selection, flat lists, and deeply nested hierarchical data.
        </li>
        <li>
          Free-text custom value entry (combobox mode) is explicitly planned for a future Phase 3
          extension and is not currently supported.
        </li>
      </ul>
    </template>

    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        <code>KMultiSelect</code> is a searchable select component that supports both single and
        multiple selections, flat arrays, and deeply nested hierarchical trees with cascading
        selection behavior. It is designed to replace Vuetify's <code>v-autocomplete</code> and
        <code>v-combobox</code> components.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Messages"
      anchor="#messages"
    >
      <p>
        <code>KMultiSelect</code> requires a <code>messages</code> object. Each entry must be a
        translated string or a function returning a string that is short and focused.
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
          { text: 'CountryField (Multiple)', href: '#country-multiple' },
          { text: 'CountryField (Single)', href: '#country-single' },
          { text: 'LanguageDropdown (Multiple)', href: '#language-multiple' },
          { text: 'LanguageDropdown (Single)', href: '#language-single' },
          { text: 'LanguageFilter (Multi-field Search)', href: '#language-filter' },
          { text: 'CategoryOptions (Dropdown Tree)', href: '#category-options' },
          { text: 'ActivityDuration (Short)', href: '#activity-short' },
          { text: 'ActivityDuration (Long)', href: '#activity-long' },
        ]"
      />

      <h3>
        CountryField (Multiple)
        <DocsAnchorTarget anchor="#country-multiple" />
      </h3>
      <p>
        Demonstrates selecting multiple countries from a flat array, replicating the
        <code>CountryField</code> used globally in Studio.
      </p>
      <DocsExample
        block
        exampleId="kmultiselect-country-multiple"
        loadExample="KMultiSelect/CountryFieldMultiple.vue"
      />

      <h3>
        CountryField (Single)
        <DocsAnchorTarget anchor="#country-single" />
      </h3>
      <p>
        Demonstrates a single country selection, replicating Studio's
        <code>RequestForm.vue</code> usage. Uses
        <code>appearanceOverrides="{ maxWidth: '500px' }"</code> to lock width like KTextbox.
      </p>
      <DocsExample
        block
        exampleId="kmultiselect-country-single"
        loadExample="KMultiSelect/CountryFieldSingle.vue"
      />

      <h3>
        LanguageDropdown (Multiple)
        <DocsAnchorTarget anchor="#language-multiple" />
      </h3>
      <p>
        Demonstrates searching and selecting multiple languages, replicating
        <code>SearchFilters.vue</code> in Studio.
      </p>
      <DocsExample
        block
        exampleId="kmultiselect-language-multiple"
        loadExample="KMultiSelect/LanguageDropdownMultiple.vue"
      />

      <h3>
        LanguageDropdown (Single)
        <DocsAnchorTarget anchor="#language-single" />
      </h3>
      <p>
        Demonstrates searching a single language, replicating <code>ChannelModal.vue</code> in
        Studio.
      </p>
      <DocsExample
        block
        exampleId="kmultiselect-language-single"
        loadExample="KMultiSelect/LanguageDropdownSingle.vue"
      />

      <h3>
        LanguageFilter (Multi-field Search)
        <DocsAnchorTarget anchor="#language-filter" />
      </h3>
      <p>
        Demonstrates deep fuzzy searching across native names, related names, and English names. Try
        typing "Hindi" or "हिन्दी". Replicates <code>LanguageFilter.vue</code> in Studio.
      </p>
      <DocsExample
        block
        exampleId="kmultiselect-language-filter"
        loadExample="KMultiSelect/LanguageFilter.vue"
      />

      <h3>
        CategoryOptions (Dropdown Tree)
        <DocsAnchorTarget anchor="#category-options" />
      </h3>
      <p>
        Demonstrates a hierarchical tree structure with multi-select and cascading behavior,
        replacing the custom implementation in Studio.
      </p>
      <DocsExample
        block
        exampleId="kmultiselect-category-options"
        loadExample="KMultiSelect/CategoryOptionsTree.vue"
      />

      <h3>
        ActivityDuration (Short Activity)
        <DocsAnchorTarget anchor="#activity-short" />
      </h3>
      <p>
        Demonstrates a flat primitive array in single-selection mode, replicating the Short Activity
        duration dropdown.
      </p>
      <DocsExample
        block
        exampleId="kmultiselect-activity-short"
        loadExample="KMultiSelect/ActivityDurationShort.vue"
      />

      <h3>
        ActivityDuration (Long Activity)
        <DocsAnchorTarget anchor="#activity-long" />
      </h3>
      <p>
        Demonstrates a flat primitive array in single-selection mode, replicating the Long Activity
        duration dropdown.
      </p>
      <DocsExample
        block
        exampleId="kmultiselect-activity-long"
        loadExample="KMultiSelect/ActivityDurationLong.vue"
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
          { label: 'Name', dataType: 'string', columnId: 'name', minWidth: '190px' },
          { label: 'Required', dataType: 'string', columnId: 'required', minWidth: '100px' },
          { label: 'Description', dataType: 'string', columnId: 'description' },
          { label: 'Examples', dataType: 'string', columnId: 'example', minWidth: '200px' },
        ],
        messageRows: [
          {
            name: 'removed',
            required: 'No',
            description: 'Screen reader announcement when a chip is removed. Receives { label }.',
            example: 'Removed Apple',
          },
          {
            name: 'cleared',
            required: 'No',
            description: 'Screen reader announcement when all chips are cleared.',
            example: 'All selections cleared',
          },
          {
            name: 'clearText',
            required: 'No',
            description: 'aria-label for the clear (×) button. Used when clearable=true.',
            example: 'Clear all selections',
          },
          {
            name: 'open',
            required: 'No',
            description: 'aria-label for the dropdown expand (▼) button.',
            example: 'Open menu',
          },
          {
            name: 'close',
            required: 'No',
            description: 'aria-label for the dropdown collapse (▲) button.',
            example: 'Close menu',
          },
          {
            name: 'selected',
            required: 'No',
            description: 'Announced when an option is selected. Receives { label, count }.',
            example: 'Selected Apple, 3 items selected',
          },
          {
            name: 'clickable',
            required: 'No',
            description: 'Forwarded to KListbox. Describes that options are clickable.',
            example: 'Options are clickable',
          },
          {
            name: 'allOptionsSelected',
            required: 'No',
            description: 'Forwarded to KListbox. Announced when all options are selected.',
            example: 'All options selected',
          },
          {
            name: 'allOptionsDeselected',
            required: 'No',
            description: 'Forwarded to KListbox. Announced when all options are deselected.',
            example: 'No options selected',
          },
          {
            name: 'optionDeselected',
            required: 'No',
            description: 'Forwarded to KListbox. Announced when an option is deselected.',
            example: 'Option deselected',
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
