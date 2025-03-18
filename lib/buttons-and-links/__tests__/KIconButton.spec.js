import {
  renderComponentForVisualTest,
  takeSnapshot,
  click,
} from '../../../jest.conf/visual.testUtils';

describe.visual('KIconButton Tests', () => {
  const snapshotOptions = { widths: [400], minHeight: 512 };

  describe('appearance variations', () => {
    it('renders with raised-button appearance', async () => {
      await renderComponentForVisualTest('KIconButton', {
        icon: 'plus',
        appearance: 'raised-button',
      });
      await takeSnapshot('KIconButton - Raised Button Appearance', snapshotOptions);
    });

    it('renders with flat-button appearance', async () => {
      await renderComponentForVisualTest('KIconButton', {
        icon: 'plus',
        appearance: 'flat-button',
      });
      await takeSnapshot('KIconButton - Flat Button Appearance', snapshotOptions);
    });
  });

  describe('disabled state variations', () => {
    it('renders with raised-button appearance disabled', async () => {
      await renderComponentForVisualTest('KIconButton', {
        icon: 'plus',
        appearance: 'raised-button',
        disabled: true,
      });
      await takeSnapshot('KIconButton - Disabled Raised Button', snapshotOptions);
    });

    it('renders with flat-button appearance disabled', async () => {
      await renderComponentForVisualTest('KIconButton', {
        icon: 'plus',
        appearance: 'flat-button',
        disabled: true,
      });
      await takeSnapshot('KIconButton - Disabled Flat Button', snapshotOptions);
    });
  });

  describe('size variations', () => {
    it("renders with size = 'mini'", async () => {
      await renderComponentForVisualTest('KIconButton', {
        icon: 'plus',
        appearance: 'raised-button',
        size: 'mini',
      });
      await takeSnapshot('KIconButton - Size Mini', snapshotOptions);
    });

    it("renders with size = 'small'", async () => {
      await renderComponentForVisualTest('KIconButton', {
        icon: 'plus',
        appearance: 'raised-button',
        size: 'small',
      });
      await takeSnapshot('KIconButton - Size Small', snapshotOptions);
    });

    it("renders with size = 'regular'", async () => {
      await renderComponentForVisualTest('KIconButton', {
        icon: 'plus',
        appearance: 'raised-button',
        size: 'regular',
      });
      await takeSnapshot('KIconButton - Size Regular', snapshotOptions);
    });

    it("renders with size = 'large'", async () => {
      await renderComponentForVisualTest('KIconButton', {
        icon: 'plus',
        appearance: 'raised-button',
        size: 'large',
      });
      await takeSnapshot('KIconButton - Size Large', snapshotOptions);
    });
  });

  describe('dropdown menu', () => {
    it('renders KIconButton with dropdown menu and shows options on click', async () => {
      await renderComponentForVisualTest(
        'KIconButton',
        {
          icon: 'plus',
          appearance: 'raised-button',
        },
        {
          menu: {
            element: 'KDropdownMenu',
            elementProps: { options: ['Option 1', 'Option 2'] },
          },
        },
      );

      await click('button');
      await takeSnapshot('KIconButton - Dropdown Opened', snapshotOptions);
    });
  });
});
