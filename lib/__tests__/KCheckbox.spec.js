import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { themeTokens } from '../styles/theme';
import KCheckbox from '../KCheckbox';

const renderComponent = (props = {}, slots = {}) =>
  render(KCheckbox, {
    props,
    slots,
  });

describe('KCheckbox component', () => {
  it(`smoke test`, () => {
    renderComponent();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  describe('props', () => {
    it(`a label should appear with checkbox`, () => {
      renderComponent({ label: 'test' });
      expect(screen.getByLabelText('test')).toBeInTheDocument();
    });

    it(`a checked checkbox icon should appear when inputValue is 'true'`, () => {
      renderComponent({ label: 'checked', inputValue: true });
      expect(screen.getByTestId('icon-checked')).toBeInTheDocument();
      expect(screen.queryByTestId('icon-unchecked')).not.toBeInTheDocument();
      expect(screen.queryByTestId('icon-indeterminateCheck')).not.toBeInTheDocument();
    });
    it(`an unchecked checkbox icon should appear when inputValue is 'false'`, () => {
      renderComponent({ label: 'unchecked', inputValue: false });
      expect(screen.queryByTestId('icon-checked')).not.toBeInTheDocument();
      expect(screen.getByTestId('icon-unchecked')).toBeInTheDocument();
      expect(screen.queryByTestId('icon-indeterminateCheck')).not.toBeInTheDocument();
    });
    it(`a checked checkbox icon should appear when inputValue is 0`, () => {
      renderComponent({ label: 'checked', inputValue: 0 });
      expect(screen.getByTestId('icon-checked')).toBeInTheDocument();
      expect(screen.queryByTestId('icon-unchecked')).not.toBeInTheDocument();
      expect(screen.queryByTestId('icon-indeterminateCheck')).not.toBeInTheDocument();
    });

    it(`a checked checkbox icon should appear when checked is 'true'`, () => {
      renderComponent({ label: 'checked', checked: true });
      expect(screen.getByTestId('icon-checked')).toBeInTheDocument();
      expect(screen.queryByTestId('icon-unchecked')).not.toBeInTheDocument();
      expect(screen.queryByTestId('icon-indeterminateCheck')).not.toBeInTheDocument();
    });
    it(`an unchecked checkbox icon should appear when checked is 'false'`, () => {
      renderComponent({ label: 'unchecked', checked: false });
      expect(screen.queryByTestId('icon-checked')).not.toBeInTheDocument();
      expect(screen.getByTestId('icon-unchecked')).toBeInTheDocument();
      expect(screen.queryByTestId('icon-indeterminateCheck')).not.toBeInTheDocument();
    });

    it(`indeterminateCheck icon should show when indeterminate is 'true'`, () => {
      renderComponent({ label: 'indeterminate', indeterminate: true });
      expect(screen.queryByTestId('icon-checked')).not.toBeInTheDocument();
      expect(screen.queryByTestId('icon-unchecked')).not.toBeInTheDocument();
      expect(screen.getByTestId('icon-indeterminateCheck')).toBeInTheDocument();
    });
    it(`indeterminate state should override 'inputValue' when indeterminate is 'true'`, () => {
      renderComponent({ label: 'indeterminate', inputValue: true, indeterminate: true });
      expect(screen.queryByTestId('icon-checked')).not.toBeInTheDocument();
      expect(screen.queryByTestId('icon-unchecked')).not.toBeInTheDocument();
      expect(screen.getByTestId('icon-indeterminateCheck')).toBeInTheDocument();
    });
    it(`indeterminate state should override 'checked' when indeterminate is 'true'`, () => {
      renderComponent({ label: 'indeterminate', checked: true, indeterminate: true });
      expect(screen.queryByTestId('icon-checked')).not.toBeInTheDocument();
      expect(screen.queryByTestId('icon-unchecked')).not.toBeInTheDocument();
      expect(screen.getByTestId('icon-indeterminateCheck')).toBeInTheDocument();
    });

    it(`label is visuallyhidden when showLabel is 'false'`, () => {
      renderComponent({ label: 'no label', showLabel: false });
      const label = screen.getByText('no label');
      expect(label).toHaveClass('visuallyhidden');
    });
    it(`a description is displayed when description is not null`, () => {
      renderComponent({ label: 'description', description: 'I am a description' });
      expect(screen.getByText('I am a description')).toBeInTheDocument();
    });
    it(`checkbox is in disabled state when disabled is 'true'`, () => {
      renderComponent({ label: 'disabled', disabled: true });
      const checkbox = screen.getByLabelText('disabled');
      expect(checkbox).toBeDisabled();
    });

    it(`should render with custom color when color prop is provided for checked state`, () => {
      renderComponent({ label: 'custom color', inputValue: true, color: 'custom-color' });
      const icon = screen.getByTestId('icon-checked');
      expect(icon).toHaveStyle({ fill: 'custom-color' });
    });

    it(`should render with custom color when color prop is provided for indeterminate state`, () => {
      renderComponent({ label: 'custom color', indeterminate: true, color: 'custom-color' });
      const icon = screen.getByTestId('icon-indeterminateCheck');
      expect(icon).toHaveStyle({ fill: 'custom-color' });
    });
  });

  it(`should render the default's slot content in <label>`, () => {
    renderComponent({}, { default: '<span><span>Icon</span>Slot Label</span>' });
    expect(screen.getByText('Slot Label')).toBeInTheDocument();
  });

  describe('event handling when the checkbox is clicked', () => {
    it('when using legacy API, should emit a change event with the new checkbox state', async () => {
      const { emitted } = renderComponent({ label: 'unchecked to checked', checked: false });
      const checkbox = screen.getByTestId('k-checkbox-container');
      await userEvent.click(checkbox);
      const events = emitted();
      expect(events).toHaveProperty('change');
      expect(events.change).toHaveLength(1);
      expect(events.change[0][0]).toEqual(true); // was false, now toggled to true
    });
    it('when using v-model, should emit an change event with the new checkbox state', async () => {
      const { emitted } = renderComponent({ label: 'unchecked to checked', inputValue: false });
      const checkbox = screen.getByTestId('k-checkbox-container');
      await userEvent.click(checkbox);
      const events = emitted();
      expect(events).toHaveProperty('change');
      expect(events.change).toHaveLength(1);
      expect(events.change[0][0]).toEqual(true); // was false, now toggled to true
    });
    it('when both checked and inputValue are passed, v-model takes precedence', async () => {
      const { emitted } = renderComponent({
        label: 'unchecked to checked',
        checked: true,
        inputValue: false,
      });
      const checkbox = screen.getByTestId('k-checkbox-container');
      await userEvent.click(checkbox);
      const events = emitted();
      expect(events).toHaveProperty('change');
      expect(events.change).toHaveLength(1);
      expect(events.change[0][0]).toEqual(true); // was false, now toggled to true
    });
    it('when using v-model, pressing Space emits a change event with the new checkbox state', async () => {
      const { emitted } = renderComponent({ label: 'unchecked to checked', inputValue: false });
      await userEvent.tab();
      await userEvent.keyboard(' ');
      expect(emitted().change).toEqual([[true, expect.anything()]]);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });
  });

  describe('readonly', () => {
    afterEach(() => jest.restoreAllMocks());

    const expectNativeChecked = checked => {
      const input = screen.getByRole('checkbox');
      checked ? expect(input).toBeChecked() : expect(input).not.toBeChecked();
    };

    describe.each([true, false])('with inputValue %s', inputValue => {
      const setup = () => renderComponent({ label: 'readonly', readonly: true, inputValue });

      it.each([
        ['input', () => screen.getByRole('checkbox')],
        ['label', () => screen.getByText('readonly')],
        ['container', () => screen.getByTestId('k-checkbox-container')],
      ])('clicking the %s emits no change and keeps native checked', async (__, getTarget) => {
        const { emitted } = setup();
        await userEvent.click(getTarget());
        expect(emitted()).not.toHaveProperty('change');
        expectNativeChecked(inputValue);
      });

      it('pressing Space emits no change and keeps native checked', async () => {
        const { emitted } = setup();
        await userEvent.tab();
        expect(screen.getByRole('checkbox')).toHaveFocus();
        await userEvent.keyboard(' ');
        expect(emitted()).not.toHaveProperty('change');
        expectNativeChecked(inputValue);
      });
    });

    it('clicking the container does not cancel the click for ancestors', () => {
      renderComponent({ label: 'readonly', readonly: true });
      const click = new MouseEvent('click', { bubbles: true, cancelable: true });
      screen.getByTestId('k-checkbox-container').dispatchEvent(click);
      expect(click.defaultPrevented).toBe(false);
    });

    it('clicking keeps native indeterminate', async () => {
      const { emitted } = renderComponent({
        label: 'readonly',
        readonly: true,
        indeterminate: true,
      });
      const input = screen.getByRole('checkbox');
      await userEvent.click(input);
      expect(emitted()).not.toHaveProperty('change');
      expect(input.indeterminate).toBe(true);
      expect(input).not.toBeChecked();
    });

    it('exposes aria-readonly and stays enabled and focusable', async () => {
      renderComponent({ label: 'readonly', readonly: true });
      const input = screen.getByRole('checkbox');
      expect(input).toHaveAttribute('aria-readonly', 'true');
      expect(input).toBeEnabled();
      expect(input).not.toHaveAttribute('readonly');
      await userEvent.tab();
      expect(input).toHaveFocus();
    });

    it('applies the color prop and does not gray out the label', () => {
      renderComponent({ label: 'readonly', readonly: true, inputValue: true, color: 'red' });
      expect(screen.getByTestId('icon-checked')).toHaveStyle({ fill: 'red' });
      expect(screen.getByText('readonly')).not.toHaveStyle({ color: themeTokens().textDisabled });
    });

    it('with disabled, warns and falls back to disabled', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      renderComponent({ label: 'readonly', readonly: true, disabled: true });
      const input = screen.getByRole('checkbox');
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toMatch(/^KCheckbox:/);
      expect(input).toBeDisabled();
      expect(input).not.toHaveAttribute('aria-readonly');
      expect(screen.getByTestId('icon-unchecked')).toHaveStyle({
        fill: themeTokens().textDisabled,
      });
    });
  });
});
