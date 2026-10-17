import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import { render, screen, fireEvent } from '@testing-library/vue';
import KModal from '../KModal';
import KSelect from '../KSelect';
import KDropdownMenu from '../KDropdownMenu';
import KMultiSelect from '../candidate/multiselect/KMultiSelect';
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
    const OPTIONS = [{ label: 'Apple', value: 'apple' }];
    let fixtures;

    function addFixture(parent = document.body) {
      const el = document.createElement('div');
      parent.appendChild(el);
      fixtures.push(el);
      return el;
    }

    function flushMutationObservers() {
      return new Promise(resolve => setTimeout(resolve));
    }

    function getPoliteRegion() {
      return document.querySelector('#k-live-region [aria-live="polite"]');
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

    it(`leaves nothing hidden after modals open and close one after another`, () => {
      const app = addFixture();
      [1, 2].forEach(() => {
        const { unmount } = renderModal();
        expect(app).toHaveAttribute('aria-hidden', 'true');
        unmount();
        expect(document.querySelectorAll('[aria-hidden]')).toHaveLength(0);
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

    it.each(['false', 'true'])(
      `keeps background content hidden and restores aria-hidden="%s" set while open`,
      async value => {
        const app = addFixture();
        const { unmount } = renderModal();
        app.setAttribute('aria-hidden', value);
        await flushMutationObservers();
        expect(app).toHaveAttribute('aria-hidden', 'true');
        unmount();
        expect(app).toHaveAttribute('aria-hidden', value);
      },
    );

    it(`restores the last of several aria-hidden changes made in one task`, async () => {
      const app = addFixture();
      const { unmount } = renderModal();
      app.setAttribute('aria-hidden', 'false');
      app.removeAttribute('aria-hidden');
      await flushMutationObservers();
      unmount();
      expect(app).not.toHaveAttribute('aria-hidden');
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
      render(
        {
          components: { KSelect },
          data: () => ({ options: OPTIONS }),
          template: `<KSelect label="Fruit" :options="options" :value="{}" />`,
        },
        { container: dialog },
      );
      await flushMutationObservers();
      await fireEvent.click(screen.getByText('Fruit'));
      await flushMutationObservers();
      expect(dialog).not.toContainElement(screen.getByText('Apple'));
    });

    it(`moves the live region into the dialog while open`, () => {
      const liveRegion = document.getElementById('k-live-region');
      const { unmount } = renderModal();
      expect(screen.getByRole('dialog')).toContainElement(liveRegion);
      unmount();
      expect(liveRegion.parentNode).toBe(document.body);
    });

    describe('pending live region message', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(() => {
        getPoliteRegion().textContent = '';
        jest.useRealTimers();
      });

      it(`is rewritten after moving the region, then cleared`, () => {
        const { sendPoliteMessage } = useKLiveRegion();
        sendPoliteMessage('Moved to trash');
        jest.advanceTimersByTime(300);
        const { unmount } = renderModal();
        expect(getPoliteRegion()).toBeEmptyDOMElement();
        jest.advanceTimersByTime(100);
        expect(getPoliteRegion()).toHaveTextContent(/^Moved to trash$/);
        jest.advanceTimersByTime(350);
        expect(getPoliteRegion()).toBeEmptyDOMElement();
        unmount();
        jest.advanceTimersByTime(200);
        expect(getPoliteRegion()).toBeEmptyDOMElement();
      });

      it(`is kept for the full time after moving the region`, () => {
        const { sendPoliteMessage } = useKLiveRegion();
        sendPoliteMessage('Moved to trash');
        jest.advanceTimersByTime(240);
        const { unmount } = renderModal();
        jest.advanceTimersByTime(100);
        expect(getPoliteRegion()).toHaveTextContent(/^Moved to trash$/);
        jest.advanceTimersByTime(340);
        expect(getPoliteRegion()).toHaveTextContent(/^Moved to trash$/);
        jest.advanceTimersByTime(10);
        expect(getPoliteRegion()).toBeEmptyDOMElement();
        unmount();
      });
    });

    it(`appends popovers opened from the modal to the dialog`, async () => {
      render({
        components: { KModal, KSelect },
        data: () => ({ options: OPTIONS }),
        template: `<KModal title="Modal">
          <KSelect label="Fruit" :options="options" :value="{}" />
        </KModal>`,
      });
      await flushMutationObservers();
      await fireEvent.click(screen.getByText('Fruit'));
      await flushMutationObservers();
      const option = screen.getByText('Apple');
      expect(screen.getByRole('dialog')).toContainElement(option);
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
      await flushMutationObservers();
      await fireEvent[event](screen.getByText('Open'));
      await flushMutationObservers();
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

      async function press(el, key) {
        await fireEvent.keyDown(el, key);
        await fireEvent.keyUp(el, key);
      }

      function renderReadyModal() {
        const result = renderModal();
        jest.advanceTimersByTime(500);
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

      async function renderInReadyModal(components, content, data) {
        const listeners = { submit: jest.fn(), cancel: jest.fn(), select: jest.fn() };
        render({
          components: { KModal, ...components },
          data: () => data,
          methods: listeners,
          template: `<KModal title="Modal" @submit="submit" @cancel="cancel">${content}</KModal>`,
        });
        jest.advanceTimersByTime(500);
        await nextTick();
        return listeners;
      }

      async function openMenuInModal() {
        const listeners = await renderInReadyModal(
          { KDropdownMenu },
          `<button type="button">Menu<KDropdownMenu :options="options" @select="select" /></button>`,
          { options: [{ label: 'Rename', value: 'rename' }] },
        );
        await fireEvent.click(screen.getByText('Menu'));
        jest.runAllTimers();
        return listeners;
      }

      it(`selects a dropdown menu item on Enter without submitting`, async () => {
        const { select, submit } = await openMenuInModal();
        const item = screen.getByText('Rename');
        expect(screen.getByRole('dialog', { name: 'Modal' })).toContainElement(item);
        expect(isHiddenFromAT(item)).toBe(false);
        await press(item, ENTER);
        expect(select).toHaveBeenCalledTimes(1);
        expect(submit).not.toHaveBeenCalled();
      });

      it(`closes a dropdown menu on Escape without cancelling`, async () => {
        const { cancel } = await openMenuInModal();
        const trigger = screen.getByText('Menu');
        await fireEvent.keyDown(screen.getByText('Rename'), ESCAPE);
        await fireEvent.keyUp(trigger, ESCAPE);
        expect(cancel).not.toHaveBeenCalled();
        await press(trigger, ESCAPE);
        expect(cancel).toHaveBeenCalledTimes(1);
      });

      it(`closes a select dropdown on Escape without cancelling`, async () => {
        const { cancel } = await renderInReadyModal(
          { KSelect },
          `<KSelect label="Fruit" :options="options" :value="{}" />`,
          { options: OPTIONS },
        );
        const label = screen.getByText('Fruit');
        await fireEvent.click(label);
        jest.runAllTimers();
        await press(label, ESCAPE);
        jest.runAllTimers();
        expect(cancel).not.toHaveBeenCalled();
        await press(label, ESCAPE);
        expect(cancel).toHaveBeenCalledTimes(1);
      });

      it(`closes a multiselect dropdown on Escape without cancelling`, async () => {
        const messages = Object.fromEntries(
          [
            'clearText',
            'open',
            'close',
            'clickable',
            'allOptionsSelected',
            'allOptionsDeselected',
            'optionDeselected',
          ].map(key => [key, () => key]),
        );
        const { cancel } = await renderInReadyModal(
          { KMultiSelect },
          `<KMultiSelect label="Fruit" :options="options" :value="[]" :messages="messages" />`,
          { options: OPTIONS, messages },
        );
        const input = screen.getByRole('combobox');
        await fireEvent.click(screen.getByRole('button', { name: 'open' }));
        expect(screen.getByRole('listbox')).toBeInTheDocument();
        await press(input, ESCAPE);
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        expect(cancel).not.toHaveBeenCalled();
        await press(input, ESCAPE);
        expect(cancel).toHaveBeenCalledTimes(1);
      });
    });

    it(`focuses the dialog on open`, async () => {
      renderModal();
      await flushMutationObservers();
      expect(screen.getByRole('dialog')).toHaveFocus();
    });

    it(`hides background content for a modal appended to the overlay`, () => {
      const app = addFixture();
      renderModal({ appendToOverlay: true });
      const dialog = screen.getByRole('dialog');
      expect(document.getElementById('k-overlay')).toContainElement(dialog);
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
      beforeEach(() => {
        jest.spyOn(HTMLElement.prototype, 'focus').mockImplementation(() => {});
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      function getDialog(title) {
        return screen.getByRole('dialog', { name: title, hidden: true });
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
