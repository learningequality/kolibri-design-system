import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

describe.visual('KSelect visual tests', () => {
  const snapshotOptions = { widths: [400], minHeight: 512 };

  it('renders', async () => {
    // Popper flips a dropdown upward when there is no room below its select
    await page.setViewport({ width: 400, height: 2800 });
    await renderComponentForVisualTest('KSelectVisualTest');
    await page.waitForFunction(
      () => document.querySelectorAll('[role="combobox"][aria-expanded="true"]').length === 3,
    );
    const openListboxes = await page.$$eval(
      '#k-overlay [role="listbox"]',
      listboxes => listboxes.filter(listbox => listbox.offsetParent !== null).length,
    );
    expect(openListboxes).toBe(3);
    await takeSnapshot('KSelect visual tests', snapshotOptions);
  });
});
