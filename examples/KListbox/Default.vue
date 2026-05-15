<template>

  <div>
    <h4 :id="classLabel">Class</h4>
    <KListbox
      :id="listboxId"
      v-model="selected"
      :ariaLabelledBy="classLabel"
      :messages="messages"
    >
      <KListboxOption
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        :label="option.label"
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
      const classLabel = 'default-class';
      const listboxId = 'default-listbox';
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
