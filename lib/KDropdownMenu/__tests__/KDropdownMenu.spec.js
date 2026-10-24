import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KDropdownMenu from '../index.vue';

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

const getTrigger = () => screen.getByRole('button', { name: /Menu/ });
const getMenu = () => screen.getByRole('menu', { hidden: true });

const flush = () => new Promise(resolve => setTimeout(resolve));

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

describe('KDropdownMenu closePopover', () => {
  it('closes an open menu and emits close', async () => {
    const { emitted } = render(Host);
    const trigger = getTrigger();
    await openMenu(trigger);

    menu.closePopover();

    expect(emitted().close).toHaveLength(1);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(getMenu()).not.toBeVisible();
  });

  it('resets aria-expanded when closed right after opening', async () => {
    render(Host);
    const trigger = getTrigger();
    await flush();

    trigger.click();
    menu.closePopover();
    await flush();

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(getMenu()).not.toContainElement(document.activeElement);
  });

  it('emits close when an option is selected', async () => {
    const { emitted } = render(Host);
    await openMenu(getTrigger());

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
    const trigger = getTrigger();
    await openMenu(trigger);
    fireEvent.keyDown(document, { key: 'Escape', keyCode: 27 });
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));

    menu.closePopover();

    expect(emitted().close).toBeUndefined();
  });

  it('ignores closePopover calls from close handlers', async () => {
    const { emitted } = render(Host, { listeners: { close: () => menu.closePopover() } });
    await openMenu(getTrigger());

    menu.closePopover();

    expect(emitted().close).toHaveLength(1);
  });

  it('emits close while the menu is still open', async () => {
    let expandedInHandler;
    render(Host, {
      listeners: {
        close: () => {
          expandedInHandler = getTrigger().getAttribute('aria-expanded');
        },
      },
    });
    await openMenu(getTrigger());

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

describe('KDropdownMenu', () => {
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
