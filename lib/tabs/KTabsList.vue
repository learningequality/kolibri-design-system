<template>

  <div
    v-show="enablePrint || !$isPrint"
    role="tablist"
    :[ariaLabelAttrName]="ariaLabelAttr"
  >
    <template v-if="useRouter">
      <!-- https://v3.router.vuejs.org/api/#example-applying-active-class-to-outer-element -->
      <router-link
        v-for="tab in tabs"
        :key="tab.id"
        v-slot="{ href, navigate, isActive }"
        :to="tab.to"
        custom
      >
        <a
          :id="getTabElementId(tabsId, tab.id)"
          ref="tab"
          role="tab"
          :data-activeroute="isActive"
          :data-tabid="tab.id"
          :href="href"
          :class="classes(tab.id)"
          :tabindex="tabIndexAttr(tab.id)"
          :aria-selected="ariaSelectedAttr(tab.id)"
          :aria-controls="ariaControlsAttr(tab.id)"
          @click="event => onClick(tab.id, navigate, event)"
        >
          <!-- @slot Optional slot for tab labels. Exposes `tab` object and `isActive` boolean. -->
          <slot
            name="tab"
            :tab="tab"
            :isActive="isTabActive(tab.id)"
          >
            {{ tab.label }}
          </slot>
        </a>
      </router-link>
    </template>

    <template v-else>
      <button
        v-for="tab in tabs"
        :id="getTabElementId(tabsId, tab.id)"
        :key="tab.id"
        ref="tab"
        type="button"
        role="tab"
        :class="classes(tab.id)"
        :tabindex="tabIndexAttr(tab.id)"
        :aria-selected="ariaSelectedAttr(tab.id)"
        :aria-controls="ariaControlsAttr(tab.id)"
        @click="onClick(tab.id)"
      >
        <!-- @slot Optional slot for tab labels. Exposes `tab` object and `isActive` boolean. -->
        <slot
          name="tab"
          :tab="tab"
          :isActive="isTabActive(tab.id)"
        >
          {{ tab.label }}
        </slot>
      </button>
    </template>
  </div>

</template>


