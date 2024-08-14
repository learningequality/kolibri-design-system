<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        The <code>KTable</code> component is a flexible and customizable table component designed to handle a variety of data presentation needs within our application. It supports advanced features such as local sorting, sticky headers, keyboard navigation, and dynamic column resizing, making it suitable for both simple and complex data tables. 
      </p>
    </DocsPageSection>
    <DocsPageSection title="Usage" anchor="#usage">
      <!--Non-Sortable Table-->
      <h3>Table without Sorting functionality</h3>
      <p>
        This is an example to show how <code>KTable</code> can be used without any sorting functionality, for a simple table.
      </p>
      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Non Sortable Table"
          :sortable="false"
        >

          <template #header="{ header, index }">
            <span>{ header.label } (Backend)</span>
          </template>
          <template #cell="{ content, rowIndex, colIndex }">
            <span v-if="colIndex === 2">{ content } (City)</span>
            <span v-else>{ content }</span>
          </template>
        </KTable>

      </DocsShowCode>

  <DocsShowCode language="javascript">
    data() {
      return {
        headers: [
          { label: 'Name', dataType: 'string' },
          { label: 'Age', dataType: 'numeric' },
          { label: 'City', dataType: 'string' },
        ],
        rows: [
        ['John Doe', 28, 'New York'],
          ['Jane Smith', 34, 'Los Angeles'],
          ['Samuel Green', 22, 'Chicago'],
          ['Alice Johnson', 30, 'Houston'],
          ['Michael Brown', 45, 'Phoenix'],
          ['Emily Davis', 27, 'Philadelphia'],
        ]
      };
    },
  </DocsShowCode>

      <DocsShow block>
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Non Sortable Table"
          :sortable="false"
        >
          <template #header="{ header, index }">
            <span>{{ header.label }} (Backend)</span>
          </template>
          <template #cell="{ content, rowIndex, colIndex }">
            <span v-if="colIndex === 2">{{ content }} (City)</span>
            <span v-else>{{ content }}</span>
          </template>
        </KTable>
      </DocsShow>
       <!-- eslint-enable -->
      <!-- Frontend Sorting Example-->
      <h3>Table with Frontend Sorting</h3>
      <p>
        The <code>KTable</code> can be used with local sorting functionality, allowing you to sort data on the client side without the need for server requests. This example demonstrates a table with local sorting enabled.
      </p>
      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Local Sorting Table"
          :useLocalSorting="true"
          sortable
        >

          <template #header="{ header, index }">
            <span>{ header.label } (Backend)</span>
          </template>
          <template #cell="{ content, rowIndex, colIndex }">
            <span v-if="colIndex === 2">{ content } (City)</span>
            <span v-else>{ content }</span>
          </template>
        </KTable>

      </DocsShowCode>

  <DocsShowCode language="javascript">
    data() {
      return {
        headers: [
          { label: 'Name', dataType: 'string' },
          { label: 'Age', dataType: 'numeric' },
          { label: 'City', dataType: 'string' },
        ],
        rows: [
        ['John Doe', 28, 'New York'],
          ['Jane Smith', 34, 'Los Angeles'],
          ['Samuel Green', 22, 'Chicago'],
          ['Alice Johnson', 30, 'Houston'],
          ['Michael Brown', 45, 'Phoenix'],
          ['Emily Davis', 27, 'Philadelphia'],
        ]
      };
    },
  </DocsShowCode>
      <DocsShow block>
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Local Sorting Table"
          :useLocalSorting="true"
          sortable
        >
          <template #header="{ header, index }">
            <span>{{ header.label }} (Backend)</span>
          </template>
          <template #cell="{ content, rowIndex, colIndex }">
            <span v-if="colIndex === 2">{{ content }} (City)</span>
            <span v-else>{{ content }}</span>
          </template>
        </KTable>
          <!-- eslint-enable -->
      </DocsShow>

    </DocsPageSection>


  </DocsPageTemplate>

</template>


<script>

  export default {
    name: 'DocsKTable',
    data() {
      return {
        headers: [
          { label: 'Name', dataType: 'string' },
          { label: 'Age', dataType: 'numeric' },
          { label: 'City', dataType: 'string' },
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
