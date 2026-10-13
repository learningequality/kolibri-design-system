import { nextTick } from 'vue';
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

const OptionsHost = {
  components: { KDropdownMenu },
  template: `
    <button>
      Menu
      <KDropdownMenu
        :options="[{ type: 'divider' }, 'First', 'Middle', 'Last', { type: 'divider' }]"
      />
    </button>
  `,
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

  it('returns focus to the element focused before a context menu reopened while open', async () => {
    const area = renderContextMenu();
    await flush();
    const before = screen.getByRole('button', { name: 'Before' });
    before.focus();
    await rightClick(area);
    await flush();
    fireEvent.transitionEnd(document.querySelector('.tippy-tooltip'));
    fireEvent.contextMenu(area, { clientX: 20, clientY: 20 });
    await flush();
    await flush();

    fireEvent.keyDown(document, { key: 'Escape', keyCode: 27 });
    await waitFor(() => expect(getMenu()).not.toBeVisible());

    expect(before).toHaveFocus();
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

const option = label => screen.getByText(label).closest('li');

function pressKey(element, key, modifiers = {}) {
  const event = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
    ...modifiers,
  });
  element.dispatchEvent(event);
  return event;
}

async function renderTrigger(component = OptionsHost) {
  render(component);
  await nextTick();
  return getTrigger();
}

// jsdom never ends tippy's open transition, which is when UiPopover refocuses
async function endOpenTransition(trigger) {
  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
  fireEvent.transitionEnd(document.querySelector('.tippy-tooltip'));
}

beforeEach(() => {
  // jsdom has no layout; KDropdownMenu reads the popover's size to know it is open
  jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100);
  jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(100);
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('KDropdownMenu keyboard navigation', () => {
  const edgeKeys = [
    ['Home', 'First'],
    ['End', 'Last'],
  ];

  it.each(edgeKeys)('%s focuses %s, skipping the divider', async (key, label) => {
    await openMenu(await renderTrigger());
    option('Middle').focus();

    await userEvent.keyboard(`{${key}}`);

    await waitFor(() => expect(option(label)).toHaveFocus());
  });

  it.each(edgeKeys)('%s with focus outside the options focuses %s', async (key, label) => {
    const trigger = await renderTrigger();
    await openMenu(trigger);
    trigger.focus();
    const event = pressKey(trigger, key);

    expect(event.defaultPrevented).toBe(true);
    await waitFor(() => expect(option(label)).toHaveFocus());
  });

  const headerFields = [
    ['input', '<input aria-label="Filter" value="abcdef">'],
    ['select', '<select aria-label="Filter"><option>a</option></select>'],
    ['contenteditable', '<div aria-label="Filter" contenteditable="true" tabindex="0">abc</div>'],
  ];

  it.each(
    ['Home', 'End'].flatMap(key => headerFields.map(([name, markup]) => [key, name, markup])),
  )('%s in a header %s stays in the field', async (key, name, markup) => {
    render({
      components: { KDropdownMenu },
      template: `
        <button>
          Menu
          <KDropdownMenu :options="['First', 'Last']">
            <template #header>${markup}</template>
          </KDropdownMenu>
        </button>
      `,
    });
    await openMenu(getTrigger());
    const field = screen.getByLabelText('Filter');
    // jsdom doesn't implement isContentEditable
    Object.defineProperty(field, 'isContentEditable', { value: name === 'contenteditable' });
    field.focus();
    const event = pressKey(field, key);
    await nextTick();

    expect(event.defaultPrevented).toBe(false);
    expect(field).toHaveFocus();
  });

  it('End does not throw when the menu unmounts before focus moves', async () => {
    const { unmount } = render(OptionsHost);
    await openMenu(getTrigger());
    jest.useFakeTimers();
    pressKey(option('Middle'), 'End');
    unmount();

    expect(() => jest.runOnlyPendingTimers()).not.toThrow();
    jest.useRealTimers();
  });
});

describe('KDropdownMenu opening from the trigger', () => {
  async function renderFocusedTrigger(component) {
    const trigger = await renderTrigger(component);
    trigger.focus();
    return trigger;
  }

  it('ArrowDown opens the menu with the first option focused', async () => {
    const trigger = await renderFocusedTrigger();

    await userEvent.keyboard('{ArrowDown}');
    await endOpenTransition(trigger);

    await waitFor(() => expect(option('First')).toHaveFocus());
  });

  it('ArrowUp opens the menu with the last option focused, skipping a trailing divider', async () => {
    const trigger = await renderFocusedTrigger();

    await userEvent.keyboard('{ArrowUp}');
    await endOpenTransition(trigger);

    await waitFor(() => expect(option('Last')).toHaveFocus());
  });

  it.each([
    ['{ArrowDown}', 'Middle'],
    ['{End}', 'Last'],
  ])('%s before the open transition ends keeps focus on %s', async (key, label) => {
    const trigger = await renderFocusedTrigger();
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(option('First')).toHaveFocus());
    await userEvent.keyboard(key);
    await waitFor(() => expect(option(label)).toHaveFocus());

    await endOpenTransition(trigger);
    await nextTick();

    expect(option(label)).toHaveFocus();
  });

  it('a click after an ArrowUp open focuses the first option', async () => {
    const trigger = await renderFocusedTrigger({
      components: { KDropdownMenu },
      template: `<button>Menu<KDropdownMenu :options="['First', 'Last']" /></button>`,
    });
    await userEvent.keyboard('{ArrowUp}');
    await waitFor(() => expect(option('Last')).toHaveFocus());
    await userEvent.keyboard('{Tab}');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));

    await openMenu(trigger);

    await waitFor(() => expect(option('First')).toHaveFocus());
  });

  const renderWithOnOpen = onOpen =>
    renderFocusedTrigger({
      components: { KDropdownMenu },
      methods: { onOpen },
      template: `<button>Menu<KDropdownMenu :options="['First']" @open="onOpen" /></button>`,
    });

  it.each([
    ['ArrowDown', () => userEvent.keyboard('{ArrowDown}')],
    ['a click', trigger => userEvent.click(trigger)],
  ])('emits open when %s opens the menu', async (_, openWith) => {
    const onOpen = jest.fn();
    const trigger = await renderWithOnOpen(onOpen);

    await openWith(trigger);

    await waitFor(() => expect(onOpen).toHaveBeenCalledTimes(1));
  });

  it.each([
    ['ArrowDown', 'First'],
    ['ArrowUp', 'Last'],
  ])('%s on the trigger of an open menu focuses %s', async (key, label) => {
    const trigger = await renderFocusedTrigger({
      components: { KDropdownMenu },
      template: `
        <div>
          <button>Menu<KDropdownMenu :options="['First', 'Last']" /></button>
          <button>After</button>
        </div>
      `,
    });
    pressKey(trigger, 'ArrowDown');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
    await endOpenTransition(trigger);
    trigger.focus();

    const event = pressKey(trigger, key);

    expect(event.defaultPrevented).toBe(true);
    await waitFor(() => expect(option(label)).toHaveFocus());
  });

  it('ArrowDown does not open a context menu', async () => {
    const trigger = await renderFocusedTrigger({
      components: { KDropdownMenu },
      template: `
        <button>
          Menu
          <KDropdownMenu isContextMenu :options="['First', 'Last']" />
        </button>
      `,
    });
    const event = pressKey(trigger, 'ArrowDown');
    await nextTick();

    expect(event.defaultPrevented).toBe(false);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('ArrowUp skips a trailing disabled link', async () => {
    const trigger = await renderFocusedTrigger({
      components: { KDropdownMenu },
      data: () => ({ options: ['First', 'Last', { label: 'Off', href: '#', disabled: true }] }),
      template: '<button>Menu<KDropdownMenu :options="options" /></button>',
    });

    await userEvent.keyboard('{ArrowUp}');
    await endOpenTransition(trigger);

    await waitFor(() => expect(option('Last')).toHaveFocus());
  });

  it('ArrowUp right after a close leaves focus out of a preceding sibling', async () => {
    const trigger = await renderFocusedTrigger({
      components: { KDropdownMenu },
      template: `
        <div>
          <button>Before</button>
          <button>Menu<KDropdownMenu :options="['First', 'Last']" /></button>
        </div>
      `,
    });
    await openMenu(trigger);
    await userEvent.keyboard('{Tab}');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    trigger.focus();
    const before = screen.getByRole('button', { name: 'Before' });
    const beforeFocus = jest.fn();
    before.addEventListener('focus', beforeFocus);

    await userEvent.keyboard('{ArrowUp}');
    await waitFor(() => expect(option('Last')).toHaveFocus());

    expect(beforeFocus).not.toHaveBeenCalled();
  });

  it('ArrowDown in a focusable child of the trigger does not open the menu', async () => {
    render({
      components: { KDropdownMenu },
      template: `
        <div>
          <textarea aria-label="Notes"></textarea>
          <KDropdownMenu :options="['First', 'Last']" />
        </div>
      `,
    });
    await nextTick();
    const textarea = screen.getByLabelText('Notes');
    textarea.focus();
    const event = pressKey(textarea, 'ArrowDown');
    await nextTick();

    expect(event.defaultPrevented).toBe(false);
    expect(textarea).toHaveFocus();
  });

  it('ArrowDown before the popover renders does not throw', () => {
    render(OptionsHost);

    expect(() => pressKey(getTrigger(), 'ArrowDown')).not.toThrow();
  });

  it('ArrowDown on the trigger does not scroll the page', async () => {
    const trigger = await renderFocusedTrigger();
    const event = pressKey(trigger, 'ArrowDown');

    expect(event.defaultPrevented).toBe(true);
  });

  it.each(['altKey', 'ctrlKey', 'metaKey', 'shiftKey'])(
    'ArrowDown with %s leaves the menu closed',
    async modifier => {
      const trigger = await renderFocusedTrigger();
      const event = pressKey(trigger, 'ArrowDown', { [modifier]: true });
      await nextTick();

      expect(event.defaultPrevented).toBe(false);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    },
  );

  it('ArrowDown on the trigger still reaches document listeners', async () => {
    const documentKeydown = jest.fn();
    document.addEventListener('keydown', documentKeydown);
    await renderFocusedTrigger();

    await userEvent.keyboard('{ArrowDown}');

    document.removeEventListener('keydown', documentKeydown);
    expect(documentKeydown).toHaveBeenCalledWith(expect.objectContaining({ key: 'ArrowDown' }));
  });
});
