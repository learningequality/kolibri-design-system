import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import KTabs from '../KTabs.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

function makeWrapper({ propsData = {} } = {}) {
  const router = new VueRouter();

  return mount(KTabs, {
    propsData,
    localVue,
    router,
  });
}

const TABS = [
  { id: 'tabLessons', label: 'Lessons' },
  { id: 'tabLearners', label: 'Learners' },
  { id: 'tabGroups', label: 'Groups' },
];
const TABS_WITH_ROUTES = [
  { id: 'tabLessons', label: 'Lessons', to: { path: '/lessons' } },
  { id: 'tabLearners', label: 'Learners', to: { path: '/learners' } },
  { id: 'tabGroups', label: 'Groups', to: { path: '/groups' } },
];

// 'KTabs' is just a wrapper component to make tabs implementation
// more comfortable => just basic tests are here to ensure that
// 'KTabsList' and 'KTabsPanel' are binded properly. It is in their
// spec files where majority of tabs functionality is tested.
describe(`KTabs`, () => {
  it(`smoke test`, () => {
    const wrapper = shallowMount(KTabs, { listeners: { error: () => {} } });
    expect(wrapper.exists()).toBeTruthy();
  });

  it(`binds all relevant props and 'activeTabId' to 'KTabsList'`, async () => {
    const props = {
      tabsId: 'coachTabs',
      tabs: TABS,
      ariaLabel: 'Coach tabs',
      ariaLabelledBy: 'id-of-element-with-label',
      color: 'colorCode',
      colorActive: 'colorActiveCode',
      backgroundColor: 'backgroundColorCode',
      hoverBackgroundColor: 'hoverBackgroundColorCode',
      appearanceOverrides: {
        color: 'appearanceOverridesColorCode',
      },
      appearanceOverridesActive: {
        color: 'appearanceOverridesActiveColorCode',
      },
      enablePrint: true,
    };
    const wrapper = makeWrapper({ propsData: props });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'KTabsList' }).props()).toEqual({
      activeTabId: 'tabLessons',
      ...props,
    });
  });

  it(`binds all relevant props and 'activeTabId' to 'KTabsPanel'`, async () => {
    const wrapper = makeWrapper({
      propsData: {
        tabsId: 'coachTabs',
        tabs: TABS,
        ariaLabel: 'Coach tabs',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'KTabsPanel' }).props()).toEqual({
      activeTabId: 'tabLessons',
      tabsId: 'coachTabs',
    });
  });

  describe(`when not using the router`, () => {
    it(`automatically sets the first tab as active`, async () => {
      const wrapper = makeWrapper({
        propsData: {
          tabsId: 'coachTabs',
          tabs: TABS,
          ariaLabel: 'Coach tabs',
        },
      });
      await wrapper.vm.$nextTick();
      const tabs = wrapper.findAll('button');
      expect(tabs.at(0).attributes('aria-selected')).toBe('true');
    });
  });

  describe(`when using the router`, () => {
    // just a simple test to complement the opposite test scenario above
    // which is the only functionality related to `KTabs` themselves
    // (tabs with routes are tested in more detail in `KTabsList` test suite)
    it(`doesn't automatically set any of the tabs as active`, async () => {
      const wrapper = makeWrapper({
        propsData: {
          tabsId: 'coachTabs',
          tabs: TABS_WITH_ROUTES,
          ariaLabel: 'Coach tabs',
        },
      });
      await wrapper.vm.$nextTick();
      const tabs = wrapper.findAll('a');
      expect(tabs.at(0).attributes('aria-selected')).toBe('false');
      expect(tabs.at(1).attributes('aria-selected')).toBe('false');
      expect(tabs.at(2).attributes('aria-selected')).toBe('false');
    });
  });
});
