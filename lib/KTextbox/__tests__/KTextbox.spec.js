import { shallowMount, mount } from '@vue/test-utils';
import KTextbox from '../index';

describe('KTextbox component', () => {
  it(`smoke test`, () => {
    const wrapper = shallowMount(KTextbox);
    expect(wrapper.exists()).toBe(true);
  });

  describe('props', () => {
    it(`a label should appear`, () => {
      const wrapper = mount(KTextbox, {
        propsData: {
          label: 'test',
        },
      });
      expect(wrapper.find('label').text()).toEqual('test');
    });
    it(`value of the text field should appear when passed in`, () => {
      const initialValue = '1234paowiejfapwoeifjapwoeijf';
      const wrapper = mount(KTextbox, {
        propsData: {
          label: 'test',
          value: initialValue,
        },
      });
      const value = wrapper.find('input').element.value;
      expect(value).toBe(initialValue);
    });
    it(`invalidText is not displayed if showInvalidText is false`, () => {
      const wrapper = mount(KTextbox, {
        propsData: {
          invalid: true,
          showInvalidText: false,
          invalidText: 'error!',
        },
      });
      const errorTextField = wrapper.find('.ui-textbox-feedback-text');
      expect(errorTextField.text()).not.toBe('error!');
    });
    it(`invalidText is displayed through error prop if invalid and showInvalidText are both true`, () => {
      const wrapper = mount(KTextbox, {
        propsData: {
          invalid: true,
          showInvalidText: true,
          invalidText: 'error!',
        },
      });
      const errorTextField = wrapper.find('.ui-textbox-feedback-text');
      expect(errorTextField.text()).toBe('error!');
    });
    it(`text field is disabled when 'disabled' is true`, () => {
      const wrapper = mount(KTextbox, {
        propsData: {
          disabled: true,
        },
      });
      expect(wrapper.find('input').attributes('disabled')).toBe('disabled');
    });
    it(`text field is autofocused when 'autofocus' is true`, () => {
      const wrapper = shallowMount(KTextbox, {
        propsData: {
          autofocus: true,
        },
      });
      const textField = wrapper.findComponent({ name: 'UiTextbox' });
      expect(textField.attributes('autofocus')).toBe('true');
    });
    it(`length of characters for value matches maxlength prop`, () => {
      const wrapper = shallowMount(KTextbox, {
        propsData: {
          maxlength: 13,
        },
      });
      const textField = wrapper.findComponent({ name: 'UiTextbox' });
      expect(textField.attributes('maxlength')).toBe('13');
    });
    it(`HTML autocomplete attribute is passed with autocomplete prop`, () => {
      const wrapper = shallowMount(KTextbox, {
        propsData: {
          autocomplete: 'current-password',
        },
      });
      const textField = wrapper.findComponent({ name: 'UiTextbox' });
      expect(textField.attributes('autocomplete')).toBe('current-password');
    });
    it(`HTML autocapitalize attribute is passed with autocapitalize prop`, () => {
      const wrapper = shallowMount(KTextbox, {
        propsData: {
          autocapitalize: 'sentences',
        },
      });
      const textField = wrapper.findComponent({ name: 'UiTextbox' });
      expect(textField.attributes('autocapitalize')).toBe('sentences');
    });
    it(`input type is 'number' when type is set to 'number'`, () => {
      const wrapper = mount(KTextbox, {
        propsData: {
          type: 'number',
        },
      });
      expect(wrapper.find('input').attributes('number')).toBe('true');
      expect(wrapper.find('input').attributes('type')).toBe('number');
    });
    it(`input type is 'text' when type is set to 'text'`, () => {
      const wrapper = mount(KTextbox, {
        propsData: {
          type: 'text',
        },
      });
      expect(wrapper.find('input').attributes('type')).toBe('text');
    });
    it(`min length of value is passed as an attribute by the 'min' prop`, () => {
      const wrapper = mount(KTextbox, {
        propsData: {
          type: 'number',
          min: 50,
        },
      });
      expect(wrapper.find('input').attributes('type')).toBe('number');
      expect(wrapper.find('input').attributes('number')).toBe('true');
      expect(wrapper.find('input').attributes('min')).toBe('50');
    });
    it(`max length of value is passed as an attribute by the 'max' prop`, () => {
      const wrapper = mount(KTextbox, {
        propsData: {
          type: 'number',
          max: 50,
        },
      });
      expect(wrapper.find('input').attributes('type')).toBe('number');
      expect(wrapper.find('input').attributes('number')).toBe('true');
      expect(wrapper.find('input').attributes('max')).toBe('50');
    });
    it(`when 'true', textarea element is rendered`, () => {
      const wrapper = mount(KTextbox, {
        propsData: {
          textArea: true,
        },
      });
      expect(wrapper.find('textarea').exists()).toBeTruthy();
    });
  });
  describe('event handling', () => {
    it('should emit a input when value is updated', () => {
      const wrapper = mount(KTextbox, {
        propsData: {
          value: 'test',
        },
      });

      const input = wrapper.find('input');
      input.element.value = 'new value';
      input.trigger('input');
      expect(wrapper.emitted().input).toBeTruthy();
    });
  });
});

describe('KTextbox with clearable', () => {
  it('should have clearable button when clearable is true and there is text in the input', async () => {
    const wrapper = mount(KTextbox, {
      propsData: {
        clearable: true,
      },
    });
    const input = wrapper.find('input');
    input.element.value = 'test';
    input.trigger('input');
    await wrapper.vm.$nextTick();
    const clearButton = wrapper.findComponent({ name: 'KIconButton' });
    expect(clearButton.exists()).toBeTruthy();
  });

  it('should clear the input when clear button is clicked', async () => {
    const wrapper = mount(KTextbox, {
      propsData: {
        clearable: true,
      },
    });
    const input = wrapper.find('input');
    input.element.value = 'test';
    input.trigger('input');
    await wrapper.vm.$nextTick();
    const clearButton = wrapper.findComponent({ name: 'KIconButton' });
    clearButton.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input').element.value).toBe('');
  });
});
