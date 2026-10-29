import { mount } from '@vue/test-utils';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KSelect from '../index';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
];

function makeWrapper(propsData = {}) {
  return mount(KSelect, {
    propsData: { label: 'Select', value: {}, options, ...propsData },
    attachTo: document.body,
  });
}

describe('KSelect component', () => {
  let wrapper;

  afterEach(() => {
    wrapper.destroy();
  });

  describe('focus()', () => {
    it(`focuses the control without opening the dropdown`, async () => {
      wrapper = makeWrapper();
      await wrapper.vm.$nextTick();
      wrapper.vm.focus();
      await wrapper.vm.$nextTick();

      expect(wrapper.find('.ui-select-label').element).toHaveFocus();
      expect(wrapper.emitted('focus')).toHaveLength(1);
      expect(wrapper.emitted('dropdown-open')).toBeUndefined();
    });

    it(`does nothing when the select is disabled`, () => {
      wrapper = makeWrapper({ disabled: true });
      wrapper.vm.focus();

      expect(wrapper.find('.ui-select-label').element).not.toHaveFocus();
      expect(wrapper.emitted('focus')).toBeUndefined();
    });
  });
});

const FOCUS_LABEL = 'Fruit';

const getFocusLabel = () => document.querySelector('.ui-select-label');
const getFirstOption = () => document.querySelector('.ui-select-option');

function renderKSelect() {
  return render(KSelect, { props: { label: FOCUS_LABEL, value: {}, options } });
}

// The outline itself comes from a stylesheet that jsdom does not apply, so these
// assert the classes that hand it from the label to the option.
describe('KSelect focus outline', () => {
  it('outlines the label while no option is highlighted', async () => {
    const { emitted } = renderKSelect();
    getFocusLabel().focus();
    await userEvent.keyboard('{Enter}');

    // both assertions below hold on a closed dropdown too
    expect(emitted()['dropdown-open']).toHaveLength(1);
    expect(getFocusLabel()).not.toHaveClass('has-highlighted-option');
    expect(getFirstOption()).not.toHaveClass('is-highlighted');
  });

  it('moves the outline to the option once one is highlighted', async () => {
    renderKSelect();
    getFocusLabel().focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('{ArrowDown}');

    expect(getFocusLabel()).toHaveClass('has-highlighted-option');
    expect(getFirstOption()).toHaveClass('is-highlighted');
    expect(getFirstOption().getAttribute('style') || '').not.toMatch(/outline/);
  });
});
