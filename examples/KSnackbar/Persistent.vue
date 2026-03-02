<template>

  <div>
    <KButton
      text="Show persistent snackbar"
      @click="showPersistent"
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

      const showPersistent = () => {
        createSnackbar({
          text: 'Connection lost. Check your network and try again.',
          actionText: 'Dismiss',
          duration: 0,
          actionCallback: () => {},
        });
      };

      return {
        snackbarState,
        hideSnackbar,
        showPersistent,
      };
    },
  };

</script>
