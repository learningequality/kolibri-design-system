<template>

  <div>
    <h4 :id="classLabel">Class</h4>
    <KListbox
      :id="listboxId"
      v-model="selected"
      class="listbox"
      :ariaLabelledBy="classLabel"
      :style="{ maxHeight: '200px', borderColor: $themeTokens.fineLine }"
      :messages="messages"
    >
      <template #selectAll="{ allSelected, someSelected, setAllSelected }">
        <div
          class="select-all"
          :style="{ borderColor: $themeTokens.fineLine }"
        >
          <KCheckbox
            label="All classes"
            class="select-all-checkbox"
            :aria-controls="listboxId"
            :disabled="!options.length"
            :checked="allSelected"
            :indeterminate="someSelected"
            :style="{ marginTop: '6px', marginBottom: '0' }"
            @change="setAllSelected"
          />
        </div>
      </template>
      <KListboxOption
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        :label="option.label"
        class="option"
        :style="{ borderColor: $themeTokens.fineLine }"
      />
    </KListbox>
    <p>
      Selected: <code>{{ JSON.stringify(selected) }}</code>
    </p>
  </div>

</template>


<script>

  import { ref } from 'vue';

  export default {
    setup() {
      const classLabel = 'scrollable-class';
      const listboxId = 'scrollable-listbox';
      const selected = ref(['literature', 'art', 'chemistry']);
      const options = [
        { id: 'biology', label: 'Biology' },
        { id: 'literature', label: 'Literature' },
        { id: 'physics', label: 'Physics' },
        { id: 'art', label: 'Art' },
        { id: 'chemistry', label: 'Chemistry' },
        { id: 'geography', label: 'Geography' },
        { id: 'history', label: 'History' },
      ];
      const messages = {
        clickable: 'Options are clickable',
        allOptionsSelected: 'All options selected',
        allOptionsDeselected: 'No options selected',
        optionDeselected: 'Deselected',
      };
      return { classLabel, listboxId, selected, options, messages };
    },
  };

</script>


<style lang="scss" scoped>

  .listbox {
    border: 1px solid;
    border-radius: 4px;
  }

  .select-all,
  .select-all-checkbox {
    width: 100%;
  }

  .option,
  .select-all {
    padding: 4px 6px;
    border-bottom: 1px solid;
  }

  .option:last-child {
    border-bottom: 0;
  }

</style>
