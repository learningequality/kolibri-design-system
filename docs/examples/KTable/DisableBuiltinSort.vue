<template>

  <KTable
    :headers="headers"
    :rows="rows"
    caption="Disable Builtin Sorting Example"
    sortable
    disableDefaultSorting
    @changeSort="changeSortHandler"
  />

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
    methods: {
      changeSortHandler(index, sortOrder) {
        console.log(`changeSort event emitted with index: ${index} and sortOrder: ${sortOrder}`);
      },
    },
  };

</script>
