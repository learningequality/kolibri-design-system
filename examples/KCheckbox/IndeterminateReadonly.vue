<template>

  <KCheckbox
    v-model="inputValue"
    label="Indeterminate readonly checkbox"
    :indeterminate="true"
    :readonly="true"
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
