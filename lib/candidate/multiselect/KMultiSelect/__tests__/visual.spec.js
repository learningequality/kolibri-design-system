import {
  click,
  renderComponentForVisualTest,
  takeSnapshot,
} from '../../../../../jest.conf/visual.testUtils';

describe.visual('KMultiSelect visual tests', () => {
  const snapshotOptions = { widths: [900], minHeight: 1400 };
  it('renders', async () => {
    await page.setViewport({ width: 900, height: 1500 });
    await renderComponentForVisualTest('KMultiSelectVisualTest');

    await click('#hierarchical-tree-example input');
    await page.waitForSelector('#hierarchical-tree-example [role="listbox"]', { visible: true });

    await takeSnapshot('KMultiSelect visual tests', snapshotOptions);
  });
});
