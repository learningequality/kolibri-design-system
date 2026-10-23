import { mount } from '@vue/test-utils';
import KSelect from '../index';
import KSelectOption from '../KSelectOption';

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

  describe('outside clicks', () => {
    async function mountOpenInStoppingAncestor(props = {}) {
      wrapper = mount(
        {
          components: { KSelect },
          data: () => ({ options, props: { value: {}, ...props } }),
          template: `
            <div @click.stop>
              <KSelect label="Select" :options="options" v-bind="props" />
              <span class="sibling">Sibling</span>
            </div>
          `,
        },
        { attachTo: document.body },
      );
      await wrapper.vm.$nextTick();
      const select = wrapper.findComponent(KSelect);
      await select.find('.ui-select-label').trigger('click');
      expect(select.emitted('dropdown-open')).toHaveLength(1);
      return select;
    }

    it(`closes the dropdown when clicking outside it inside an ancestor that stops propagation`, async () => {
      const select = await mountOpenInStoppingAncestor();

      await wrapper.find('.sibling').trigger('click');

      expect(select.emitted('dropdown-close')).toHaveLength(1);
    });

    it(`closes the dropdown once when clicking the open trigger`, async () => {
      const select = await mountOpenInStoppingAncestor();

      await select.find('.ui-select-label').trigger('click');

      expect(select.emitted('dropdown-close')).toHaveLength(1);
      expect(select.emitted('dropdown-open')).toHaveLength(1);
    });

    it(`keeps a multiple select open when clicking an option`, async () => {
      const select = await mountOpenInStoppingAncestor({ multiple: true, value: [] });

      await select.findAllComponents(KSelectOption).at(0).trigger('click');

      expect(select.emitted('select')).toHaveLength(1);
      expect(select.emitted('dropdown-close')).toBeUndefined();
    });

    it(`clears the selection without closing the dropdown when clicking the clear button`, async () => {
      const select = await mountOpenInStoppingAncestor({ clearable: true, value: options[0] });

      await select.find('.overlay-close-button').trigger('click');

      expect(select.emitted('input')).toEqual([['']]);
      expect(select.emitted('dropdown-close')).toBeUndefined();
    });
  });
});
