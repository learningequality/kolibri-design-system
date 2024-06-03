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
    <KTable :headers="tableHeaders" :rows="tableRows" caption="User Information Table" />
  

    <!-- Play around with your component here: -->

  </div>

</template>


<script>

  /*
     Playground is a Vue component too,
     so you can also use `data`, `methods`, etc.
     as usual if helpful
   */
  import KTable from '../../lib/KTable/KTable.vue';

  export default {
    name: 'Playground',
    components: {
      KTable,
    },
    data() {
      return {
        tableHeaders: [
          { label: 'Name', dataType: 'string' },
          { label: 'Age', dataType: 'numeric' },
          { label: 'Birth Date', dataType: 'date' },
          { label: 'City', dataType: 'string' },
          { label: 'Misc', dataType: 'others' },
        ],
        tableRows: [
          ['Alice', 25, '1999-05-12', 'New York', 'Example'],
          ['Bob', 30, '1994-02-22', 'San Francisco', 'Example'],
          ['Charlie', 35, '1989-12-15', 'Chicago', 'Example'],
        ],
      };
    },
  };

</script>
