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
    it('handles keyboard navigation', async () => {
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
      expect(radioButtons.length).toBe(3);

      let firstRadioBtnInputElm = radioButtons.at(0).find('input[type="radio"]');
      let secondRadioBtnInputElm = radioButtons.at(1).find('input[type="radio"]');
      let thirdRadioBtnInputElm = radioButtons.at(2).find('input[type="radio"]');

      await firstRadioBtnInputElm.trigger('keyup', { key: 'ArrowDown' });

      expect(firstRadioBtnInputElm.attributes('tabindex')).toBe('-1');
      expect(secondRadioBtnInputElm.attributes('tabindex')).toBe('0');
      expect(thirdRadioBtnInputElm.attributes('tabindex')).toBe('-1');

      await secondRadioBtnInputElm.trigger('keyup', { key: 'ArrowUp' });

      expect(firstRadioBtnInputElm.attributes('tabindex')).toBe('0');
      expect(secondRadioBtnInputElm.attributes('tabindex')).toBe('-1');
      expect(thirdRadioBtnInputElm.attributes('tabindex')).toBe('-1');
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
        attachTo: document.body,
      });
      await wrapper.vm.$nextTick();

      const radioButtons = wrapper.findAllComponents(KRadioButton);
      await radioButtons.at(2).trigger('click');

      const firstRadioBtnInputElm = radioButtons.at(0).find('input[type="radio"]');
      const secondRadioBtnInputElm = radioButtons.at(1).find('input[type="radio"]');
      const thirdRadioBtnInputElm = radioButtons.at(2).find('input[type="radio"]');

      expect(firstRadioBtnInputElm.attributes('tabindex')).toBe('-1');
      expect(secondRadioBtnInputElm.attributes('tabindex')).toBe('-1');
      expect(thirdRadioBtnInputElm.attributes('tabindex')).toBe('0');
    });
  });
});
