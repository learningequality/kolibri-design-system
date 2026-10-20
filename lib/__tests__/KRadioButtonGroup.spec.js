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

      const firstRadioBtnInputElm = radioButtons.at(0).find('input[type="radio"]');
      const secondRadioBtnInputElm = radioButtons.at(1).find('input[type="radio"]');
      const thirdRadioBtnInputElm = radioButtons.at(2).find('input[type="radio"]');

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
  describe('readonly', () => {
    let wrapper;
    afterEach(() => wrapper.destroy());

    const mountGroup = async ({ readonly = true, disabledB = false } = {}) => {
      wrapper = mount(
        {
          components: { KRadioButtonGroup, KRadioButton },
          data: () => ({ selected: 'val-a', readonly, disabledB }),
          template: `
            <KRadioButtonGroup :readonly="readonly">
              <KRadioButton v-model="selected" label="Option A" buttonValue="val-a" />
              <KRadioButton v-model="selected" label="Option B" buttonValue="val-b" :disabled="disabledB" />
              <KRadioButton v-model="selected" label="Option C" buttonValue="val-c" />
            </KRadioButtonGroup>
          `,
        },
        { attachTo: document.body },
      );
      await wrapper.vm.$nextTick();
      return wrapper.findAll('input').wrappers;
    };
    const tabIndexes = inputs => inputs.map(i => i.attributes('tabindex'));

    it.each([
      [true, 'true'],
      [false, undefined],
    ])('readonly=%s sets aria-readonly=%s on the radiogroup only', async (readonly, expected) => {
      const inputs = await mountGroup({ readonly });
      expect(wrapper.find('[role="radiogroup"]').attributes('aria-readonly')).toBe(expected);
      inputs.forEach(input => expect(input.attributes('aria-readonly')).toBeUndefined());
    });

    it('arrow keys move focus and the tab stop without changing the selection', async () => {
      const inputs = await mountGroup();

      await inputs[0].trigger('keyup', { key: 'ArrowDown' });
      expect(inputs[1].element).toHaveFocus();
      expect(tabIndexes(inputs)).toEqual(['-1', '0', '-1']);

      await inputs[1].trigger('keyup', { key: 'ArrowDown' });
      expect(inputs[2].element).toHaveFocus();

      await inputs[2].trigger('keyup', { key: 'ArrowUp' });
      expect(inputs[1].element).toHaveFocus();
      expect(tabIndexes(inputs)).toEqual(['-1', '0', '-1']);

      expect(wrapper.vm.selected).toBe('val-a');
      expect(inputs.map(i => i.element.checked)).toEqual([true, false, false]);
    });

    it('arrow keys continue from a clicked radio', async () => {
      const inputs = await mountGroup();

      await inputs[2].trigger('click');
      expect(tabIndexes(inputs)).toEqual(['-1', '-1', '0']);

      await inputs[2].trigger('keyup', { key: 'ArrowDown' });
      expect(inputs[0].element).toHaveFocus();
      expect(wrapper.vm.selected).toBe('val-a');
    });

    it('a disabled radio stays disabled while siblings stay readonly', async () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const inputs = await mountGroup({ disabledB: true });
      warn.mockRestore();
      expect(inputs[1].element).toBeDisabled();

      await inputs[2].trigger('click');
      expect(wrapper.vm.selected).toBe('val-a');
    });

    it('clicks and arrow keys change the selection again once readonly is set to false', async () => {
      const inputs = await mountGroup();
      const group = wrapper.find('[role="radiogroup"]');

      await inputs[1].trigger('click');
      expect(wrapper.vm.selected).toBe('val-a');

      await wrapper.setData({ readonly: false });
      // A remount would let a non-reactive provide pass this test
      expect(wrapper.findAll('input').wrappers.map(i => i.element)).toEqual(
        inputs.map(i => i.element),
      );
      expect(group.attributes('aria-readonly')).toBeUndefined();

      await inputs[1].trigger('click');
      expect(wrapper.vm.selected).toBe('val-b');
      await inputs[1].trigger('keyup', { key: 'ArrowDown' });
      expect(wrapper.vm.selected).toBe('val-c');

      await wrapper.setData({ readonly: true });
      expect(group.attributes('aria-readonly')).toBe('true');
      await inputs[2].trigger('keyup', { key: 'ArrowUp' });
      expect(inputs[1].element).toHaveFocus();
      expect(wrapper.vm.selected).toBe('val-c');
    });
  });
});
