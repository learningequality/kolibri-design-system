<template>

  <div>
    <KButton @click="isTruthy = !isTruthy"> {{ isTruthy ? 'Hide' : 'Show' }} </KButton>

    <KTransition kind="component-vertical-slide-out-in">
      <p
        v-if="isTruthy"
        key="sample-text"
      >
        This is some sample text, whose height will be animated when toggled.
      </p>
    </KTransition>
  </div>

</template>


<script>

  export default {
    data() {
      return {
        isTruthy: true,
      };
    },
  };

</script>
