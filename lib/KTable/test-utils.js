import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { expect } from '@jest/globals';
import { themePalette } from '../styles/theme';
import KTable from './index.vue';

const HIGHTLIGHT_BACKGROUND_COLOR = themePalette().grey[100];

// ---- Default table data ----
export const defaultHeaders = [
  { label: 'Name', dataType: 'string', columnId: 'name' },
  { label: 'Age', dataType: 'number', columnId: 'age' },
  { label: 'City', dataType: 'string', columnId: 'city' },
];
export const defaultRows = [
  ['John', 30, 'New York'],
  ['Alice', 25, 'Los Angeles'],
  ['Bob', 35, 'San Francisco'],
];
export const defaultHeaderNames = defaultHeaders.map(header => header.label);
export const defaultRowCount = defaultRows.length;
export const defaultColCount = defaultHeaders.length;

// ---- Render utils ----
export const renderComponent = props =>
  render(KTable, {
    props: {
      headers: defaultHeaders,
      rows: defaultRows,
      caption: 'Test Table',
      ...props,
    },
  });

// ---- Table content utils ----

/**
 * Asserts that the table has the expected headers and rows. The cell
 * contents are converted to strings before comparison.
 * @param {Array} headers - The expected headers
 * @param {Array} rows - The expected rows
 */
export const assertTableContent = (headers, rows) => {
  const table = screen.getByRole('grid');
  expect(table).toBeInTheDocument();

  const headerCols = screen.getAllByRole('columnheader');
  expect(headerCols.length).toBe(headers.length);
  headers.forEach((header, index) => {
    expect(headerCols[index]).toHaveTextContent(header);
  });

  const gridCells = screen.getAllByRole('gridcell');
  const cellContents = rows.flat().map(cell => cell.toString());
  expect(gridCells.length).toBe(cellContents.length);
  cellContents.forEach((content, index) => {
    expect(gridCells[index]).toHaveTextContent(content);
  });
};

/**
 * Returns the rendered headers
 * @returns {Array} - The rendered headers
 */
export const getRenderedHeaders = () => {
  return screen.getAllByRole('columnheader');
};

/**
 * Returns the rendered grid cells as a 2D array.
 * Also asserts that the number of rendered cells is equal to the number
 * of columns multiplied by the number of rows.
 * @param {number} columnsLength - The number of columns
 * @param {number} rowsLength - The number of rows
 * @returns {Array} - The rendered grid cells
 */
export const getRenderedGridCells = (
  columnsLength = defaultHeaders.length,
  rowsLength = defaultRows.length,
) => {
  const gridCells = screen.getAllByRole('gridcell');
  expect(gridCells.length).toBe(columnsLength * rowsLength);

  // Create a 2D array of the grid cells
  const grid = gridCells.reduce((acc, cell, index) => {
    const rowIndex = Math.floor(index / columnsLength);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(cell);
    return acc;
  }, []);
  return grid;
};

/**
 * Returns all rendered cells, including the headers
 * @param {number} colsLen - The number of columns
 * @param {number} rowsLen - The number of rows
 * @returns {Array} - All rendered cells
 */
export const getAllRenderedCells = (
  colsLen = defaultHeaders.length,
  rowsLen = defaultRows.length,
) => {
  return [getRenderedHeaders(), ...getRenderedGridCells(colsLen, rowsLen)];
};

// ---- Focus management utils ----

/**
 * Simulates focus management by typing the specified keys and asserting that
 * the expected cell has focus after each key press.
 * @param {Array} keyPresses - An array of objects containing the key to press
 * and the expected next cell to have focus
 */
export const assertFocusWithKeyPresses = async keyPresses => {
  for (const { key, nextCell } of keyPresses) {
    await userEvent.type(nextCell, key);
    expect(nextCell).toHaveFocus();
  }
};

/**
 * Asserts that the active cell, and all the cells in the same row
 * as the active cell are highlighted with the background color.
 * Also ensures that all other cells do not have the highlight background color.
 *
 * This method is primarily used to assert the correctness of highlighting
 * while using tab navigation in KTable.
 * @param {number} activeRow - The active row index
 * @param {number} activeCol - The active column index
 * @param {Array} allCells - The 2D array of all cells
 */
export const assertCorrectBackgroundForTabNavigation = (activeRow, activeCol, allCells) => {
  allCells.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      let hasBackground = rowIdx == activeCol && colIdx == activeRow;

      // For data cells, also highlight the complete row
      if (activeRow > 0) hasBackground = hasBackground || rowIdx == activeRow;

      if (hasBackground) {
        expect(cell).toHaveStyle({ backgroundColor: HIGHTLIGHT_BACKGROUND_COLOR });
      } else {
        // Assert that the background color is not set or is not the highlight color
        const backgroundColor = cell.style.backgroundColor;
        if (backgroundColor) {
          expect(backgroundColor).not.toBe(HIGHTLIGHT_BACKGROUND_COLOR);
        }
      }
    });
  });
};

/**
 * Asserts that the specified row is highlighted with the background color.
 * @param {number} rowIndex - The row index
 * @param {Array} allCells - The 2D array of all cells
 */
export const assertRowHighlighted = (rowIndex, allCells) => {
  allCells[rowIndex].forEach(cell => {
    expect(cell).toHaveStyle({ backgroundColor: HIGHTLIGHT_BACKGROUND_COLOR });
  });
};

/*
 * Asserts that the specified row is not highlighted with the background color.
 * @param {number} rowIndex - The row index
 * @param {Array} allCells - The 2D array of all cells
 */
export const assertNotRowHighlighted = (rowIndex, allCells) => {
  allCells[rowIndex].forEach(cell => {
    const backgroundColor = cell.style.backgroundColor;
    if (backgroundColor) {
      expect(backgroundColor).not.toBe(HIGHTLIGHT_BACKGROUND_COLOR);
    }
  });
};
