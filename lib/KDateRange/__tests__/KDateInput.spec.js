import { mount } from '@vue/test-utils';
import KDateInput from '../KDateInput';

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

  it('no invalid error message should be shown for initial value', async () => {
    const textbox = getElements(wrapper).KTextbox();
    expect(textbox.props().invalid).toEqual(false);
  });
});
