<template>

  <td
    :class="$computedClass(coreOutlineFocus)"
    :style="{ textAlign: textAlign, minWidth: minWidth, width: width }"
    tabindex="0"
    data-focus="true"
    role="gridcell"
    @keydown="onKeydown"
  >
    <div class="cell-content">
      <slot :content="content">
        {{ content }}
      </slot>
    </div>
  </td>

</template>


<script>

  export default {
    name: 'KTableGridItem',
    props: {
      content: {
        type: [String, Number, Boolean, Object, Array],
        required: true,
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
      textAlign: {
        type: String,
        required: true,
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
    },
    methods: {
      onKeydown(event) {
        // Ensures that clickable elements within a table cell, such as buttons and links,
        // can be clicked with ENTER key.
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

  .cell-content {
    word-break: break-word;
    white-space: normal;
  }

</style>
