<template>

  <div class="scroll-container">
    <div class="scroll-content">
      <KButton
        ref="button"
        :text="buttonText"
        hasDropdown
        appearance="flat-button"
      >
        <template #menu>
          <KDropdownMenu
            :options="options"
            :constrainToScrollParent="false"
          >
            <template #header>
              <span class="menu-header">Sort</span>
              <span class="menu-header">by</span>
            </template>
          </KDropdownMenu>
        </template>
      </KButton>
    </div>
  </div>

</template>


<script>

  export default {
    name: 'AtViewportEdge',
    data() {
      return {
        buttonText: 'More',
        options: [
          'Align right',
          'Clear formatting',
          'Bulleted list',
          'Numbered list',
          'Subscript',
          'Superscript',
          'Insert image',
          'Math formula',
          'Code block',
        ],
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.button.$el.click();
      });
    },
  };

</script>


<style scoped>

  .scroll-container {
    height: 160px;
    margin-top: 300px;
    margin-right: -24px;
    overflow: auto;
  }

  .menu-header {
    line-height: 48px;
  }

  .scroll-content {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    height: 400px;
  }

</style>
