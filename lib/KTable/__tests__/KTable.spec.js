import { shallowMount } from '@vue/test-utils';
import KTable from '..';

import {
  renderComponentForVisualTest,
  takeSnapshot,
  scrollToPos,
  delay,
} from '../../../jest.conf/visual.testUtils';

function makeWrapper(opts) {
  return shallowMount(KTable, opts);
}

describe('KTable', () => {
  const basicHeaders = [
    { label: 'Name', dataType: 'string', columnId: 'name' },
    { label: 'Age', dataType: 'number', columnId: 'age' },
    { label: 'City', dataType: 'string', columnId: 'city' },
  ];

  const basicRows = [
    ['John Doe', 28, 'New York'],
    ['Jane Smith', 34, 'Los Angeles'],
  ];

  it('renders without errors with basic props', () => {
    const wrapper = makeWrapper({
      propsData: {
        headers: basicHeaders,
        rows: basicRows,
        caption: 'Basic table test',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('table').exists()).toBe(true);
  });

  it('renders with sticky columns', () => {
    const wrapper = makeWrapper({
      propsData: {
        headers: basicHeaders,
        rows: basicRows,
        caption: 'Sticky columns test',
        stickyColumns: ['first'],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.sticky-column').exists()).toBe(true);
  });
});

// intial implementation written with Claude
describe.visual('KTable', () => {
  const wideSnapshotOptions = { widths: [1200], minHeight: 400 };
  const scrolledSnapshotOptions = { widths: [800], minHeight: 400 };

  it('Render KTable with sticky columns - default state', async () => {
    await renderComponentForVisualTest('KTableStickyColumnsTest');
    await takeSnapshot('KTable - sticky columns - default', wideSnapshotOptions);
  });

  it('Render KTable with sticky columns - scrolled horizontally', async () => {
    await renderComponentForVisualTest('KTableStickyColumnsScrollTest');
    await delay(500); // Allow table to render

    // Scroll the table horizontally to test sticky column behavior
    await scrollToPos('.k-table-wrapper', { left: 300 });
    await delay(300); // Allow scroll to complete

    await takeSnapshot('KTable - sticky columns - scrolled', scrolledSnapshotOptions);
  });

  it('Render KTable cell height consistency', async () => {
    await renderComponentForVisualTest('KTableCellHeightTest');
    await takeSnapshot('KTable - cell height consistency', wideSnapshotOptions);
  });

  it('Render KTable dropshadow indicators', async () => {
    await renderComponentForVisualTest('KTableDropshadowTest');
    await delay(500); // Allow table to render and calculate scrollability

    // Scroll slightly to activate dropshadow
    await scrollToPos('.k-table-wrapper', { left: 50 });
    await delay(300);

    await takeSnapshot('KTable - dropshadow indicators', scrolledSnapshotOptions);
  });
});
