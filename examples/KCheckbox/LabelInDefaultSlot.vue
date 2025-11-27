<template>

  <KCheckbox
    v-model="inputValue"
    showLabel
  >
    <span>Label from default slot</span>
  </KCheckbox>

</template>


<script>

  export default {
    data() {
      return {
        inputValue: false,
      };
    },
  };

</script>
