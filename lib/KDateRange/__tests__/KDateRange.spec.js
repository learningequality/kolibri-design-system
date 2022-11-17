import { shallowMount, mount } from '@vue/test-utils';
import KDateRange from '../index';
import validationConstants from '../validationConstants';
import { validationMachine } from '../ValidationMachine';

const DEFAULT_PROPS = {
  title: 'Select a date range',
  submitText: 'Generate',
  cancelText: 'Cancel',
  description: 'Test Description',
  defaultStartDate: new Date(2022, 8, 1),
  firstAllowedDate: new Date(2022, 0, 1),
  lastAllowedDate: new Date(),
  [validationConstants.MALFORMED]: 'Please enter a valid date',
  [validationConstants.START_DATE_AFTER_END_DATE]: 'End date cannot before start date',
  [validationConstants.FUTURE_DATE]: 'Cannot select a future date',
  [validationConstants.DATE_BEFORE_FIRST_ALLOWED]: 'Date must be after 01/01/2022',
};

function makeWrapper(kDateRangeProps = {}) {
  return mount(KDateRange, {
    propsData: { ...DEFAULT_PROPS, ...kDateRangeProps },
  });
}

describe('KDateRange component', () => {
  it(`smoke test`, () => {
    const wrapper = makeWrapper();
    expect(wrapper.exists()).toBe(true);
  });
});
