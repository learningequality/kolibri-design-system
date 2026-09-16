import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
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

  it('toggles the active option on Space when the search input is empty', async () => {
    const component = renderKMultiSelect();
    await userEvent.click(getToggle());
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard(' ');
    const emitted = component.emitted()['input'];
    expect(emitted).toBeTruthy();
    expect(emitted[emitted.length - 1][0]).toEqual([OPTIONS[0].value]);
    expect(getCombobox()).toHaveValue('');
  });

  it('opens on Space without typing the space into the search input', async () => {
    renderKMultiSelect();
    getCombobox().focus();
    expect(getListbox()).not.toBeInTheDocument();
    await userEvent.keyboard(' ');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(getCombobox()).toHaveValue('');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard(' ');
    expect(getCombobox()).toHaveValue('');
  });

  it('types a space instead of toggling once the user has started typing', async () => {
    const component = renderKMultiSelect();
    await userEvent.click(getToggle());
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.type(getCombobox(), 'a');
    await userEvent.keyboard(' ');
    expect(component.emitted()['input']).toBeFalsy();
    expect(getCombobox()).toHaveValue('a ');
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

// Cascade, indentation and live-region logic live in the composable and node specs, which
// take no `expanded` prop. These cover wiring: the listbox renders from a new place now.
describe('KMultiSelect — expanded mode', () => {
  const HIERARCHICAL_OPTIONS = [
    { label: 'Fruit', value: 'fruit', level: 0 },
    { label: 'Apple', value: 'apple', level: 1 },
    { label: 'Banana', value: 'banana', level: 1 },
  ];

  const indentFor = depth => `${16 + depth * 24}px`;

  const renderExpanded = (propsOverrides = {}, options = {}) =>
    render(KMultiSelect, {
      props: { ...BASE_PROPS, expanded: true, ...propsOverrides },
      ...options,
    });

  it('is off by default, so no listbox renders on mount', () => {
    renderKMultiSelect();
    expect(getListbox()).toBeNull();
  });

  it('renders the listbox on mount without any interaction', async () => {
    renderExpanded();
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(OPTIONS.length);
  });

  it('points the combobox at the permanently visible listbox', async () => {
    renderExpanded();
    const listbox = await screen.findByRole('listbox');
    expect(getCombobox()).toHaveAttribute('aria-expanded', 'true');
    expect(getCombobox()).toHaveAttribute('aria-controls', listbox.id);
  });

  it('keeps the list visible on Escape', async () => {
    renderExpanded();
    await userEvent.click(getCombobox());
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.getByRole('listbox')).toBeInTheDocument());
  });

  it('lets Escape bubble so an enclosing modal can handle it', async () => {
    const onEscape = jest.fn();
    document.body.addEventListener('keydown', onEscape);
    try {
      renderExpanded();
      await userEvent.click(getCombobox());
      await userEvent.keyboard('{Escape}');
      expect(onEscape).toHaveBeenCalled();
    } finally {
      document.body.removeEventListener('keydown', onEscape);
    }
  });

  it('keeps the list visible after Tab moves focus away', async () => {
    renderExpanded();
    await userEvent.click(getCombobox());
    await userEvent.tab();
    await waitFor(() => expect(screen.getByRole('listbox')).toBeInTheDocument());
  });

  it('keeps the list visible after a click outside the component', async () => {
    renderExpanded();
    await userEvent.click(getCombobox());
    await userEvent.click(document.body);
    await waitFor(() => expect(screen.getByRole('listbox')).toBeInTheDocument());
  });

  it('keeps the list visible on blur, and still emits blur', async () => {
    const component = renderExpanded();
    await fireEvent.focus(getCombobox());
    await fireEvent.blur(getCombobox());
    await userEvent.click(document.body);
    await waitFor(() => expect(component.emitted()['blur']).toBeTruthy(), { timeout: 500 });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(OPTIONS.length);
  });

  it('keeps the list visible after an option is selected', async () => {
    const component = renderExpanded();
    await userEvent.click(await screen.findByRole('option', { name: OPTIONS[0].label }));
    expect(component.emitted()['input']).toBeTruthy();
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('filters the inline list as the user types', async () => {
    renderExpanded();
    await userEvent.type(getCombobox(), 'ban');
    await waitFor(() => {
      const visible = screen.getAllByRole('option');
      expect(visible).toHaveLength(1);
      expect(visible[0]).toHaveAccessibleName('Banana');
    });
  });

  it('selects with ArrowDown then Enter, without an open step', async () => {
    const component = renderExpanded();
    await userEvent.click(getCombobox());
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
    const emitted = component.emitted()['input'];
    expect(emitted).toBeTruthy();
    expect(emitted[emitted.length - 1][0]).toEqual([OPTIONS[0].value]);
  });

  it('toggles with ArrowDown then Space, without an open step', async () => {
    const component = renderExpanded();
    await userEvent.click(getCombobox());
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard(' ');
    const emitted = component.emitted()['input'];
    expect(emitted).toBeTruthy();
    expect(emitted[emitted.length - 1][0]).toEqual([OPTIONS[0].value]);
    expect(getCombobox()).toHaveFocus();
  });

  it('ignores activation of an option while disabled', async () => {
    const component = renderExpanded({ disabled: true });
    const option = await screen.findByRole('option', { name: OPTIONS[0].label });
    // `pointer-events: none` stops real pointers but not the synthetic clicks
    // assistive tech dispatches, so the handler has to refuse them too.
    option.click();
    expect(component.emitted()['input']).toBeFalsy();
  });

  it('does not select anything on Space when no option is active', async () => {
    const component = renderExpanded();
    await userEvent.click(getCombobox());
    await userEvent.keyboard(' ');
    expect(component.emitted()['input']).toBeFalsy();
  });

  it('clears all selections while leaving the list visible', async () => {
    const component = renderExpanded({
      value: ['apple', 'banana'],
      clearable: true,
      messages: { ...BASE_PROPS.messages, clearText: () => CLEAR_LABEL },
    });
    await userEvent.click(screen.getByRole('button', { name: CLEAR_LABEL }));
    const emitted = component.emitted()['input'];
    expect(emitted[emitted.length - 1][0]).toEqual([]);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('renders the #option slot inside the inline list', async () => {
    renderExpanded(
      {},
      { scopedSlots: { option: '<span slot-scope="{ node }">custom-{{ node.label }}</span>' } },
    );
    expect(await screen.findByText(`custom-${OPTIONS[0].label}`)).toBeInTheDocument();
  });

  it('renders the #chip slot for selections', async () => {
    renderExpanded(
      { value: ['apple'] },
      { scopedSlots: { chip: '<span slot-scope="{ option }">chip-{{ option.label }}</span>' } },
    );
    expect(await screen.findByText(`chip-${OPTIONS[0].label}`)).toBeInTheDocument();
  });

  it('renders the #no-results slot when the query matches nothing', async () => {
    renderExpanded(
      {},
      {
        scopedSlots: {
          'no-results': '<span slot-scope="{ searchText }">nothing for {{ searchText }}</span>',
        },
      },
    );
    await userEvent.type(getCombobox(), 'zzz');
    await waitFor(() => expect(screen.getByText('nothing for zzz')).toBeInTheDocument());
  });

  it('indents hierarchical options by depth in the inline list', async () => {
    renderExpanded({ options: HIERARCHICAL_OPTIONS });
    const parent = await screen.findByRole('option', { name: 'Fruit' });
    const child = await screen.findByRole('option', { name: 'Apple' });
    expect(parent).toHaveStyle({ paddingInlineStart: indentFor(0) });
    expect(child).toHaveStyle({ paddingInlineStart: indentFor(1) });
  });

  it('cascades a parent selection through the inline list with autoSelectChild', async () => {
    const component = renderExpanded({
      options: HIERARCHICAL_OPTIONS,
      autoSelectChild: true,
    });
    await userEvent.click(await screen.findByRole('option', { name: 'Fruit' }));
    const emitted = component.emitted()['input'];
    expect(emitted).toBeTruthy();
    expect(emitted[emitted.length - 1][0]).toEqual(
      expect.arrayContaining(['fruit', 'apple', 'banana']),
    );
  });

  describe('single mode', () => {
    it('shows the selected label without filtering the visible list', async () => {
      const component = renderExpanded({ multiple: false, value: null });
      await userEvent.click(await screen.findByRole('option', { name: OPTIONS[0].label }));
      await component.updateProps({ value: 'apple' });

      await waitFor(() => expect(getCombobox()).toHaveValue(OPTIONS[0].label));
      expect(screen.getAllByRole('option')).toHaveLength(OPTIONS.length);
    });

    it('keeps the list visible after a selection', async () => {
      renderExpanded({ multiple: false, value: null });
      await userEvent.click(await screen.findByRole('option', { name: OPTIONS[0].label }));
      await waitFor(() => expect(screen.getByRole('listbox')).toBeInTheDocument());
    });

    it('restores the full list when the query is edited back to the selected label', async () => {
      const component = renderExpanded({ multiple: false, value: null });
      await userEvent.click(await screen.findByRole('option', { name: OPTIONS[0].label }));
      await component.updateProps({ value: 'apple' });
      await waitFor(() => expect(getCombobox()).toHaveValue(OPTIONS[0].label));

      await userEvent.type(getCombobox(), 'z');
      await userEvent.keyboard('{Backspace}');

      await waitFor(() => expect(getCombobox()).toHaveValue(OPTIONS[0].label));
      expect(screen.getAllByRole('option')).toHaveLength(OPTIONS.length);
    });
  });

  it('shows the list when expanded is switched on after mount', async () => {
    const component = renderKMultiSelect();
    expect(getListbox()).not.toBeInTheDocument();
    await component.updateProps({ expanded: true });
    await waitFor(() => expect(screen.getByRole('listbox')).toBeInTheDocument());
  });

  it('drops the active option on blur, so it does not outlive its focus ring', async () => {
    renderExpanded();
    await userEvent.click(getCombobox());
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(getCombobox()).toHaveAttribute('aria-activedescendant'));

    await fireEvent.blur(getCombobox());
    await userEvent.click(document.body);

    await waitFor(() => expect(getCombobox()).not.toHaveAttribute('aria-activedescendant'), {
      timeout: 500,
    });
  });
});
