import { ref, reactive } from 'vue';
import useMultiSelectList from '../useMultiSelectList';

describe('useMultiSelectList', () => {
  let props, emit, searchText;

  beforeEach(() => {
    props = reactive({
      options: [
        { id: '1', name: 'Option One', tags: ['red', 'first'] },
        { id: '2', name: 'Option Two', tags: ['blue', 'second'] },
      ],
      value: [],
      multiple: true,
      itemText: 'name',
      itemValue: 'id',
      searchKeys: null,
      allowCustom: false,
      maxlength: null,
    });
    emit = jest.fn();
    searchText = ref('');
  });

  it('normalizes object options correctly', () => {
    const { normalizedOptions } = useMultiSelectList(props, emit, { searchText });
    expect(normalizedOptions.value).toEqual([
      { id: '1', name: 'Option One', tags: ['red', 'first'] },
      { id: '2', name: 'Option Two', tags: ['blue', 'second'] },
    ]);
  });

  it('normalizes primitive options correctly with default props', () => {
    props.options = ['Option A', 'Option B'];
    props.itemText = 'label';
    props.itemValue = 'value';
    const { normalizedOptions, getOptionText, getOptionValue } = useMultiSelectList(props, emit, { searchText });
    expect(normalizedOptions.value).toEqual([
      { value: 'Option A', label: 'Option A' },
      { value: 'Option B', label: 'Option B' },
    ]);
    expect(getOptionText(normalizedOptions.value[0])).toBe('Option A');
    expect(getOptionValue(normalizedOptions.value[0])).toBe('Option A');
  });

  it('reads option text and value based on itemText and itemValue props', () => {
    const { getOptionText, getOptionValue } = useMultiSelectList(props, emit, { searchText });
    expect(getOptionText({ id: '1', name: 'Option One' })).toBe('Option One');
    expect(getOptionValue({ id: '1', name: 'Option One' })).toBe('1');
  });

  it('filters options based on search text matching option text', () => {
    const { displayedOptions } = useMultiSelectList(props, emit, { searchText });
    expect(displayedOptions.value).toHaveLength(2);

    searchText.value = 'one';
    expect(displayedOptions.value).toEqual([
      { id: '1', name: 'Option One', tags: ['red', 'first'] },
    ]);
  });

  it('filters options based on searchKeys array', () => {
    props.searchKeys = ['tags', 'id'];
    const { displayedOptions } = useMultiSelectList(props, emit, { searchText });

    searchText.value = 'blue';
    expect(displayedOptions.value).toEqual([
      { id: '2', name: 'Option Two', tags: ['blue', 'second'] },
    ]);

    searchText.value = 'first';
    expect(displayedOptions.value).toEqual([
      { id: '1', name: 'Option One', tags: ['red', 'first'] },
    ]);
  });

  it('correctly maps selection data in single and multi mode', () => {
    props.value = ['1'];
    const { selectedOptionsData } = useMultiSelectList(props, emit, { searchText });
    expect(selectedOptionsData.value).toEqual([
      { id: '1', name: 'Option One', tags: ['red', 'first'] },
    ]);

    props.multiple = false;
    props.value = '2';
    expect(selectedOptionsData.value).toEqual([
      { id: '2', name: 'Option Two', tags: ['blue', 'second'] },
    ]);
  });

  it('removes option and emits input event correctly', () => {
    props.value = ['1', '2'];
    const { removeOption } = useMultiSelectList(props, emit, { searchText });

    removeOption('1');
    expect(emit).toHaveBeenCalledWith('input', ['2']);

    props.multiple = false;
    props.value = '2';
    const { removeOption: removeOptionSingle } = useMultiSelectList(props, emit, { searchText });
    removeOptionSingle('2');
    expect(emit).toHaveBeenCalledWith('input', null);
  });

  it('clears all options correctly', () => {
    const { clearAll } = useMultiSelectList(props, emit, { searchText });
    clearAll();
    expect(emit).toHaveBeenCalledWith('input', []);

    props.multiple = false;
    const { clearAll: clearAllSingle } = useMultiSelectList(props, emit, { searchText });
    clearAllSingle();
    expect(emit).toHaveBeenCalledWith('input', null);
  });

  it('supports allowCustom synthetic options in search results and selection mapping', () => {
    props.allowCustom = true;
    searchText.value = 'custom text';

    const { displayedOptions, selectedOptionsData } = useMultiSelectList(props, emit, { searchText });

    expect(displayedOptions.value[0]).toEqual({
      id: 'custom text',
      name: 'custom text',
    });

    props.value = ['custom text'];
    expect(selectedOptionsData.value).toEqual([
      { id: 'custom text', name: 'custom text' },
    ]);
  });
});
