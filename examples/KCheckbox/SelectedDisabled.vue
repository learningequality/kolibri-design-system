<template>

  <KCheckbox
    v-model="inputValue"
    label="Selected disabled checkbox"
    :disabled="true"
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
