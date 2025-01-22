<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        The <code>KTable</code> component is an accessible and customizable table component designed
        to handle a variety of data presentation needs. The component is suitable for both simple
        and complex data tables. It offers:
      </p>
      <ul>
        <li>Offers built-in sorting by default</li>
        <li>Integrates with already sorted data</li>
        <li>Keyboard navigation</li>
        <li>Dynamic column resizing</li>
        <li>Sticky headers</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <!--Non-Sortable Table-->
      <h3>Table without sorting functionality</h3>
      <p>
        This is an example to show how <code>KTable</code> can be used without any sorting
        functionality, as a simple table.
      </p>

      <DocsShowCode language="html">
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Non Sortable Table"
        />
      </DocsShowCode>

      <!-- eslint-disable-->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
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
              ]
            };
        },
      </DocsShowCode>
      <!-- eslint-enable -->

      <DocsShow block>
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Non-sortable table"
        />
      </DocsShow>

      <!-- Frontend Sorting Example-->
      <h3>Table with sorting</h3>
      <p>
        The <code>KTable</code> offers built-in sorting functionality. There are 4 permissible data
        types - <code>string</code>,<code>number</code>,<code>date</code> and
        <code>undefined</code>. Columns declared with <code>undefined</code> data type are not
        sortable. This example demonstrates a table with sorting enabled via the
        <code>sortable</code> prop.
      </p>
      <p>
        Clicking the same header multiple times toggles the sort direction cyclically in the order
        of ascending, descending, and unsorted.
      </p>

      <DocsShowCode language="html">
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Table with built-in sorting"
          sortable
        />
      </DocsShowCode>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
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
            ]
          };
        },
      </DocsShowCode>
      <!-- eslint-enable -->

      <DocsShow block>
        <KTable
          :headers="headers"
          :rows="rows"
          caption="In-Built Sorting Table"
          sortable
        />
      </DocsShow>

      <!--Table showing use of slots-->
      <h3>Table showing use of slots</h3>
      <p>
        This is an example to show how slots can be used in <code>KTable</code>. The table currently
        provides slots for <code>header</code> and <code>cell</code> which can be used to customize
        the table header and cell content respectively.
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

      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        data() {
          return {
            slotHeaders: [
              { label: 'Name', dataType: 'string', columnId: 'name' },
              { label: 'Age', dataType: 'number', columnId: 'age' },
              { label: 'City', dataType: 'string', columnId: 'city' },
              { label: 'Joined', dataType: 'date', columnId: 'joined' },
              { label: 'Misc', dataType: 'undefined', columnId: 'misc' },
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
        This is an example to show how <code>KTable</code> can be used with custom column widths.
        The column widths are defined in the <code>headers</code> prop. The
        <code>width</code> property is used to define the overall width of the column. The
        <code>minWidth</code> defines the minimum width of column, below which the column will not
        shrink.
      </p>

      <DocsShow loadExample="examples/KTable/CustomWidth" />

      <!--Table with default sort-->
      <h3>Table with default sort</h3>
      <p>
        This is an example to show how to use the <code>defaultSort</code> prop to sort the table
        based on a particular column upon the initial load. The <code>defaultSort</code> attribute
        can be used irrespective of the <code>sortable</code> attribute.
      </p>

      <p>
        The <code>defaultSort</code> attribute takes an object with two properties -
        <code>columnId</code> and <code>direction</code>. The <code>columnId</code> is the unique
        identifier of the column based on which the table should be sorted. The
        <code>direction</code> can be either <code>asc</code> or <code>desc</code>.
      </p>

      <p>
        To make use of <code>defaultSort</code>, please ensure that the
        <code>disableBuiltinSorting</code> attribute is not set to <code>true</code>.
      </p>

      <DocsShowCode language="html">
        <h4>Sortable table with rows sorted by 'Age' column</h4>
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Sortable Table with Rows Sorted by 'Age' Column"
          sortable
          :defaultSort="{ columnId: 'age', direction: 'asc' }"
        />

        <h4>Unsortable table with rows sorted by 'Age' column</h4>
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Unsortable Table with Rows Sorted by 'Age' Column"
          :defaultSort="{ columnId: 'age', direction: 'asc' }"
        />
      </DocsShowCode>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
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
            ]
          };
        },
      </DocsShowCode>
      <!-- eslint-enable -->

      <DocsShow block>
        <h4>Sortable Table with Rows Sorted by 'Age' Column</h4>
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Sortable Table with Rows Sorted by 'Age' Column"
          sortable
          :defaultSort="{ columnId: 'age', direction: 'asc' }"
        />

        <h4>Unsortable Table with Rows Sorted by 'Age' Column</h4>
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Unsortable Table with Rows Sorted by 'Age' Column"
          :defaultSort="{ columnId: 'age', direction: 'asc' }"
        />
      </DocsShow>

      <!-- Disable built-in sorting -->
      <h3>Disable built-in sorting</h3>
      <p>
        For <code>sortable</code> tables, you can use the <code>disableBuiltinSorting</code> prop to
        disable built-in sort function. This is useful when the table receives already sorted data,
        for example when sorting is done by backend or a custom sorting function outside the table.
        In this case, when one of the header sort buttons is clicked, the table won't sort the
        column itself, but only emit the <code>changeSort</code> event to notify the parent
        component to handle the sorting logic. The event contains column index of the header and the
        sort order in its payload.
      </p>

      <p>
        You should not use this attribute if <code>sortable</code> is set to <code>false</code>. If
        <code>sortable</code> is set to <code>true</code>, then the table component will emit a
        <code>changeSort</code> event with column index of the header clicked and the sort order to
        notify the parent component to handle the sorting logic.
      </p>

      <DocsShowCode language="html">
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Disable Builtin Sorting Example"
          sortable
          disableDefaultSorting
          @changeSort="changeSortHandler"
        />
      </DocsShowCode>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
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
            ]
          };
        },
        methods: {
          changeSortHandler(index, sortOrder) {
            console.log(`changeSort event emitted with index: ${index} and sortOrder: ${sortOrder}`);
          },
        },
      </DocsShowCode>
      <!-- eslint-enable -->

      <DocsShow block>
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Disable Builtin Sorting Example"
          sortable
          disableBuiltinSorting
          @changeSort="changeSortHandler"
        />
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
        slotHeaders: [
          { label: 'Name', dataType: 'string', columnId: 'name' },
          { label: 'Age', dataType: 'number', columnId: 'age' },
          { label: 'City', dataType: 'string', columnId: 'city' },
          { label: 'Joined', dataType: 'date', columnId: 'joined' },
          { label: 'Misc', dataType: 'undefined', columnId: 'misc' },
        ],
        slotRows: [
          ['John Doe', 28, 'New York', '2022-01-15T00:00:00Z', 'N/A'],
          ['Jane Smith', 34, 'Los Angeles', '2021-12-22T00:00:00Z', 'N/A'],
          ['Samuel Green', 22, 'Chicago', '2023-03-10T00:00:00Z', 'N/A'],
          ['Alice Johnson', 30, 'Houston', '2020-07-18T00:00:00Z', 'N/A'],
        ],
      };
    },
    methods: {
      changeSortHandler(index, sortOrder) {
        // eslint-disable-next-line no-console
        console.log(`changeSort event emitted with index: ${index} and sortOrder: ${sortOrder}`);
      },
    },
  };

</script>
