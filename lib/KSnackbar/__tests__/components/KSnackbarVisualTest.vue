<template>

  <VisualTestLayout>
    <VisualTestExample
      title="Basic Snackbar"
      width="400px"
      height="100px"
      loadExample="KSnackbar/BasicDisplay.vue"
    />

    <VisualTestExample
      title="Snackbar with Action"
      width="400px"
      height="100px"
      loadExample="KSnackbar/WithActionDisplay.vue"
    />

    <VisualTestExample
      title="Snackbar with Long Text"
      width="550px"
      height="120px"
      loadExample="KSnackbar/LongTextDisplay.vue"
    />
  </VisualTestLayout>

</template>


<script>

  export default {
    name: 'KSnackbarVisualTest',
  };

</script>

