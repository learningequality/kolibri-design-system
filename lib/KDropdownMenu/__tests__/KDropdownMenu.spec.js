import { nextTick } from 'vue';
import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KDropdownMenu from '../index.vue';

const Host = {
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

async function openMenu(trigger) {
  await userEvent.click(trigger);
  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
}

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
  jest.restoreAllMocks();
});

describe('KDropdownMenu keyboard navigation', () => {
  async function openWithMiddleFocused() {
    render(Host);
    await openMenu(screen.getByRole('button', { name: /Menu/ }));
    option('Middle').focus();
  }

  it.each([
    ['Home', 'First'],
    ['End', 'Last'],
  ])('%s focuses %s, skipping the divider', async (key, label) => {
    await openWithMiddleFocused();

    await userEvent.keyboard(`{${key}}`);

    await waitFor(() => expect(option(label)).toHaveFocus());
  });

  it.each([
    ['Home', 'First'],
    ['End', 'Last'],
  ])('%s with focus outside the options focuses %s', async (key, label) => {
    render(Host);
    const trigger = screen.getByRole('button', { name: /Menu/ });
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
    await openMenu(screen.getByRole('button', { name: /Menu/ }));
    const field = screen.getByLabelText('Filter');
    // jsdom doesn't implement isContentEditable
    Object.defineProperty(field, 'isContentEditable', { value: name === 'contenteditable' });
    field.focus();
    const event = pressKey(field, key);
    await nextTick();

    expect(event.defaultPrevented).toBe(false);
    expect(field).toHaveFocus();
  });
});

describe('KDropdownMenu opening from the trigger', () => {
  async function renderFocusedTrigger(component = Host) {
    render(component);
    // the popover renders a tick after mount
    await nextTick();
    const trigger = screen.getByRole('button', { name: /Menu/ });
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
    render({
      components: { KDropdownMenu },
      template: `
        <div>
          <button>Before</button>
          <button>Menu<KDropdownMenu :options="['First', 'Last']" /></button>
        </div>
      `,
    });
    await nextTick();
    const trigger = screen.getByRole('button', { name: /Menu/ });
    await openMenu(trigger);
    await userEvent.keyboard('{Tab}');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    trigger.focus();
    const before = screen.getByRole('button', { name: 'Before' });
    const beforeFocus = jest.fn();
    before.addEventListener('focus', beforeFocus);

    // the closed popover still has a size while it fades out
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
