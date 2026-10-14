import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import trackInputModality from '../../styles/trackInputModality';

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

async function renderAndOpen(props) {
  const user = userEvent.setup();
  render(Harness, { props });
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

    it('focusing an option does not close the menu on the scroll it causes', async () => {
      await renderAndOpen();
      getItem('Disabled').focus();
      // Smooth scrolling keeps firing scroll events after the focus
      for (let i = 0; i < 3; i++) {
        document.dispatchEvent(new Event('scroll'));
        await new Promise(resolve => setTimeout(resolve, 60));
      }
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
      await new Promise(resolve => setTimeout(resolve, 150));
      document.dispatchEvent(new Event('scroll'));
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    });

    it('hovering inside a KModal moves focus to the option', async () => {
      const user = userEvent.setup();
      render({
        components: { Harness },
        template: '<KModal title="Modal"><Harness /></KModal>',
      });
      await user.click(getTrigger());
      await waitFor(() => expect(getItem('First')).toHaveFocus());
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
      const user = userEvent.setup();
      render({
        components: { Harness },
        methods: { onCancel },
        template: '<KModal title="Modal" @cancel="onCancel"><Harness /></KModal>',
      });
      await user.click(getTrigger());
      await waitFor(() => expect(getItem('First')).toHaveFocus());
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

    async function rightClickArea() {
      const user = userEvent.setup();
      render(ContextHarness);
      fireEvent.contextMenu(getArea(), { clientX: 10, clientY: 10 });
      await waitFor(() => expect(getItem('First')).toHaveFocus());
      return user;
    }

    it('Escape returns focus to what had it before the right-click', async () => {
      const user = userEvent.setup();
      render(ContextHarness);
      screen.getByRole('button', { name: 'Before' }).focus();
      fireEvent.contextMenu(getArea(), { clientX: 10, clientY: 10 });
      await waitFor(() => expect(getItem('First')).toHaveFocus());
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
      await rightClickArea();
      fireEvent.keyDown(getItem('First'), { key: 'Tab' });
      expect(getArea()).toHaveFocus();
    });
  });
});
