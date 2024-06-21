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
            :aria-sort="sortable && header.dataType !== DATA_TYPE_OTHERS ? getAriaSort(index) : null"
            :class="{ sortable: sortable && header.dataType !== DATA_TYPE_OTHERS }"
            @click="sortable && header.dataType !== DATA_TYPE_OTHERS ? handleSort(index) : null"
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

  import { ref, computed, watch } from '@vue/composition-api';
  import useSorting, {
    SORT_ORDER_ASC,
    SORT_ORDER_DESC,
    DATA_TYPE_OTHERS,
  } from '../composables/useSorting';
  import KTableGridItem from './KTableGridItem.vue';

  export default {
    name: 'KTable',
    components: {
      KTableGridItem,
    },
    setup(props, { emit }) {
      const headers = ref(props.headers);
      const rows = ref(props.rows);
      const useLocalSorting = ref(props.useLocalSorting);

      const {
        sortKey,
        sortOrder,
        sortedRows,
        handleSort: localHandleSort,
        getAriaSort,
      } = useSorting(headers, rows, useLocalSorting);

      const finalRows = computed(() => {
        if (props.sortable) {
          return useLocalSorting.value ? sortedRows.value : rows.value;
        } else {
          return rows.value;
        }
      });

      watch(
        () => props.rows,
        newRows => {
          rows.value = newRows;
        }
      );

      const handleSort = index => {
        if (useLocalSorting.value) {
          localHandleSort(index);
        } else {
          emit(
            'changeSort',
            index,
            sortOrder.value === SORT_ORDER_ASC ? SORT_ORDER_DESC : SORT_ORDER_ASC
          );
        }
      };

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
      },
      rows: {
        type: Array,
        required: true,
      },
      caption: {
        type: String,
        required: true,
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
            if (rowIndex === -1) {
              nextRowIndex = totalRows - 1;
            } else {
              nextRowIndex = rowIndex - 1;
            }
            break;
          case 'ArrowDown':
            if (rowIndex === -1) {
              nextRowIndex = 0;
            } else if (rowIndex === totalRows - 1) {
              nextRowIndex = -1;
            } else {
              nextRowIndex = (rowIndex + 1) % totalRows;
            }
            break;
          case 'ArrowLeft':
            if (rowIndex === -1) {
              if (colIndex > 0) {
                nextColIndex = colIndex - 1;
              } else {
                nextColIndex = totalCols - 1;
                nextRowIndex = totalRows - 1;
              }
            } else if (colIndex > 0) {
              nextColIndex = colIndex - 1;
            } else {
              nextColIndex = totalCols - 1;
              nextRowIndex = rowIndex > 0 ? rowIndex - 1 : -1;
            }
            break;
          case 'ArrowRight':
            if (colIndex === totalCols - 1) {
              if (rowIndex === totalRows - 1) {
                nextColIndex = 0;
                nextRowIndex = -1;
              } else {
                nextColIndex = 0;
                nextRowIndex = rowIndex + 1;
              }
            } else {
              nextColIndex = colIndex + 1;
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