import { render, screen } from '@testing-library/vue';
import KMultiSelectDropdown from '../components/KMultiSelectDropdown.vue';

const LISTBOX_MESSAGES = {
  clickable: () => 'Options are clickable',
  allOptionsSelected: () => 'All options selected',
  allOptionsDeselected: () => 'No options selected',
  optionDeselected: () => 'Deselected',
};

const FLAT_OPTIONS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

const HIERARCHICAL_OPTIONS = [
  { label: 'Fruit', value: 'fruit', level: 0 },
  { label: 'Apple', value: 'apple', level: 1 },
  { label: 'Banana', value: 'banana', level: 1 },
  { label: 'Vegetable', value: 'vegetable', level: 0 },
  { label: 'Carrot', value: 'carrot', level: 1 },
];

const BASE_PROPS = {
  isOpen: true,
  listboxId: 'test-listbox',
  listboxLabel: 'Test options',
  listboxMessages: LISTBOX_MESSAGES,
  selectedValues: [],
  options: FLAT_OPTIONS,
  itemText: 'label',
  itemValue: 'value',
  indeterminateValues: new Set(),
  noResultsText: null,
  multiple: true,
  hideSelected: false,
};

function renderDropdown(propsOverrides = {}) {
  return render(KMultiSelectDropdown, {
    props: { ...BASE_PROPS, ...propsOverrides },
  });
}

const NO_RESULTS_TEXT = 'No matches found';
const DROPDOWN_PANEL_TESTID = 'kmselect-dropdown-panel';
const INDENT_BASE_PX = 16;
const INDENT_STEP_PX = 24;
const indentStyle = depth => `${INDENT_BASE_PX + depth * INDENT_STEP_PX}px`;

