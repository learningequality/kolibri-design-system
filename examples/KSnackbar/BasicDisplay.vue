<template>

  <KSnackbar
    :isOpen="true"
    text="Changes saved"
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
