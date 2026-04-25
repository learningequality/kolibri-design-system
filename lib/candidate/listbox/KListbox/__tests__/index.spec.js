import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KListbox from '../index.vue';

const OPTIONS = [
  { id: 'id-first', label: 'First option' },
  { id: 'id-second', label: 'Second option' },
  { id: 'id-third', label: 'Third option' },
];

const MESSAGES = {
  clickable: 'Options are clickable',
  allOptionsSelected: 'All options selected',
  allOptionsDeselected: 'No options selected',
  optionDeselected: 'Deselected',
};

const LISTBOX_ID = 'test-listbox';

function makeListboxOptions(options = OPTIONS) {
  return options.map(o => `<KListboxOption value="${o.id}" label="${o.label}" />`).join('');
}

const getOptionByLabel = label => screen.getByRole('option', { name: label });
const getOptionDomId = label => getOptionByLabel(label).id;
const getPoliteRegion = () => document.querySelector('#k-live-region [aria-live="polite"]');

function renderComponent({ props = {}, slots = {}, ...rest } = {}) {
  return render(KListbox, {
    props: { id: LISTBOX_ID, value: [], messages: MESSAGES, ...props },
    slots: { default: makeListboxOptions(), ...slots },
    ...rest,
  });
}

describe('KListbox', () => {
  it('smoke test', async () => {
    renderComponent();
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
  });

  it('warns when options are not direct children', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    renderComponent({
      slots: {
        default: `<span><KListboxOption value="${OPTIONS[0].id}" label="${OPTIONS[0].label}" /></span>`,
      },
    });
    expect(warn).toHaveBeenCalledWith('[KListboxOption] must be a direct child of KListbox.');
    warn.mockRestore();
  });

  it('listbox has correct role and attributes', async () => {
    renderComponent();
    const listbox = await screen.findByRole('listbox');
    expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
    expect(listbox).toHaveAttribute('tabindex', '0');
    expect(listbox).toHaveAttribute('data-focus', 'true');
  });

  it('id, aria-label, and aria-labelledby are forwarded to the listbox element', async () => {
    renderComponent({
      props: { id: 'listbox-id' },
      attrs: { 'aria-label': 'Label', 'aria-labelledby': 'label-id' },
    });
    const listbox = await screen.findByRole('listbox');
    expect(listbox).toHaveAttribute('id', 'listbox-id');
    expect(listbox).toHaveAttribute('aria-label', 'Label');
    expect(listbox).toHaveAttribute('aria-labelledby', 'label-id');
  });

  it('listbox aria-describedby points to a visually hidden element with the correct description', async () => {
    renderComponent();
    const listbox = await screen.findByRole('listbox');
    expect(listbox).toHaveAttribute('aria-describedby', `${LISTBOX_ID}-description`);
    const description = document.getElementById(`${LISTBOX_ID}-description`);
    expect(description).toHaveClass('visuallyhidden');
    expect(description).toHaveTextContent(MESSAGES.clickable);
  });

  it('options have correct role and attributes', async () => {
    renderComponent();
    const options = await screen.findAllByRole('option');
    expect(options.length).toBe(3);
    options.forEach(opt => {
      expect(opt).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('when an option is selected', () => {
    it('emits input event with the updated value and aria-selected is updated', async () => {
      const component = renderComponent();
      const option = await screen.findByRole('option', { name: OPTIONS[0].label });
      expect(option).toHaveAttribute('aria-selected', 'false');

      await userEvent.click(option);
      const emittedValue = component.emitted().input[0][0];

      expect(emittedValue).toEqual([OPTIONS[0].id]);

      // need to update prop to simulate v-model
      await component.updateProps({ value: emittedValue });
      expect(option).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('listbox focus', () => {
    describe('if none of the options are selected before the listbox receives focus ', () => {
      it('focus is set on the first option and there is no automatic change in the selection state', async () => {
        renderComponent();
        const listbox = await screen.findByRole('listbox');
        listbox.focus();
        await waitFor(() =>
          expect(listbox).toHaveAttribute(
            'aria-activedescendant',
            getOptionDomId(OPTIONS[0].label),
          ),
        );
        OPTIONS.forEach(o =>
          expect(getOptionByLabel(o.label)).toHaveAttribute('aria-selected', 'false'),
        );
      });
    });

    describe('if one or more options are selected before the listbox receives focus ', () => {
      it('focus is set on the first option in the list that is selected', async () => {
        renderComponent({ props: { value: [OPTIONS[1].id, OPTIONS[2].id] } });
        const listbox = await screen.findByRole('listbox');
        listbox.focus();
        await waitFor(() =>
          expect(listbox).toHaveAttribute(
            'aria-activedescendant',
            getOptionDomId(OPTIONS[1].label),
          ),
        );
      });
    });
  });

  describe('keyboard navigation', () => {
    let component;

    beforeEach(() => {
      component = renderComponent();
    });

    const focusListbox = async () => {
      const listbox = await screen.findByRole('listbox');
      listbox.focus();
      await waitFor(() => expect(listbox).toHaveAttribute('aria-activedescendant'));
      return listbox;
    };

    it('Down Arrow moves focus through options in order and wraps to the first after the last', async () => {
      const listbox = await focusListbox();

      expect(listbox).toHaveAttribute('aria-activedescendant', getOptionDomId(OPTIONS[0].label));

      await userEvent.keyboard('{ArrowDown}');
      expect(listbox).toHaveAttribute('aria-activedescendant', getOptionDomId(OPTIONS[1].label));
      await userEvent.keyboard('{ArrowDown}');
      expect(listbox).toHaveAttribute('aria-activedescendant', getOptionDomId(OPTIONS[2].label));

      // wrap
      await userEvent.keyboard('{ArrowDown}');
      expect(listbox).toHaveAttribute('aria-activedescendant', getOptionDomId(OPTIONS[0].label));
    });

    it('Up Arrow moves focus through options in reverse order and wraps to the last from the first', async () => {
      const listbox = await focusListbox();

      expect(listbox).toHaveAttribute('aria-activedescendant', getOptionDomId(OPTIONS[0].label));

      // wrap
      await userEvent.keyboard('{ArrowUp}');
      expect(listbox).toHaveAttribute('aria-activedescendant', getOptionDomId(OPTIONS[2].label));

      await userEvent.keyboard('{ArrowUp}');
      expect(listbox).toHaveAttribute('aria-activedescendant', getOptionDomId(OPTIONS[1].label));
      await userEvent.keyboard('{ArrowUp}');
      expect(listbox).toHaveAttribute('aria-activedescendant', getOptionDomId(OPTIONS[0].label));
    });

    it('Home moves focus to the first option', async () => {
      const listbox = await focusListbox();

      // first move focus away from the first option
      // to ensure Home is doing something
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      expect(listbox).toHaveAttribute('aria-activedescendant', getOptionDomId(OPTIONS[2].label));

      await userEvent.keyboard('{Home}');
      expect(listbox).toHaveAttribute('aria-activedescendant', getOptionDomId(OPTIONS[0].label));
    });

    it('End moves focus to the last option', async () => {
      const listbox = await focusListbox();
      expect(listbox).toHaveAttribute('aria-activedescendant', getOptionDomId(OPTIONS[0].label));

      await userEvent.keyboard('{End}');
      expect(listbox).toHaveAttribute('aria-activedescendant', getOptionDomId(OPTIONS[2].label));
    });

    it('Space selects the focused option', async () => {
      await focusListbox();
      await userEvent.keyboard(' ');
      const emittedValue = component.emitted().input[0][0];
      expect(emittedValue).toEqual([OPTIONS[0].id]);
      // need to update prop to simulate v-model
      await component.updateProps({ value: emittedValue });
      expect(getOptionByLabel(OPTIONS[0].label)).toHaveAttribute('aria-selected', 'true');
    });

    describe('Ctrl + A', () => {
      it('selects all options', async () => {
        await focusListbox();
        await userEvent.keyboard('{Control>}a{/Control}');
        const emittedValue = component.emitted().input[0][0];
        expect(emittedValue).toEqual(OPTIONS.map(o => o.id));
        // need to update prop to simulate v-model
        await component.updateProps({ value: emittedValue });
        OPTIONS.forEach(o =>
          expect(getOptionByLabel(o.label)).toHaveAttribute('aria-selected', 'true'),
        );
      });

      it('deselects all options if every option is already selected', async () => {
        await component.updateProps({ value: OPTIONS.map(o => o.id) });
        await focusListbox();
        await userEvent.keyboard('{Control>}a{/Control}');
        const emittedValue = component.emitted().input[0][0];
        expect(emittedValue).toEqual([]);
        // need to update prop to simulate v-model
        await component.updateProps({ value: emittedValue });
        OPTIONS.forEach(o =>
          expect(getOptionByLabel(o.label)).toHaveAttribute('aria-selected', 'false'),
        );
      });

      // Options may be dynamic, e.g. when KListbox used with a filter or pagination
      describe('when there are selections outside the visible options', () => {
        it('selects all visible options without dropping selections for hidden (e.g. filtered out) options', async () => {
          await component.updateProps({ value: ['id-hidden'] });
          await focusListbox();
          await userEvent.keyboard('{Control>}a{/Control}');
          expect(component.emitted().input[0][0]).toEqual(['id-hidden', ...OPTIONS.map(o => o.id)]);
        });

        it('deselects all visible options without dropping selections for hidden (e.g. filtered out) options', async () => {
          await component.updateProps({
            value: ['id-hidden', ...OPTIONS.map(o => o.id)],
          });
          await focusListbox();
          await userEvent.keyboard('{Control>}a{/Control}');
          expect(component.emitted().input[0][0]).toEqual(['id-hidden']);
        });
      });
    });
  });

  describe('live region', () => {
    it('announces deselection when an option is deselected', async () => {
      renderComponent({ props: { value: [OPTIONS[0].id] } });
      await screen.findAllByRole('option');
      await userEvent.click(getOptionByLabel(OPTIONS[0].label));
      expect(getPoliteRegion()).toHaveTextContent(MESSAGES.optionDeselected);
    });

    it('announces all options selected when Ctrl+A selects everything', async () => {
      renderComponent();
      const listbox = await screen.findByRole('listbox');
      listbox.focus();
      await userEvent.keyboard('{Control>}a{/Control}');
      expect(getPoliteRegion()).toHaveTextContent(MESSAGES.allOptionsSelected);
    });

    it('announces no options selected when Ctrl+A deselects everything', async () => {
      renderComponent({ props: { value: OPTIONS.map(o => o.id) } });
      const listbox = await screen.findByRole('listbox');
      listbox.focus();
      await userEvent.keyboard('{Control>}a{/Control}');
      expect(getPoliteRegion()).toHaveTextContent(MESSAGES.allOptionsDeselected);
    });
  });
});
