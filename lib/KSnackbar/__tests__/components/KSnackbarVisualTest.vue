<template>

  <VisualTestLayout>
    <VisualTestExample
      title="Basic Snackbar"
      width="400px"
      height="100px"
    >
      <KSnackbar
        :isOpen="true"
        text="Profile updated"
        :duration="0"
        style="position: absolute; right: auto; bottom: 0; left: 0; margin: 10px"
      />
    </VisualTestExample>

    <VisualTestExample
      title="Snackbar with Action"
      width="400px"
      height="100px"
    >
      <KSnackbar
        :isOpen="true"
        text="Item deleted"
        actionText="Undo"
        :duration="0"
        style="position: absolute; right: auto; bottom: 0; left: 0; margin: 10px"
      />
    </VisualTestExample>
  </VisualTestLayout>

</template>


<script>

  export default {
    name: 'KSnackbarVisualTest',
  };

</script>


<style scoped>

  .k-snackbar {
    /* Override fixed position for visual tests */
    position: absolute !important;
    bottom: 0 !important;
    left: 0 !important;
    margin: 10px !important;
  }

</style>
