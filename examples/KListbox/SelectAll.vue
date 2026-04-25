<template>

  <div>
    <h4 :id="classLabel">Class</h4>
    <KListbox
      :id="listboxId"
      v-model="selected"
      :aria-labelledby="classLabel"
      :messages="messages"
    >
      <template #selectAll="{ allSelected, someSelected, toggle }">
        <!--
          margin reset prevents KCheckbox from taking more space
          than necessary and aligns its correctly within the row
        -->
        <KCheckbox
          label="All classes"
          :aria-controls="listboxId"
          :disabled="!options.length"
          :checked="allSelected"
          :indeterminate="someSelected"
          :style="{ marginTop: '6px', marginBottom: '0' }"
          @change="toggle"
        />
      </template>
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
      const classLabel = 'selectall-class';
      const listboxId = 'selectall-listbox';
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
