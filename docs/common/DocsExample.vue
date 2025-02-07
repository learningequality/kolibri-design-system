<template>

  <div class="docs-example">
    <div class="code-toggle-button">
      <KIconButton
        appearance="raised-button"
        :icon="isCodeVisible ? 'chevronUp' : 'codeToggle'"
        tooltip="Toggle code visibility"
        @click="toggleCodeVisibility"
      />
    </div>

    <div v-show="isCodeVisible">
      <!-- @slot Code sample -->
      <slot name="code"></slot>
    </div>

    <div>
      <!-- @slot Code example -->
      <slot></slot>
    </div>
  </div>

</template>


<script>

  export default {
    name: 'DocsExample',
    data() {
      return {
        isCodeVisible: false,
      };
    },
    methods: {
      toggleCodeVisibility() {
        this.isCodeVisible = !this.isCodeVisible;
      },
    },
  };

</script>


<style scoped>

  .docs-example {
    padding: 20px;
    padding-top: 0;
    margin-bottom: 24px;
  }

  .code-toggle-button {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }

</style>
