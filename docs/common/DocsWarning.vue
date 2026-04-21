<template>

  <div
    class="wrapper"
    :style="{
      backgroundColor: $themePalette.yellow.v_100,
      borderLeftColor: $themePalette.yellow.v_500,
    }"
  >
    <KIcon
      icon="warning"
      class="icon"
      :color="$themePalette.yellow.v_500"
    />
    <div class="content">
      <slot></slot>
    </div>
  </div>

</template>


<script>

  export default {
    name: 'DocsWarning',
  };

</script>


<style lang="scss" scoped>

  .wrapper {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 12px 16px;
    margin: 16px 0;
    border-left: 4px solid;
    border-radius: 4px;
  }

  .icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }

</style>
