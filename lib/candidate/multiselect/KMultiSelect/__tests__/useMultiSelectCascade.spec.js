import { ref, reactive } from 'vue';
import useMultiSelectCascade from '../useMultiSelectCascade';

const getPoliteRegion = () => document.querySelector('#k-live-region [aria-live="polite"]');

describe('useMultiSelectCascade', () => {
  let props, emit, normalizedOptions;

  beforeEach(() => {
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

  it('marks parent as indeterminate when all children are selected but parent is not', () => {
    props.value = ['child1', 'child2'];
    const { indeterminateValues } = makeCascade();
    expect(indeterminateValues.value.has('parent')).toBe(true);
  });

  it('indeterminateValues returns empty set in single mode', () => {
    props.multiple = false;
    props.value = 'child1';
    const { indeterminateValues } = makeCascade();
    expect(indeterminateValues.value.size).toBe(0);
  });

  it('emits only the child when a child is selected without its parent', () => {
    const { onListboxInput } = makeCascade();
    onListboxInput(['child1']);
    expect(emit).toHaveBeenCalledWith('input', ['child1']);
  });

  it('removes descendants when a parent is deselected', () => {
    props.value = ['parent', 'child1', 'child2'];
    const { onListboxInput } = makeCascade();
    onListboxInput(['child1', 'child2']);
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

  it('removeOption removes the option and cascades descendants off', () => {
    props.value = ['parent', 'child1', 'child2'];
    const { removeOption } = makeCascade();
    removeOption('parent');
    expect(emit).toHaveBeenCalledWith('input', []);
  });

  it('removeOption sends only the removed announcement, not the generic selected one', () => {
    props.value = ['parent', 'child1', 'child2'];
    const { removeOption } = makeCascade();
    removeOption('child1');
    expect(getPoliteRegion()).not.toHaveTextContent('Selected');
    expect(getPoliteRegion()).toHaveTextContent('Child One removed, 2 items selected');
  });

  it('removeOption removes only the child when a child chip is removed', () => {
    props.value = ['parent', 'child1', 'child2'];
    const { removeOption } = makeCascade();
    removeOption('child1');
    expect(emit).toHaveBeenCalledWith('input', ['parent', 'child2']);
  });

  it('indeterminateValues returns empty set for a flat option list with no level property', () => {
    normalizedOptions.value = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
    ];
    props.value = ['a'];
    const { indeterminateValues } = makeCascade();
    expect(indeterminateValues.value.size).toBe(0);
  });

  it('removeOption announces singular item when one item remains', () => {
    props.value = ['parent', 'child1'];
    const { removeOption } = makeCascade();
    removeOption('child1');
    expect(getPoliteRegion()).toHaveTextContent('Child One removed, 1 item selected');
  });
});
