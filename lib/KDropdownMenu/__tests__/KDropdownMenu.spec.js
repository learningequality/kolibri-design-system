import { nextTick } from 'vue';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KDropdownMenu from '../index.vue';
import UiPopover from '../../keen/UiPopover.vue';

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
  document
    .querySelector('.tippy-tooltip')
    .dispatchEvent(new Event('transitionend', { bubbles: true }));
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

  async function openWithMiddleFocused() {
    render(OptionsHost);
    await openMenu(getTrigger());
    option('Middle').focus();
  }

  it.each(edgeKeys)('%s focuses %s, skipping the divider', async (key, label) => {
    await openWithMiddleFocused();

    await userEvent.keyboard(`{${key}}`);

    await waitFor(() => expect(option(label)).toHaveFocus());
  });

  it.each(edgeKeys)('%s with focus outside the options focuses %s', async (key, label) => {
    render(OptionsHost);
    const trigger = getTrigger();
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

  it('ArrowDown on the trigger of an open menu does not reopen it', async () => {
    const open = jest.spyOn(UiPopover.methods, 'open');
    const trigger = await renderWithOnOpen(jest.fn());
    pressKey(trigger, 'ArrowDown');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
    trigger.focus();

    pressKey(trigger, 'ArrowDown');
    await nextTick();

    expect(open).toHaveBeenCalledTimes(1);
  });

  it('ArrowDown does not open a context menu', async () => {
    const ContextHost = {
      components: { KDropdownMenu },
      template: `
        <button>
          Menu
          <KDropdownMenu isContextMenu :options="['First', 'Last']" />
        </button>
      `,
    };
    const trigger = await renderFocusedTrigger(ContextHost);
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

describe('KDropdownMenu close event', () => {
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
    // UiPopover's Escape listener reads keyCode, which userEvent leaves at 0
    ['Escape', () => pressKey(document.activeElement, 'Escape', { keyCode: 27 })],
    ['a selection', () => userEvent.click(option('First'))],
    ['Tab', () => userEvent.keyboard('{Tab}')],
  ])('emits close once on %s', async (_, closeWith) => {
    const { trigger, onClose } = await renderOpenMenu();

    await closeWith();

    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('emits close once on Escape after closePopover right after opening', async () => {
    const { emitted } = render(Host);
    const trigger = getTrigger();
    await flush();

    trigger.click();
    menu.closePopover();
    await flush();
    await pressKey(document.activeElement, 'Escape', { keyCode: 27 });
    await flush();

    expect(emitted().close).toHaveLength(1);
  });

  it('emits close once when a context menu closes on select', async () => {
    const onClose = jest.fn();
    const trigger = await renderTrigger({
      components: { KDropdownMenu },
      methods: { onClose },
      template: `
        <button>
          Menu
          <KDropdownMenu isContextMenu :options="['First']" @close="onClose" />
        </button>
      `,
    });
    await userEvent.pointer({ keys: '[MouseRight]', target: trigger });
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));

    await userEvent.click(option('First'));
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

  it('emits open once per context menu open', async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    render({
      components: { KDropdownMenu },
      methods: { onOpen, onClose },
      template: `
        <div>
          <KDropdownMenu isContextMenu :options="['First']" @open="onOpen" @close="onClose" />
        </div>
      `,
    });
    await nextTick();
    const area = document.querySelector('[aria-haspopup="menu"]');
    fireEvent.contextMenu(area, { clientX: 10, clientY: 10 });
    await waitFor(() => expect(getMenu()).toBeVisible());
    await flush();
    fireEvent.contextMenu(area, { clientX: 20, clientY: 20 });
    await flush();
    expect(onOpen).toHaveBeenCalledTimes(1);

    pressKey(document, 'Escape', { keyCode: 27 });
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    fireEvent.contextMenu(area, { clientX: 10, clientY: 10 });
    await flush();

    expect(onOpen).toHaveBeenCalledTimes(2);
  });
});
