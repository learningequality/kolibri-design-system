import {
  click,
  delay,
  renderComponentForVisualTest,
  takeSnapshot,
  waitFor,
} from '../../../jest.conf/visual.testUtils';

const ERROR = 'rgb(210, 30, 0)';

const colorOf = (selector, property) =>
  page.evaluate(
    (s, prop) => getComputedStyle(document.querySelector(s)).getPropertyValue(prop),
    selector,
    property,
  );

describe.visual('KTextbox visual tests', () => {
  const snapshotOptions = { widths: [800], minHeight: 512 };
  it('renders', async () => {
    await renderComponentForVisualTest('KTextboxVisualTest');

    // Prepares active textbox test case
    await click('#active-textbox input');

    await takeSnapshot('KTextbox visual tests', snapshotOptions);
  });

  // Percy re-renders the DOM with nothing focused, so a snapshot cannot hold this
  it('keeps the error color on an invalid textbox while it is focused', async () => {
    await click('#invalid-textbox input');
    // `is-active` lands on a later render, and the label color transitions over 0.1s
    await waitFor('#invalid-textbox .ui-textbox.is-active');
    await delay(200);

    expect(await colorOf('#invalid-textbox .ui-textbox-label-text', 'color')).toBe(ERROR);
    expect(await colorOf('#invalid-textbox .ui-textbox-label', 'border-bottom-color')).toBe(ERROR);
  });
});
