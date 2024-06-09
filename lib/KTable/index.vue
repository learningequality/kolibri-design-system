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
            :aria-sort="sortable ? getAriaSort(index) : null"
            :class="{ sortable: sortable && header.dataType !== DATA_TYPE_OTHERS }"
            @click="sortable ? handleSort(index) : null"
            @keydown="handleKeydown($event, -1, index)"
          >
            <slot name="header" :header="header" :index="index">
              {{ header.label }}
            </slot>
            <span v-if="sortable && header.dataType !== DATA_TYPE_OTHERS" class="sort-icon">
              <span v-if="sortKey === index && sortOrder === SORT_ORDER_ASC"><KIcon icon="dropup" /></span>
              <span v-else-if="sortKey === index && sortOrder === SORT_ORDER_DESC"><KIcon icon="dropdown" /></span>
              <span v-else>⬍</span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in finalRows" :key="rowIndex">
          <KTableGridItem
            v-for="(col, colIndex) in row"
            :key="colIndex"
            :content="col"
            :dataType="headers[colIndex].dataType"
            :rowIndex="rowIndex"
            :colIndex="colIndex"
            @keydown="handleKeydown($event, rowIndex, colIndex)"
          >
            <template #default="slotProps">
              <slot name="cell" :content="slotProps.content" :rowIndex="rowIndex" :colIndex="colIndex">
                {{ slotProps.content }}
              </slot>
            </template>
          </KTableGridItem>
        </tr>
      </tbody>
    </table>
  </div>

</template>


<script>

  import { ref, computed } from '@vue/composition-api';
  import useSorting, { SORT_ORDER_ASC, SORT_ORDER_DESC, DATA_TYPE_OTHERS } from './useSorting';
  import KTableGridItem from './KTableGridItem.vue';

  export default {
    name: 'KTable',
    components: {
      KTableGridItem,
    },
    setup(props) {
      const headers = ref(props.headers);
      const rows = ref(props.rows);
      const useLocalSorting = ref(props.useLocalSorting);

      const { sortKey, sortOrder, sortedRows, handleSort, getAriaSort } = useSorting(
        headers,
        rows,
        useLocalSorting
      );

      const finalRows = computed(() => {
        if (props.sortable) {
          return useLocalSorting.value ? sortedRows.value : rows.value;
        } else {
          return rows.value;
        }
      });

      return {
        sortKey,
        sortOrder,
        finalRows,
        handleSort,
        getAriaSort,
        SORT_ORDER_ASC,
        SORT_ORDER_DESC,
        DATA_TYPE_OTHERS,
      };
    },
    props: {
      headers: {
        type: Array,
        required: true,
        validator: function(value) {
          return value.every(
            header =>
              ['label', 'dataType'].every(key => key in header) &&
              ['string', 'numeric', 'date', 'others'].includes(header.dataType)
          );
        },
      },
      rows: {
        type: Array,
        required: true,
      },
      caption: {
        type: String,
        required: true,
        default: 'Information',
      },
      useLocalSorting: {
        type: Boolean,
        default: false,
      },
      sortable: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      handleKeydown(event, rowIndex, colIndex) {
        const key = event.key;
        const totalRows = this.rows.length;
        const totalCols = this.headers.length;

        let nextRowIndex = rowIndex;
        let nextColIndex = colIndex;

        switch (key) {
          case 'ArrowUp':
            if (rowIndex === 0) {
              this.focusHeader(colIndex);
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
              nextColIndex = colIndex > 0 ? colIndex - 1 : totalCols - 1;
            } else if (colIndex > 0) {
              nextColIndex = colIndex - 1;
            } else {
              nextColIndex = totalCols - 1;
              nextRowIndex = rowIndex > 0 ? rowIndex - 1 : -1;
            }
            break;
          case 'ArrowRight':
            if (rowIndex === -1) {
              if (colIndex < totalCols - 1) {
                nextColIndex = colIndex + 1;
              } else {
                nextRowIndex = 0;
                nextColIndex = 0;
              }
            } else if (colIndex < totalCols - 1) {
              nextColIndex = colIndex + 1;
            } else {
              nextColIndex = 0;
              nextRowIndex = (rowIndex + 1) % totalRows;
            }
            break;
          case 'Enter':
            if (rowIndex === -1 && this.sortable) {
              this.handleSort(colIndex);
            }
            break;
          default:
            return;
        }

        this.focusCell(nextRowIndex, nextColIndex);
        event.preventDefault();
      },
      focusHeader(colIndex) {
        const nextHeader = this.$el.querySelector(`thead th:nth-child(${colIndex + 1})`);
        if (nextHeader) {
          nextHeader.focus();
        }
      },
      focusCell(rowIndex, colIndex) {
        let nextCell;
        if (rowIndex === -1) {
          nextCell = this.$el.querySelector(`thead th:nth-child(${colIndex + 1})`);
        } else {
          nextCell = this.$el.querySelector(
            `tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1})`
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
  border-collapse: collapse;
}

.k-table th,
.k-table td {
  padding: 10px;
  border: none;
}

.k-table th {
  cursor: pointer;
}

.k-table th.sortable {
  cursor: pointer;
}

.k-table td:focus,
.k-table th:focus {
  outline: 2px solid #007bff;
  outline-offset: -2px;
  z-index: 1;
  position: relative;
}
</style>