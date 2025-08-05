<template>

  <div>
    <h1>Test KMultiSelect Component</h1>
    <KMultiSelect
      v-model="selectedItems"
      :options="options"
      autocomplete=true
      clearable
      placeholder="Pick some fruits…"
    />
  </div>

</template>


<script setup>

  import { ref } from 'vue';

  const selectedItems = ref([]);
  const options = [
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'cherry', label: 'Cherry' },
    { id: 'date', label: 'Date' },
  ];

</script>
