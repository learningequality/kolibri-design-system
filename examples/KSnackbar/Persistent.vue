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
      const { createSnackbar, clearSnackbar, snackbarIsVisible, snackbarOptions } = useKSnackbar();

      const showPersistent = () => {
        createSnackbar({
          text: 'Connection lost. Check your network and try again.',
          actionText: 'Dismiss',
          autoDismiss: false,
          actionCallback: () => {},
        });
      };

      return {
        snackbarIsVisible,
        snackbarOptions,
        clearSnackbar,
        showPersistent,
      };
    },
  };

</script>
