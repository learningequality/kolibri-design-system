import { shallowMount } from '@vue/test-utils';
import KTable from '../KTable';

describe('KTable.vue', () => {
  it('should mount the component', () => {
    const headers = [
      { label: 'Name', dataType: 'string' },
      { label: 'Age', dataType: 'numeric' },
      { label: 'City', dataType: 'string' },
    ];
    const rows = [
      ['Alice', 25, 'New York'],
      ['Bob', 30, 'Los Angeles'],
      ['Charlie', 35, 'San Francisco'],
    ];
    const wrapper = shallowMount(KTable, {
      propsData: {
        headers,
        rows,
        useLocalSorting: true,
      },
    });
    const thElements = wrapper.findAll('th');
    expect(thElements.length).toBe(headers.length);
  });

  it('should render correct number of rows', () => {
    const headers = [
      { label: 'Name', dataType: 'string' },
      { label: 'Age', dataType: 'numeric' },
      { label: 'City', dataType: 'string' },
    ];
    const rows = [
      ['Alice', 25, 'New York'],
      ['Bob', 30, 'Los Angeles'],
      ['Charlie', 35, 'San Francisco'],
    ];
    const wrapper = shallowMount(KTable, {
      propsData: {
        headers,
        rows,
        useLocalSorting: true,
      },
    });
    const trElements = wrapper.findAll('tbody tr');
    expect(trElements.length).toBe(rows.length);
  });

  it('should emit changeSort event on header click when useLocalSorting is false', async () => {
    const headers = [
      { label: 'Name', dataType: 'string', sortable: true },
      { label: 'Age', dataType: 'numeric', sortable: true },
      { label: 'City', dataType: 'string', sortable: true },
    ];
    const items = [
      ['Alice', 25, 'New York'],
      ['Bob', 30, 'Los Angeles'],
      ['Charlie', 35, 'San Francisco'],
    ];
    const wrapper = shallowMount(KTable, {
      propsData: {
        headers,
        items,
        useLocalSorting: false,
      },
    });

    const thElements = wrapper.findAll('th');
    await thElements.at(0).trigger('click');
    expect(wrapper.emitted().changeSort).toBeTruthy();
  });
});
