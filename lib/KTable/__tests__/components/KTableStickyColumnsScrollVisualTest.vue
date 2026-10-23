<template>

  <div style="width: 800px; height: 400px; border: 1px solid #cccccc">
    <KTable
      :headers="wideHeaders"
      :rows="sampleRows"
      :stickyColumns="['firstTwo', 'last']"
      caption="Table with first two and last columns sticky - scrollable"
      sortable
    />
  </div>

</template>


<script>

  export default {
    name: 'KTableStickyColumnsScrollVisualTest',
    data() {
      return {
        wideHeaders: [
          { label: 'Name', dataType: 'string', minWidth: '140px', columnId: 'name' },
          { label: 'Age', dataType: 'number', minWidth: '80px', columnId: 'age' },
          { label: 'City', dataType: 'string', minWidth: '200px', columnId: 'city' },
          { label: 'Country', dataType: 'string', minWidth: '150px', columnId: 'country' },
          { label: 'Profession', dataType: 'string', minWidth: '180px', columnId: 'profession' },
          { label: 'Company', dataType: 'string', minWidth: '200px', columnId: 'company' },
          { label: 'Email', dataType: 'string', minWidth: '250px', columnId: 'email' },
          { label: 'Phone', dataType: 'string', minWidth: '150px', columnId: 'phone' },
          { label: 'Actions', dataType: 'undefined', minWidth: '120px', columnId: 'actions' },
        ],
        sampleRows: [
          [
            'John Doe',
            28,
            'New York',
            'USA',
            'Engineer',
            'TechCorp',
            'john.doe@example.com',
            '+1-555-0123',
            'Edit/Delete',
          ],
          [
            'Jane Smith',
            34,
            'Los Angeles',
            'USA',
            'Designer',
            'DesignCo',
            'jane.smith@example.com',
            '+1-555-0124',
            'Edit/Delete',
          ],
          [
            'Samuel Green',
            22,
            'Chicago',
            'USA',
            'Developer',
            'CodeWorks',
            'sam.green@example.com',
            '+1-555-0125',
            'Edit/Delete',
          ],
          [
            'Alice Johnson',
            30,
            'Houston',
            'USA',
            'Manager',
            'ManageCorp',
            'alice.johnson@example.com',
            '+1-555-0126',
            'Edit/Delete',
          ],
          [
            'Bob Wilson',
            45,
            'Miami',
            'USA',
            'Analyst',
            'DataFlow',
            'bob.wilson@example.com',
            '+1-555-0127',
            'Edit/Delete',
          ],
        ],
      };
    },
  };

</script>
