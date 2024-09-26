<template>

  <div ref="tableWrapper" class="k-table-wrapper">
    <template v-if="dataLoading">
      <p><KCircularLoader /></p>
    </template>
    <template v-else>
      <table v-if="!isTableEmpty" class="k-table" role="grid">
        <caption v-if="caption" class="visuallyhidden">
          {{ caption }}
        </caption>
        <thead>
          <tr ref="stickyHeader">
            <th
              v-for="(header, index) in headers"
              :ref="'header-' + index"
              :key="index"
              tabindex="0"
              :aria-sort="isColumnSortable(index) ? getAriaSort(index) : null"
              :class="{
                [$computedClass(coreOutlineFocus)]: true,
                sortable: isColumnSortable(index),
                'sticky-header': true,
                'sticky-column': index === 0,
              }"
              :style="[getHeaderStyle(header),
                       isColumnSortActive(index) ? { color: $themeBrand.primary.v_1000 } : { color: $themePalette.grey.v_800 },
                       { backgroundColor: $themePalette.white } ,
                       isColumnFocused(index) ? { backgroundColor: $themePalette.grey.v_50 } : {},
                       { textAlign: getTextAlign(header.dataType) }]"
              role="columnheader"
              data-focus="true"
              :aria-colindex="index + 1"
              @click="sortable ? handleSort(index) : null"
              @keydown="handleKeydown($event, -1, index)"
            >
              <!--@slot Scoped slot for customizing the content of each header cell. Provides a header object `header` and its column index `colIndex`.-->
              <slot name="header" :header="header" :colIndex="index">
                {{ header.label }}
              </slot>
              <span v-if="isColumnSortable(index)" class="sort-icon">
                <span v-if="isColumnSortActive(index) && sortOrder === SORT_ORDER_ASC"><KIcon icon="dropup" :color="isColumnSortActive(index) ? $themeBrand.primary.v_1100 : $themePalette.grey.v_800 " /></span>
                <span v-else-if="isColumnSortActive(index) && sortOrder === SORT_ORDER_DESC"><KIcon icon="dropdown" :color="isColumnSortActive(index) ? $themeBrand.primary.v_1100 : $themePalette.grey.v_800 " /></span>
                <span v-else><KIcon icon="sortColumn" :color="$themePalette.grey.v_800" /></span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in finalRows"
            :key="rowIndex"
            :style="getRowStyle(rowIndex)"
            @mouseover="handleRowMouseOver(rowIndex)"
            @mouseleave="handleRowMouseLeave"
          >
            <KTableGridItem
              v-for="(col, colIndex) in row"
              :ref="'cell-' + rowIndex + '-' + colIndex"
              :key="colIndex"
              :content="col"
              :dataType="headers[colIndex].dataType"
              :minWidth="headers[colIndex].minWidth"
              :width="headers[colIndex].width"
              :rowIndex="rowIndex"
              :colIndex="colIndex"
              :textAlign="getTextAlign(headers[colIndex].dataType)"
              :class="{
                'sticky-column': colIndex === 0,
              }"
              :style="getCellStyle(rowIndex, colIndex)"
              data-focus="true"
              role="gridcell"
              :aria-colindex="colIndex + 1"
              @keydown="handleKeydown($event, rowIndex, colIndex)"
            >
              <template #default="slotProps">
                <!--@slot Scoped slot for customizing the content of each data cell. Provides the content of a data cell `content`, its row index `rowIndex`, its column index `colIndex`, and the corresponding whole row object `row`.-->
                <slot name="cell" :content="slotProps.content" :rowIndex="rowIndex" :colIndex="colIndex" :row="row">
                  {{ slotProps.content }}
                </slot>
              </template>
            </KTableGridItem>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-message">
        {{ emptyMessage }}
      </div>
    </template>
  </div>

</template>


