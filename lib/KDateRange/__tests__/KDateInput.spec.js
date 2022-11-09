import { shallowMount, mount } from '@vue/test-utils';
import KDateInput from '../KDateInput';
import KTextBox from '../../KTextbox';

describe('KDateInput component', () => {
  it(`smoke test`, () => {
    const wrapper = mount(KDateInput, {
      propsData: {
        selectedDate: new Date(2022, 8, 1),
        firstAllowedDate: new Date(2022, 1, 1),
        lastAllowedDate: new Date(),
        legendText: 'Start Date',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  describe('Text validation', () => {
    let wrapper = null;
    beforeAll(() => {
      wrapper = mount(KDateInput, {
        propsData: {
          firstAllowedDate: new Date(2022, 1, 1),
          lastAllowedDate: new Date(),
          legendText: 'Start Date',
        },
      });
    });
    describe(`isValidDate`, () => {
      it('input text should be invalid', () => {
        expect(wrapper.vm.isInvalidDate('aaaaaa')).toBeTruthy();
      });
      it(`input text should be valid`, () => {
        expect(wrapper.vm.isInvalidDate('01/09/2022')).toBeFalsy();
      });
    });

    describe(`validation props`, () => {
      it('text error should say: Please enter a valid date', async () => {
        const textBox = wrapper.findComponent(KTextBox);
        expect(textBox.exists()).toBe(true);

        const input = textBox.find('input');
        expect(input.exists()).toBe(true);

        await input.setValue('Invalid Date');

        expect(textBox.find('input').element.value).toBe('Invalid Date');
        await textBox.vm.$nextTick();
        // await textBox.setData({ invalid: true, showInvalidText: true });

        expect(textBox.props('invalid')).toBeTruthy();
        expect(textBox.props('invalidText')).toBe('Please enter a valid date');
      });
    });
  });
});
