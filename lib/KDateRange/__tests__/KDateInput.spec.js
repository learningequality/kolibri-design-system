import Vue from 'vue';
import { mount } from '@vue/test-utils';
import KDateInput from '../KDateInput';

const DEFAULT_PROPS = {
  legendText: 'Start Date',
  errorMessage: '',
};

const DESCRIPTION_FORMAT = {
  year: 'numeric',
  weekday: 'long',
  month: 'long',
  day: 'numeric',
};

function makeWrapper(kDateInputProps = {}) {
  return mount(KDateInput, {
    propsData: { ...DEFAULT_PROPS, ...kDateInputProps },
  });
}

function getElements(wrapper) {
  return {
    KTextbox: () => wrapper.findComponent({ name: 'KTextbox' }),
    valueDate: () => wrapper.find('[data-testid="valueAsDate"]'),
    description: () => wrapper.find('[id^="DateDesc_"]'),
  };
}

describe('KDateInput component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = makeWrapper();
  });

  it('no invalid error message should be shown for initial value', async () => {
    const textbox = getElements(wrapper).KTextbox();
    expect(textbox.props().invalid).toEqual(false);
  });

  it.each([['2024-03-10'], [new Date(2024, 2, 10)]])(
    'the date description should match the entered date %s',
    value => {
      const description = getElements(makeWrapper({ value })).description();
      const date = Vue.prototype.$formatDate(new Date(2024, 2, 10), DESCRIPTION_FORMAT);
      expect(description.text()).toBe(`Start Date ${date}`);
    },
  );

  it.each([
    ['0050-06-15', 50],
    ['20240-06-15', 20240],
  ])('the date description should keep the year of %s as entered', (value, year) => {
    const description = getElements(makeWrapper({ value })).description();
    const expected = new Date(2000, 5, 15);
    expected.setFullYear(year);
    const date = Vue.prototype.$formatDate(expected, DESCRIPTION_FORMAT);
    expect(description.text()).toBe(`Start Date ${date}`);
  });

  it('each input should have its own date description id', () => {
    const startId = getElements(makeWrapper({ value: '2024-03-10' }))
      .description()
      .attributes('id');
    const endId = getElements(makeWrapper({ value: '2024-03-15' }))
      .description()
      .attributes('id');
    expect(startId).not.toBe(endId);
  });
});
