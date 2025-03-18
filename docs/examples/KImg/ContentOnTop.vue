<template>

  <KImg
    :src="require('../../assets/hummingbird-small-cc-by-sa-4.jpg')"
    altText="A sitting hummingbird"
  >
    <template #topLeft>
      <span class="label"> Top left </span>
    </template>
  </KImg>

</template>


<style lang="scss" scoped>

  .label {
    display: inline-block;
    padding: 2px;
    margin: 8px;
    background-color: white;
  }

</style>
