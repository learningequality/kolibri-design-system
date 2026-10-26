import { fireEvent, render, screen, waitFor, within } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import trackInputModality from '../../styles/trackInputModality';
import KDropdownMenu from '../index.vue';

const OPTIONS = [
  { label: 'First' },
  { label: 'Second' },
  { type: 'divider' },
  { label: 'Link', href: '#link' },
  { label: 'Disabled', disabled: true },
];

const Harness = {
  props: {
    options: { type: Array, default: () => OPTIONS },
    onClose: { type: Function, default: () => {} },
  },
  template: `
    <div>
      <button>Before</button>
      <KButton text="Options" hasDropdown>
        <template #menu>
          <KDropdownMenu :options="options" @close="onClose" />
        </template>
      </KButton>
      <button>After</button>
    </div>
  `,
};

const getTrigger = () => screen.getByRole('button', { name: 'Options' });
const getItem = name => screen.getByRole('menuitem', { name });

async function openFromTrigger(user) {
  await user.click(getTrigger());
  await waitFor(() => expect(getItem('First')).toHaveFocus());
}

async function renderAndOpen(props, component = Harness) {
  const user = userEvent.setup();
  render(component, { props });
  await openFromTrigger(user);
  return user;
}

function renderAndOpenInside(template, options = {}) {
  return renderAndOpen({}, { components: { Harness }, template, ...options });
}

// Safari and Firefox on macOS do not focus a clicked button
const preventFocusOnClick = element =>
  element.addEventListener('mousedown', event => event.preventDefault());

const getInput = () => screen.getByRole('textbox', { name: 'Input' });

const HeaderHarness = {
  template: `
    <KButton text="Options" hasDropdown>
      <template #menu>
        <KDropdownMenu :options="['First', 'Second']">
          <template #header><input aria-label="Input"></template>
        </KDropdownMenu>
      </template>
    </KButton>
  `,
};

function pressKey(target, key, init = {}) {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init });
  target.dispatchEvent(event);
  return event;
}

let menu;

const getMenu = () => screen.getByRole('menu', { hidden: true });

const flush = ms => new Promise(resolve => setTimeout(resolve, ms));

const getHostTrigger = () => screen.getByRole('button', { name: /Menu/ });

async function openMenu(trigger) {
  await userEvent.click(trigger);
  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
}

const renderContextMenu = (listeners = {}) => {
  render(
    {
      components: { KDropdownMenu },
      template: `
        <div>
          <button>Before</button>
          <div data-testid="area">
            <KDropdownMenu
              ref="menu"
              isContextMenu
              :options="['Option A']"
              @select="$emit('select')"
            />
          </div>
          <button>Outside</button>
        </div>
      `,
      mounted() {
        menu = this.$refs.menu;
      },
    },
    { listeners },
  );
  return screen.getByTestId('area');
};

const rightClick = async area => {
  fireEvent.contextMenu(area, { clientX: 10, clientY: 10 });
  await waitFor(() => expect(getMenu()).toBeVisible());
};

function enableModalityTracking() {
  trackInputModality();
  document.dispatchEvent(new Event('DOMContentLoaded'));
}

async function openWithKeyboard() {
  enableModalityTracking();
  const user = userEvent.setup();
  render(Harness);
  await user.tab();
  await user.tab();
  await user.keyboard('{Enter}');
  await waitFor(() => expect(getItem('First')).toHaveFocus());
  return user;
}

// jsdom never fires transitionend
function finishOpenTransition() {
  fireEvent.transitionEnd(document.querySelector('.tippy-tooltip'));
}

// jsdom runs a frame's callbacks back to back; browsers run microtasks after each one
function runFramesLikeABrowser() {
  jest
    .spyOn(window, 'requestAnimationFrame')
    .mockImplementation(callback => setTimeout(() => callback(performance.now())));
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(clearTimeout);
}

beforeEach(() => {
  // jsdom does not implement scrollIntoView
  HTMLElement.prototype.scrollIntoView = jest.fn();
});

afterEach(() => jest.restoreAllMocks());

