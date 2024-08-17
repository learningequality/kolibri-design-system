import useKLiveRegion from '../index.js';

const { sendPoliteMessage, sendAssertiveMessage } = useKLiveRegion();

describe('useKLiveRegion', () => {
  // this is take care of by KThemePlugin.js that is already registered
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
});
