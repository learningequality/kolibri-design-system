import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
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

async function renderAndOpen(props, component = Harness) {
  const user = userEvent.setup();
  render(component, { props });
  await user.click(getTrigger());
  await waitFor(() => expect(getItem('First')).toHaveFocus());
  return user;
}

function renderAndOpenInside(template, options = {}) {
  return renderAndOpen({}, { components: { Harness }, template, ...options });
}

const getInput = () => screen.getByRole('textbox', { name: 'Input' });

let menu;

const getMenu = () => screen.getByRole('menu', { hidden: true });

const flush = () => new Promise(resolve => setTimeout(resolve));

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

// jsdom never fires transitionend, which is what runs UiPopover's onShown
function finishOpenTransition() {
  fireEvent.transitionEnd(document.querySelector('.tippy-tooltip'));
}

function recordRepositionAndFocus(tip, item) {
  const events = [];
  const { popperInstance } = tip;
  const update = popperInstance.update;
  popperInstance.update = () => {
    events.push('reposition');
    update();
  };
  item.addEventListener('focus', () => events.push('focus'), { once: true });
  return events;
}

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
      const menu = screen.getByRole('menu');
      expect(menu.children.length).toBe(OPTIONS.length);
      Array.from(menu.children).forEach(child => expect(child.tagName).toBe('LI'));
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

    it.each(['Home', 'End', 'PageUp', 'PageDown', ' '])(
      '%p does not scroll the page',
      async key => {
        await renderAndOpen();
        const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
        getItem('Second').dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
      },
    );

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

      function focusOffscreenOption() {
        const item = getItem('Disabled');
        item.getBoundingClientRect = () => ({
          top: innerHeight,
          bottom: innerHeight + 1,
          left: 0,
          right: 0,
        });
        item.focus();
      }

      it('focusing an option does not close the menu on the scroll it causes', async () => {
        await renderAndOpen();
        jest.useFakeTimers();
        focusOffscreenOption();
        // Smooth scrolling keeps firing scroll events after the focus
        for (let i = 0; i < 3; i++) {
          document.dispatchEvent(new Event('scroll'));
          jest.advanceTimersByTime(60);
        }
        expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
        jest.advanceTimersByTime(150);
        document.dispatchEvent(new Event('scroll'));
        expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
      });

      it('a scroll right after focusing an option in view closes the menu', async () => {
        await renderAndOpen();
        getItem('Second').focus();
        document.dispatchEvent(new Event('scroll'));
        expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
      });

      it.each(['wheel', 'touchmove'])(
        'a scroll after %s closes the menu right after focusing an option',
        async name => {
          await renderAndOpen();
          jest.useFakeTimers();
          focusOffscreenOption();
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

    it('reopening focuses the first option after the menu is repositioned', async () => {
      const user = await renderAndOpen();
      const first = getItem('First');
      await user.keyboard('{Escape}');
      const events = recordRepositionAndFocus(getTrigger()._tippy, first);
      await user.click(getTrigger());
      await waitFor(() => expect(first).toHaveFocus());
      expect(events[0]).toBe('reposition');
    });

    it('the trigger reports a menu popup, expanded while open', async () => {
      await renderAndOpen();
      expect(getTrigger()).toHaveAttribute('aria-haspopup', 'menu');
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
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
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      });
      getItem('Link').dispatchEvent(event);
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
      await user.click(getTrigger());
      await waitFor(() => expect(getTrigger()).toHaveAttribute('aria-expanded', 'true'));
      // With no option to focus, UiPopover's onShown focuses the popover
      finishOpenTransition();
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Escape}');
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    it('Escape after a pause keeps the keyboard focus ring', async () => {
      const user = await openWithKeyboard();
      // trackInputModality forgets a key after 300 ms
      await new Promise(resolve => setTimeout(resolve, 350));
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
      // Safari and Firefox on macOS do not focus a clicked button
      getTrigger().addEventListener('mousedown', event => event.preventDefault());
      await user.click(getTrigger());
      expect(getTrigger()).not.toHaveFocus();
      await waitFor(() => expect(getItem('First')).toHaveFocus());
      await user.keyboard('{Escape}');
      expect(getTrigger()).toHaveFocus();
    });

    it('Escape inside a KModal leaves the modal open', async () => {
      const onCancel = jest.fn();
      const user = await renderAndOpenInside(
        '<KModal title="Modal" @cancel="onCancel"><Harness /></KModal>',
        { methods: { onCancel } },
      );
      await user.keyboard('{Escape}');
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

    // user-event tabs from the keydown target, browsers from where the handler left focus
    it('Tab closes with focus on the trigger before the default action', async () => {
      await renderAndOpen();
      fireEvent.keyDown(getItem('First'), { key: 'Tab' });
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
      fireEvent.contextMenu(getArea(), { clientX: 10, clientY: 10 });
      await waitFor(() => expect(getItem('First')).toHaveFocus());
      return user;
    }

    // Unlike fireEvent.contextMenu, a right-click focuses the area first
    async function pointerRightClickArea(coords) {
      const user = userEvent.setup();
      render(ContextHarness);
      await user.pointer({ keys: '[MouseRight]', target: getArea(), coords });
      await waitFor(() => expect(getItem('First')).toHaveFocus());
      return user;
    }

    it('reopening focuses the first option after the menu is repositioned', async () => {
      const user = await rightClickArea();
      const first = getItem('First');
      await user.keyboard('{Escape}');
      const events = recordRepositionAndFocus(getArea()._tippy, first);
      fireEvent.contextMenu(getArea(), { clientX: 10, clientY: 10 });
      await waitFor(() => expect(first).toHaveFocus());
      expect(events[0]).toBe('reposition');
    });

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
      fireEvent.keyDown(getItem('First'), { key: 'Tab' });
      expect(getArea()).toHaveFocus();
    });

    it.each(['{Escape}', '{Tab}'])('%s then clicking elsewhere leaves focus there', async key => {
      const user = await pointerRightClickArea();
      await user.keyboard(key);
      const input = getInput();
      await user.click(input);
      expect(input).toHaveFocus();
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

  const getHostTrigger = () => screen.getByRole('button', { name: /Menu/ });

  async function openMenu(trigger) {
    await userEvent.click(trigger);
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
  }

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
    ['scroll', () => fireEvent.scroll(document)],
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
  props: { position: { type: String, default: undefined } },
  template: `
    <button>
      Menu
      <KDropdownMenu :options="['One']" :position="position" />
    </button>
  `,
};

function renderMenu({ position, isRtl = false } = {}) {
  return render(MenuInButton, { props: { position }, mocks: { isRtl } });
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
      props: { position: { type: String, default: undefined } },
      template: `
        <div data-testid="area">
          <KDropdownMenu ref="menu" isContextMenu :options="['One']" :position="position" />
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
  });
});
