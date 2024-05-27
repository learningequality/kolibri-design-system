import { createLocalVue, mount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import KCard from './../index.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('index.vue', () => {
  const cardFocusMock = jest.fn();

  // beforeEach(() => {
  const wrapper = mount(KCard, {
    localVue,
    router,
    propsData: {
      title: 'Sample Title',
      headingLevel: 4,
      to: { path: '/some-link' },
      layout: 'horizontal',
      thumbnailDisplay: 'small',
      thumbnailSrc: 'https://example.com/image.jpg',
    },
    slots: {
      aboveTitle: 'This is the default content',
      title: 'This is the default title',
      belowTitle: 'This is the default description',
      footer: 'This is the default footer',
    },
    mocks: {
      cardFocus: cardFocusMock,
    },
  });
  // });

  it('renders passed header level', () => {
    expect(wrapper.find('h4').exists()).toBe(true);
  });


  //testing slots
  it('renders slotted content', () => {
    expect(wrapper.text()).toContain('Sample Title')
    expect(wrapper.text()).toContain('This is the default description')
    expect(wrapper.text()).toContain('his is the default footer')

  });

  //testing image prop
  it('renders image', () => {
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/image.jpg');
  });
});
