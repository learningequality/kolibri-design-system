import { shallowMount } from '@vue/test-utils';
import KModal from '../KModal';

describe('KModal component', () => {
  it(`smoke test`, () => {
    const wrapper = shallowMount(KModal);
    expect(wrapper.exists()).toBe(true);
  });

  describe('props', () => {
    it(`a title should appear`, () => {
      const title = 'test title';
      const wrapper = shallowMount(KModal, {
        propsData: {
          title: title,
        },
      });
      expect(wrapper.find('.title').text()).toEqual(title);
    });
    it(`text should appear on the submit button`, () => {
      const submitText = 'hello';
      const onClick = jest.fn();
      const wrapper = shallowMount(KModal, {
        propsData: {
          submitText: submitText,
        },
        listeners: { submit: onClick },
      });
      expect(wrapper.findComponent({ name: 'KButton' }).props().text).toEqual(submitText);
    });

    it(`text should appear on the close button`, () => {
      const cancelText = 'goodbye';
      const onClick = jest.fn();
      const wrapper = shallowMount(KModal, {
        propsData: {
          cancelText: cancelText,
        },
        listeners: { cancel: onClick },
      });
      expect(wrapper.findComponent({ name: 'KButton' }).props().text).toEqual(cancelText);
    });

    it(`submit button is disabled if submitDisabled is true`, () => {
      const submitText = 'hello';
      const onClick = jest.fn();
      const wrapper = shallowMount(KModal, {
        propsData: {
          submitText: submitText,
          submitDisabled: true,
        },
        listeners: { submit: onClick },
      });
      expect(wrapper.findComponent({ name: 'KButton' }).props().disabled).toBeTruthy();
    });

    it(`cancel button is disabled if cancelDisabled is true`, () => {
      const cancelText = 'goodbye';
      const onClick = jest.fn();
      const wrapper = shallowMount(KModal, {
        propsData: {
          cancelText: cancelText,
          cancelDisabled: true,
        },
        listeners: { cancel: onClick },
      });
      expect(wrapper.findComponent({ name: 'KButton' }).props().disabled).toBeTruthy();
    });

    it(`size of modal can be determined with string prop`, () => {
      const wrapper = shallowMount(KModal, {
        propsData: {
          size: 'large',
        },
      });
      expect(wrapper.find('.modal').element.style['width']).toEqual('100%');
    });

    it(`size of modal can be determined by integer prop`, () => {
      const wrapper = shallowMount(KModal, {
        propsData: {
          size: 789,
        },
      });
      expect(wrapper.find('.modal').element.style['width']).toEqual('789px');
    });

    it(`error message is in a visually hidden span if hasError is true`, () => {
      const error = 'watch out for the error';
      const wrapper = shallowMount(KModal, {
        propsData: {
          hasError: true,
          errorMessage: error,
        },
      });
      expect(wrapper.find('.visuallyhidden').element).toBeTruthy();
      expect(wrapper.find('.visuallyhidden').text()).toContain(error);
    });
  });
  describe('slots', () => {
    it(`content is displayed in default <slot>`, () => {
      const slot = '<div><p>main content appears here</p></div>';
      const wrapper = shallowMount(KModal, {
        slots: {
          default: slot,
        },
      });
      expect(wrapper.find('.content').text()).toContain('main content appears here');
    });
    it(`alternative content is displayed below main content if actions <slot> is used`, () => {
      const slot = '<div><p>main content appears here</p></div>';
      const actionsSlot = '<div><p class="actionsSlot">actions content</p></div>';
      const wrapper = shallowMount(KModal, {
        slots: {
          default: slot,
          actions: actionsSlot,
        },
      });
      expect(wrapper.find('.content').text()).toContain('main content appears here');
      expect(wrapper.find('.actions').text()).toContain('actions content');
    });
  });
});
