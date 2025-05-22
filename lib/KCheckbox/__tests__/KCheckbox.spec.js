import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

describe.visual('KCheckbox Visual Tests', () => {
  // Standard states
  it('Renders deselected checkbox', async () => {
    await renderComponentForVisualTest('KCheckbox', {
      label: 'Deselected checkbox',
      checked: false,
    });
    await takeSnapshot('KCheckbox - Deselected', { widths: [375, 520] });
  });

  it('Renders indeterminate checkbox', async () => {
    await renderComponentForVisualTest('KCheckbox', {
      label: 'Indeterminate checkbox',
      indeterminate: true,
    });
    await takeSnapshot('KCheckbox - Indeterminate', { widths: [375, 520] });
  });

  it('Renders selected checkbox', async () => {
    await renderComponentForVisualTest('KCheckbox', {
      label: 'Selected checkbox',
      checked: true,
    });
    await takeSnapshot('KCheckbox - Selected', { widths: [375, 520] });
  });

  // Disabled states
  it('Renders deselected disabled checkbox', async () => {
    await renderComponentForVisualTest('KCheckbox', {
      label: 'Deselected disabled checkbox',
      checked: false,
      disabled: true,
    });
    await takeSnapshot('KCheckbox - Deselected Disabled', { widths: [375, 520] });
  });

  it('Renders indeterminate disabled checkbox', async () => {
    await renderComponentForVisualTest('KCheckbox', {
      label: 'Indeterminate disabled checkbox',
      indeterminate: true,
      disabled: true,
    });
    await takeSnapshot('KCheckbox - Indeterminate Disabled', { widths: [375, 520] });
  });

  it('Renders selected disabled checkbox', async () => {
    await renderComponentForVisualTest('KCheckbox', {
      label: 'Selected disabled checkbox',
      checked: true,
      disabled: true,
    });
    await takeSnapshot('KCheckbox - Selected Disabled', { widths: [375, 520] });
  });

  // Specific configurations
  it('Renders checkbox without label', async () => {
    await renderComponentForVisualTest('KCheckbox', {
      label: 'Hidden label',
      showLabel: false,
    });
    await takeSnapshot('KCheckbox - Without Label', { widths: [375, 520] });
  });

  it.visual('Renders checkbox with label in default slot', async () => {
    // Render our custom harness, not the raw KCheckbox
    await renderComponentForVisualTest('KCheckboxSlotTest');
    await takeSnapshot('KCheckbox - Label in Default Slot', { widths: [375, 520] });
  });

  it('Renders checkbox with description', async () => {
    await renderComponentForVisualTest('KCheckbox', {
      label: 'Checkbox with description',
      description: 'This is a helpful description text below the checkbox label',
    });
    await takeSnapshot('KCheckbox - With Description', { widths: [375, 520] });
  });
});
