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

describe('KCard', () => {
  it('renders passed header level', () => {
    const wrapper = makeWrapper({
      propsData: { headingLevel: 4, title: 'sample title prop' },
    });

    const heading = wrapper.find('h4');
    expect(heading.exists()).toBe(true);
  });

  it(`renders the correct accessibility structure when card is link`, () => {
    const wrapper = makeWrapper({
      propsData: { to: { path: '/some-link' }, title: 'Test Title', headingLevel: 4 },
    });

    // Check for:
    //
    // <li>
    //  |-- <span> with visually hidden title text
    //  |-- <h[2-6]>
    //        |--<a> with aria-labelledby pointing to the span with the visually hidden title text
    //           |-- <span> with aria-hidden
    //
    const el1 = wrapper.find(':first-child');
    expect(el1.exists()).toBe(true);
    expect(el1.element.tagName.toLowerCase()).toBe('li');

    const el2 = wrapper.find('li .visuallyhidden');
    expect(el2.exists()).toBe(true);
    expect(el2.text()).toBe('Test Title');
    const spanId = el2.attributes('id');

    const el3 = wrapper.find('li h4');
    expect(el3.exists()).toBe(true);

    const el4 = wrapper.find(`li h4 [aria-labelledby="${spanId}"]`);
    expect(el4.exists()).toBe(true);
    expect(el4.element.tagName.toLowerCase()).toBe('a');

    const el5 = wrapper.find(`li h4 [aria-labelledby="${spanId}"] > :first-child`);
    expect(el5.exists()).toBe(true);
    expect(el5.attributes('aria-hidden')).toBe('true');
  });

  it(`renders the correct accessibility structure when card is not link`, () => {
    const wrapper = makeWrapper({
      propsData: { title: 'Test Title', headingLevel: 4 },
    });

    // Check for:
    //
    // <li>
    //  |-- <span> with visually hidden title text
    //  |-- <h[2-6]>
    //        |--<span> with aria-labelledby pointing to the previous span
    //           |-- <span> with aria-hidden
    //
    const el1 = wrapper.find(':first-child');
    expect(el1.exists()).toBe(true);
    expect(el1.element.tagName.toLowerCase()).toBe('li');

    const el2 = wrapper.find('li .visuallyhidden');
    expect(el2.exists()).toBe(true);
    expect(el2.text()).toBe('Test Title');
    const spanId = el2.attributes('id');

    const el3 = wrapper.find('li h4');
    expect(el3.exists()).toBe(true);

    const el4 = wrapper.find(`li h4 [aria-labelledby="${spanId}"]`);
    expect(el4.exists()).toBe(true);
    expect(el4.element.tagName.toLowerCase()).toBe('span');

    const el5 = wrapper.find(`li h4 [aria-labelledby="${spanId}"] > :first-child`);
    expect(el5.exists()).toBe(true);
    expect(el5.attributes('aria-hidden')).toBe('true');
  });

  describe('on long click', () => {
    it('should not emit a click event or navigate to allow for text selection', async () => {
      const wrapper = makeWrapper({
        propsData: { to: { path: '/some-link' }, title: 'sample title ' },
      });

      await wrapper.find('li').trigger('mousedown');
      await new Promise(resolve => setTimeout(resolve, 500));
      await wrapper.find('li').trigger('click');

      expect(wrapper.emitted().click).toBeFalsy();
      expect(wrapper.vm.$router.currentRoute.path).not.toBe('/some-link');
    });
  });

  describe('on short click', () => {
    it('should emit a click event', async () => {
      const wrapper = makeWrapper({
        propsData: { title: 'sample title ' },
      });

      await wrapper.find('li').trigger('mousedown');
      await new Promise(resolve => setTimeout(resolve, 100));
      await wrapper.find('li').trigger('click');

      expect(wrapper.emitted().click).toBeTruthy();
    });

    it(`when 'to' provided, should both navigate and emit a click event`, async () => {
      const wrapper = makeWrapper({
        propsData: { to: { path: '/some-link' }, title: 'sample title ' },
      });

      await wrapper.find('li').trigger('mousedown');
      await new Promise(resolve => setTimeout(resolve, 100));
      await wrapper.find('li').trigger('click');

      expect(wrapper.emitted().click).toBeTruthy();
      expect(wrapper.vm.$router.currentRoute.path).toBe('/some-link');
    });
  });

  describe('it renders slotted content', () => {
    it('renders slotted content with aboveTitle slot', () => {
      const wrapper = makeWrapper({
        propsData: { title: 'sample title ' },
        slots: {
          aboveTitle: 'above title',
        },
      });

      const aboveTitleSlot = wrapper.find('[data-testid="aboveTitle"]');
      expect(aboveTitleSlot.exists()).toBe(true);
      expect(aboveTitleSlot.text()).toBe('above title');
    });

    it('renders slotted content with belowTitle slot', () => {
      const wrapper = makeWrapper({
        propsData: { title: 'sample title ' },
        slots: {
          belowTitle: 'below title',
        },
      });

      const belowTitleSlot = wrapper.find('[data-testid="belowTitle"]');
      expect(belowTitleSlot.exists()).toBe(true);
      expect(belowTitleSlot.text()).toBe('below title');
    });

    it('renders slotted content with footer slot', () => {
      const wrapper = makeWrapper({
        propsData: { title: 'sample title ' },
        slots: {
          footer: 'footer slot content goes here',
        },
      });

      const footerSlot = wrapper.find('[data-testid="footer"]');
      expect(footerSlot.exists()).toBe(true);
      expect(footerSlot.text()).toBe('footer slot content goes here');
    });
  });
  describe('it renders slot behaviors', () => {
    it('preserves space when preserve prop is true and slot is not empty', () => {
      const wrapper = makeWrapper({
        propsData: {
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
      const aboveTitleSlot = wrapper.find('[data-testid="aboveTitle"]');
      const belowTitleSlot = wrapper.find('[data-testid="belowTitle"]');
      const footerSlot = wrapper.find('[data-testid="footer"]');
      expect(aboveTitleSlot.exists()).toBe(true);
      expect(belowTitleSlot.exists()).toBe(true);
      expect(footerSlot.exists()).toBe(true);
    });

    it('preserves space when preserve prop is true and slot is empty', () => {
      const wrapper = makeWrapper({
        propsData: {
          title: 'sample title ',
          headingLevel: 4,
          preserveAboveTitle: true,
          preserveBelowTitle: true,
          preserveFooter: true,
        },
        slots: {},
      });
      const aboveTitleSlot = wrapper.find('[data-testid="aboveTitle"]');
      const belowTitleSlot = wrapper.find('[data-testid="belowTitle"]');
      const footerSlot = wrapper.find('[data-testid="footer"]');
      expect(aboveTitleSlot.exists()).toBe(true);
      expect(belowTitleSlot.exists()).toBe(true);
      expect(footerSlot.exists()).toBe(true);
    });

    it('removes space when preserve prop is false and slot is empty', () => {
      const wrapper = makeWrapper({
        propsData: {
          title: 'sample title ',
          headingLevel: 4,
          preserveAboveTitle: false,
          preserveBelowTitle: false,
          preserveFooter: false,
        },
        slots: {},
      });
      const aboveTitleSlot = wrapper.find('[data-testid="aboveTitle"]');
      const belowTitleSlot = wrapper.find('[data-testid="belowTitle"]');
      const footerSlot = wrapper.find('[data-testid="footer"]');
      expect(aboveTitleSlot.exists()).toBe(false);
      expect(belowTitleSlot.exists()).toBe(false);
      expect(footerSlot.exists()).toBe(false);
    });

    it('show slots content regardless of whether the preserve prop is true', () => {
      const wrapper = makeWrapper({
        propsData: {
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
      const aboveTitleSlot = wrapper.find('[data-testid="aboveTitle"]');
      const belowTitleSlot = wrapper.find('[data-testid="belowTitle"]');
      const footerSlot = wrapper.find('[data-testid="footer"]');
      expect(aboveTitleSlot.text()).toBe('above title');
      expect(belowTitleSlot.text()).toBe('below title');
      expect(footerSlot.text()).toBe('footer slot content goes here');
    });
  });

  describe('content of the thumbnail placeholder slot', () => {
    it('is not displayed for thumbnail display none', () => {
      const wrapper = makeWrapper({
        propsData: {
          title: 'sample title ',
          headingLevel: 4,
          thumbnailDisplay: 'none',
        },
        slots: {
          thumbnailPlaceholder: '<KIcon data-testid="placeholderIcon" icon="readSolid" />',
        },
      });
      expect(wrapper.find('[data-testid="placeholderIcon"]').exists()).toBe(false);
    });

    it('is displayed when a thumbnail image source is not provided', () => {
      const wrapper = makeWrapper({
        propsData: {
          title: 'sample title ',
          headingLevel: 4,
          thumbnailSrc: null,
          thumbnailDisplay: 'large',
        },
        slots: {
          thumbnailPlaceholder: '<KIcon data-testid="placeholderIcon" icon="readSolid" />',
        },
      });

      expect(wrapper.find('[data-testid="placeholderIcon"]').exists()).toBe(true);
    });

    it('is displayed when a thumbnail image could not be loaded', async () => {
      const wrapper = makeWrapper({
        propsData: {
          title: 'sample title ',
          headingLevel: 4,
          thumbnailSrc: '/thumbnail-img.jpg',
          thumbnailDisplay: 'large',
        },
        slots: {
          thumbnailPlaceholder: '<KIcon data-testid="placeholderIcon" icon="readSolid" />',
        },
      });
      wrapper.find('[data-testid="thumbnail-img"]').vm.$emit('error');

      // wait for re-render
      await wrapper.vm.$nextTick();

      expect(wrapper.find('[data-testid="placeholderIcon"]').exists()).toBe(true);
    });

    it('is not displayed when a thumbnail image is available', () => {
      const wrapper = makeWrapper({
        propsData: {
          title: 'sample title ',
          headingLevel: 4,
          thumbnailSrc: '/thumbnail-img.jpg',
          thumbnailDisplay: 'large',
        },
        slots: {
          thumbnailPlaceholder: '<KIcon data-testid="placeholderIcon" icon="readSolid" />',
        },
      });

      expect(wrapper.find('[data-testid="placeholderIcon"]').exists()).toBe(false);
    });
  });
});
