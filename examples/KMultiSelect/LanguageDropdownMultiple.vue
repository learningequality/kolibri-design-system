<template>

  <div>
    <KMultiSelect
      v-model="selected"
      :messages="messages"
      :options="formattedOptions"
      itemText="displayLabel"
      itemValue="id"
      :searchKeys="['native_name', 'related_names']"
      label="Languages"
      placeholder="Search languages..."
      noResultsText="No languages found"
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
        },
      };
    },
    computed: {
      formattedOptions() {
        return languageOptions.map(opt => ({
          ...opt,
          displayLabel: `${opt.native_name.split(',')[0].trim()} (${opt.id})`,
        }));
      },
    },
  };

</script>
