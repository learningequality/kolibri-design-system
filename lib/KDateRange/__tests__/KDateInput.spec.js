import { mount } from '@vue/test-utils';
import KDateInput from '../KDateInput';

describe('KDateInput component', () => {
  it(`smoke test`, () => {
    const wrapper = mount(KDateInput, {
      propsData: {
        legendText: 'Start Date',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
