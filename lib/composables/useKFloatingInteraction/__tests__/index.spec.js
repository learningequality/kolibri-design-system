import { ref, nextTick } from 'vue';
import { render, screen, cleanup, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import globalThemeState from '../../../styles/globalThemeState';
import useKFloatingInteraction from '../index.js';
import { _registry, _active, _nonDelegated, _delegateUsage } from '../registry.js';
import { NON_DELEGATED_WARN_LIMIT } from '../constants.js';
import { _resetWarnings, normalizeInteractions } from '../validation.js';

/*
  Test DOM:

    <button data-floating-id="popup">Activator</button>
    <span id="popup">
      <span>Popup content</span>
      <span>Activated by: Activator</span>
    </span>
*/

// setup() can't return composable's 'setActive' and 'setEnabled'
// to the test scope, so they are stored here
let controls = {};

const Popup = {
  props: {
    id: { type: String, default: 'floating-1' },
    interactions: { type: [Array, Object], default: undefined },
    delegate: { type: Boolean, default: false },
    deactivateOn: { type: Object, default: undefined },
    enabled: { type: Boolean, default: true },
  },
  setup(props) {
    const elRef = ref(null);
    const { isActive, activatorEl, setActive, setEnabled } = useKFloatingInteraction(
      props.id,
      elRef,
      {
        interactions: props.interactions,
        delegate: props.delegate,
        deactivateOn: props.deactivateOn,
        enabled: props.enabled,
      },
    );
    controls = { setActive, setEnabled };
    return { elRef, isActive, activatorEl };
  },
  template: `
    <span v-if="isActive" :id="id" ref="elRef">
      <span>Popup content</span>
      <span>Activated by: {{ activatorEl && activatorEl.textContent }}</span>
    </span>
  `,
};

function createActivator(activatorLabel = 'Activator 1', floatingId = 'floating-1') {
  const activator = document.createElement('button');
  activator.setAttribute('data-floating-id', floatingId);
  activator.textContent = activatorLabel;
  document.body.appendChild(activator);
  return activator;
}

// Set activation and deactivation delays to 0 for testing purpose
// Otherwise some assertions would be too complex
function withoutDelays(interactions) {
  const { hover, focus, ...rest } = normalizeInteractions(interactions);
  return {
    ...rest,
    ...(hover && { hover: { ...hover, activateDelay: 0, deactivateDelay: 0 } }),
    ...(focus && { focus: { ...focus, activateDelay: 0, deactivateDelay: 0 } }),
  };
}

async function createPopup(props = {}) {
  const interactions = withoutDelays(props.interactions);
  const utils = render(Popup, { props: { ...props, interactions } });
  await nextTick();
  return utils;
}

// Focus waits one frame to find out whether the person is using a keyboard
function nextFrame() {
  return new Promise(resolve => requestAnimationFrame(resolve));
}

// Waits for the MutationObserver callback and Vue re-render
async function flush() {
  await new Promise(resolve => setTimeout(resolve, 0));
  await nextTick();
}

function setKeyboardModality(isKeyboard) {
  globalThemeState.inputModality = isKeyboard ? 'keyboard' : null;
}

function isPopupVisible() {
  return screen.queryByText('Popup content') !== null;
}

function hoverActivator(activatorLabel = 'Activator 1') {
  return userEvent.hover(screen.getByRole('button', { name: activatorLabel }));
}

function unhoverActivator(activatorLabel = 'Activator 1') {
  return userEvent.unhover(screen.getByRole('button', { name: activatorLabel }));
}

function hoverInsidePopup() {
  return userEvent.hover(screen.getByText('Popup content'));
}

function clickActivator(activatorLabel = 'Activator 1') {
  return userEvent.click(screen.getByRole('button', { name: activatorLabel }));
}

function clickInsidePopup() {
  return userEvent.click(screen.getByText('Popup content'));
}

function clickOutside() {
  return userEvent.click(document.body);
}

function tapActivator(activatorLabel = 'Activator 1') {
  return fireEvent.touchStart(screen.getByRole('button', { name: activatorLabel }));
}

function tapInsidePopup() {
  return fireEvent.touchStart(screen.getByText('Popup content'));
}

function tapOutside() {
  return fireEvent.touchStart(document.body);
}

function focusActivator(activatorLabel = 'Activator 1') {
  screen.getByRole('button', { name: activatorLabel }).focus();
  return nextFrame().then(() => nextTick());
}

function blurActivator(activatorLabel = 'Activator 1') {
  screen.getByRole('button', { name: activatorLabel }).blur();
  return nextTick();
}

function pressEscape() {
  return userEvent.keyboard('{Escape}');
}

function scrollInsidePopup() {
  return fireEvent.scroll(screen.getByText('Popup content'));
}

function scrollPage() {
  return fireEvent.scroll(document);
}

function expectActivatedBy(activatorLabel = 'Activator 1') {
  expect(
    screen.getByText(`Activated by: ${activatorLabel}`, { selector: 'span' }),
  ).toBeInTheDocument();
}

describe('useKFloatingInteraction', () => {
  afterEach(async () => {
    jest.restoreAllMocks();
    cleanup();
    await nextTick();

    Object.keys(_registry).forEach(id => delete _registry[id]);
    Object.keys(_delegateUsage).forEach(eventType => delete _delegateUsage[eventType]);
    _active.clear();
    _nonDelegated.clear();
    _resetWarnings();

    controls = {};
    document.body.innerHTML = '';
    globalThemeState.inputModality = null;
  });

  describe('hover', () => {
    it('activates/deactivates when the activator element is hovered/unhovered', async () => {
      createActivator();
      await createPopup({ interactions: ['hover'] });
      expect(isPopupVisible()).toBe(false);

      await hoverActivator();
      expect(isPopupVisible()).toBe(true);

      await unhoverActivator();
      expect(isPopupVisible()).toBe(false);
    });

    it('stays active when hovering the floating element', async () => {
      createActivator();
      await createPopup({ interactions: ['hover'] });

      await hoverActivator();
      await hoverInsidePopup();

      expect(isPopupVisible()).toBe(true);
    });
  });

  describe('click', () => {
    it('activates/deactivates when the activator element is clicked/clicked outside', async () => {
      createActivator();
      await createPopup({ interactions: ['click'] });

      await clickActivator();
      expect(isPopupVisible()).toBe(true);

      await clickOutside();
      expect(isPopupVisible()).toBe(false);
    });

    it('stays active when the floating element clicked', async () => {
      createActivator();
      await createPopup({ interactions: ['click'] });

      await clickActivator();
      expect(isPopupVisible()).toBe(true);

      await clickInsidePopup();
      expect(isPopupVisible()).toBe(true);
    });

    it('with deactivateOnOutside: false, an outside click does not deactivate', async () => {
      createActivator();
      await createPopup({ interactions: { click: { deactivateOnOutside: false } } });

      await clickActivator();
      expect(isPopupVisible()).toBe(true);

      await clickOutside();
      expect(isPopupVisible()).toBe(true);
    });

    it('clicking the activator element a second time deactivates by default', async () => {
      createActivator();
      await createPopup({ interactions: ['click'] });

      await clickActivator();
      expect(isPopupVisible()).toBe(true);

      await clickActivator();
      expect(isPopupVisible()).toBe(false);
    });

    it('with toggle: false, clicking the activator element a second time does not deactivate', async () => {
      createActivator();
      await createPopup({ interactions: { click: { toggle: false } } });

      await clickActivator();
      expect(isPopupVisible()).toBe(true);

      await clickActivator();
      expect(isPopupVisible()).toBe(true);
    });
  });

  describe('touch', () => {
    it('activates/deactivates when the activator element is tapped/tapped outside', async () => {
      createActivator();
      await createPopup({ interactions: ['touch'] });

      await tapActivator();
      expect(isPopupVisible()).toBe(true);

      await tapOutside();
      expect(isPopupVisible()).toBe(false);
    });

    it('stays active when the floating element tapped by default', async () => {
      createActivator();
      await createPopup({ interactions: ['touch'] });

      await tapActivator();
      expect(isPopupVisible()).toBe(true);

      await tapInsidePopup();
      expect(isPopupVisible()).toBe(true);
    });

    it('with deactivateOnOutside: false, an outside tap does not deactivate', async () => {
      createActivator();
      await createPopup({ interactions: { touch: { deactivateOnOutside: false } } });

      await tapActivator();
      expect(isPopupVisible()).toBe(true);

      await tapOutside();
      expect(isPopupVisible()).toBe(true);
    });

    it('tapping the activator element a second time deactivates', async () => {
      createActivator();
      await createPopup({ interactions: ['touch'] });

      await tapActivator();
      expect(isPopupVisible()).toBe(true);

      await tapActivator();
      expect(isPopupVisible()).toBe(false);
    });

    it('with toggle: false, tapping the activator element a second time does not deactivate', async () => {
      createActivator();
      await createPopup({ interactions: { touch: { toggle: false } } });

      await tapActivator();
      expect(isPopupVisible()).toBe(true);

      await tapActivator();
      expect(isPopupVisible()).toBe(true);
    });
  });

  describe('focus', () => {
    it('activates/deactivates when the activator element is focused/blurred', async () => {
      createActivator();
      await createPopup({ interactions: ['focus'] });

      await focusActivator();
      expect(isPopupVisible()).toBe(true);

      await blurActivator();
      expect(isPopupVisible()).toBe(false);
    });

    it(`with 'keyboardOnly', activates only for someone moving around by keyboard`, async () => {
      createActivator();
      await createPopup({ interactions: { focus: { keyboardOnly: true } } });

      // Clicked with a mouse - nothing activates
      setKeyboardModality(false);
      await focusActivator();
      expect(isPopupVisible()).toBe(false);

      await blurActivator();

      // Tabbed to - now it activates
      setKeyboardModality(true);
      await focusActivator();
      expect(isPopupVisible()).toBe(true);
    });
  });

  describe('Escape', () => {
    it('deactivates on Escape by default', async () => {
      createActivator();
      await createPopup({ interactions: ['hover'] });

      await hoverActivator();
      expect(isPopupVisible()).toBe(true);

      await pressEscape();
      expect(isPopupVisible()).toBe(false);
    });

    it('with esc: false, Escape does not deactivate', async () => {
      createActivator();
      await createPopup({ interactions: ['hover'], deactivateOn: { esc: false } });

      await hoverActivator();
      expect(isPopupVisible()).toBe(true);

      await pressEscape();
      expect(isPopupVisible()).toBe(true);
    });

    it('Escape deactivates nested floating element one at a time, innermost first', async () => {
      const NestedPopups = {
        setup() {
          const outerRef = ref(null);
          const innerRef = ref(null);
          const outer = useKFloatingInteraction('floating-1', outerRef, {
            interactions: ['click'],
          });
          const inner = useKFloatingInteraction('floating-2', innerRef, {
            interactions: withoutDelays(['hover']),
          });
          return {
            outerRef,
            innerRef,
            outerIsActive: outer.isActive,
            innerIsActive: inner.isActive,
          };
        },
        template: `
          <div>
            <button data-floating-id="floating-1">Activator 1</button>
            <span v-if="outerIsActive" id="floating-1" ref="outerRef">
              <button data-floating-id="floating-2">Activator 2</button>
              <span v-if="innerIsActive" id="floating-2" ref="innerRef">Inner popup</span>
            </span>
          </div>
        `,
      };
      render(NestedPopups);
      await nextTick();

      await clickActivator('Activator 1');
      await hoverActivator('Activator 2');
      expect(screen.getByRole('button', { name: 'Activator 2' })).toBeInTheDocument();
      expect(screen.getByText('Inner popup')).toBeInTheDocument();

      await pressEscape();
      expect(screen.queryByText('Inner popup')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Activator 2' })).toBeInTheDocument();

      await pressEscape();
      expect(screen.queryByRole('button', { name: 'Activator 2' })).not.toBeInTheDocument();
    });

    it('does not add the shared Escape listener if it is not needed', async () => {
      createActivator();
      await createPopup({ interactions: ['hover'], deactivateOn: { esc: false } });

      jest.spyOn(document, 'addEventListener');
      await hoverActivator();
      expect(isPopupVisible()).toBe(true);
      expect(document.addEventListener).not.toHaveBeenCalledWith(
        'keydown',
        expect.any(Function),
        true,
      );
    });

    it('removes the shared Escape listener once it is not needed', async () => {
      createActivator();
      await createPopup({ interactions: ['hover'] });

      jest.spyOn(document, 'addEventListener');
      await hoverActivator();
      expect(isPopupVisible()).toBe(true);
      expect(document.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function), true);

      jest.spyOn(document, 'removeEventListener');
      await pressEscape();
      expect(isPopupVisible()).toBe(false);
      expect(document.removeEventListener).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function),
        true,
      );
    });
  });

  describe('scroll', () => {
    it('does not deactivate on scroll by default', async () => {
      createActivator();
      await createPopup({ interactions: ['click'] });

      await clickActivator();
      expect(isPopupVisible()).toBe(true);

      await scrollPage();
      expect(isPopupVisible()).toBe(true);
    });

    it('with scroll: true, deactivates when the page is scrolled', async () => {
      createActivator();
      await createPopup({ interactions: ['click'], deactivateOn: { scroll: true } });

      await clickActivator();
      expect(isPopupVisible()).toBe(true);

      await scrollPage();
      expect(isPopupVisible()).toBe(false);
    });

    it('scrolling its own content does not deactivate', async () => {
      createActivator();
      await createPopup({ interactions: ['click'] });

      await clickActivator();
      expect(isPopupVisible()).toBe(true);

      await scrollInsidePopup();
      expect(isPopupVisible()).toBe(true);
    });

    it('scrolling its own content does not deactivate even with scroll: true', async () => {
      createActivator();
      await createPopup({ interactions: ['click'], deactivateOn: { scroll: true } });

      await clickActivator();
      expect(isPopupVisible()).toBe(true);

      await scrollInsidePopup();
      expect(isPopupVisible()).toBe(true);
    });

    it('does not add the shared scroll listener if it is not needed', async () => {
      createActivator();
      await createPopup({ interactions: ['click'] });

      jest.spyOn(document, 'addEventListener');
      await clickActivator();
      expect(isPopupVisible()).toBe(true);
      expect(document.addEventListener).not.toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        expect.anything(),
      );
    });

    it('removes the shared scroll listener once it is not needed', async () => {
      createActivator();
      await createPopup({ interactions: ['click'], deactivateOn: { scroll: true } });

      jest.spyOn(document, 'addEventListener');
      await clickActivator();
      expect(isPopupVisible()).toBe(true);
      expect(document.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), {
        capture: true,
        passive: true,
      });

      jest.spyOn(document, 'removeEventListener');
      await scrollPage();
      expect(isPopupVisible()).toBe(false);
      expect(document.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), {
        capture: true,
        passive: true,
      });
    });
  });

  describe('manual activation/deactivation', () => {
    it('activates/deactivates via setActive', async () => {
      createActivator();
      await createPopup({ interactions: ['hover'] });

      controls.setActive(true);
      await nextTick();
      expect(isPopupVisible()).toBe(true);
      expectActivatedBy();

      controls.setActive(false);
      await nextTick();
      expect(isPopupVisible()).toBe(false);
    });

    it('interaction deactivation does not override manual activation', async () => {
      createActivator();
      await createPopup({ interactions: ['hover'] });

      controls.setActive(true);
      await nextTick();

      await hoverActivator();
      await unhoverActivator();
      await nextTick();
      expect(isPopupVisible()).toBe(true);
    });
  });

  describe('enabling/disabling', () => {
    it('setEnabled(false) deactivates and stops listening, setEnabled(true) starts again', async () => {
      createActivator();
      await createPopup({ interactions: ['hover'] });

      await hoverActivator();
      expect(isPopupVisible()).toBe(true);

      controls.setEnabled(false);
      await nextTick();
      expect(isPopupVisible()).toBe(false);

      await hoverActivator();
      expect(isPopupVisible()).toBe(false);

      controls.setEnabled(true);
      await nextTick();
      // Enabling back doesn't activate,
      // only a fresh interaction does
      expect(isPopupVisible()).toBe(false);

      await hoverActivator();
      expect(isPopupVisible()).toBe(true);
    });

    it('with enabled: false initially, interacting with the activator element does nothing until setEnabled(true)', async () => {
      createActivator();
      await createPopup({ interactions: ['hover'], enabled: false });

      await hoverActivator();
      expect(isPopupVisible()).toBe(false);

      controls.setEnabled(true);
      await nextTick();

      await hoverActivator();
      expect(isPopupVisible()).toBe(true);
    });

    it('with enabled: false initially, does not add the activator listener', async () => {
      const activator = createActivator();
      jest.spyOn(activator, 'addEventListener');

      await createPopup({ interactions: ['hover'], enabled: false });

      expect(activator.addEventListener).not.toHaveBeenCalled();
    });

    it('removes the activator listener when setEnabled(false) is called', async () => {
      const activator = createActivator();
      await createPopup({ interactions: ['hover'] });
      jest.spyOn(activator, 'removeEventListener');

      controls.setEnabled(false);
      await nextTick();

      expect(activator.removeEventListener).toHaveBeenCalledWith(
        'mouseenter',
        expect.any(Function),
        true,
      );
    });
  });

  it('several activators can share the same floating element', async () => {
    createActivator('Activator 1', 'floating-1');
    await createPopup({ interactions: ['hover'] });

    createActivator('Activator 2', 'floating-1');
    await flush();

    await hoverActivator('Activator 1');
    expect(isPopupVisible()).toBe(true);
    expectActivatedBy('Activator 1');

    await unhoverActivator('Activator 1');
    expect(isPopupVisible()).toBe(false);

    await hoverActivator('Activator 2');
    expect(isPopupVisible()).toBe(true);
    expectActivatedBy('Activator 2');
  });

  describe('developer warning about delegation when many floating elements', () => {
    const nodeEnv = process.env.NODE_ENV;
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });
    afterEach(() => {
      process.env.NODE_ENV = nodeEnv;
    });

    async function growPopups(from, to, props = {}) {
      for (let i = from; i < to; i++) {
        createActivator(`Activator ${i}`, `floating-${i}`);
        await createPopup({ id: `floating-${i}`, interactions: ['hover'], ...props });
      }
    }

    it('warns once, on passing the limit', async () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

      await growPopups(0, NON_DELEGATED_WARN_LIMIT);
      expect(warn).not.toHaveBeenCalled();

      await growPopups(NON_DELEGATED_WARN_LIMIT, NON_DELEGATED_WARN_LIMIT + 2);
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain(`consider event delegation`);

      // Still just the one, however far the count grows
      await growPopups(NON_DELEGATED_WARN_LIMIT + 2, NON_DELEGATED_WARN_LIMIT + 6);
      expect(warn).toHaveBeenCalledTimes(1);
    });

    it('does not warn when delegated', async () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

      await growPopups(0, NON_DELEGATED_WARN_LIMIT + 2, { delegate: true });

      expect(warn).not.toHaveBeenCalled();
    });
  });

  describe('when not delegating activation listeners', () => {
    it('attaches activation listeners to activator elements', async () => {
      const activator = createActivator();
      jest.spyOn(activator, 'addEventListener');
      jest.spyOn(document, 'addEventListener');

      await createPopup({ interactions: ['hover'] });

      expect(activator.addEventListener).toHaveBeenCalledWith(
        'mouseenter',
        expect.any(Function),
        true,
      );
      expect(document.addEventListener).not.toHaveBeenCalledWith(
        'mouseenter',
        expect.any(Function),
        true,
      );
    });

    it('removes activation listeners from activator elements when they are not needed', async () => {
      const activator = createActivator();
      await createPopup({ interactions: ['hover'] });
      jest.spyOn(activator, 'removeEventListener');

      activator.remove();
      await flush();

      expect(activator.removeEventListener).toHaveBeenCalledWith(
        'mouseenter',
        expect.any(Function),
        true,
      );
    });

    it('adds deactivation listeners on activator elements (in both delegation modes', async () => {
      const activator = createActivator();
      jest.spyOn(activator, 'addEventListener');
      await createPopup({ interactions: ['hover'] });

      await hoverActivator();

      expect(activator.addEventListener).toHaveBeenCalledWith(
        'mouseleave',
        expect.any(Function),
        true,
      );
    });

    it('removes deactivation listeners from activator elements when they are not needed', async () => {
      const activator = createActivator();
      await createPopup({ interactions: ['hover'] });

      await hoverActivator();
      jest.spyOn(activator, 'removeEventListener');

      await unhoverActivator();

      expect(activator.removeEventListener).toHaveBeenCalledWith(
        'mouseleave',
        expect.any(Function),
        true,
      );
    });

    it('there is not more than a single observer instance', async () => {
      const observeSpy = jest.spyOn(MutationObserver.prototype, 'observe');

      createActivator('Activator 1', 'floating-1');
      createActivator('Activator 2', 'floating-2');

      await createPopup({ id: 'floating-1', interactions: ['hover'] });
      await createPopup({ id: 'floating-2', interactions: ['hover'] });

      expect(observeSpy).toHaveBeenCalledTimes(1);
    });

    it('on DOM change, observer queries just once, not for each floating element', async () => {
      createActivator('Activator 1', 'floating-1');
      createActivator('Activator 2', 'floating-2');
      await createPopup({ id: 'floating-1', interactions: ['hover'] });
      await createPopup({ id: 'floating-2', interactions: ['hover'] });

      const spy = jest.spyOn(document, 'querySelectorAll');
      document.body.appendChild(document.createElement('div'));
      await flush();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when delegating activation listeners', () => {
    it('attaches activation listeners to the document', async () => {
      const activator = createActivator();
      jest.spyOn(activator, 'addEventListener');
      jest.spyOn(document, 'addEventListener');

      await createPopup({ interactions: ['hover'], delegate: true });

      expect(activator.addEventListener).not.toHaveBeenCalled();
      expect(document.addEventListener).toHaveBeenCalledWith(
        'mouseenter',
        expect.any(Function),
        true,
      );
    });

    it('attaches only one activation listeners to the document for the same interaction no matter of how many floating elements', async () => {
      createActivator('Activator 1', 'floating-1');
      createActivator('Activator 2', 'floating-2');

      jest.spyOn(document, 'addEventListener');
      await createPopup({ id: 'floating-1', interactions: ['hover'], delegate: true });
      await createPopup({ id: 'floating-2', interactions: ['hover'], delegate: true });

      const mouseenterCalls = document.addEventListener.mock.calls.filter(
        ([eventType]) => eventType === 'mouseenter',
      );
      expect(mouseenterCalls).toHaveLength(1);
    });

    it('when a floating element removed, document activation listener is preserved for remaining floating elements that need it', async () => {
      createActivator('Activator 1', 'floating-1');
      createActivator('Activator 2', 'floating-2');

      const { unmount: unmountFirst } = await createPopup({
        id: 'floating-1',
        interactions: ['click'],
        delegate: true,
      });
      await createPopup({
        id: 'floating-2',
        interactions: ['click'],
        delegate: true,
      });

      jest.spyOn(document, 'removeEventListener');
      unmountFirst();
      await nextTick();
      expect(document.removeEventListener).not.toHaveBeenCalled();

      // Still functions
      await clickActivator('Activator 2');
      expectActivatedBy('Activator 2');
    });

    it('removes activation listeners from the document when they are not needed', async () => {
      createActivator();
      const { unmount } = await createPopup({ interactions: ['hover'], delegate: true });

      jest.spyOn(document, 'removeEventListener');
      unmount();
      await nextTick();

      expect(document.removeEventListener).toHaveBeenCalledWith(
        'mouseenter',
        expect.any(Function),
        true,
      );
    });

    it('adds deactivation listeners on activator elements (in both delegation modes)', async () => {
      const activator = createActivator();
      jest.spyOn(activator, 'addEventListener');
      await createPopup({ interactions: ['hover'], delegate: true });

      await hoverActivator();

      expect(activator.addEventListener).toHaveBeenCalledWith(
        'mouseleave',
        expect.any(Function),
        true,
      );
    });

    it('removes deactivation listeners from activator elements when they are not needed', async () => {
      const activator = createActivator();
      await createPopup({ interactions: ['hover'], delegate: true });

      await hoverActivator();
      jest.spyOn(activator, 'removeEventListener');

      await unhoverActivator();

      expect(activator.removeEventListener).toHaveBeenCalledWith(
        'mouseleave',
        expect.any(Function),
        true,
      );
    });

    it('observes only while a floating element is active, reusing the same observer instance', async () => {
      const observeSpy = jest.spyOn(MutationObserver.prototype, 'observe');
      const disconnectSpy = jest.spyOn(MutationObserver.prototype, 'disconnect');

      createActivator();
      await createPopup({ interactions: ['hover'], delegate: true });
      expect(observeSpy).not.toHaveBeenCalled();

      await hoverActivator();
      expect(observeSpy).toHaveBeenCalledTimes(1);

      await unhoverActivator();
      expect(disconnectSpy).toHaveBeenCalledTimes(1);

      await hoverActivator();
      expect(observeSpy).toHaveBeenCalledTimes(2);
      // Check that observer reused, not recreated
      expect(observeSpy.mock.instances[0]).toBe(observeSpy.mock.instances[1]);
    });
  });

  describe('activators in reactive environment', () => {
    it('works when an activator element is added later', async () => {
      await createPopup({ interactions: ['hover'] });

      // Wait for a bit longer
      await nextTick();
      await nextTick();

      createActivator();
      await flush();

      await hoverActivator();
      expect(isPopupVisible()).toBe(true);
    });

    it('deactivates when activator element leaves', async () => {
      const activator = createActivator();
      await createPopup({ interactions: ['hover'] });

      await hoverActivator();
      expect(isPopupVisible()).toBe(true);

      activator.remove();
      await flush();

      expect(isPopupVisible()).toBe(false);
    });

    it('works when an activator element swapped', async () => {
      // Simulates a ':key' swap under the same floating ID
      const oldActivator = createActivator('Activator 1', 'floating-1');
      await createPopup({ interactions: ['hover'] });
      oldActivator.remove();
      createActivator('Activator 2', 'floating-1');
      await flush();

      await hoverActivator('Activator 2');
      expect(isPopupVisible()).toBe(true);
      expectActivatedBy('Activator 2');
    });
  });

  describe('registry cleanup', () => {
    it('forgets everything about the floating element', async () => {
      createActivator('Activator 1', 'floating-1');
      const { unmount } = await createPopup({ id: 'floating-1', interactions: ['hover'] });

      await hoverActivator();
      expect(_registry['floating-1'].callers).toHaveLength(1);
      expect(_registry['floating-1'].activeInteractions.value).toEqual(['hover']);
      expect(_active.has('floating-1')).toBe(true);
      expect(_nonDelegated.has('floating-1')).toBe(true);

      unmount();
      await nextTick();

      expect(_registry['floating-1']).toBeUndefined();
      expect(_active.has('floating-1')).toBe(false);
      expect(_nonDelegated.has('floating-1')).toBe(false);
    });

    it('forgets delegate usage', async () => {
      createActivator();
      const { unmount } = await createPopup({ interactions: ['click'], delegate: true });

      expect(_delegateUsage).toEqual({ click: 1 });

      unmount();
      await nextTick();

      expect(_delegateUsage).toEqual({});
    });
  });
});
