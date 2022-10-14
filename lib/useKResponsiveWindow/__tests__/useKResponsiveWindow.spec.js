import 'mock-match-media/jest-setup.cjs';
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

describe('useKResponsiveWindow composable', () => {
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

  describe('check if windowBreakpoint is set on width change', () => {
    it('windowBreakpoint is 0 if width <= 480px', () => {
      setMedia({
        width: '400px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowBreakpoint).toEqual(0);
    });

    it('windowBreakpoint is 1 if 480px < width <= 600px', () => {
      setMedia({
        width: '540px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowBreakpoint).toEqual(1);
    });

    it('windowBreakpoint is 2 if 600px < width <= 840px', () => {
      setMedia({
        width: '800px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowBreakpoint).toEqual(2);
    });

    it('windowBreakpoint is 3 if 840px < width <= 944px', () => {
      setMedia({
        width: '944px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowBreakpoint).toEqual(3);
    });

    it('windowBreakpoint is 4 if 944px < width <= 1264px', () => {
      setMedia({
        width: '1264px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowBreakpoint).toEqual(4);
    });

    it('windowBreakpoint is 5 if 1264px < width <= 1424px', () => {
      setMedia({
        width: '1424px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowBreakpoint).toEqual(5);
    });

    it('windowBreakpoint is 6 if 1424px < width <= 1584px', () => {
      setMedia({
        width: '1584px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowBreakpoint).toEqual(6);
    });

    it('windowBreakpoint is 7 if width >= 1601px', () => {
      setMedia({
        width: '1800px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowBreakpoint).toEqual(7);
    });
  });

  describe('check if windowIsSmall is set on width change', () => {
    it('windowIsSmall is false if width > 600px', () => {
      setMedia({
        width: '601px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsSmall).toEqual(false);
    });

    it('windowIsSmall is true if width <= 600px', () => {
      setMedia({
        width: '600px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsSmall).toEqual(true);
    });
  });

  describe('check if windowIsMedium is set on width change', () => {
    it('windowIsMedium is false if width <= 600px', () => {
      setMedia({
        width: '600px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsMedium).toEqual(false);
    });

    it('windowIsMedium is true if 600px < width >= 840px', () => {
      setMedia({
        width: '700px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsMedium).toEqual(true);
    });
  });

  describe('check if windowIsLarge is set on width change', () => {
    it('windowIsLarge is false if width <= 840px', () => {
      setMedia({
        width: '840px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsLarge).toEqual(false);
    });

    it('windowIsLarge is true if width > 840px', () => {
      setMedia({
        width: '841px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsLarge).toEqual(true);
    });
  });

  describe('check if windowIsShort is set on height change', () => {
    it('windowIsShort is false if height > 600px', () => {
      setMedia({
        height: '601px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsShort).toEqual(false);
    });

    it('windowIsShort is true if height <= 600px', () => {
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

  describe('check if windowGutter is set on width change', () => {
    it('windowGutter is 16px if windowIsSmall is true(width <= 600px)', () => {
      setMedia({
        width: '600px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowIsSmall).toEqual(true);
      expect(wrapper.vm.windowGutter).toEqual(16);
    });
    it('windowGutter is 16px if windowBreakpoint < 4(width < 1264px) and smallest dimension(width, height) is smaller than 600px', () => {
      setMedia({
        width: '500px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowBreakpoint).toEqual(1);
      expect(wrapper.vm.windowGutter).toEqual(16);
    });
    it('windowGutter is 24px if windowIsSmall is false(width > 600px)', () => {
      setMedia({
        width: '841px',
      });
      const wrapper = mount(TestComponent());
      expect(wrapper.vm.windowGutter).toEqual(24);
    });
  });
});
