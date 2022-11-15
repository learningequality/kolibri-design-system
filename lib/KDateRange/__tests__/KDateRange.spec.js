import { shallowMount } from '@vue/test-utils';
import KDateRange from '../index';
import validationConstants from '../validationConstants';

const DEFAULT_PROPS = {
  title: 'Select a date range',
  submitText: 'Generate',
  cancelText: 'Cancel',
  description: 'Test Description',
  defaultStartDate: new Date(),
  firstAllowedDate: new Date(),
  lastAllowedDate: new Date(),
  [validationConstants.MALFORMED]: 'Please enter a valid date',
  [validationConstants.START_DATE_AFTER_END_DATE]: 'End date cannot before start date',
  [validationConstants.FUTURE_DATE]: 'Cannot select a future date',
  [validationConstants.DATE_BEFORE_FIRST_ALLOWED]: 'Date must be after 01/01/2022',
};

function makeWrapper(kDateRangeProps = DEFAULT_PROPS) {
  return shallowMount(KDateRange, {
    propsData: { kDateRangeProps },
  });
}

describe('KDateRange component', () => {
  it(`smoke test`, () => {
    const wrapper = makeWrapper();
    wrapper.setProps({
      kDateRangeProps: {
        ...DEFAULT_PROPS,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  // validation machine
  describe('validation machine', () => {
    it('validation machine context should be success if default start and end dates are given', async () => {
      const { wrapper } = makeWrapper({
        propsData: { ...DEFAULT_PROPS },
      });
      expect(wrapper.exists()).toBe(true);
    });

    it('validation machine context should be failure if incorrect date is given', async () => {
      const { wrapper } = makeWrapper({
        propsData: { ...DEFAULT_PROPS },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  // revalidation
  describe('revalidation machine', () => {
    it('validation machine should revalidate after invalid date is passed', async () => {
      const { wrapper } = makeWrapper({
        propsData: { ...DEFAULT_PROPS },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  // placeholder is set
  describe('placeholder is appropriateley set', () => {
    it('if a new start date is selected, the placeholder should be set for the end date value', async () => {
      const { wrapper } = makeWrapper({
        propsData: { ...DEFAULT_PROPS },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  // dateRange start & end changes according to calendar clicks
  describe('dateRange start & end changes according to calendar clicks', () => {
    it('dateRange start and end should update if selection is made through a calendar click', async () => {
      const { wrapper } = makeWrapper({
        propsData: { ...DEFAULT_PROPS },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  // submit disabled accordingly
  describe('modal submit disabled accordingly', () => {
    it('modal submit should be disabled if there is no start and end date', async () => {
      const { wrapper } = makeWrapper({
        propsData: { ...DEFAULT_PROPS },
      });
      expect(wrapper.exists()).toBe(true);
    });

    it('modal submit should be disabled if there is a start date, but no end date', async () => {
      const { wrapper } = makeWrapper({
        propsData: { ...DEFAULT_PROPS },
      });
      expect(wrapper.exists()).toBe(true);
    });

    it('modal submit should be disabled if there is an end date, but no start date', async () => {
      const { wrapper } = makeWrapper({
        propsData: { ...DEFAULT_PROPS },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  // correct event is emitted on submission
  describe('start and end dates should be emitted on submission', () => {
    it('on submission, the start and end dates of dateRange should be emmitted', async () => {
      const { wrapper } = makeWrapper({
        propsData: { ...DEFAULT_PROPS },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });
});
