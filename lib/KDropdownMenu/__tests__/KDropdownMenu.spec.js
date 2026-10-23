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
