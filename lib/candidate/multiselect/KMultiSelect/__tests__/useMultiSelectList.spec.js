import { ref, reactive } from 'vue';
import useMultiSelectList from '../useMultiSelectList';

const getPoliteRegion = () => document.querySelector('#k-live-region [aria-live="polite"]');

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

  it('removeOption emits the updated array without the removed value in multi mode', () => {
    props.value = ['1', '2', '3'];
    const { removeOption } = useMultiSelectList(props, emit, { searchText });
    removeOption('2');
    expect(emit).toHaveBeenCalledWith('input', ['1', '3']);
  });

  it('removeOption emits null in single mode', () => {
    props.multiple = false;
    props.value = '1';
    const { removeOption } = useMultiSelectList(props, emit, { searchText });
    removeOption('1');
    expect(emit).toHaveBeenCalledWith('input', null);
  });

  it('clearAll emits an empty array in multi mode', () => {
    props.value = ['1', '2'];
    const { clearAll } = useMultiSelectList(props, emit, { searchText });
    clearAll();
    expect(emit).toHaveBeenCalledWith('input', []);
  });

  it('clearAll emits null in single mode', () => {
    props.multiple = false;
    const { clearAll } = useMultiSelectList(props, emit, { searchText });
    clearAll();
    expect(emit).toHaveBeenCalledWith('input', null);
  });

  it('removeOption announces the static messages.removed string', () => {
    props.value = ['1', '2', '3'];
    const { removeOption } = useMultiSelectList(props, emit, {
      searchText,
      messages: { removed: 'Selection removed' },
    });
    removeOption('2');
    expect(getPoliteRegion()).toHaveTextContent('Selection removed');
  });

  it('clearAll announces the static messages.cleared string', () => {
    props.value = ['1', '2'];
    const { clearAll } = useMultiSelectList(props, emit, {
      searchText,
      messages: { cleared: 'All selections cleared' },
    });
    clearAll();
    expect(getPoliteRegion()).toHaveTextContent('All selections cleared');
  });

  it('removeOption calls messages.removed$ with { label, count } and announces the result', () => {
    props.value = ['1', '2', '3'];
    const removed$ = jest.fn(({ label, count }) => `${label} removed, ${count} remaining`);
    const { removeOption } = useMultiSelectList(props, emit, {
      searchText,
      messages: { removed$ },
    });
    removeOption('2');
    expect(removed$).toHaveBeenCalledWith({ label: 'Option Two', count: 2 });
    expect(getPoliteRegion()).toHaveTextContent('Option Two removed, 2 remaining');
  });

  it('clearAll calls messages.cleared$ and announces the result', () => {
    props.value = ['1', '2'];
    const cleared$ = jest.fn(() => 'All selections have been cleared');
    const { clearAll } = useMultiSelectList(props, emit, {
      searchText,
      messages: { cleared$ },
    });
    clearAll();
    expect(cleared$).toHaveBeenCalled();
    expect(getPoliteRegion()).toHaveTextContent('All selections have been cleared');
  });

  it('messages.removed$ takes priority over messages.removed when both are provided', () => {
    props.value = ['1', '2', '3'];
    const removed$ = jest.fn(({ label }) => `${label} deselected`);
    const { removeOption } = useMultiSelectList(props, emit, {
      searchText,
      messages: {
        removed: 'Selection removed', // static — should be ignored
        removed$, // function — should take priority
      },
    });
    removeOption('1');
    expect(removed$).toHaveBeenCalled();
    expect(getPoliteRegion()).toHaveTextContent('Option One deselected');
  });
});
