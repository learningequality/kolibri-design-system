<template>

  <div class="wrapper">
    <slot></slot>
  </div>

</template>


<script>

  export default {
    name: 'SkeletonCustom',
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