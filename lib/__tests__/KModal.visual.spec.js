import { renderComponentForVisualTest } from '../../jest.conf/visual.testUtils';

describe.visual('KModal', () => {
  const CANCEL = 'Cancel';
  const SUBMIT = 'Submit';

  function readFocus() {
    return page.evaluate(() => ({
      focused: document.activeElement.textContent.trim(),
      modality: document.body.getAttribute('modality'),
    }));
  }

  async function pressTab(shift) {
    if (shift) {
      await page.keyboard.down('Shift');
    }
    await page.keyboard.press('Tab');
    if (shift) {
      await page.keyboard.up('Shift');
    }
  }

  beforeEach(async () => {
    await renderComponentForVisualTest('KModal', {
      title: 'Modal',
      cancelText: CANCEL,
      submitText: SUBMIT,
    });
    await page.waitForFunction(() => document.activeElement.getAttribute('role') === 'dialog');
    await pressTab();
  });

  it('keeps keyboard modality when Tab wraps to the first control', async () => {
    await pressTab();
    await pressTab();
    expect(await readFocus()).toEqual({ focused: CANCEL, modality: 'keyboard' });
  });

  it('keeps keyboard modality when Shift+Tab wraps to the last control', async () => {
    await pressTab(true);
    expect(await readFocus()).toEqual({ focused: SUBMIT, modality: 'keyboard' });
  });
});
