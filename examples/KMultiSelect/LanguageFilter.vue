<template>

  <div>
    <KMultiSelect
      v-model="selected"
      :messages="messages"
      :options="formattedOptions"
      itemText="displayLabel"
      itemValue="id"
      :searchKeys="['native_name', 'related_names']"
      label="Language Filter"
      placeholder="Search language..."
      noResultsText="No language found"
      :multiple="true"
      clearable
      :appearanceOverrides="{ width: '750px' }"
    />
    <div style="margin-top: 16px; font-size: 14px"><strong>Selected:</strong> {{ selected }}</div>
  </div>

</template>


<script>

  import KMultiSelect from '../../lib/candidate/multiselect/KMultiSelect/index.vue';

  const languageOptions = [
    { id: 'en', name: 'English', related_names: ['English', 'en'], count: 42 },
    { id: 'es', name: 'Spanish', related_names: ['Spanish', 'es'], count: 15 },
    { id: 'fr', name: 'French', related_names: ['French', 'fr'], count: 10 },
    { id: 'de', name: 'German', related_names: ['German', 'de'], count: 8 },
    { id: 'zh', name: 'Chinese', related_names: ['Chinese', 'zh'], count: 6 },
    { id: 'ja', name: 'Japanese', related_names: ['Japanese', 'ja'], count: 4 },
    { id: 'ar', name: 'Arabic', related_names: ['Arabic', 'ar'], count: 3 },
    { id: 'hi', name: 'Hindi', native_name: 'हिन्दी', related_names: ['Hindi', 'hi'], count: 2 },
  ];

  export default {
    components: { KMultiSelect },
    data() {
      return {
        selected: [],
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
          itemsSelected: count => (count === 1 ? '1 item selected' : `${count} items selected`),
        },
      };
    },
    computed: {
      formattedOptions() {
        return languageOptions.map(opt => ({
          ...opt,
          displayLabel: `${opt.name} (${opt.count})`,
        }));
      },
    },
  };

</script>
