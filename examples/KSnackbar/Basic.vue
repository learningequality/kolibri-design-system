<template>

  <div>
    <KButton
      text="Show basic snackbar"
      @click="showBasic"
    />

    <KSnackbar
      :isOpen="snackbarState.isOpen"
      :text="snackbarState.text"
      @close="hideSnackbar"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar, hideSnackbar, snackbarState } = useKSnackbar();

      const showBasic = () => {
        createSnackbar({ text: 'Changes saved' });
      };

      return {
        snackbarState,
        hideSnackbar,
        showBasic,
      };
    },
  };

</script>
