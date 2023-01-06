<template>

  <div>
    <KTabsList
      v-model="activeTabId"
      v-bind="{ tabsId, tabs, ariaLabel, ariaLabelledBy, color, colorActive, backgroundColor, hoverBackgroundColor, appearanceOverrides, appearanceOverridesActive, enablePrint }"
    >
      <!-- provide the same `tab` slot and send its properties further up from `KTabsList` -->
      <template #tab="{ tab, isActive }">
        <!-- @slot Optional slot for tab labels. Exposes `tab` object and `isActive` boolean. -->
        <slot
          name="tab"
          :tab="tab"
          :isActive="isActive"
        >
        </slot>
      </template>
    </KTabsList>

    <KTabsPanel
      :tabsId="tabsId"
      :activeTabId="activeTabId"
      :style="{ margin: '16px 0' }"
    >
      <!-- send the default slot and named slots to `KTabsPanel` which will then process them -->
      <!-- @slot An alternative to using slots named by tabs' IDs. -->
      <slot></slot>
      <template v-for="(_, slot) in $slots" #[slot]>
        <slot :name="slot"></slot>
      </template>
    </KTabsPanel>
  </div>

</template>


<script>

  import tabsMixin from './tabsMixin';

  /**
   * Displays tabs.
   **/
  export default {
    name: 'KTabs',
    mixins: [tabsMixin],
    props: {
      /**
       * An ID of a tabbed interface represented
       * by this component.
       * Needs to be be unique in regards to all
       * tabbed interfaces rendered on one page.
       */
      tabsId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        activeTabId: '',
      };
    },
    mounted() {
      // automatically set the first tab as active when not using router
      // (if a router is used, 'activeTabId' is set by `KTabList` to correspond to the current route)
      if (!this.useRouter && this.tabs && this.tabs.length) {
        this.activeTabId = this.tabs[0].id;
      }
    },
  };

</script>