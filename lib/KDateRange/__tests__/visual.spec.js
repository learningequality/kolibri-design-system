import {
  delay,
  renderComponentForVisualTest,
  takeSnapshot,
} from '../../../jest.conf/visual.testUtils';

const SELECTED = '.calendar-days-selected';
const IN_RANGE = '.calendar-days-in-range';
const FLAT_HOVER = 'rgba(0, 0, 0, 0.1)';

const paintOf = selector =>
  page.evaluate(s => {
    const style = getComputedStyle(document.querySelector(s));
    return { background: style.backgroundColor, color: style.color };
  }, selector);

// getComputedStyle returns a resolved rgb string, so the expected color has to be
// resolved the same way for the test to survive a palette change
const resolve = cssVar =>
  page.evaluate(v => {
    const probe = document.createElement('div');
    probe.style.backgroundColor = `var(${v})`;
    document.body.appendChild(probe);
    const color = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return color;
  }, cssVar);

// the background transitions, so a computed value read straight after a hover is
// still interpolating
const hoverAndRead = async selector => {
  await page.hover(selector);
  await delay(500);
  return paintOf(selector);
};

// jsdom applies no stylesheet, and Percy re-renders the DOM with no pointer over it,
// so this is the only place the KDateDay colors, and the hover, can be checked
describe.visual('KDateRange visual tests', () => {
  it('paints a selected day, a day in the range, and a day under the pointer', async () => {
    await renderComponentForVisualTest('KDateRangeVisualTest');
    await page.waitForSelector(SELECTED);
    await takeSnapshot('KDateRange visual tests', { widths: [800], minHeight: 512 });

    const selected = await paintOf(SELECTED);
    const inRange = await paintOf(IN_RANGE);
    const inRangeHovered = await hoverAndRead(IN_RANGE);
    const selectedHovered = await hoverAndRead(SELECTED);

    expect(selected.background).toBe(await resolve('--brand-primary-v500'));
    expect(inRange.background).toBe(await resolve('--brand-primary-v100'));
    expect(inRangeHovered.background).toBe(FLAT_HOVER);
    expect(selectedHovered.background).toBe(FLAT_HOVER);
    expect(selectedHovered.color).toBe(await resolve('--palette-white'));
  });
});
