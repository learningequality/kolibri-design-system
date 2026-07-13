<template>

  <div>
    <KMultiSelect
      v-model="selected"
      noResultsText="No results found"
      :messages="messages"
      :options="allCountries"
      itemText="name"
      itemValue="id"
      label="Countries"
      placeholder="Select countries..."
      :multiple="true"
      clearable
      :appearanceOverrides="{ width: '750px' }"
    />
    <div style="margin-top: 16px; font-size: 14px"><strong>Selected:</strong> {{ selected }}</div>
  </div>

</template>


<script>

  import KMultiSelect from '../../lib/candidate/multiselect/KMultiSelect/index.vue';

  const allCountries = [
    { id: 'AF', name: 'Afghanistan' },
    { id: 'AL', name: 'Albania' },
    { id: 'DZ', name: 'Algeria' },
    { id: 'AD', name: 'Andorra' },
    { id: 'AO', name: 'Angola' },
    { id: 'AR', name: 'Argentina' },
    { id: 'AU', name: 'Australia' },
    { id: 'BR', name: 'Brazil' },
    { id: 'CA', name: 'Canada' },
    { id: 'CN', name: 'China' },
    { id: 'EG', name: 'Egypt' },
    { id: 'FR', name: 'France' },
    { id: 'DE', name: 'Germany' },
    { id: 'IN', name: 'India' },
    { id: 'JP', name: 'Japan' },
    { id: 'MX', name: 'Mexico' },
    { id: 'NG', name: 'Nigeria' },
    { id: 'GB', name: 'United Kingdom' },
    { id: 'US', name: 'United States' },
  ];

  export default {
    components: { KMultiSelect },
    data() {
      return {
        selected: [],
        allCountries,
        messages: {
          clearText: () => 'Clear all selections',
          open: () => 'Open menu',
          close: () => 'Close menu',
          removed: ({ label, count }) => `Removed ${label}. ${count} items selected.`,
          cleared: ({ count }) => `Cleared ${count} selections`,
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