describe('KDropdownMenu', () => {
  describe('semantics', () => {
    it('options are menuitems out of the tab sequence', async () => {
      await renderAndOpen();
      const items = ['First', 'Second', 'Link', 'Disabled'].map(getItem);
      expect(screen.getAllByRole('menuitem')).toEqual(items);
      items.forEach(item => expect(item).toHaveAttribute('tabindex', '-1'));
    });

    it('dividers are non-focusable separators', async () => {
      await renderAndOpen();
      const separator = screen.getByRole('separator');
      expect(separator).not.toHaveAttribute('tabindex');
    });

    it('an href option renders its link inside a list item', async () => {
      await renderAndOpen();
      const link = getItem('Link');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '#link');
      expect(link.parentElement.tagName).toBe('LI');
    });

    it('target is set only on enabled href options', async () => {
      await renderAndOpen({
        options: [
          { label: 'First', target: '_blank' },
          { label: 'Link', href: '#link', target: '_blank' },
          { label: 'Disabled', href: '#link', target: '_blank', disabled: true },
        ],
      });
      expect(getItem('Link')).toHaveAttribute('target', '_blank');
      expect(getItem('First')).not.toHaveAttribute('target');
      expect(getItem('Disabled')).not.toHaveAttribute('target');
      expect(getItem('Disabled')).not.toHaveAttribute('href');
    });

    it('disabled options are marked aria-disabled', async () => {
      await renderAndOpen();
      expect(getItem('Disabled')).toHaveAttribute('aria-disabled', 'true');
      expect(getItem('First')).not.toHaveAttribute('aria-disabled');
    });

    it('every child of the menu is a list item', async () => {
      await renderAndOpen();
      const { children } = screen.getByRole('menu');
      expect(children.length).toBe(OPTIONS.length);
      Array.from(children).forEach(child => expect(child.tagName).toBe('LI'));
    });

    it('option list items are not exposed as list items', async () => {
      await renderAndOpen();
      expect(within(screen.getByRole('menu')).queryAllByRole('listitem')).toEqual([]);
    });

    it('the menu is not wrapped in a dialog', async () => {
      await renderAndOpen();
      expect(screen.getByRole('menu').closest('[role="dialog"]')).toBeNull();
    });
  });

  describe('arrow keys', () => {
    it.each([
      ['First', '{ArrowDown}', 'Second'],
      ['Second', '{ArrowDown}', 'Link'],
      ['Link', '{ArrowDown}', 'Disabled'],
      ['Disabled', '{ArrowDown}', 'First'],
      ['Link', '{ArrowUp}', 'Second'],
      ['First', '{ArrowUp}', 'Disabled'],
      ['Link', '{Home}', 'First'],
      ['First', '{End}', 'Disabled'],
    ])('from %s, %s moves to %s', async (start, key, expected) => {
      const user = await renderAndOpen();
      getItem(start).focus();
      await user.keyboard(key);
      expect(getItem(expected)).toHaveFocus();
    });

    it.each(['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown', ' ', 'Enter'])(
      '%p is not left to the browser',
      async key => {
        await renderAndOpen();
        expect(pressKey(getItem('Second'), key).defaultPrevented).toBe(true);
      },
    );

    it.each(['Home', 'End', 'PageUp', 'PageDown'])(
      '%p in the header slot is left to the focused field',
      async key => {
        await renderAndOpen({}, HeaderHarness);
        const input = getInput();
        input.focus();
        expect(pressKey(input, key).defaultPrevented).toBe(false);
        expect(input).toHaveFocus();
      },
    );

    it.each([
      ['{ArrowUp}', 'Second'],
      ['{ArrowDown}', 'First'],
    ])('from a header field, %s moves to %s', async (key, expected) => {
      const user = await renderAndOpen({}, HeaderHarness);
      getInput().focus();
      await user.keyboard(key);
      expect(getItem(expected)).toHaveFocus();
    });

    it.each([
      ['is removed', [{ label: 'First' }]],
      ['becomes a link', [{ label: 'First' }, { label: 'Second', href: '#second' }]],
    ])('focus returns to the menu when the focused option %s', async (_, options) => {
      const user = userEvent.setup();
      const { updateProps } = render(Harness);
      await openFromTrigger(user);
      getItem('Second').focus();
      await updateProps({ options });
      await waitFor(() => expect(getItem('First')).toHaveFocus());
      await user.keyboard('{Escape}');
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    it('an options change leaves focus where the user moved it outside the menu', async () => {
      const user = userEvent.setup();
      const { updateProps } = render({
        components: { Harness },
        props: { options: { type: Array, default: () => OPTIONS } },
        template: '<div><Harness :options="options" /><input aria-label="Input"></div>',
      });
      await openFromTrigger(user);
      getInput().focus();
      await updateProps({ options: [{ label: 'First' }] });
      await flush();
      expect(getInput()).toHaveFocus();
    });

    it('Escape returns focus to the trigger after every option is removed', async () => {
      const user = userEvent.setup();
      const { updateProps } = render(Harness);
      await openFromTrigger(user);
      await updateProps({ options: [] });
      await flush();
      await user.keyboard('{Escape}');
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
      expect(getTrigger()).toHaveFocus();
    });

    it('opens with an option that references itself', async () => {
      const user = await renderAndOpenInside('<Harness :options="makeOptions()" />', {
        methods: {
          makeOptions() {
            const first = { label: 'First' };
            first.self = first;
            return [first, { label: 'Second' }];
          },
        },
      });
      await user.keyboard('{ArrowDown}');
      expect(getItem('Second')).toHaveFocus();
    });

    it('focus stays outside a closed menu when its options change', async () => {
      const user = userEvent.setup();
      const { updateProps } = render(Harness);
      await openFromTrigger(user);
      await user.keyboard('{Escape}');
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
      getTrigger().blur();
      await updateProps({ options: [{ label: 'First' }] });
      await flush();
      expect(document.body).toHaveFocus();
    });

    it('the focused option shows a focus outline', async () => {
      const user = await openWithKeyboard();
      await user.keyboard('{ArrowDown}');
      await waitFor(() =>
        expect(getItem('Second').closest('li')).toHaveStyle({ outlineStyle: 'solid' }),
      );
      expect(getItem('First').closest('li')).not.toHaveStyle({ outlineStyle: 'solid' });
    });

    it('the first Down after a mouse open shows a focus outline', async () => {
      enableModalityTracking();
      const user = await renderAndOpen();
      await user.keyboard('{ArrowDown}');
      await waitFor(() =>
        expect(getItem('Second').closest('li')).toHaveStyle({ outlineStyle: 'solid' }),
      );
    });

    it('the focused option is highlighted after a mouse open', async () => {
      const user = await renderAndOpen();
      await user.keyboard('{ArrowDown}');
      expect(getItem('Second').closest('li')).toHaveClass('is-active');
      expect(getItem('First').closest('li')).not.toHaveClass('is-active');
    });

    it('hovering an option focuses it, so arrows continue from there', async () => {
      const user = await renderAndOpen();
      await user.hover(getItem('Link'));
      expect(getItem('Link')).toHaveFocus();
      await user.keyboard('{ArrowUp}');
      expect(getItem('Second')).toHaveFocus();
    });

    it('hovering a disabled option leaves focus in place', async () => {
      const user = await renderAndOpen();
      await user.hover(getItem('Disabled'));
      expect(getItem('First')).toHaveFocus();
    });

    it('hovering an option leaves focus in a header field', async () => {
      const user = await renderAndOpen({}, HeaderHarness);
      const input = getInput();
      input.focus();
      await user.hover(getItem('Second'));
      expect(input).toHaveFocus();
    });

    it('opening under a resting pointer keeps focus on the first option', async () => {
      await renderAndOpen();
      // Chrome fires mouseover and mouseenter, not mousemove, at a menu opening under the pointer
      fireEvent.mouseOver(getItem('Second'));
      fireEvent.mouseEnter(getItem('Second'));
      expect(getItem('First')).toHaveFocus();
    });

    it('hovering the closing menu leaves focus on the trigger', async () => {
      const user = await renderAndOpen();
      const second = getItem('Second');
      await user.click(getItem('First'));
      await user.hover(second);
      expect(getTrigger()).toHaveFocus();
    });

    describe('scrolling', () => {
      afterEach(() => jest.useRealTimers());

      it('an arrow key scrolls the option into view at once, whatever the page scroll-behavior', async () => {
        const user = await renderAndOpen();
        const reveal = HTMLElement.prototype.scrollIntoView;
        await waitFor(() => expect(reveal).toHaveBeenCalled());
        reveal.mockClear();
        const focus = jest.spyOn(HTMLElement.prototype, 'focus');
        await user.keyboard('{ArrowDown}');
        expect(reveal.mock.contexts).toEqual([getItem('Second')]);
        expect(reveal).toHaveBeenCalledWith({ block: 'nearest', behavior: 'instant' });
        expect(focus.mock.contexts).toEqual([getItem('Second')]);
        expect(focus).toHaveBeenCalledWith({ preventScroll: true });
      });

      it.each([
        [
          'takes no options',
          () => jest.spyOn(document.documentElement, 'style', 'get').mockReturnValue({}),
        ],
        [
          "rejects block: 'nearest'",
          () => {
            HTMLElement.prototype.scrollIntoView = () => {
              throw new TypeError();
            };
          },
        ],
      ])('an arrow key lets focus scroll the page where scrollIntoView %s', async (_, setup) => {
        const user = await renderAndOpen();
        setup();
        const focus = jest.spyOn(HTMLElement.prototype, 'focus');
        await user.keyboard('{ArrowDown}');
        expect(focus.mock.contexts).toEqual([getItem('Second')]);
        expect(focus).toHaveBeenCalledWith({ preventScroll: false });
      });

      it('focusing an option does not close the menu on the scroll it causes', async () => {
        await renderAndOpen();
        jest.useFakeTimers();
        getItem('Disabled').focus();
        // Smooth scrolling keeps firing scroll events after the focus
        for (let i = 0; i < 3; i++) {
          jest.advanceTimersToNextFrame();
          document.dispatchEvent(new Event('scroll'));
        }
        expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
        jest.advanceTimersToNextFrame();
        jest.advanceTimersToNextFrame();
        document.dispatchEvent(new Event('scroll'));
        expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
      });

      it('a slow frame after focusing an option does not close the menu on the scroll it causes', async () => {
        await renderAndOpen();
        jest.useFakeTimers({ doNotFake: ['requestAnimationFrame', 'cancelAnimationFrame'] });
        getItem('Disabled').focus();
        jest.advanceTimersByTime(500);
        document.dispatchEvent(new Event('scroll'));
        expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
      });

      it.each(['wheel', 'touchmove'])(
        'a scroll after %s closes the menu right after focusing an option',
        async name => {
          await renderAndOpen();
          jest.useFakeTimers();
          getItem('Disabled').focus();
          document.dispatchEvent(new Event(name));
          document.dispatchEvent(new Event('scroll'));
          expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
        },
      );
    });

    it('hovering inside a KModal moves focus to the option', async () => {
      const user = await renderAndOpenInside('<KModal title="Modal"><Harness /></KModal>');
      await user.hover(getItem('Second'));
      await flush();
      expect(getItem('Second')).toHaveFocus();
    });
  });

  describe('open and close', () => {
    it('the first option keeps focus once the open transition ends', async () => {
      await renderAndOpen();
      finishOpenTransition();
      expect(getItem('First')).toHaveFocus();
    });

    it('reopening a scrolled menu scrolls its list back to the first option', async () => {
      const user = await renderAndOpen();
      screen.getByRole('menu').scrollTop = 1000;
      await user.keyboard('{Escape}');
      await openFromTrigger(user);
      expect(screen.getByRole('menu').scrollTop).toBe(0);
    });

    it.each([
      ['opening', false],
      ['reopening', true],
    ])('%s focuses the first option without scrolling the page', async (_, reopen) => {
      const focus = jest.spyOn(HTMLElement.prototype, 'focus');
      const user = await renderAndOpen();
      if (reopen) {
        await user.keyboard('{Escape}');
        focus.mockClear();
        await openFromTrigger(user);
      }
      const call = focus.mock.contexts.lastIndexOf(getItem('First'));
      expect(focus.mock.calls[call]).toEqual([{ preventScroll: true }]);
    });

    it('reopening scrolls the first option into view after the menu is repositioned', async () => {
      const user = await renderAndOpen();
      const first = getItem('First');
      await user.keyboard('{Escape}');
      const events = [];
      const { popperInstance } = getTrigger()._tippy;
      const update = popperInstance.update;
      popperInstance.update = () => {
        events.push('reposition');
        update();
      };
      HTMLElement.prototype.scrollIntoView = jest.fn(function () {
        events.push(this);
      });
      runFramesLikeABrowser();
      await user.click(getTrigger());
      await waitFor(() => expect(events).toContain(first));
      expect(events.slice(0, events.indexOf(first))).toContain('reposition');
    });

    it('opening scrolls the first option into view at once, whatever the page scroll-behavior', async () => {
      await renderAndOpen();
      const reveal = HTMLElement.prototype.scrollIntoView;
      await waitFor(() => expect(reveal).toHaveBeenCalled());
      expect(reveal.mock.contexts).toEqual([getItem('First')]);
      expect(reveal).toHaveBeenCalledWith({ block: 'nearest', behavior: 'instant' });
    });

    it('opening does not scroll the page where scrollIntoView takes no options', async () => {
      jest.spyOn(document.documentElement, 'style', 'get').mockReturnValue({});
      await renderAndOpen();
      await flush(50);
      expect(HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled();
    });

    it('the scroll that opening causes does not close the menu', async () => {
      HTMLElement.prototype.scrollIntoView = jest.fn(() =>
        setTimeout(() => document.dispatchEvent(new Event('scroll'))),
      );
      await renderAndOpen();
      await waitFor(() => expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled());
      await flush(50);
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
    });

    it.each([
      [
        "rejects block: 'nearest'",
        () => {
          HTMLElement.prototype.scrollIntoView = () => {
            throw new TypeError();
          };
        },
      ],
      ['is not implemented', () => delete HTMLElement.prototype.scrollIntoView],
    ])('opens where scrollIntoView %s', async (_, setup) => {
      setup();
      const onError = jest.spyOn(console, 'error').mockImplementation(() => {});
      await renderAndOpen();
      await flush(50);
      expect(onError).not.toHaveBeenCalled();
    });

    it('unmounting right after opening logs no error', async () => {
      const onError = jest.spyOn(console, 'error').mockImplementation(() => {});
      const { unmount } = render(Harness);
      await flush();
      getTrigger().click();
      await waitFor(() => expect(getTrigger()).toHaveAttribute('aria-expanded', 'true'));
      unmount();
      await flush(100);
      expect(onError).not.toHaveBeenCalled();
    });

    it('the trigger reports a menu popup, expanded while open', async () => {
      await renderAndOpen();
      expect(getTrigger()).toHaveAttribute('aria-haspopup', 'menu');
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
    });

    it('the trigger is not described by the menu', async () => {
      await renderAndOpen();
      finishOpenTransition();
      expect(getTrigger()).not.toHaveAttribute('aria-describedby');
    });

    it.each([
      ['{Escape}', 'First'],
      ['{Escape}', 'Link'],
      ['{Enter}', 'First'],
      ['[Space]', 'First'],
    ])('%s on %s closes and focuses the trigger', async (key, name) => {
      const user = await renderAndOpen();
      getItem(name).focus();
      await user.keyboard(key);
      expect(getTrigger()).toHaveFocus();
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    // Firefox clicks a button on any Space keyup, so selecting on keydown reopens the menu
    it('Space selects on release, not on press', async () => {
      const user = await renderAndOpen();
      await user.keyboard('[Space>]');
      expect(getItem('First')).toHaveFocus();
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
      await user.keyboard('[/Space]');
      expect(getTrigger()).toHaveFocus();
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    it('Space released on an option it was not pressed on does not select', async () => {
      const user = await renderAndOpen();
      await user.keyboard('[Space>]');
      getItem('Second').focus();
      await user.keyboard('[/Space]');
      expect(getItem('Second')).toHaveFocus();
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
    });

    it.each(['{Enter}', '[Space]'])('%s on a link option follows the link', async key => {
      const user = await renderAndOpen();
      const onClick = jest.fn(event => event.preventDefault());
      getItem('Link').addEventListener('click', onClick);
      getItem('Link').focus();
      await user.keyboard(key);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    // The browser's click keeps Ctrl/Shift/Meta; user-event fires no click while Ctrl is held
    it('Enter on a link option leaves activation to the browser', async () => {
      await renderAndOpen();
      const event = pressKey(getItem('Link'), 'Enter', { ctrlKey: true });
      expect(event.defaultPrevented).toBe(false);
    });

    it.each(['{Enter}', '[Space]'])('%s on a disabled option leaves the menu open', async key => {
      const user = await renderAndOpen();
      getItem('Disabled').focus();
      await user.keyboard(key);
      expect(getItem('Disabled')).toHaveFocus();
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
    });

    it('opens a menu with only a divider', async () => {
      const user = userEvent.setup();
      render(Harness, { props: { options: [{ type: 'divider' }] } });
      await openMenu(getTrigger());
      finishOpenTransition();
      await flush(50);
      expect(HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled();
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Escape}');
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    it('Escape after a pause keeps the keyboard focus ring', async () => {
      const user = await openWithKeyboard();
      await flush(350);
      await user.keyboard('{Escape}');
      expect(getTrigger()).toHaveFocus();
      expect(document.body).toHaveAttribute('modality', 'keyboard');
    });

    it('Escape does not emit close', async () => {
      const onClose = jest.fn();
      const user = await renderAndOpen({ onClose });
      await user.keyboard('{Escape}');
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
      expect(onClose).not.toHaveBeenCalled();
    });

    it('Escape focuses the trigger when opening did not focus it', async () => {
      const user = userEvent.setup();
      render(Harness);
      preventFocusOnClick(getTrigger());
      await user.click(getTrigger());
      expect(getTrigger()).not.toHaveFocus();
      await waitFor(() => expect(getItem('First')).toHaveFocus());
      await user.keyboard('{Escape}');
      expect(getTrigger()).toHaveFocus();
    });

    it('Escape focuses the element focused before opening when the trigger cannot take focus', async () => {
      const user = userEvent.setup();
      render({
        template: `
          <div>
            <button>Before</button>
            <button>Options<KDropdownMenu :options="['First']" /></button>
          </div>
        `,
      });
      const before = screen.getByRole('button', { name: 'Before' });
      const trigger = screen.getByRole('button', { name: /Options/ });
      before.focus();
      preventFocusOnClick(trigger);
      await user.click(trigger);
      await waitFor(() => expect(getItem('First')).toHaveFocus());
      trigger.disabled = true;
      await user.keyboard('{Escape}');
      expect(before).toHaveFocus();
    });

    it('Escape focuses the trigger when opening did not focus it inside a KModal', async () => {
      const user = userEvent.setup();
      render({ components: { Harness }, template: '<KModal title="Modal"><Harness /></KModal>' });
      await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());
      preventFocusOnClick(getTrigger());
      await user.click(getTrigger());
      await waitFor(() => expect(getItem('First')).toHaveFocus());
      await user.keyboard('{Escape}');
      expect(getTrigger()).toHaveFocus();
    });

    it.each([
      ['alone', '{Escape}'],
      ['with another key released first', '{ArrowDown>}{Escape>}{/ArrowDown}{/Escape}'],
    ])('Escape %s inside a KModal leaves the modal open', async (_, keys) => {
      const onCancel = jest.fn();
      const user = await renderAndOpenInside(
        '<KModal title="Modal" @cancel="onCancel"><Harness /></KModal>',
        { methods: { onCancel } },
      );
      await user.keyboard(keys);
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
      expect(onCancel).not.toHaveBeenCalled();
      await user.keyboard('{Escape}');
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('Escape does not reach document keydown listeners', async () => {
      const onKeyDown = jest.fn();
      document.addEventListener('keydown', onKeyDown);
      const user = await renderAndOpen();
      await user.keyboard('{Escape}');
      document.removeEventListener('keydown', onKeyDown);
      expect(onKeyDown).not.toHaveBeenCalled();
    });

    it('clicking a text field while open closes and leaves focus there', async () => {
      const user = await renderAndOpenInside('<div><Harness /><input aria-label="Input"></div>');
      const input = getInput();
      await user.click(input);
      expect(input).toHaveFocus();
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    it.each([
      ['focused', () => {}],
      ['left unfocused', preventFocusOnClick],
    ])(
      'clicking an element that does not take focus focuses the trigger that opening %s',
      async (_, prepareTrigger) => {
        const user = userEvent.setup();
        render({
          components: { Harness },
          template: '<div><Harness /><button @mousedown.prevent>Unfocusable</button></div>',
        });
        prepareTrigger(getTrigger());
        await openFromTrigger(user);
        await user.click(screen.getByRole('button', { name: 'Unfocusable' }));
        expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
        expect(getTrigger()).toHaveFocus();
      },
    );

    it('clicking an element that stops click propagation closes', async () => {
      const user = await renderAndOpenInside(
        '<div><Harness /><button @click.stop>Stopper</button></div>',
      );
      await user.click(screen.getByRole('button', { name: 'Stopper' }));
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    it('clicking the trigger while open closes', async () => {
      const user = await renderAndOpen();
      await user.click(getTrigger());
      await waitFor(() => expect(getTrigger()).toHaveAttribute('aria-expanded', 'false'));
      await flush(100);
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    // user-event tabs from the keydown target, browsers from where the handler left focus
    it('Tab closes with focus on the trigger before the default action', async () => {
      await renderAndOpen();
      expect(pressKey(getItem('First'), 'Tab').defaultPrevented).toBe(false);
      expect(getTrigger()).toHaveFocus();
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('context menu', () => {
    const ContextHarness = {
      template: `
        <div>
          <button>Before</button>
          <p data-testid="area">Area<KDropdownMenu isContextMenu :options="['First', 'Second']" /></p>
          <input aria-label="Input">
          <button @click.stop>Stopper</button>
        </div>
      `,
    };

    const getArea = () => screen.getByTestId('area');

    async function rightClickArea({ focusBefore = false } = {}) {
      const user = userEvent.setup();
      render(ContextHarness);
      if (focusBefore) {
        screen.getByRole('button', { name: 'Before' }).focus();
      }
      await rightClick(getArea());
      await waitFor(() => expect(getItem('First')).toHaveFocus());
      return user;
    }

    async function pointerRightClickArea(coords) {
      const user = userEvent.setup();
      render(ContextHarness);
      await user.pointer({ keys: '[MouseRight]', target: getArea(), coords });
      await waitFor(() => expect(getItem('First')).toHaveFocus());
      return user;
    }

    it('Escape returns focus to what had it before the right-click', async () => {
      const user = await rightClickArea({ focusBefore: true });
      await user.keyboard('{Escape}');
      expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();
    });

    it('Escape focuses the area when nothing had focus before the right-click', async () => {
      const user = await rightClickArea();
      await user.keyboard('{Escape}');
      expect(getArea()).toHaveFocus();
      expect(getArea()).toHaveAttribute('aria-expanded', 'false');
    });

    it('Tab closes with focus on the area before the default action', async () => {
      await rightClickArea({ focusBefore: true });
      expect(pressKey(getItem('First'), 'Tab').defaultPrevented).toBe(false);
      expect(getArea()).toHaveFocus();
    });

    it('Tab leaves focus on the element inside the area that had it before the right-click', async () => {
      render({
        template: `
          <div data-testid="area">
            <button>Inner before</button>
            <button>Inner</button>
            <KDropdownMenu isContextMenu :options="['First']" />
          </div>
        `,
      });
      const inner = screen.getByRole('button', { name: 'Inner' });
      inner.focus();
      await rightClick(inner);
      await waitFor(() => expect(getItem('First')).toHaveFocus());
      pressKey(getItem('First'), 'Tab');
      expect(inner).toHaveFocus();
    });

    it.each(['{Escape}', '{Tab}'])('%s then clicking elsewhere leaves focus there', async key => {
      const user = await pointerRightClickArea();
      await user.keyboard(key);
      const input = getInput();
      await user.click(input);
      expect(input).toHaveFocus();
    });

    it('clicking a text field while open closes and leaves focus there', async () => {
      const user = await rightClickArea({ focusBefore: true });
      const input = getInput();
      await user.click(input);
      expect(input).toHaveFocus();
      expect(getArea()).toHaveAttribute('aria-expanded', 'false');
    });

    it('clicking an element that stops click propagation closes', async () => {
      const user = await rightClickArea();
      await user.click(screen.getByRole('button', { name: 'Stopper' }));
      expect(getArea()).toHaveAttribute('aria-expanded', 'false');
    });

    it('clicking the area while open closes', async () => {
      const user = await rightClickArea();
      await user.click(getArea());
      expect(getArea()).toHaveAttribute('aria-expanded', 'false');
    });

    it('a later scroll or Escape leaves focus where the user moved it', async () => {
      const user = await pointerRightClickArea({ clientX: 40, clientY: 30 });
      await user.keyboard('{Escape}');
      const input = getInput();
      await user.click(input);
      document.dispatchEvent(new Event('scroll'));
      await user.keyboard('{Escape}');
      expect(input).toHaveFocus();
    });

    it('right-clicking another area while open returns Escape focus to that area', async () => {
      const user = userEvent.setup();
      render({
        template: `
          <div>
            <p data-testid="area">Area<KDropdownMenu isContextMenu :options="['First']" /></p>
            <p data-testid="other">Other<KDropdownMenu isContextMenu :options="['Another']" /></p>
          </div>
        `,
      });
      await user.pointer({ keys: '[MouseRight]', target: getArea() });
      await waitFor(() => expect(getItem('First')).toHaveFocus());
      const other = screen.getByTestId('other');
      await user.pointer({ keys: '[MouseRight]', target: other });
      await waitFor(() => expect(getItem('Another')).toHaveFocus());
      await user.keyboard('{Escape}');
      expect(other).toHaveFocus();
    });
  });
});

describe('KDropdownMenu closePopover', () => {
  const Host = {
    components: { KDropdownMenu },
    template: `
      <button>
        Menu
        <KDropdownMenu
          ref="menu"
          :options="['Option A', 'Option B']"
          @close="$emit('close')"
        />
      </button>
    `,
    mounted() {
      menu = this.$refs.menu;
    },
  };

  it('closes an open menu and emits close', async () => {
    const { emitted } = render(Host);
    const trigger = getHostTrigger();
    await openMenu(trigger);

    menu.closePopover();

    expect(emitted().close).toHaveLength(1);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(getMenu()).not.toBeVisible();
  });

  it('resets aria-expanded when closed right after opening', async () => {
    render(Host);
    const trigger = getHostTrigger();
    await flush();

    trigger.click();
    menu.closePopover();
    await flush();
    await new Promise(resolve => requestAnimationFrame(resolve));

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(getMenu()).not.toContainElement(document.activeElement);
  });

  it('emits close when an option is selected', async () => {
    const { emitted } = render(Host);
    await openMenu(getHostTrigger());

    await userEvent.click(screen.getByText('Option A'));

    expect(emitted().close).toHaveLength(1);
  });

  it('does nothing when the menu is closed', async () => {
    const { emitted } = render(Host);
    await flush();

    menu.closePopover();

    expect(emitted().close).toBeUndefined();
  });

  it('does nothing after the menu is closed by Escape', async () => {
    const { emitted } = render(Host);
    const trigger = getHostTrigger();
    await openMenu(trigger);
    fireEvent.keyDown(document, { key: 'Escape', keyCode: 27 });
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));

    menu.closePopover();

    expect(emitted().close).toBeUndefined();
  });

  it('ignores closePopover calls from close handlers', async () => {
    const { emitted } = render(Host, { listeners: { close: () => menu.closePopover() } });
    await openMenu(getHostTrigger());

    menu.closePopover();

    expect(emitted().close).toHaveLength(1);
  });

  it('emits close while the menu is still open', async () => {
    let expandedInHandler;
    render(Host, {
      listeners: {
        close: () => {
          expandedInHandler = getHostTrigger().getAttribute('aria-expanded');
        },
      },
    });
    await openMenu(getHostTrigger());

    menu.closePopover();

    expect(expandedInHandler).toBe('true');
  });

  it.each([
    ['closePopover', () => menu.closePopover()],
    ['Escape', () => fireEvent.keyDown(document, { key: 'Escape', keyCode: 27 })],
    [
      'scroll',
      () => {
        fireEvent.wheel(document);
        fireEvent.scroll(document);
      },
    ],
    [
      'option selection',
      () =>
        fireEvent.keyDown(screen.getByText('Option A').closest('li'), {
          key: 'Enter',
          keyCode: 13,
        }),
    ],
  ])('reopens a context menu at the same position after %s', async (_, close) => {
    const area = renderContextMenu();
    await flush();

    await rightClick(area);
    await flush();
    await close();
    await flush();
    expect(getMenu()).not.toBeVisible();

    await rightClick(area);
  });

  it.each([
    ['a select handler', 'select', user => user.click(getItem('First'))],
    ['Enter in a select handler', 'select', user => user.keyboard('{Enter}')],
    ['Enter in a close handler', 'close', user => user.keyboard('{Enter}')],
    ['a tab handler', 'tab', () => pressKey(getItem('First'), 'Tab')],
    ['Tab in a close handler', 'close', () => pressKey(getItem('First'), 'Tab')],
    [
      'the caller before closePopover',
      'none',
      () => {
        getInput().focus();
        menu.closePopover();
      },
    ],
  ])('keeps focus moved by %s', async (_, handledEvent, act) => {
    const user = await renderAndOpen(
      { handledEvent },
      {
        components: { KDropdownMenu },
        props: { handledEvent: { type: String, required: true } },
        template: `
          <div>
            <KButton text="Options" hasDropdown>
              <template #menu>
                <KDropdownMenu
                  ref="menu"
                  :options="['First']"
                  v-on="{ [handledEvent]: focusInput }"
                />
              </template>
            </KButton>
            <input ref="input" aria-label="Input">
          </div>
        `,
        mounted() {
          menu = this.$refs.menu;
        },
        methods: {
          focusInput() {
            this.$refs.input.focus();
          },
        },
      },
    );

    await act(user);

    expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    expect(getInput()).toHaveFocus();
  });

  it('keeps focus moved by a select handler after a context menu closes', async () => {
    const area = renderContextMenu({
      select: () => menu.$nextTick(() => screen.getByRole('button', { name: 'Outside' }).focus()),
    });
    await flush();
    screen.getByRole('button', { name: 'Before' }).focus();
    await rightClick(area);
    fireEvent.transitionEnd(document.querySelector('.tippy-tooltip'));
    await flush();

    await userEvent.click(screen.getByText('Option A'));
    await flush();

    expect(screen.getByRole('button', { name: 'Outside' })).toHaveFocus();
  });

  it('stops handling Escape after a context menu closes', async () => {
    const area = renderContextMenu();
    await flush();
    screen.getByRole('button', { name: 'Before' }).focus();
    await rightClick(area);
    fireEvent.transitionEnd(document.querySelector('.tippy-tooltip'));
    await flush();
    fireEvent.keyDown(document, { key: 'Escape', keyCode: 27 });
    await flush();

    screen.getByRole('button', { name: 'Outside' }).focus();
    fireEvent.keyDown(document, { key: 'Escape', keyCode: 27 });

    expect(screen.getByRole('button', { name: 'Outside' })).toHaveFocus();
  });

  it('does not throw before the popover renders', () => {
    render(Host);

    expect(() => menu.closePopover()).not.toThrow();
  });
});

const MenuInButton = {
  components: { KDropdownMenu },
  props: {
    position: { type: String, default: undefined },
    constrainToScrollParent: { type: Boolean, default: true },
  },
  template: `
    <button>
      Menu
      <KDropdownMenu
        ref="menu"
        :options="['One']"
        :position="position"
        :constrainToScrollParent="constrainToScrollParent"
      />
    </button>
  `,
  mounted() {
    menu = this.$refs.menu;
  },
};

function renderMenu({ position, constrainToScrollParent, isRtl = false } = {}) {
  return render(MenuInButton, { props: { position, constrainToScrollParent }, mocks: { isRtl } });
}

async function openAndGetPlacement() {
  await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
  const popper = document.querySelector('.tippy-popper[x-placement]');
  const placement = popper.getAttribute('x-placement');
  await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
  return placement;
}

async function getPlacement(options) {
  const { unmount } = renderMenu(options);
  const placement = await openAndGetPlacement();
  unmount();
  return placement;
}

describe('KDropdownMenu position', () => {
  describe('popover placement', () => {
    it('opens below, aligned to the left edge, by default in LTR', async () => {
      expect(await getPlacement()).toBe('bottom-start');
    });

    it('uses the default placement when position is null', async () => {
      expect(await getPlacement({ position: null })).toBe('bottom-start');
    });

    it('opens below, aligned to the right edge, by default in RTL', async () => {
      expect(await getPlacement({ isRtl: true })).toBe('bottom-end');
    });

    it('applies a position changed after mount', async () => {
      const { updateProps, unmount } = renderMenu({ position: 'top left' });
      expect(await openAndGetPlacement()).toBe('top-end');
      await updateProps({ position: 'bottom center' });
      expect(await openAndGetPlacement()).toBe('bottom');
      unmount();
    });

    it.each([
      ['bottom left', 'bottom-end', 'bottom-start'],
      ['bottom center', 'bottom', 'bottom'],
      ['bottom right', 'bottom-start', 'bottom-end'],
      ['top left', 'top-end', 'top-start'],
      ['top center', 'top', 'top'],
      ['top right', 'top-start', 'top-end'],
      ['left top', 'left-end', 'right-end'],
      ['left middle', 'left', 'right'],
      ['left bottom', 'left-start', 'right-start'],
      ['right top', 'right-end', 'left-end'],
      ['right middle', 'right', 'left'],
      ['right bottom', 'right-start', 'left-start'],
    ])('maps "%s" to %s in LTR and %s in RTL', async (position, ltr, rtl) => {
      expect(await getPlacement({ position })).toBe(ltr);
      expect(await getPlacement({ position, isRtl: true })).toBe(rtl);
    });
  });

  describe('context menu placement', () => {
    it('leaves the host element getBoundingClientRect alone', async () => {
      const area = renderContextMenu();
      const getRect = () => {
        const { left, top, width, height } = area.getBoundingClientRect();
        return { left, top, width, height };
      };
      await flush();
      const rectBefore = getRect();

      await rightClick(area);

      expect(getRect()).toEqual(rectBefore);
    });

    const ContextMenuWithPosition = {
      components: { KDropdownMenu },
      props: {
        position: { type: String, default: undefined },
        constrainToScrollParent: { type: Boolean, default: true },
      },
      template: `
        <div data-testid="area">
          <KDropdownMenu
            ref="menu"
            isContextMenu
            :options="['One']"
            :position="position"
            :constrainToScrollParent="constrainToScrollParent"
          />
        </div>
      `,
      mounted() {
        menu = this.$refs.menu;
      },
    };

    const getPopperReferenceRect = () => {
      const { left, top, width, height } =
        menu.$refs.popover.tip.popperInstance.reference.getBoundingClientRect();
      return { left, top, width, height };
    };

    const cursorRect = { left: 10, top: 10, width: 0, height: 0 };

    it('positions the menu against the cursor', async () => {
      render(ContextMenuWithPosition);
      await flush();

      await rightClick(screen.getByTestId('area'));

      expect(getPopperReferenceRect()).toEqual(cursorRect);
    });

    it('keeps positioning against the cursor after position changes while open', async () => {
      const { updateProps } = render(ContextMenuWithPosition, { props: { position: 'top left' } });
      await flush();
      await rightClick(screen.getByTestId('area'));

      await updateProps({ position: 'bottom center' });

      expect(getPopperReferenceRect()).toEqual(cursorRect);
    });

    it.each([true, false])(
      'keeps an open context menu at the cursor when constrainToScrollParent changes from %s',
      async constrainToScrollParent => {
        const { updateProps } = render(ContextMenuWithPosition, {
          props: { constrainToScrollParent },
        });
        await flush();
        await rightClick(screen.getByTestId('area'));

        await updateProps({ constrainToScrollParent: !constrainToScrollParent });

        expect(getPopperReferenceRect()).toEqual(cursorRect);
      },
    );
  });

  describe('overflow boundary', () => {
    const getBoundary = () =>
      menu.$refs.popover.tip.popperInstance.options.modifiers.preventOverflow.boundariesElement;

    const expectViewportBoundary = () => {
      const boundary = getBoundary();
      expect(boundary).toBeInTheDocument();
      expect(getComputedStyle(boundary)).toMatchObject({
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      });
    };

    it('bounds a menu not constrained to its scroll parent by the viewport inside scrollbars', async () => {
      renderMenu({ constrainToScrollParent: false });
      await openMenu(getHostTrigger());

      expectViewportBoundary();
    });

    it('switches to the viewport boundary when constrainToScrollParent becomes false', async () => {
      const { updateProps } = renderMenu({ constrainToScrollParent: true });
      await flush();
      await updateProps({ constrainToScrollParent: false });
      await openMenu(getHostTrigger());

      expectViewportBoundary();
    });

    it('switches to the scroll parent boundary when constrainToScrollParent becomes true', async () => {
      const { updateProps } = renderMenu({ constrainToScrollParent: false });
      await flush();
      await updateProps({ constrainToScrollParent: true });
      await openMenu(getHostTrigger());

      expect(getBoundary()).toBe('scrollParent');
      expect(menu.$refs.popover.tip.popperInstance.options.modifiers.hide.enabled).toBe(true);
    });
  });
});
