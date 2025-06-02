import { shallowMount, mount } from '@vue/test-utils';
import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';
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
    it(`text field is readonly when 'readonly' is true`, () => {
      const wrapper = mount(KTextbox, {
        propsData: {
          readonly: true,
        },
      });
      expect(wrapper.find('input').attributes('readonly')).toBe('readonly');
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
  describe('KTextbox with clearable', () => {
    it('should have the clear button when clearable is true and there is text in the input', async () => {
      const wrapper = mount(KTextbox, {
        propsData: {
          clearable: true,
        },
      });
      const input = wrapper.find('input');
      input.element.value = 'test';
      input.trigger('input');
      await wrapper.vm.$nextTick();
      const clearButton = wrapper.find('[data-test="clearIcon"]');
      expect(clearButton.exists()).toBeTruthy();
    });
    it('should not show the clear button when clearable is true and there is no text in the input', async () => {
      const wrapper = mount(KTextbox, {
        propsData: {
          clearable: true,
        },
      });

      const input = wrapper.find('input');
      input.element.value = '';
      input.trigger('input');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('[data-test="clearIcon"]').exists()).toBeFalsy();
    });

    it('should not show the clear button when clearable is false and there is text in the input', async () => {
      const wrapper = mount(KTextbox, {
        propsData: {
          clearable: false,
        },
      });
      const input = wrapper.find('input');
      input.element.value = 'test';
      input.trigger('input');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('[data-test="clearIcon"]').exists()).toBeFalsy();
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
      const clearButton = wrapper.find('[data-test="clearIcon"]');
      clearButton.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('input').element.value).toBe('');
    });
  });
});

describe.visual('KTextbox visual test', () => {
  const snapshotOptions = { widths: [400], minHeight: 512 };
  it('render KTextbox with label', async () => {
    await renderComponentForVisualTest('KTextbox', {
      label: 'Input with label',
      value: 'Input with label',
    });
    await takeSnapshot('KTextbox - label', snapshotOptions);
  });
  it('render disabled KTextbox', async () => {
    await renderComponentForVisualTest('KTextbox', {
      label: 'Disabled',
      value: 'Disabled input',
      disabled: true,
    });
    await takeSnapshot('KTextbox - disabled', snapshotOptions);
  });
  it('render readonly KTextbox', async () => {
    await renderComponentForVisualTest('KTextbox', {
      label: 'Readonly',
      value: 'Readonly input',
      readonly: true,
    });
    await takeSnapshot('KTextbox - readonly', snapshotOptions);
  });
  it('render KTextbox text', async () => {
    await renderComponentForVisualTest('KTextbox', {
      label: 'Text input',
      type: 'text',
    });
    await takeSnapshot('KTextbox - text', snapshotOptions);
  });
  it('render KTextbox number', async () => {
    await renderComponentForVisualTest('KTextbox', {
      label: 'Number input',
      value: 1,
      type: 'number',
      min: '0',
      max: '99',
    });
    await takeSnapshot('KTextbox - number', snapshotOptions);
  });
  it('render KTextbox password', async () => {
    await renderComponentForVisualTest('KTextbox', {
      label: 'Enter password',
      value: 'password',
      type: 'password',
    });
    await takeSnapshot('KTextbox - password', snapshotOptions);
  });
  it('render clearable KTextbox', async () => {
    await renderComponentForVisualTest('KTextbox', {
      label: 'Clearable',
      value: 'Hello there',
      clearable: true,
    });
    await takeSnapshot('KTextbox - clearable', snapshotOptions);
  });
  it('render showInvalidText KTexbox', async () => {
    await renderComponentForVisualTest('KTextbox', {
      value: 'Text area',
      invalid: true,
      invalidText: 'Invalid input',
      showInvalidText: true,
    });
    await takeSnapshot('KTextbox - showInvalidText', snapshotOptions);
  });
  it('render textarea KTextbox', async () => {
    await renderComponentForVisualTest('KTextbox', {
      label: 'Text area',
      textarea: true,
    });
    await takeSnapshot('KTextbox - textarea', snapshotOptions);
  });
});
