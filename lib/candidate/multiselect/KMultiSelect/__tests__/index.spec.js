import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KMultiSelect from '../index.vue';

const OPTIONS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

const BASE_PROPS = {
  options: OPTIONS,
  value: [],
  label: 'Fruit',
  itemText: 'label',
  itemValue: 'value',
  messages: {
    open: () => 'Open',
    close: () => 'Close',
  },
};

function renderKMultiSelect(propsOverrides = {}) {
  return render(KMultiSelect, {
    props: { ...BASE_PROPS, ...propsOverrides },
  });
}

const getCombobox = () => screen.getByRole('combobox');
const getListbox = () => screen.queryByRole('listbox');
const getToggle = () => screen.getByRole('button', { name: /open|close/i });

describe('KMultiSelect — label rendering', () => {
  it('renders the label text above the input', () => {
    renderKMultiSelect({ label: 'Fruit' });
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });

  it('does not render a label element when label prop is empty', () => {
    renderKMultiSelect({ label: '' });
    expect(screen.queryByText('Fruit')).not.toBeInTheDocument();
  });
});

describe('KMultiSelect — dropdown open/close wiring', () => {
  it('opens dropdown when the toggle button is clicked', async () => {
    renderKMultiSelect();
    expect(getListbox()).toBeNull();
    await userEvent.click(getToggle());
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('closes dropdown on Escape key', async () => {
    renderKMultiSelect();
    await userEvent.click(getToggle());
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(getListbox()).toBeNull());
  });

  it('does not open when disabled=true', async () => {
    renderKMultiSelect({ disabled: true });
    await userEvent.click(getToggle());
    expect(getListbox()).toBeNull();
  });
});

describe('KMultiSelect — keyboard dispatch (onInputKeydown)', () => {
  it('opens dropdown when ArrowDown is pressed in a closed combobox', async () => {
    renderKMultiSelect();
    getCombobox().focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('opens dropdown when Enter is pressed in a closed combobox', async () => {
    renderKMultiSelect();
    getCombobox().focus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('removes last chip on Backspace when input is empty and options are selected', async () => {
    const component = renderKMultiSelect({ value: ['apple', 'banana'] });
    getCombobox().focus();
    await userEvent.keyboard('{Backspace}');
    const emitted = component.emitted()['input'];
    expect(emitted).toBeTruthy();
    const lastEmittedValue = emitted[emitted.length - 1][0];
    expect(lastEmittedValue).toEqual(expect.not.arrayContaining(['banana']));
  });

  it('does not remove a chip on Backspace when the input has text', async () => {
    const component = renderKMultiSelect({ value: ['apple'] });
    getCombobox().focus();
    await userEvent.type(getCombobox(), 'ap');
    const emittedBefore = component.emitted()['input']?.length ?? 0;
    await userEvent.keyboard('{Backspace}');
    const emittedAfter = component.emitted()['input']?.length ?? 0;
    expect(emittedAfter).toBe(emittedBefore);
  });
});

describe('KMultiSelect — search input (onSearchInput)', () => {
  it('opens dropdown when the user types in the combobox', async () => {
    renderKMultiSelect();
    getCombobox().focus();
    await userEvent.type(getCombobox(), 'a');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('shows noResultsText when the search query matches no options', async () => {
    renderKMultiSelect({ noResultsText: 'Nothing found' });
    await userEvent.click(getToggle());
    await userEvent.type(getCombobox(), 'zzz');
    await waitFor(() => expect(screen.getByText('Nothing found')).toBeInTheDocument());
  });
});

describe('KMultiSelect — blur guard (onInputBlur 150ms)', () => {
  it('dropdown stays open when focus moves to an option inside the container', async () => {
    renderKMultiSelect();
    await userEvent.click(getToggle());
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    const option = await screen.findByRole('option', { name: 'Apple' });
    await userEvent.click(option);
    expect(screen.queryByRole('listbox')).toBeInTheDocument();
  });

  it('dropdown closes when focus leaves the container entirely', async () => {
    renderKMultiSelect();
    getCombobox().focus();
    await userEvent.click(getToggle());
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await userEvent.tab();
    await waitFor(() => expect(getListbox()).toBeNull(), { timeout: 500 });
  });

  it('emits blur after focus leaves the container', async () => {
    const component = renderKMultiSelect();
    getCombobox().focus();
    getCombobox().blur();
    await waitFor(() => expect(component.emitted()['blur']).toBeTruthy(), { timeout: 500 });
  });

  it('emits focus when the combobox receives focus', async () => {
    const component = renderKMultiSelect();
    getCombobox().focus();
    await waitFor(() => expect(component.emitted()['focus']).toBeTruthy());
  });
});

describe('KMultiSelect — single mode (multiple=false)', () => {
  it('closes dropdown automatically after an option is selected', async () => {
    renderKMultiSelect({ multiple: false, value: null });
    await userEvent.click(getToggle());
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await userEvent.click(await screen.findByRole('option', { name: 'Apple' }));
    await waitFor(() => expect(getListbox()).toBeNull());
  });
});

describe('KMultiSelect — clearable', () => {
  it('clicking the clear button emits input with an empty array', async () => {
    const component = renderKMultiSelect({
      value: ['apple', 'banana'],
      clearable: true,
      messages: {
        open: () => 'Open',
        close: () => 'Close',
        clearText: () => 'Clear all selections',
      },
    });
    const clearBtn = screen.getByRole('button', { name: 'Clear all selections' });
    await userEvent.click(clearBtn);
    const emitted = component.emitted()['input'];
    expect(emitted).toBeTruthy();
    expect(emitted[emitted.length - 1][0]).toEqual([]);
  });
});

describe('KMultiSelect — validation state', () => {
  it('shows error immediately on mount when invalid=true', () => {
    renderKMultiSelect({ invalid: true, invalidText: 'Required' });
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(getCombobox()).toHaveAttribute('aria-invalid', 'true');
  });

  it('error becomes hidden when invalid prop is set to false', async () => {
    const component = renderKMultiSelect({ invalid: true, invalidText: 'Required' });
    expect(screen.getByText('Required')).toBeInTheDocument();
    await component.updateProps({ invalid: false });
    await waitFor(() => expect(screen.queryByText('Required')).not.toBeInTheDocument());
  });
});

describe('KMultiSelect — computedListboxMessages filtering', () => {
  it('renders the listbox description text from a function-valued clickable message', async () => {
    renderKMultiSelect({
      messages: {
        open: () => 'Open',
        close: () => 'Close',
        clickable: () => 'Click to select an option',
      },
    });
    await userEvent.click(getToggle());
    const listbox = await screen.findByRole('listbox');
    const descriptionId = listbox.getAttribute('aria-describedby');
    const description = document.getElementById(descriptionId);
    expect(description).toHaveTextContent('Click to select an option');
  });

  it('does not render listbox description text when no function messages are provided', async () => {
    renderKMultiSelect({ messages: { open: () => 'Open', close: () => 'Close' } });
    await userEvent.click(getToggle());
    const listbox = await screen.findByRole('listbox');
    const descriptionId = listbox.getAttribute('aria-describedby');
    const description = document.getElementById(descriptionId);
    expect(description?.textContent?.trim() ?? '').toBe('');
  });
});
