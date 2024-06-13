<template>

  <div id="app">
    <h1>KTable Component Example</h1>
    <h2>Sortable Table with Local Sorting</h2>
    <KTable
      :headers="headers"
      :rows="localRows"
      caption="Sortable Table"
      :useLocalSorting="true"
      sortable
    >
      <template #header="{ header, index }">
        <span>{{ header.label }} (Local Sort)</span>
      </template>
      <template #cell="{ content, rowIndex, colIndex }">
        <span v-if="colIndex === 1">{{ content }} years old</span>
        <span v-else>{{ content }}</span>
      </template>
    </KTable>

    <h2>Sortable Table with Backend Sorting</h2>
    <KTable
      :headers="headers"
      :rows="backendRows"
      caption="Sortable Table"
      :useLocalSorting="false"
      sortable
      @changeSort="changeSortHandler"
    >
      <template #header="{ header, index }">
        <span>{{ header.label }} (Backend Sort)</span>
      </template>
      <template #cell="{ content, rowIndex, colIndex }">
        <span v-if="colIndex === 2">{{ content }} (City)</span>
        <span v-else>{{ content }}</span>
      </template>
    </KTable>
  </div>

</template>


<script>

  /*
         Playground is a Vue component too,
         so you can also use `data`, `methods`, etc.
         as usual if helpful
       */
  import KTable from '../../lib/KTable';

  export default {
    name: 'Playground',
    components: {
      KTable,
    },
    data() {
      return {
        headers: [
          { label: 'Name', dataType: 'string' },
          { label: 'Age', dataType: 'numeric' },
          { label: 'City', dataType: 'string' },
          { label: 'Joined', dataType: 'date' },
          { label: 'Misc', dataType: 'others' },
        ],
        localRows: [
          ['John Doe', 28, 'New York', '2022-01-15', 'N/A'],
          ['Jane Smith', 34, 'Los Angeles', '2021-12-22', 'N/A'],
          ['Samuel Green', 22, 'Chicago', '2023-03-10', 'N/A'],
          ['Alice Johnson', 30, 'Houston', '2020-07-18', 'N/A'],
        ],
        backendRows: [
          ['John Doe', 28, 'New York', '2022-01-15', 'N/A'],
          ['Jane Smith', 34, 'Los Angeles', '2021-12-22', 'N/A'],
          ['Samuel Green', 22, 'Chicago', '2023-03-10', 'N/A'],
          ['Alice Johnson', 30, 'Houston', '2020-07-18', 'N/A'],
        ],
      };
    },
    methods: {
      changeSortHandler(index, sortOrder) {
        // Simulate fetching sorted data from backend
        console.log('Fetching sorted data from backend for column:', index, 'order:', sortOrder);
        // You can replace this with an actual API call
        // For demo purposes, we just reverse the rows
        this.backendRows = [...this.backendRows].reverse();
      },
    },
  };

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

h1, h2 {
  margin: 20px 0;
}
</style>