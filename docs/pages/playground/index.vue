<template>

  <div style="padding: 24px">
    <h2>KMultiSelect Playground</h2>
    <p>This page showcases various states and configurations of KMultiSelect.</p>

    <div class="playground-grid">
      <!-- 1. Normal Default -->
      <div class="playground-item">
        <h3>1. Default (Empty)</h3>
        <KMultiSelect
          v-model="val1"
          label="Choose fruits"
          :messages="messages"
          :options="options"
          placeholder="Select an option..."
        />
      </div>

      <!-- 2. Normal With Selection -->
      <div class="playground-item">
        <h3>2. Default (With Selection)</h3>
        <KMultiSelect
          v-model="val2"
          label="Choose fruits"
          :messages="messages"
          :options="options"
          placeholder="Select an option..."
        />
      </div>

      <!-- 3. Invalid / Error State -->
      <div class="playground-item">
        <h3>3. Invalid / Error State</h3>
        <KMultiSelect
          v-model="val3"
          label="Choose fruits"
          :messages="messages"
          :options="options"
          placeholder="Required field..."
          :invalid="isVisited3 && val3.length === 0"
          invalidText="Please select at least one fruit!"
          noResultsText="No matching fruits found!"
          @blur="isVisited3 = true"
        />
      </div>

      <!-- 4. Disabled State -->
      <div class="playground-item">
        <h3>4. Disabled</h3>
        <KMultiSelect
          v-model="val4"
          label="Choose fruits"
          :messages="messages"
          :options="options"
          placeholder="Cannot select..."
          disabled
        />
      </div>

      <!-- 5. Single Select -->
      <div class="playground-item">
        <h3>5. Single Select</h3>
        <KMultiSelect
          v-model="val5"
          label="Choose a fruit"
          :messages="messages"
          :options="options"
          placeholder="Select only one..."
          :multiple="false"
        />
      </div>

      <!-- 6. Hide Selected Items -->
      <div class="playground-item">
        <h3>6. Hide Selected (Flat List Only)</h3>
        <KMultiSelect
          v-model="val6"
          label="Choose fruits"
          :messages="messages"
          :options="options"
          placeholder="Selected options disappear..."
          hideSelected
        >
          <template #no-results="{ searchText }">
            No results found for "{{ searchText }}". Press 'Enter' key to create a new tag.
          </template>
        </KMultiSelect>
      </div>

      <!-- 7. Clearable -->
      <div class="playground-item">
        <h3>7. Clearable</h3>
        <KMultiSelect
          v-model="val7"
          label="Choose fruits"
          :messages="messages"
          :options="options"
          placeholder="Can be cleared..."
          clearable
          clearAllLabel="Clear all selections"
        />
      </div>
    </div>
  </div>

</template>


<script>

  import KMultiSelect from '../../../lib/candidate/multiselect/KMultiSelect';

  export default {
    name: 'KMultiSelectPlayground',
    components: { KMultiSelect },
    data() {
      return {
        options: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Cherry', value: 'cherry' },
          { label: 'Date', value: 'date' },
          { label: 'Elderberry', value: 'elderberry' },
        ],
        val1: [],
        val2: ['apple', 'cherry'],
        val3: [],
        isVisited3: false,
        val4: [],
        val5: null,
        val6: ['apple'],
        val7: ['date'],
        messages: {
          clearText: () => 'Clear',
          open: () => 'Open',
          close: () => 'Close',
          clickable: () => 'Clickable',
          allOptionsSelected: () => 'All selected',
          allOptionsDeselected: () => 'All deselected',
          optionDeselected: () => 'Deselected',
        },
      };
    },
  };

</script>


<style scoped>

  .playground-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
    margin-top: 24px;
  }

  .playground-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    background: #fafafa;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }

  h3 {
    margin: 0;
    font-size: 16px;
  }

</style>
