<template>

  <KImg
    src=""
    isDecorative
    aspectRatio="16:9"
    :style="{ maxWidth: '200px' }"
  >
    <template #placeholder>
      <span class="placeholder">
        <KIcon icon="readSolid" />
      </span>
    </template>
  </KImg>

</template>


<style lang="css" scoped>

  .placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

</style>
