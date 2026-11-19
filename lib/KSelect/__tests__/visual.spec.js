import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

const OPEN_EXAMPLES = [
  ['dropdown-open', 'Dropdown open'],
  ['dropdown-open-with-placeholder', 'Dropdown open with placeholder'],
  ['selected-option-dropdown-open', 'Selected option with dropdown open'],
];

const expandedComboboxIds = () =>
  page.$$eval('[role="combobox"][aria-expanded="true"]', comboboxes =>
    comboboxes.map(combobox => combobox.closest('.example-content').id),
  );

const visibleListboxCount = () =>
  page.$$eval(
    '#k-overlay [role="listbox"]',
    listboxes => listboxes.filter(listbox => listbox.offsetParent !== null).length,
  );

describe.visual('KSelect visual tests', () => {
  const snapshotOptions = { widths: [400], minHeight: 512 };

  it('renders', async () => {
    // Popper flips a dropdown upward when there is no room below its select
    await page.setViewport({ width: 400, height: 3000 });
    await renderComponentForVisualTest('KSelectVisualTest');
    for (const [id] of OPEN_EXAMPLES) {
      await page.waitForSelector(`#${id} [role="combobox"]`);
    }
    await page.waitForFunction(
      () => document.querySelectorAll('[role="combobox"][aria-expanded="true"]').length === 1,
    );

    for (const [id, title] of OPEN_EXAMPLES) {
      const combobox = `#${id} [role="combobox"]`;
      if ((await page.$eval(combobox, el => el.getAttribute('aria-expanded'))) !== 'true') {
        await page.click(combobox);
      }
      await page.waitForFunction(
        selector =>
          document.querySelector(selector).getAttribute('aria-expanded') === 'true' &&
          document.querySelectorAll('[role="combobox"][aria-expanded="true"]').length === 1,
        {},
        combobox,
      );
      expect(await expandedComboboxIds()).toEqual([id]);
      expect(await visibleListboxCount()).toBe(1);
      await takeSnapshot(`KSelect visual tests - ${title}`, snapshotOptions);
    }
  });
});
