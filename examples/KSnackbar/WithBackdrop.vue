<template>

  <div>
    <KButton
      text="Show snackbar with backdrop"
      @click="showWithBackdrop"
    />

    <KSnackbar
      :isOpen="snackbarState.isOpen"
      :text="snackbarState.text"
      :actionText="snackbarState.actionText"
      :actionCallback="snackbarState.actionCallback"
      :backdrop="snackbarState.backdrop"
      :duration="snackbarState.duration"
      :bottomOffset="snackbarState.bottomOffset"
      @close="hideSnackbar"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar, hideSnackbar, snackbarState } = useKSnackbar();

      const showWithBackdrop = () => {
        createSnackbar({
          text: 'Your session will expire soon.',
          actionText: 'Dismiss',
          duration: 0,
          backdrop: true,
          actionCallback: () => {},
        });
      };

      return {
        snackbarState,
        hideSnackbar,
        showWithBackdrop,
      };
    },
  };

</script>
