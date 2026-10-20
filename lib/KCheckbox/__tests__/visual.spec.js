import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

describe.visual('KCheckbox visual tests', () => {
  const snapshotOptions = { widths: [375, 520] };
  const readReadonlyStates = () =>
    page.$$eval('input[aria-readonly="true"]', inputs =>
      inputs.map(input => ({ checked: input.checked, indeterminate: input.indeterminate })),
    );
  it('renders', async () => {
    await renderComponentForVisualTest('KCheckboxVisualTest');
    expect(await readReadonlyStates()).toEqual([
      { checked: false, indeterminate: false },
      { checked: false, indeterminate: true },
      { checked: true, indeterminate: false },
    ]);
    await takeSnapshot('KCheckbox visual tests', snapshotOptions);
  });

  it('readonly checkboxes keep their state and take focus when clicked', async () => {
    await renderComponentForVisualTest('KCheckboxVisualTest');
    const initialStates = await readReadonlyStates();
    const containers = await page.$$('.k-checkbox-readonly');
    for (const container of containers) {
      for (const part of ['.k-checkbox-input', '.k-checkbox-label']) {
        await (await container.$(part)).click();
        expect(await readReadonlyStates()).toEqual(initialStates);
        expect(
          await container.$eval('.k-checkbox-input', input => input === document.activeElement),
        ).toBe(true);
      }
    }
  });
});
