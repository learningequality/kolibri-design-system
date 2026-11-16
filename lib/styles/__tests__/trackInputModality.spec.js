import trackInputModality from '../trackInputModality';
import globalThemeState from '../globalThemeState';

function appendOptInElement() {
  const el = document.createElement('div');
  el.setAttribute('supports-modality', 'keyboard');
  el.tabIndex = 0;
  document.body.appendChild(el);
  return el;
}

function appendButton() {
  const button = document.createElement('button');
  document.body.appendChild(button);
  return button;
}

function mousedown(el) {
  el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
}

function keydown(el, key) {
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
}

describe('trackInputModality', () => {
  // once for the whole suite: the `DOMContentLoaded` listener cannot be removed again,
  // so a second call would bind a second copy of every handler to the same body
  beforeAll(() => {
    trackInputModality();
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.removeAttribute('modality');
    globalThemeState.inputModality = null;
    // the handlers keep private `hadKeyboardEvent` and `hadClickEvent` flags that outlive a
    // test, and a mousedown pins both, so no test inherits the state of the one before it
    mousedown(document.body);
  });

  describe('an element that opts in with `supports-modality="keyboard"`', () => {
    it('is not in keyboard modality when it is focused by mouse', () => {
      const el = appendOptInElement();

      mousedown(el);
      el.focus();

      expect(document.body).not.toHaveAttribute('modality', 'keyboard');
    });

    it('enters keyboard modality on a key press after a mouse focus', () => {
      const el = appendOptInElement();

      mousedown(el);
      el.focus();
      keydown(el, 'ArrowDown');

      expect(document.body).toHaveAttribute('modality', 'keyboard');
      expect(globalThemeState.inputModality).toEqual('keyboard');
    });
  });

  describe('an element that does not opt in', () => {
    it('enters keyboard modality when a key press moves focus to it', () => {
      const button = appendButton();

      keydown(document.body, 'Tab');
      button.focus();

      expect(document.body).toHaveAttribute('modality', 'keyboard');
    });

    it('is not in keyboard modality when it is focused by mouse', () => {
      const button = appendButton();

      mousedown(button);
      button.focus();

      expect(document.body).not.toHaveAttribute('modality', 'keyboard');
    });

    it('stays out of keyboard modality on a key press after a mouse focus', () => {
      const button = appendButton();

      mousedown(button);
      button.focus();
      keydown(button, 'a');

      expect(document.body).not.toHaveAttribute('modality', 'keyboard');
    });
  });
});
