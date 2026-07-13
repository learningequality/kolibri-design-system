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
      const { createSnackbar } = useKSnackbar();

      const showForceReuse = () => {
        createSnackbar({
          text: 'Connection lost',
          announce: true,
          autoDismiss: false,
        });

        setTimeout(() => {
          createSnackbar({
            text: 'Reconnecting...',
            announce: true,
            autoDismiss: false,
            forceReuse: true,
          });
        }, 1500);

        setTimeout(() => {
          createSnackbar({
            text: 'Connected',
            announce: true,
            duration: 3000,
            forceReuse: true,
          });
        }, 3000);
      };

      return {
        showForceReuse,
      };
    },
  };

</script>
