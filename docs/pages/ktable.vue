<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        The <code>KTable</code> component is a flexible and customizable table component designed to handle a variety of data presentation needs within our application. It supports advanced features such as local sorting, sticky headers, keyboard navigation, and dynamic column resizing, making it suitable for both simple and complex data tables. 
      </p>
    </DocsPageSection>
    <DocsPageSection title="Usage" anchor="#usage">
      <!-- Frontend Sorting Example-->
      <h3>Table with Frontend Sorting</h3>
      <p>
        The <code>KTable</code> can be used with local sorting functionality, allowing you to sort data on the client side without the need for server requests. This example demonstrates a table with local sorting enabled.
      </p>
      <DocsShowCode language="html">
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

      </DocsShowCode>
      <!-- eslint-disable -->
  <DocsShowCode language="javascript">
    data() {
      return {
        headers: [
          { label: 'Name', dataType: 'string' },
          { label: 'Age', dataType: 'numeric' },
          { label: 'City', dataType: 'string' },
        ],
        rows: [
          ['John Doe', 28, 'New York', '2022-01-15T00:00:00Z', 'N/A'],
          ['Jane Smith', 34, 'Los Angeles', '2021-12-22T00:00:00Z', 'N/A'],
          ['Samuel Green', 22, 'Chicago', '2023-03-10T00:00:00Z', 'N/A'],
        ]
      };
    },
  </DocsShowCode>
  <!-- eslint-enable -->
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
      </DocsShow>

    </DocsPageSection>


  </DocsPageTemplate>

</template>

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
        ['John Doe', 28, 'New York', '2022-01-15T00:00:00Z', 'N/A'],
        ['Jane Smith', 34, 'Los Angeles', '2021-12-22T00:00:00Z', 'N/A'],
        ['Samuel Green', 22, 'Chicago', '2023-03-10T00:00:00Z', 'N/A'],
      ]
    };
  }
};

