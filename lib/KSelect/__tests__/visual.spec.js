import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

describe.visual('KSelect visual tests', () => {
  const snapshotOptions = { widths: [400], minHeight: 512 };

  it('renders', async () => {
    // 15 stacked examples, 5 self-opening, need a tall viewport so Popper
    // has room below each select and doesn't flip dropdowns upward.
    await page.setViewport({ width: 400, height: 2800 });
    await renderComponentForVisualTest('KSelectVisualTest');
    await takeSnapshot('KSelect visual tests', snapshotOptions);
  });
});