<script>

  import { ref, computed, watch } from '@vue/composition-api';
  import useSorting, {
    SORT_ORDER_ASC,
    SORT_ORDER_DESC,
    DATA_TYPE_OTHERS,
    DATA_TYPE_NUMERIC,
  } from './useSorting';
  import KTableGridItem from './KTableGridItem.vue';

  export default {
    name: 'KTable',
    components: {
      KTableGridItem,
    },
    setup(props, { emit }) {
      const headers = ref(props.headers);
      const rows = ref(props.rows);
      const useLocalSorting = ref(props.sortable && !props.disableDefaultSorting);
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

      const isTableEmpty = computed(() => finalRows.value.length === 0);

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
        isTableEmpty,
      };
    },
    /* eslint-disable kolibri/vue-no-unused-properties */
    props: {
      /**
       * An array of objects `{ label, dataType, minWidth, width }`representing the headers of the table. The `dataType` can be one of `'string'`, `'number'`, `'date'`, or `'undefined'`. `label` and `dataType` are required. `minWidth` and `width` are optional.
       */
      headers: {
        type: Array,
        required: true,
        validator: function(value) {
          return value.every(
            header =>
              ['label', 'dataType'].every(key => key in header) &&
              ['string', 'number', 'date', 'undefined'].includes(header.dataType)
          );
        },
      },
      /**
       * An array of arrays representing the rows of the table. Each row should have the same number of elements as the headers array.
       */
      rows: {
        type: Array,
        required: true,
      },
      /**
       * The caption of the table
       */
      caption: {
        type: String,
        required: true,
      },

      /**
       * Disables the default sorting when sortable is true. Facilitates integration with externally sorted data.
       */
      disableDefaultSorting: {
        type: Boolean,
        default: false,
      },
      /**
       * Enables or disables sorting functionality for the table headers.
       */
      sortable: {
        type: Boolean,
        default: false,
      },
      /**
       * The message to display when the table is empty.
       */
      emptyMessage: {
        type: String,
        default: 'No data available',
      },
      /**
       * Indicates whether the data is currently being loaded.
       */
      dataLoading: {
        type: Boolean,
        default: false,
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
      getRowStyle() {
        return rowIndex => {
          return this.hoveredRowIndex === rowIndex || this.focusedRowIndex === rowIndex
            ? { backgroundColor: this.$themePalette.grey.v_50 }
            : {};
        };
      },
      getCellStyle() {
        return (rowIndex, colIndex) => {
          const styles = [];
          if (colIndex === 0) {
            styles.push({ backgroundColor: this.$themePalette.white });
          }
          if (
            (this.hoveredRowIndex === rowIndex || this.focusedRowIndex === rowIndex) &&
            colIndex === 0
          ) {
            styles.push({ backgroundColor: this.$themePalette.grey.v_50 });
          }
          return styles;
        };
      },
      isColumnSortActive() {
        return colIndex => this.sortKey === colIndex;
      },
      isSortableColumn() {
        return colIndex => this.headers[colIndex].dataType !== DATA_TYPE_OTHERS;
      },
      isColumnFocused() {
        return colIndex => this.focusedColIndex === colIndex;
      },
      isColumnSortable() {
        return colIndex => this.sortable && this.headers[colIndex].dataType !== DATA_TYPE_OTHERS;
      },
    },
    methods: {
      /**
       * Takes care of
       *  - keyboard navigation focus trap
       *  - the arrow keys navigation flow
       *  - the tab keys navigation flow
       *  - access to focusable elements within a cell via tab and shift tab keys
       *  - triggering sort on the enter key
       *  - header highlight
       */
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
          case 'Tab': {
            // Identify all focusable elements inside the current cell
            const currentCell = this.getCell(rowIndex, colIndex);

            // Collect focusable elements using native DOM methods
            const focusableElements = [];

            if (currentCell) {
              const buttons = currentCell.getElementsByTagName('button');
              const links = currentCell.getElementsByTagName('a');
              const inputs = currentCell.getElementsByTagName('input');
              const selects = currentCell.getElementsByTagName('select');
              const textareas = currentCell.getElementsByTagName('textarea');

              focusableElements.push(...buttons, ...links, ...inputs, ...selects, ...textareas);
            }

            const focusedElementIndex = focusableElements.indexOf(document.activeElement);
            if (focusableElements.length > 0) {
              if (!event.shiftKey) {
                // if navigating between more focusable elements within the cell
                if (focusedElementIndex < focusableElements.length - 1) {
                  focusableElements[focusedElementIndex + 1].focus();
                  event.preventDefault();
                  return;
                } else {
                  if (colIndex < totalCols - 1) {
                    nextColIndex = colIndex + 1;
                  } else if (rowIndex < totalRows - 1) {
                    nextColIndex = 0;
                    nextRowIndex = rowIndex + 1;
                  } else {
                    // Allow default behavior when reaching the last cell
                    return;
                  }
                }
              } else {
                if (focusedElementIndex < focusableElements.length - 1) {
                  // if navigating between more focusable elements within the cell
                  focusableElements[focusedElementIndex + 1].focus();
                  event.preventDefault();
                  return;
                } else {
                  if (colIndex > 0) {
                    nextColIndex = colIndex - 1;
                  } else if (rowIndex > 0) {
                    nextColIndex = totalCols - 1;
                    nextRowIndex = rowIndex - 1;
                  } else {
                    // Allow default behavior when reaching the first cell
                    return;
                  }
                }
              }
            } else {
              if (!event.shiftKey) {
                if (colIndex < totalCols - 1) {
                  nextColIndex = colIndex + 1;
                } else if (rowIndex < totalRows - 1) {
                  nextColIndex = 0;
                  nextRowIndex = rowIndex + 1;
                } else {
                  // Allow default behavior when reaching the last cell
                  return;
                }
              } else {
                if (colIndex > 0) {
                  nextColIndex = colIndex - 1;
                } else if (rowIndex > 0) {
                  nextColIndex = totalCols - 1;
                  nextRowIndex = rowIndex - 1;
                } else {
                  // Allow default behavior when reaching the first cell
                  return;
                }
              }
            }

            break;
          }

          default:
            return;
        }

        this.focusCell(nextRowIndex, nextColIndex);
        this.focusedRowIndex = nextRowIndex === -1 ? null : nextRowIndex;
        this.focusedColIndex = nextColIndex;

        this.highlightHeader(nextColIndex);

        event.preventDefault();
      },
      getCell(rowIndex, colIndex) {
        if (rowIndex === -1) {
          return this.$refs[`header-${colIndex}`][0];
        } else {
          return this.$refs[`cell-${rowIndex}-${colIndex}`][0].$el;
        }
      },
      scrollCellIntoView(cell) {
        if (cell) {
          cell.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });

          // Adjust scroll position to account for sticky headers
          const stickyHeader = this.$refs.stickyHeader;
          const stickyColumn = this.$refs['header-0'][0];
          const tableWrapper = this.$refs.tableWrapper;

          const stickyHeaderHeight = stickyHeader ? stickyHeader.offsetHeight : 0;
          const stickyColumnWidth = stickyColumn ? stickyColumn.offsetWidth : 0;

          const cellRect = cell.getBoundingClientRect();
          const wrapperRect = tableWrapper.getBoundingClientRect();

          if (cellRect.top < wrapperRect.top + stickyHeaderHeight) {
            tableWrapper.scrollTop -= wrapperRect.top + stickyHeaderHeight - cellRect.top;
          }
          if (cellRect.left < wrapperRect.left + stickyColumnWidth) {
            tableWrapper.scrollLeft -= wrapperRect.left + stickyColumnWidth - cellRect.left;
          }
        }
      },
      focusCell(rowIndex, colIndex) {
        let nextCell;
        if (rowIndex === -1) {
          nextCell = this.$refs[`header-${colIndex}`][0];
        } else {
          nextCell = this.$refs[`cell-${rowIndex}-${colIndex}`][0].$el;
        }
        // Ensured the focused cell is smoothly scrolled into view.
        if (nextCell) {
          nextCell.focus();
          this.scrollCellIntoView(nextCell);
        }
      },

      handleRowMouseOver(rowIndex) {
        this.hoveredRowIndex = rowIndex;
      },
      handleRowMouseLeave() {
        this.hoveredRowIndex = null;
      },
      setHighlightHeader(header, highlight) {
        header.style.backgroundColor = highlight
          ? this.$themePalette.grey.v_50
          : this.$themePalette.white;
      },
      highlightHeader(colIndex) {
        const headers = this.$refs;
        Object.keys(headers).forEach(refKey => {
          if (refKey.startsWith('header-')) {
            const index = parseInt(refKey.split('-')[1], 10);
            this.setHighlightHeader(headers[refKey][0], index === colIndex);
          }
        });
      },
      getTextAlign(dataType) {
        const alignLtr = dataType === DATA_TYPE_NUMERIC ? 'right' : 'left';
        if (this.isRtl && alignLtr === 'right') {
          return 'left';
        }
        if (this.isRtl && alignLtr === 'left') {
          return 'right';
        }
        return alignLtr;
      },
    },
  };

</script>


<style scoped>
.k-table-wrapper {
  overflow: auto;
  position: relative;
  height:auto;
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
  z-index: 2; 
}

.sticky-column {
  position: sticky;
  left: 0;
  z-index: 1; 
}

th.sticky-header.sticky-column,
td.sticky-header.sticky-column {
  z-index: 3; 
}
.sortable {
  cursor: pointer;
}

</style>