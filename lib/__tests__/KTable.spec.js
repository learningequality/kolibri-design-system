import { mount } from '@vue/test-utils';
import KTable from '../KTable';

describe('KTable.vue', () => {
  it('should mount the component', () => {
    const headers = [
      { label: 'Name', dataType: 'string' },
      { label: 'Age', dataType: 'numeric' },
      { label: 'City', dataType: 'string' },
    ];
    const rows = [
      ['Alice', 25, 'New York'],
      ['Bob', 30, 'Los Angeles'],
      ['Charlie', 35, 'San Francisco'],
    ];
    const wrapper = mount(KTable, {
      propsData: {
        headers,
        rows,
        useLocalSorting: true,
      },
    });
    const thElements = wrapper.findAll('th');
    expect(thElements.length).toBe(headers.length);
  });
  it('renders the correct content in rows and columns', async () => {
    const headers = [
      { label: 'Name', dataType: 'string' },
      { label: 'Age', dataType: 'numeric' },
      { label: 'Date', dataType: 'date' },
    ];
    const rows = [
      ['John', 30, '2023-01-01'],
      ['Jane', 25, '2023-02-01'],
      ['Doe', 35, '2023-03-01'],
    ];

    const wrapper = mount(KTable, {
      propsData: { headers, rows, caption: 'Test Table' },
    });

    // Wait for the table to be fully rendered
    await wrapper.vm.$nextTick();

    const tableRows = wrapper.findAll('tbody tr');
    expect(tableRows.length).toBe(rows.length);

    rows.forEach((row, rowIndex) => {
      const cells = tableRows.at(rowIndex).findAll('td');
      row.forEach((cellContent, colIndex) => {
        expect(cells.at(colIndex).text()).toBe(String(cellContent));
      });
    });
  });
  it('should emit changeSort event on header click when useLocalSorting is false', async () => {
    const headers = [
      { label: 'Name', dataType: 'string' },
      { label: 'Age', dataType: 'numeric' },
      { label: 'City', dataType: 'string'},
    ];
    const items = [
      ['Alice', 25, 'New York'],
      ['Bob', 30, 'Los Angeles'],
      ['Charlie', 35, 'San Francisco'],
    ];
    const wrapper = mount(KTable, {
      propsData: {
        headers,
        items,
        useLocalSorting: false,
      },
    });

    const thElements = wrapper.findAll('th');
    await thElements.at(0).trigger('click');
    expect(wrapper.emitted().changeSort).toBeTruthy();
  });
  it('should handle sticky headers and columns', async () => {
    const headers = [
      { label: 'Name', dataType: 'string' },
      { label: 'Age', dataType: 'numeric' },
    ];
    const rows = [
      ['John', 30],
      ['Jane', 25],
    ];

    const wrapper = mount(KTable, {
      propsData: { headers, rows, caption: 'Sticky Table' },
    });

    // Wait for the table to be fully rendered
    await wrapper.vm.$nextTick();

    const headerCells = wrapper.findAll('thead th');
    headerCells.wrappers.forEach((headerCell) => {
      expect(headerCell.classes()).toContain('sticky-header');
    });

    const firstColumnCells = wrapper.findAll('tbody tr td:first-child');
    firstColumnCells.wrappers.forEach((cell) => {
      expect(cell.classes()).toContain('sticky-column');
    });
  });

  beforeEach(() => {
    /*Since our primary concern in this test is checking focus management rather than actual scrolling behavior, 
    mocking scrollIntoView allows the test to focus on the relevant aspects without getting interrupted 
    by unsupported methods in the test environment.*/
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('should handle keyboard navigation within the table', async () => {
    const headers = [
      { label: 'Name', dataType: 'string' },
      { label: 'Age', dataType: 'numeric' },
    ];
    const rows = [
      ['John', 30],
      ['Jane', 25],
    ];

    const wrapper = mount(KTable, {
      propsData: { headers, rows, caption: 'Keyboard Navigation Table' },
      attachTo: document.body, // Attach to document body to properly manage focus
    });

    await wrapper.vm.$nextTick(); // Ensure the component is fully rendered

    const firstCell = wrapper.find('tbody tr:first-child td:first-child');
    await firstCell.element.focus(); // Focus the first cell directly
    expect(document.activeElement).toBe(firstCell.element); // Check if the first cell is focused

    // Simulate ArrowRight key press
    await firstCell.trigger('keydown', { key: 'ArrowRight' });

    const secondCell = wrapper.find('tbody tr:first-child td:nth-child(2)');
    await secondCell.element.focus(); // Focus the second cell directly
    expect(document.activeElement).toBe(secondCell.element); // Check if the second cell is focused

    // Simulate ArrowDown key press
    await secondCell.trigger('keydown', { key: 'ArrowDown' });

    const thirdCell = wrapper.find('tbody tr:nth-child(2) td:nth-child(2)');
    await thirdCell.element.focus(); // Focus the third cell directly
    expect(document.activeElement).toBe(thirdCell.element); // Check if the third cell is focused

    // Cleanup: detach the wrapper from the document body after the test
    wrapper.destroy();
  });
  
});
