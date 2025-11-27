<template>

  <KCheckbox
    v-model="inputValue"
    label="Deselected disabled checkbox"
    :disabled="true"
  />

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
