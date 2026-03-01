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

    <VisualTestExample
      title="Snackbar with Backdrop"
      width="400px"
      height="150px"
    >
      <KSnackbar
        :isOpen="true"
        text="Critical message with backdrop"
        actionText="Dismiss"
        :backdrop="true"
        :duration="0"
        style="position: absolute; right: auto; bottom: 0; left: 0; margin: 10px"
      />
    </VisualTestExample>

    <VisualTestExample
      title="Snackbar with Fade Transition"
      width="400px"
      height="100px"
    >
      <KSnackbar
        :isOpen="true"
        text="Using fade transition"
        transition="fade"
        :duration="0"
        style="position: absolute; right: auto; bottom: 0; left: 0; margin: 10px"
      />
    </VisualTestExample>

    <VisualTestExample
      title="Snackbar with Long Text"
      width="550px"
      height="120px"
    >
      <KSnackbar
        :isOpen="true"
        text="This is a longer message demonstrating how the snackbar handles extended text"
        actionText="Got it"
        :duration="0"
        style="position: absolute; right: auto; bottom: 0; left: 0; margin: 10px"
      />
    </VisualTestExample>

    <VisualTestExample
      title="Snackbar with Bottom Offset"
      width="400px"
      height="150px"
    >
      <KSnackbar
        :isOpen="true"
        text="Positioned with bottom offset"
        :bottomOffset="60"
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
