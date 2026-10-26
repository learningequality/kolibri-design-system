import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

describe.visual('KSelect visual tests', () => {
  const snapshotOptions = { widths: [400], minHeight: 512 };

  it('renders', async () => {
    // 15 stacked examples, 5 self-opening. The viewport must stay taller than
    // the page, or Popper flips the lower dropdowns upward.
    await page.setViewport({ width: 400, height: 3000 });
    await renderComponentForVisualTest('KSelectVisualTest');
    await takeSnapshot('KSelect visual tests', snapshotOptions);
  });
});
