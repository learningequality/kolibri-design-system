<template>

  <div class="k-table">
    <table>
      <caption v-if="caption">
        {{ caption }}
      </caption>
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            tabindex="0"
            @click="handleSort(index)"
            @keydown="handleKeydown($event, -1, index)"
          >
            {{ header.label }}
            <span v-if="header.dataType !== 'others'" class="sort-icon">
              <span v-if="sortKey === index && sortOrder === 'asc'">⬆️</span>
              <span v-else-if="sortKey === index && sortOrder === 'desc'">⬇️</span>
              <span v-else>⬍</span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in sortedRows" :key="rowIndex">
          <KTableGridItem
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            :content="cell"
            :align="headers[cellIndex].dataType === 'numeric' ? 'right' : 'left'"
            :rowIndex="rowIndex"
            :cellIndex="cellIndex"
            @keydown="handleKeydown($event, rowIndex, cellIndex)"
          />
        </tr>
      </tbody>
    </table>
  </div>

</template>


<script>

  import KTableGridItem from './KTableGridItem.vue';

  export default {
    name: 'KTable',
    components: {
      KTableGridItem,
    },
    props: {
      headers: {
        type: Array,
        required: true,
      },
      rows: {
        type: Array,
        required: true,
      },
      caption: {
        type: String,
        required: false,
      },
    },
    data() {
      return {
        sortKey: null,
        sortOrder: 'asc',
      };
    },
    computed: {
      sortedRows() {
        if (this.sortKey === null) return this.rows;

        const sortedRows = [...this.rows];
        const sortHeader = this.headers[this.sortKey];

        if (sortHeader.dataType === 'numeric') {
          sortedRows.sort((a, b) => a[this.sortKey] - b[this.sortKey]);
        } else if (sortHeader.dataType === 'string' || sortHeader.dataType === 'date') {
          sortedRows.sort((a, b) => a[this.sortKey].localeCompare(b[this.sortKey]));
        }

        if (this.sortOrder === 'desc') {
          sortedRows.reverse();
        }

        return sortedRows;
      },
    },
    methods: {
      handleSort(index) {
        const clickedElement = event.target.tagName.toLowerCase();
        if (clickedElement !== 'th' || this.headers[index].dataType === 'others') return;

        if (this.sortKey === index) {
          this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortKey = index;
          this.sortOrder = 'asc';
        }
      },
      handleKeydown(event, rowIndex, cellIndex) {
        const key = event.key;
        const totalRows = this.rows.length;
        const totalCols = this.headers.length;

        let nextRowIndex = rowIndex;
        let nextCellIndex = cellIndex;

        switch (key) {
          case 'ArrowUp':
            if (rowIndex === 0) {
              this.focusHeader(cellIndex);
              return;
            } else if (rowIndex > 0) {
              nextRowIndex = rowIndex - 1;
            } else {
              return;
            }
            break;
          case 'ArrowDown':
            if (rowIndex === -1) {
              nextRowIndex = 0;
            } else {
              nextRowIndex = (rowIndex + 1) % totalRows;
            }
            break;
          case 'ArrowLeft':
            if (rowIndex === -1) {
              nextCellIndex = cellIndex > 0 ? cellIndex - 1 : totalCols - 1;
            } else if (cellIndex > 0) {
              nextCellIndex = cellIndex - 1;
            } else {
              nextCellIndex = totalCols - 1;
              nextRowIndex = rowIndex > 0 ? rowIndex - 1 : -1; // Move to the header row if needed
            }
            break;
          case 'ArrowRight':
            if (rowIndex === -1) {
              if (cellIndex < totalCols - 1) {
                nextCellIndex = cellIndex + 1;
              } else {
                nextRowIndex = 0;
                nextCellIndex = 0;
              }
            } else if (cellIndex < totalCols - 1) {
              nextCellIndex = cellIndex + 1;
            } else {
              nextCellIndex = 0;
              nextRowIndex = (rowIndex + 1) % totalRows;
            }
            break;
          case 'Enter':
            this.handleSort(cellIndex);
            break;
          default:
            return;
        }

        this.focusCell(nextRowIndex, nextCellIndex);
        event.preventDefault();
      },

      focusHeader(cellIndex) {
        const nextHeader = this.$el.querySelector(`thead th:nth-child(${cellIndex + 1})`);
        if (nextHeader) {
          nextHeader.focus();
        }
      },
      focusCell(rowIndex, cellIndex) {
        let nextCell;
        if (rowIndex === -1) {
          nextCell = this.$el.querySelector(`thead th:nth-child(${cellIndex + 1})`);
        } else {
          nextCell = this.$el.querySelector(
            `tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${cellIndex + 1})`
          );
        }
        if (nextCell) {
          nextCell.focus();
        }
      },
    },
  };

</script>


<style scoped>
.k-table {
  margin: 20px;
}

.k-table table {
  width: 100%;
  border: 2px solid #ccc;
  border-collapse: separate;
  border-spacing: 0;
}

.k-table th,
.k-table td {
  padding: 15px;
  text-align: left;
  position: relative;
}

.k-table th {
  background-color: #f2f2f2;
  border-bottom: 2px solid #ccc;
  cursor: pointer;
}

.k-table td {
  border-bottom: 1px solid #eee;
}

.k-table th:focus,
.k-table td:focus {
  outline: 2px solid #007bff;
  outline-offset: -2px;
}

.sort-icon {
  margin-left: 8px;
}


</style>