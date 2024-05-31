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
      propsData: { headingLevel: 4, to: { path: '/some-link' } },
    });

    const heading = wrapper.find('h4');
    expect(heading.exists()).toBe(true);
  });

  it('t', () => {
    const wrapper = makeWrapper({
      propsData: { to: { path: '/some-link' } },
    });

    const toProp = wrapper.props().to;
    expect(toProp).toEqual({ path: '/some-link' });
  });

  // it('sets number of lines a title text is truncated to', () => {
  //   const wrapper = makeWrapper({
  //     propsData: { titleLines: 2, to: { path: '/some-link' }, title: 'Sample Title' },
  //   });
  //   console.log(wrapper.html());
  // const titleLinesProp = wrapper.props().titleLines;
  // expect(titleLinesProp).toBe(2);
  // });

  // it('Specifies how an image should be scaled within the thumbnail area', () => {
  //   const wrapper = makeWrapper({
  //     propsData: { thumbnailScaleType: 'cover' },
  //   });

  //   const thumbnailScaleTypeProp = wrapper.props().thumbnailScaleType;
  //   expect(thumbnailScaleTypeProp).toBe('cover');
  //   expect(['centerInside', 'cover', 'contain', 'fitXY']).toContain(thumbnailScaleTypeProp);
  // });

  // it('renders passed layout', () => {
  //   const wrapper = makeWrapper({
  //     propsData: { layout: 'horizontal' },
  //   });
  //   const layoutProp = wrapper.find('layout');
  //   expect(layoutProp).toBe('horizontal');
  //   expect(['horizontal', 'vertical']).toContain(layoutProp);
  // });

  //   it('renders thumbnailDisplay prop', () => {
  //     const wrapper = makeWrapper({
  //       propsData: { thumbnailDisplay: 'small' },
  //     });
  //     const thumbnailDisplayProp = wrapper.props().thumbnailDisplay;
  //     expect(thumbnailDisplayProp).toBe('small');
  //     expect(['small', 'medium', 'large']).toContain(thumbnailDisplayProp);
  //   });

  //   it('it renders thumbnailSrc prop', () => {
  //     const wrapper = makeWrapper({
  //       propsData: { thumbnailSrc: 'https://example.com/image.jpg' },
  //     });
  //     const thumbnailSrcProp = wrapper.props().thumbnailSrc;
  //     expect(thumbnailSrcProp).toBe('https://example.com/image.jpg');
  //   });

  //   // it('throws an error if neither title prop nor title slot is provided', () => {
  //   //   // Expect makeWrapper to throw an error when no title prop or slot is provided
  //   //   expect(() => makeWrapper()).toThrow('provide a title slots or prop for the  card');
  //   // });
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
  
});
