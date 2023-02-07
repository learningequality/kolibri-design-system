import { shallowMount } from '@vue/test-utils';

import KOptionalText from '../KOptionalText.vue';

describe('KOptionalText component', () => {
  it('smoke test', () => {
    const wrapper = shallowMount(KOptionalText);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render the input text', () => {
    const text = 'Test';
    const wrapper = shallowMount(KOptionalText, {
      propsData: {
        text,
      },
    });
    expect(wrapper.text()).toEqual(text);
    expect(wrapper.find('kemptyplaceholder-stub').exists()).toBe(false);
  });

  it('should render the KEmptyplaceholder component if no text is passed', () => {
    const wrapper = shallowMount(KOptionalText);
    expect(wrapper.find('kemptyplaceholder-stub').exists()).toBe(true);
  });

  it('should render the KEmptyplaceholder component if text is empty', () => {
    const wrapper = shallowMount(KOptionalText, {
      propsData: {
        text: '',
      },
    });
    expect(wrapper.find('kemptyplaceholder-stub').exists()).toBe(true);
  });

  it('should render the KEmptyplaceholder component if text is undefined', () => {
    const wrapper = shallowMount(KOptionalText, {
      propsData: {
        text: undefined,
      },
    });
    expect(wrapper.find('kemptyplaceholder-stub').exists()).toBe(true);
  });

  it('should render the KEmptyplaceholder component if text is null', () => {
    const wrapper = shallowMount(KOptionalText, {
      propsData: {
        text: null,
      },
    });
    expect(wrapper.find('kemptyplaceholder-stub').exists()).toBe(true);
  });

  it('should render slot content when it has text content', () => {
    const text = 'Test';
    const wrapper = shallowMount(KOptionalText, {
      slots: {
        default: 'Test',
      },
    });
    expect(wrapper.text()).toEqual(text);
    expect(wrapper.find('kemptyplaceholder-stub').exists()).toBe(false);
  });

  it('should render slot content when it has child with text content', () => {
    const wrapper = shallowMount(KOptionalText, {
      slots: {
        default: '<div class="test-slot">Test</div>',
      },
    });
    expect(wrapper.find('.test-slot').exists()).toBe(true);
    expect(wrapper.find('kemptyplaceholder-stub').exists()).toBe(false);
  });

  it('should render the KEmptyplaceholder component if slot child text content is empty', () => {
    const wrapper = shallowMount(KOptionalText, {
      slots: {
        default: '<div class="test-slot"></div>',
      },
    });
    expect(wrapper.find('.test-slot').exists()).toBe(false);
    expect(wrapper.find('kemptyplaceholder-stub').exists()).toBe(true);
  });

  it('should render slot content with multiple children if any has text content', () => {
    const wrapper = shallowMount(KOptionalText, {
      slots: {
        default: '<div class="test-slot-1"></div><div class="test-slot-2">Test</div>',
      },
    });
    expect(wrapper.find('.test-slot-1').exists()).toBe(true);
    expect(wrapper.find('.test-slot-2').exists()).toBe(true);
    expect(wrapper.find('kemptyplaceholder-stub').exists()).toBe(false);
  });

  it('should render the KEmptyplaceholder component if text content of every slot childen is empty', () => {
    const wrapper = shallowMount(KOptionalText, {
      slots: {
        default: '<div class="test-slot-1"></div><div class="test-slot-2"></div>',
      },
    });
    expect(wrapper.find('.test-slot-1').exists()).toBe(false);
    expect(wrapper.find('.test-slot-2').exists()).toBe(false);
    expect(wrapper.find('kemptyplaceholder-stub').exists()).toBe(true);
  });
});
