import { shallowMount } from '@vue/test-utils';
import KButton from '../KButton.vue';
import { renderComponent, takeSnapshot } from '../../../jest.conf/testUtils';

describe('KButton', () => {
  describeUnit('icon related props', () => {
    it('should render an icon before the text with the icon string passed to the `icon` prop', () => {
      const wrapper = shallowMount(KButton, {
        propsData: {
          icon: 'add',
        },
      });
      expect(wrapper.find('[data-test="iconBefore"]').exists()).toBe(true);
    });
    it('should render an icon after the text with the icon string pased to the `iconAfter` prop', () => {
      const wrapper = shallowMount(KButton, {
        propsData: {
          iconAfter: 'video',
        },
      });
      expect(wrapper.find('[data-test="iconAfter"]').exists()).toBe(true);
    });
    it('should render a dropdown icon when hasDropdown is true', () => {
      const wrapper = shallowMount(KButton, {
        propsData: {
          hasDropdown: true,
        },
      });
      expect(wrapper.find('[data-test="dropdownIcon"]').exists()).toBe(true);
    });
  });

  describeUnit('text prop and slots', () => {
    it('should render the text prop if nothing is in the default slot', () => {
      const wrapper = shallowMount(KButton, {
        propsData: {
          text: 'test',
        },
      });
      expect(wrapper.text()).toContain('test');
    });

    it('should render the slot when the slot has content', () => {
      const wrapper = shallowMount(KButton, {
        propsData: {
          text: 'test',
        },
        slots: {
          default: '<span>slot</span>',
        },
      });
      expect(wrapper.text()).toContain('slot');
      expect(wrapper.text()).toContain('test');
    });
  });

  describeUnit('event handling', () => {
    it('should emit a click event when clicked', () => {
      const wrapper = shallowMount(KButton, {
        propsData: {
          text: 'test',
        },
      });
      wrapper.trigger('click');
      expect(wrapper.emitted().click).toBeTruthy();
    });
  });

  describeVisual('KButton Visual Tests', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:4000/testing-playground', { waitUntil: 'networkidle2' });
    });

    it('renders correctly with default props', async () => {
      await renderComponent(page, 'KButton', { text: 'Test Button' });
      await takeSnapshot(page, 'KButton - Default');
    });
  });
});
