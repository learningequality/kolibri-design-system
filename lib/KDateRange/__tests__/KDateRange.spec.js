import { mount } from '@vue/test-utils';
import KDateRange from '../index';
import validationConstants from '../validationConstants';

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

function getElements(wrapper) {
  return {
    startDate: () => wrapper.find('[data-test="startDate"]'),
    endDate: () => wrapper.find('[data-test="endDate"]'),
    kModal: () => wrapper.find('[data-test="dateRangeModal"]'),
  };
}

describe('KDateRange component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = makeWrapper();
  });

  it(`smoke test`, () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('modal submit should be disabled if there is no start and end date', async () => {
    wrapper.vm.setStartDate('');
    wrapper.vm.setEndDate('');
    const submitDisabled = wrapper.vm.disabled;
    expect(submitDisabled).toBeTruthy();
  });

  it('modal submit should be disabled if there is a start date, but no end date', async () => {
    wrapper.vm.setStartDate('01/10/2022');
    wrapper.vm.setEndDate('');
    const submitDisabled = wrapper.vm.disabled;
    expect(submitDisabled).toBeTruthy();
  });

  it('modal submit should be disabled if there is an end date, but no start date', async () => {
    wrapper.vm.setStartDate('');
    wrapper.vm.setEndDate('01/10/2022');
    const submitDisabled = wrapper.vm.disabled;
    expect(submitDisabled).toBeTruthy();
  });

  it('modal submit should be not disabled if there a valid start and end date', async () => {
    wrapper.vm.setStartDate('01/02/2022');
    wrapper.vm.setEndDate('01/09/2022');
    const submitDisabled = wrapper.vm.disabled;
    expect(submitDisabled).toBeFalsy();
  });

  it('dateRange start and end inputs should update if selection is made through a calendar click', async () => {
    const start = new Date(2022, 8, 1);
    const end = new Date(2022, 11, 1);
    await wrapper.vm.setSelectedDatesFromCalendar({ start: start, end: end });
    const startDate = getElements(wrapper).startDate();
    const endDate = getElements(wrapper).endDate();
    expect(startDate.props().value).toEqual(wrapper.vm.getDateString(start));
    expect(endDate.props().value).toEqual(wrapper.vm.getDateString(end));
  });

  it('on submission, the submit event should be emitted', async () => {
    const kModal = getElements(wrapper).kModal();
    kModal.vm.$emit('submit');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().submit).toBeTruthy();
  });
});
