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
      <DocsShow>
        <KMultiSelect
          v-model="countrySelectionMultiple"
          noResultsText="No results found"
          :messages="mockMessages"
          :options="allCountries"
          itemText="name"
          itemValue="id"
          label="Countries"
          placeholder="Select countries..."
          :multiple="true"
          clearable
          :appearanceOverrides="{ maxWidth: '500px' }"
        />
        <div style="margin-top: 16px; font-size: 14px">
          <strong>Selected:</strong> {{ countrySelectionMultiple }}
        </div>
      </DocsShow>

      <h3>
        CountryField (Single)
        <DocsAnchorTarget anchor="#country-single" />
      </h3>
      <p>
        Demonstrates a single country selection, replicating Studio's
        <code>RequestForm.vue</code> usage. Uses
        <code>appearanceOverrides="{ maxWidth: '500px' }"</code> to lock width like KTextbox.
      </p>
      <DocsShow>
        <KMultiSelect
          v-model="countrySelectionSingle"
          noResultsText="No results found"
          :messages="mockMessages"
          :options="allCountries"
          itemText="name"
          itemValue="id"
          label="Country"
          placeholder="Select a country..."
          :multiple="false"
          clearable
          :appearanceOverrides="{ maxWidth: '500px' }"
        />
        <div style="margin-top: 16px; font-size: 14px">
          <strong>Selected:</strong> {{ countrySelectionSingle }}
        </div>
      </DocsShow>

      <h3>
        LanguageDropdown (Multiple)
        <DocsAnchorTarget anchor="#language-multiple" />
      </h3>
      <p>
        Demonstrates searching and selecting multiple languages, replicating
        <code>SearchFilters.vue</code> in Studio.
      </p>
      <DocsShow>
        <KMultiSelect
          v-model="languageDropdownMultiple"
          :messages="mockMessages"
          :options="formattedLanguageDropdown"
          itemText="displayLabel"
          itemValue="id"
          :searchKeys="['native_name', 'related_names']"
          label="Languages"
          placeholder="Search languages..."
          noResultsText="No languages found"
          :multiple="true"
          clearable
          :appearanceOverrides="{ width: '350px' }"
        />
        <div style="margin-top: 16px; font-size: 14px">
          <strong>Selected:</strong> {{ languageDropdownMultiple }}
        </div>
      </DocsShow>

      <h3>
        LanguageDropdown (Single)
        <DocsAnchorTarget anchor="#language-single" />
      </h3>
      <p>
        Demonstrates searching a single language, replicating <code>ChannelModal.vue</code> in
        Studio.
      </p>
      <DocsShow>
        <KMultiSelect
          v-model="languageDropdownSingle"
          :messages="mockMessages"
          :options="formattedLanguageDropdown"
          itemText="displayLabel"
          itemValue="id"
          :searchKeys="['native_name', 'related_names']"
          label="Language"
          placeholder="Search language..."
          noResultsText="No language found"
          :multiple="false"
          clearable
          :appearanceOverrides="{ width: '350px' }"
        />
        <div style="margin-top: 16px; font-size: 14px">
          <strong>Selected:</strong> {{ languageDropdownSingle }}
        </div>
      </DocsShow>

      <h3>
        LanguageFilter (Multi-field Search)
        <DocsAnchorTarget anchor="#language-filter" />
      </h3>
      <p>
        Demonstrates deep fuzzy searching across native names, related names, and English names. Try
        typing "Hindi" or "हिन्दी". Replicates <code>LanguageFilter.vue</code> in Studio.
      </p>
      <DocsShow>
        <KMultiSelect
          v-model="languageFilterSelection"
          :messages="mockMessages"
          :options="formattedLanguageFilter"
          itemText="displayLabel"
          itemValue="id"
          :searchKeys="['native_name', 'related_names']"
          label="Language Filter"
          placeholder="Search language..."
          noResultsText="No language found"
          :multiple="true"
          clearable
          :appearanceOverrides="{ width: '350px' }"
        />
        <div style="margin-top: 16px; font-size: 14px">
          <strong>Selected:</strong> {{ languageFilterSelection }}
        </div>
      </DocsShow>

      <h3>
        CategoryOptions (Dropdown Tree)
        <DocsAnchorTarget anchor="#category-options" />
      </h3>
      <p>
        Demonstrates a hierarchical tree structure with multi-select and cascading behavior,
        replacing the custom implementation in Studio.
      </p>
      <DocsShow>
        <KMultiSelect
          v-model="categorySelection"
          :messages="mockMessages"
          :options="allCategories"
          itemText="text"
          itemValue="value"
          label="Categories"
          placeholder="Select categories..."
          :multiple="true"
          clearable
          noResultsText="No matching categories"
          :appearanceOverrides="{ width: '750px' }"
        >
          <!-- Custom chip slot rendering KTooltip bound to option.filterText to show full nested path -->
          <template #chip="{ option, remove }">
            <span :ref="'category-chip-' + option.value">
              <KChip
                :text="option.text"
                close
                @close="remove"
              />
            </span>
            <KTooltip
              :reference="'category-chip-' + option.value"
              :refs="$refs"
              placement="top"
              :text="option.filterText || option.text"
            />
          </template>
        </KMultiSelect>
        <div style="margin-top: 16px; font-size: 14px">
          <strong>Selected:</strong> {{ categorySelection }}
        </div>
      </DocsShow>

      <h3>
        ActivityDuration (Short Activity)
        <DocsAnchorTarget anchor="#activity-short" />
      </h3>
      <p>
        Demonstrates a flat primitive array in single-selection mode, replicating the Short Activity
        duration dropdown.
      </p>
      <DocsShow>
        <KMultiSelect
          v-model="durationShort"
          noResultsText="No results found"
          :messages="mockMessages"
          :options="shortActivityDurations"
          label="Duration (Minutes)"
          placeholder="Select duration..."
          :multiple="false"
        />
        <div style="margin-top: 16px; font-size: 14px">
          <strong>Selected:</strong> {{ durationShort }}
        </div>
      </DocsShow>

      <h3>
        ActivityDuration (Long Activity)
        <DocsAnchorTarget anchor="#activity-long" />
      </h3>
      <p>
        Demonstrates a flat primitive array in single-selection mode, replicating the Long Activity
        duration dropdown.
      </p>
      <DocsShow>
        <KMultiSelect
          v-model="durationLong"
          noResultsText="No results found"
          :messages="mockMessages"
          :options="longActivityDurations"
          label="Duration (Minutes)"
          placeholder="Select duration..."
          :multiple="false"
          :appearanceOverrides="{ width: '150px' }"
        />
        <div style="margin-top: 16px; font-size: 14px">
          <strong>Selected:</strong> {{ durationLong }}
        </div>
      </DocsShow>
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

  import KMultiSelect from '../../lib/candidate/multiselect/KMultiSelect/index.vue';
  import KChip from '../../lib/candidate/multiselect/KChip/index.vue';

  const allCountries = [
    { id: 'Afghanistan', name: 'AF' },
    { id: 'Albania', name: 'AL' },
    { id: 'Algeria', name: 'DZ' },
    { id: 'Andorra', name: 'AD' },
    { id: 'Angola', name: 'AO' },
    { id: 'Argentina', name: 'AR' },
    { id: 'Australia', name: 'AU' },
    { id: 'Brazil', name: 'BR' },
    { id: 'Canada', name: 'CA' },
    { id: 'China', name: 'CN' },
    { id: 'Egypt', name: 'EG' },
    { id: 'France', name: 'FR' },
    { id: 'Germany', name: 'DE' },
    { id: 'India', name: 'IN' },
    { id: 'Japan', name: 'JP' },
    { id: 'Mexico', name: 'MX' },
    { id: 'Nigeria', name: 'NG' },
    { id: 'United Kingdom', name: 'GB' },
    { id: 'United States', name: 'US' },
  ];

  const languageDropdownOptions = [
    {
      id: 'en',
      name: 'English',
      native_name: 'English, Anglais',
      related_names: ['English', 'en'],
    },
    {
      id: 'es',
      name: 'Spanish',
      native_name: 'Español, Castellano',
      related_names: ['Spanish', 'es'],
    },
    { id: 'fr', name: 'French', native_name: 'Français', related_names: ['French', 'fr'] },
    { id: 'de', name: 'German', native_name: 'Deutsch', related_names: ['German', 'de'] },
    { id: 'zh', name: 'Chinese', native_name: '中文, 汉语', related_names: ['Chinese', 'zh'] },
    { id: 'ja', name: 'Japanese', native_name: '日本語', related_names: ['Japanese', 'ja'] },
    { id: 'ar', name: 'Arabic', native_name: 'العربية', related_names: ['Arabic', 'ar'] },
    { id: 'hi', name: 'Hindi', native_name: 'हिन्दी', related_names: ['Hindi', 'hi'] },
  ];

  const languageFilterOptions = [
    { id: 'en', name: 'English', related_names: ['English', 'en'], count: 42 },
    { id: 'es', name: 'Spanish', related_names: ['Spanish', 'es'], count: 15 },
    { id: 'fr', name: 'French', related_names: ['French', 'fr'], count: 10 },
    { id: 'de', name: 'German', related_names: ['German', 'de'], count: 8 },
    { id: 'zh', name: 'Chinese', related_names: ['Chinese', 'zh'], count: 6 },
    { id: 'ja', name: 'Japanese', related_names: ['Japanese', 'ja'], count: 4 },
    { id: 'ar', name: 'Arabic', related_names: ['Arabic', 'ar'], count: 3 },
    { id: 'hi', name: 'Hindi', related_names: ['Hindi', 'hi'], count: 2 },
  ];

  const allCategories = [
    { value: 'FOOD', text: 'Food', level: 0, filterText: 'Food' },
    { value: 'FOOD.FRUITS', text: 'Fruits', level: 1, filterText: 'Food - Fruits' },
    { value: 'FOOD.FRUITS.APPLE', text: 'Apple', level: 2, filterText: 'Food - Fruits - Apple' },
    { value: 'FOOD.FRUITS.BANANA', text: 'Banana', level: 2, filterText: 'Food - Fruits - Banana' },
    { value: 'FOOD.VEGETABLES', text: 'Vegetables', level: 1, filterText: 'Food - Vegetables' },
    {
      value: 'FOOD.VEGETABLES.CARROT',
      text: 'Carrot',
      level: 2,
      filterText: 'Food - Vegetables - Carrot',
    },
    {
      value: 'FOOD.VEGETABLES.BROCCOLI',
      text: 'Broccoli',
      level: 2,
      filterText: 'Food - Vegetables - Broccoli',
    },
    { value: 'DRINKS', text: 'Drinks', level: 0, filterText: 'Drinks' },
    { value: 'DRINKS.HOT', text: 'Hot Drinks', level: 1, filterText: 'Drinks - Hot' },
    { value: 'DRINKS.HOT.COFFEE', text: 'Coffee', level: 2, filterText: 'Drinks - Hot - Coffee' },
    { value: 'DRINKS.HOT.TEA', text: 'Tea', level: 2, filterText: 'Drinks - Hot - Tea' },
    { value: 'DRINKS.COLD', text: 'Cold Drinks', level: 1, filterText: 'Drinks - Cold' },
    { value: 'DRINKS.COLD.SODA', text: 'Soda', level: 2, filterText: 'Drinks - Cold - Soda' },
    { value: 'DRINKS.COLD.WATER', text: 'Water', level: 2, filterText: 'Drinks - Cold - Water' },
  ];

  export default {
    name: 'KMultiselectDocs',
    components: {
      KMultiSelect,
      KChip,
    },
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
        allCountries,
        languageDropdownOptions,
        languageFilterOptions,
        allCategories,
        shortActivityDurations: [5, 10, 15, 20, 25, 30],
        longActivityDurations: [40, 50, 60, 70, 80, 90, 100, 110, 120],

        countrySelectionMultiple: [],
        countrySelectionSingle: null,
        languageDropdownMultiple: [],
        languageDropdownSingle: null,
        languageFilterSelection: [],
        categorySelection: [],
        durationShort: null,

        durationLong: null,
        mockMessages: {
          clearText: () => 'Clear all selections',
          open: () => 'Open menu',
          close: () => 'Close menu',
          removed: ({ label }) => 'Removed ' + label,
          cleared: () => 'All selections cleared',
          selected: ({ label, count }) =>
            'Selected ' + label + ', ' + count + ' items currently selected',
          allOptionsSelected: () => 'All options selected',
          allOptionsDeselected: () => 'All options deselected',
          optionDeselected: () => 'Option deselected',
          clickable: () => 'Clickable',
        },
      };
    },
    computed: {
      tableRows() {
        return this.messageRows.map(m => [m.name, m.required, m.description, m.example]);
      },
      formattedLanguageDropdown() {
        return this.languageDropdownOptions.map(opt => ({
          ...opt,
          displayLabel: `${opt.native_name.split(',')[0].trim()} (${opt.id})`,
        }));
      },
      formattedLanguageFilter() {
        return this.languageFilterOptions.map(opt => ({
          ...opt,
          displayLabel: `${opt.name} (${opt.count})`,
        }));
      },
    },
  };

</script>


<style lang="scss" scoped></style>
