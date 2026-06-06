import { mount } from '@vue/test-utils';
import KRadioButton from '../KRadioButton.vue';

describe('KRadioButton component', () => {
  it('should render with default color when color prop is not provided', () => {
    const wrapper = mount(KRadioButton, {
      propsData: {
        currentValue: 'val-a',
        buttonValue: 'val-a',
      },
      mocks: {
        $themeTokens: {
          primary: 'default-primary-color',
          textDisabled: 'disabled-color',
          annotation: 'annotation-color',
        },
        $coreOutline: {},
      },
    });

    const selectedIcon = wrapper.findComponent({ name: 'KIcon' });
    expect(selectedIcon.exists()).toBe(true);
    expect(selectedIcon.props('icon')).toBe('radioSelected');
    expect(selectedIcon.attributes('style')).toContain('fill: default-primary-color');
  });

  it('should render with custom color when color prop is provided', () => {
    const wrapper = mount(KRadioButton, {
      propsData: {
        currentValue: 'val-a',
        buttonValue: 'val-a',
        color: 'custom-color',
      },
      mocks: {
        $themeTokens: {
          primary: 'default-primary-color',
          textDisabled: 'disabled-color',
          annotation: 'annotation-color',
        },
        $coreOutline: {},
      },
    });

    const selectedIcon = wrapper.findComponent({ name: 'KIcon' });
    expect(selectedIcon.attributes('style')).toContain('fill: custom-color');
  });

  it('should render with disabled color when disabled is true, overriding custom color', () => {
    const wrapper = mount(KRadioButton, {
      propsData: {
        currentValue: 'val-a',
        buttonValue: 'val-a',
        color: 'custom-color',
        disabled: true,
      },
      mocks: {
        $themeTokens: {
          primary: 'default-primary-color',
          textDisabled: 'disabled-color',
          annotation: 'annotation-color',
        },
        $coreOutline: {},
      },
    });

    const selectedIcon = wrapper.findComponent({ name: 'KIcon' });
    expect(selectedIcon.attributes('style')).toContain('fill: disabled-color');
  });
});
