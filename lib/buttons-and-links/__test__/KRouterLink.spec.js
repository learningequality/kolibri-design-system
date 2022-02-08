import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router';
import KRouterLink from '../KRouterLink';

const localVue = createLocalVue();
localVue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/home' },
  ],
});

function makeWrapper() {
  return shallowMount(KRouterLink, {
		localVue,
    router,
    propsData: {
      to: { path: '/test_link' },
    },
	});
}

describe('KRouterLink component', () => {
  it(`smoke test`, () => {
    const wrapper = makeWrapper();
    expect(wrapper.exists()).toBe(true);
  });

  describe('links', () => {
    it('should render a link to the specified path ',  async () => {
      const wrapper = makeWrapper();
      await wrapper.setProps(
        {
          text: 'test',
          appearance: 'basic-link',
        }
      );
      
      expect(wrapper.props().to).toEqual({ path: '/test_link' });
      expect(wrapper.text()).toContain('test');
      expect(wrapper.classes()).toContain('link')
    });
    it('should render a link with an icon before', async () => {
      const wrapper = makeWrapper();
      await wrapper.setProps(
        {
          text: 'icon_before',
          appearance: 'basic-link',
          icon: 'device'
        }
      );

      expect(wrapper.props().to).toEqual({ path: '/test_link' });
      expect(wrapper.text()).toContain('icon_before');
      expect(wrapper.classes()).toContain('link');
      expect(wrapper.find(`[data-test="icon-before"]`).element).toBeTruthy();
      expect(wrapper.find(`[data-test="icon-after"]`).element).toBeFalsy();
      
    });
    it('should render a link with an icon after', async () => {
      const wrapper = makeWrapper();
      await wrapper.setProps(
        {
          text: 'icon_after',
          appearance: 'basic-link',
          iconAfter: 'device'
        }
        );

        expect(wrapper.props().to).toEqual({ path: '/test_link' });
        expect(wrapper.text()).toContain('icon_after');
        expect(wrapper.classes()).toContain('link')
        expect(wrapper.find(`[data-test="icon-before"]`).element).toBeFalsy();
        expect(wrapper.find(`[data-test="icon-after"]`).element).toBeTruthy();
    });
  });

  describe('buttons', () => {
    it('should render a primary, raised button', async () => {
      const wrapper = makeWrapper();
      await wrapper.setProps(
        {
          text: 'test2',
          appearance: 'raised-button',
          primary: true
        }
      );
      expect(wrapper.text()).toContain('test2');
      expect(wrapper.classes()).toContain('button');
      expect(wrapper.classes()).toContain('raised');

      const button = wrapper.find('.button');
      expect(button.vm.primary).toBe(true);
    });
    it('should render a primary, flat button', async () => {
      const wrapper = makeWrapper();
      await wrapper.setProps(
        {
          text: 'test2',
          appearance: 'flat-button',
          primary: true
        }
      );
      expect(wrapper.text()).toContain('test2');
      expect(wrapper.classes()).toContain('button');
      expect(wrapper.classes()).not.toContain('raised');

      const button = wrapper.find('.button');
      expect(button.vm.primary).toBe(true);
    });
    it('should render a secondary, raised button', async () => {
      const wrapper = makeWrapper();
      await wrapper.setProps(
        {
          text: 'test2',
          appearance: 'raised-button',
        }
      );
      expect(wrapper.text()).toContain('test2');
      expect(wrapper.classes()).toContain('button');
      expect(wrapper.classes()).toContain('raised');

      const button = wrapper.find('.button');
      expect(button.vm.primary).toBe(false);
    });
    it('should render a secondary, flat button', async () => {
      const wrapper = makeWrapper();
      await wrapper.setProps(
        {
          text: 'test2',
          appearance: 'flat-button',
        }
      );
      expect(wrapper.text()).toContain('test2');
      expect(wrapper.classes()).toContain('button');
      expect(wrapper.classes()).not.toContain('raised');

      const button = wrapper.find('.button');
      expect(button.vm.primary).toBe(false);
    });
  });

  describe('props', () => {
    it(`should allow router-link to modify current history entry when 'replace' is true`, async () => {
      const wrapper = makeWrapper();
      await wrapper.setProps(
        {
          text: 'test2',
          replace: true,
        }
      );

      const routerLink = wrapper.find(`[data-test="router-link"]`);
      expect(routerLink.vm.replace).toBe(true);
    });
  });
});
