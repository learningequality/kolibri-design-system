import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KButton from '../KButton.vue';

const TEXT = 'Continue';
const HOVER_COLOR = 'rebeccapurple';
const HOVER_BG = 'rgba(255, 255, 255, 0.1)';

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

  // the style block keys every appearance color off these classes, so a wrong one
  // leaves the button unstyled
  describe('appearance classes', () => {
    it.each([
      [{ appearance: 'raised-button' }, ['button', 'raised']],
      [{ appearance: 'raised-button', primary: true }, ['button', 'raised', 'is-primary']],
      [{ appearance: 'flat-button' }, ['button', 'flat']],
      [{ appearance: 'flat-button', primary: true }, ['button', 'flat', 'is-primary']],
    ])('marks %o with %p', (props, expected) => {
      renderComponent({ text: TEXT, ...props });

      expect(screen.getByRole('button', { name: TEXT })).toHaveClass(...expected);
    });

    it('marks a basic link as a link, and as disabled by class', () => {
      const { container } = renderComponent({
        text: TEXT,
        appearance: 'basic-link',
        disabled: true,
      });

      expect(container.querySelector('a')).toHaveClass('link', 'is-disabled');
    });
  });

  describe('color props', () => {
    it('sets no custom property when no color is given', () => {
      renderComponent({ text: TEXT });

      expect(screen.getByRole('button', { name: TEXT })).not.toHaveAttribute('style');
    });

    it('sets a custom property for every hover prop that is given', () => {
      renderComponent({ text: TEXT, hoverColor: HOVER_COLOR, hoverBackgroundColor: HOVER_BG });

      expect(screen.getByRole('button', { name: TEXT })).toHaveStyle({
        '--k-button-hover-color': HOVER_COLOR,
        '--k-button-hover-background-color': HOVER_BG,
      });
    });

    it('turns a color in appearanceOverrides into a custom property', () => {
      renderComponent({
        text: TEXT,
        appearanceOverrides: { color: HOVER_COLOR, backgroundColor: HOVER_BG, margin: '4px' },
      });

      const button = screen.getByRole('button', { name: TEXT });
      expect(button).toHaveStyle({
        '--k-button-color': HOVER_COLOR,
        '--k-button-background-color': HOVER_BG,
        margin: '4px',
      });
      expect(button.getAttribute('style')).not.toMatch(/(^|;)\s*(background-)?color:/);
    });

    it('warns about a pseudo-class in appearanceOverrides', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

      renderComponent({
        text: TEXT,
        appearanceOverrides: { ':hover': { color: HOVER_COLOR } },
      });

      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain('KButton');
      expect(warn.mock.calls[0][0]).toContain(':hover');
      warn.mockRestore();
    });
  });
});
