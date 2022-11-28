import { mount } from '@vue/test-utils';
import KDateInput from '../KDateInput';
import { DATE_FMT } from '../validationConstants';

const DEFAULT_PROPS = {
  legendText: 'Start Date',
  errorMessage: '',
};

function makeWrapper(kDateInputProps = {}) {
  return mount(KDateInput, {
    propsData: { ...DEFAULT_PROPS, ...kDateInputProps },
  });
}

function getElements(wrapper) {
  return {
    KTextbox: () => wrapper.findComponent({ name: 'KTextbox' }),
    valueDate: () => wrapper.find('[data-test="valueAsDate"]'),
  };
}

describe('KDateInput component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = makeWrapper();
  });

  it('default value should be same as constant DATE_FMT and no invalid error message should be shown', async () => {
    const textbox = getElements(wrapper).KTextbox();
    expect(textbox.props().invalid).toEqual(false);
    expect(textbox.props().value).toEqual(DATE_FMT);
  });

  it('hidden input valueAsDate should equal date object of date string given to KDateInput', async () => {
    await wrapper.setProps({ value: '01/10/2022' });
    const dateValue = wrapper.vm.valueAsDate;
    const valueAsDate = getElements(wrapper).valueDate().element._value;
    expect(valueAsDate).toBe(dateValue);
  });
});
