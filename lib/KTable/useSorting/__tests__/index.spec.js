import { ref } from '@vue/composition-api';
import useSorting, {
  SORT_ORDER_ASC,
  SORT_ORDER_DESC,
  DATA_TYPE_STRING,
  DATA_TYPE_NUMERIC,
  DATA_TYPE_DATE,
  DATA_TYPE_OTHERS,
} from '../';

describe('useSorting', () => {
  let headers, rows, useLocalSorting;

  beforeEach(() => {
    headers = ref([
      { label: 'Name', dataType: DATA_TYPE_STRING },
      { label: 'Age', dataType: DATA_TYPE_NUMERIC },
      { label: 'Birthdate', dataType: DATA_TYPE_DATE },
      { label: 'Other', dataType: DATA_TYPE_OTHERS },
    ]);

    rows = ref([
      ['John', 30, new Date(1990, 5, 15)],
      ['Jane', 25, new Date(1995, 10, 20)],
      ['Alice', 28, new Date(1992, 8, 10)],
    ]);

    useLocalSorting = ref(true);
  });

  it('should return rows unsorted when useLocalSorting is false', () => {
    useLocalSorting.value = false;

    const { sortedRows } = useSorting(headers, rows, useLocalSorting);
    expect(sortedRows.value).toEqual(rows.value);
  });

  it('should sort rows by string column in ascending order', () => {
    const { handleSort, sortedRows } = useSorting(headers, rows, useLocalSorting);

    handleSort(0); // Sort by 'Name'

    expect(sortedRows.value).toEqual([
      ['Alice', 28, new Date(1992, 8, 10)],
      ['Jane', 25, new Date(1995, 10, 20)],
      ['John', 30, new Date(1990, 5, 15)],
    ]);
  });

  it('should sort rows by numeric column in ascending then descending order then back to default order', () => {
    const { handleSort, sortedRows, sortOrder } = useSorting(headers, rows, useLocalSorting);

    handleSort(1); // Sort by 'Age'
    expect(sortedRows.value).toEqual([
      ['Jane', 25, new Date(1995, 10, 20)],
      ['Alice', 28, new Date(1992, 8, 10)],
      ['John', 30, new Date(1990, 5, 15)],
    ]);
    expect(sortOrder.value).toBe(SORT_ORDER_ASC);

    handleSort(1); // Sort by 'Age' again to toggle order
    expect(sortedRows.value).toEqual([
      ['John', 30, new Date(1990, 5, 15)],
      ['Alice', 28, new Date(1992, 8, 10)],
      ['Jane', 25, new Date(1995, 10, 20)],
    ]);
    expect(sortOrder.value).toBe(SORT_ORDER_DESC);

    handleSort(1); //Sort by 'Age' again to default order

    expect(sortedRows.value).toEqual([
      ['John', 30, new Date(1990, 5, 15)],
      ['Jane', 25, new Date(1995, 10, 20)],
      ['Alice', 28, new Date(1992, 8, 10)],
    ]);
    expect(sortOrder.value).toBe(null);
  });

  it('should sort rows by date column in ascending order', () => {
    const { handleSort, sortedRows } = useSorting(headers, rows, useLocalSorting);

    handleSort(2); // Sort by 'Birthdate'
    expect(sortedRows.value).toEqual([
      ['John', 30, new Date(1990, 5, 15)],
      ['Alice', 28, new Date(1992, 8, 10)],
      ['Jane', 25, new Date(1995, 10, 20)],
    ]);
  });

  it('should not sort rows when sorting by a column with dataType "undefined"', () => {
    const { handleSort, sortedRows, sortKey } = useSorting(headers, rows, useLocalSorting);

    handleSort(3); // Attempt to sort by 'Other'
    expect(sortedRows.value).toEqual(rows.value);
    expect(sortKey.value).toBe(null); // sortKey should remain null
  });

  it('should return correct aria-sort attribute based on current sorting', () => {
    const { handleSort, getAriaSort } = useSorting(headers, rows, useLocalSorting);

    expect(getAriaSort(0)).toBe('none');

    handleSort(0); // Sort by 'Name'
    expect(getAriaSort(0)).toBe('ascending');

    handleSort(0); // Toggle sort order by 'Name'
    expect(getAriaSort(0)).toBe('descending');
  });

  it('should reset sortKey and sortOrder when a new column is sorted', () => {
    const { handleSort, sortKey, sortOrder } = useSorting(headers, rows, useLocalSorting);

    handleSort(0); // Sort by 'Name'
    expect(sortKey.value).toBe(0);
    expect(sortOrder.value).toBe(SORT_ORDER_ASC);

    handleSort(1); // Sort by 'Age'
    expect(sortKey.value).toBe(1);
    expect(sortOrder.value).toBe(SORT_ORDER_ASC);
  });
});
