<template>

  <div>
    <KMultiSelect
      v-model="selected"
      :messages="messages"
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
      <!-- Custom chip slot using KTooltip to show full nested path -->
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
    <div style="margin-top: 16px; font-size: 14px"><strong>Selected:</strong> {{ selected }}</div>
  </div>

</template>


<script>

  import KMultiSelect from '../../lib/candidate/multiselect/KMultiSelect/index.vue';
  import KChip from '../../lib/candidate/multiselect/KChip/index.vue';

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
    components: { KMultiSelect, KChip },
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
          partiallySelected: () => 'Partially selected',
        },
      };
    },
  };

</script>
