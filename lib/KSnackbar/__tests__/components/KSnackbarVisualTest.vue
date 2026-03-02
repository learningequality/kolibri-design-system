<template>

  <VisualTestLayout>
    <VisualTestExample
      title="Basic Snackbar"
      width="400px"
      height="100px"
      loadExample="KSnackbar/Basic.vue"
    />

    <VisualTestExample
      title="Snackbar with Action"
      width="400px"
      height="100px"
      loadExample="KSnackbar/WithAction.vue"
    />

    <VisualTestExample
      title="Persistent Snackbar"
      width="400px"
      height="100px"
      loadExample="KSnackbar/Persistent.vue"
    />

    <VisualTestExample
      title="Snackbar with Backdrop"
      width="400px"
      height="150px"
      loadExample="KSnackbar/WithBackdropInteractive.vue"
    />

    <VisualTestExample
      title="Snackbar with Long Text"
      width="550px"
      height="120px"
      loadExample="KSnackbar/LongTextInteractive.vue"
    />

    <VisualTestExample
      title="Snackbar with Bottom Offset"
      width="400px"
      height="150px"
      loadExample="KSnackbar/WithBottomOffset.vue"
    />
  </VisualTestLayout>

</template>


<script>

  export default {
    name: 'KSnackbarVisualTest',
  };

</script>

