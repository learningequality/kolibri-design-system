<template>

  <div>
    <KButton
      text="Show persistent snackbar"
      @click="showPersistent"
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
