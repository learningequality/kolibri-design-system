<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        The <code>KTable</code> component is an accessible and customizable table component designed to handle a variety of data presentation needs. The component is suitable for both simple and complex data tables. It offers:
        <ul>
          <li>Offers built-in sorting by default</li>
          <li>Integrates with already sorted data</li>
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
        This is an example to show how <code>KTable</code> can be used without any sorting functionality, as a simple table. 
      </p>
      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Non Sortable Table"
        />

      </DocsShowCode>

  <DocsShowCode language="javascript">
    data() {
      return {
        headers: [
          { label: 'Name', dataType: 'string' },
          { label: 'Age', dataType: 'number' },
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
        />
      </DocsShow>

      <!-- Frontend Sorting Example-->
      <h3>Table with Default Sorting</h3>
      <p>
        The <code>KTable</code> can be used with default sorting functionality, allowing you to sort data on the client side without the need for server requests. There are 4 permissible data types - <code>string</code>,<code>number</code>,<code>date</code> and <code>undefined</code>. Columns declared with <code>undefined</code> data type are not sortable. This example demonstrates a table with default sorting enabled.
      </p>

      <DocsShowCode language="html">
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Table with built-in sorting"
          sortable
        />

      </DocsShowCode>

  <DocsShowCode language="javascript">
    data() {
      return {
        headers: [
          { label: 'Name', dataType: 'string' },
          { label: 'Age', dataType: 'number' },
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
          caption="In-Built Sorting Table"
          sortable
        />
          <!-- eslint-enable -->
      </DocsShow>
      <!--Table showing use of slots-->
      <h3>Table showing use of slots</h3>
      <p>
        This is an example to show how slots can be used in <code>KTable</code>. The table currently provides slots for <code>header</code> and <code>cell</code> which can be used to customize the table header and cell content respectively.
      </p>
      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KTable
          :headers="slotHeaders"
          :rows="slotRows"
          caption="Table showing use of slots"
          sortable
        >
      <template #header="{ header, colindex }">
        <span>{ header.label } (Local)</span>
      </template>
      <template #cell="{ content, rowIndex, colIndex }">
        <span v-if="colIndex === 1">{ content } years old</span>
        <span v-else-if="colIndex === 4"><KButton>Test</KButton></span>
        <span v-else>{ content }</span>
      </template>
    </KTable>

      </DocsShowCode>

  <DocsShowCode language="javascript">
    data() {
      return {
        slotHeaders: [
          { label: 'Name', dataType: 'string' },
          { label: 'Age', dataType: 'number' },
          { label: 'City', dataType: 'string' },
          { label: 'Joined', dataType: 'date' },
          { label: 'Misc', dataType: 'undefined' },
        ],
        slotRows: [
          ['John Doe', 28, 'New York', '2022-01-15T00:00:00Z', 'N/A'],
          ['Jane Smith', 34, 'Los Angeles', '2021-12-22T00:00:00Z', 'N/A'],
          ['Samuel Green', 22, 'Chicago', '2023-03-10T00:00:00Z', 'N/A'],
          ['Alice Johnson', 30, 'Houston', '2020-07-18T00:00:00Z', 'N/A'],
        ],
      };
    },
      </DocsShowCode>

      <DocsShow block>
        <KTable
          :headers="slotHeaders"
          :rows="slotRows"
          caption="Table showing use of slots"
          sortable
        >
          <template #header="{ header, colindex }">
            <span>{{ header.label }} (Local)</span>
          </template>
          <template #cell="{ content, rowIndex, colIndex }">
            <span v-if="colIndex === 1">{{ content }} years old</span>
            <span v-else-if="colIndex === 4"><KButton>Test</KButton></span>
            <span v-else>{{ content }}</span>
          </template>
        </KTable>
      </DocsShow>
      <!-- eslint-enable -->
      <!--Table with custom column widths-->
      <h3>Table with custom column widths</h3>
      <p>
        This is an example to show how <code>KTable</code> can be used with custom column widths. The column widths are defined in the <code>headers</code> prop. The <code>width</code> property is used to define the overall width of the column. The <code>minWidth</code> defines the minimum width of column, below which the column will not shrink.
      </p>
      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KTable
          :headers="headersWithCustomWidths"
          :rows="customRows"
          caption="Table showing columns with custom widths"
          sortable
        />

      </DocsShowCode>

  <DocsShowCode language="javascript">
    data() {
      return {
        headersWithCustomWidths: [
          { label: 'Name', dataType: 'string', minWidth: '20px', width: '2%' },
          { label: 'Age', dataType: 'number', minWidth: '100px', width: '33%' },
          { label: 'City', dataType: 'string', minWidth: '200px', width: '25%' },
          { label: 'Joined', dataType: 'date', minWidth: '150px', width: '20%' },
          { label: 'Misc', dataType: 'undefined', minWidth: '100px', width: '20%' },
        ],
        customRows: [
          ['John Doe', 28, 'New York', '2022-01-15T00:00:00Z', 'N/A'],
          ['Jane Smith', 34, 'Los Angeles', '2021-12-22T00:00:00Z', 'N/A'],
          ['Samuel Green', 22, 'Chicago', '2023-03-10T00:00:00Z', 'N/A'],
          ['Alice Johnson', 30, 'Houston', '2020-07-18T00:00:00Z', 'N/A'],
        ],
      };
    },
      </DocsShowCode>

      <DocsShow block>
        <KTable
          :headers="headersWithCustomWidths"
          :rows="customRows"
          caption="Table showing columns with custom widths"
          sortable
        />
      </DocsShow>
      <!-- eslint-enable -->

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
          { label: 'Age', dataType: 'number' },
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
        slotHeaders: [
          { label: 'Name', dataType: 'string' },
          { label: 'Age', dataType: 'number' },
          { label: 'City', dataType: 'string' },
          { label: 'Joined', dataType: 'date' },
          { label: 'Misc', dataType: 'undefined' },
        ],
        slotRows: [
          ['John Doe', 28, 'New York', '2022-01-15T00:00:00Z', 'N/A'],
          ['Jane Smith', 34, 'Los Angeles', '2021-12-22T00:00:00Z', 'N/A'],
          ['Samuel Green', 22, 'Chicago', '2023-03-10T00:00:00Z', 'N/A'],
          ['Alice Johnson', 30, 'Houston', '2020-07-18T00:00:00Z', 'N/A'],
        ],
        headersWithCustomWidths: [
          { label: 'Name', dataType: 'string', minWidth: '20px', width: '2%' },
          { label: 'Age', dataType: 'number', minWidth: '100px', width: '33%' },
          { label: 'City', dataType: 'string', minWidth: '200px', width: '25%' },
          { label: 'Joined', dataType: 'date', minWidth: '150px', width: '20%' },
          { label: 'Misc', dataType: 'undefined', minWidth: '100px', width: '20%' },
        ],
        customRows: [
          ['John Doe', 28, 'New York', '2022-01-15T00:00:00Z', 'N/A'],
          ['Jane Smith', 34, 'Los Angeles', '2021-12-22T00:00:00Z', 'N/A'],
          ['Samuel Green', 22, 'Chicago', '2023-03-10T00:00:00Z', 'N/A'],
          ['Alice Johnson', 30, 'Houston', '2020-07-18T00:00:00Z', 'N/A'],
        ],
      };
    },
  };

</script>
