import {
  delay,
  renderComponentForVisualTest,
  takeSnapshot,
} from '../../../jest.conf/visual.testUtils';

const SELECTED = '.calendar-days-selected';
const IN_RANGE = '.calendar-days-in-range';

const backgroundOf = selector =>
  page.evaluate(s => getComputedStyle(document.querySelector(s)).backgroundColor, selector);

// the background transitions, so a computed value read straight after a hover is
// still interpolating
const hoverAndRead = async selector => {
  await page.hover(selector);
  await delay(500);
  return backgroundOf(selector);
};

// jsdom applies no stylesheet, and Percy re-renders the DOM with no pointer over it,
// so this is the only place the KDateDay colors, and the hover, can be checked
describe.visual('KDateRange visual tests', () => {
  it('paints a selected day, a day in the range, and a day under the pointer', async () => {
    await renderComponentForVisualTest('KDateRangeVisualTest');
    await page.waitForSelector(SELECTED);
    await takeSnapshot('KDateRange visual tests', { widths: [800], minHeight: 512 });

    const selected = await backgroundOf(SELECTED);
    const inRange = await backgroundOf(IN_RANGE);
    const inRangeHovered = await hoverAndRead(IN_RANGE);
    const selectedHovered = await hoverAndRead(SELECTED);

    expect(selected).toBe('rgb(67, 104, 245)');
    expect(inRange).toBe('rgb(217, 225, 253)');
    expect(inRangeHovered).toBe('rgb(204, 204, 204)');
    // a selected day keeps its fill, so the white number stays legible
    expect(selectedHovered).toBe('rgb(67, 104, 245)');
  });
});
