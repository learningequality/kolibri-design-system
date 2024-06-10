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

  it('renders the correct accessibility structure', () => {
    const wrapper = makeWrapper({
      propsData: { to: { path: '/some-link' }, headingLevel: 'h4', title: 'sample title prop' },
      slots: {},
    });

    // Step 1: Check that <li> is the very first element within the wrapper
    const listItem = wrapper.find('li');
    expect(listItem.exists()).toBe(true);

    // Ensure <li> is the first element
    const firstElement = wrapper.element.firstElementChild;
    expect(firstElement.tagName.toLowerCase()).toBe('li');

    // Step 2: Check that <h4> is the first direct child of <li>
    const heading = listItem.find('h4:first-child');
    expect(heading.exists()).toBe(true);
    expect(heading.element.parentElement).toEqual(listItem.element);

    // Step 3: Check that <router-link> is the first direct child of <h4>
    const routerLink = heading.find('a:first-child'); // router-link renders an <a> tag
    expect(routerLink.exists()).toBe(true);
    expect(routerLink.element.parentElement).toEqual(heading.element);
  });

  it('should not navigate on long click', async () => {
    const wrapper = makeWrapper({
      propsData: { to: { path: '/some-link' }, title: 'sample title prop' },
    });

    await wrapper.find('li').trigger('mousedown');
    await new Promise(resolve => setTimeout(resolve, 500));
    await wrapper.find('li').trigger('mouseup');
    expect(wrapper.vm.$router.currentRoute.path).not.toBe('/some-link');
  });

  it('should navigate on quick click', async () => {
    const wrapper = makeWrapper({
      propsData: { to: { path: '/some-link' }, title: 'sample title prop' },
    });

    await wrapper.find('li').trigger('mousedown');
    await new Promise(resolve => setTimeout(resolve, 100));
    await wrapper.find('li').trigger('mouseup');

    expect(wrapper.vm.$router.currentRoute.path).toBe('/some-link');
  });

  describe('it renders slotted content', () => {
    it('renders slotted content with belowTitle slot', () => {
      const wrapper = makeWrapper({
        propsData: { to: { path: '/some-link' }, title: 'sample title prop' },
        slots: {},
      });

      const belowTitleSlot = wrapper.find('[data-testid="belowTitle"]');
      expect(belowTitleSlot.exists()).toBe(true);
      expect(belowTitleSlot.text()).toMatch('');
    });

    it('renders slotted content with footer slot', () => {
      const wrapper = makeWrapper({
        propsData: { to: { path: '/some-link' }, title: 'sample title prop' },
        slots: {},
      });

      const footerSlot = wrapper.find('[data-testid="footer"]');
      expect(footerSlot.exists()).toBe(true);
      expect(footerSlot.text()).toMatch('');
    });
  });
});
