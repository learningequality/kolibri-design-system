<template>

  <div class="list-wrapper">
    <div
      ref="list"
      class="list"
    >
      <template v-for="(item, idx) in items">
        <slot
          name="item"
          :item="item"
          :idx="idx"
        />
      </template>
    </div>
    <slot
      v-if="isMoreButtonVisible"
      name="more"
      :overflowItems="overflowItems"
    />
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
        isMoreButtonVisible: false,
      };
    },
    computed: {
      listHeight() {
        const defaultHeight = 50;
        // height of the first child, assuming all children have the same height
        const { list } = this.$refs;
        if (!list) {
          return defaultHeight;
        }
        const firstChild = list.children[0];
        console.log('firstChild', firstChild);
        return firstChild.clientHeight || defaultHeight;
      },
    },
    watch: {
      isMoreButtonVisible(prev, next) {
        if (!prev && next) {
          // just in case the presence of the more button changes the overflowed items
          this.$nextTick(() => {
            this.setOverflowItems();
          });
        }
      },
      items() {
        this.$nextTick(() => {
          this.setOverflowItems();
        });
      },
    },
    mounted() {
      this.mounted = true;
      this.$refs.list.style.height = `${this.listHeight}px`;
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
        if (!this.mounted) {
          this.overflowItems = [];
          return;
        }
        const list = this.$refs.list;
        if (!list) {
          return;
        }
        const containerTop = list.offsetTop;
        const containerBottom = containerTop + list.clientHeight;

        this.overflowItems = this.items.filter((_, idx) => {
          const itemRef = list.children[idx];
          const itemRefTop = itemRef.offsetTop;
          return itemRefTop >= containerBottom;
        });

        this.isMoreButtonVisible = this.overflowItems.length > 0;
        console.log('overflowItems', this.overflowItems);
      },
    },
  }
</script>


<style>

  .list {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    height: 50px;
  }

</style>