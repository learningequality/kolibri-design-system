import { shallowMount } from '@vue/test-utils';
import { resizeWindow, testAfterResize } from '../../../jest.conf/testUtils';
import KGrid from '../KGrid';

function makeWrapper(options) {
  return shallowMount(KGrid, options);
}

describe('KGrid component', () => {
  it('grid should have 4 columns on small screens', async () => {
    const wrapper = makeWrapper({ propsData: {} });
    resizeWindow(400, 400);
    await wrapper.vm.$nextTick();
    const checkGridColumns = () => {
      expect(wrapper.vm).toMatchObject({
        windowIsSmall: true,
        windowIsMedium: false,
        windowIsLarge: false,
        windowGridColumns: 4,
      });
    };
    testAfterResize(checkGridColumns);
  });
  it('grid should have 8 columns on medium screens', async () => {
    const wrapper = makeWrapper({ propsData: {} });
    resizeWindow(700, 700);
    await wrapper.vm.$nextTick();
    const checkGridColumns = () => {
      expect(wrapper.vm).toMatchObject({
        windowIsSmall: false,
        windowIsMedium: true,
        windowIsLarge: false,
        windowGridColumns: 8,
      });
    };
    testAfterResize(checkGridColumns);
  });
  it('grid should have 12 columns on large screens', async () => {
    const wrapper = makeWrapper({ propsData: {} });
    resizeWindow(900, 900);
    await wrapper.vm.$nextTick();
    const checkGridColumns = () => {
      expect(wrapper.vm).toMatchObject({
        windowIsSmall: false,
        windowIsMedium: false,
        windowIsLarge: true,
        windowGridColumns: 12,
      });
    };
    testAfterResize(checkGridColumns);
  });
});
