import { setMedia } from 'mock-match-media';
import { defineComponent } from '@vue/composition-api';
import { mount } from '@vue/test-utils';
import useKResponsiveWindow from '..';

const resizeWindow = (width, height) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
};

const TestComponent = () =>
  defineComponent({
    setup() {
      return {
        ...useKResponsiveWindow(),
      };
    },
  });

describe('useKWindowDimensions composable', () => {
  beforeEach(() => {
    setMedia({
      width: '1700px',
      type: 'screen',
      orientation: 'landscape',
    });
  });

  it('check if returned properties are initialized on mount', () => {
    resizeWindow(1700, 768);
    const wrapper = mount(TestComponent());
    expect(wrapper.vm.windowWidth).toEqual(1700);
    expect(wrapper.vm.windowHeight).toEqual(768);
    expect(wrapper.vm.windowBreakpoint).toEqual(7);
    expect(wrapper.vm.windowIsPortrait).toEqual(false);
    expect(wrapper.vm.windowIsLandscape).toEqual(true);
    expect(wrapper.vm.windowGutter).toEqual(24);
    expect(wrapper.vm.windowIsShort).toEqual(false);
    expect(wrapper.vm.windowIsLarge).toEqual(true);
    expect(wrapper.vm.windowIsMedium).toEqual(false);
    expect(wrapper.vm.windowIsSmall).toEqual(false);
  });

  it('check if windowBreakpoint is set on width change', () => {
    setMedia({
      width: '480px',
    });
    const wrapper = mount(TestComponent());
    expect(wrapper.vm.windowBreakpoint).toEqual(0);
  });

  describe('check if windowIsSmall is set on windowBreakpoint change', () => {
    it('windowIsSmall is false if greater than 600px', () => {
      setMedia({
        width: '601px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsSmall).toEqual(false);
    });

    it('windowIsSmall is true if less than or equal to 600px', () => {
      setMedia({
        width: '600px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsSmall).toEqual(true);
    });
  });

  describe('check if windowIsMedium is set on windowBreakpoint change', () => {
    it('windowIsMedium is false if less than  or equal to 600px', () => {
      setMedia({
        width: '600px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsMedium).toEqual(false);
    });

    it('windowIsMedium is true if greater than 600px and less than or equal to 840px', () => {
      setMedia({
        width: '700px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsMedium).toEqual(true);
    });
  });

  describe('check if windowIsLarge is set on windowBreakpoint change', () => {
    it('windowIsLarge is false if less than to 840px', () => {
      setMedia({
        width: '840px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsLarge).toEqual(false);
    });

    it('windowIsLarge is true if greater than to 840px', () => {
      setMedia({
        width: '841px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsLarge).toEqual(true);
    });
  });

  describe('check if windowIsShort is set on height change', () => {
    it('windowIsShort is false if greater than 600px', () => {
      setMedia({
        height: '601px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsShort).toEqual(false);
    });

    it('windowIsShort is true if less than or equal to  600px', () => {
      setMedia({
        height: '400px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsShort).toEqual(true);
    });
  });

  it('check if windowIsPortrait and windowIsLandscape is set on orientation change', () => {
    setMedia({
      orientation: 'portrait',
    });
    const wrapper = mount(TestComponent());
    expect(wrapper.vm.windowIsPortrait).toEqual(true);
    expect(wrapper.vm.windowIsLandscape).toEqual(false);
  });

  describe('check if windowGutter is set on windowBreakpoint and windowIsSmall change', () => {
    it('windowGutter is 16px if windowIsSmall is true', () => {
      setMedia({
        width: '600px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsSmall).toEqual(true);
      expect(wrapper.vm.windowGutter).toEqual(16);
    });
    it('windowGutter is 16px if windowBreakpoint < 4 and smallest dimension(width, height) is smaller than 600px', () => {
      setMedia({
        width: '500px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowBreakpoint).toEqual(1);
      expect(wrapper.vm.windowGutter).toEqual(16);
    });
    it('windowGutter is 24px if windowIsSmall is false, windowBreakpoint > 4 and smallest dimension(width, height) > 600px', () => {
      setMedia({
        width: '841px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowGutter).toEqual(24);
    });
  });
});
