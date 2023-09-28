import { shallowMount, mount } from '@vue/test-utils';
import KTabsPanel from '../KTabsPanel.vue';

function makeWrapper({ propsData = {}, slots = {} } = {}) {
  return mount(KTabsPanel, {
    propsData,
    slots,
  });
}

describe(`KTabsPanel`, () => {
  it(`smoke test`, () => {
    const wrapper = shallowMount(KTabsPanel);
    expect(wrapper.exists()).toBeTruthy();
  });

  it(`renders div with correct 'id', 'role', and 'aria-labelledby'`, () => {
    const wrapper = makeWrapper({
      propsData: { tabsId: 'testTabs', activeTabId: 'lessonsTab' },
    });
    expect(wrapper.attributes('id')).toBe('testTabs-lessonsTab-panel');
    expect(wrapper.attributes('role')).toBe('tabpanel');
    expect(wrapper.attributes('aria-labelledby')).toBe('testTabs-lessonsTab');
  });

  it(`renders content of the default slot`, () => {
    const wrapper = makeWrapper({
      propsData: { tabsId: 'testTabs', activeTabId: 'lessonsTab' },
      slots: {
        default: '<span>Default slot content</span>',
      },
    });
    expect(wrapper.html()).toContain('Default slot content');
  });

  describe(`when using named slots`, () => {
    it(`renders only content of the slot corresponding to the active tab`, () => {
      const wrapper = makeWrapper({
        propsData: { tabsId: 'testTabs', activeTabId: 'lessonsTab' },
        slots: {
          groupsTab: '<span>Groups tab content</span>',
          lessonsTab: '<span>Lessons tab content</span>',
        },
      });
      expect(wrapper.html()).not.toContain('Groups tab content');
      expect(wrapper.html()).toContain('Lessons tab content');
    });
  });

  describe(`when it contains a focusable child element`, () => {
    it(`the panel has 'tabindex' set to -1`, async () => {
      const wrapper = makeWrapper({
        propsData: { tabsId: 'testTabs', activeTabId: 'lessonsTab' },
        slots: {
          default: '<a href="link">Link</a>',
        },
      });
      await wrapper.vm.$nextTick(); // make sure 'tabindex' is updated before testing its value
      expect(wrapper.attributes('tabindex')).toBe('-1');
    });
  });

  describe(`when it doesn't contain any focusable child elements`, () => {
    it(`the panel has 'tabindex' is set to 0`, async () => {
      const wrapper = makeWrapper({
        propsData: { tabsId: 'testTabs', activeTabId: 'lessonsTab' },
        slots: {
          default: '<span>Default slot content</span>',
        },
      });
      await wrapper.vm.$nextTick(); // make sure 'tabindex' is updated before testing its value
      expect(wrapper.attributes('tabindex')).toBe('0');
    });
  });

  it(`'tabindex' is updated whenever the active tab ID changes`, async () => {
    const wrapper = makeWrapper({
      propsData: { tabsId: 'testTabs', activeTabId: 'groupsTab' },
      slots: {
        groupsTab: `
          <span>
            Groups tab content with a focusable element:
            <a href="link">Link</a>
          </span>`,
        lessonsTab: `
          <span>Lessons tab content with no focusable element</span>
        `,
      },
    });
    await wrapper.vm.$nextTick(); // make sure 'tabindex' is updated before testing its value
    expect(wrapper.attributes('tabindex')).toBe('-1');

    // switch to a tab which has no focusable elements
    wrapper.setProps({ activeTabId: 'lessonsTab' });

    // Need to wait two ticks - initial value change is in response to a watcher on the updated prop,
    // and then the value is only updated after the nextTick
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.attributes('tabindex')).toBe('0');

    // switch to a tab with a focusable element
    wrapper.setProps({ activeTabId: 'groupsTab' });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.attributes('tabindex')).toBe('-1');
  });
});
