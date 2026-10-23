<template>

  <td
    :style="tdStyle"
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
      tdStyle() {
        return {
          textAlign: this.textAlign,
          minWidth: this.minWidth,
          width: this.width,
          borderBottom: `1px solid var(--tokens-fineLine)`,
          minHeight: '40px',
          height: 'auto',
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


<style lang="scss" scoped>

  // the cell is flush with its neighbors, so the outline is drawn inside it
  td:focus-visible {
    outline-offset: -2px;
  }

  .cell-content {
    justify-content: inherit;
    word-break: break-word;
    white-space: normal;
  }

</style>
