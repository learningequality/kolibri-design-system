import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import KCard from './../index.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

const router = new VueRouter({
  routes: [{ path: '/some-link' }],
});

function makeWrapper({ propsData = {}, slots = {} } = {}) {
  return mount(KCard, { router, propsData, slots, localVue });
}

describe('index.vue', () => {
  it('renders passed header level', () => {
    const wrapper = makeWrapper({
      propsData: { headingLevel: 4, title: 'sample title prop', to: { path: '/some-link' } },
    });

    const heading = wrapper.find('h4');
    expect(heading.exists()).toBe(true);
  });

  // it('renders the correct accessibility structure', () => {
  //   const wrapper = makeWrapper({
  //     propsData: { to: { path: '/some-link' }, headingLevel: 4 },
  //   });
  //   const listItem = wrapper.find('li');
  //   expect(listItem.exists()).toBe(true);
  //   expect(listItem.element.tagName.toLowerCase()).toBe('li');
  //   const heading = listItem.find(`h${wrapper.vm.headingLevel}`);
  //   expect(heading.exists()).toBe(true);
  //   expect(heading.element.parentElement).toEqual(listItem.element);
  //   const anchor = heading.find('a');
  //   expect(anchor.exists()).toBe(true);
  //   expect(anchor.element.parentElement).toEqual(heading.element);
  //   const defaultSlot = listItem.find('slot');
  //   expect(defaultSlot.exists()).toBe(true);
  // });


  it('should not navigate on long click', async () => {
    const wrapper = makeWrapper({
      propsData: { to: { path: '/some-link' },title: 'sample title prop' },
    });

    await wrapper.find('li').trigger('mousedown');
    await new Promise(resolve => setTimeout(resolve, 500));
    await wrapper.find('li').trigger('mouseup');
    expect(wrapper.vm.$router.currentRoute.path).not.toBe('/some-link');
  });

  it('should navigate on quick click', async () => {
    const wrapper = makeWrapper({
      propsData: { to: { path: '/some-link' } , title: 'sample title prop'},
    });

    await wrapper.find('li').trigger('mousedown');
    await new Promise(resolve => setTimeout(resolve, 100));
    await wrapper.find('li').trigger('mouseup');

    expect(wrapper.vm.$router.currentRoute.path).toBe('/some-link');
  });

  describe('it renders slotted content', () => {
    it('renders slotted content with belowTitle slot', () => {
      const wrapper = makeWrapper({
        propsData: { to: { path: '/some-link' } ,  title: 'sample title prop',},
        slots: {},
      });

      const belowTitleSlot = wrapper.find('[data-testid="belowTitle"]');
      expect(belowTitleSlot.exists()).toBe(true);
      expect(belowTitleSlot.text()).toMatch('');
    });

    it('renders slotted content with footer slot', () => {
      const wrapper = makeWrapper({
        propsData: { to: { path: '/some-link' }, title: 'sample title prop', },
        slots: {},
      });

      const footerSlot = wrapper.find('[data-testid="footer"]');
      expect(footerSlot.exists()).toBe(true);
      expect(footerSlot.text()).toMatch('');
    });
  });
});
