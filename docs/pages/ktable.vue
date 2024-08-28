<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        The <code>KTable</code> component is an accessible and customizable table component designed to handle a variety of data presentation needs. The component is suitable for both simple and complex data tables. It offers:
        <ul>
          <li>Built-in sorting as well as integration with externally sorted data</li>
          <li>Keyboard navigation</li>
          <li>Dynamic column resizing</li>
          <li>Sticky headers</li>
        </ul>
      </p>
    </DocsPageSection>
    <DocsPageSection title="Usage" anchor="#usage">
      <!--Non-Sortable Table-->
      <h3>Table without sorting functionality</h3>
      <p>
        This is an example to show how <code>KTable</code> can be used without any sorting functionality, for a simple table. Use of slots is optional.
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
          caption="Non-sortable table"
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
        The <code>KTable</code> can be used with local sorting functionality, allowing you to sort data on the client side without the need for server requests. There are 4 permissible data types - <code>string</code>,<code>numeric</code>,<code>date</code> and <code>others</code>. Columns declared with <code>others</code> data type are not sortable. This example demonstrates a table with local sorting enabled.
      </p>
      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Table with built-in sorting"
          :useLocalSorting="true"
          sortable
        />

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
        />
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
