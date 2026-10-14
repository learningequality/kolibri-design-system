import { nextTick } from 'vue';
import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import {
  assertTableContent,
  getRenderedGridCells,
  getRenderedHeaders,
  assertFocusWithKeyPresses,
  renderComponent,
  defaultHeaderNames,
  defaultRows,
  getAllRenderedCells,
  assertNotRowHighlighted,
  assertRowHighlighted,
  defaultHeaders,
} from '../test-utils';
import KTable from '../index.vue';

const STICKY_HEADER_CLASS = 'sticky-header';
const STICKY_COLUMN_CLASS = 'sticky-column';

describe('KTable.vue', () => {
  beforeEach(() => {
    // Since our primary concern in this test suite is checking keyboard naviagtion
    // rather than actual scrolling behavior, mocking scrollIntoView allows the test to
    // focus on the relevant aspects without getting interrupted
    // by unsupported methods in the test environment.
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('should mount the component', () => {
    renderComponent();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('should render the caption', () => {
    const tableCaption = 'Table ABC';
    renderComponent({ caption: tableCaption });
    expect(screen.getByRole('grid')).toHaveAccessibleName(tableCaption);
  });

  it('renders the correct content in rows and columns', () => {
    renderComponent();
    assertTableContent(defaultHeaderNames, defaultRows);
  });

  describe('should respect the defaultSort attribute', () => {
    it('should not sort the rows by default', () => {
      renderComponent();
      assertTableContent(defaultHeaderNames, defaultRows);
    });

    it('should sort the rows correctly in ascending order', () => {
      renderComponent({
        defaultSort: {
          columnId: 'age',
          direction: 'asc',
        },
      });

      // Sort the rows in ascending order based on the second column (age)
      // The index 1 corresponds to the age column in the defaultRows array
      const sortedRows = defaultRows.slice().sort((a, b) => a[1] - b[1]);
      assertTableContent(defaultHeaderNames, sortedRows);
    });

    it('should sort the rows correctly in descending order', () => {
      renderComponent({
        defaultSort: {
          columnId: 'age',
          direction: 'desc',
        },
      });

      // Sort the rows in descending order based on the second column (age)
      // The index 1 corresponds to the age column in the defaultRows array
      const sortedRows = defaultRows.slice().sort((a, b) => b[1] - a[1]);
      assertTableContent(defaultHeaderNames, sortedRows);
    });
  });

  describe('should handle disableBuiltinSorting correctly', () => {
    it('should not sort the rows', () => {
      renderComponent({
        disableBuiltinSorting: true,
        sortable: true,
      });
      assertTableContent(defaultHeaderNames, defaultRows);
    });

    it('should not sort even if default sort is provided', () => {
      renderComponent({
        disableBuiltinSorting: true,
        sortable: true,
        defaultSort: { columnId: 'age', direction: 'asc' },
      });
      assertTableContent(defaultHeaderNames, defaultRows);
    });

    it('should emit changeSort event when sortable column is clicked', async () => {
      const { emitted } = renderComponent({
        sortable: true,
        disableBuiltinSorting: true,
      });

      const ageHeaderCell = screen.getByRole('columnheader', { name: /age/i });
      expect(ageHeaderCell).toBeInTheDocument();
      await userEvent.click(ageHeaderCell);

      expect(emitted()).toHaveProperty('changeSort');
      const emittedSortEvents = emitted().changeSort;
      expect(emittedSortEvents).toHaveLength(1); // Only one event should be emitted

      const emittedEvent = emittedSortEvents[0];
      expect(emittedEvent).toEqual([
        {
          sortKey: 1, // Index of the 'age' column
          sortOrder: 'asc', // Default direction is ascending
        },
      ]);
    });
  });

  it('should handle sticky headers and columns', async () => {
    renderComponent();

    const headerCells = getRenderedHeaders();
    headerCells.forEach(headerCell => {
      expect(headerCell).toHaveClass(STICKY_HEADER_CLASS);
    });

    defaultRows.forEach(row => {
      const firstColumnCell = screen.getByRole('gridcell', { name: row[0] });
      expect(firstColumnCell).toHaveClass(STICKY_COLUMN_CLASS);
    });
  });

  describe('keyboard navigation with arrow keys', () => {
    it('should handle keyboard navigation within the data cells', async () => {
      renderComponent();
      const gridCells = getRenderedGridCells();

      // Focus of the first cell
      gridCells[0][0].focus();
      expect(gridCells[0][0]).toHaveFocus();

      const keyPresses = [
        { key: 'ArrowRight', nextCell: gridCells[0][1] },
        { key: 'ArrowRight', nextCell: gridCells[0][2] },
        { key: 'ArrowDown', nextCell: gridCells[1][2] },
        { key: 'ArrowDown', nextCell: gridCells[2][2] },
        { key: 'ArrowLeft', nextCell: gridCells[2][1] },
        { key: 'ArrowLeft', nextCell: gridCells[2][0] },
        { key: 'ArrowUp', nextCell: gridCells[1][0] },
        { key: 'ArrowUp', nextCell: gridCells[0][0] },
      ];
      await assertFocusWithKeyPresses(keyPresses);
    });

    it('should handle keyboard navigation within the header cells', async () => {
      renderComponent();
      const headerCells = getRenderedHeaders();

      // Focus on the first header cell
      headerCells[0].focus();
      expect(headerCells[0]).toHaveFocus();

      const keyPresses = [
        { key: 'ArrowRight', nextCell: headerCells[1] },
        { key: 'ArrowRight', nextCell: headerCells[2] },
        { key: 'ArrowLeft', nextCell: headerCells[1] },
        { key: 'ArrowLeft', nextCell: headerCells[0] },
      ];
      await assertFocusWithKeyPresses(keyPresses);
    });

    it('should handle the navigation between header and data cells', async () => {
      renderComponent();
      const allCells = getAllRenderedCells();

      // Focus on the first header cell
      allCells[0][0].focus();
      expect(allCells[0][0]).toHaveFocus();

      // Record the key presses and the expected next cell
      const keyPresses = [
        { key: 'ArrowDown', nextCell: allCells[1][0] },
        { key: 'ArrowRight', nextCell: allCells[1][1] },
        { key: 'ArrowUp', nextCell: allCells[0][1] },
        { key: 'ArrowLeft', nextCell: allCells[0][0] },
      ];
      await assertFocusWithKeyPresses(keyPresses);
    });

    describe('going out of the table', () => {
      // The table is a grid with 3 columns and 4 rows (1 header row + 3 data rows)
      // Cell indices are represented as [rowIdx, colIdx]
      const testCases = [
        [
          'should go to the last row when going up from the header row',
          {
            startCellIdx: [0, 0],
            key: 'ArrowUp',
            nextCellIdx: [3, 0],
          },
        ],
        [
          'should go to the header row when going down from the last row',
          {
            startCellIdx: [3, 0],
            key: 'ArrowDown',
            nextCellIdx: [0, 0],
          },
        ],
        [
          'should go to the last cell of the table when going left from the first cell',
          {
            startCellIdx: [0, 0],
            key: 'ArrowLeft',
            nextCellIdx: [3, 2],
          },
        ],
        [
          'should go to the first cell of the header when going right from the last cell',
          {
            startCellIdx: [3, 2],
            key: 'ArrowRight',
            nextCellIdx: [0, 0],
          },
        ],
        [
          'should go to the end of the previous row when going left from the first cell of the current row',
          {
            startCellIdx: [1, 0],
            key: 'ArrowLeft',
            nextCellIdx: [0, 2],
          },
        ],
        [
          'should go to the start of the next row when going right from the last cell of the current row',
          {
            startCellIdx: [0, 2],
            key: 'ArrowRight',
            nextCellIdx: [1, 0],
          },
        ],
      ];

      it.each(testCases)('%s', async (_, { startCellIdx, key, nextCellIdx }) => {
        renderComponent();
        const allCells = getAllRenderedCells();

        // Focus on the starting cell
        const [startRowIdx, startColIdx] = startCellIdx;
        const startCell = allCells[startRowIdx][startColIdx];
        startCell.focus();

        // Press the key to navigate
        await userEvent.keyboard(`{${key}}`);

        // Assert that the next cell is focused
        const [nextRowIdx, nextColIdx] = nextCellIdx;
        const nextCell = allCells[nextRowIdx][nextColIdx];
        expect(nextCell).toHaveFocus();
      });
    });

    it('should not move to the next row when a menu trigger in the cell opens on the arrow key', async () => {
      render({
        components: { KTable },
        data: () => ({ headers: defaultHeaders, rows: defaultRows }),
        template: `
          <KTable :headers="headers" :rows="rows" caption="Test Table">
            <template #cell="{ content, rowIndex, colIndex }">
              <KIconButton v-if="rowIndex === 0 && colIndex === 0" icon="optionsVertical" ariaLabel="Actions">
                <template #menu>
                  <KDropdownMenu :options="['Edit']" />
                </template>
              </KIconButton>
              <span v-else>{{ content }}</span>
            </template>
          </KTable>
        `,
      });
      await nextTick();
      const trigger = screen.getByRole('button', { name: 'Actions' });
      trigger.focus();

      await userEvent.keyboard('{ArrowDown}');

      await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
      await nextTick();
      getRenderedGridCells()[1].forEach(cell =>
        expect(cell).not.toHaveStyle({ backgroundColor: 'var(--palette-grey-v100)' }),
      );
    });

    it('should move focus when a non-menu control in the cell handles the arrow key', async () => {
      render({
        components: { KTable },
        data: () => ({ headers: defaultHeaders, rows: defaultRows }),
        template: `
          <KTable :headers="headers" :rows="rows" caption="Test Table">
            <template #cell="{ content, rowIndex, colIndex }">
              <button v-if="rowIndex === 0 && colIndex === 0" @keydown.down.prevent>Control</button>
              <span v-else>{{ content }}</span>
            </template>
          </KTable>
        `,
      });
      screen.getByRole('button', { name: 'Control' }).focus();

      await userEvent.keyboard('{ArrowDown}');

      expect(getRenderedGridCells()[1][0]).toHaveFocus();
    });
  });

  describe('pointer highlight', () => {
    it('should highlight the header row with the pointer is over it', async () => {
      renderComponent();
      const allCells = getAllRenderedCells();
      allCells.forEach((_, rowIdx) => assertNotRowHighlighted(rowIdx, allCells));

      // Hover over the header row
      await userEvent.hover(allCells[0][1]);

      // Assert that only the header row is highlighted
      assertRowHighlighted(0, allCells);
      for (let rowIdx = 1; rowIdx < allCells.length; rowIdx++) {
        assertNotRowHighlighted(rowIdx, allCells);
      }
    });

    it('should highlight the data row with the pointer is over it', async () => {
      renderComponent();
      const allCells = getAllRenderedCells();
      const HOVER_ROW_IDX = 2;

      // Hover over the data row
      await userEvent.hover(allCells[HOVER_ROW_IDX][1]);

      // Assert that only the data row is highlighted
      for (let rowIdx = 0; rowIdx < allCells.length; rowIdx++) {
        if (rowIdx === HOVER_ROW_IDX) assertRowHighlighted(rowIdx, allCells);
        else assertNotRowHighlighted(rowIdx, allCells);
      }
    });
  });
});
