import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KMultiSelectInput from '../components/KMultiSelectInput.vue';

const LABELS = {
  clearAllLabel: 'Clear all selections',
  openLabel: 'Open options',
  closeLabel: 'Close options',
};

function renderComponent(props = {}) {
  return render(KMultiSelectInput, {
    props: {
      selectedOptions: [],
      searchText: '',
      listboxId: 'test-listbox-id',
      ...LABELS,
      ...props,
    },
  });
}

describe('KMultiSelectInput', () => {
  it('renders a search input with combobox role', () => {
    renderComponent();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders selected chips in multiple mode', () => {
    renderComponent({
      multiple: true,
      selectedOptions: [
        { value: '1', label: 'Item 1' },
        { value: '2', label: 'Item 2' },
      ],
    });
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders single selected text in single mode', () => {
    renderComponent({
      multiple: false,
      selectedOptions: [{ value: '1', label: 'Item 1' }],
    });
    // Should be raw text, not a chip
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  describe('aria attributes', () => {
    it('sets aria-expanded="false" when the dropdown is closed', () => {
      renderComponent({ isOpen: false });
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    });

    it('sets aria-expanded="true" when the dropdown is open', () => {
      renderComponent({ isOpen: true });
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    });

    it('sets aria-activedescendant when isOpen and activeDescendant is provided', () => {
      renderComponent({ isOpen: true, activeDescendant: 'option-id-1' });
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', 'option-id-1');
    });

    it('does not set aria-activedescendant when the dropdown is closed', () => {
      renderComponent({ isOpen: false, activeDescendant: 'option-id-1' });
      expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-activedescendant');
    });
  });

  it('emits clear-all when clear button is clicked', async () => {
    const { emitted } = renderComponent({
      clearable: true,
      selectedOptions: [{ value: '1', label: 'Item 1' }],
    });

    const clearBtn = screen.getByLabelText(LABELS.clearAllLabel);
    await userEvent.click(clearBtn);
    expect(emitted()['clear-all']).toHaveLength(1);
  });

  it('emits update:searchText when typing in the input', async () => {
    const { emitted } = renderComponent();
    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'test');
    expect(emitted()['update:searchText']).toBeTruthy();
    expect(emitted()['update:searchText'][0]).toEqual(['t']);
  });

  it('applies maxlength to the native input when provided', () => {
    renderComponent({ maxlength: 50 });
    expect(screen.getByRole('combobox')).toHaveAttribute('maxlength', '50');
  });

  it('does not apply maxlength attribute when prop is null', () => {
    renderComponent({ maxlength: null });
    expect(screen.getByRole('combobox')).not.toHaveAttribute('maxlength');
  });

  it('emits chip-remove when a chip is closed', async () => {
    const { emitted } = renderComponent({
      multiple: true,
      selectedOptions: [{ value: '1', label: 'Item 1' }],
    });

    const closeBtn = screen.getByRole('button', { name: /Remove Item 1/i });
    await userEvent.click(closeBtn);
    expect(emitted()['chip-remove']).toBeTruthy();
    expect(emitted()['chip-remove'][0]).toEqual(['1']);
  });

  it('does not emit toggle when disabled and wrapper is clicked', async () => {
    const { emitted } = renderComponent({ disabled: true });
    await userEvent.click(screen.getByRole('combobox').closest('.kmselect-input'));
    expect(emitted()['toggle']).toBeFalsy();
  });

  describe('single-mode selected text visibility', () => {
    it('hides the selected text when the dropdown is open', () => {
      renderComponent({
        multiple: false,
        isOpen: true,
        selectedOptions: [{ value: '1', label: 'Item 1' }],
      });
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });

    it('hides the selected text when searchText is present', () => {
      renderComponent({
        multiple: false,
        isOpen: false,
        searchText: 'Ite',
        selectedOptions: [{ value: '1', label: 'Item 1' }],
      });
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });
  });
});
