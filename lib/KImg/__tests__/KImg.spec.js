import { mount } from '@vue/test-utils';
import KImg from '../';

describe('KImg component', () => {
  let wrapper;
  let img;

  const DEFAULT_PROPS = {
    src: 'https://learningequality.org/static/img/le-logo.svg',
    altText: "Learning Equality's logo",
  };

  function makeWrapper(newProps = {}) {
    wrapper = mount(KImg, {
      propsData: { ...DEFAULT_PROPS, ...newProps },
    });
    img = wrapper.find('img');
  }

  it('Renders without any errors when a valid src and altText are provided', () => {
    makeWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(img.exists()).toBe(true);

    expect(img.attributes('src')).toBe(DEFAULT_PROPS.src);
    expect(img.attributes('alt')).toBe(DEFAULT_PROPS.altText);
  });

  it('Throws an error when no altText is provided', () => {
    expect(() => makeWrapper({ altText: undefined })).toThrow();
  });

  it('Does not throw an error when no altText is provided and it is a decorative image', () => {
    expect(() => makeWrapper({ altText: undefined, isDecorative: true })).not.toThrow();

    expect(wrapper.exists()).toBe(true);
    expect(img.attributes('alt')).toBe('');
  });

  it('Emits an `error` event when there is an error in loading the image', () => {
    makeWrapper({
      src: 'invalid-src.jpg',
    });

    // Manually trigger the onError method to simulate the image load failure
    wrapper.vm.onError(new Event('error'));

    // Check if the "error" event has been emitted with the DOM event payload
    const emittedEvent = wrapper.emitted().error;
    expect(emittedEvent).toBeTruthy();
    expect(emittedEvent[0][0]).toBeInstanceOf(Event);
  });
});
