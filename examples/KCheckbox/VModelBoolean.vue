<template>

  <KCheckbox
    v-model="isSelected"
    :label="`isSelected = ${isSelected}`"
  />

</template>


<script>

  export default {
    data() {
      return {
        isSelected: true,
      };
    },
  };

</script>
