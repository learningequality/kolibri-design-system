import {
  renderComponentForVisualTest,
  takeSnapshot,
  click,
} from '../../../jest.conf/visual.testUtils';

describe.visual('KSelect Visual Tests', () => {
  const snapshotOptions = { widths: [400], minHeight: 512 };

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders KSelect in its base form with a label', async () => {
    await renderComponentForVisualTest('KSelect', {
      label: 'Select an option',
      options,
    });
    await takeSnapshot('KSelect - base form with label', snapshotOptions);
  });

  it('renders KSelect with floatingLabel prop set to false', async () => {
    await renderComponentForVisualTest('KSelect', {
      label: 'Select an option',
      floatingLabel: false,
      options,
    });
    await takeSnapshot('KSelect - floatingLabel false', snapshotOptions);
  });

  it('renders KSelect active with options dropdown open', async () => {
    await renderComponentForVisualTest('KSelect', {
      label: 'Select an option',
      options,
    });
    await click('.ui-select-label');
    await takeSnapshot('KSelect active with dropdown open', snapshotOptions);
  });

  it('renders KSelect active with options dropdown open and placeholder', async () => {
    await renderComponentForVisualTest('KSelect', {
      label: 'Select an option',
      placeholder: 'Choose an option...',
      options,
    });
    await click('.ui-select-label');
    await takeSnapshot('KSelect with placeholder and dropdown open', snapshotOptions);
  });

  it('renders KSelect with one option selected', async () => {
    await renderComponentForVisualTest('KSelect', {
      label: 'Select an option',
      options,
      value: options[0],
    });
    await takeSnapshot('KSelect with one option selected', snapshotOptions);
  });

  it('renders KSelect with one option selected and dropdown open', async () => {
    await renderComponentForVisualTest('KSelect', {
      label: 'Select an option',
      options,
      value: options[0],
    });
    await click('.ui-select-label');
    await takeSnapshot('KSelect selected option with dropdown open', snapshotOptions);
  });

  it('renders KSelect with clearable prop and selected option', async () => {
    await renderComponentForVisualTest('KSelect', {
      label: 'Select an option',
      options,
      value: options[0],
      clearable: true,
      clearText: 'Clear selection',
    });
    await takeSnapshot('KSelect - clearable with selected option', snapshotOptions);
  });

  it('renders KSelect with invalid state and message', async () => {
    await renderComponentForVisualTest('KSelect', {
      label: 'Select an option',
      options,
      invalid: true,
      invalidText: 'This field is required',
    });
    await takeSnapshot('KSelect - invalid with error message', snapshotOptions);
  });

  it('renders KSelect with help text', async () => {
    await renderComponentForVisualTest('KSelect', {
      label: 'Select an option',
      options,
      help: 'Please select one option from the list',
    });
    await takeSnapshot('KSelect - with help text', snapshotOptions);
  });

  it('renders KSelect disabled', async () => {
    await renderComponentForVisualTest('KSelect', {
      label: 'Select an option',
      options,
      disabled: true,
    });
    await takeSnapshot('KSelect - disabled', snapshotOptions);
  });

  it('renders KSelect with selected option but disabled', async () => {
    await renderComponentForVisualTest('KSelect', {
      label: 'Select an option',
      options,
      value: options[0],
      disabled: true,
    });
    await takeSnapshot('KSelect - selected but disabled', snapshotOptions);
  });

  it('renders KSelect with multiple prop and dropdown open', async () => {
    await renderComponentForVisualTest('KSelect', {
      label: 'Select options',
      options,
      multiple: true,
    });
    await click('.ui-select-label');
    await takeSnapshot('KSelect multiple with dropdown open', snapshotOptions);
  });

  it('renders with multiple options selected and dropdown open', async () => {
    await renderComponentForVisualTest('KSelect', {
      label: 'Select options',
      options,
      multiple: true,
      value: [options[0], options[1]],
      clearable: true,
    });
    await click('.ui-select-label');
    await takeSnapshot('KSelect - Multiple selection with dropdown open', snapshotOptions);
  });
});
