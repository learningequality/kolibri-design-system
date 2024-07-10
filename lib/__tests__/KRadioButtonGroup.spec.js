import { mount } from '@vue/test-utils';
import KRadioButtonGroup from '../KRadioButtonGroup.vue';
import KRadioButton from '../KRadioButton.vue';

describe('KRadioButtonGroup component', () => {
  beforeEach(() => {
    // Mocked the userAgent because KRadioButtionGroup implements roving tabIndex only for firefox
    // So these tests are testing for firefox client only
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'mozilla/5.0 (x11; ubuntu; linux x86_64; rv:126.0) gecko/20100101 firefox/126.0',
      writable: true,
    });
  });
  describe('slot', () => {
    it('renders two KRadioButton', () => {
      const wrapper = mount(KRadioButtonGroup, {
        slots: {
          default: [
            '<KRadioButton label="Option A" buttonValue="val-a" />',
            '<KRadioButton label="Option B" buttonValue="val-b" />',
          ],
        },
      });
      expect(wrapper.findAllComponents(KRadioButton).length).toBe(2);
    });
  });
  describe('Behavior Tests', () => {
    it('handles keyboard navigation (focus previous/next radio)', async () => {
      const wrapper = mount(KRadioButtonGroup, {
        slots: {
          default: [
            '<KRadioButton label="Option A" buttonValue="val-a" />',
            '<KRadioButton label="Option B" buttonValue="val-b" />',
          ],
        },
      });
      await wrapper.vm.$nextTick();

      const radioButtons = wrapper.findAllComponents(KRadioButton);
      expect(radioButtons.length).toBe(2);

      await radioButtons.at(0).trigger('keyup', { key: 'ArrowDown' });
      expect(wrapper.vm.focusedRadioIdx).toBe(1);
      expect(radioButtons.at(0).vm.tabIndex).toBe(-1);
      expect(radioButtons.at(1).vm.tabIndex).toBe(0);

      await radioButtons.at(1).trigger('keyup', { key: 'ArrowUp' });
      expect(wrapper.vm.focusedRadioIdx).toBe(0);
      expect(radioButtons.at(0).vm.tabIndex).toBe(0);
      expect(radioButtons.at(1).vm.tabIndex).toBe(-1);
    });
    it('handles click on radio correctly', async () => {
      const wrapper = mount(KRadioButtonGroup, {
        slots: {
          default: [
            '<KRadioButton label="Option A" buttonValue="val-a" />',
            '<KRadioButton label="Option B" buttonValue="val-b" />',
            '<KRadioButton label="Option C" buttonValue="val-c" />',
          ],
        },
      });
      await wrapper.vm.$nextTick();
      const radioButtons = wrapper.findAllComponents(KRadioButton);
      await radioButtons.at(2).trigger('click');
      expect(wrapper.vm.focusedRadioIdx).toBe(2);
      expect(radioButtons.at(2).vm.tabIndex).toBe(0);
      expect(radioButtons.at(1).vm.tabIndex).toBe(-1);
    });
    it('handles enabling and disabling correctly', async () => {
      const wrapper = mount(KRadioButtonGroup, {
        props: {
          enable: true,
        },
        slots: {
          default: [
            '<KRadioButton label="Option A" buttonValue="val-a" />',
            '<KRadioButton label="Option B" buttonValue="val-b" />',
            '<KRadioButton label="Option C" buttonValue="val-c" />',
          ],
        },
      });
      await wrapper.vm.$nextTick();
      const radioButtons = wrapper.findAllComponents(KRadioButton);
      await radioButtons.at(2).trigger('click');
      expect(wrapper.vm.focusedRadioIdx).toBe(2);
      expect(radioButtons.at(2).vm.tabIndex).toBe(0);
      expect(radioButtons.at(1).vm.tabIndex).toBe(-1);

      await wrapper.setProps({ enable: false });
      await wrapper.setProps({ enable: true });
      expect(wrapper.vm.focusedRadioIdx).toBe(0);
      expect(radioButtons.at(0).vm.tabIndex).toBe(0);
      expect(radioButtons.at(1).vm.tabIndex).toBe(-1);
    });
  });
});
