<template>

  <KCheckbox
    v-model="inputValue"
    label="Indeterminate disabled checkbox"
    :indeterminate="true"
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
