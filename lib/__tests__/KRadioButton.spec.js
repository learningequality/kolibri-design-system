import { mount } from '@vue/test-utils';
import userEvent from '@testing-library/user-event';
import KRadioButton from '../KRadioButton.vue';
import KRadioButtonGroup from '../KRadioButtonGroup.vue';

const mocks = {
  $themeTokens: {
    primary: 'default-primary-color',
    textDisabled: 'disabled-color',
    annotation: 'annotation-color',
  },
  $coreOutline: {},
};

describe('KRadioButton component', () => {
  it('should render with default color when color prop is not provided', () => {
    const wrapper = mount(KRadioButton, {
      propsData: {
        currentValue: 'val-a',
        buttonValue: 'val-a',
      },
      mocks,
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
      mocks,
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
      mocks,
    });

    const selectedIcon = wrapper.findComponent({ name: 'KIcon' });
    expect(selectedIcon.attributes('style')).toContain('fill: disabled-color');
  });

  it('pressing Space on an unselected radio emits input and change', async () => {
    const wrapper = mount(KRadioButton, {
      propsData: { currentValue: 'val-a', buttonValue: 'val-b', label: 'Option' },
      mocks,
      attachTo: document.body,
    });
    wrapper.find('input').element.focus();
    await userEvent.keyboard(' ');
    expect(wrapper.emitted().input).toContainEqual(['val-b']);
    expect(wrapper.emitted()).toHaveProperty('change');
    wrapper.destroy();
  });

  describe('readonly group', () => {
    let wrapper;
    let radio;
    afterEach(() => {
      wrapper.destroy();
      jest.restoreAllMocks();
    });

    const mountReadonly = propsData => {
      wrapper = mount(
        {
          components: { KRadioButtonGroup, KRadioButton },
          data: () => ({ radioProps: { currentValue: 'val-a', label: 'Option', ...propsData } }),
          template: `
            <KRadioButtonGroup readonly>
              <KRadioButton v-bind="radioProps" />
            </KRadioButtonGroup>
          `,
        },
        { mocks, attachTo: document.body },
      );
      radio = wrapper.findComponent(KRadioButton);
    };

    const expectUnchanged = expectedChecked => {
      expect(radio.emitted()).not.toHaveProperty('change');
      expect(radio.emitted()).not.toHaveProperty('input');
      expect(radio.find('input').element.checked).toBe(expectedChecked);
    };
    const iconStyle = () => radio.findComponent({ name: 'KIcon' }).attributes('style');

    describe.each([
      ['selected', 'val-a', true],
      ['unselected', 'val-b', false],
    ])('%s radio', (__, buttonValue, expectedChecked) => {
      it.each([
        ['input', w => w.find('input').element],
        ['label', w => w.find('label').element],
        ['container', w => w.element],
      ])('clicking the %s emits nothing and keeps native checked', async (___, getTarget) => {
        mountReadonly({ buttonValue });
        await userEvent.click(getTarget(radio));
        expectUnchanged(expectedChecked);
      });

      it('pressing Space emits nothing and keeps native checked', async () => {
        mountReadonly({ buttonValue });
        radio.find('input').element.focus();
        await userEvent.keyboard(' ');
        expectUnchanged(expectedChecked);
      });
    });

    it('clicking the container does not cancel the click for ancestors', () => {
      mountReadonly({ buttonValue: 'val-a' });
      const click = new MouseEvent('click', { bubbles: true, cancelable: true });
      radio.element.dispatchEvent(click);
      expect(click.defaultPrevented).toBe(false);
    });

    it('still applies the color prop', () => {
      mountReadonly({ buttonValue: 'val-a', color: 'custom-color' });
      expect(iconStyle()).toContain('fill: custom-color');
    });

    it('with disabled, warns and falls back to disabled', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      mountReadonly({ buttonValue: 'val-a', disabled: true });
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toMatch(/^KRadioButton:/);
      expect(radio.find('input').element).toBeDisabled();
      expect(iconStyle()).toContain('fill: disabled-color');
    });
  });
});
