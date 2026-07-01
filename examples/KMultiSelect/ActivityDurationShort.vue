<template>

  <div>
    <KMultiSelect
      v-model="selected"
      noResultsText="No results found"
      :messages="messages"
      :options="[5, 10, 15, 20, 25, 30]"
      label="Duration (Minutes)"
      placeholder="Select duration..."
      :multiple="false"
      :appearanceOverrides="{ width: '150px' }"
    />
    <div style="margin-top: 16px; font-size: 14px"><strong>Selected:</strong> {{ selected }}</div>
  </div>

</template>


<script>

  import KMultiSelect from '../../lib/candidate/multiselect/KMultiSelect/index.vue';

  export default {
    components: { KMultiSelect },
    data() {
      return {
        selected: null,
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
