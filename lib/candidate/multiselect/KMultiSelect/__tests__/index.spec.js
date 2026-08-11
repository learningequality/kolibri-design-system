import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KMultiSelect from '../index.vue';

const LABEL = 'Fruit';
const NO_RESULTS_TEXT = 'Nothing found';
const INVALID_TEXT = 'Required';
const CLEAR_LABEL = 'Clear all selections';
const CLICKABLE_TEXT = 'Click to select an option';

const OPTIONS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

const BASE_PROPS = {
  options: OPTIONS,
  value: [],
  label: LABEL,
  itemText: 'label',
  itemValue: 'value',
  messages: {
    clearText: () => 'Clear all',
    open: () => 'Open',
    close: () => 'Close',
    clickable: () => 'Options are clickable',
    allOptionsSelected: () => 'All options selected',
    allOptionsDeselected: () => 'No options selected',
    optionDeselected: () => 'Option deselected',
    partiallySelected: () => 'Partially selected',
    itemsSelected: ({ count }) => (count === 1 ? '1 item selected' : `${count} items selected`),
  },
};

function renderKMultiSelect(propsOverrides = {}) {
  return render(KMultiSelect, {
    props: { ...BASE_PROPS, ...propsOverrides },
  });
}

const getCombobox = () => screen.getByRole('combobox');
const getListbox = () => screen.queryByRole('listbox');
const getToggle = () =>
  screen.queryByRole('button', { name: BASE_PROPS.messages.open() }) ??
  screen.getByRole('button', { name: BASE_PROPS.messages.close() });

