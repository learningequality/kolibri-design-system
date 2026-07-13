import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/vue';
import {
  getAllRenderedCells,
  assertCorrectBackgroundForTabNavigation,
  renderComponent,
  defaultRowCount,
  defaultColCount,
} from '../test-utils';
import KTableWithButtons from './components/KTableWithButtons.vue';

describe('KTable.vue Tab Navigation', () => {
  beforeEach(() => {
    // Since our primary concern in this test suite is checking focus management rather
    // than actual scrolling behavior, mocking scrollIntoView allows the test to
    // focus on the relevant aspects without getting interrupted
    // by unsupported methods in the test environment.
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  describe('cells with text/numeric data', () => {
    it('tab navigation', async () => {
      renderComponent();

      const allCells = getAllRenderedCells();

      for (let rowIdx = 0; rowIdx <= defaultRowCount; rowIdx++) {
        for (let colIdx = 0; colIdx < defaultColCount; colIdx++) {
          // Press tab to move to the foucs to the current cell
          await userEvent.tab();

          expect(allCells[rowIdx][colIdx]).toHaveFocus();
          assertCorrectBackgroundForTabNavigation(rowIdx, colIdx, allCells);
        }
      }
    });

    it('shift + tab navigation', async () => {
      renderComponent();
      const allCells = getAllRenderedCells();

      for (let rowIdx = defaultRowCount; rowIdx >= 0; rowIdx--) {
        for (let colIdx = defaultColCount - 1; colIdx >= 0; colIdx--) {
          // Press tab to move to the foucs to the current cell
          await userEvent.tab({ shift: true });

          expect(allCells[rowIdx][colIdx]).toHaveFocus();
          assertCorrectBackgroundForTabNavigation(rowIdx, colIdx, allCells);
        }
      }
    });
  });

  describe('cells with accessible elements', () => {
    const headers = [
      { label: 'Name', dataType: 'string', columnId: 'name' },
      { label: 'Content', dataType: 'string', columnId: 'content' },
    ];
    const rows = [
      ['A', 'Element 1'],
      ['B', 'Element 2'],
    ];

    const renderTableWithAccessibleElements = props =>
      render(KTableWithButtons, {
        props: {
          headers,
          rows,
          ...props,
        },
      });

    it('tab navigation', async () => {
      const buttonColumnID = 'content';
      const buttonColumnIdx = 1;

      renderTableWithAccessibleElements({ addButtonsToColumnIDs: [buttonColumnID] });
      const allCells = getAllRenderedCells(headers.length, rows.length);

      for (let rowIdx = 0; rowIdx <= rows.length; rowIdx++) {
        for (let colIdx = 0; colIdx < headers.length; colIdx++) {
          // Press tab to move the focus to the current cell
          await userEvent.tab();
          expect(allCells[rowIdx][colIdx]).toHaveFocus();
          assertCorrectBackgroundForTabNavigation(rowIdx, colIdx, allCells);

          // If the current cell has a button, check that the button is focused
          if (colIdx === buttonColumnIdx) {
            // Focus on the button
            await userEvent.tab();
            const focusedElement = document.activeElement;
            expect(focusedElement.tagName).toBe('BUTTON');

            const expectedTextContent =
              rowIdx === 0 ? headers[buttonColumnIdx].label : rows[rowIdx - 1][buttonColumnIdx];
            expect(focusedElement).toHaveTextContent(expectedTextContent);
            assertCorrectBackgroundForTabNavigation(rowIdx, colIdx, allCells);
          }
        }
      }
    });

    it('shift + tab navigation', async () => {
      const buttonColumnID = 'content';
      const buttonColumnIdx = 1;

      renderTableWithAccessibleElements({ addButtonsToColumnIDs: [buttonColumnID] });
      const allCells = getAllRenderedCells(headers.length, rows.length);

      for (let rowIdx = rows.length; rowIdx >= 0; rowIdx--) {
        for (let colIdx = headers.length - 1; colIdx >= 0; colIdx--) {
          // If the current cell has a button, check that the button is focused
          if (colIdx === buttonColumnIdx) {
            // Focus on the button
            await userEvent.tab({ shift: true });
            const focusedElement = document.activeElement;
            expect(focusedElement.tagName).toBe('BUTTON');

            const expectedTextContent =
              rowIdx === 0 ? headers[buttonColumnIdx].label : rows[rowIdx - 1][buttonColumnIdx];
            expect(focusedElement).toHaveTextContent(expectedTextContent);
            assertCorrectBackgroundForTabNavigation(rowIdx, colIdx, allCells);
          }

          // Press tab to move the focus to the current cell
          await userEvent.tab({ shift: true });
          expect(allCells[rowIdx][colIdx]).toHaveFocus();
          assertCorrectBackgroundForTabNavigation(rowIdx, colIdx, allCells);
        }
      }
    });
  });
});
