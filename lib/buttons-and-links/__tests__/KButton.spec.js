import { shallowMount } from '@vue/test-utils';
import KButton from '../KButton.vue';
import {
  renderComponent,
  takeSnapshot,
  delay,
  click,
  hover,
} from '../../../jest.conf/visual.testUtils';

describe('KButton', () => {
  describe('icon related props', () => {
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

  describe('text prop and slots', () => {
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

  describe('event handling', () => {
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

  describe.visual('KButton Visual Tests', () => {
    it('renders correctly with different appearances', async () => {
      await renderComponent('KButton', {
        text: 'Raised Button',
        primary: true,
        appearance: 'raised-button',
      });
      await takeSnapshot('KButton - Primary Raised Button');

      await renderComponent('KButton', {
        text: 'Raised Button',
        primary: false,
        appearance: 'raised-button',
      });
      await takeSnapshot('KButton - Secondary Raised Button');

      await renderComponent('KButton', {
        text: 'Flat Button',
        primary: true,
        appearance: 'flat-button',
      });
      await takeSnapshot('KButton - Primary Flat Button');

      await renderComponent('KButton', {
        text: 'Flat Button',
        primary: false,
        appearance: 'flat-button',
      });
      await takeSnapshot('KButton - Secondary Flat Button');

      await renderComponent('KButton', { text: 'Basic Link', appearance: 'basic-link' });
      await takeSnapshot('KButton - Basic Link');
    });
    it('renders correctly when disabled', async () => {
      await renderComponent('KButton', {
        text: 'Raised Button',
        disabled: true,
        appearance: 'raised-button',
      });
      await takeSnapshot('KButton - Disabled Raised Button');

      await renderComponent('KButton', {
        text: 'Flat Button',
        disabled: true,
        appearance: 'flat-button',
      });
      await takeSnapshot('KButton - Disabled Flat Button');
    });
    it('renders with hover state', async () => {
      await renderComponent('KButton', { text: 'Raised Button', appearance: 'raised-button' });
      await hover('button');
      await delay(4000);
      await takeSnapshot('KButton - Raised Button Hover');

      await renderComponent('KButton', { text: 'Flat Button', appearance: 'flat-button' });
      await hover('button');
      await delay(4000);
      await takeSnapshot('KButton - Flat Button Hover');
    });
    it('renders correctly with icon and iconAfter', async () => {
      await renderComponent('KButton', { text: 'Icon Button', icon: 'add' });
      await takeSnapshot('KButton - With Icons');

      await renderComponent('KButton', { text: 'Icon After', iconAfter: 'video' });
      await takeSnapshot('KButton - With Icons After');
    });
    it('renders correctly with KDropdownMenu slot and shows options on click', async () => {
      await renderComponent(
        'KButton',
        { text: 'Button with Dropdown' },
        {
          menu: {
            content: 'KDropdownMenu',
            props: { options: ['Option 1', 'Option 2'] },
          },
        }
      );
      await click('button');
      await takeSnapshot('KButton - Dropdown Opened');
    });
    it('should render the slot when the slot has content', async () => {
      await renderComponent(
        'KButton',
        { text: 'Button' },
        {
          default: '<span>Default Slot</span>',
        }
      );
      await takeSnapshot('KButton - With Default Slot');
    });
  });
});
