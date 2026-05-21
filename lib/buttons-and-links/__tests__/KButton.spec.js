import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KButton from '../KButton.vue';

const renderComponent = (props = {}, slots = {}) =>
  render(KButton, {
    props,
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
});