<script>

  import merge from 'lodash/merge';
  import tabsMixin from './tabsMixin';
  import { getTabElementId, getTabPanelElementId } from './utils';

  /**
   * Displays the tab list of a tabbed interface.
   * It is meant to be used together with `KTabsPanel`.
   * Tabs can be buttons or router links.
   *
   * Tabs are implemented to be manually activated as described in
   * https://www.w3.org/WAI/ARIA/apg/example-index/tabs/tabs-manual.html
   */
  export default {
    name: 'KTabsList',
    mixins: [tabsMixin],
    model: {
      prop: 'activeTabId',
      event: 'activate',
    },
    props: {
      /**
       * An ID of a tabbed interface that this component is part of.
       * Needs to be be unique in regards to all tabbed interfaces
       * rendered on one page.
       */
      tabsId: {
        type: String,
        required: true,
      },
      /**
       * An ID of an active tab.
       */
      activeTabId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        focusedTabIdx: 0,
        firstTabIdx: 0,
        lastTabIdx: this.tabs && this.tabs.length ? this.tabs.length - 1 : 0,
      };
    },
    computed: {
      ariaLabelAttrName() {
        return this.ariaLabel ? 'aria-label' : 'aria-labelledby';
      },
      ariaLabelAttr() {
        return this.ariaLabel ? this.ariaLabel : this.ariaLabelledBy;
      },
      styles() {
        const color = this.color ? this.color : this.$themeTokens.annotation;
        const backgroundColor = this.backgroundColor
          ? this.backgroundColor
          : this.$themeTokens.surface;
        const hoverBackgroundColor = this.hoverBackgroundColor
          ? this.hoverBackgroundColor
          : this.$themeBrand.primary.v_100;
        return {
          color,
          backgroundColor,
          borderColor: backgroundColor,
          ':focus': this.$coreOutline,
          ':hover': {
            backgroundColor: hoverBackgroundColor,
          },
        };
      },
      stylesActive() {
        const colorActive = this.colorActive ? this.colorActive : this.$themeTokens.primary;
        return {
          color: colorActive,
          borderColor: colorActive,
        };
      },
      computedClass() {
        return this.$computedClass(merge({}, this.styles, this.appearanceOverrides));
      },
      computedClassActive() {
        return this.$computedClass(
          merge(
            {},
            this.styles,
            this.appearanceOverrides,
            this.stylesActive,
            this.appearanceOverridesActive
          )
        );
      },
    },
    mounted() {
      /*
        When using the router, immediately emit the active tab ID (which will
        subsequently be received as the `activeTabId` prop). This ensures that
        on a page reload, `activeTabId` prop is set as soon as possible and can
        be used by `KTabsList` as well as `KTabPanel`. Otherwise this information
        would be missing until one of the tabs would be clicked causing various
        problems since `activeTabId` is crucial for their functioning.
       */
      if (this.useRouter) {
        this.$nextTick(() => {
          const activeRouteTab = this.$refs.tab.find(tab => tab.dataset.activeroute);
          if (activeRouteTab !== undefined) {
            const activeRouteTabId = activeRouteTab.dataset.tabid;
            this.emitActivate(activeRouteTabId);
          }
        });
      }
      this.$el.addEventListener('keyup', this.onKeyUp);
    },
    beforeDestroy() {
      this.$el.removeEventListener('keyup', this.onKeyUp);
    },
    methods: {
      classes(tabId) {
        return [
          'tab',
          this.isTabActive(tabId) ? 'active' : '',
          this.isTabActive(tabId) ? this.computedClassActive : this.computedClass,
        ];
      },
      tabIndexAttr(tabId) {
        return this.isTabActive(tabId) ? '0' : '-1';
      },
      ariaSelectedAttr(tabId) {
        return this.isTabActive(tabId) ? 'true' : 'false';
      },
      ariaControlsAttr(tabId) {
        return this.getTabPanelElementId(this.tabsId, tabId);
      },
      getTabElementId,
      getTabPanelElementId,
      getTabIdx(tabId) {
        if (!this.tabs || !this.tabs.length) {
          return;
        }
        return this.tabs.findIndex(tab => tab.id === tabId);
      },
      isTabActive(tabId) {
        return tabId === this.activeTabId;
      },
      focusTab(tabIdx) {
        if (tabIdx !== undefined && tabIdx !== null) {
          this.focusedTabIdx = tabIdx;
          this.$refs.tab[tabIdx].focus();
        }
      },
      focusFirstTab() {
        this.focusTab(this.firstTabIdx);
      },
      focusLastTab() {
        this.focusTab(this.lastTabIdx);
      },
      focusPreviousTab() {
        const newFocusedTabIdx =
          this.focusedTabIdx === this.firstTabIdx ? this.lastTabIdx : this.focusedTabIdx - 1;
        this.focusTab(newFocusedTabIdx);
      },
      focusNextTab() {
        const newFocusedTabIdx =
          this.focusedTabIdx === this.lastTabIdx ? this.firstTabIdx : this.focusedTabIdx + 1;
        this.focusTab(newFocusedTabIdx);
      },
      /**
       * @public
       * Puts focus on the active tab
       */
      focusActiveTab() {
        const activeTabIdx = this.getTabIdx(this.activeTabId);
        this.focusTab(activeTabIdx);
      },
      onClick(tabId, navigate, event) {
        this.focusedTabIdx = this.getTabIdx(tabId);
        this.emitClick(tabId);
        this.emitActivate(tabId);
        if (navigate) {
          navigate(event);
        }
      },
      onKeyUp(event) {
        const handlers = {
          ArrowLeft: this.focusPreviousTab,
          ArrowRight: this.focusNextTab,
          Home: this.focusFirstTab,
          End: this.focusLastTab,
        };
        const handler = handlers[event.key];
        if (handler) {
          event.preventDefault();
          event.stopPropagation();
          handler();
        }
      },
      emitActivate(tabId) {
        /**
         * Emitted when a tab is activated. Its payload is the active tab ID.
         */
        this.$emit('activate', tabId);
      },
      emitClick(tabId) {
        /**
         * Emitted when a tab is clicked. Its payload is the active tab ID.
         * When compared to the `activate` event, `click` is emitted only when
         * a user is interacting with tabs, whereas `activate` can be emitted
         * programatically in addition to user interaction.
         */
        this.$emit('click', tabId);
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '../styles/definitions';

  .tab {
    display: inline-block;
    min-width: 64px;
    min-height: 36px;
    padding: 0 16px;
    margin: 0 8px;
    overflow: hidden;
    font-size: 14px;
    font-weight: bold;
    line-height: 36px;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
    // Setting vertical align here to prevent an extra space below the tabs
    // https://stackoverflow.com/questions/23529369/why-does-x-overflowhidden-cause-extra-space-below
    vertical-align: middle;
    cursor: pointer;
    border-style: solid;
    border-width: 0 0 2px;
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;
    transition: background-color $core-time ease;

    @media print {
      min-width: 0;
      min-height: 0;
      padding: 0;
      margin: 0;
      font-size: inherit;
      line-height: inherit;
      text-align: left;
      text-transform: none;
      border-bottom-width: 0;

      &:not(.active) {
        display: none;
      }
    }
  }

</style>
