import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import KCard from '../KCard';

const localVue = createLocalVue();
localVue.use(VueRouter);

const router = new VueRouter({
  routes: [{ path: '/some-link' }],
});

function makeWrapper({ propsData = {}, slots = {} } = {}) {
  return mount(KCard, { router, propsData, slots, localVue });
}

/*
  Checks the expected card markup:

  <li>
    <div>
      <h[2-6]>
        <a href="/some-link">Test Title</a>
      </h[2-6]>
    </div>

    all other content
  </li>
  
  "li > h[2-6] > a > title text" structure that comes before
  all other content is crucial to ensure accessibility.
*/
function checkExpectedCardMarkup({ wrapper, headingLevel, title }) {
  const firstElement = wrapper.find(':first-child');
  expect(firstElement.exists()).toBe(true);
  expect(firstElement.element.tagName.toLowerCase()).toBe('li');

  const secondElement = wrapper.find('li > :first-child');
  expect(secondElement.exists()).toBe(true);
  expect(secondElement.element.tagName.toLowerCase()).toBe('div');

  const thirdElement = wrapper.find('li > div > :first-child');
  expect(thirdElement.exists()).toBe(true);
  expect(thirdElement.element.tagName.toLowerCase()).toBe(`h${headingLevel}`);

  const fourthElement = wrapper.find(`li > div > h${headingLevel} > :first-child`);
  expect(fourthElement.element.tagName.toLowerCase()).toBe('a');
  expect(fourthElement.exists()).toBe(true);

  const linkText = fourthElement.text();
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
    await wrapper.find('li').trigger('click');
    expect(wrapper.vm.$router.currentRoute.path).not.toBe('/some-link');
  });

  it('should navigate on quick click', async () => {
    const wrapper = makeWrapper({
      propsData: { to: { path: '/some-link' }, title: 'sample title ' },
    });

    await wrapper.find('li').trigger('mousedown');
    await new Promise(resolve => setTimeout(resolve, 100));
    await wrapper.find('li').trigger('click');

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
  describe('it renders slot behaviors', () => {
    it('preserves space when preserve prop is true and slot is not empty', () => {
      const wrapper = makeWrapper({
        propsData: {
          to: { path: '/some-link' },
          title: 'sample title ',
          headingLevel: 4,
          preserveAboveTitle: true,
          preserveBelowTitle: true,
          preserveFooter: true,
        },
        slots: {
          aboveTitle: 'above title',
          belowTitle: 'below title',
          footer: 'footer slot content goes here',
        },
      });
      const aboveTitleSlot = wrapper.find('[data-test="aboveTitle"]');
      const belowTitleSlot = wrapper.find('[data-test="belowTitle"]');
      const footerSlot = wrapper.find('[data-test="footer"]');
      expect(aboveTitleSlot.exists()).toBe(true);
      expect(belowTitleSlot.exists()).toBe(true);
      expect(footerSlot.exists()).toBe(true);
    });

    it('preserves space when preserve prop is true and slot is empty', () => {
      const wrapper = makeWrapper({
        propsData: {
          to: { path: '/some-link' },
          title: 'sample title ',
          headingLevel: 4,
          preserveAboveTitle: true,
          preserveBelowTitle: true,
          preserveFooter: true,
        },
        slots: {},
      });
      const aboveTitleSlot = wrapper.find('[data-test="aboveTitle"]');
      const belowTitleSlot = wrapper.find('[data-test="belowTitle"]');
      const footerSlot = wrapper.find('[data-test="footer"]');
      expect(aboveTitleSlot.exists()).toBe(true);
      expect(belowTitleSlot.exists()).toBe(true);
      expect(footerSlot.exists()).toBe(true);
    });

    it('removes space when preserve prop is false and slot is empty', () => {
      const wrapper = makeWrapper({
        propsData: {
          to: { path: '/some-link' },
          title: 'sample title ',
          headingLevel: 4,
          preserveAboveTitle: false,
          preserveBelowTitle: false,
          preserveFooter: false,
        },
        slots: {},
      });
      const aboveTitleSlot = wrapper.find('[data-test="aboveTitle"]');
      const belowTitleSlot = wrapper.find('[data-test="belowTitle"]');
      const footerSlot = wrapper.find('[data-test="footer"]');
      expect(aboveTitleSlot.exists()).toBe(false);
      expect(belowTitleSlot.exists()).toBe(false);
      expect(footerSlot.exists()).toBe(false);
    });

    it('show slots content regardless of whether the preserve prop is true', () => {
      const wrapper = makeWrapper({
        propsData: {
          to: { path: '/some-link' },
          title: 'sample title ',
          headingLevel: 4,
          preserveAboveTitle: true,
          preserveBelowTitle: true,
          preserveFooter: true,
        },
        slots: {
          aboveTitle: 'above title',
          belowTitle: 'below title',
          footer: 'footer slot content goes here',
        },
      });
      const aboveTitleSlot = wrapper.find('[data-test="aboveTitle"]');
      const belowTitleSlot = wrapper.find('[data-test="belowTitle"]');
      const footerSlot = wrapper.find('[data-test="footer"]');
      expect(aboveTitleSlot.text()).toBe('above title');
      expect(belowTitleSlot.text()).toBe('below title');
      expect(footerSlot.text()).toBe('footer slot content goes here');
    });
  });

  describe('content of the thumbnail placeholder slot', () => {
    it('is not displayed for thumbnail display none', () => {
      const wrapper = makeWrapper({
        propsData: {
          to: { path: '/some-link' },
          title: 'sample title ',
          headingLevel: 4,
          thumbnailDisplay: 'none',
        },
        slots: {
          thumbnailPlaceholder: '<KIcon data-test="placeholderIcon" icon="readSolid" />',
        },
      });
      expect(wrapper.find('[data-test="placeholderIcon"]').exists()).toBe(false);
    });

    it('is displayed when a thumbnail image source is not provided', () => {
      const wrapper = makeWrapper({
        propsData: {
          to: { path: '/some-link' },
          title: 'sample title ',
          headingLevel: 4,
          thumbnailSrc: null,
          thumbnailDisplay: 'large',
        },
        slots: {
          thumbnailPlaceholder: '<KIcon data-test="placeholderIcon" icon="readSolid" />',
        },
      });

      expect(wrapper.find('[data-test="placeholderIcon"]').exists()).toBe(true);
    });

    it('is displayed when a thumbnail image could not be loaded', async () => {
      const wrapper = makeWrapper({
        propsData: {
          to: { path: '/some-link' },
          title: 'sample title ',
          headingLevel: 4,
          thumbnailSrc: '/thumbnail-img.jpg',
          thumbnailDisplay: 'large',
        },
        slots: {
          thumbnailPlaceholder: '<KIcon data-test="placeholderIcon" icon="readSolid" />',
        },
      });
      wrapper.find('[data-test="thumbnail-img"]').vm.$emit('error');

      // wait for re-render
      await wrapper.vm.$nextTick();

      expect(wrapper.find('[data-test="placeholderIcon"]').exists()).toBe(true);
    });

    it('is not displayed when a thumbnail image is available', () => {
      const wrapper = makeWrapper({
        propsData: {
          to: { path: '/some-link' },
          title: 'sample title ',
          headingLevel: 4,
          thumbnailSrc: '/thumbnail-img.jpg',
          thumbnailDisplay: 'large',
        },
        slots: {
          thumbnailPlaceholder: '<KIcon data-test="placeholderIcon" icon="readSolid" />',
        },
      });

      expect(wrapper.find('[data-test="placeholderIcon"]').exists()).toBe(false);
    });
  });
});
