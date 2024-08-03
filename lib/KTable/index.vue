<template>

  <div class="k-table-wrapper">
    <table class="k-table" role="grid">
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
            :class="{
              [$computedClass(coreOutlineFocus)]: true,
              sortable: sortable && header.dataType !== DATA_TYPE_OTHERS,
              'sticky-header': true,
              'sticky-column': index === 0,
            }"
            :style="[getHeaderStyle(header),
                     index === 0 ? { backgroundColor: $themePalette.white } : {} ,
                     focusedColIndex === index ? { backgroundColor: $themePalette.grey.v_50 } : {}]"
            role="columnheader"
            :aria-colindex="index + 1"
            @click="sortable && header.dataType !== DATA_TYPE_OTHERS ? handleSort(index) : null"
            @keydown="handleKeydown($event, -1, index)"
          >
            <slot name="header" :header="header" :index="index">
              {{ header.label }}
            </slot>
            <span v-if="sortable && header.dataType !== DATA_TYPE_OTHERS" class="sort-icon">
              <span v-if="sortKey === index && sortOrder === SORT_ORDER_ASC"><KIcon icon="dropup" /></span>
              <span v-else-if="sortKey === index && sortOrder === SORT_ORDER_DESC"><KIcon icon="dropdown" /></span>
              <span v-else><KIcon icon="sortColumn" /></span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in finalRows"
          :key="rowIndex"
          :style="hoveredRowIndex === rowIndex || focusedRowIndex === rowIndex ? { backgroundColor: $themePalette.grey.v_50 } : {}"
          @mouseover="handleRowMouseOver(rowIndex)"
          @mouseleave="handleRowMouseLeave"
        >
          <KTableGridItem
            v-for="(col, colIndex) in row"
            :key="colIndex"
            :content="col"
            :dataType="headers[colIndex].dataType"
            :minWidth="headers[colIndex].minWidth"
            :width="headers[colIndex].width"
            :rowIndex="rowIndex"
            :colIndex="colIndex"
            :class="{
              'sticky-column': colIndex === 0,
            }"
            :style="[colIndex === 0 ? { backgroundColor: $themePalette.white } : {},(hoveredRowIndex === rowIndex || focusedRowIndex === rowIndex) && colIndex === 0 ? { backgroundColor: $themePalette.grey.v_50 } : {}
            ]"
            role="gridcell"
            :aria-colindex="colIndex + 1"
            @keydown="handleKeydown($event, rowIndex, colIndex)"
          >
            <template #default="slotProps">
              <slot name="cell" :content="slotProps.content" :rowIndex="rowIndex" :colIndex="colIndex" :row="row">
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
        if (headers.value[index].dataType === DATA_TYPE_OTHERS) {
          return;
        }
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

      const getHeaderStyle = header => {
        const style = {};
        if (header.minWidth) style.minWidth = header.minWidth;
        if (header.width) style.width = header.width;
        return style;
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
        getHeaderStyle,
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
    data() {
      return {
        focusedRowIndex: null,
        focusedColIndex: null,
        hoveredRowIndex: null,
      };
    },
    computed: {
      coreOutlineFocus() {
        return {
          ':focus': {
            ...this.$coreOutline,
            outlineOffset: '-2px',
          },
        };
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
          case 'Tab': //To handle focused row and highlight header state for tab key as well
            if (event.shiftKey) {
              nextColIndex = colIndex > 0 ? colIndex - 1 : totalCols - 1;
              nextRowIndex = colIndex > 0 ? rowIndex : rowIndex - 1;
            } else {
              nextColIndex = (colIndex + 1) % totalCols;
              nextRowIndex = colIndex === totalCols - 1 ? rowIndex + 1 : rowIndex;
            }
            break;
          default:
            return;
        }

        this.focusCell(nextRowIndex, nextColIndex);
        this.focusedRowIndex = nextRowIndex === -1 ? null : nextRowIndex;
        this.focusedColIndex = nextColIndex;

        this.highlightHeader(nextColIndex);

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
        /* Ensured the focused cell is smoothly scrolled into view.
           Adjusted the scroll position to account for the height of the sticky header
           to prevent the focused cell from being overlapped by the header. */
        if (nextCell) {
          nextCell.focus();
          nextCell.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });

          // Adjust scroll position to account for sticky header height
          if (rowIndex !== -1) {
            const tableWrapper = this.$el.closest('.k-table-wrapper');
            const headerHeight = this.$el.querySelector('thead').offsetHeight;
            const wrapperRect = tableWrapper.getBoundingClientRect();
            const cellRect = nextCell.getBoundingClientRect();

            // Adjust for vertical scrolling if the cell is hidden behind the sticky header
            if (cellRect.top < wrapperRect.top + headerHeight) {
              tableWrapper.scrollTop -= wrapperRect.top + headerHeight - cellRect.top;
            }

            // Adjust for horizontal scrolling if the cell is hidden behind the sticky column
            const stickyColumnWidth = this.$el.querySelector('.sticky-column').offsetWidth;
            if (cellRect.left < wrapperRect.left + stickyColumnWidth) {
              tableWrapper.scrollLeft -= wrapperRect.left + stickyColumnWidth - cellRect.left;
            } else if (cellRect.right > wrapperRect.right) {
              tableWrapper.scrollLeft += cellRect.right - wrapperRect.right;
            }
          }
        }
      },
      handleRowMouseOver(rowIndex) {
        this.hoveredRowIndex = rowIndex;
      },
      handleRowMouseLeave() {
        this.hoveredRowIndex = null;
      },
      setHighlightHeader(header, highlight) {
        header.style.backgroundColor = highlight ? this.$themePalette.grey.v_50 : '';
      },
      highlightHeader(colIndex) {
        const headers = this.$el.querySelectorAll('thead th');
        headers.forEach((header, index) => {
          this.setHighlightHeader(header, index === colIndex);
        });
      },
    },
  };

</script>


<style scoped>
.k-table-wrapper {
  overflow: auto;
  position: relative;
  height: 300px;
}

.k-table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 8px;
  position: relative;
  z-index: auto;
}

.sticky-header {
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 3;
}

.sticky-column {
  position: sticky;
  left: 0;
  z-index: 2;
}

th.sticky-header.sticky-column,
td.sticky-header.sticky-column {
  z-index: 4;
}

.sortable {
  cursor: pointer;
}
th:focus {
  z-index: 1;
  position: relative;
}
</style>