describe('KMultiSelectDropdown — flat option list', () => {
  it('renders all flat options as listbox options', async () => {
    renderDropdown();
    expect(await screen.findByRole('option', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Cherry' })).toBeInTheDocument();
  });

  it('renders no options when options array is empty', async () => {
    renderDropdown({ options: [] });
    expect(screen.queryAllByRole('option')).toHaveLength(0);
  });

  it('renders options with custom itemText and itemValue keys', async () => {
    renderDropdown({
      options: [{ name: 'Mango', id: 'mango' }],
      itemText: 'name',
      itemValue: 'id',
    });
    expect(await screen.findByRole('option', { name: 'Mango' })).toBeInTheDocument();
  });
});

describe('KMultiSelectDropdown — hierarchical option list', () => {
  it('renders all nodes (parents and children) as options', async () => {
    renderDropdown({ options: HIERARCHICAL_OPTIONS });
    expect(await screen.findByRole('option', { name: 'Fruit' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Vegetable' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Carrot' })).toBeInTheDocument();
  });

  it('renders children indented under their parent (depth > 0)', async () => {
    renderDropdown({ options: HIERARCHICAL_OPTIONS });
    const apple = await screen.findByRole('option', { name: 'Apple' });
    expect(apple).toHaveStyle({ paddingInlineStart: indentStyle(1) });
  });

  it('renders a 3-level hierarchy correctly', async () => {
    const deepOptions = [
      { label: 'Root', value: 'root', level: 0 },
      { label: 'Mid', value: 'mid', level: 1 },
      { label: 'Leaf', value: 'leaf', level: 2 },
    ];
    renderDropdown({ options: deepOptions });
    expect(await screen.findByRole('option', { name: 'Root' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Mid' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Leaf' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Leaf' })).toHaveStyle({
      paddingInlineStart: indentStyle(2),
    });
  });

  it('falls back to root when a child option has no valid parent in the stack', async () => {
    const orphanOptions = [
      { label: 'Root', value: 'root', level: 0 },
      { label: 'Orphan', value: 'orphan', level: 2 },
    ];
    renderDropdown({ options: orphanOptions });
    expect(await screen.findByRole('option', { name: 'Root' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Orphan' })).toBeInTheDocument();
  });

  it('treats options with no level property as root-level (depth 0)', async () => {
    const noLevelOptions = [{ label: 'No Level', value: 'no-level' }];
    renderDropdown({ options: noLevelOptions });
    expect(await screen.findByRole('option', { name: 'No Level' })).toBeInTheDocument();
  });
});

describe('KMultiSelectDropdown — hideSelected', () => {
  it('shows all options when hideSelected is false', async () => {
    renderDropdown({ selectedValues: ['apple'], hideSelected: false });
    expect(await screen.findByRole('option', { name: 'Apple' })).toBeInTheDocument();
  });

  it('removes selected options from the list when hideSelected is true', async () => {
    renderDropdown({ selectedValues: ['apple'], hideSelected: true });
    await screen.findByRole('option', { name: 'Banana' });
    expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument();
  });

  it('shows all options again when none are selected and hideSelected is true', async () => {
    renderDropdown({ selectedValues: [], hideSelected: true });
    expect(await screen.findByRole('option', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Cherry' })).toBeInTheDocument();
  });
});

describe('KMultiSelectDropdown — checkbox visibility', () => {
  it('shows checkboxes (KCheckbox) when multiple=true and hideSelected=false', async () => {
    renderDropdown({ multiple: true, hideSelected: false });
    await screen.findByRole('option', { name: 'Apple' });
    expect(screen.getAllByTestId('icon-unchecked').length).toBeGreaterThan(0);
  });

  it('hides checkboxes when multiple=false (single-select mode)', async () => {
    renderDropdown({ multiple: false });
    await screen.findByRole('option', { name: 'Apple' });
    expect(screen.queryAllByTestId('icon-unchecked')).toHaveLength(0);
  });

  it('hides checkboxes when hideSelected=true (tags mode)', async () => {
    renderDropdown({ multiple: true, hideSelected: true });
    await screen.findByRole('option', { name: 'Apple' });
    expect(screen.queryAllByTestId('icon-unchecked')).toHaveLength(0);
  });
});

describe('KMultiSelectDropdown — empty state', () => {
  it('shows noResultsText when options array is empty and searchText is present', async () => {
    renderDropdown({ options: [], noResultsText: NO_RESULTS_TEXT, searchText: 'foo' });
    expect(await screen.findByText(NO_RESULTS_TEXT)).toBeInTheDocument();
  });

  it('does not show the empty message when options are empty but searchText is empty', () => {
    renderDropdown({ options: [], noResultsText: NO_RESULTS_TEXT, searchText: '' });
    expect(screen.queryByText(NO_RESULTS_TEXT)).not.toBeInTheDocument();
  });

  it('does not show the empty message when options are present', () => {
    renderDropdown({ noResultsText: NO_RESULTS_TEXT, searchText: 'foo' });
    expect(screen.queryByText(NO_RESULTS_TEXT)).not.toBeInTheDocument();
  });
});

describe('KMultiSelectDropdown — expanded mode', () => {
  it('renders in flow, without the floating panel modifier', () => {
    renderDropdown({ expanded: true });
    expect(screen.getByTestId(DROPDOWN_PANEL_TESTID)).toHaveClass('kmselect-dropdown-inline');
  });

  it('keeps the floating panel styling when expanded is off', () => {
    renderDropdown();
    expect(screen.getByTestId(DROPDOWN_PANEL_TESTID)).not.toHaveClass('kmselect-dropdown-inline');
  });

  it('applies the maxHeight prop to the list', () => {
    renderDropdown({ expanded: true, maxHeight: '250px' });
    expect(screen.getByTestId(DROPDOWN_PANEL_TESTID)).toHaveStyle({ maxHeight: '250px' });
  });

  it('keeps focus on the combobox by taking the list out of the tab order', async () => {
    renderDropdown({ expanded: true });
    const listbox = await screen.findByRole('listbox');
    expect(listbox).toHaveAttribute('tabindex', '-1');
    expect(listbox).not.toHaveAttribute('aria-disabled');
  });

  it('marks the list inert when disabled in expanded mode', async () => {
    renderDropdown({ expanded: true, disabled: true });
    const listbox = await screen.findByRole('listbox');
    expect(listbox).toHaveAttribute('aria-disabled', 'true');
    expect(listbox).toHaveAttribute('tabindex', '-1');
  });

  it('ignores disabled when expanded is off', async () => {
    renderDropdown({ disabled: true });
    const listbox = await screen.findByRole('listbox');
    expect(listbox).not.toHaveAttribute('aria-disabled');
  });
});
