<template>

  <KCheckbox
    v-model="selectedString"
    :label="`selectedString = ${selectedString}`"
    :value="'String'"
  />

</template>


<script>

  export default {
    data() {
      return {
        selectedString: 'String',
      };
    },
  };

</script>
