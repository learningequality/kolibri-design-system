<template>

  <KCheckbox
    v-model="inputValue"
    label="Deselected readonly checkbox"
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
