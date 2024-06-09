import { shallowMount } from '@vue/test-utils';
import KTable from '../../lib/KTable';

describe('KTable.vue', () => {
  it('should mount the component', () => {
    const headers = ['Name', 'Age', 'City'];
    const rows = [
      ['Alice', 25, 'New York'],
      ['Bob', 30, 'Los Angeles'],
      ['Charlie', 35, 'San Francisco'],
    ];
    const wrapper = shallowMount(KTable, {
      propsData: {
        headers,
        rows,
      },
    });
    const thElements = wrapper.findAll('th');
    expect(thElements.length).toBe(headers.length);
  });
  it('should render correct number of rows', () => {
    const headers = ['Name', 'Age', 'City'];
    const rows = [
      ['Alice', 25, 'New York'],
      ['Bob', 30, 'Los Angeles'],
      ['Charlie', 35, 'San Francisco'],
    ];
    const wrapper = shallowMount(KTable, {
      propsData: {
        headers,
        rows,
      },
    });
    const trElements = wrapper.findAll('tbody tr');
    expect(trElements.length).toBe(rows.length);
  });
});
