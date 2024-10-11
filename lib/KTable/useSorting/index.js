import { ref, computed } from '@vue/composition-api';
import _ from 'lodash';

export const SORT_ORDER_ASC = 'asc';
export const SORT_ORDER_DESC = 'desc';
export const DATA_TYPE_STRING = 'string';
export const DATA_TYPE_NUMERIC = 'number';
export const DATA_TYPE_DATE = 'date';
export const DATA_TYPE_OTHERS = 'undefined';

/**
 * Custom hook for handling sorting logic in a table.
 *
 * @param {Ref<Array>} headers - Reactive reference to the table headers.
 * @param {Ref<Array>} rows - Reactive reference to the table rows.
 * @param {Ref<Boolean>} useLocalSorting - Reactive reference to a boolean indicating if local sorting should be used.
 * @returns {Object} - An object containing reactive references and methods for sorting.
 */
export default function useSorting(headers, rows, useLocalSorting) {
  const sortKey = ref(null);
  const sortOrder = ref(null);
  /**
   * Computed property that returns the sorted rows based on the current sort key and order.
   * If local sorting is disabled or no sort key is set, it returns the original rows.
   */
  const sortedRows = computed(() => {
    if (!useLocalSorting.value || sortKey.value === null || sortOrder.value === null)
      return rows.value;

    return _.orderBy(rows.value, [row => row[sortKey.value]], [sortOrder.value]);
  });
  /**
   * Method to handle sorting when a column header is clicked.
   *
   * @param {Number} index - The index of the column to sort by.
   */
  const handleSort = index => {
    if (headers.value[index].dataType === DATA_TYPE_OTHERS) return;

    if (sortKey.value === index) {
      if (sortOrder.value === SORT_ORDER_ASC) {
        sortOrder.value = SORT_ORDER_DESC;
      } else if (sortOrder.value === SORT_ORDER_DESC) {
        sortKey.value = null;
        sortOrder.value = null;
      }
    } else {
      sortKey.value = index;
      sortOrder.value = SORT_ORDER_ASC;
    }
  };

  /**
   * Method to get the ARIA sort attribute value for a column header.
   *
   * @param {Number} index - The index of the column.
   * @returns {String} - The ARIA sort attribute value ('ascending', 'descending', or 'none').
   */
  const getAriaSort = index => {
    if (sortKey.value === index) {
      return sortOrder.value === SORT_ORDER_ASC ? 'ascending' : 'descending';
    } else {
      return 'none';
    }
  };

  return {
    sortKey,
    sortOrder,
    sortedRows,
    handleSort,
    getAriaSort,
  };
}
