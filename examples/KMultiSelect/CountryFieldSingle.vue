<template>

  <div>
    <KMultiSelect
      v-model="selected"
      noResultsText="No results found"
      :messages="messages"
      :options="allCountries"
      itemText="name"
      itemValue="id"
      label="Country"
      placeholder="Select a country..."
      :multiple="false"
      clearable
      :appearanceOverrides="{ maxWidth: '350px' }"
    />
    <div style="margin-top: 16px; font-size: 14px"><strong>Selected:</strong> {{ selected }}</div>
  </div>

</template>


<script>

  import KMultiSelect from '../../lib/candidate/multiselect/KMultiSelect/index.vue';

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

  export default {
    components: { KMultiSelect },
    data() {
      return {
        selected: null,
        allCountries,
        messages: {
          clearText: () => 'Clear all selections',
          open: () => 'Open menu',
          close: () => 'Close menu',
          removed: ({ label, count }) => `Removed ${label}. ${count} items selected.`,
          cleared: ({ label }) => `Cleared ${label}`,
          selected: ({ label, count }) => `Selected ${label}, ${count} items currently selected`,
          clickable: () => 'Options are clickable',
          allOptionsSelected: () => 'All options selected',
          allOptionsDeselected: () => 'No options selected',
          optionDeselected: () => 'Option deselected',
        },
      };
    },
  };

</script>
