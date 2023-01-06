<template>

  <div
    :id="getTabPanelElementId(tabsId, activeTabId)"
    ref="panel"
    role="tabpanel"
    :tabindex="tabIndexAttr"
    :aria-labelledby="getTabElementId(tabsId, activeTabId)"
  >
    <!-- @slot An alternative to using slots named by tabs' IDs. -->
    <slot></slot>
    <!-- @slot Slots named by tab's IDs. Only content corresponding to the active tab is displayed. -->
    <slot :name="[activeTabId]"></slot>
  </div>

</template>


<script>

  import { getTabElementId, getTabPanelElementId, getFirstFocusableChild } from './utils';

  /**
   * A part of a tabbed interface that displays
   * content associated with the active tab.
   * It is meant to be used together with `KTabsList`.
   */
  export default {
    name: 'KTabsPanel',
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
        tabIndexAttr: '-1',
      };
    },
    watch: {
      activeTabId(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.updateTabIndexAttr();
        }
      },
    },
    mounted() {
      this.updateTabIndexAttr();
    },
    methods: {
      getTabElementId,
      getTabPanelElementId,
      /**
       * "When the tabpanel does not contain any focusable elements
       * or the first element with content is not focusable,
       * the tabpanel should set tabindex="0" to include it in the tab
       * sequence of the page."
       * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
       */
      updateTabIndexAttr() {
        this.$nextTick(() => {
          const firstFocusableElement = getFirstFocusableChild(this.$el);
          this.tabIndexAttr = firstFocusableElement ? '-1' : '0';
        });
      },
    },
  };

</script>