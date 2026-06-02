import { ref, reactive } from 'vue';
import useMultiSelectCascade from '../useMultiSelectCascade';

describe('useMultiSelectCascade', () => {
  let props, emit, normalizedOptions, searchText;

  beforeEach(() => {
    props = reactive({
      options: [
        { value: 'parent', level: 1 },
        { value: 'child1', level: 2 },
        { value: 'child2', level: 2 },
      ],
      value: [],
      multiple: true,
    });
    emit = jest.fn();
    normalizedOptions = ref(props.options);
    searchText = ref('');
  });

  it('computes indeterminate state when some but not all children are selected', () => {
    props.value = ['child1'];
    const { indeterminateValues } = useMultiSelectCascade(props, emit, {
      normalizedOptions,
      getOptionValue: o => o.value,
      searchText,
      closeDropdown: jest.fn(),
    });

    expect(Array.from(indeterminateValues.value)).toEqual(['parent']);
  });

  it('does not set indeterminate when all children are selected', () => {
    props.value = ['child1', 'child2', 'parent'];
    const { indeterminateValues } = useMultiSelectCascade(props, emit, {
      normalizedOptions,
      getOptionValue: o => o.value,
      searchText,
      closeDropdown: jest.fn(),
    });

    expect(Array.from(indeterminateValues.value)).toEqual([]);
  });

  it('cascades correctly on listbox input', () => {
    const { onListboxInput } = useMultiSelectCascade(props, emit, {
      normalizedOptions,
      getOptionValue: o => o.value,
      searchText,
      closeDropdown: jest.fn(),
    });

    onListboxInput(['child1']);
    expect(emit).toHaveBeenCalledWith('input', ['child1', 'parent']);
  });
});
