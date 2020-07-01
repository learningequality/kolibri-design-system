<template>

  <div class="filter-wrapping-div">
    <input
      :value="value"
      class="filter-input"
      placeholder="filter"
      type="text"
      @input="setVal($event.target.value)"
      @keydown.esc="setVal('')"
    >
    <button
      v-show="value"
      class="filter-clear-button"
      @click="setVal('')"
    >
      ✕
    </button>
  </div>

</template>


<script>

  export default {
    name: 'DocsFilter',
    props: {
      value: {
        type: String,
        default: '',
      },
    },
    methods: {
      setVal(newVal) {
        this.$emit('input', newVal);
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '~/assets/definitions';

  .filter-wrapping-div {
    position: relative;
  }

  .filter-input {
    width: 100%;
    padding-top: 4px;
    padding-right: 32px;
    padding-bottom: 4px;
    padding-left: 8px;
    font-size: 12px;
    border: 1px solid $border-color;
    border-radius: 4px;
    &::placeholder {
      color: $border-color;
    }
  }

  .filter-clear-button {
    position: absolute;
    top: 3px;
    right: 2px;
    width: 30px;
    height: 21px;
    font-size: 14px;
    background: none;
    border: 0;
    border-radius: 2px;
  }

</style>
