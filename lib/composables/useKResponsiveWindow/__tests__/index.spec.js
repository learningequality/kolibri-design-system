import 'mock-match-media/jest-setup.cjs';
import { setMedia } from 'mock-match-media';
import { defineComponent } from '@vue/composition-api';
import { mount } from '@vue/test-utils';
import useKResponsiveWindow from '../';

const resizeWindow = (width, height = 768) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
  setMedia({
    width: `${width}px`,
    height: `${height}px`,
  });
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

  it('check if returned properties are initialized on mount', async () => {
    resizeWindow(1700);
    const wrapper = mount(TestComponent());
    await wrapper.vm.$nextTick();
    let animationFrameId;
    const checkWindowProperties = () => {
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
      animationFrameId = cancelAnimationFrame(animationFrameId);
    };
    animationFrameId = requestAnimationFrame(checkWindowProperties);
  });

  describe('check if windowBreakpoint is set on width change', () => {
    it('windowBreakpoint is 0 if width <= 480px', async () => {
      resizeWindow(400);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      let animationFrameId;
      const checkWindowBreakpoint = () => {
        expect(wrapper.vm.windowBreakpoint).toEqual(0);
        animationFrameId = cancelAnimationFrame(animationFrameId);
      };
      animationFrameId = requestAnimationFrame(checkWindowBreakpoint);
    });

    it('windowBreakpoint is 1 if 480px < width <= 600px', async () => {
      resizeWindow(540);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      let animationFrameId;
      const checkWindowBreakpoint = () => {
        expect(wrapper.vm.windowBreakpoint).toEqual(1);
        animationFrameId = cancelAnimationFrame(animationFrameId);
      };
      animationFrameId = requestAnimationFrame(checkWindowBreakpoint);
    });

    it('windowBreakpoint is 2 if 600px < width <= 840px', async () => {
      resizeWindow(800);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      let animationFrameId;
      const checkWindowBreakpoint = () => {
        expect(wrapper.vm.windowBreakpoint).toEqual(2);
        animationFrameId = cancelAnimationFrame(animationFrameId);
      };
      animationFrameId = requestAnimationFrame(checkWindowBreakpoint);
    });

    it('windowBreakpoint is 3 if 840px < width <= 944px', async () => {
      resizeWindow(944);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      let animationFrameId;
      const checkWindowBreakpoint = () => {
        expect(wrapper.vm.windowBreakpoint).toEqual(3);
        animationFrameId = cancelAnimationFrame(animationFrameId);
      };
      animationFrameId = requestAnimationFrame(checkWindowBreakpoint);
    });

    it('windowBreakpoint is 4 if 944px < width <= 1264px', async () => {
      resizeWindow(1264);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      let animationFrameId;
      const checkWindowBreakpoint = () => {
        expect(wrapper.vm.windowBreakpoint).toEqual(4);
        animationFrameId = cancelAnimationFrame(animationFrameId);
      };
      animationFrameId = requestAnimationFrame(checkWindowBreakpoint);
    });

    it('windowBreakpoint is 5 if 1264px < width <= 1424px', async () => {
      resizeWindow(1424);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      let animationFrameId;
      const checkWindowBreakpoint = () => {
        expect(wrapper.vm.windowBreakpoint).toEqual(5);
        animationFrameId = cancelAnimationFrame(animationFrameId);
      };
      animationFrameId = requestAnimationFrame(checkWindowBreakpoint);
    });

    it('windowBreakpoint is 6 if 1424px < width <= 1584px', async () => {
      resizeWindow(1584);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      let animationFrameId;
      const checkWindowBreakpoint = () => {
        expect(wrapper.vm.windowBreakpoint).toEqual(6);
        animationFrameId = cancelAnimationFrame(animationFrameId);
      };
      animationFrameId = requestAnimationFrame(checkWindowBreakpoint);
    });

    it('windowBreakpoint is 7 if width >= 1601px', async () => {
      resizeWindow(1800);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      let animationFrameId;
      const checkWindowBreakpoint = () => {
        expect(wrapper.vm.windowBreakpoint).toEqual(7);
        animationFrameId = cancelAnimationFrame(animationFrameId);
      };
      animationFrameId = requestAnimationFrame(checkWindowBreakpoint);
    });
  });

  describe('check if windowIsSmall is set on width change', () => {
    it('windowIsSmall is false if width > 600px', async () => {
      resizeWindow(601);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      let animationFrameId;
      const checkWindowIsSmall = () => {
        expect(wrapper.vm.windowIsSmall).toEqual(false);
        animationFrameId = cancelAnimationFrame(animationFrameId);
      };
      animationFrameId = requestAnimationFrame(checkWindowIsSmall);
    });

    it('windowIsSmall is true if width <= 600px', async () => {
      resizeWindow(600);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.windowIsSmall).toEqual(true);
    });
  });

  describe('check if windowIsMedium is set on width change', () => {
    it('windowIsMedium is false if width <= 600px', async () => {
      resizeWindow(600);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.windowIsMedium).toEqual(false);
    });

    it('windowIsMedium is true if 600px < width <= 840px', async () => {
      resizeWindow(700);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      let animationFrameId;
      const checkWindowIsMedium = () => {
        expect(wrapper.vm.windowIsMedium).toEqual(true);
        animationFrameId = cancelAnimationFrame(animationFrameId);
      };
      animationFrameId = requestAnimationFrame(checkWindowIsMedium);
    });
  });

  describe('check if windowIsLarge is set on width change', () => {
    it('windowIsLarge is false if width <= 840px', async () => {
      resizeWindow(840);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.windowIsLarge).toEqual(false);
    });

    it('windowIsLarge is true if width > 840px', async () => {
      resizeWindow(841);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      let animationFrameId;
      const checkWindowIsLarge = () => {
        expect(wrapper.vm.windowIsLarge).toEqual(true);
        animationFrameId = cancelAnimationFrame(animationFrameId);
      };
      animationFrameId = requestAnimationFrame(checkWindowIsLarge);
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
    it('windowGutter is 16px if windowIsSmall is true(width <= 600px)', async () => {
      resizeWindow(600);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.windowIsSmall).toEqual(true);
      expect(wrapper.vm.windowGutter).toEqual(16);
    });
    it('windowGutter is 16px if windowBreakpoint < 4(width < 1264px) and smallest dimension(width, height) is smaller than 600px', async () => {
      resizeWindow(500, 500);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      let animationFrameId;
      const checkWindowProperties = () => {
        expect(wrapper.vm.windowBreakpoint).toEqual(1);
        expect(wrapper.vm.windowGutter).toEqual(16);
        animationFrameId = cancelAnimationFrame(animationFrameId);
      };
      animationFrameId = requestAnimationFrame(checkWindowProperties);
    });
    it('windowGutter is 24px if windowIsSmall is false(width > 600px)', async () => {
      resizeWindow(841);
      const wrapper = mount(TestComponent());
      await wrapper.vm.$nextTick();
      let animationFrameId;
      const checkWindowGutter = () => {
        expect(wrapper.vm.windowGutter).toEqual(24);
        animationFrameId = cancelAnimationFrame(animationFrameId);
      };
      animationFrameId = requestAnimationFrame(checkWindowGutter);
    });
  });
});
