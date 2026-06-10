import { nextTick } from 'vue';
import { render } from '@testing-library/vue';
import VueRouter from 'vue-router';
import useKFloatingInteraction, {
  _floatingInteractions,
  _floatingCache,
  _delegateUsage,
} from '../index.js';

const FLOATING_PARAMS = {
  'floating-1': { activateOn: ['focus'], delegateTo: 'delegate-1' },
  'floating-2': { activateOn: ['focus', 'touch'], delegateTo: 'delegate-1' },
  'floating-3': { activateOn: ['hover'], delegateTo: 'delegate-2' },
  'floating-4': {},
  'floating-5': { activateOn: ['keyboardfocus', 'hover'] },
  'floating-6': { activateOn: ['touch'], delegateTo: 'root' },
  'floating-7': { activateOn: ['click'] },
};
const components = {};

/*
  Test DOM:
  <div id="delegate-1">
    <span id="activator-1" data-floating-id="floating-1">Activator 1</span>
    <span id="floating-1">Floating 1</span>
    <span id="activator-2" data-floating-id="floating-2">Activator 2</span>
    <span id="floating-2">Floating 2</span>
  </div>
  <div id="delegate-2">
    <span id="activator-3" data-floating-id="floating-3">Activator 3</span>
    <span id="floating-3">Floating 3</span>
  </div>
  <span id="activator-4" data-floating-id="floating-4">Activator 4</span>
  <span id="floating-4">Floating 4</span>
  <span id="activator-5" data-floating-id="floating-5">Activator 5</span>
  <span id="floating-5">Floating 5</span>
  <span id="activator-6" data-floating-id="floating-6">Activator 6</span>
  <span id="floating-6">Floating 6</span>
  <span id="activator-7" data-floating-id="floating-7">Activator 7</span>
  <span id="floating-7">Floating 7</span>
*/
function setupDOM(document) {
  const delegate1 = createDelegate('delegate-1');
  const activator1 = createActivator('activator-1', 'floating-1', 'Activator 1');
  delegate1.appendChild(activator1);
  const floating1 = createFloating('floating-1', 'Floating 1');
  delegate1.appendChild(floating1);
  const activator2 = createActivator('activator-2', 'floating-2', 'Activator 2');
  delegate1.appendChild(activator2);
  const floating2 = createFloating('floating-2', 'Floating 2');
  delegate1.appendChild(floating2);

  const delegate2 = createDelegate('delegate-2');
  const activator3 = createActivator('activator-3', 'floating-3', 'Activator 3');
  delegate2.appendChild(activator3);
  const floating3 = createFloating('floating-3', 'Floating 3');
  delegate2.appendChild(floating3);

  const activator4 = createActivator('activator-4', 'floating-4', 'Activator 4');
  document.body.appendChild(activator4);
  const floating4 = createFloating('floating-4', 'Floating 4');
  document.body.appendChild(floating4);

  const activator5 = createActivator('activator-5', 'floating-5', 'Activator 5');
  document.body.appendChild(activator5);
  const floating5 = createFloating('floating-5', 'Floating 5');
  document.body.appendChild(floating5);

  const activator6 = createActivator('activator-6', 'floating-6', 'Activator 6');
  document.body.appendChild(activator6);
  const floating6 = createFloating('floating-6', 'Floating 6');
  document.body.appendChild(floating6);

  const activator7 = createActivator('activator-7', 'floating-7', 'Activator 7');
  document.body.appendChild(activator7);
  const floating7 = createFloating('floating-7', 'Floating 7');
  document.body.appendChild(floating7);

  return {
    delegates: { 1: delegate1, 2: delegate2 },
    activators: {
      1: activator1,
      2: activator2,
      3: activator3,
      4: activator4,
      5: activator5,
      6: activator6,
      7: activator7,
    },
    floatings: {
      1: floating1,
      2: floating2,
      3: floating3,
      4: floating4,
      5: floating5,
      6: floating6,
      7: floating7,
    },
  };
}

function createActivator(id, floatingId, text) {
  const activator = document.createElement('span');
  activator.id = id;
  activator.setAttribute('data-floating-id', floatingId);
  activator.textContent = text;
  return activator;
}

function createFloating(id, text) {
  const floating = document.createElement('span');
  floating.id = id;
  floating.textContent = text;
  return floating;
}

