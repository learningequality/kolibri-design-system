<template>

  <KCheckbox
    :label="`isSelected = ${isSelected}`"
    :checked="isSelected"
    @change="isSelected = $event"
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
