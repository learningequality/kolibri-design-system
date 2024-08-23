<template>

  <li
    class="k-card-grid-item"
    tabindex="0"
    data-focus="true"
    :class="{ 'with-checkbox': $slots.checkbox, [$computedClass(coreOutlineFocus)]: true }"
    :style="gridItemStyle"
    @keyup.enter="onEnter"
  >
    <!-- @slot Slot for `KCard`s -->
    <slot></slot>
    <!-- @slot Optional slot for `KCheckbox` -->
    <div v-if="$slots.checkbox" class="checkbox">
      <slot name="checkbox"></slot>
    </div>
  </li>

</template>


<script>

  import { inject } from '@vue/composition-api';

  export default {
    name: 'KCardGridItem',
    setup() {
      // provided by `KCardGrid`
      const gridItemStyle = inject('gridItemStyle');

      return {
        gridItemStyle,
      };
    },
    computed: {
      coreOutlineFocus() {
        return {
          ':focus': {
            ...this.$coreOutline,
          },
        };
      },
    },
    methods: {
      onEnter() {
        this.$el.children[0].click();
      },
    },
  };

</script>


<style lang="scss" scoped>

  .k-card-grid-item {
    border-radius: 0.5em;
    outline-offset: -1px;

    &.with-checkbox {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
    }
  }

  .checkbox {
    margin-right: 20px;
  }

</style>