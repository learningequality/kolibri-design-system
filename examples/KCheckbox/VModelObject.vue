<template>

  <KCheckbox
    v-model="selectedObject"
    :label="`selectedObject = ${JSON.stringify(selectedObject)}`"
    :value="{ id: 1, name: 'Name 1' }"
  />

</template>


<script>

  export default {
    data() {
      return {
        selectedObject: { id: 1, name: 'Name 1' },
      };
    },
  };

</script>
