<template>

  <div class="wrapper">
    <div
      class="shape-1"
      :style="{ backgroundColor: $themePalette.grey.v_100 }"
    ></div>

    <div
      class="shape-2"
      :style="{ backgroundColor: $themePalette.grey.v_100 }"
    ></div>

    <div
      class="shape-3"
      :style="{ backgroundColor: $themePalette.grey.v_100 }"
    ></div>
  </div>

</template>


<script>

  export default {
    name: 'SkeletonGeneric',
  };

</script>


<style lang="scss" scoped>

  @import '../styles/definitions';

  @keyframes loading {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .shape-1,
  .shape-2,
  .shape-3 {
    height: 28px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 4px;
  }

  .shape-1 {
    width: 100%;
  }

  .shape-2 {
    width: 90%;
  }

  .shape-3 {
    width: 80%;
  }

  .wrapper {
    position: relative;
  }

  .wrapper::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    content: '';
    background: linear-gradient(270deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%);
    animation: loading 1.5s infinite ease-in-out;
  }

</style>