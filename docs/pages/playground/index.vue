<template>

  <!--
    Playground: A private page for components development
    *******************
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
    <!-- Play around with your component here: -->

    <KCheckbox label="First" />
    <KCheckbox label="Second" />

    <KTable
      :headers="headers"
      :rows="rows"
      caption="Table caption"
      sortable
    >
      <template #header="{ header }">
        <!-- <KCheckbox :label="header.label"/> -->
        <KButton>{{ header.label }}</KButton>
      </template>
      <template #cell="{ content, colIndex }">
        <span v-if="colIndex === 0">
          <!-- <KCheckbox :label="content"/> -->
          <KButton>{{ content }} 1 </KButton>
          <KButton disabled>{{ content }} 2 </KButton>
          <KButton>{{ content }} 3 </KButton>
        </span>
        <span v-else>{{ content }}</span>
      </template>
    </KTable>

    <KCheckbox label="Third" />

    <KTable
      :headers="headers"
      :rows="rows"
      caption="Table caption"
    />

    <KCheckbox label="Fourth" />
  </div>

</template>


<script>

  /*
    Playground is a Vue component too,
    so you can also use data, methods, etc.
    as usual if helpful
  */
  export default {
    name: 'Playground',
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
          ['Emily Davis', 27, 'Philadelphia'],
        ],
      };
    },
    methods: {},
  };

</script>
