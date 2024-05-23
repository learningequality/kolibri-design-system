<template>

  <div class="filter-wrapping-div">
    <input
      ref="input"
      :value="value"
      class="filter-input"
      placeholder="filter"
      type="text"
      @input="setVal($event.target.value)"
      @keydown.esc="escPressed"
    >
    <button
      v-show="value"
      class="filter-clear-button"
      @click="clickClearButton"
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
      escPressed() {
        if (this.value) {
          this.setVal('');
        } else {
          this.$refs.input.blur();
        }
      },
      clickClearButton() {
        this.setVal('');
        this.$refs.input.focus();
      },
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
