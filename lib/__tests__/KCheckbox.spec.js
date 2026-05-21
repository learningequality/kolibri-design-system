import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
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
  });
});
