import { render, screen } from '@testing-library/vue';
import VueRouter from 'vue-router';
import KCheckbox from '../KCheckbox';

const renderComponent = (props = {}, slots = {}) =>
  render(KCheckbox, {
    props,
    routes: new VueRouter(),
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
    it(`a checked checkbox icon should appear when checked is 'true'`, () => {
      renderComponent({ label: 'checked', inputValue: true });
      expect(screen.getByTestId('icon-checked')).toBeInTheDocument();
      expect(screen.queryByTestId('icon-unchecked')).not.toBeInTheDocument();
      expect(screen.queryByTestId('icon-indeterminateCheck')).not.toBeInTheDocument();
    });
    it(`an unchecked checkbox icon should appear when checked is 'false'`, () => {
      renderComponent({ label: 'unchecked', inputValue: false });
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
    it(`'showLabel' should not show the label when 'false'`, () => {
      renderComponent({ label: 'no label', showLabel: false });
      const label = screen.getByText('no label');
      expect(label).toHaveClass('visuallyhidden');
    });
    it(`a description is displayed when that prop is not null`, () => {
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
});