function createDelegate(delegateId) {
  const delegate = document.createElement('div');
  delegate.id = delegateId;
  document.body.appendChild(delegate);
  return delegate;
}

function mountFloating(floatingEl) {
  const floatingId = floatingEl.id;
  const params = FLOATING_PARAMS[floatingId];

  const el = document.getElementById(floatingId);
  const TestComponent = {
    setup() {
      useKFloatingInteraction(floatingId, params.activateOn, params.delegateTo);
    },
  };
  const instance = render(TestComponent, {
    container: el,
    routes: new VueRouter(),
  });
  components[floatingId] = instance;
  return instance;
}

function unmountFloating(floatingEl) {
  const floatingId = floatingEl.id;
  if (components[floatingId]) {
    components[floatingId].unmount();
    delete components[floatingId];
  }
}

function mountAllFloatings(dom) {
  for (const el of Object.values(dom.floatings)) {
    mountFloating(el);
  }
}

function unmountAllFloatings(dom) {
  for (const el of Object.values(dom.floatings)) {
    unmountFloating(el);
  }
}

describe('useKFloatingInteraction', () => {
  let dom;

  function forEachDomEl(fn) {
    Object.values(dom).forEach(group => Object.values(group).forEach(fn));
  }

  function clearObject(obj) {
    for (const key in obj) {
      delete obj[key];
    }
  }

  beforeAll(() => {
    dom = setupDOM(document);
    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');
    jest.spyOn(document, 'addEventListener');
    jest.spyOn(document, 'removeEventListener');
    forEachDomEl(el => {
      jest.spyOn(el, 'addEventListener');
      jest.spyOn(el, 'removeEventListener');
    });
  });

  afterEach(() => {
    unmountAllFloatings(dom);

    [_delegateUsage, _floatingInteractions, _floatingCache].forEach(clearObject);

    window.addEventListener.mockClear();
    window.removeEventListener.mockClear();
    document.addEventListener.mockClear();
    document.removeEventListener.mockClear();
    forEachDomEl(el => {
      el.addEventListener.mockClear();
      el.removeEventListener.mockClear();
    });
  });

  afterAll(() => {
    document.body.innerHTML = '';
    window.addEventListener.mockRestore();
    window.removeEventListener.mockRestore();
    document.addEventListener.mockRestore();
    document.removeEventListener.mockRestore();
    forEachDomEl(el => {
      el.addEventListener.mockRestore();
      el.removeEventListener.mockRestore();
    });
  });

  it(`updates '_floatingInteractions'`, async () => {
    mountAllFloatings(dom);
    await nextTick();

    expect(Object.keys(_floatingInteractions).length).toBe(7);
    expect(_floatingInteractions).toEqual({
      'floating-1': { activateOn: ['focus'] },
      'floating-2': { activateOn: ['focus', 'touch'] },
      'floating-3': { activateOn: ['hover'] },
      'floating-4': { activateOn: ['hover'] },
      'floating-5': { activateOn: ['keyboardfocus', 'hover'] },
      'floating-6': { activateOn: ['touch'] },
      'floating-7': { activateOn: ['click'] },
    });
  });

  it(`cleans '_floatingInteractions'`, async () => {
    mountAllFloatings(dom);
    await nextTick();

    unmountFloating(dom.floatings[1]);
    await nextTick();

    expect(Object.keys(_floatingInteractions).length).toBe(6);
    expect(_floatingInteractions['floating-1']).toBeUndefined();

    unmountFloating(dom.floatings[2]);
    await nextTick();

    expect(Object.keys(_floatingInteractions).length).toBe(5);
    expect(_floatingInteractions['floating-2']).toBeUndefined();
  });

  it(`updates '_floatingCache'`, async () => {
    mountAllFloatings(dom);
    await nextTick();

    expect(Object.keys(_floatingCache).length).toBe(6);
    expect(_floatingCache).toEqual({
      'floating-1': { 'delegate-1': expect.any(HTMLDivElement) },
      'floating-2': { 'delegate-1': expect.any(HTMLDivElement) },
      'floating-3': { 'delegate-2': expect.any(HTMLDivElement) },
      'floating-4': { '[data-floating-id="floating-4"]': expect.any(HTMLSpanElement) },
      'floating-5': { '[data-floating-id="floating-5"]': expect.any(HTMLSpanElement) },
      'floating-7': { '[data-floating-id="floating-7"]': expect.any(HTMLSpanElement) },
    });
  });

  it(`cleans '_floatingCache'`, async () => {
    mountAllFloatings(dom);
    await nextTick();

    unmountFloating(dom.floatings[1]);
    await nextTick();

    expect(Object.keys(_floatingCache).length).toBe(5);
    expect(_floatingCache['floating-1']).toBeUndefined();

    unmountFloating(dom.floatings[2]);
    await nextTick();

    expect(Object.keys(_floatingCache).length).toBe(4);
    expect(_floatingCache['floating-2']).toBeUndefined();
  });

  it(`updates '_delegateUsage'`, async () => {
    mountAllFloatings(dom);
    await nextTick();

    expect(_delegateUsage).toEqual({
      'delegate-1': { focus: 2, touchstart: 1 },
      'delegate-2': { mouseenter: 1 },
      root: { touchstart: 1 },
    });
  });

  it(`cleans '_delegateUsage'`, async () => {
    mountAllFloatings(dom);
    await nextTick();

    expect(_delegateUsage['delegate-1']).toEqual({ focus: 2, touchstart: 1 });

    unmountFloating(dom.floatings[1]);
    await nextTick();

    expect(_delegateUsage['delegate-1']).toEqual({ focus: 1, touchstart: 1 });

    unmountFloating(dom.floatings[2]);
    await nextTick();

    expect(_delegateUsage['delegate-1']).toBeUndefined();
  });

  describe('when delegating events', () => {
    it(`attaches / removes event listeners on the delegate element`, async () => {
      mountFloating(dom.floatings[1]);
      await nextTick();

      expect(dom.activators[1].addEventListener.mock.calls).toHaveLength(0);
      expect(dom.delegates[1].addEventListener.mock.calls).toHaveLength(1);
      expect(dom.delegates[1].addEventListener.mock.calls[0][0]).toEqual('focus');

      dom.delegates[1].addEventListener.mockClear();
      mountFloating(dom.floatings[2]);
      await nextTick();

      expect(dom.activators[2].addEventListener.mock.calls).toHaveLength(0);
      expect(dom.delegates[1].addEventListener.mock.calls).toHaveLength(1);
      expect(dom.delegates[1].addEventListener.mock.calls[0][0]).toEqual('touchstart');

      unmountFloating(dom.floatings[1]);
      await nextTick();

      expect(dom.delegates[1].removeEventListener.mock.calls).toHaveLength(0);

      dom.delegates[1].removeEventListener.mockClear();
      unmountFloating(dom.floatings[2]);
      await nextTick();

      expect(dom.delegates[1].removeEventListener.mock.calls).toHaveLength(2);
      expect(dom.delegates[1].removeEventListener.mock.calls[0][0]).toEqual('focus');
      expect(dom.delegates[1].removeEventListener.mock.calls[1][0]).toEqual('touchstart');
    });
  });

  describe('when not delegating events', () => {
    it(`attaches / removes event listeners on the activator element`, async () => {
      mountFloating(dom.floatings[5]);
      await nextTick();

      expect(dom.activators[5].addEventListener.mock.calls).toHaveLength(2);
      expect(dom.activators[5].addEventListener.mock.calls[0][0]).toEqual('focus');
      expect(dom.activators[5].addEventListener.mock.calls[1][0]).toEqual('mouseenter');

      unmountFloating(dom.floatings[5]);
      await nextTick();

      expect(dom.activators[5].removeEventListener.mock.calls).toHaveLength(2);
      expect(dom.activators[5].removeEventListener.mock.calls[0][0]).toEqual('focus');
      expect(dom.activators[5].removeEventListener.mock.calls[1][0]).toEqual('mouseenter');
    });

    it(`attaches / removes click event listener for click interaction`, async () => {
      mountFloating(dom.floatings[7]);
      await nextTick();

      expect(dom.activators[7].addEventListener.mock.calls).toHaveLength(1);
      expect(dom.activators[7].addEventListener.mock.calls[0][0]).toEqual('click');

      unmountFloating(dom.floatings[7]);
      await nextTick();

      expect(dom.activators[7].removeEventListener.mock.calls).toHaveLength(1);
      expect(dom.activators[7].removeEventListener.mock.calls[0][0]).toEqual('click');
    });
  });
});
