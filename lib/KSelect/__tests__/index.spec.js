import { fireEvent, render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KSelect from '../index.vue';
import KModal from '../../KModal.vue';
import globalThemeState from '../../styles/globalThemeState';
import { themePalette, themeTokens } from '../../styles/theme';

const OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const OPTIONS_WITH_DISABLED = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana', disabled: true },
  { value: 'cherry', label: 'Cherry' },
];

const OPTIONS_WITH_DISABLED_EDGES = [
  { value: 'apricot', label: 'Apricot', disabled: true },
  ...OPTIONS,
  { value: 'date', label: 'Date', disabled: true },
];

const TYPEAHEAD_OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'blackberry', label: 'Blackberry', disabled: true },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const MANY_OPTIONS = Array.from({ length: 15 }, (_, i) => ({
  value: i,
  label: `Option ${i}`,
}));

const LABEL = 'Fruit';

function renderComponent({ props = {}, slots = {}, ...rest } = {}) {
  return render(KSelect, {
    props: { value: {}, options: OPTIONS, label: LABEL, ...props },
    slots,
    ...rest,
  });
}

const lastEmitted = (emitted, event) => emitted[event][emitted[event].length - 1];

const getCombobox = () => screen.getByRole('combobox');

const expectActive = label =>
  expect(getCombobox()).toHaveAttribute(
    'aria-activedescendant',
    screen.getByRole('option', { name: label }).id,
  );

function renderBetweenButtons(props = {}) {
  const onChange = jest.fn();
  render({
    render: h =>
      h('div', [
        h('button', 'Previous'),
        h(KSelect, {
          props: { value: {}, options: OPTIONS, label: LABEL, ...props },
          on: { change: onChange },
        }),
        h('button', 'Next'),
      ]),
  });
  return onChange;
}

async function openDropdown() {
  await userEvent.click(getCombobox());
}

