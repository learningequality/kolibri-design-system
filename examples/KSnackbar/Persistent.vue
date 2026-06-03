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
      const { createSnackbar } = useKSnackbar();

      const showPersistent = () => {
        createSnackbar({
          text: 'Connection lost. Check your network and try again.',
          announce: true,
          actionText: 'Dismiss',
          autoDismiss: false,
          actionCallback: () => {},
        });
      };

      return {
        showPersistent,
      };
    },
  };

</script>
