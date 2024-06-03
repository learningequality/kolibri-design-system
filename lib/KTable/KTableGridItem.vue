<template>

  <td :style="{ textAlign: align }" tabindex="0" @keydown="onKeydown">
    {{ content }}
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
      align: {
        type: String,
        default: 'left',
      },
      rowIndex: {
        type: Number,
        required: true,
      },
      cellIndex: {
        type: Number,
        required: true,
      },
    },
    methods: {
      onKeydown(event) {
        this.$emit('keydown', event, this.rowIndex, this.cellIndex);
      },
    },
  };

</script>


<style scoped>
  td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  td:focus {
    outline: 2px solid #007bff;
    outline-offset: -2px;
  }
</style>