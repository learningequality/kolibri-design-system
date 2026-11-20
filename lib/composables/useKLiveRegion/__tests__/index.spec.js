import useKLiveRegion from '../index.js';

const { sendPoliteMessage, sendAssertiveMessage } = useKLiveRegion();

describe('useKLiveRegion', () => {
  // this is taken care of by KThemePlugin.js that is already registered
  // in the global jest setup
  it(`document body contains live regions upon the KDS plugin initialization`, () => {
    expect(`
      <div id="k-live-region" class="visuallyhidden">
        <div aria-live="polite">
        </div>
        <div aria-live="assertive">
        </div>
      </div>
    `).toBeInDom();
  });

  it(`'sendPoliteMessage' updates the live region with the message`, async () => {
    expect(`
      <div id="k-live-region" class="visuallyhidden">
        <div aria-live="polite">
        </div>
        <div aria-live="assertive">
        </div>
      </div>
    `).toBeInDom();

    sendPoliteMessage('Polite message');
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(`
      <div id="k-live-region" class="visuallyhidden">
        <div aria-live="polite">
          Polite message
        </div>
        <div aria-live="assertive">
        </div>
      </div>
    `).toBeInDom();

    // cleanup
    sendPoliteMessage('');
  });

  it(`'sendAssertiveMessage' updates the live region with the message`, async () => {
    expect(`
      <div id="k-live-region" class="visuallyhidden">
        <div aria-live="polite">
        </div>
        <div aria-live="assertive">
        </div>
      </div>
    `).toBeInDom();

    sendAssertiveMessage('Assertive message');
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(`
      <div id="k-live-region" class="visuallyhidden">
        <div aria-live="polite">
        </div>
        <div aria-live="assertive">
          Assertive message
        </div>
      </div>
    `).toBeInDom();

    // cleanup
    sendAssertiveMessage('');
  });

  it.each([
    ['sendPoliteMessage', 'politeRegionEl', sendPoliteMessage],
    ['sendAssertiveMessage', 'assertiveRegionEl', sendAssertiveMessage],
  ])(`'%s' does not throw without a live region`, (name, regionKey, send) => {
    const regionEl = window[regionKey];
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    window[regionKey] = undefined;
    jest.useFakeTimers();
    try {
      expect(() => send('Message')).not.toThrow();
      expect(() => jest.advanceTimersByTime(350)).not.toThrow();
      expect(consoleError).toHaveBeenCalled();
    } finally {
      jest.useRealTimers();
      window[regionKey] = regionEl;
      consoleError.mockRestore();
    }
  });
});
