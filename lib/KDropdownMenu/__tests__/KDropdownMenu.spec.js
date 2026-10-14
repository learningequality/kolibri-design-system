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
    it('Down moves to the next option', async () => {
      const user = await renderAndOpen();
      await user.keyboard('{ArrowDown}');
      expect(getItem('Second')).toHaveFocus();
    });

    it('Down skips dividers', async () => {
      const user = await renderAndOpen();
      getItem('Second').focus();
      await user.keyboard('{ArrowDown}');
      expect(getItem('Link')).toHaveFocus();
    });

    it('Down reaches disabled options', async () => {
      const user = await renderAndOpen();
      getItem('Link').focus();
      await user.keyboard('{ArrowDown}');
      expect(getItem('Disabled')).toHaveFocus();
    });

    it('Down wraps from the last option to the first', async () => {
      const user = await renderAndOpen();
      getItem('Disabled').focus();
      await user.keyboard('{ArrowDown}');
      expect(getItem('First')).toHaveFocus();
    });

    it('Up skips dividers', async () => {
      const user = await renderAndOpen();
      getItem('Link').focus();
      await user.keyboard('{ArrowUp}');
      expect(getItem('Second')).toHaveFocus();
    });

    it('Up wraps from the first option to the last', async () => {
      const user = await renderAndOpen();
      await user.keyboard('{ArrowUp}');
      expect(getItem('Disabled')).toHaveFocus();
    });

    it('the focused option shows a focus outline', async () => {
      trackInputModality();
      document.dispatchEvent(new Event('DOMContentLoaded'));
      const user = userEvent.setup();
      render(Harness);
      await user.tab();
      await user.tab();
      await user.keyboard('{Enter}');
      await waitFor(() => expect(getItem('First')).toHaveFocus());
      await user.keyboard('{ArrowDown}');
      await waitFor(() =>
        expect(getItem('Second').closest('li')).toHaveStyle({ outlineStyle: 'solid' }),
      );
      expect(getItem('First').closest('li')).not.toHaveStyle({ outlineStyle: 'solid' });
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
      const user = await renderAndOpen(
        {},
        {
          components: { Harness },
          template: '<KModal title="Modal"><Harness /></KModal>',
        },
      );
      await user.hover(getItem('Second'));
      await new Promise(resolve => setTimeout(resolve));
      expect(getItem('Second')).toHaveFocus();
    });
  });

  describe('open and close', () => {
    it('the first option keeps focus once the open transition ends', async () => {
      await renderAndOpen();
      // jsdom never fires transitionend, which is what runs UiPopover's onShown
      document
        .querySelector('.tippy-tooltip')
        .dispatchEvent(new Event('transitionend', { bubbles: true }));
      expect(getItem('First')).toHaveFocus();
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
    ])('%s on %s closes and focuses the trigger', async (key, name) => {
      const user = await renderAndOpen();
      getItem(name).focus();
      await user.keyboard(key);
      expect(getTrigger()).toHaveFocus();
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    it('Enter on a link option follows the link', async () => {
      const user = await renderAndOpen();
      const onClick = jest.fn(event => event.preventDefault());
      getItem('Link').addEventListener('click', onClick);
      getItem('Link').focus();
      await user.keyboard('{Enter}');
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

    it('Enter on a disabled option leaves the menu open', async () => {
      const user = await renderAndOpen();
      getItem('Disabled').focus();
      await user.keyboard('{Enter}');
      expect(getItem('Disabled')).toHaveFocus();
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
    });

    it('opens a menu with only a divider', async () => {
      const user = userEvent.setup();
      render(Harness, { props: { options: [{ type: 'divider' }] } });
      await user.click(getTrigger());
      await waitFor(() => expect(getTrigger()).toHaveAttribute('aria-expanded', 'true'));
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Escape}');
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
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
      const user = await renderAndOpen(
        {},
        {
          components: { Harness },
          methods: { onCancel },
          template: '<KModal title="Modal" @cancel="onCancel"><Harness /></KModal>',
        },
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
  });
});

describe('KDropdownMenu closePopover', () => {
  let menu;

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
  const getMenu = () => screen.getByRole('menu', { hidden: true });

  const flush = () => new Promise(resolve => setTimeout(resolve));

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

  it('does not throw before the popover renders', () => {
    render(Host);

    expect(() => menu.closePopover()).not.toThrow();
  });
});
