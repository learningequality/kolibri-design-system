import { ref, computed } from '@vue/composition-api';
import _ from 'lodash';

export const SORT_ORDER_ASC = 'asc';
export const SORT_ORDER_DESC = 'desc';
export const DATA_TYPE_STRING = 'string';
export const DATA_TYPE_NUMERIC = 'numeric';
export const DATA_TYPE_DATE = 'date';
export const DATA_TYPE_OTHERS = 'others';

export default function useSorting(headers, rows, useLocalSorting) {
  const sortKey = ref(null);
  const sortOrder = ref(null);

  const sortedRows = computed(() => {
    if (!useLocalSorting.value || sortKey.value === null) return rows.value;

    return _.orderBy(rows.value, [row => row[sortKey.value]], [sortOrder.value]);
  });

  const handleSort = index => {
    if (headers.value[index].dataType === DATA_TYPE_OTHERS) return;

    if (sortKey.value === index) {
      sortOrder.value = sortOrder.value === SORT_ORDER_ASC ? SORT_ORDER_DESC : SORT_ORDER_ASC;
    } else {
      sortKey.value = index;
      sortOrder.value = SORT_ORDER_ASC;
    }
  };

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
