<template>

  <div>
    <KButton
      text="Show snackbar with onBlur auto-dismiss"
      @click="showWithOnBlur"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar, clearSnackbar } = useKSnackbar();

      const showWithOnBlur = () => {
        createSnackbar({
          text: 'Changes saved',
          announce: true,
          actionText: 'Dismiss',
          autofocus: true,
          autoDismiss: false,
          onBlur: () => {
            clearSnackbar();
          },
          actionCallback: () => {},
        });
      };

      return {
        showWithOnBlur,
      };
    },
  };

</script>
