import { ref, reactive } from 'vue';
import useMultiSelectList from '../useMultiSelectList';

const mockSendPoliteMessage = jest.fn();
jest.mock('../../../../composables/useKLiveRegion', () => ({
  __esModule: true,
  default: () => ({ sendPoliteMessage: mockSendPoliteMessage }),
}));

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
    mockSendPoliteMessage.mockClear();
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

  it('trims leading and trailing spaces from search text before filtering', () => {
    const { displayedOptions } = useMultiSelectList(props, emit, { searchText });
    searchText.value = '  one  ';
    expect(displayedOptions.value).toEqual([
      { id: '1', name: 'Option One', tags: ['red', 'first'] },
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

  it('deselecting an option emits the updated values array without it in multi mode', () => {
    props.value = ['1', '2', '3'];
    const { removeOption } = useMultiSelectList(props, emit, { searchText });
    removeOption('2');
    expect(emit).toHaveBeenCalledWith('input', ['1', '3']);
  });

  it('deselecting the selection emits null in single mode', () => {
    props.multiple = false;
    props.value = '1';
    const { removeOption } = useMultiSelectList(props, emit, { searchText });
    removeOption('1');
    expect(emit).toHaveBeenCalledWith('input', null);
  });

  it('clearing all selections emits an empty array in multi mode', () => {
    props.value = ['1', '2'];
    const { clearAll } = useMultiSelectList(props, emit, { searchText });
    clearAll();
    expect(emit).toHaveBeenCalledWith('input', []);
  });

  it('clearing all selections emits null in single mode', () => {
    props.multiple = false;
    const { clearAll } = useMultiSelectList(props, emit, { searchText });
    clearAll();
    expect(emit).toHaveBeenCalledWith('input', null);
  });

  it('deselecting an option calls messages.removed and announces to the live region in multi mode', () => {
    props.value = ['1', '2', '3'];
    const removed = jest.fn(({ label, count }) => `${label} removed, ${count} remaining`);
    const { removeOption } = useMultiSelectList(props, emit, {
      searchText,
      messages: { removed },
    });
    removeOption('2');
    expect(removed).toHaveBeenCalledWith({ label: 'Option Two', count: 2 });
    expect(mockSendPoliteMessage).toHaveBeenCalledWith('Option Two removed, 2 remaining');
  });

  it('deselecting the selection calls messages.removed with label context in single mode', () => {
    props.multiple = false;
    props.value = '1';
    const removed = jest.fn(({ label }) => `${label} removed`);
    const { removeOption } = useMultiSelectList(props, emit, {
      searchText,
      messages: { removed },
    });
    removeOption('1');
    expect(removed).toHaveBeenCalledWith({ label: 'Option One', count: 0 });
    expect(mockSendPoliteMessage).toHaveBeenCalledWith('Option One removed');
  });

  it('clearing all selections calls messages.cleared with the count in multi mode', () => {
    props.value = ['1', '2'];
    const cleared = jest.fn(({ count }) => `${count} selections cleared`);
    const { clearAll } = useMultiSelectList(props, emit, {
      searchText,
      messages: { cleared },
    });
    clearAll();
    expect(cleared).toHaveBeenCalledWith({ count: 2 });
    expect(mockSendPoliteMessage).toHaveBeenCalledWith('2 selections cleared');
  });

  it('clearing the selection calls messages.cleared with label context in single mode', () => {
    props.multiple = false;
    props.value = '1';
    const cleared = jest.fn(({ label }) => `${label} cleared`);
    const { clearAll } = useMultiSelectList(props, emit, {
      searchText,
      messages: { cleared },
    });
    clearAll();
    expect(cleared).toHaveBeenCalledWith({ label: 'Option One' });
    expect(mockSendPoliteMessage).toHaveBeenCalledWith('Option One cleared');
  });
});
