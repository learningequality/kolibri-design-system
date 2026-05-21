<template>

  <span
    class="badge"
    :class="{ small }"
    :style="{
      backgroundColor: $themePalette.lightblue.v_50,
      color: $themePalette.lightblue.v_600,
    }"
  >
    Candidate
  </span>

</template>


<script>

  export default {
    name: 'BadgeCandidate',
    props: {
      small: {
        type: Boolean,
        default: false,
      },
    },
  };

</script>


<style lang="scss" scoped>

  .badge {
    display: inline-block;
    padding: 2px 8px;
    margin-left: 12px;
    font-size: 14px;
    border-radius: 6px;
  }

  .small {
    padding: 2px 6px;
    margin-left: 6px;
    font-size: 12px;
  }

</style>
