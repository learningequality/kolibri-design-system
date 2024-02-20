<template>

  <div
    ref="listWrapper"
    class="list-wrapper"
  >
    <div
      ref="list"
      class="list"
    >
      <template v-for="(item, idx) in items">
        <slot
          name="item"
          :item="item"
          :idx="idx"
        ></slot>
      </template>
    </div>
    <div
      ref="moreButtonWrapper"
      class="more-button-wrapper"
    >
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

  export default {
    name: 'KListWithOverflow',
    props: {
      items: {
        type: Array,
        required: true,
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
      this.mounted = true;
      this.setMoreButtonWidth();
      this.$nextTick(() => {
        this.setOverflowItems();
      });

      // Defining the throttled set Overflow Items here instead of as method on the options object
      // avoids sharing it across multiple instances, ensuring each component has its own function.
      this.throttledSetOverflowItems = throttle(this.setOverflowItems, 100);
      window.addEventListener('resize', this.throttledSetOverflowItems);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.throttledSetOverflowItems);
    },
    methods: {
      setOverflowItems() {
        const { list, listWrapper } = this.$refs;
        if (!this.mounted || !listWrapper || !list) {
          this.overflowItems = [];
          return;
        }

        let availableWidth = listWrapper.clientWidth;
        availableWidth -= this.moreButtonWidth;
        let maxWidth = 0;

        const overflowItemsIdx = [];
        for (let i = 0; i < list.children.length; i++) {
          const item = list.children[i];
          const itemWidth = item.clientWidth;

          // If the item dont fit in the available space or if we have already
          // overflowed items, we hide it
          if (itemWidth > availableWidth || overflowItemsIdx.length > 0) {
            overflowItemsIdx.push(i);
            item.style.visibility = 'hidden';
          } else {
            item.style.visibility = 'visible';
            maxWidth += itemWidth;
            availableWidth -= itemWidth;
          }
        }

        // check if overflowed items would fit if the moreButton were not visible
        const overflowedWidth = overflowItemsIdx.reduce(
          (acc, idx) => acc + list.children[idx].clientWidth,
          0
        );
        if (overflowedWidth <= this.moreButtonWidth + availableWidth) {
          while (overflowItemsIdx.length > 0) {
            const idx = overflowItemsIdx.pop();
            const item = list.children[idx];
            item.style.visibility = 'visible';
            maxWidth += item.clientWidth;
          }
        }

        this.overflowItems = overflowItemsIdx.map(idx => this.items[idx]);
        this.isMoreButtonVisible = overflowItemsIdx.length > 0;
        list.style.maxWidth = `${maxWidth}px`;
      },
      setMoreButtonWidth() {
        const { moreButtonWrapper } = this.$refs;
        if (!moreButtonWrapper) {
          return;
        }
        this.moreButtonWidth = moreButtonWrapper.clientWidth;

        this.isMoreButtonVisible = false;
        moreButtonWrapper.style.visibility = 'visible';
      },
    },
  };

</script>


<style>

  .list-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 100%;
  }
  .list {
    overflow: visible;
    display: flex;
    flex-wrap: nowrap;
  }

  .list > * {
    visibility: hidden;
    flex-shrink: 0;
  }

  .more-button-wrapper {
    visibility: hidden;
  }

</style>
