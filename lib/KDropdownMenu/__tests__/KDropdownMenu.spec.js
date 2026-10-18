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

const OptionsHost = menuHost([{ type: 'divider' }, 'First', 'Middle', 'Last', { type: 'divider' }]);

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
              @open="$emit('open')"
              @close="$emit('close')"
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

    expect(emitted().close).toHaveLength(1);
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
      await openMenu(getTrigger());

      expectViewportBoundary();
    });

    it('switches to the viewport boundary when constrainToScrollParent becomes false', async () => {
      const { updateProps } = renderMenu({ constrainToScrollParent: true });
      await flush();
      await updateProps({ constrainToScrollParent: false });
      await openMenu(getTrigger());

      expectViewportBoundary();
    });

    it('switches to the scroll parent boundary when constrainToScrollParent becomes true', async () => {
      const { updateProps } = renderMenu({ constrainToScrollParent: false });
      await flush();
      await updateProps({ constrainToScrollParent: true });
      await openMenu(getTrigger());

      expect(getBoundary()).toBe('scrollParent');
      expect(menu.$refs.popover.tip.popperInstance.options.modifiers.hide.enabled).toBe(true);
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

function menuHost(options, listeners = '') {
  return {
    components: { KDropdownMenu },
    data: () => ({ options }),
    template: `<button>Menu<KDropdownMenu :options="options" ${listeners} /></button>`,
  };
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

// jsdom has no layout, so every clientWidth/clientHeight is 0
function mockLayout() {
  jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100);
  jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(100);
}

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('KDropdownMenu keyboard navigation', () => {
  beforeEach(mockLayout);

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
    ['textarea', '<textarea aria-label="Filter">abc</textarea>'],
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
    await flush();

    expect(event.defaultPrevented).toBe(false);
    expect(field).toHaveFocus();
  });

  it('End does not throw when the menu unmounts before focus moves', async () => {
    const { unmount } = render(OptionsHost);
    await openMenu(getTrigger());
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
    pressKey(option('Middle'), 'End');
    unmount();

    expect(() => jest.runOnlyPendingTimers()).not.toThrow();
  });

  it.each([
    [['ArrowDown', 'ArrowDown'], 'First'],
    [['ArrowUp', 'ArrowUp'], 'Last'],
    [['End', 'ArrowDown'], 'First'],
    [['Home', 'ArrowUp'], 'Last'],
  ])('%j from Middle, pressed before focus moves, lands on %s', async (keys, label) => {
    await openMenu(await renderTrigger());
    option('Middle').focus();
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
    keys.forEach(key => pressKey(document.activeElement, key));
    jest.runOnlyPendingTimers();

    expect(option(label)).toHaveFocus();
  });

  it.each([
    [['ArrowDown', 'Enter'], 'Middle'],
    [['ArrowDown', 'ArrowDown', 'Enter'], 'Last'],
    [['End', 'Enter'], 'Last'],
  ])('%j from First, pressed before focus moves, selects %s', async (keys, label) => {
    const select = jest.fn();
    render(menuHost(['First', 'Middle', 'Last'], `@select="o => $emit('select', o)"`), {
      listeners: { select },
    });
    await openMenu(getTrigger());
    option('First').focus();
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
    keys.forEach(key => pressKey(document.activeElement, key));

    expect(select.mock.calls).toEqual([[label]]);
  });

  it('Enter pressed before focus moves selects in browsers without KeyboardEvent.key', async () => {
    const select = jest.fn();
    render(menuHost(['First', 'Middle', 'Last'], `@select="o => $emit('select', o)"`), {
      listeners: { select },
    });
    await openMenu(getTrigger());
    option('First').focus();
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
    jest.spyOn(KeyboardEvent.prototype, 'key', 'get').mockReturnValue(undefined);
    pressKey(document.activeElement, 'ArrowDown', { keyCode: 40 });
    pressKey(document.activeElement, 'Enter', { keyCode: 13 });

    expect(select.mock.calls).toEqual([['Middle']]);
  });

  it('Enter pressed before focus leaves a link option does not follow the link', async () => {
    render(menuHost([{ label: 'Docs', href: '#docs' }, 'Middle', 'Last']));
    await openMenu(getTrigger());
    const docs = screen.getByText('Docs').closest('[role="menu-item"]');
    docs.focus();
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
    pressKey(docs, 'ArrowDown');
    const enter = pressKey(docs, 'Enter');

    expect(enter.defaultPrevented).toBe(true);
  });

  it('End pressed before focus leaves a header input focuses Last', async () => {
    render({
      components: { KDropdownMenu },
      template: `
        <button>
          Menu
          <KDropdownMenu :options="['First', 'Middle', 'Last']">
            <template #header><input aria-label="Filter" value="abc"></template>
          </KDropdownMenu>
        </button>
      `,
    });
    await openMenu(getTrigger());
    const field = screen.getByLabelText('Filter');
    field.focus();
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
    pressKey(field, 'ArrowDown');
    const end = pressKey(field, 'End');
    jest.runOnlyPendingTimers();

    expect(end.defaultPrevented).toBe(true);
    expect(option('Last')).toHaveFocus();
  });

  it('a step pending when Tab closes the menu does not refocus an option', async () => {
    await openMenu(await renderTrigger());
    option('First').focus();
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
    pressKey(option('First'), 'ArrowDown');
    pressKey(option('First'), 'Tab');
    jest.runOnlyPendingTimers();

    expect(option('Middle')).not.toHaveFocus();
  });

  it.each([
    ['ArrowUp', 'First', 'Last', ['First', 'Last', { label: 'Off', disabled: true }]],
    ['ArrowDown', 'Last', 'First', [{ label: 'Off', disabled: true }, 'First', 'Last']],
    ['ArrowDown', 'Last', 'First', ['First', 'Last', { label: 'Off', href: '#', disabled: true }]],
    ['ArrowUp', 'First', 'Last', [{ label: 'Off', href: '#', disabled: true }, 'First', 'Last']],
  ])('%s from %s wraps to %s past a disabled option', async (key, from, to, options) => {
    await openMenu(await renderTrigger(menuHost(options)));
    option(from).focus();

    await userEvent.keyboard(`{${key}}`);

    await waitFor(() => expect(option(to)).toHaveFocus());
  });
});

