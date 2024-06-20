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

  it('renders the correct accessibility  structure when title slot is passed', () => {
    const wrapper = makeWrapper({
      propsData: { to: { path: '/some-link' }, headingLevel: 4,  },
      slots: {
        title: 'Test Title',
      },
    });
    const titleSlots =wrapper.find('h4');
    expect(titleSlots.exists()).toBe(true);
    const firstElement = wrapper.find('li');
    expect(firstElement.element.tagName.toLowerCase()).toBe('li');
    expect(firstElement.exists()).toBe(true);
    const secondElement = wrapper.find('li > :first-child');
    expect(secondElement.exists()).toBe(true);
    expect(secondElement.element.tagName.toLowerCase()).toBe('h4');
    const thirdElement = wrapper.find('h4 > :first-child');
    expect(thirdElement.element.tagName.toLowerCase()).toBe('a');
    expect(thirdElement.exists()).toBe(true); 

  });

  it('renders the correct accessibility structure when title pass as props',() => {
    const wrapper = makeWrapper({
      propsData: { to: { path: '/some-link' }, headingLevel: 4, title: 'Test Title' },
      slots: {},
    });
    const firstElement = wrapper.find(':first-child');
    expect(firstElement.exists()).toBe(true);
    expect(firstElement.element.tagName.toLowerCase()).toBe('li');

    const secondElement = wrapper.find('li > :first-child');
    expect(secondElement.exists()).toBe(true);
    expect(secondElement.element.tagName.toLowerCase()).toBe('h4');

    const thirdElement = wrapper.find('h4 > :first-child');
    expect(thirdElement.exists()).toBe(true);
    expect(thirdElement.element.tagName.toLowerCase()).toBe('a');
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
      propsData: { to: { path: '/some-link' }, title: 'sample title ' },
    });

    await wrapper.find('li').trigger('mousedown');
    await new Promise(resolve => setTimeout(resolve, 100));
    await wrapper.find('li').trigger('mouseup');

    expect(wrapper.vm.$router.currentRoute.path).toBe('/some-link');
  });

  describe('it renders slotted content', () => {
    it('renders slotted content with belowTitle slot', () => {
      const wrapper = makeWrapper({
        propsData: { to: { path: '/some-link' }, title: 'sample title ' },
        slots: {},
      });

      const belowTitleSlot = wrapper.find('[data-testid="belowTitle"]');
      expect(belowTitleSlot.exists()).toBe(true);
      expect(belowTitleSlot.text()).toMatch('');
    });

    it('renders slotted content with footer slot', () => {
      const wrapper = makeWrapper({
        propsData: { to: { path: '/some-link' }, title: 'sample title ' },
        slots: {},
      });

      const footerSlot = wrapper.find('[data-testid="footer"]');
      expect(footerSlot.exists()).toBe(true);
      expect(footerSlot.text()).toMatch('');
    });
  });
});

