import { shallowMount, mount } from '@vue/test-utils';
import KDateRange from '../index';
import KDateInput from '../KDateInput';
import KDateCalendar from '../KDateCalendar';


describe('KDateRange component', () => {
  it(`smoke test`, () => {
    const wrapper = mount(KDateRange, {
      propsData: {
        defaultStartDate: new Date(2022, 8, 1),
        firstAllowedDate: new Date(2022, 1, 1),
        lastAllowedDate: new Date(),
        title: 'Select a date range',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  /**
   *
   * I expect the correct errors to appear when invalid/disallowed dates are typed
   *
   * I expect the start and end dates to be emitted when the submit button is pressed
   *
   * I expect the correct dates to already be selected if a default start date is given or
   * no dates to be selected if no default start date is given
   *
   * */
});
