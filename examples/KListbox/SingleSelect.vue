<template>

  <div>
    <h4 :id="classLabel">Class</h4>
    <KListbox
      :id="listboxId"
      v-model="selected"
      class="listbox"
      :ariaLabelledBy="classLabel"
      :messages="messages"
      :multiple="false"
      :style="{ borderColor: $themeTokens.fineLine }"
    >
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
      const classLabel = 'single-select-class';
      const listboxId = 'single-select-listbox';
      const selected = ref(['literature']);
      const options = [
        { id: 'biology', label: 'Biology' },
        { id: 'literature', label: 'Literature' },
        { id: 'physics', label: 'Physics' },
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

  .option {
    padding: 8px 6px;
    border-bottom: 1px solid;
  }

  .option:last-child {
    border-bottom: 0;
  }

</style>
