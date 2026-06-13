import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KMultiSelectInput from '../components/KMultiSelectInput.vue';

function renderComponent(props = {}) {
  return render(KMultiSelectInput, {
    props: {
      selectedOptions: [],
      searchText: '',
      listboxId: 'test-listbox-id',
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

  it('emits clear-all when clear button is clicked', async () => {
    const { emitted } = renderComponent({
      clearable: true,
      selectedOptions: [{ value: '1', label: 'Item 1' }],
    });

    // The clear button has aria-label="Clear all selections"
    const clearBtn = screen.getByLabelText('Clear all selections');
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

  it('emits chip-remove when a chip is closed', async () => {
    const { emitted } = renderComponent({
      multiple: true,
      selectedOptions: [{ value: '1', label: 'Item 1' }],
    });
    
    // KChip close button usually has aria-label="Remove Item 1" or similar
    const closeBtn = screen.getByRole('button', { name: /Remove Item 1/i });
    await userEvent.click(closeBtn);
    expect(emitted()['chip-remove']).toBeTruthy();
    expect(emitted()['chip-remove'][0]).toEqual(['1']);
  });
});
