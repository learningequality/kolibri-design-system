<template>

  <div>
    <h3>Regular Table (no sticky columns)</h3>
    <div style="width: 600px; height: 200px; overflow: auto; border: 1px solid #cccccc">
      <KTable
        :headers="headers"
        :rows="mixedContentRows"
        caption="Regular table - cell height test"
      />
    </div>

    <h3>Sticky Columns Table</h3>
    <div style="width: 600px; height: 200px; overflow: auto; border: 1px solid #cccccc">
      <KTable
        :headers="headers"
        :rows="mixedContentRows"
        :stickyColumns="['first']"
        caption="Sticky columns table - cell height test"
      />
    </div>
  </div>

</template>


<script>

  export default {
    name: 'KTableCellHeightVisualTest',
    data() {
      return {
        headers: [
          { label: 'Name', dataType: 'string', minWidth: '120px', columnId: 'name' },
          { label: 'Short', dataType: 'string', minWidth: '80px', columnId: 'short' },
          { label: 'Long Content', dataType: 'string', minWidth: '200px', columnId: 'long' },
          { label: 'Number', dataType: 'number', minWidth: '100px', columnId: 'number' },
        ],
        mixedContentRows: [
          ['John', 'A', 'This is a longer piece of content that should wrap', 42],
          ['Jane Smith', 'B', 'Short', 156],
          ['Very Long Name Here', 'C', 'Medium length content here', 789],
          [
            'Bob',
            'D',
            'Another long piece of content that demonstrates text wrapping in table cells',
            23,
          ],
        ],
      };
    },
  };

</script>
