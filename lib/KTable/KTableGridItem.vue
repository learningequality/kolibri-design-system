<template>

  <td :style="{ textAlign: textAlign }" tabindex="0" @keydown="onKeydown">
    <slot :content="content">
      {{ content }}
    </slot>
  </td>

</template>


<script>

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
    },
    computed: {
      textAlign() {
        return this.dataType === 'numeric' ? 'right' : 'left';
      },
    },
    methods: {
      onKeydown(event) {
        this.$emit('keydown', event, this.rowIndex, this.colIndex);
      },
    },
  };

</script>


<style scoped>
td:focus {
  outline: 2px solid #007bff;
  outline-offset: -2px;
  z-index: 1;
  position: relative;
}
</style>