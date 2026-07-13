<template>

  <KSnackbar
    :isOpen="true"
    text="This is a longer message demonstrating how the snackbar handles extended text"
    actionText="Got it"
    :duration="0"
  />

</template>


<style scoped>

  ::v-deep .k-snackbar-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  ::v-deep .k-snackbar {
    position: static !important;
    display: inline-flex;
  }

</style>
