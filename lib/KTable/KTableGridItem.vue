<template>

  <td
    :class="$computedClass(coreOutlineFocus)"
    :style="{ textAlign: textAlign, minWidth: minWidth, width: width }"
    tabindex="0"
    data-focus="true"
    role="gridcell"
    @keydown="onKeydown"
  >
    <slot :content="content">
      {{ content }}
    </slot>
  </td>

</template>


<script>

  import { DATA_TYPE_NUMERIC } from '../composables/useSorting';

  export default {
    name: 'KTableGridItem',
    props: {
      content: {
        type: [String, Number],
        required: true,
      },
      dataType: {
        type: String,
        default: 'string',
      },
      rowIndex: {
        type: Number,
        required: true,
      },
      colIndex: {
        type: Number,
        required: true,
      },
      minWidth: {
        type: String,
        default: 'auto',
      },
      width: {
        type: String,
        default: 'auto',
      },
    },
    computed: {
      coreOutlineFocus() {
        return {
          ':focus': {
            ...this.$coreOutline,
            outlineOffset: '-2px',
          },
        };
      },
      textAlign() {
        return this.dataType === DATA_TYPE_NUMERIC ? 'right' : 'left';
      },
    },
    methods: {
      onKeydown(event) {
        // Check if the focused element is a button or actionable item
        const focusedElement = event.target;
        if (
          event.key === 'Enter' &&
          (focusedElement.tagName === 'BUTTON' ||
            focusedElement.tagName === 'A' ||
            focusedElement.hasAttribute('role'))
        ) {
          focusedElement.click();
        } else {
          this.$emit('keydown', event, this.rowIndex, this.colIndex);
        }
      },
    },
  };

</script>


<style scoped>
td {
  word-wrap: break-word; 
  white-space: normal; 
}


</style>