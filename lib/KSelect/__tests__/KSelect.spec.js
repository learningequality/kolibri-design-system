import { mount } from '@vue/test-utils';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import trackInputModality from '../../styles/trackInputModality';
import KSelect from '../index';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
];

function makeWrapper(propsData = {}) {
  return mount(KSelect, {
    propsData: { label: 'Select', value: {}, options, ...propsData },
    attachTo: document.body,
  });
}

describe('KSelect component', () => {
  let wrapper;

  afterEach(() => {
    wrapper.destroy();
  });

  describe('focus()', () => {
    it(`focuses the control without opening the dropdown`, async () => {
      wrapper = makeWrapper();
      await wrapper.vm.$nextTick();
      wrapper.vm.focus();
      await wrapper.vm.$nextTick();

      expect(wrapper.find('.ui-select-label').element).toHaveFocus();
      expect(wrapper.emitted('focus')).toHaveLength(1);
      expect(wrapper.emitted('dropdown-open')).toBeUndefined();
    });

    it(`does nothing when the select is disabled`, () => {
      wrapper = makeWrapper({ disabled: true });
      wrapper.vm.focus();

      expect(wrapper.find('.ui-select-label').element).not.toHaveFocus();
      expect(wrapper.emitted('focus')).toBeUndefined();
    });
  });
});

const FOCUS_LABEL = 'Fruit';

const getFocusLabel = () => document.querySelector('.ui-select-label');
const getFirstOption = () => document.querySelector('.ui-select-option');

function keydown(el, key) {
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
}

function renderKSelect() {
  return render(KSelect, { props: { label: FOCUS_LABEL, value: {}, options } });
}

// jsdom does not apply stylesheets, so these assert the classes and the modality
// attribute, not the outline.
describe('KSelect focus outline', () => {
  // once for the whole suite: the `DOMContentLoaded` listener cannot be removed again
  beforeAll(() => {
    trackInputModality();
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  beforeEach(() => {
    document.body.removeAttribute('modality');
  });

  it('outlines the label while no option is highlighted', async () => {
    const { emitted } = renderKSelect();
    getFocusLabel().focus();
    await userEvent.keyboard('{Enter}');

    expect(emitted()['dropdown-open']).toHaveLength(1);
    // both assertions below hold on a closed dropdown too
    expect(getFocusLabel()).not.toHaveClass('has-highlighted-option');
    expect(getFirstOption()).not.toHaveClass('is-highlighted');
  });

  it('moves the outline to the option once one is highlighted', async () => {
    renderKSelect();
    getFocusLabel().focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('{ArrowDown}');

    expect(getFocusLabel()).toHaveClass('has-highlighted-option');
    expect(getFirstOption()).toHaveClass('is-highlighted');
    expect(getFirstOption().getAttribute('style') || '').not.toMatch(/outline/);
  });

  it('drops the label outline on a mouse pick after a tab to the select', async () => {
    const { emitted } = renderKSelect();
    keydown(document.body, 'Tab');
    getFocusLabel().focus();

    expect(document.body).toHaveAttribute('modality', 'keyboard');

    await userEvent.click(getFocusLabel());
    await userEvent.click(getFirstOption());

    expect(emitted()['dropdown-open']).toHaveLength(1);
    expect(emitted().change).toHaveLength(1);
    expect(getFocusLabel()).toHaveFocus();
    expect(getFocusLabel()).not.toHaveClass('has-highlighted-option');
    expect(document.body).not.toHaveAttribute('modality', 'keyboard');
  });
});
