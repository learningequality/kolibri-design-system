import { ref, reactive } from 'vue';
import useMultiSelectCascade from '../useMultiSelectCascade';

const mockSendPoliteMessage = jest.fn();
jest.mock('../../../../composables/useKLiveRegion', () => ({
  __esModule: true,
  default: () => ({ sendPoliteMessage: mockSendPoliteMessage }),
}));

const SELECTION_REMOVED_MSG = 'Selection removed';
const SELECTED_MSG = 'Selected';

describe('useMultiSelectCascade', () => {
  let props, emit, normalizedOptions;

  beforeEach(() => {
    mockSendPoliteMessage.mockClear();
    props = reactive({
      options: [
        { value: 'parent', label: 'Parent', level: 1 },
        { value: 'child1', label: 'Child One', level: 2 },
        { value: 'child2', label: 'Child Two', level: 2 },
      ],
      value: [],
      multiple: true,
    });
    emit = jest.fn();
    normalizedOptions = ref(props.options);
  });

  function makeCascade(overrides = {}) {
    return useMultiSelectCascade(props, emit, {
      normalizedOptions,
      getOptionValue: o => o.value,
      getOptionText: o => o.label,
      setSearchText: jest.fn(),
      closeDropdown: jest.fn(),
      defaultRemoveOption: jest.fn(),
      ...overrides,
    });
  }

  it('computes indeterminate state when some but not all children are selected', () => {
    props.value = ['child1'];
    const { indeterminateValues } = makeCascade();
    expect(Array.from(indeterminateValues.value)).toEqual(['parent']);
  });

  it('does not set indeterminate when all children and parent are explicitly selected', () => {
    props.value = ['child1', 'child2', 'parent'];
    const { indeterminateValues } = makeCascade();
    expect(Array.from(indeterminateValues.value)).toEqual([]);
  });

  it('automatically selects the parent when all children are selected', () => {
    props.value = ['child1', 'child2'];
    const { onListboxInput } = makeCascade();
    onListboxInput(['child1', 'child2']);
    const emittedValue = emit.mock.calls[emit.mock.calls.length - 1][1];
    expect(emittedValue).toContain('parent');
  });

  it('no partial-selection indicators appear in single mode', () => {
    props.multiple = false;
    props.value = 'child1';
    const { indeterminateValues } = makeCascade();
    expect(indeterminateValues.value.size).toBe(0);
  });

  it('emits only the child when a child is selected without its parent', () => {
    props.value = ['child1'];
    const { onListboxInput, indeterminateValues } = makeCascade();
    onListboxInput(['child1']);

    expect(emit).toHaveBeenCalledWith('input', ['child1']);

    // Confirming that the parent is NOT selected, but IS indeterminate
    expect(emit).not.toHaveBeenCalledWith('input', expect.arrayContaining(['parent']));
    expect(indeterminateValues.value.has('parent')).toBe(true);
  });

  it('removes descendants when a parent is deselected', () => {
    props.value = ['parent', 'child1', 'child2'];
    const { onListboxInput } = makeCascade();
    onListboxInput(['child1', 'child2']);
    expect(emit).toHaveBeenCalledWith('input', []);
  });

  it('removes parent and child when a grandparent is deselected', () => {
    normalizedOptions.value = [
      { value: 'grandparent', label: 'Grandparent', level: 1 },
      { value: 'parent', label: 'Parent', level: 2 },
      { value: 'child', label: 'Child', level: 3 },
    ];
    props.value = ['grandparent', 'parent', 'child'];
    const { onListboxInput } = makeCascade();
    // If the user unchecks the grandparent, the new incoming value is just ['parent', 'child']
    onListboxInput(['parent', 'child']);

    // The composable correctly cascades the removal down, wiping out the parent and child
    expect(emit).toHaveBeenCalledWith('input', []);
  });

  it('emits the new values unchanged for a flat option list', () => {
    normalizedOptions.value = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
    ];
    props.value = ['a'];
    const { onListboxInput } = makeCascade();
    onListboxInput(['a', 'b']);
    expect(emit).toHaveBeenCalledWith('input', ['a', 'b']);
  });

  it('emits a scalar value and closes the dropdown in single mode', () => {
    props.multiple = false;
    const closeDropdown = jest.fn();
    const { onListboxInput } = makeCascade({ closeDropdown });
    onListboxInput(['child1']);
    expect(emit).toHaveBeenCalledWith('input', 'child1');
    expect(closeDropdown).toHaveBeenCalled();
  });

  it('emits null when nothing is selected in single mode', () => {
    props.multiple = false;
    const { onListboxInput } = makeCascade();
    onListboxInput([]);
    expect(emit).toHaveBeenCalledWith('input', null);
  });

  it('does not clear search text when an option is selected in multi mode', () => {
    const setSearchText = jest.fn();
    const { onListboxInput } = makeCascade({ setSearchText });
    onListboxInput(['child1']);
    expect(setSearchText).not.toHaveBeenCalled();
  });

  it('does not clear search text when a chip is removed in multi mode', () => {
    props.value = ['parent', 'child1', 'child2'];
    const setSearchText = jest.fn();
    const { removeOption } = makeCascade({ setSearchText });
    removeOption('child1');
    expect(setSearchText).not.toHaveBeenCalled();
  });

  it('clears search text when an option is selected in single mode', () => {
    props.multiple = false;
    const setSearchText = jest.fn();
    const { onListboxInput } = makeCascade({ setSearchText });
    onListboxInput(['child1']);
    expect(setSearchText).toHaveBeenCalledWith('');
  });

  it('deselecting a parent chip also removes all its descendants', () => {
    props.value = ['parent', 'child1', 'child2'];
    const { removeOption } = makeCascade();
    removeOption('parent');
    expect(emit).toHaveBeenCalledWith('input', []);
  });

  it('removing a chip only announces the removal, not a selection message', () => {
    props.value = ['parent', 'child1', 'child2'];
    const { removeOption } = makeCascade({
      messages: { removed: () => SELECTION_REMOVED_MSG, selected: () => SELECTED_MSG },
    });
    removeOption('child1');
    expect(mockSendPoliteMessage).not.toHaveBeenCalledWith(SELECTED_MSG);
    expect(mockSendPoliteMessage).toHaveBeenCalledWith(SELECTION_REMOVED_MSG);
  });

  it('removing a child chip leaves the parent and sibling selected', () => {
    props.value = ['parent', 'child1', 'child2'];
    const { removeOption } = makeCascade();
    removeOption('child1');
    expect(emit).toHaveBeenCalledWith('input', ['parent', 'child2']);
  });

  it('flat options without a level property show no partial-selection indicators', () => {
    normalizedOptions.value = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
    ];
    props.value = ['a'];
    const { indeterminateValues } = makeCascade();
    expect(indeterminateValues.value.size).toBe(0);
  });

  it('removing a chip announces the removal message to the live region', () => {
    props.value = ['parent', 'child1'];
    const { removeOption } = makeCascade({
      messages: { removed: () => SELECTION_REMOVED_MSG },
    });
    removeOption('child1');
    expect(mockSendPoliteMessage).toHaveBeenCalledWith(SELECTION_REMOVED_MSG);
  });

  it('with autoSelectParent, selecting a child also selects its parent', () => {
    props.autoSelectParent = true;
    const { onListboxInput } = makeCascade();
    onListboxInput(['child1']);
    expect(emit).toHaveBeenCalledWith('input', ['child1', 'parent']);
  });

  it('with autoSelectParent, only the direct ancestor is selected, not a sibling-branch parent', () => {
    normalizedOptions.value = [
      { value: 'a', label: 'A', level: 1 },
      { value: 'b', label: 'B', level: 2 },
      { value: 'c', label: 'C', level: 1 },
      { value: 'd', label: 'D', level: 2 },
    ];
    props.autoSelectParent = true;
    const { onListboxInput } = makeCascade();
    onListboxInput(['d']);
    // Should emit ['d', 'c'] — NOT ['d', 'c', 'a']
    expect(emit).toHaveBeenCalledWith('input', ['d', 'c']);
  });

  it('without autoSelectParent, selecting a child does not auto-select the parent', () => {
    props.autoSelectParent = false;
    const { onListboxInput } = makeCascade();
    onListboxInput(['child1']);
    const emittedValue = emit.mock.calls[emit.mock.calls.length - 1][1];
    expect(emittedValue).not.toContain('parent');
  });

  it('propagates upward through multiple levels when all children at each level are selected', () => {
    normalizedOptions.value = [
      { value: 'root', label: 'Root', level: 1 },
      { value: 'a', label: 'A', level: 2 },
      { value: 'a1', label: 'A1', level: 3 },
      { value: 'a2', label: 'A2', level: 3 },
    ];
    const { onListboxInput } = makeCascade();
    onListboxInput(['a1', 'a2']);
    const emittedValue = emit.mock.calls[emit.mock.calls.length - 1][1];
    expect(emittedValue).toEqual(expect.arrayContaining(['a1', 'a2', 'a', 'root']));
  });

  it('removing a chip in a hierarchy announces the label and remaining count', () => {
    props.value = ['parent', 'child1', 'child2'];
    const removed = jest.fn(({ label, count }) => `${label} removed, ${count} selected`);
    const { removeOption } = makeCascade({ messages: { removed } });
    removeOption('child1');
    // After removing child1 from ['parent','child1','child2'], cascade leaves ['parent','child2']
    expect(removed).toHaveBeenCalledWith({ label: 'Child One', count: 2 });
    expect(mockSendPoliteMessage).toHaveBeenCalledWith('Child One removed, 2 selected');
  });

  it('selecting an option in single mode announces the label and count to the live region', () => {
    props.multiple = false;
    const selected = jest.fn(({ label, count }) => `${label} selected, ${count} total`);
    const { onListboxInput } = makeCascade({ messages: { selected } });
    onListboxInput(['child1']);
    expect(selected).toHaveBeenCalledWith({ label: 'Child One', count: 1 });
    expect(mockSendPoliteMessage).toHaveBeenCalledWith('Child One selected, 1 total');
  });

  it('selecting options in multi mode announces the last selected label and total count', () => {
    normalizedOptions.value = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
    ];
    props.value = [];
    const selected = jest.fn(({ label, count }) => `${label} added, ${count} selected`);
    const { onListboxInput } = makeCascade({ messages: { selected } });
    onListboxInput(['a', 'b']);
    expect(selected).toHaveBeenCalledWith({ label: 'A', count: 2 });
    expect(mockSendPoliteMessage).toHaveBeenCalledWith('A added, 2 selected');
  });

  it('with autoSelectChild, selecting a parent also selects all its descendants', () => {
    props.autoSelectChild = true;
    const { onListboxInput } = makeCascade();
    onListboxInput(['parent']);
    const emittedValue = emit.mock.calls[emit.mock.calls.length - 1][1];
    expect(emittedValue).toEqual(expect.arrayContaining(['parent', 'child1', 'child2']));
  });

  it('with autoSelectChild, selecting a grandparent selects all descendants at every level', () => {
    normalizedOptions.value = [
      { value: 'root', label: 'Root', level: 1 },
      { value: 'a', label: 'A', level: 2 },
      { value: 'a1', label: 'A1', level: 3 },
      { value: 'a2', label: 'A2', level: 3 },
    ];
    props.autoSelectChild = true;
    const { onListboxInput } = makeCascade();
    onListboxInput(['root']);
    const emittedValue = emit.mock.calls[emit.mock.calls.length - 1][1];
    expect(emittedValue).toEqual(expect.arrayContaining(['root', 'a', 'a1', 'a2']));
  });

  it('without autoSelectChild, selecting a parent does not auto-select its children', () => {
    props.autoSelectChild = false;
    const { onListboxInput } = makeCascade();
    onListboxInput(['parent']);
    const emittedValue = emit.mock.calls[emit.mock.calls.length - 1][1];
    expect(emittedValue).not.toContain('child1');
    expect(emittedValue).not.toContain('child2');
  });
});
