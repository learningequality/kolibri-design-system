<template>

  <div>
    <KMultiSelect
      v-model="selected"
      :messages="messages"
      :options="allCategories"
      itemText="text"
      itemValue="value"
      label="Categories"
      placeholder="Search categories..."
      expanded
      listMaxHeight="250px"
      :autoPromoteParent="false"
      clearable
      noResultsText="Category not found"
      :appearanceOverrides="{ width: '400px' }"
    />
    <div style="margin-top: 16px; font-size: 14px"><strong>Selected:</strong> {{ selected }}</div>
    <KMultiSelect
      :value="['WORK']"
      :messages="messages"
      :options="allCategories"
      itemText="text"
      itemValue="value"
      label="Categories (disabled)"
      expanded
      disabled
      listMaxHeight="250px"
      :autoPromoteParent="false"
      :appearanceOverrides="{ width: '400px', marginTop: '24px' }"
    />
  </div>

</template>


<script>

  import KMultiSelect from '../../lib/candidate/multiselect/KMultiSelect/index.vue';

  const allCategories = [
    { value: 'SCHOOL', text: 'School', level: 0 },
    { value: 'SCHOOL.MATHEMATICS', text: 'Mathematics', level: 1 },
    { value: 'SCHOOL.MATHEMATICS.ALGEBRA', text: 'Algebra', level: 2 },
    { value: 'SCHOOL.MATHEMATICS.GEOMETRY', text: 'Geometry', level: 2 },
    { value: 'SCHOOL.SCIENCES', text: 'Sciences', level: 1 },
    { value: 'SCHOOL.SCIENCES.BIOLOGY', text: 'Biology', level: 2 },
    { value: 'SCHOOL.SCIENCES.CHEMISTRY', text: 'Chemistry', level: 2 },
    { value: 'SCHOOL.LITERATURE', text: 'Literature', level: 1 },
    { value: 'WORK', text: 'Work', level: 0 },
    { value: 'WORK.SKILLS', text: 'Professional skills', level: 1 },
    { value: 'WORK.SKILLS.FINANCE', text: 'Finance', level: 2 },
    { value: 'WORK.SKILLS.ENTREPRENEURSHIP', text: 'Entrepreneurship', level: 2 },
    { value: 'WORK.TECHNICAL', text: 'Technical and vocational training', level: 1 },
    { value: 'DAILY_LIFE', text: 'Daily life', level: 0 },
    { value: 'DAILY_LIFE.PUBLIC_HEALTH', text: 'Public health', level: 1 },
    { value: 'DAILY_LIFE.DIGITAL_LITERACY', text: 'Digital literacy', level: 1 },
  ];

  export default {
    components: { KMultiSelect },
    data() {
      return {
        selected: [],
        allCategories,
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
          itemsSelected: ({ count }) =>
            count === 1 ? '1 item selected' : `${count} items selected`,
          partiallySelected: () => 'Partially selected',
        },
      };
    },
  };

</script>
