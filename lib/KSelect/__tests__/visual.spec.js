import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

describe.visual('KSelect visual tests', () => {
  const snapshotOptions = { widths: [400], minHeight: 512 };

  it('renders', async () => {
    // five dropdowns open themselves. If the viewport is shorter than the page,
    // Popper flips the lower ones upward.
    await page.setViewport({ width: 400, height: 3000 });
    await renderComponentForVisualTest('KSelectVisualTest');
    await takeSnapshot('KSelect visual tests', snapshotOptions);
  });
});
