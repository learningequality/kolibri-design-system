<template>

  <div>
    <KButton
      text="Show connection status updates"
      @click="showForceReuse"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar, clearSnackbar, snackbarIsVisible, snackbarOptions } = useKSnackbar();

      const showForceReuse = () => {
        createSnackbar({
          text: 'Connection lost',
          autoDismiss: false,
        });

        setTimeout(() => {
          createSnackbar({
            text: 'Reconnecting...',
            autoDismiss: false,
            forceReuse: true,
          });
        }, 1500);

        setTimeout(() => {
          createSnackbar({
            text: 'Connected',
            duration: 3000,
            forceReuse: true,
          });
        }, 3000);
      };

      return {
        snackbarIsVisible,
        snackbarOptions,
        clearSnackbar,
        showForceReuse,
      };
    },
  };

</script>
