<template>

  <KCheckbox
    v-model="inputValue"
    label="Checkbox with description"
    description="This is a helpful description text below the checkbox label"
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
