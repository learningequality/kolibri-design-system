import { shallowMount } from '@vue/test-utils';
import KImg from '../';

import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

function makeWrapper(opts) {
  return shallowMount(KImg, opts);
}

describe('KImg', () => {
  it(`renders without any errors when a valid 'src' and 'altText' are provided`, () => {
    const error = jest.fn();
    const wrapper = makeWrapper({
      propsData: { src: '/le-logo.svg', altText: 'LE logo' },
      listeners: { error },
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
      listeners: { error },
    });
    expect(error).toHaveBeenCalled();
    expect(error.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(error.mock.calls[0][0].message).toBe(
      'Missing required prop - provide altText or indicate isDecorative',
    );
  });

  describe(`when no 'altText' is provided and it is a decorative image`, () => {
    it(`does not throw an error`, () => {
      const error = jest.fn();
      makeWrapper({
        propsData: { src: '/le-logo.svg', altText: undefined, isDecorative: true },
        listeners: { error },
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
      listeners: { error },
    });
    expect(error).toHaveBeenCalled();
    expect(error.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(error.mock.calls[0][0].message).toBe('Invalid aspect ratio provided: 16/9');
  });

  it(`doesn't throw an error when 'aspectRatio' has a valid format`, () => {
    const error = jest.fn();
    makeWrapper({
      propsData: { src: '/le-logo.svg', altText: 'LE logo', aspectRatio: '16:9' },
      listeners: { error },
    });
    expect(error).not.toHaveBeenCalled();
  });

  it(`emits an 'error' event when there is an error in loading the image`, async () => {
    const error = jest.fn();
    const wrapper = makeWrapper({
      propsData: { src: '/le-logo.svg', altText: 'LE logo' },
      listeners: { error },
    });

    // Manually trigger the onError method to simulate the image load failure
    const e = new Event('error');
    wrapper.vm.onError(e);

    expect(error).toHaveBeenCalled();
    expect(error.mock.calls[0][0]).toBeInstanceOf(Event);
    expect(error.mock.calls[0][0]).toEqual(e);
  });
});

describe.visual('KImg', () => {
  const snapshotOptions = { widths: [400], minHeight: 512 };
  const snapshotOptionsTwo = { widths: [400], minHeight: 400 };

  it('Render KImg with img', async () => {
    await renderComponentForVisualTest('KImg', {
      src: 'https://waltermagazine.com/wp-content/uploads/2023/07/nature_Rubythroatedhummingbird_MikeDunn.jpg',
      altText: 'A hummingbird',
    });
    await takeSnapshot('KImg - with - Img', snapshotOptions);
  });

  it('Render KImg with borderRadius', async () => {
    await renderComponentForVisualTest('KImg', {
      src: 'https://waltermagazine.com/wp-content/uploads/2023/07/nature_Rubythroatedhummingbird_MikeDunn.jpg',
      altText: 'A hummingbird',
      borderRadius: '8px',
    });
    await takeSnapshot('KImg - with - borderRadius', snapshotOptions);
  });

  // scaleType contain
  it('Render KImg with scaleType contain', async () => {
    await renderComponentForVisualTest(
      'KImg',
      {
        src: 'https://waltermagazine.com/wp-content/uploads/2023/07/nature_Rubythroatedhummingbird_MikeDunn.jpg',
        altText: 'A hummingbird',
        scaleType: 'contain',
      },
      {},
      { height: '200px', width: '100%', maxWidth: '500px' },
    );
    await takeSnapshot('KImg - scaleType - contain', snapshotOptions);
  });
  // scaleType fitXY
  it('Render KImg with scaleType fitXY', async () => {
    await renderComponentForVisualTest(
      'KImg',
      {
        src: 'https://waltermagazine.com/wp-content/uploads/2023/07/nature_Rubythroatedhummingbird_MikeDunn.jpg',
        altText: 'A hummingbird',
        backgroundColor: '#6060a3',
        aspectRatio: '16:9',
        scaleType: 'fitXY',
      },
      {},
      { height: '200px', width: '100%', maxWidth: '500px' },
    );
    await takeSnapshot('KImg - scaleType - fitXY', snapshotOptionsTwo);
  });

  it('Render KImg with backgroundColor 6060a3', async () => {
    await renderComponentForVisualTest('KImg', {
      src: 'https://waltermagazine.com/wp-content/uploads/2023/07/nature_Rubythroatedhummingbird_MikeDunn.jpg',
      altText: 'A hummingbird',
      backgroundColor: '#6060a3',
      aspectRatio: '3:2',
    });
    await takeSnapshot('KImg - backgroundColor - 6060a3', snapshotOptionsTwo);
  });

  it('Render KImg with slot placeholder', async () => {
    await renderComponentForVisualTest(
      'KImg',
      {
        src: '/test-img.jpg',
        backgroundColor: '#818271',
        aspectRatio: '3:2',
      },
      {
        placeholder: {
          element: 'div',
          innerHTML: 'placeholder',
        },
      },
    );
    await takeSnapshot('KImg - slot - placeholder', snapshotOptionsTwo);
  });

  it('Render KImg with slot topLeft', async () => {
    await renderComponentForVisualTest(
      'KImg',
      {
        src: 'https://waltermagazine.com/wp-content/uploads/2023/07/nature_Rubythroatedhummingbird_MikeDunn.jpg',
        altText: 'A hummingbird',
        backgroundColor: '#818271',
        aspectRatio: '3:2',
      },
      {
        topLeft: {
          element: 'span',
          innerHTML: 'Top left',
        },
      },
    );
    await takeSnapshot('KImg - slot - topLeft', snapshotOptionsTwo);
  });

  it('Render KImg with slot topRight', async () => {
    await renderComponentForVisualTest(
      'KImg',
      {
        src: 'https://waltermagazine.com/wp-content/uploads/2023/07/nature_Rubythroatedhummingbird_MikeDunn.jpg',
        altText: 'A hummingbird',
        backgroundColor: '#818271',
        aspectRatio: '3:2',
      },
      {
        topRight: {
          element: 'span',
          innerHTML: 'Top Right',
        },
      },
    );
    await takeSnapshot('KImg - slot - topRight', snapshotOptionsTwo);
  });

  it('Render KImg with slot bottomLeft', async () => {
    await renderComponentForVisualTest(
      'KImg',
      {
        src: 'https://waltermagazine.com/wp-content/uploads/2023/07/nature_Rubythroatedhummingbird_MikeDunn.jpg',
        altText: 'A hummingbird',
        backgroundColor: '#818271',
        aspectRatio: '3:2',
      },
      {
        bottomLeft: {
          element: 'span',
          innerHTML: 'Bottom left',
        },
      },
    );
    await takeSnapshot('KImg - slot - bottomLeft', snapshotOptionsTwo);
  });

  it('Render KImg with slot bottomRight', async () => {
    await renderComponentForVisualTest(
      'KImg',
      {
        src: 'https://waltermagazine.com/wp-content/uploads/2023/07/nature_Rubythroatedhummingbird_MikeDunn.jpg',
        altText: 'A hummingbird',
        backgroundColor: '#818271',
        aspectRatio: '3:2',
      },
      {
        bottomRight: {
          element: 'span',
          innerHTML: 'bottom right',
        },
      },
    );
    await takeSnapshot('KImg - slot - bottomRight', snapshotOptionsTwo);
  });

  it('Render KImg with alt-text', async () => {
    await renderComponentForVisualTest('KImg', {
      src: '/test-img.jpg',
      altText: 'check image alt-text',
    });
    await takeSnapshot('KImg - alt - text', snapshotOptions);
  });

  it('Render KImg with aspectRatio', async () => {
    await renderComponentForVisualTest('KImg', {
      src: 'https://waltermagazine.com/wp-content/uploads/2023/07/nature_Rubythroatedhummingbird_MikeDunn.jpg',
      altText: 'A hummingbird',
      backgroundColor: '#6060a3',
      aspectRatio: '5:3',
    });
    await takeSnapshot('KImg - aspectRatio - 5:3', snapshotOptions);
  });

  it('Render KImg with appearanceOverrides', async () => {
    await renderComponentForVisualTest('KImg', {
      src: 'https://waltermagazine.com/wp-content/uploads/2023/07/nature_Rubythroatedhummingbird_MikeDunn.jpg',
      altText: 'A hummingbird',
      backgroundColor: '#6060a3',
      appearanceOverrides: {
        width: '100%',
        height: '100%',
        backgroundColor: '#6060a3',
      },
    });
    await takeSnapshot('KImg - appearanceOverrides', snapshotOptions);
  });
});
