<template>

  <!--
    Playground: A private page for components development
    *****************************************************
    Place a component you're working on here and see it
    live on http://localhost:4000/playground

    Please do not commit your local updates of this file.
  -->
  <div style="padding: 24px">
    <!-- 
      Example: Uncomment lines bellow, change something
      in lib/KBreadcrumbs.vue and see the updates reflected
      on this page
    -->
    <!-- <KBreadcrumbs
      :items="[
        { text: 'Global Digital Library', link: { path: '#' } },
        { text: 'English', link: { path: '#' } },
        { text: 'Level 2 ', link: { path: '#' } },
      ]"
    /> -->
    <h1>KTable Component Example</h1>
    <h2>Sortable Table</h2>
    <KTable
      :headers="headers"
      :rows="rows"
      caption="Sortable Table"
      :useLocalSorting="true"
      sortable
    >
      <template #header="{ header, index }">
        <span>{{ header.label }} (Custom)</span>
      </template>
      <template #cell="{ content, rowIndex, colIndex }">
        <span v-if="colIndex === 1">{{ content }} years old</span>
        <span v-else>{{ content }}</span>
      </template>
    </KTable>

    <h2>Non-Sortable Table</h2>
    <KTable
      :headers="headers"
      :rows="rows"
      caption="Non-Sortable Table"
      :sortable="false"
    >
      <template #header="{ header, index }">
        <span>{{ header.label }} (Non-Sortable)</span>
      </template>
      <template #cell="{ content, rowIndex, colIndex }">
        <span v-if="colIndex === 2">{{ content }} (City)</span>
        <span v-else>{{ content }}</span>
      </template>
    </KTable>


    <!-- Play around with your component here: -->

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
        rows: [
          ['John Doe', 28, 'New York', '2022-01-15', 'N/A'],
          ['Jane Smith', 34, 'Los Angeles', '2021-12-22', 'N/A'],
          ['Samuel Green', 22, 'Chicago', '2023-03-10', 'N/A'],
          ['Alice Johnson', 30, 'Houston', '2020-07-18', 'N/A'],
        ],
      };
    },
  };

</script>
