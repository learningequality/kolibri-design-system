<template>

  <KCheckbox
    v-model="inputValue"
    label="Indeterminate checkbox"
    :indeterminate="true"
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
