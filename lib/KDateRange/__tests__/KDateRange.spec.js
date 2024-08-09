import Vue from 'vue';
import { mount } from '@vue/test-utils';
import KDateRange from '../index';
import KDateCalendar from '../KDateCalendar';
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

function makeKDateRangeWrapper(kDateRangeProps = {}) {
  return mount(KDateRange, {
    propsData: { ...DEFAULT_PROPS, ...kDateRangeProps },
  });
}

function getKDateRangeElements(wrapper) {
  return {
    startDate: () => wrapper.find('[data-test="startDate"]'),
    endDate: () => wrapper.find('[data-test="endDate"]'),
    kModal: () => wrapper.find('[data-test="dateRangeModal"]'),
  };
}

describe('KDateRange component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = makeKDateRangeWrapper();
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
    wrapper.vm.setStartDate('2022-01-10');
    wrapper.vm.setEndDate('');
    const submitDisabled = wrapper.vm.disabled;
    expect(submitDisabled).toBeTruthy();
  });

  it('modal submit should be disabled if there is an end date, but no start date', async () => {
    wrapper.vm.setStartDate('');
    wrapper.vm.setEndDate('2022-01-10');
    const submitDisabled = wrapper.vm.disabled;
    expect(submitDisabled).toBeTruthy();
  });

  it('modal submit should not be disabled if there a valid start and end date', async () => {
    wrapper.vm.setStartDate('2022-01-02');
    wrapper.vm.setEndDate('2022-01-09');
    const submitDisabled = wrapper.vm.disabled;
    expect(submitDisabled).toBeFalsy();
  });

  it('dateRange start and end inputs should update if selection is made through a calendar click', async () => {
    const start = new Date(2022, 8, 1);
    const end = new Date(2022, 11, 1);
    await wrapper.vm.setSelectedDatesFromCalendar({ start: start, end: end });
    const startDate = getKDateRangeElements(wrapper).startDate();
    const endDate = getKDateRangeElements(wrapper).endDate();
    expect(startDate.props().value).toEqual(wrapper.vm.getDateString(start));
    expect(endDate.props().value).toEqual(wrapper.vm.getDateString(end));
  });

  it('on submission, the submit event should be emitted', async () => {
    const kModal = getKDateRangeElements(wrapper).kModal();
    kModal.vm.$emit('submit');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().submit).toBeTruthy();
  });
});

const KDATECALENDAR_PROPS = {
  firstAllowedDate: new Date(2022, 0, 1),
  lastAllowedDate: new Date(2022, 10, 1),
  selectedStartDate: new Date(2022, 8, 1),
  selectedEndDate: new Date(2022, 10, 1),
  previousMonthText: 'Previous Month',
  nextMonthText: 'Next Month',
};

function makeKDateCalendarWrapper(kDateCalendarProps = {}) {
  return mount(KDateCalendar, {
    propsData: { ...KDATECALENDAR_PROPS, ...kDateCalendarProps },
  });
}

function getKDateCalendarElements(wrapper) {
  return {
    previousMonthDisplay: () => wrapper.find('[data-test="previousMonth"]'),
    currentMonthDisplay: () => wrapper.find('[data-test="currentMonth"]'),
  };
}

describe('KDateCalendar component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = makeKDateCalendarWrapper();
  });

  it(`smoke test`, () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('the month and year display on the left-side calendar view should display the previous month of the lastAllowedDate', async () => {
    const previousMonthDisplay = getKDateCalendarElements(wrapper).previousMonthDisplay();
    const lastAllowedDate = wrapper.props().lastAllowedDate;
    const previousMonth = new Date(lastAllowedDate);
    previousMonth.setMonth(lastAllowedDate.getMonth() - 1);
    const date = Vue.prototype.$formatDate(previousMonth, { month: 'long', year: 'numeric' });
    expect(previousMonthDisplay.text()).toBe(date);
  });

  it('the month and year display on the right-side calendar view should display the current month of the lastAllowedDate', async () => {
    const currentMonthDisplay = getKDateCalendarElements(wrapper).currentMonthDisplay();
    const lastAllowedDate = wrapper.props().lastAllowedDate;
    const date = Vue.prototype.$formatDate(lastAllowedDate, { month: 'long', year: 'numeric' });
    expect(currentMonthDisplay.text()).toBe(date);
  });
});
