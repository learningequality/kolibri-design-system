import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import KTabsList from '../KTabsList.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

const routes = [{ path: '/lessons' }, { path: '/learners' }, { path: '/groups' }];
const router = new VueRouter({ routes });
const routerPush = router.push;

// Override router push to avoid test failures from NavigationDuplicated errors
// @see https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
router.push = function(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return routerPush.call(this, location, onResolve, onReject);
  }
  return routerPush.call(this, location).catch(err => {
    if (VueRouter.isNavigationFailure(err)) {
      // resolve err
      return err;
    }
    // rethrow error
    return Promise.reject(err);
  });
};

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

describe(`KTabsList`, () => {
  let errorListener;

  function makeWrapper({ propsData = {} } = {}) {
    return mount(KTabsList, {
      propsData,
      localVue,
      router,
      listeners: {
        error: errorListener,
      },
    });
  }

  beforeEach(() => {
    errorListener = jest.fn();
  });

  afterEach(() => {
    errorListener = null;
  });

  it(`smoke test`, () => {
    const wrapper = shallowMount(KTabsList, { listeners: { error: errorListener } });
    expect(wrapper.exists()).toBeTruthy();
  });

  it(`shows the console error when missing 'ariaLabel' or 'ariaLabelledBy' props`, () => {
    makeWrapper({
      propsData: {
        tabsId: 'coachTabs',
        tabs: TABS,
        activeTabId: 'tabLearners',
      },
    });
    expect(errorListener).toHaveBeenCalled();
    expect(errorListener).toHaveBeenCalledTimes(1);
    expect(errorListener.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(errorListener.mock.calls[0][0].message).toBe(
      `[KTabsList] Missing 'ariaLabel' or 'ariaLabelledBy'`
    );
  });

  describe(`when 'ariaLabel' prop is provided`, () => {
    let wrapper;

    beforeEach(() => {
      wrapper = makeWrapper({
        propsData: {
          ariaLabel: 'Coach tabs',
          tabsId: 'coachTabs',
          tabs: TABS,
          activeTabId: 'tabLearners',
        },
      });
    });

    it(`doesn't show the console error`, () => {
      expect(errorListener).not.toHaveBeenCalled();
    });

    it(`has the correct 'aria-label' attribute`, () => {
      expect(wrapper.attributes('aria-labelledby')).toBeUndefined();
      expect(wrapper.attributes('aria-label')).toBe('Coach tabs');
    });
  });

  describe(`when 'ariaLabelledBy' prop is provided`, () => {
    let wrapper;

    beforeEach(() => {
      wrapper = makeWrapper({
        propsData: {
          ariaLabelledBy: 'id-of-element-with-label',
          tabsId: 'coachTabs',
          tabs: TABS,
          activeTabId: 'tabLearners',
        },
      });
    });

    it(`doesn't show the console error`, () => {
      expect(errorListener).not.toHaveBeenCalled();
    });

    it(`has the correct 'aria-labelledby' attribute`, () => {
      expect(wrapper.attributes('aria-label')).toBeUndefined();
      expect(wrapper.attributes('aria-labelledby')).toBe('id-of-element-with-label');
    });
  });

  describe(`when tab objects don't have 'to' attribute`, () => {
    let wrapper;

    beforeEach(() => {
      wrapper = makeWrapper({
        propsData: {
          ariaLabel: 'Coach tabs',
          tabsId: 'coachTabs',
          tabs: TABS,
          activeTabId: 'tabLearners',
        },
      });
    });

    it(`renders tabs as buttons with correct label and 'id', 'role', 'type', 'aria-controls' attributes`, () => {
      expect(wrapper.find('a').exists()).toBeFalsy();

      const buttons = wrapper.findAll('button');
      expect(buttons.length).toBe(3);

      expect(buttons.at(0).text()).toBe('Lessons');
      expect(buttons.at(0).attributes('id')).toBe('coachTabs-tabLessons');
      expect(buttons.at(0).attributes('role')).toBe('tab');
      expect(buttons.at(0).attributes('type')).toBe('button');
      expect(buttons.at(0).attributes('aria-controls')).toBe('coachTabs-tabLessons-panel');

      expect(buttons.at(1).text()).toBe('Learners');
      expect(buttons.at(1).attributes('id')).toBe('coachTabs-tabLearners');
      expect(buttons.at(1).attributes('role')).toBe('tab');
      expect(buttons.at(1).attributes('type')).toBe('button');
      expect(buttons.at(1).attributes('aria-controls')).toBe('coachTabs-tabLearners-panel');

      expect(buttons.at(2).text()).toBe('Groups');
      expect(buttons.at(2).attributes('id')).toBe('coachTabs-tabGroups');
      expect(buttons.at(2).attributes('role')).toBe('tab');
      expect(buttons.at(2).attributes('type')).toBe('button');
      expect(buttons.at(2).attributes('aria-controls')).toBe('coachTabs-tabGroups-panel');
    });

    it(`the active tab has 'tabindex' set to 0 and all other tabs to -1`, () => {
      const buttons = wrapper.findAll('button');
      expect(buttons.at(0).attributes('tabindex')).toBe('-1');
      expect(buttons.at(1).attributes('tabindex')).toBe('0');
      expect(buttons.at(2).attributes('tabindex')).toBe('-1');
    });

    it(`the active tab has 'aria-selected' set to 'true' and all other tabs to 'false'`, () => {
      const buttons = wrapper.findAll('button');
      expect(buttons.at(0).attributes('aria-selected')).toBe('false');
      expect(buttons.at(1).attributes('aria-selected')).toBe('true');
      expect(buttons.at(2).attributes('aria-selected')).toBe('false');
    });

    describe(`on a tab click`, () => {
      it(`emits 'activate' event with the tab id in the payload`, () => {
        const buttons = wrapper.findAll('button');
        buttons.at(2).trigger('click');

        expect(wrapper.emitted().activate.length).toBe(1);
        expect(wrapper.emitted().activate[0][0]).toBe('tabGroups');
      });
    });
  });

  describe(`when tab objects have 'to' attribute`, () => {
    let wrapper;

    beforeEach(() => {
      router.push({ path: '/learners' });
      wrapper = makeWrapper({
        propsData: {
          ariaLabel: 'Coach tabs',
          tabsId: 'coachTabs',
          tabs: TABS_WITH_ROUTES,
          activeTabId: 'tabLearners',
        },
      });
    });

    it(`renders tabs as links with correct label and 'id', 'role', 'href', 'aria-controls' attributes`, () => {
      expect(wrapper.find('button').exists()).toBeFalsy();

      const links = wrapper.findAll('a');
      expect(links.length).toBe(3);

      expect(links.at(0).text()).toBe('Lessons');
      expect(links.at(0).attributes('id')).toBe('coachTabs-tabLessons');
      expect(links.at(0).attributes('role')).toBe('tab');
      expect(links.at(0).attributes('href')).toBe('#/lessons');
      expect(links.at(0).attributes('aria-controls')).toBe('coachTabs-tabLessons-panel');

      expect(links.at(1).text()).toBe('Learners');
      expect(links.at(1).attributes('id')).toBe('coachTabs-tabLearners');
      expect(links.at(1).attributes('role')).toBe('tab');
      expect(links.at(1).attributes('href')).toBe('#/learners');
      expect(links.at(1).attributes('aria-controls')).toBe('coachTabs-tabLearners-panel');

      expect(links.at(2).text()).toBe('Groups');
      expect(links.at(2).attributes('id')).toBe('coachTabs-tabGroups');
      expect(links.at(2).attributes('role')).toBe('tab');
      expect(links.at(2).attributes('href')).toBe('#/groups');
      expect(links.at(2).attributes('aria-controls')).toBe('coachTabs-tabGroups-panel');
    });

    it(`the active tab has 'tabindex' set to 0 and all other tabs to -1`, () => {
      const links = wrapper.findAll('a');
      expect(links.at(0).attributes('tabindex')).toBe('-1');
      expect(links.at(1).attributes('tabindex')).toBe('0');
      expect(links.at(2).attributes('tabindex')).toBe('-1');
    });

    it(`the active tab has 'aria-selected' set to 'true' and all other tabs to 'false'`, () => {
      const links = wrapper.findAll('a');
      expect(links.at(0).attributes('aria-selected')).toBe('false');
      expect(links.at(1).attributes('aria-selected')).toBe('true');
      expect(links.at(2).attributes('aria-selected')).toBe('false');
    });

    describe(`when mounted`, () => {
      it(`emits 'activate' event with the tab id that corresponds to the current route`, () => {
        expect(wrapper.emitted().activate.length).toBe(1);
        expect(wrapper.emitted().activate[0][0]).toBe('tabLearners');
      });
    });

    describe(`on a tab click`, () => {
      it(`emits 'activate' event with the tab id in the payload`, () => {
        const links = wrapper.findAll('a');
        links.at(2).trigger('click');

        // see `when mounted - emits 'activate' event with the tab id that corresponds to the current route` test to understand why we need to test the second emitted event here
        expect(wrapper.emitted().activate.length).toBe(2);
        expect(wrapper.emitted().activate[1][0]).toBe('tabGroups');
      });

      it(`emits 'click' event with the tab id in the payload`, () => {
        const links = wrapper.findAll('a');
        links.at(2).trigger('click');
        expect(wrapper.emitted().click.length).toBe(1);
        expect(wrapper.emitted().click[0][0]).toBe('tabGroups');
      });
    });
  });
});
