import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import VueRouter from 'vue-router';
import KButton from '../KButton.vue';
import {
  renderComponentForVisualTest,
  takeSnapshot,
  click,
} from '../../../jest.conf/visual.testUtils';

const renderComponent = (props = {}, slots = {}) =>
  render(KButton, {
    props,
    routes: new VueRouter(),
    slots,
  });

describe('KButton', () => {
  describe('icon related props', () => {
    it('should render an icon before the text with the icon string passed to the icon prop', () => {
      renderComponent({ icon: 'add' });

      const iconBefore = screen.getByTestId('iconBefore');
      expect(iconBefore).toBeInTheDocument();
    });

    it('should render an icon after the text with the icon string passed to the iconAfter prop', () => {
      renderComponent({ iconAfter: 'video' });

      const iconAfter = screen.getByTestId('iconAfter');
      expect(iconAfter).toBeInTheDocument();
    });

    it('should render a dropdown icon when hasDropdown is true', () => {
      renderComponent({ hasDropdown: true });

      const dropdownIcon = screen.getByTestId('dropdownIcon');
      expect(dropdownIcon).toBeInTheDocument();
    });
  });

  describe('text prop and slots', () => {
    it('should render the text prop if nothing is in the default slot', () => {
      renderComponent({ text: 'test' });

      expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('should render the slot when the slot has content', () => {
      renderComponent({ text: 'test' }, { default: '<span>slot</span>' });

      expect(screen.getByText('slot')).toBeInTheDocument();
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });

  describe('event handling', () => {
    it('should emit a click event when clicked', async () => {
      const { emitted } = renderComponent({ text: 'test' });

      const button = screen.getByRole('button', { name: /test/i });
      await userEvent.click(button);

      const clickEvent = emitted();
      expect(clickEvent).toHaveProperty('click');
      expect(clickEvent.click).toHaveLength(1);
    });
  });

  describe.visual('KButton Tests', () => {
    const snapshotOptions = { widths: [400], minHeight: 512 };

    describe('renders correctly with different appearances', () => {
      it('renders correctly as primary raised button', async () => {
        await renderComponentForVisualTest('KButton', {
          text: 'Raised Button',
          primary: true,
          appearance: 'raised-button',
        });
        await takeSnapshot('KButton - Primary Raised Button', snapshotOptions);
      });
      it('renders correctly as secondary raised button', async () => {
        await renderComponentForVisualTest('KButton', {
          text: 'Raised Button',
          primary: false,
          appearance: 'raised-button',
        });
        await takeSnapshot('KButton - Secondary Raised Button', snapshotOptions);
      });
      it('renders correctly as primary flat button', async () => {
        await renderComponentForVisualTest('KButton', {
          text: 'Flat Button',
          primary: true,
          appearance: 'flat-button',
        });
        await takeSnapshot('KButton - Primary Flat Button', snapshotOptions);
      });
      it('renders correctly as secondary flat button', async () => {
        await renderComponentForVisualTest('KButton', {
          text: 'Flat Button',
          primary: false,
          appearance: 'flat-button',
        });
        await takeSnapshot('KButton - Secondary Flat Button', snapshotOptions);
      });
      it('renders correctly as basic link', async () => {
        await renderComponentForVisualTest('KButton', {
          text: 'Basic Link',
          appearance: 'basic-link',
        });
        await takeSnapshot('KButton - Basic Link', snapshotOptions);
      });
    });

    describe('renders correctly when disabled', () => {
      it('renders correctly as disabled raised button', async () => {
        await renderComponentForVisualTest('KButton', {
          text: 'Raised Button',
          disabled: true,
          appearance: 'raised-button',
        });
        await takeSnapshot('KButton - Disabled Raised Button', snapshotOptions);
      });
      it('renders correctly as disabled flat button', async () => {
        await renderComponentForVisualTest('KButton', {
          text: 'Flat Button',
          disabled: true,
          appearance: 'flat-button',
        });
        await takeSnapshot('KButton - Disabled Flat Button', snapshotOptions);
      });
    });

    describe('renders correctly with icons', () => {
      it('renders correctly with icon on the left', async () => {
        await renderComponentForVisualTest('KButton', { text: 'Icon Button', icon: 'add' });
        await takeSnapshot('KButton - With Icons', snapshotOptions);
      });
      it('renders correctly with icon on the right', async () => {
        await renderComponentForVisualTest('KButton', { text: 'Icon After', iconAfter: 'video' });
        await takeSnapshot('KButton - With Icons After', snapshotOptions);
      });
    });

    it('renders correctly with KDropdownMenu slot and shows options on click', async () => {
      await renderComponentForVisualTest(
        'KButton',
        { text: 'Button with Dropdown' },
        {
          menu: {
            element: 'KDropdownMenu',
            elementProps: { options: ['Option 1', 'Option 2'] },
          },
        },
      );
      await click('button');
      await takeSnapshot('KButton - Dropdown Opened', snapshotOptions);
    });

    it('renders correctly KDropdownMenu with header slot on click', async () => {
      await renderComponentForVisualTest('KButtonWithDropdownTest');
      await click('button');
      await takeSnapshot('KButton - Dropdown with header opened', snapshotOptions);
    });

    it('should render the default slot when provided', async () => {
      await renderComponentForVisualTest(
        'KButton',
        { text: 'Button' },
        {
          default: {
            element: 'span',
            innerHTML: 'Default Slot',
          },
        },
      );
      await takeSnapshot('KButton - With Default Slot', snapshotOptions);
    });
  });
});
