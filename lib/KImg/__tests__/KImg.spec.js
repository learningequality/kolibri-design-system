import { shallowMount } from '@vue/test-utils';
import KImg from '../';

function makeWrapper({ propsData = {} } = {}) {
  return shallowMount(KImg, { propsData });
}

describe('KImg', () => {
  it(`renders without any errors when a valid 'src' and 'altText' are provided`, () => {
    const wrapper = makeWrapper({
      propsData: { src: '/le-logo.svg', altText: 'LE logo' },
    });

    expect(wrapper.exists()).toBe(true);

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('/le-logo.svg');
    expect(img.attributes('alt')).toBe('LE logo');
  });

  it(`throws an error when no 'altText' is provided`, () => {
    expect(() =>
      makeWrapper({
        propsData: { src: '/le-logo.svg', altText: undefined },
      })
    ).toThrow();
  });

  describe(`when no 'altText' is provided and it is a decorative image`, () => {
    it(`does not throw an error`, () => {
      expect(() =>
        makeWrapper({
          propsData: { src: '/le-logo.svg', altText: undefined, isDecorative: true },
        })
      ).not.toThrow();
    });

    it(`sets 'alt' attribute to an empty string`, () => {
      const wrapper = makeWrapper({
        propsData: { src: '/le-logo.svg', altText: undefined, isDecorative: true },
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('img').attributes('alt')).toBe('');
    });
  });

  it(`throws an error when 'aspectRatio' has an invalid format`, () => {
    expect(() =>
      makeWrapper({
        propsData: { src: '/le-logo.svg', altText: 'LE logo', aspectRatio: '16/9' },
      })
    ).toThrow();
  });

  it(`doesn't throw an error when 'aspectRatio' has a valid format`, () => {
    expect(() =>
      makeWrapper({
        propsData: { src: '/le-logo.svg', altText: 'LE logo', aspectRatio: '16:9' },
      })
    ).not.toThrow();
  });

  it(`emits an 'error' event when there is an error in loading the image`, () => {
    const wrapper = makeWrapper({
      propsData: { src: '/le-logo.svg', altText: 'LE logo' },
    });

    // Manually trigger the onError method to simulate the image load failure
    wrapper.vm.onError(new Event('error'));

    // Check if the "error" event has been emitted with the DOM event payload
    const emittedEvent = wrapper.emitted().error;
    expect(emittedEvent).toBeTruthy();
    expect(emittedEvent[0][0]).toBeInstanceOf(Event);
  });
});
