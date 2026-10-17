import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import { render, screen, fireEvent } from '@testing-library/vue';
import KModal from '../KModal';
import KSelect from '../KSelect';
import KDropdownMenu from '../KDropdownMenu';
import KOverlay from '../KOverlay';
import UiPopover from '../keen/UiPopover';
import UiTooltip from '../keen/UiTooltip';
import useKLiveRegion from '../composables/useKLiveRegion';

describe('KModal component', () => {
  it(`smoke test`, () => {
    const wrapper = shallowMount(KModal);
    expect(wrapper.exists()).toBe(true);
  });

  describe('props', () => {
    it(`a title should appear`, () => {
      const title = 'test title';
      const wrapper = shallowMount(KModal, {
        propsData: {
          title: title,
        },
      });
      expect(wrapper.find('.title').text()).toEqual(title);
    });
    it(`text should appear on the submit button`, () => {
      const submitText = 'hello';
      const onClick = jest.fn();
      const wrapper = shallowMount(KModal, {
        propsData: {
          submitText: submitText,
        },
        listeners: { submit: onClick },
      });
      expect(wrapper.findComponent({ name: 'KButton' }).props().text).toEqual(submitText);
    });

    it(`text should appear on the close button`, () => {
      const cancelText = 'goodbye';
      const onClick = jest.fn();
      const wrapper = shallowMount(KModal, {
        propsData: {
          cancelText: cancelText,
        },
        listeners: { cancel: onClick },
      });
      expect(wrapper.findComponent({ name: 'KButton' }).props().text).toEqual(cancelText);
    });

    it(`submit button is disabled if submitDisabled is true`, () => {
      const submitText = 'hello';
      const onClick = jest.fn();
      const wrapper = shallowMount(KModal, {
        propsData: {
          submitText: submitText,
          submitDisabled: true,
        },
        listeners: { submit: onClick },
      });
      expect(wrapper.findComponent({ name: 'KButton' }).props().disabled).toBeTruthy();
    });

    it(`cancel button is disabled if cancelDisabled is true`, () => {
      const cancelText = 'goodbye';
      const onClick = jest.fn();
      const wrapper = shallowMount(KModal, {
        propsData: {
          cancelText: cancelText,
          cancelDisabled: true,
        },
        listeners: { cancel: onClick },
      });
      expect(wrapper.findComponent({ name: 'KButton' }).props().disabled).toBeTruthy();
    });

    it(`size of modal can be determined with string prop`, () => {
      const wrapper = shallowMount(KModal, {
        propsData: {
          size: 'large',
        },
      });
      expect(wrapper.find('.modal').element).toHaveStyle({ width: '100%' });
    });

    it(`size of modal can be determined by integer prop`, () => {
      const wrapper = shallowMount(KModal, {
        propsData: {
          size: 789,
        },
      });
      expect(wrapper.find('.modal').element).toHaveStyle({ width: '789px' });
    });

    it(`error message is in a visually hidden span if hasError is true`, () => {
      const error = 'watch out for the error';
      const wrapper = shallowMount(KModal, {
        propsData: {
          hasError: true,
          errorMessage: error,
        },
      });
      expect(wrapper.find('.visuallyhidden').element).toBeTruthy();
      expect(wrapper.find('.visuallyhidden').text()).toContain(error);
    });
  });
  describe('slots', () => {
    it(`content is displayed in default <slot>`, () => {
      const slot = '<div><p>main content appears here</p></div>';
      const wrapper = shallowMount(KModal, {
        slots: {
          default: slot,
        },
      });
      expect(wrapper.find('.content').text()).toContain('main content appears here');
    });
    it(`alternative content is displayed below main content if actions <slot> is used`, () => {
      const slot = '<div><p>main content appears here</p></div>';
      const actionsSlot = '<div><p class="actionsSlot">actions content</p></div>';
      const wrapper = shallowMount(KModal, {
        slots: {
          default: slot,
          actions: actionsSlot,
        },
      });
      expect(wrapper.find('.content').text()).toContain('main content appears here');
      expect(wrapper.find('.actions').text()).toContain('actions content');
    });
  });

  describe('modal semantics', () => {
    let fixtures;

    function addFixture(parent = document.body) {
      const el = document.createElement('div');
      parent.appendChild(el);
      fixtures.push(el);
      return el;
    }

    // Lets MutationObserver callbacks run
    function tick() {
      return new Promise(resolve => setTimeout(resolve));
    }

    function isHiddenFromAT(el) {
      return Boolean(el.closest('[aria-hidden="true"]'));
    }

    function renderModal(props = {}, slot = 'modal content') {
      return render(KModal, { props: { title: 'Modal', ...props }, slots: { default: slot } });
    }

    beforeEach(() => {
      fixtures = [];
    });

    afterEach(() => {
      fixtures.forEach(el => el.remove());
    });

    it(`exposes the dialog as modal`, () => {
      renderModal();
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it(`hides background content while open and restores it on close`, () => {
      const app = addFixture();
      const { unmount } = renderModal();
      expect(app).toHaveAttribute('aria-hidden', 'true');
      unmount();
      expect(app).not.toHaveAttribute('aria-hidden');
    });

    it(`leaves nothing hidden after modals open and close one after another`, () => {
      const app = addFixture();
      [{ size: 'small' }, { size: 500 }, { cancelText: 'Cancel' }].forEach(props => {
        const { unmount } = renderModal(props);
        expect(app).toHaveAttribute('aria-hidden', 'true');
        expect(document.documentElement).toHaveStyle({ overflow: 'hidden' });
        unmount();
        expect(document.querySelectorAll('[aria-hidden]')).toHaveLength(0);
        expect(document.documentElement).not.toHaveStyle({ overflow: 'hidden' });
      });
    });

    it(`restores a previous aria-hidden value on close`, () => {
      const app = addFixture();
      app.setAttribute('aria-hidden', 'false');
      const { unmount } = renderModal();
      expect(app).toHaveAttribute('aria-hidden', 'true');
      unmount();
      expect(app).toHaveAttribute('aria-hidden', 'false');
    });

    it(`does not hide the dialog or any of its ancestors`, () => {
      renderModal();
      expect(isHiddenFromAT(screen.getByRole('dialog'))).toBe(false);
    });

    it(`keeps background content hidden and restores its latest aria-hidden value`, async () => {
      const app = addFixture();
      const { unmount } = renderModal();
      app.setAttribute('aria-hidden', 'false');
      await tick();
      expect(app).toHaveAttribute('aria-hidden', 'true');
      unmount();
      expect(app).toHaveAttribute('aria-hidden', 'false');
    });

    it(`restores aria-hidden="true" set on background content while open`, async () => {
      const app = addFixture();
      const { unmount } = renderModal();
      app.setAttribute('aria-hidden', 'true');
      await tick();
      unmount();
      expect(app).toHaveAttribute('aria-hidden', 'true');
    });

    it(`restores an aria-hidden value changed in the same update that closes it`, async () => {
      const { updateProps } = render(
        {
          components: { KModal },
          props: ['open'],
          template: `<div>
            <main :aria-hidden="open ? 'true' : 'false'">app</main>
            <KModal v-if="open" title="Modal" />
          </div>`,
        },
        { props: { open: true } },
      );
      await updateProps({ open: false });
      expect(screen.getByText('app')).toHaveAttribute('aria-hidden', 'false');
    });

    it(`does not append popovers to dialogs other than an open KModal`, async () => {
      const dialog = addFixture();
      dialog.setAttribute('role', 'dialog');
      dialog.setAttribute('aria-modal', 'true');
      const options = [{ label: 'Apple', value: 'apple' }];
      render(
        {
          components: { KSelect },
          data: () => ({ options }),
          template: `<KSelect label="Fruit" :options="options" :value="{}" />`,
        },
        { container: dialog },
      );
      await tick();
      await fireEvent.click(screen.getByText('Fruit'));
      await tick();
      expect(dialog.contains(screen.getByText('Apple'))).toBe(false);
    });

    it(`moves the live region into the dialog while open`, () => {
      const liveRegion = document.getElementById('k-live-region');
      const { unmount } = renderModal();
      expect(screen.getByRole('dialog').contains(liveRegion)).toBe(true);
      unmount();
      expect(liveRegion.parentNode).toBe(document.body);
    });

    it(`rewrites a pending live region message after moving the region, then clears it`, () => {
      jest.useFakeTimers();
      try {
        const { sendPoliteMessage } = useKLiveRegion();
        sendPoliteMessage('Moved to trash');
        jest.advanceTimersByTime(300);
        const { unmount } = renderModal();
        expect(window.politeRegionEl).toBeEmptyDOMElement();
        jest.advanceTimersByTime(100);
        expect(window.politeRegionEl).toHaveTextContent(/^Moved to trash$/);
        jest.advanceTimersByTime(350);
        expect(window.politeRegionEl).toBeEmptyDOMElement();
        unmount();
        jest.advanceTimersByTime(200);
        expect(window.politeRegionEl).toBeEmptyDOMElement();
      } finally {
        window.politeRegionEl.textContent = '';
        jest.useRealTimers();
      }
    });

    it(`appends popovers opened from the modal to the dialog`, async () => {
      const options = [{ label: 'Apple', value: 'apple' }];
      render({
        components: { KModal, KSelect },
        data: () => ({ options }),
        template: `<KModal title="Modal">
          <KSelect label="Fruit" :options="options" :value="{}" />
        </KModal>`,
      });
      await tick();
      await fireEvent.click(screen.getByText('Fruit'));
      await tick();
      const option = screen.getByText('Apple');
      expect(screen.getByRole('dialog').contains(option)).toBe(true);
      expect(isHiddenFromAT(option)).toBe(false);
    });

    it.each([
      ['UiPopover', UiPopover, 'click'],
      ['UiTooltip', UiTooltip, 'focus'],
    ])(`appends a %s rendered with the modal to the dialog`, async (name, Popover, event) => {
      render({
        components: { KModal, Popover },
        template: `<KModal title="Modal">
          <button type="button">Open<Popover>Popover content</Popover></button>
        </KModal>`,
      });
      await tick();
      await fireEvent[event](screen.getByText('Open'));
      await tick();
      expect(screen.getByRole('dialog', { name: 'Modal' })).toContainElement(
        screen.getByText('Popover content'),
      );
    });

    describe('keys', () => {
      const ENTER = { key: 'Enter', code: 'Enter', keyCode: 13 };
      const ESCAPE = { key: 'Escape', code: 'Escape', keyCode: 27 };

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(() => {
        jest.useRealTimers();
      });

      function renderReadyModal() {
        const result = renderModal();
        jest.advanceTimersByTime(500);
        // Not slot content: KModal's form stops Enter from it
        return { ...result, modal: screen.getByRole('heading', { name: 'Modal' }) };
      }

      it.each([
        [ESCAPE, 'cancel', 'the content'],
        [ESCAPE, 'cancel', 'the dialog itself'],
        [ENTER, 'submit', 'the content'],
        [ENTER, 'submit', 'the dialog itself'],
      ])(`on %p emits %s from %s`, async (key, event, from) => {
        const { emitted, modal } = renderReadyModal();
        const target = from === 'the content' ? modal : screen.getByRole('dialog');
        await fireEvent.keyUp(target, key);
        expect(emitted()[event]).toHaveLength(1);
      });

      async function openMenuInModal() {
        const listeners = { submit: jest.fn(), cancel: jest.fn(), select: jest.fn() };
        render({
          components: { KModal, KDropdownMenu },
          data: () => ({ options: [{ label: 'Rename', value: 'rename' }] }),
          methods: listeners,
          template: `<KModal title="Modal" @submit="submit" @cancel="cancel">
            <button type="button">Menu<KDropdownMenu :options="options" @select="select" /></button>
          </KModal>`,
        });
        jest.advanceTimersByTime(500);
        // KDropdownMenu renders its popover once mounted
        await nextTick();
        await fireEvent.click(screen.getByText('Menu'));
        jest.runAllTimers();
        return listeners;
      }

      it(`selects a dropdown menu item on Enter without submitting`, async () => {
        const { select, submit } = await openMenuInModal();
        const item = screen.getByText('Rename');
        // The menu's popover is also a `dialog`
        expect(screen.getByRole('dialog', { name: 'Modal' }).contains(item)).toBe(true);
        expect(isHiddenFromAT(item)).toBe(false);
        await fireEvent.keyDown(item, ENTER);
        await fireEvent.keyUp(item, ENTER);
        expect(select).toHaveBeenCalledTimes(1);
        expect(submit).not.toHaveBeenCalled();
      });

      it(`closes a dropdown menu on Escape without cancelling`, async () => {
        const { cancel } = await openMenuInModal();
        const trigger = screen.getByText('Menu');
        await fireEvent.keyDown(screen.getByText('Rename'), ESCAPE);
        await fireEvent.keyUp(trigger, ESCAPE);
        expect(cancel).not.toHaveBeenCalled();

      it(`closes a select dropdown on Escape without cancelling`, async () => {
        const cancel = jest.fn();
        render({
          components: { KModal, KSelect },
          data: () => ({ options: [{ label: 'Apple', value: 'apple' }] }),
          methods: { cancel },
          template: `<KModal title="Modal" @cancel="cancel">
            <KSelect label="Fruit" :options="options" :value="{}" />
          </KModal>`,
        });
        jest.advanceTimersByTime(500);
        await nextTick();
        const label = screen.getByText('Fruit');
        await fireEvent.click(label);
        jest.runAllTimers();
        await fireEvent.keyDown(label, ESCAPE);
        await fireEvent.keyUp(label, ESCAPE);
        jest.runAllTimers();
        expect(cancel).not.toHaveBeenCalled();
        await fireEvent.keyDown(label, ESCAPE);
        await fireEvent.keyUp(label, ESCAPE);
        expect(cancel).toHaveBeenCalledTimes(1);
      });
        await fireEvent.keyDown(trigger, ESCAPE);
        await fireEvent.keyUp(trigger, ESCAPE);
        expect(cancel).toHaveBeenCalledTimes(1);
      });
    });

    it(`focuses the dialog on open`, async () => {
      renderModal();
      await tick();
      expect(screen.getByRole('dialog')).toHaveFocus();
    });

    it(`hides background content for a modal appended to the overlay`, () => {
      const app = addFixture();
      renderModal({ appendToOverlay: true });
      const dialog = screen.getByRole('dialog');
      expect(document.getElementById('k-overlay').contains(dialog)).toBe(true);
      expect(app).toHaveAttribute('aria-hidden', 'true');
      expect(isHiddenFromAT(dialog)).toBe(false);
    });

    it(`exposes KOverlay content opened from an inline modal`, async () => {
      const overlayChild = addFixture(document.getElementById('k-overlay'));
      const { updateProps } = render(
        {
          components: { KModal, KOverlay },
          props: ['show'],
          template: `<KModal title="Modal">
            <KOverlay v-if="show"><div>overlay tip</div></KOverlay>
          </KModal>`,
        },
        { props: { show: false } },
      );
      expect(isHiddenFromAT(overlayChild)).toBe(true);
      await updateProps({ show: true });
      expect(isHiddenFromAT(screen.getByText('overlay tip'))).toBe(false);
    });

    it(`restores background content when a kept-alive modal is deactivated`, async () => {
      const Inner = { components: { KModal }, template: '<KModal title="Modal" />' };
      const Other = { template: '<div>Other</div>' };
      const { updateProps } = render(
        {
          components: { Inner, Other },
          props: ['showModal'],
          template: `<div><button>Header</button>
            <keep-alive><Inner v-if="showModal" /><Other v-else /></keep-alive></div>`,
        },
        { props: { showModal: true } },
      );
      expect(isHiddenFromAT(screen.getByText('Header'))).toBe(true);
      await updateProps({ showModal: false });
      expect(isHiddenFromAT(screen.getByText('Header'))).toBe(false);
      await updateProps({ showModal: true });
      expect(isHiddenFromAT(screen.getByText('Header'))).toBe(true);
    });

    it(`does not hide the snackbar or its wrapper`, () => {
      // Kolibri wraps `#coresnackbar` in an element with no id
      const wrapper = addFixture();
      const sibling = addFixture(wrapper);
      const snackbar = addFixture(wrapper);
      snackbar.id = 'coresnackbar';
      renderModal();
      expect(isHiddenFromAT(snackbar)).toBe(false);
      expect(sibling).toHaveAttribute('aria-hidden', 'true');
    });

    describe('stacked modals', () => {
      // Two open modals otherwise pull focus back and forth forever
      beforeEach(() => {
        jest.spyOn(HTMLElement.prototype, 'focus').mockImplementation(() => {});
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      function getDialog(title) {
        // Every KModal title has the same id, so `name` can't tell dialogs apart
        return screen.getByText(title).closest('[role="dialog"]');
      }

      function renderStack(template, props = {}) {
        return render({ components: { KModal }, props: Object.keys(props), template }, { props });
      }

      it.each([false, true])(
        `exposes a nested modal, not its parent (appendToOverlay: %s)`,
        appendToOverlay => {
          const app = addFixture();
          const { unmount } = renderStack(
            `<KModal title="Outer">
              <p>outer content</p>
              <KModal title="Inner" :appendToOverlay="${appendToOverlay}" />
            </KModal>`,
          );
          expect(isHiddenFromAT(getDialog('Inner'))).toBe(false);
          expect(isHiddenFromAT(screen.getByText('outer content'))).toBe(true);
          expect(app).toHaveAttribute('aria-hidden', 'true');
          unmount();
          expect(document.querySelector('[aria-hidden]')).toBeNull();
        },
      );

      it.each([
        ['inner', 'outer'],
        ['outer', 'inner'],
      ])(`restores a nested modal's background when %s closes first`, async (first, second) => {
        const app = addFixture();
        app.setAttribute('aria-hidden', 'false');
        const { updateProps } = renderStack(
          `<div>
            <button>Header</button>
            <KModal v-if="outer" title="Outer">
              <p>outer content</p>
              <KModal v-if="inner" title="Inner" />
            </KModal>
          </div>`,
          { outer: true, inner: true },
        );
        expect(isHiddenFromAT(getDialog('Inner'))).toBe(false);
        expect(isHiddenFromAT(screen.getByText('outer content'))).toBe(true);

        await updateProps({ [first]: false });
        if (first === 'inner') {
          expect(isHiddenFromAT(screen.getByText('outer content'))).toBe(false);
          expect(isHiddenFromAT(screen.getByText('Header'))).toBe(true);
          expect(app).toHaveAttribute('aria-hidden', 'true');
        }

        await updateProps({ [second]: false });
        expect(isHiddenFromAT(screen.getByText('Header'))).toBe(false);
        expect(app).toHaveAttribute('aria-hidden', 'false');
        expect(document.querySelectorAll('[aria-hidden]')).toHaveLength(1);
      });

      it(`exposes the remaining modal whichever one closes first`, async () => {
        const app = addFixture();
        const { updateProps } = renderStack(
          `<div>
            <KModal v-if="first" title="First" />
            <KModal v-if="second" title="Second" />
          </div>`,
          { first: true, second: true },
        );
        expect(isHiddenFromAT(getDialog('First'))).toBe(true);
        expect(isHiddenFromAT(getDialog('Second'))).toBe(false);

        await updateProps({ first: false });
        expect(isHiddenFromAT(getDialog('Second'))).toBe(false);
        expect(app).toHaveAttribute('aria-hidden', 'true');

        await updateProps({ second: false });
        expect(document.querySelector('[aria-hidden]')).toBeNull();
      });

      it(`exposes a modal opened inside content an earlier modal hid`, () => {
        const app = addFixture();
        renderStack(`<KModal title="First" />`);
        const { unmount } = render(
          { components: { KModal }, template: `<KModal title="Second" />` },
          { container: app },
        );
        expect(isHiddenFromAT(getDialog('Second'))).toBe(false);
        expect(isHiddenFromAT(getDialog('First'))).toBe(true);
        unmount();
        expect(isHiddenFromAT(getDialog('First'))).toBe(false);
        expect(app).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });
});