describe('KSelect', () => {
  describe('combobox', () => {
    it('is named by the label prop', () => {
      renderComponent();
      expect(screen.getByRole('combobox', { name: LABEL })).toBeInTheDocument();
    });

    it('is named by the default slot', () => {
      renderComponent({ props: { label: null }, slots: { default: 'Slotted fruit' } });
      expect(screen.getByRole('combobox', { name: 'Slotted fruit' })).toBeInTheDocument();
    });

    it('aria-expanded follows the list and aria-controls points at the listbox', async () => {
      renderComponent();
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
      await openDropdown();
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'true');
      expect(getCombobox()).toHaveAttribute('aria-controls', screen.getByRole('listbox').id);
    });

    it('aria-activedescendant is the highlighted option only while open', async () => {
      renderComponent({ props: { value: OPTIONS[1] } });
      expect(getCombobox()).not.toHaveAttribute('aria-activedescendant');
      await openDropdown();
      expectActive('Banana');
      await userEvent.keyboard('{Escape}');
      expect(getCombobox()).not.toHaveAttribute('aria-activedescendant');
    });

    it('is invalid and described by invalidText when invalid', () => {
      renderComponent({ props: { invalid: true, invalidText: 'Pick one', help: 'Helpful' } });
      expect(getCombobox()).toHaveAttribute('aria-invalid', 'true');
      expect(getCombobox()).toHaveAccessibleDescription('Pick one');
    });

    it('is described by help when valid', () => {
      renderComponent({ props: { invalidText: 'Pick one', help: 'Helpful' } });
      expect(getCombobox()).not.toHaveAttribute('aria-invalid', 'true');
      expect(getCombobox()).toHaveAccessibleDescription('Helpful');
    });

    it('is not styled active after a list opened without focus closes', async () => {
      renderComponent();
      await new Promise(resolve => setTimeout(resolve));
      // As examples/KSelect/DropdownOpen.vue does
      await fireEvent(getCombobox(), new MouseEvent('click', { bubbles: false }));
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'true');
      await fireEvent.click(document.body);
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
      expect(screen.getByText(LABEL)).toHaveStyle({ color: themePalette().grey.v_700 });
    });

    it('stays styled active after Escape closes the list', async () => {
      renderComponent();
      await openDropdown();
      await userEvent.keyboard('{Escape}');
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
      expect(getCombobox()).toHaveFocus();
      expect(screen.getByText(LABEL)).toHaveStyle({ color: themeTokens().primary });
    });

    it('keeps focus after opening and after clicking an option', async () => {
      renderComponent();
      await openDropdown();
      expect(getCombobox()).toHaveFocus();
      await userEvent.click(screen.getByRole('option', { name: 'Banana' }));
      expect(getCombobox()).toHaveFocus();
    });

    it('closes the list without emitting change when focus moves elsewhere', async () => {
      const onChange = renderBetweenButtons();
      await openDropdown();
      await userEvent.keyboard('{ArrowDown}');
      screen.getByRole('button', { name: 'Next' }).focus();
      await new Promise(resolve => setTimeout(resolve));
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('listbox', () => {
    it('renders inside #k-overlay', async () => {
      renderComponent();
      await openDropdown();
      expect(document.getElementById('k-overlay')).toContainElement(screen.getByRole('listbox'));
    });

    it('mounts no options until the select is first used', async () => {
      renderComponent();
      await new Promise(resolve => setTimeout(resolve));
      expect(screen.queryAllByRole('option', { hidden: true })).toHaveLength(0);
    });

    it('opens with a highlight on a keydown that arrives before the first render', async () => {
      renderComponent();
      await new Promise(resolve => setTimeout(resolve));
      await fireEvent.keyDown(getCombobox(), { key: 'End' });
      await new Promise(resolve => setTimeout(resolve));
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'true');
      expectActive('Cherry');
    });

    it('opening and moving the highlight never scroll the page', async () => {
      const scrollIntoView = jest.fn();
      window.HTMLElement.prototype.scrollIntoView = scrollIntoView;
      globalThemeState.inputModality = 'keyboard';
      try {
        renderComponent({ props: { options: MANY_OPTIONS } });
        getCombobox().focus();
        await userEvent.keyboard('{ArrowDown}{ArrowDown}{End}');
      } finally {
        globalThemeState.inputModality = null;
        delete window.HTMLElement.prototype.scrollIntoView;
      }
      expect(scrollIntoView).not.toHaveBeenCalled();
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'true');
    });

    it('after opening with a click, arrow keys scroll to and mark the highlighted option', async () => {
      const rect = jest
        .spyOn(window.HTMLElement.prototype, 'getBoundingClientRect')
        .mockImplementation(function () {
          if (this.getAttribute('role') === 'listbox') return { top: 0, bottom: 50 };
          return this.textContent.includes('Option 1')
            ? { top: 60, bottom: 90 }
            : { top: 0, bottom: 30 };
        });
      try {
        renderComponent({ props: { options: MANY_OPTIONS.slice(0, 2) } });
        await openDropdown();
        await userEvent.keyboard('{ArrowDown}');
        await new Promise(resolve => setTimeout(resolve));
      } finally {
        rect.mockRestore();
      }
      expectActive('Option 1');
      expect(screen.getByRole('listbox').scrollTop).toBe(40);
      const highlight = { backgroundColor: themePalette().grey.v_200 };
      expect(screen.getByRole('option', { name: 'Option 1' })).toHaveStyle(highlight);
      expect(screen.getByRole('option', { name: 'Option 0' })).not.toHaveStyle(highlight);
    });

    it('is named by the displayed value when there is no label or placeholder, without warnings', async () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      try {
        renderComponent({ props: { label: null, value: OPTIONS[1] } });
        await openDropdown();
        expect(screen.getByRole('listbox')).toHaveAccessibleName('Banana');
        expect(warn).not.toHaveBeenCalled();
      } finally {
        warn.mockRestore();
      }
    });

    it('names options with numeric labels without prop warnings', async () => {
      const error = jest.spyOn(console, 'error').mockImplementation(() => {});
      try {
        renderComponent({ props: { options: [{ value: 1, label: 1 }] } });
        await openDropdown();
        expect(screen.getByRole('option', { name: '1' })).toBeInTheDocument();
        await userEvent.click(screen.getByRole('option', { name: '1' }));
        expect(getCombobox()).toHaveTextContent('1');
        expect(error).not.toHaveBeenCalled();
      } finally {
        error.mockRestore();
      }
    });

    it('marks exactly the selected option as selected', async () => {
      renderComponent({ props: { value: OPTIONS[2] } });
      await openDropdown();
      const selected = screen
        .getAllByRole('option')
        .filter(o => o.getAttribute('aria-selected') === 'true');
      expect(selected).toEqual([screen.getByRole('option', { name: 'Cherry' })]);
    });
  });

  describe('selection', () => {
    it('clicking an option emits change and input with the option', async () => {
      const { emitted } = renderComponent();
      await openDropdown();
      await userEvent.click(screen.getByRole('option', { name: 'Banana' }));
      expect(lastEmitted(emitted(), 'change')).toEqual([OPTIONS[1]]);
      expect(lastEmitted(emitted(), 'input')).toEqual([OPTIONS[1]]);
    });

    it('clicking an option emits select with the option and selected: false', async () => {
      const { emitted } = renderComponent();
      await openDropdown();
      await userEvent.click(screen.getByRole('option', { name: 'Banana' }));
      expect(emitted().select).toEqual([[OPTIONS[1], { selected: false }]]);
    });

    it('clicking the already selected option closes the list and emits select', async () => {
      const { emitted } = renderComponent({ props: { value: OPTIONS[1] } });
      await openDropdown();
      await userEvent.click(screen.getByRole('option', { name: 'Banana' }));
      expect(emitted().select).toEqual([[OPTIONS[1], { selected: false }]]);
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
    });

    it('an option whose value is null can be selected', async () => {
      const none = { value: null, label: 'None' };
      const { emitted } = renderComponent({ props: { options: [none, ...OPTIONS] } });
      await openDropdown();
      await userEvent.click(screen.getByRole('option', { name: 'None' }));
      expect(lastEmitted(emitted(), 'change')).toEqual([none]);
    });

    it('the clear button emits change with an empty string', async () => {
      const { emitted } = renderComponent({
        props: { value: OPTIONS[0], clearable: true, clearText: 'Clear' },
      });
      await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
      expect(lastEmitted(emitted(), 'change')).toEqual(['']);
    });

    it('the clear button moves focus to the combobox and is removed', async () => {
      renderComponent({ props: { value: OPTIONS[0], clearable: true, clearText: 'Clear' } });
      await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
      await new Promise(resolve => setTimeout(resolve));
      expect(getCombobox()).toHaveFocus();
      expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
    });

    it("the clear button's clicks and keydowns don't reach ancestors", async () => {
      const onParentClick = jest.fn();
      const onParentKeydown = jest.fn();
      render({
        components: { KSelect },
        data: () => ({ value: OPTIONS[0], options: OPTIONS }),
        methods: { onParentClick, onParentKeydown },
        template: `<div @click="onParentClick" @keydown="onParentKeydown">
          <KSelect :value="value" :options="options" label="${LABEL}" clearable clearText="Clear" />
        </div>`,
      });
      const clear = screen.getByRole('button', { name: 'Clear' });
      await userEvent.click(clear);
      await fireEvent.keyDown(clear, { key: 'Enter' });
      expect(onParentClick).not.toHaveBeenCalled();
      expect(onParentKeydown).not.toHaveBeenCalled();
    });

    it("an option's clicks don't reach document", async () => {
      renderComponent();
      await openDropdown();
      const option = screen.getByRole('option', { name: 'Banana' });
      const targets = [];
      const onDocumentClick = event => targets.push(event.target);
      document.addEventListener('click', onDocumentClick);
      try {
        await userEvent.click(option);
      } finally {
        document.removeEventListener('click', onDocumentClick);
      }
      expect(targets.filter(target => option.contains(target))).toEqual([]);
    });
  });

  describe('focus()', () => {
    function renderWithRef(props = {}) {
      const events = [];
      let select;
      render({
        components: { KSelect },
        data: () => ({ props: { value: {}, options: OPTIONS, label: LABEL, ...props } }),
        mounted() {
          select = this.$refs.select;
        },
        methods: { record: name => events.push(name) },
        template: `<KSelect
          ref="select"
          v-bind="props"
          @focus="record('focus')"
          @dropdown-open="record('dropdown-open')"
        />`,
      });
      return { events, select };
    }

    it('focuses the combobox without opening the list', async () => {
      const { events, select } = renderWithRef();
      select.focus();
      await new Promise(resolve => setTimeout(resolve));
      expect(getCombobox()).toHaveFocus();
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
      expect(events).toEqual(['focus']);
    });

    it('does nothing when the select is disabled', () => {
      const { events, select } = renderWithRef({ disabled: true });
      select.focus();
      expect(getCombobox()).not.toHaveFocus();
      expect(events).toEqual([]);
    });
  });

  describe('blur', () => {
    it('is emitted with the keydown event on Tab', async () => {
      const { emitted } = renderComponent();
      getCombobox().focus();
      await userEvent.tab();
      expect(emitted().blur).toHaveLength(1);
      expect(emitted().blur[0][0]).toBeInstanceOf(KeyboardEvent);
    });

    it('is emitted after change when Tab selects an option', async () => {
      const events = [];
      renderComponent({
        listeners: {
          change: option => events.push(['change', option]),
          blur: () => events.push(['blur']),
        },
      });
      getCombobox().focus();
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      await userEvent.tab();
      expect(events.slice(-2)).toEqual([['change', OPTIONS[1]], ['blur']]);
    });

    it('is not emitted when clicking outside an open list', async () => {
      const { emitted } = renderComponent();
      await openDropdown();
      await userEvent.click(document.body);
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
      expect(emitted().blur).toBeUndefined();
    });

    it('is not emitted by the clear button', async () => {
      const { emitted } = renderComponent({
        props: { value: OPTIONS[0], clearable: true, clearText: 'Clear' },
      });
      getCombobox().focus();
      await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
      expect(emitted().blur).toBeUndefined();
    });
  });

  describe('keyboard', () => {
    it('ArrowDown opens, ArrowDown moves the highlight and Enter selects and closes', async () => {
      const { emitted } = renderComponent();
      getCombobox().focus();
      await userEvent.keyboard('{ArrowDown}');
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'true');
      expectActive('Apple');
      await userEvent.keyboard('{ArrowDown}');
      expectActive('Banana');
      await userEvent.keyboard('{Enter}');
      expect(lastEmitted(emitted(), 'change')).toEqual([OPTIONS[1]]);
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
    });

    it('changing the options while open highlights the option Enter selects', async () => {
      const zucchini = { value: 'zucchini', label: 'Zucchini' };
      const { emitted, updateProps } = renderComponent();
      getCombobox().focus();
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      await updateProps({ options: [zucchini, ...OPTIONS] });
      expectActive('Zucchini');
      await userEvent.keyboard('{Enter}');
      expect(lastEmitted(emitted(), 'change')).toEqual([zucchini]);
    });

    it('keeps the End highlight when the parent re-renders the options on open', async () => {
      render({
        components: { KSelect },
        data: () => ({ opens: 0 }),
        template: `<div :data-opens="opens">
          <KSelect
            :value="{}"
            :options="[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'cherry', label: 'Cherry' },
            ]"
            label="${LABEL}"
            @dropdown-open="opens++"
          />
        </div>`,
      });
      getCombobox().focus();
      await userEvent.keyboard('{End}');
      expectActive('Cherry');
    });

    it('reopening highlights the selected option, not the last highlighted one', async () => {
      renderComponent({ props: { value: OPTIONS[0] } });
      getCombobox().focus();
      await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{Escape}{ArrowDown}');
      expectActive('Apple');
    });

    it('Space selects the highlighted option', async () => {
      const { emitted } = renderComponent();
      getCombobox().focus();
      await userEvent.keyboard('{ArrowDown}{ArrowDown}[Space]');
      expect(lastEmitted(emitted(), 'change')).toEqual([OPTIONS[1]]);
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
    });

    it('Escape closes without emitting change', async () => {
      const { emitted } = renderComponent();
      getCombobox().focus();
      await userEvent.keyboard('{ArrowDown}{ArrowDown}{Escape}');
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
      expect(emitted().change).toBeUndefined();
    });

    it.each([
      ['Home', 'Apple'],
      ['End', 'Cherry'],
      ['ArrowUp', 'Apple'],
    ])('closed, %s opens on the first or last enabled option', async (key, label) => {
      const { emitted } = renderComponent({
        props: { options: OPTIONS_WITH_DISABLED_EDGES, value: OPTIONS[1] },
      });
      getCombobox().focus();
      await userEvent.keyboard(`{${key}}`);
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'true');
      expectActive(label);
      expect(emitted().change).toBeUndefined();
    });

    it('open, End and Home highlight the last and first enabled options', async () => {
      const { emitted } = renderComponent({ props: { options: OPTIONS_WITH_DISABLED_EDGES } });
      getCombobox().focus();
      await userEvent.keyboard('{ArrowDown}{End}');
      expectActive('Cherry');
      await userEvent.keyboard('{Home}');
      expectActive('Apple');
      expect(emitted().change).toBeUndefined();
    });

    it('open, ArrowDown and ArrowUp stop at the last and first enabled options', async () => {
      const { emitted } = renderComponent({
        props: { options: OPTIONS_WITH_DISABLED_EDGES, value: OPTIONS[2] },
      });
      getCombobox().focus();
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      expectActive('Cherry');
      await userEvent.keyboard('{Home}{ArrowUp}');
      expectActive('Apple');
      await userEvent.keyboard('{Enter}');
      expect(lastEmitted(emitted(), 'change')).toEqual([OPTIONS[0]]);
    });

    it('PageDown moves 10 options and stops at the last', async () => {
      renderComponent({ props: { options: MANY_OPTIONS } });
      getCombobox().focus();
      await userEvent.keyboard('{ArrowDown}{PageDown}');
      expectActive('Option 10');
      await userEvent.keyboard('{PageDown}');
      expectActive('Option 14');
    });

    it('PageUp moves 10 options and stops at the first', async () => {
      renderComponent({ props: { options: MANY_OPTIONS } });
      getCombobox().focus();
      await userEvent.keyboard('{End}{PageUp}');
      expectActive('Option 4');
      await userEvent.keyboard('{PageUp}');
      expectActive('Option 0');
    });

    it('Alt+ArrowUp selects the highlighted option and closes', async () => {
      const { emitted } = renderComponent();
      getCombobox().focus();
      await userEvent.keyboard('{ArrowDown}{ArrowDown}{Alt>}{ArrowUp}{/Alt}');
      expect(lastEmitted(emitted(), 'change')).toEqual([OPTIONS[1]]);
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
    });

    it('Tab selects the highlighted option, closes and moves focus on', async () => {
      const onChange = renderBetweenButtons();
      getCombobox().focus();
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      await userEvent.tab();
      expect(onChange).toHaveBeenLastCalledWith(OPTIONS[1]);
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
      expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus();
    });

    it('Shift+Tab selects the highlighted option, closes and moves focus back', async () => {
      const onChange = renderBetweenButtons();
      getCombobox().focus();
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      await userEvent.tab({ shift: true });
      expect(onChange).toHaveBeenLastCalledWith(OPTIONS[1]);
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
      expect(screen.getByRole('button', { name: 'Previous' })).toHaveFocus();
    });

    it('Tab with the list closed moves focus without changing the value', async () => {
      const onChange = renderBetweenButtons({ value: OPTIONS[0] });
      getCombobox().focus();
      await userEvent.tab();
      expect(onChange).not.toHaveBeenCalled();
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
      expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus();
    });

    describe('type-ahead', () => {
      it('highlights the first enabled option starting with the typed letter', async () => {
        renderComponent({ props: { options: TYPEAHEAD_OPTIONS } });
        getCombobox().focus();
        await userEvent.keyboard('{ArrowDown}b');
        expectActive('Blueberry');
      });

      it('cycles through options starting with a repeated letter', async () => {
        renderComponent({ props: { options: TYPEAHEAD_OPTIONS } });
        getCombobox().focus();
        await userEvent.keyboard('{ArrowDown}bb');
        expectActive('Banana');
        await userEvent.keyboard('b');
        expectActive('Blueberry');
      });

      it('matches the whole typed string', async () => {
        renderComponent({ props: { options: TYPEAHEAD_OPTIONS } });
        getCombobox().focus();
        await userEvent.keyboard('{ArrowDown}ba');
        expectActive('Banana');
      });

      it('never matches an option without a label', async () => {
        renderComponent({ props: { options: [{}, ...OPTIONS] } });
        getCombobox().focus();
        await userEvent.keyboard('{ArrowDown}{ArrowDown}u');
        expectActive('Apple');
      });

      it('opens a closed list', async () => {
        renderComponent({ props: { options: TYPEAHEAD_OPTIONS } });
        getCombobox().focus();
        await userEvent.keyboard('c');
        expect(getCombobox()).toHaveAttribute('aria-expanded', 'true');
        expectActive('Cherry');
      });

      it('ignores keys pressed with Ctrl', async () => {
        renderComponent({ props: { options: TYPEAHEAD_OPTIONS } });
        getCombobox().focus();
        await userEvent.keyboard('{ArrowDown}{Control>}c{/Control}');
        expectActive('Apple');
      });
    });

    describe('inside KModal', () => {
      it('the first Escape closes only the list and the second cancels the modal', async () => {
        const onCancel = jest.fn();
        render({
          render: h =>
            h(KModal, { props: { title: 'Modal' }, on: { cancel: onCancel } }, [
              h(KSelect, { props: { value: {}, options: OPTIONS, label: LABEL } }),
            ]),
        });
        getCombobox().focus();
        await userEvent.keyboard('{ArrowDown}{Escape}');
        expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
        expect(onCancel).not.toHaveBeenCalled();
        await userEvent.keyboard('{Escape}');
        expect(onCancel).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('disabled select', () => {
    it('is aria-disabled and skipped by Tab', async () => {
      render({
        components: { KSelect },
        data: () => ({ options: OPTIONS }),
        template: `<div>
          <button>Before</button>
          <KSelect :value="{}" :options="options" label="${LABEL}" disabled />
          <button>After</button>
        </div>`,
      });
      expect(getCombobox()).toHaveAttribute('aria-disabled', 'true');
      screen.getByRole('button', { name: 'Before' }).focus();
      await userEvent.tab();
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
    });

    it('does not open or take focus on click', async () => {
      renderComponent({ props: { disabled: true } });
      await new Promise(resolve => setTimeout(resolve));
      await userEvent.click(getCombobox());
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'false');
      expect(getCombobox()).not.toHaveFocus();
    });

    it('shows no clear button', () => {
      renderComponent({
        props: { disabled: true, value: OPTIONS[0], clearable: true, clearText: 'Clear' },
      });
      expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
    });
  });

  describe('disabled options', () => {
    it('have aria-disabled', async () => {
      renderComponent({ props: { options: OPTIONS_WITH_DISABLED } });
      await openDropdown();
      expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });

    it('are skipped by ArrowDown', async () => {
      renderComponent({ props: { options: OPTIONS_WITH_DISABLED } });
      getCombobox().focus();
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      expectActive('Cherry');
    });

    it('a selected disabled option is highlighted on open and not returned to', async () => {
      renderComponent({
        props: { options: OPTIONS_WITH_DISABLED, value: OPTIONS_WITH_DISABLED[1] },
      });
      await openDropdown();
      expectActive('Banana');
      await userEvent.keyboard('{ArrowDown}{ArrowUp}');
      expectActive('Apple');
    });

    it('do nothing on click', async () => {
      const { emitted } = renderComponent({ props: { options: OPTIONS_WITH_DISABLED } });
      await openDropdown();
      await userEvent.click(screen.getByRole('option', { name: 'Banana' }));
      expect(emitted().change).toBeUndefined();
      expect(getCombobox()).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('slots', () => {
    it('the display slot renders in place of the value', () => {
      renderComponent({
        props: { value: OPTIONS[0] },
        slots: { display: '<span>Custom display</span>' },
      });
      expect(getCombobox()).toHaveTextContent('Custom display');
      expect(getCombobox()).not.toHaveTextContent('Apple');
    });

    it('the option slot receives highlighted, index, option and selected', async () => {
      renderComponent({
        props: { value: OPTIONS[1] },
        scopedSlots: {
          option: `<span slot-scope="{ highlighted, index, option, selected }">
            {{ option.label }} index={{ index }} highlighted={{ highlighted }} selected={{ selected }}
          </span>`,
        },
      });
      await openDropdown();
      expect(screen.getByRole('option', { name: /^Apple/ })).toHaveTextContent(
        'index=0 highlighted=false selected=false',
      );
      expect(screen.getByRole('option', { name: /^Banana/ })).toHaveTextContent(
        'index=1 highlighted=true selected=true',
      );
      expect(screen.getByRole('option', { name: /^Cherry/ })).toHaveTextContent(
        'index=2 highlighted=false selected=false',
      );
    });
  });
});