describe('KDropdownMenu opening from the trigger', () => {
  beforeEach(mockLayout);

  async function renderFocusedTrigger(component) {
    const trigger = await renderTrigger(component);
    trigger.focus();
    return trigger;
  }

  it.each([
    ['ArrowDown', 'First', 'a leading divider', undefined],
    ['ArrowUp', 'Last', 'a trailing divider', undefined],
    [
      'ArrowUp',
      'Last',
      'a trailing disabled link',
      menuHost(['First', 'Last', { label: 'Off', href: '#', disabled: true }]),
    ],
  ])('%s opens the menu focused on %s, skipping %s', async (key, label, _, component) => {
    const trigger = await renderFocusedTrigger(component);

    await userEvent.keyboard(`{${key}}`);
    await endOpenTransition(trigger);

    await waitFor(() => expect(option(label)).toHaveFocus());
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

  it('a click open keeps focus on the first option after the open transition ends', async () => {
    const trigger = await renderTrigger(menuHost(['First', 'Last']));
    await openMenu(trigger);
    await waitFor(() => expect(option('First')).toHaveFocus());

    await endOpenTransition(trigger);
    await nextTick();

    expect(option('First')).toHaveFocus();
  });

  it('a click after an ArrowUp open focuses the first option', async () => {
    const trigger = await renderFocusedTrigger(menuHost(['First', 'Last']));
    await userEvent.keyboard('{ArrowUp}');
    await waitFor(() => expect(option('Last')).toHaveFocus());
    await userEvent.keyboard('{Tab}');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));

    await openMenu(trigger);

    await waitFor(() => expect(option('First')).toHaveFocus());
  });

  it.each([
    ['ArrowDown', () => userEvent.keyboard('{ArrowDown}')],
    ['a click', trigger => userEvent.click(trigger)],
  ])('emits open when %s opens the menu', async (_, openWith) => {
    const onOpen = jest.fn();
    const trigger = await renderFocusedTrigger({
      ...menuHost(['First'], '@open="onOpen"'),
      methods: { onOpen },
    });

    await openWith(trigger);

    await waitFor(() => expect(onOpen).toHaveBeenCalledTimes(1));
  });

  it('emits open once per context menu open', async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const area = renderContextMenu({ open: onOpen, close: onClose });
    await rightClick(area);
    await flush();
    fireEvent.contextMenu(area, { clientX: 20, clientY: 20 });
    await flush();
    expect(onOpen).toHaveBeenCalledTimes(1);
    await flush();

    pressKey(document, 'Escape', { keyCode: 27 });
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    fireEvent.contextMenu(area, { clientX: 10, clientY: 10 });
    await flush();

    expect(onOpen).toHaveBeenCalledTimes(2);
  });

  it.each([
    ['ArrowDown', 'First'],
    ['ArrowUp', 'Last'],
  ])('%s on the trigger of an open menu focuses %s', async (key, label) => {
    const trigger = await renderFocusedTrigger({
      components: { KDropdownMenu },
      template: `
        <div>
          <button>Before</button>
          <button>Menu<KDropdownMenu :options="['First', 'Last']" /></button>
          <button>After</button>
        </div>
      `,
    });
    pressKey(trigger, 'ArrowDown');
    await endOpenTransition(trigger);
    trigger.focus();

    const event = pressKey(trigger, key);

    expect(event.defaultPrevented).toBe(true);
    await waitFor(() => expect(option(label)).toHaveFocus());
  });

  it.each([
    ['ArrowDown', 'First'],
    ['ArrowUp', 'Last'],
  ])('%s after a click on the menu padding focuses %s', async (key, label) => {
    const trigger = await renderFocusedTrigger(menuHost(['First', 'Middle', 'Last']));
    pressKey(trigger, 'ArrowDown');
    await waitFor(() => expect(option('First')).toHaveFocus());
    // Chromium focuses this tabindex=-1 wrapper on a click in the menu's padding
    const padding = getMenu().closest('.ui-popover > .ui-focus-container-content');
    padding.focus();

    const event = pressKey(padding, key);

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
    await flush();

    expect(event.defaultPrevented).toBe(false);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
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
    await flush();

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
      await flush();

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

describe('KDropdownMenu close event', () => {
  beforeEach(mockLayout);

  async function renderOpenMenu() {
    const onClose = jest.fn();
    const trigger = await renderTrigger({
      components: { KDropdownMenu },
      methods: { onClose },
      template: `
        <div>
          <button>Outside</button>
          <button>Menu<KDropdownMenu :options="['First']" @close="onClose" /></button>
        </div>
      `,
    });
    await openMenu(trigger);
    await flush();
    return { trigger, onClose };
  }

  it.each([
    ['an outside click', () => userEvent.click(screen.getByRole('button', { name: 'Outside' }))],
    ['Tab', () => userEvent.keyboard('{Tab}')],
  ])('emits close once on %s', async (_, closeWith) => {
    const { trigger, onClose } = await renderOpenMenu();

    await closeWith();

    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('stops handling arrow keys outside the menu once it closes', async () => {
    const trigger = await renderTrigger({
      components: { KDropdownMenu },
      template: `
        <div>
          <button>Menu<KDropdownMenu :options="['First', 'Last']" /></button>
          <button>After</button>
        </div>
      `,
    });
    await openMenu(trigger);
    await userEvent.keyboard('{Tab}');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    const after = screen.getByRole('button', { name: 'After' });
    after.focus();

    const event = pressKey(after, 'ArrowDown');
    await flush();

    expect(event.defaultPrevented).toBe(false);
    expect(after).toHaveFocus();
  });

  it('emits close once on Escape after closePopover right after opening', async () => {
    const { emitted } = render(Host);
    const trigger = getTrigger();
    await flush();

    trigger.click();
    menu.closePopover();
    await flush();
    pressKey(document.activeElement, 'Escape', { keyCode: 27 });
    await flush();

    expect(emitted().close).toHaveLength(1);
  });

  it('emits close once when a context menu closes on select', async () => {
    const onClose = jest.fn();
    await rightClick(renderContextMenu({ close: onClose }));

    await userEvent.click(option('Option A'));
    await flush();

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('emits close once when a selection unmounts the menu', async () => {
    const onClose = jest.fn();
    const trigger = await renderTrigger({
      components: { KDropdownMenu },
      data: () => ({ show: true }),
      methods: { onClose },
      template: `
        <div>
          <button v-if="show">
            Menu
            <KDropdownMenu :options="['First']" @close="onClose" @select="show = false" />
          </button>
        </div>
      `,
    });
    await openMenu(trigger);

    await userEvent.click(option('First'));
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /Menu/ })).not.toBeInTheDocument(),
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not emit close when an open menu unmounts', async () => {
    const onClose = jest.fn();
    const { updateProps } = render({
      components: { KDropdownMenu },
      props: { show: { type: Boolean, default: true } },
      methods: { onClose },
      template: `
        <div>
          <button v-if="show">Menu<KDropdownMenu :options="['First']" @close="onClose" /></button>
        </div>
      `,
    });
    await nextTick();
    await openMenu(getTrigger());

    await updateProps({ show: false });

    expect(onClose).not.toHaveBeenCalled();
  });
});
