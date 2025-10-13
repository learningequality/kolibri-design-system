<template>

  <KCheckbox
    v-model="inputValue"
    label="Deselected checkbox"
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
