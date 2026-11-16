<template>

  <div style="width: 600px; height: 300px; border: 1px solid #cccccc">
    <KTable
      :headers="wideHeaders"
      :rows="sampleRows"
      :stickyColumns="['first']"
      caption="Table with sticky first column"
      sortable
    />
  </div>

</template>


<script>

  export default {
    name: 'KTableStickyColumnsVisualTest',
    data() {
      return {
        wideHeaders: [
          { label: 'Name', dataType: 'string', minWidth: '120px', columnId: 'name' },
          { label: 'Age', dataType: 'number', minWidth: '100px', columnId: 'age' },
          { label: 'City', dataType: 'string', minWidth: '200px', columnId: 'city' },
          { label: 'Country', dataType: 'string', minWidth: '150px', columnId: 'country' },
          { label: 'Profession', dataType: 'string', minWidth: '180px', columnId: 'profession' },
          { label: 'Email', dataType: 'string', minWidth: '250px', columnId: 'email' },
          { label: 'Phone', dataType: 'string', minWidth: '150px', columnId: 'phone' },
        ],
        sampleRows: [
          ['John Doe', 28, 'New York', 'USA', 'Engineer', 'john.doe@example.com', '+1-555-0123'],
          [
            'Jane Smith',
            34,
            'Los Angeles',
            'USA',
            'Designer',
            'jane.smith@example.com',
            '+1-555-0124',
          ],
          [
            'Samuel Green',
            22,
            'Chicago',
            'USA',
            'Developer',
            'sam.green@example.com',
            '+1-555-0125',
          ],
          [
            'Alice Johnson',
            30,
            'Houston',
            'USA',
            'Manager',
            'alice.johnson@example.com',
            '+1-555-0126',
          ],
        ],
      };
    },
  };

</script>
