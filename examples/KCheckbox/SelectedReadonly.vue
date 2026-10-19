<template>

  <KCheckbox
    v-model="inputValue"
    label="Selected readonly checkbox"
    :readonly="true"
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
