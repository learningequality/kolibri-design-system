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

  import { DATA_TYPE_NUMERIC } from './useSorting';

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
        const alignLtr = this.dataType === DATA_TYPE_NUMERIC ? 'right' : 'left';
        if (this.isRtl && alignLtr === 'right') {
          return 'left';
        }
        if (this.isRtl && alignLtr === 'left') {
          return 'right';
        }
        return alignLtr;
      },
    },
    methods: {
      onKeydown(event) {
        // Ensures that clickable elements within a table cell, such as buttons and links, can be clicked with ENTER key.
        const focusedElement = event.target;
        if (
          event.key === 'Enter' &&
          (focusedElement.tagName === 'BUTTON' || focusedElement.tagName === 'A')
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