describe('KMultiSelect — label rendering', () => {
  it('renders the label text above the input', () => {
    renderKMultiSelect({ label: LABEL });
    expect(screen.getByText(LABEL)).toBeInTheDocument();
  });

  it('does not render a label element when label prop is empty', () => {
    renderKMultiSelect({ label: '' });
    expect(screen.queryByText(LABEL)).not.toBeInTheDocument();
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

describe('KMultiSelect — keyboard interactions', () => {
  it('opens dropdown when ArrowDown is pressed in a closed combobox', async () => {
    renderKMultiSelect();
    await userEvent.click(getCombobox());
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('opens dropdown when Enter is pressed in a closed combobox', async () => {
    renderKMultiSelect();
    await userEvent.click(getCombobox());
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('removes last chip on Backspace when input is empty and options are selected', async () => {
    const component = renderKMultiSelect({ value: ['apple', 'banana'] });
    await userEvent.click(getCombobox());
    await userEvent.keyboard('{Backspace}');
    const emitted = component.emitted()['input'];
    expect(emitted).toBeTruthy();
    const lastEmittedValue = emitted[emitted.length - 1][0];
    expect(lastEmittedValue).toEqual(expect.not.arrayContaining(['banana']));
  });

  it('does not remove a chip on Backspace when the input has text', async () => {
    const component = renderKMultiSelect({ value: ['apple'] });
    await userEvent.click(getCombobox());
    await userEvent.type(getCombobox(), 'ap');
    const emittedBefore = component.emitted()['input']?.length ?? 0;
    await userEvent.keyboard('{Backspace}');
    const emittedAfter = component.emitted()['input']?.length ?? 0;
    expect(emittedAfter).toBe(emittedBefore);
  });
});

describe('KMultiSelect — search input', () => {
  it('opens dropdown when the user types in the combobox', async () => {
    renderKMultiSelect();
    await userEvent.click(getCombobox());
    await userEvent.type(getCombobox(), 'a');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('shows noResultsText when the search query matches no options', async () => {
    renderKMultiSelect({ noResultsText: NO_RESULTS_TEXT });
    await userEvent.click(getToggle());
    await userEvent.type(getCombobox(), 'zzz');
    await waitFor(() => expect(screen.getByText(NO_RESULTS_TEXT)).toBeInTheDocument());
  });
});

describe('KMultiSelect — focus and blur behavior', () => {
  it('dropdown stays open when focus moves to an option inside the container', async () => {
    renderKMultiSelect();
    await userEvent.click(getToggle());
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    const option = await screen.findByRole('option', { name: OPTIONS[0].label });
    await userEvent.click(option);
    expect(screen.queryByRole('listbox')).toBeInTheDocument();
  });

  it('dropdown closes when focus leaves the container entirely', async () => {
    renderKMultiSelect();
    await userEvent.click(getToggle());
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await userEvent.tab();
    await waitFor(() => expect(getListbox()).toBeNull(), { timeout: 500 });
  });

  it('emits blur after focus leaves the container', async () => {
    const component = renderKMultiSelect();
    await userEvent.click(getCombobox());
    // Click out rather than Tab: Tab closes the dropdown, and jsdom then parks
    // focus on the hidden listbox instead of leaving the field, so blur wouldn't fire.
    await userEvent.click(document.body);
    await waitFor(() => expect(component.emitted()['blur']).toBeTruthy(), { timeout: 500 });
  });

  it('emits focus when the combobox receives focus', async () => {
    const component = renderKMultiSelect();
    await userEvent.click(getCombobox());
    await waitFor(() => expect(component.emitted()['focus']).toBeTruthy());
  });
});

describe('KMultiSelect — single mode (multiple=false)', () => {
  it('closes dropdown automatically after an option is selected', async () => {
    renderKMultiSelect({ multiple: false, value: null });
    await userEvent.click(getToggle());
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await userEvent.click(await screen.findByRole('option', { name: OPTIONS[0].label }));
    await waitFor(() => expect(getListbox()).toBeNull());
  });
});

describe('KMultiSelect — accessible name in single mode', () => {
  it('names the combobox by its label alone, without the selected value', () => {
    renderKMultiSelect({ multiple: false, value: 'banana', label: LABEL });
    expect(getCombobox()).toHaveAccessibleName(LABEL);
  });

  it('does not wrap the single-select input in a group', () => {
    const { container } = renderKMultiSelect({ multiple: false, value: 'banana' });
    expect(container.querySelectorAll('[role="group"]')).toHaveLength(0);
  });
});

describe('KMultiSelect — clearable', () => {
  it('clicking the clear button emits input with an empty array', async () => {
    const component = renderKMultiSelect({
      value: ['apple', 'banana'],
      clearable: true,
      messages: {
        ...BASE_PROPS.messages,
        clearText: () => CLEAR_LABEL,
      },
    });
    const clearBtn = screen.getByRole('button', { name: CLEAR_LABEL });
    await userEvent.click(clearBtn);
    const emitted = component.emitted()['input'];
    expect(emitted).toBeTruthy();
    expect(emitted[emitted.length - 1][0]).toEqual([]);
  });
});

describe('KMultiSelect — validation state', () => {
  it('shows error immediately on mount when invalid=true', () => {
    renderKMultiSelect({ invalid: true, invalidText: INVALID_TEXT });
    expect(screen.getByText(INVALID_TEXT)).toBeInTheDocument();
    expect(getCombobox()).toHaveAttribute('aria-invalid', 'true');
  });

  it('error becomes hidden when invalid prop is set to false', async () => {
    const component = renderKMultiSelect({ invalid: true, invalidText: INVALID_TEXT });
    expect(screen.getByText(INVALID_TEXT)).toBeInTheDocument();
    await component.updateProps({ invalid: false });
    await waitFor(() => expect(screen.queryByText(INVALID_TEXT)).not.toBeInTheDocument());
  });
});

describe('KMultiSelect — listbox description text', () => {
  it('renders the listbox description text from a function-valued clickable message', async () => {
    renderKMultiSelect({
      messages: {
        open: () => 'Open',
        close: () => 'Close',
        clickable: () => CLICKABLE_TEXT,
      },
    });
    await userEvent.click(getToggle());
    const listbox = await screen.findByRole('listbox');
    const descriptionId = listbox.getAttribute('aria-describedby');
    const description = document.getElementById(descriptionId);
    expect(description).toHaveTextContent(CLICKABLE_TEXT);
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

describe('KMultiSelect — searchText sync in single mode', () => {
  it('emits update:searchText when the value is set externally', async () => {
    const component = renderKMultiSelect({ multiple: false, value: null });
    await component.updateProps({ value: 'banana' });
    await waitFor(() => {
      const emitted = component.emitted()['update:searchText'];
      expect(emitted).toBeTruthy();
      expect(emitted[emitted.length - 1][0]).toBe('Banana');
    });
  });
});

describe('KMultiSelect — cascade props guard', () => {
  it('warns in development when autoSelectParent and autoSelectChild are both set', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    renderKMultiSelect({ autoSelectParent: true, autoSelectChild: true });
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('cannot be used together'));
    warnSpy.mockRestore();
  });

  it('does not warn when only one cascade prop is set', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    renderKMultiSelect({ autoSelectChild: true });
    expect(warnSpy).not.toHaveBeenCalledWith(expect.stringContaining('cannot be used together'));
    warnSpy.mockRestore();
  });
});

describe('KMultiSelect — single mode pre-fill', () => {
  it('does not filter the option list when the dropdown opens with a pre-filled value', async () => {
    renderKMultiSelect({
      multiple: false,
      value: 'apple',
    });
    await userEvent.click(getCombobox());
    await userEvent.keyboard('{ArrowDown}');

    const allOptions = await screen.findAllByRole('option');
    expect(allOptions).toHaveLength(OPTIONS.length);
  });

  it('does filter options once the user starts typing after the dropdown opens', async () => {
    renderKMultiSelect({
      multiple: false,
      value: 'apple',
    });

    await userEvent.click(getCombobox());
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.clear(getCombobox());
    await userEvent.type(getCombobox(), 'ban');

    const visibleOptions = await screen.findAllByRole('option');
    expect(visibleOptions).toHaveLength(1);
    expect(visibleOptions[0]).toHaveAccessibleName('Banana');
  });
});
