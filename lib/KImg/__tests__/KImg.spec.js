import { shallowMount } from '@vue/test-utils';
import KImg from '../';

function makeWrapper(opts) {
  return shallowMount(KImg, opts);
}

describe('KImg', () => {
  it(`renders without any errors when a valid 'src' and 'altText' are provided`, () => {
    const error = jest.fn();
    const wrapper = makeWrapper({
      propsData: { src: '/le-logo.svg', altText: 'LE logo' },
      listeners: { error }
    });

    expect(wrapper.exists()).toBe(true);
    expect(error).not.toHaveBeenCalled();

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('/le-logo.svg');
    expect(img.attributes('alt')).toBe('LE logo');
  });

  it(`throws an error when no 'altText' is provided`, () => {
    const error = jest.fn();
    makeWrapper({
      propsData: { src: '/le-logo.svg', altText: undefined },
      listeners: { error }
    });
    expect(error).toHaveBeenCalled();
    expect(error.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(error.mock.calls[0][0].message).toBe("Missing required prop - provide altText or indicate isDecorative");
  });

  describe(`when no 'altText' is provided and it is a decorative image`, () => {
    it(`does not throw an error`, () => {
      const error = jest.fn();
      makeWrapper({
        propsData: { src: '/le-logo.svg', altText: undefined, isDecorative: true },
        listeners: { error }
      });
      expect(error).not.toHaveBeenCalled();
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
    const error = jest.fn();
    makeWrapper({
      propsData: { src: '/le-logo.svg', altText: 'LE logo', aspectRatio: '16/9' },
      listeners: { error }
    });
    expect(error).toHaveBeenCalled();
    expect(error.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(error.mock.calls[0][0].message).toBe("Invalid aspect ratio provided: 16/9");
  });

  it(`doesn't throw an error when 'aspectRatio' has a valid format`, () => {
    const error = jest.fn();
    makeWrapper({
      propsData: { src: '/le-logo.svg', altText: 'LE logo', aspectRatio: '16:9' },
      listeners: { error }
    });
    expect(error).not.toHaveBeenCalled();
  });

  it(`emits an 'error' event when there is an error in loading the image`, async () => {
    const error = jest.fn();
    const wrapper = makeWrapper({
      propsData: { src: '/le-logo.svg', altText: 'LE logo' },
      listeners: { error }
    });

    // Manually trigger the onError method to simulate the image load failure
    const e = new Event('error');
    wrapper.vm.onError(e);

    expect(error).toHaveBeenCalled();
    expect(error.mock.calls[0][0]).toBeInstanceOf(Event)
    expect(error.mock.calls[0][0]).toEqual(e);
  });
});
