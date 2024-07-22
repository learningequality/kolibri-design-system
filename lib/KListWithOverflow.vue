<template>

  <div
    ref="listWrapper"
    class="list-wrapper"
    :style="appearanceOverrides"
  >
    <div
      ref="list"
      class="list"
    >
      <template v-for="(item) in items">
        <!-- @slot Slot for rendering divider items -->
        <slot
          v-if="isDivider(item)"
          name="divider"
          :divider="item"
        >
        </slot>
        <!-- @slot Slot responsible of rendering each item in the visible list -->
        <slot
          v-else
          name="item"
          :item="item"
        ></slot>
      </template>
    </div>
    <div
      ref="moreButtonWrapper"
      class="more-button-wrapper"
    >
      <!-- @slot Slot responsible of rendering the "see more" button. This slot receives as prop a list `overflowItems` with items that dont fit into the visible list.-->
      <slot
        v-if="isMoreButtonVisible"
        name="more"
        :overflowItems="overflowItems"
      ></slot>
    </div>
  </div>

</template>


<script>

  import throttle from 'lodash/throttle';
  import useKResponsiveElement from './composables/_useKResponsiveElement';

  export default {
    name: 'KListWithOverflow',
    setup() {
      const { elementWidth } = useKResponsiveElement();
      return { elementWidth };
    },
    props: {
      /**
       * An array of items to be shown, the items can be any type of object or primitive, as
       * they are passed to the `#item` slot for rendering.
       * The only special type of item is a divider, which must be an object with a `type`
       * property set to "divider", and this will render the #divider slot.
       */
      items: {
        type: Array,
        required: true,
      },
      /**
       * An object or string with CSS properties to be applied to the list wrapper
       */
      appearanceOverrides: {
        type: [Object, String],
        default: null,
      },
    },
    data() {
      return {
        mounted: false,
        overflowItems: [],
        // default to true just to measure its width at first render
        isMoreButtonVisible: true,
        moreButtonWidth: 0,
      };
    },
    watch: {
      items() {
        this.$nextTick(() => {
          this.setOverflowItems();
        });
      },
    },
    mounted() {
      // For some reason KIconButtons takes 2 ticks to render their actual size
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.mounted = true;
          this.setMoreButtonWidth();
          this.setOverflowItems();
        });
      });

      // Defining the throttled set Overflow Items here instead of as method on the options object
      // avoids sharing it across multiple instances, ensuring each component has its own function.
      this.throttledSetOverflowItems = throttle(this.setOverflowItems, 100);
      this.$watch('elementWidth', this.throttledSetOverflowItems);

      // Add resize observer to watch inner list items size changes
      if (typeof window !== 'undefined' && window.ResizeObserver) {
        this.resizeObserver = new ResizeObserver(this.throttledSetOverflowItems);
        this.resizeObserver.observe(this.$refs.list);
      }
    },
    beforeUnmount() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
    },
    methods: {
      getSize(element) {
        if (!element) {
          return { width: 0, height: 0 };
        }
        const { width, height } = element.getBoundingClientRect();
        return { width, height };
      },
      /**
       * Sets the items that overflow the list, the visibility of the more button,
       * and overrides the `visibility` of the list DOM elements that overflow the list.
       */
      setOverflowItems() {
        const { list, listWrapper, moreButtonWrapper } = this.$refs;
        if (!this.mounted || !listWrapper || !list) {
          this.overflowItems = [];
          return;
        }

        const newMoreButtonWidth = this.getSize(moreButtonWrapper).width;
        if (this.isMoreButtonVisible && newMoreButtonWidth > 0) {
          this.moreButtonWidth = newMoreButtonWidth;
        }

        let availableWidth = this.getSize(listWrapper).width;
        availableWidth -= this.moreButtonWidth;
        let maxWidth = 0;
        let maxHeight = 0;

        const itemsSizes = [];

        for (let i = 0; i < list.children.length; i++) {
          const item = list.children[i];
          const itemSize = this.getSize(item);
          itemsSizes.push(itemSize);
        }

        const overflowItemsIdx = [];
        for (let i = 0; i < list.children.length; i++) {
          const item = list.children[i];
          const itemWidth = itemsSizes[i].width;

          // If the item dont fit in the available space or if we have already
          // overflowed items, we hide it. This means that once one item overflows,
          // all the following items will be hidden.
          if (itemWidth >= availableWidth || overflowItemsIdx.length > 0) {
            overflowItemsIdx.push(i);
            item.style.visibility = 'hidden';
            item.style.position = 'absolute';
          } else {
            item.style.visibility = 'visible';
            item.style.position = 'unset';
            maxWidth += itemWidth;
            availableWidth -= itemWidth;
            const itemHeight = itemsSizes[i].height;
            if (itemHeight > maxHeight) {
              maxHeight = itemHeight;
            }
          }
        }

        // check if overflowed items would fit if the moreButton were not visible
        const overflowedWidth = overflowItemsIdx.reduce(
          (acc, idx) => acc + itemsSizes[idx].width,
          0
        );
        if (overflowedWidth <= this.moreButtonWidth + availableWidth) {
          while (overflowItemsIdx.length > 0) {
            const idx = overflowItemsIdx.pop();
            const item = list.children[idx];
            item.style.visibility = 'visible';
            maxWidth += itemsSizes[idx].width;
          }
        }

        const removedDividerWidth = this.fixDividersVisibility(overflowItemsIdx, itemsSizes);
        if (removedDividerWidth) {
          maxWidth -= removedDividerWidth;
        }

        maxWidth = Math.ceil(maxWidth);
        this.overflowItems = overflowItemsIdx.map(idx => this.items[idx]);
        this.isMoreButtonVisible = overflowItemsIdx.length > 0;
        list.style.maxWidth = `${maxWidth}px`;
        list.style.maxHeight = `${maxHeight}px`;
      },
      /**
       * Fixes the visibility of the dividers that are shown and hidden when the list overflows.
       * The visible list should not end with a divider, and the overflowed items should not
       * start with a divider.
       * @param {Array} overflowItemsIdx - The indexes of the items that overflow the list
       * @param {Array} itemsSizes - The sizes of the items in the list
       * @returns {Number} The width of the removed divider from the visible list, if any
       */
      fixDividersVisibility(overflowItemsIdx, itemsSizes) {
        if (overflowItemsIdx.length === 0) {
          return;
        }

        const { list } = this.$refs;
        const [firstOverflowedIdx] = overflowItemsIdx;
        if (this.isDivider(this.items[firstOverflowedIdx])) {
          overflowItemsIdx.shift();
        }

        const lastVisibleIdx = firstOverflowedIdx - 1;
        if (this.isDivider(this.items[lastVisibleIdx])) {
          const dividerNode = list.children[lastVisibleIdx];
          dividerNode.style.visibility = 'hidden';
          return itemsSizes[lastVisibleIdx].width;
        }
      },
      /**
       * At first render we need to measure the width of the more button, but
       * we dont show the button until we determine that there are overflowed items.
       * To do this, the component starts with `isMoreButtonVisible` set to true, but
       * its wrapper is hidden. After measuring the button width, we set the wrapper
       * to visible and set the actual value of `isMoreButtonVisible`.
       */
      setMoreButtonWidth() {
        const { moreButtonWrapper } = this.$refs;
        if (!moreButtonWrapper) {
          return;
        }
        this.moreButtonWidth = this.getSize(moreButtonWrapper).width;

        this.isMoreButtonVisible = false;
        moreButtonWrapper.style.visibility = 'visible';
      },
      isDivider(item) {
        return typeof item === 'object' && item.type === 'divider';
      },
    },
  };

</script>


<style scoped>

  .list-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .list {
    overflow: visible;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    align-items: center;
  }

  .list > * {
    visibility: hidden;
    flex-shrink: 0;
  }

  .more-button-wrapper {
    visibility: hidden;
  }

</style>
