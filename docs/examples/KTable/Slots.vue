<template>

  <KTable
    :headers="headers"
    :rows="rows"
    caption="Table showing use of slots"
    sortable
  >
    <template #header="{ header }">
      <span>{{ header.label }} (Local)</span>
    </template>
    <template #cell="{ content, colIndex }">
      <span v-if="colIndex === 1">{{ content }} years old</span>
      <span v-else-if="colIndex === 4"><KButton>Test</KButton></span>
      <span v-else>{{ content }}</span>
    </template>
  </KTable>

</template>


<script>

  export default {
    data() {
      return {
        headers: [
          { label: 'Name', dataType: 'string', columnId: 'name' },
          { label: 'Age', dataType: 'number', columnId: 'age' },
          { label: 'City', dataType: 'string', columnId: 'city' },
        ],
        rows: [
          ['John Doe', 28, 'New York'],
          ['Jane Smith', 34, 'Los Angeles'],
          ['Samuel Green', 22, 'Chicago'],
          ['Alice Johnson', 30, 'Houston'],
          ['Michael Brown', 45, 'Phoenix'],
          ['Emily Davis', 27, 'Philadelphia'],
        ],
      };
    },
  };

</script>
