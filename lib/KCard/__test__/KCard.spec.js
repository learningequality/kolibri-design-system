import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import KCard from './../index.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

const router = new VueRouter({
  routes: [{ path: '/some-link', component: { template: '<div>Some Link Page</div>' } }],
});

function makeWrapper({ propsData = {}, slots = {} } = {}) {
  return mount(KCard, { router, propsData, slots, localVue });
}

describe('index.vue', () => {
  it('it triggers card click', async () => {
    const wrapper = makeWrapper( {
      propsData: { to: { path: '/some-link' } },
      localVue,
    })
    await wrapper.trigger('click')
  })

  it('should navigate on quick click', async () => {
    const wrapper = makeWrapper({
      propsData: { to: { path: '/some-link' } },
    });
    await wrapper.find('li').trigger('mousedown');
    await new Promise((resolve) => setTimeout(resolve, 100));
    await wrapper.find('li').trigger('mouseup');
    expect(wrapper.vm.$router.currentRoute.value.path).toBe('/some-link');
  });

  it('renders passed header level', () => {
    const wrapper = makeWrapper({
      propsData: { headingLevel: 4, to: { path: '/some-link' } },
    });

  //   const heading = wrapper.find('h4');
  //   expect(heading.exists()).toBe(true);
  // });

  // it('it re', () => {
  //   const wrapper = makeWrapper({
  //     propsData: { to: { path: '/some-link' } },
  //   });

  //   const toProp = wrapper.props().to;
  //   expect(toProp).toEqual({ path: '/some-link' });
  // });






  describe('it renders slotted content', () => {
    it('renders slotted content with belowTitle slot', () => {
      const wrapper = makeWrapper({
        propsData: { to: { path: '/some-link' } },
        slots: {},
      });

      const belowTitleSlot = wrapper.find('[data-testid="belowTitle"]');
      expect(belowTitleSlot.exists()).toBe(true);
      expect(belowTitleSlot.text()).toMatch('');
    });

    it('renders slotted content with footer slot', () => {
      const wrapper = makeWrapper({
        propsData: { to: { path: '/some-link' } },
        slots: {},
      });

      const footerSlot = wrapper.find('[data-testid="footer"]');
      expect(footerSlot.exists()).toBe(true);
      expect(footerSlot.text()).toMatch('');
    });
  });
  // describe('it renders nav', () => {
  //   const wrapper = makeWrapper({
  //     propsData: { to: { path: '/some-link' } },
  //   });
  //   it('should navigate on quick click', async () => {
  //     console.log(wrapper.vm.$router.currentRoute.value.path);
  //     await wrapper.find('li').trigger('mousedown');
  //     await new Promise((resolve) => setTimeout(resolve, 100));
  //     await wrapper.find('li').trigger('mouseup');
  //     expect(wrapper.vm.$router.currentRoute.value.path).toBe('/some-link');
  //   });

  //   it('should not navigate on long click', async () => {
  //     await wrapper.find('li').trigger('mousedown');
  //     await new Promise((resolve) => setTimeout(resolve, 500)); 
  //     await wrapper.find('li').trigger('mouseup');
  
  //     expect(wrapper.vm.$router.currentRoute.value.path).toBe('/some-link');
  //   });
  // });
});
