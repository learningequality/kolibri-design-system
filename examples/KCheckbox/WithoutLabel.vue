<template>

  <KCheckbox
    v-model="inputValue"
    label="Hidden label"
    :showLabel="false"
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
