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

/* checks the expected card markup:
<li>
  <h[2-6]>
    <a href="/some-link">Test Title</a>
  </h[2-6]>

  all other content
</li> */
function checkExpectedCardMarkup({ wrapper, headingLevel, title }) {
  const firstElement = wrapper.find(':first-child');
  expect(firstElement.exists()).toBe(true);
  expect(firstElement.element.tagName.toLowerCase()).toBe('li');

  const secondElement = wrapper.find('li > :first-child');
  expect(secondElement.exists()).toBe(true);
  expect(secondElement.element.tagName.toLowerCase()).toBe(`h${headingLevel}`);

  const thirdElement = wrapper.find(`h${headingLevel} > :first-child`);
  expect(thirdElement.element.tagName.toLowerCase()).toBe('a');
  expect(thirdElement.exists()).toBe(true);

  const linkText = thirdElement.text();
  expect(linkText).toBe(title);
}

describe('KCard', () => {
  it('renders passed header level', () => {
    const wrapper = makeWrapper({
      propsData: { headingLevel: 4, title: 'sample title prop', to: { path: '/some-link' } },
    });

    const heading = wrapper.find('h4');
    expect(heading.exists()).toBe(true);
  });

  it('renders the correct accessibility structure when title passed via slot', () => {
    const wrapper = makeWrapper({
      propsData: { to: { path: '/some-link' }, headingLevel: 4 },
      slots: {
        title: 'Test Title',
      },
    });
    checkExpectedCardMarkup({ wrapper, headingLevel: 4, title: 'Test Title' });
  });

  it('renders the correct accessibility structure when title passed via prop', () => {
    const wrapper = makeWrapper({
      propsData: { to: { path: '/some-link' }, headingLevel: 4, title: 'Test Title' },
    });
    checkExpectedCardMarkup({ wrapper, headingLevel: 4, title: 'Test Title' });
  });

  it('should not navigate on long click to allow for text selection', async () => {
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
    it('renders slotted content with aboveTitle slot', () => {
      const wrapper = makeWrapper({
        propsData: { to: { path: '/some-link' }, title: 'sample title ' },
        slots: {
          aboveTitle: 'above title',
        },
      });

      const aboveTitleSlot = wrapper.find('[data-test="aboveTitle"]');
      expect(aboveTitleSlot.exists()).toBe(true);
      expect(aboveTitleSlot.text()).toBe('above title');
    });

    it('renders slotted content with belowTitle slot', () => {
      const wrapper = makeWrapper({
        propsData: { to: { path: '/some-link' }, title: 'sample title ' },
        slots: {
          belowTitle: 'below title',
        },
      });

      const belowTitleSlot = wrapper.find('[data-test="belowTitle"]');
      expect(belowTitleSlot.exists()).toBe(true);
      expect(belowTitleSlot.text()).toBe('below title');
    });

    it('renders slotted content with footer slot', () => {
      const wrapper = makeWrapper({
        propsData: { to: { path: '/some-link' }, title: 'sample title ' },
        slots: {
          footer: 'footer slot content goes here',
        },
      });

      const footerSlot = wrapper.find('[data-test="footer"]');
      expect(footerSlot.exists()).toBe(true);
      expect(footerSlot.text()).toBe('footer slot content goes here');
    });
  });
});
