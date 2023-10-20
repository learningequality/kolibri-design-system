import { defineComponent } from '@vue/composition-api';
import { mount } from '@vue/test-utils';
import useKWindowDimensions from '../useKWindowDimensions';

const resizeWindow = (width, height) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
};

describe('useKWindowDimensions composable', () => {
  let TestComponent;
  beforeAll(() => {
    TestComponent = defineComponent({
      setup() {
        return {
          ...useKWindowDimensions(),
        };
      },
    });
  });

  it('check if windowWidth and windowHeight properties are initialized on mount', () => {
    const wrapper = mount(TestComponent);
    // Wait for the throttling delay
    setTimeout(() => {
      expect(wrapper.vm.windowWidth).toEqual(expect.any(Number));
      expect(wrapper.vm.windowHeight).toEqual(expect.any(Number));
    }, 20);
  });

  it('check if windowWidth and windowHeight change when window is resized', () => {
    const wrapper = mount(TestComponent);
    expect(wrapper.vm.windowWidth).not.toEqual(600);
    expect(wrapper.vm.windowHeight).not.toEqual(400);
    resizeWindow(600, 400);
    // Wait for the throttling delay
    setTimeout(() => {
      expect(wrapper.vm.windowWidth).toEqual(600);
      expect(wrapper.vm.windowHeight).toEqual(400);
    }, 20);
  });
});
