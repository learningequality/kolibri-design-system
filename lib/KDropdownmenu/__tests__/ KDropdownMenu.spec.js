// eslint-disable-next-line import/named
import {
  renderComponentForVisualTest,
  takeSnapshot,
  click,
} from '../../../jest.conf/visual.testUtils';

describe.visual('KDropdownMenu Visual Tests', () => {
  const snapshotOptions = {
    widths: [400],
    minHeight: 512,
  };

  it('renders with a single item', async () => {
    await renderComponentForVisualTest(
      'KButton',
      {
        text: 'Single Item Dropdown',
      },
      {
        menu: {
          element: 'KDropdownMenu',
          elementProps: {
            options: ['Single Option'],
          },
        },
      },
    );
    await click('button');
    await takeSnapshot('KDropdownMenu - Single Item', snapshotOptions);
  });

  it('renders with multiple items', async () => {
    await renderComponentForVisualTest(
      'KButton',
      {
        text: 'Multiple Items Dropdown',
      },
      {
        menu: {
          element: 'KDropdownMenu',
          elementProps: {
            options: ['Option 1', 'Option 2', 'Option 3'],
          },
        },
      },
    );
    await click('button');
    await takeSnapshot('KDropdownMenu - Multiple Items', snapshotOptions);
  });

  it('renders items with icons', async () => {
    await renderComponentForVisualTest(
      'KButton',
      {
        text: 'Icons Dropdown',
      },
      {
        menu: {
          element: 'KDropdownMenu',
          elementProps: {
            options: [
              { label: 'Add', icon: 'add' },
              { label: 'Delete', icon: 'delete' },
            ],
            hasIcons: true,
          },
        },
      },
    );
    await click('button');
    await takeSnapshot('KDropdownMenu - With Icons', snapshotOptions);
  });

  it('renders KDropdownMenu with header', async () => {
    await renderComponentForVisualTest('KDropdownMenuTest');

    // Click the button to open dropdown with header
    await click('.test-case button');
    await takeSnapshot('KDropdownMenu - With Header', snapshotOptions);
  });
});
