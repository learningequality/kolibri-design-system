<template>

  <KCheckbox
    v-model="inputValue"
    label="Selected checkbox"
  />

</template>


<script>

  export default {
    data() {
      return {
        inputValue: true,
      };
    },
  };

</script>
