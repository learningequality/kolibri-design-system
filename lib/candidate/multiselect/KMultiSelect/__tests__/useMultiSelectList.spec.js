import { ref, reactive } from 'vue';
import useMultiSelectList from '../useMultiSelectList';

describe('useMultiSelectList', () => {
  let props, emit, searchText;

  beforeEach(() => {
    props = reactive({
      options: [
        { id: '1', name: 'Option One', tags: ['red', 'first'] },
        { id: '2', name: 'Option Two', tags: ['blue', 'second'] },
        { id: '3', name: 'Option Three', tags: ['green', 'third'] },
      ],
      value: [],
      multiple: true,
      itemText: 'name',
      itemValue: 'id',
      searchKeys: null,
    });
    emit = jest.fn();
    searchText = ref('');
  });

  it('passes through object options unchanged', () => {
    const { normalizedOptions } = useMultiSelectList(props, emit, { searchText });
    expect(normalizedOptions.value).toHaveLength(3);
    expect(normalizedOptions.value[0]).toEqual({
      id: '1',
      name: 'Option One',
      tags: ['red', 'first'],
    });
  });

  it('normalizes primitive options to { value, label } shape', () => {
    props.options = ['Apple', 5];
    props.itemText = 'label';
    props.itemValue = 'value';
    const { normalizedOptions } = useMultiSelectList(props, emit, { searchText });
    expect(normalizedOptions.value).toEqual([
      { value: 'Apple', label: 'Apple' },
      { value: 5, label: '5' },
    ]);
  });

  it('silently drops null and undefined entries from options', () => {
    props.options = [null, 'Apple', undefined, 'Banana'];
    props.itemText = 'label';
    props.itemValue = 'value';
    const { normalizedOptions } = useMultiSelectList(props, emit, { searchText });
    expect(normalizedOptions.value).toHaveLength(2);
    expect(normalizedOptions.value).toEqual([
      { value: 'Apple', label: 'Apple' },
      { value: 'Banana', label: 'Banana' },
    ]);
  });

  it('returns all options when search text is empty', () => {
    const { displayedOptions } = useMultiSelectList(props, emit, { searchText });
    expect(displayedOptions.value).toHaveLength(3);
  });

  it('filters options by itemText (case-insensitive)', () => {
    const { displayedOptions } = useMultiSelectList(props, emit, { searchText });
    searchText.value = 'one';
    expect(displayedOptions.value).toEqual([
      { id: '1', name: 'Option One', tags: ['red', 'first'] },
    ]);
  });

  it('filters by a string-valued searchKey', () => {
    props.searchKeys = ['id'];
    const { displayedOptions } = useMultiSelectList(props, emit, { searchText });
    searchText.value = '2';
    expect(displayedOptions.value).toEqual([
      { id: '2', name: 'Option Two', tags: ['blue', 'second'] },
    ]);
  });

  it('filters by an array-valued searchKey (flattens values)', () => {
    props.searchKeys = ['tags'];
    const { displayedOptions } = useMultiSelectList(props, emit, { searchText });
    searchText.value = 'blue';
    expect(displayedOptions.value).toEqual([
      { id: '2', name: 'Option Two', tags: ['blue', 'second'] },
    ]);
  });

  it('maps selected values to full option objects in multi mode', () => {
    props.value = ['1', '3'];
    const { selectedOptionsData } = useMultiSelectList(props, emit, { searchText });
    expect(selectedOptionsData.value).toEqual([
      { id: '1', name: 'Option One', tags: ['red', 'first'] },
      { id: '3', name: 'Option Three', tags: ['green', 'third'] },
    ]);
  });

  it('maps selected value to full option object in single mode', () => {
    props.multiple = false;
    props.value = '2';
    const { selectedOptionsData } = useMultiSelectList(props, emit, { searchText });
    expect(selectedOptionsData.value).toEqual([
      { id: '2', name: 'Option Two', tags: ['blue', 'second'] },
    ]);
  });

  it('returns empty array when no value is selected in single mode', () => {
    props.multiple = false;
    props.value = null;
    const { selectedOptionsData } = useMultiSelectList(props, emit, { searchText });
    expect(selectedOptionsData.value).toEqual([]);
  });

  it('removeOption removes a specific option by value in multi mode', () => {
    props.value = ['1', '2', '3'];
    const { removeOption } = useMultiSelectList(props, emit, { searchText });
    removeOption('2');
    expect(emit).toHaveBeenCalledWith('input', ['1', '3']);
  });

  it('removeOption sends the messages.removed string to the live region in multi mode', () => {
    props.value = ['1', '2', '3'];
    const { removeOption } = useMultiSelectList(props, emit, {
      searchText,
      messages: { removed: 'Selection removed' },
    });
    removeOption('2');
    expect(document.querySelector('#k-live-region [aria-live="polite"]')).toHaveTextContent(
      'Selection removed',
    );
  });

  it('removeOption sends the messages.removed string to the live region in single mode', () => {
    props.multiple = false;
    props.value = '1';
    const { removeOption } = useMultiSelectList(props, emit, {
      searchText,
      messages: { removed: 'Selection removed' },
    });
    removeOption('1');
    expect(document.querySelector('#k-live-region [aria-live="polite"]')).toHaveTextContent(
      'Selection removed',
    );
  });

  it('removeOption emits null in single mode', () => {
    props.multiple = false;
    props.value = '1';
    const { removeOption } = useMultiSelectList(props, emit, { searchText });
    removeOption('1');
    expect(emit).toHaveBeenCalledWith('input', null);
  });

  it('clearAll emits @input with empty array in multi mode', () => {
    props.value = ['1', '2'];
    const { clearAll } = useMultiSelectList(props, emit, { searchText });
    clearAll();
    expect(emit).toHaveBeenCalledWith('input', []);
  });

  it('clearAll emits @input with null in single mode', () => {
    props.multiple = false;
    const { clearAll } = useMultiSelectList(props, emit, { searchText });
    clearAll();
    expect(emit).toHaveBeenCalledWith('input', null);
  });

  it('clearAll sends the messages.cleared string to the live region', () => {
    props.value = ['1', '2'];
    const { clearAll } = useMultiSelectList(props, emit, {
      searchText,
      messages: { cleared: 'All selections cleared' },
    });
    clearAll();
    expect(document.querySelector('#k-live-region [aria-live="polite"]')).toHaveTextContent(
      'All selections cleared',
    );
  });

});
