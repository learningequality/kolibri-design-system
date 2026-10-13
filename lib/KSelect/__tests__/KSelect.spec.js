import { mount } from '@vue/test-utils';
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
