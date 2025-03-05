<template>

  <KTable
    :headers="headersWithCustomWidths"
    :rows="customRows"
    caption="Table showing columns with custom widths"
    sortable
  />

</template>


<script>

  export default {
    data() {
      return {
        headersWithCustomWidths: [
          { label: 'Name', dataType: 'string', minWidth: '20px', width: '2%', columnId: 'name' },
          { label: 'Age', dataType: 'number', minWidth: '100px', width: '33%', columnId: 'age' },
          { label: 'City', dataType: 'string', minWidth: '200px', width: '25%', columnId: 'city' },
          {
            label: 'Joined',
            dataType: 'date',
            minWidth: '150px',
            width: '20%',
            columnId: 'joined',
          },
          {
            label: 'Misc',
            dataType: 'undefined',
            minWidth: '100px',
            width: '20%',
            columnId: 'misc',
          },
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
