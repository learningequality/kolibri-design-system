<template>

  <div>
    <h3>Dropshadow Test - Sticky Columns with Wide Content</h3>
    <div style="width: 700px; height: 300px; border: 1px solid #cccccc">
      <KTable
        :headers="wideHeaders"
        :rows="sampleRows"
        :stickyColumns="['firstTwo', 'last']"
        caption="Table with dropshadow indicators on sticky columns"
        sortable
      />
    </div>
    <p><small>Scroll horizontally to see dropshadows appear on sticky columns</small></p>
  </div>

</template>


<script>

  export default {
    name: 'KTableDropshadowVisualTest',
    data() {
      return {
        wideHeaders: [
          { label: 'ID', dataType: 'number', minWidth: '80px', columnId: 'id' },
          { label: 'Name', dataType: 'string', minWidth: '140px', columnId: 'name' },
          { label: 'Department', dataType: 'string', minWidth: '180px', columnId: 'department' },
          { label: 'Position', dataType: 'string', minWidth: '160px', columnId: 'position' },
          { label: 'Location', dataType: 'string', minWidth: '160px', columnId: 'location' },
          { label: 'Start Date', dataType: 'date', minWidth: '140px', columnId: 'startDate' },
          { label: 'Salary', dataType: 'number', minWidth: '120px', columnId: 'salary' },
          { label: 'Manager', dataType: 'string', minWidth: '140px', columnId: 'manager' },
          { label: 'Actions', dataType: 'undefined', minWidth: '100px', columnId: 'actions' },
        ],
        sampleRows: [
          [
            1,
            'John Doe',
            'Engineering',
            'Senior Engineer',
            'New York',
            '2022-01-15',
            95000,
            'Sarah Connor',
            'Edit',
          ],
          [
            2,
            'Jane Smith',
            'Design',
            'UX Designer',
            'Los Angeles',
            '2021-12-22',
            85000,
            'Mike Johnson',
            'Edit',
          ],
          [
            3,
            'Samuel Green',
            'Engineering',
            'Junior Developer',
            'Chicago',
            '2023-03-10',
            65000,
            'Sarah Connor',
            'Edit',
          ],
          [
            4,
            'Alice Johnson',
            'Marketing',
            'Product Manager',
            'Houston',
            '2020-07-18',
            105000,
            'David Wilson',
            'Edit',
          ],
          [
            5,
            'Bob Wilson',
            'Sales',
            'Account Executive',
            'Miami',
            '2022-05-20',
            75000,
            'Lisa Brown',
            'Edit',
          ],
        ],
      };
    },
  };

</script>
