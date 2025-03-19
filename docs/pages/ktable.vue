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

      <DocsExample
        loadExample="KTable/Base.vue"
        exampleId="base"
        block
      />

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

      <DocsExample
        loadExample="KTable/Sortable.vue"
        exampleId="sortable"
        block
      />

      <!--Table showing use of slots-->
      <h3>Table showing use of slots</h3>
      <p>
        This is an example to show how slots can be used in <code>KTable</code>. The table currently
        provides slots for <code>header</code> and <code>cell</code> which can be used to customize
        the table header and cell content respectively.
      </p>

      <DocsExample
        loadExample="KTable/Slots.vue"
        exampleId="slots"
        block
      />

      <!--Table with custom column widths-->
      <h3>Table with custom column widths</h3>
      <p>
        This is an example to show how <code>KTable</code> can be used with custom column widths.
        The column widths are defined in the <code>headers</code> prop. The
        <code>width</code> property is used to define the overall width of the column. The
        <code>minWidth</code> defines the minimum width of column, below which the column will not
        shrink.
      </p>

      <DocsExample
        loadExample="KTable/CustomWidth.vue"
        exampleId="custom-width"
        block
      />

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

      <DocsExample
        loadExample="KTable/DefaultSort.vue"
        exampleId="default-sort"
        block
      />

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

      <DocsExample
        loadExample="KTable/DisableBuiltinSort.vue"
        exampleId="disable-builtin-sort"
        block
      />
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {
    name: 'DocsKTable',
  };

</script>
