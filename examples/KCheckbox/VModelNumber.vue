<template>

  <KCheckbox
    v-model="selectedNumber"
    :label="`selectedNumber = ${selectedNumber}`"
    :value="1"
  />

</template>


<script>

  export default {
    data() {
      return {
        selectedNumber: 1,
      };
    },
  };

</script>
