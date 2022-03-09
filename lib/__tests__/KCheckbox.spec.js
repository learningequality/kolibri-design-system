import { shallowMount } from '@vue/test-utils';
import KCheckbox from '../KCheckbox';

describe('KCheckbox component', () => {
  it(`smoke test`, () => {
    const wrapper = shallowMount(KCheckbox);
    expect(wrapper.exists()).toBe(true);
  });

  describe('props', () => {
    it(`a label should appear with checkbox`, () => {
      const wrapper = shallowMount(KCheckbox, {
        propsData: {
          label: 'test',
        },
      });
      expect(wrapper.find('label').text()).toEqual('test');
    });
    it(`a checked checkbox icon should appear when checked is 'true'`, () => {
      const wrapper = shallowMount(KCheckbox, {
        propsData: {
          label: 'checked',
          checked: true,
        },
      });
      expect(wrapper.find(`[icon="checked"]`).element).toBeTruthy();
      expect(wrapper.find(`[icon="unchecked"]`).element).toBeFalsy();
      expect(wrapper.find(`[icon="indeterminateCheck"]`).element).toBeFalsy();
    });
    it(`an unchecked checkbox icon should appear when checked is 'false'`, () => {
      const wrapper = shallowMount(KCheckbox, {
        propsData: {
          label: 'unchecked',
          checked: false,
        },
      });
      expect(wrapper.find(`[icon="checked"]`).element).toBeFalsy();
      expect(wrapper.find(`[icon="unchecked"]`).element).toBeTruthy();
      expect(wrapper.find(`[icon="indeterminateCheck"]`).element).toBeFalsy();
    });
    it(`indeterminateCheck icon should show when indeterminate is 'true'`, () => {
      const wrapper = shallowMount(KCheckbox, {
        propsData: {
          label: 'indeterminate',
          indeterminate: true,
        },
      });
      expect(wrapper.find(`[icon="checked"]`).element).toBeFalsy();
      expect(wrapper.find(`[icon="unchecked"]`).element).toBeFalsy();
      expect(wrapper.find(`[icon="indeterminateCheck"]`).element).toBeTruthy();
    });
    it(`'showLabel' should not show the label when 'false'`, () => {
      const wrapper = shallowMount(KCheckbox, {
        propsData: {
          label: 'no label',
          showLabel: false,
        },
      });
      expect(wrapper.find('.visuallyhidden').exists()).toBeTruthy();
    });
    it(`a description is displayed when that prop is not null`, () => {
      const wrapper = shallowMount(KCheckbox, {
        propsData: {
          label: 'description',
          description: 'I am a description',
        },
      });
      expect(wrapper.find('.description').text()).toEqual(wrapper.props().description);
    });
    it(`checkbox is in disabled state when disabled is 'true'`, () => {
      const wrapper = shallowMount(KCheckbox, {
        propsData: {
          label: 'disabled',
          disabled: true,
        },
      });
      expect(wrapper.find('.disabled')).toBeTruthy();
    });
  });
});
